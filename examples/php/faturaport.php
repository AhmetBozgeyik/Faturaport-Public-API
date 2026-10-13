<?php
declare(strict_types=1);

// PHP 8.1+ ve cURL uzantısı. Çalıştırma: examples/php/README.md.
function arg(int $i): string {
    global $argv;
    return $argv[$i] ?? throw new InvalidArgumentException("Eksik argüman: $i");
}
function guid(int $i): string {
    $value = arg($i);
    if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $value)) {
        throw new InvalidArgumentException('Geçerli GUID gerekli.');
    }
    return $value;
}
function side(int $i): string {
    $value = arg($i);
    if (!in_array($value, ['incoming', 'outgoing'], true)) throw new InvalidArgumentException('Yön incoming veya outgoing olmalıdır.');
    return $value;
}
function direction(int $i): int {
    $value = arg($i);
    if (!in_array($value, ['1', '2'], true)) throw new InvalidArgumentException('Yön 1 veya 2 olmalıdır.');
    return (int)$value;
}
function bodyFile(int $i): mixed {
    $raw = @file_get_contents(arg($i));
    if ($raw === false) throw new RuntimeException('JSON dosyası okunamadı.');
    $value = json_decode($raw, false, 512, JSON_THROW_ON_ERROR);
    if (!$value instanceof stdClass) throw new InvalidArgumentException('JSON gövdesi nesne olmalıdır.');
    return $value;
}
function envRequired(string $name): string {
    $value = getenv($name);
    if ($value === false || $value === '') throw new InvalidArgumentException("Ortam değişkeni gerekli: $name");
    return $value;
}
function request(string $base, string $method, string $path, mixed $body = null, ?string $token = null): array {
    $handle = curl_init($base . $path);
    if ($handle === false) throw new RuntimeException('cURL başlatılamadı.');
    $headers = ['Accept: application/json'];
    if ($token !== null) $headers[] = 'Authorization: Bearer ' . $token;
    $options = [CURLOPT_CUSTOMREQUEST => $method, CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 10, CURLOPT_TIMEOUT => 60, CURLOPT_FOLLOWLOCATION => false];
    if ($body !== null) {
        $headers[] = 'Content-Type: application/json';
        $options[CURLOPT_POSTFIELDS] = json_encode($body, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
    }
    $options[CURLOPT_HTTPHEADER] = $headers;
    curl_setopt_array($handle, $options);
    $raw = curl_exec($handle);
    $status = (int)curl_getinfo($handle, CURLINFO_HTTP_CODE);
    $error = curl_error($handle);
    curl_close($handle);
    if ($raw === false) throw new RuntimeException('Ağ hatası: ' . $error);
    if ($status < 200 || $status >= 300) throw new RuntimeException("HTTP $status ($path). Gizli bilgilerden arındırılmış yanıtı uygulamanızda inceleyin.");
    $data = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);
    if (!is_array($data)) throw new RuntimeException('JSON nesne yanıtı bekleniyordu.');
    if (($data['success'] ?? true) === false || ($data['succeeded'] ?? true) === false) {
        throw new RuntimeException('API işlem başarısızlığı bildirdi. Yanıtı ve sorun giderme rehberini inceleyin.');
    }
    return $data;
}
try {
    $command = arg(1);
    $method = 'GET'; $body = null; $output = null; $path = '/api/Invoice/';
    switch ($command) {
        case 'units': $path .= 'units'; break;
        case 'codes': $path .= 'invoice-code/' . rawurlencode(arg(2)); break;
        case 'customer':
            $tax = arg(2);
            if (!preg_match('/^\d{10,11}$/D', $tax)) throw new InvalidArgumentException('VKN/TCKN 10 veya 11 rakam olmalıdır.');
            $method = 'POST'; $path .= 'check-customer-einvoice-info/' . $tax; break;
        case 'create': $method = 'POST'; $path .= 'add-invoice'; $body = bodyFile(2); break;
        case 'create-despatch': $method = 'POST'; $path .= 'add-despatch'; $body = bodyFile(2); break;
        case 'create-smm': $method = 'POST'; $path .= 'add-smm-invoice'; $body = bodyFile(2); break;
        case 'despatch-prefixes': $path .= 'get-despatch-prefix-list'; break;
        case 'smm-prefixes': $path .= 'get-smm-prefix-list'; break;
        case 'despatch-drafts': $path .= 'get-draft-despatch-list?PageNumber=1&PageSize=10'; break;
        case 'smm-drafts': $path .= 'get-draft-smm-list?PageNumber=1&PageSize=10'; break;
        case 'smm-list': $path .= 'get-outgoing-smm-list?PageNumber=1&PageSize=10'; break;
        case 'despatch-preview': $path .= 'get-draft-despatch-preview/' . guid(2); break;
        case 'smm-preview': $path .= 'get-draft-smm-preview/' . guid(2); break;
        case 'smm-pdf': case 'smm-xml': $path .= 'get-' . $command . '/' . guid(2); $output = arg(3); break;
        case 'send': $method = 'POST'; $path .= 'convert-to-einvoice'; $body = bodyFile(2); break;
        case 'status': $method = 'POST'; $path .= 'check-invoice-status'; $body = ['invoiceId' => guid(2), 'invoiceDocumentDirection' => direction(3)]; break;
        case 'drafts': $path .= 'get-draft-invoice-list?PageNumber=1&PageSize=10'; break;
        case 'preview': $path .= 'get-draft-invoice-preview/' . guid(2); break;
        case 'preview-ref': $path .= 'get-draft-invoice-preview-by-ref/' . guid(2); break;
        case 'invoices': $path .= 'get-' . side(2) . '-invoice-list?PageNumber=1&PageSize=10'; break;
        case 'despatches': $path .= 'get-' . side(2) . '-despatch-list?PageNumber=1&PageSize=10'; break;
        case 'pdf': case 'xml':
            $path .= 'get-' . (side(2) === 'incoming' ? 'incoming-' : '') . 'invoice-' . $command . '/' . guid(3);
            $output = arg(4); break;
        case 'despatch-pdf': $path .= 'get-despatch-pdf?DespatchId=' . guid(2) . '&InvoiceDocumentDirection=' . direction(3); $output = arg(4); break;
        default: throw new InvalidArgumentException('Bilinmeyen komut. README komut tablosunu okuyun.');
    }
    $base = rtrim(getenv('FATURAPORT_BASE_URL') ?: 'https://devapi.faturaport.com', '/');
    if (!in_array($base, ['https://devapi.faturaport.com', 'https://prodapi.faturaport.com'], true)) throw new InvalidArgumentException('Dev veya Canlı HTTPS adresini kullanın.');
    if (!extension_loaded('curl')) throw new RuntimeException('PHP cURL uzantısı gerekli.');
    $login = request($base, 'POST', '/api/Invoice/getapitoken', [
        'company_code' => envRequired('FATURAPORT_COMPANY_CODE'),
        'client_id' => envRequired('FATURAPORT_CLIENT_ID'),
        'client_secret' => envRequired('FATURAPORT_CLIENT_SECRET')
    ]);
    $token = $login['data']['accessToken'] ?? null;
    if (!is_string($token) || $token === '') throw new RuntimeException('Yanıtta data.accessToken bulunamadı.');
    $result = request($base, $method, $path, $body, $token);
    if ($output === null) echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR) . PHP_EOL;
    else {
        $encoded = $result['data'] ?? null;
        if (!is_string($encoded)) throw new RuntimeException('Yanıtta Base64 data alanı bulunamadı.');
        $bytes = base64_decode($encoded, true);
        if ($bytes === false) throw new RuntimeException('Geçersiz Base64 yanıtı.');
        $dir = dirname($output);
        if (!is_dir($dir) && !mkdir($dir, 0775, true) && !is_dir($dir)) throw new RuntimeException('Çıktı klasörü oluşturulamadı.');
        if (file_put_contents($output, $bytes) === false) throw new RuntimeException('Dosya kaydedilemedi.');
        echo "Dosya kaydedildi: $output (" . strlen($bytes) . " bayt)" . PHP_EOL;
    }
} catch (Throwable $error) {
    fwrite(STDERR, $error->getMessage() . PHP_EOL);
    exit(1);
}

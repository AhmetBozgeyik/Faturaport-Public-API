using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;

try
{
    if (args.Length == 0) throw new ArgumentException("Komut gerekli. examples/dotnet/README.md dosyasını okuyun.");
    string Arg(int i) => args.Length > i ? args[i] : throw new ArgumentException($"Eksik argüman: {i}");
    string Env(string key) => Environment.GetEnvironmentVariable(key) is { Length: > 0 } value
        ? value : throw new ArgumentException($"Ortam değişkeni gerekli: {key}");
    string Id(int i) => Guid.TryParse(Arg(i), out var id) ? id.ToString()
        : throw new ArgumentException("Geçerli GUID gerekli.");
    int Direction(int i) => Arg(i) switch { "1" => 1, "2" => 2, _ => throw new ArgumentException("Yön 1 veya 2 olmalıdır.") };
    string Side(int i) => Arg(i) switch { "incoming" => "incoming", "outgoing" => "outgoing", _ => throw new ArgumentException("Yön incoming veya outgoing olmalıdır.") };
    JsonNode Body(int i) => JsonNode.Parse(File.ReadAllText(Arg(i))) is JsonObject value
        ? value : throw new ArgumentException("JSON gövdesi nesne olmalıdır.");
    var method = HttpMethod.Get;
    JsonNode? body = null;
    string? output = null;
    var path = "/api/Invoice/";
    switch (args[0])
    {
        case "units": path += "units"; break;
        case "codes": path += "invoice-code/" + Uri.EscapeDataString(Arg(1)); break;
        case "customer":
            var tax = Arg(1);
            if (tax.Length is not (10 or 11) || !tax.All(char.IsAsciiDigit)) throw new ArgumentException("VKN/TCKN 10 veya 11 rakam olmalıdır.");
            method = HttpMethod.Post; path += "check-customer-einvoice-info/" + tax; break;
        case "create": method = HttpMethod.Post; path += "add-invoice"; body = Body(1); break;
        case "create-despatch": method = HttpMethod.Post; path += "add-despatch"; body = Body(1); break;
        case "create-smm": method = HttpMethod.Post; path += "add-smm-invoice"; body = Body(1); break;
        case "despatch-prefixes": path += "get-despatch-prefix-list"; break;
        case "smm-prefixes": path += "get-smm-prefix-list"; break;
        case "despatch-drafts": path += "get-draft-despatch-list?PageNumber=1&PageSize=10"; break;
        case "smm-drafts": path += "get-draft-smm-list?PageNumber=1&PageSize=10"; break;
        case "smm-list": path += "get-outgoing-smm-list?PageNumber=1&PageSize=10"; break;
        case "despatch-preview": path += "get-draft-despatch-preview/" + Id(1); break;
        case "smm-preview": path += "get-draft-smm-preview/" + Id(1); break;
        case "smm-pdf": case "smm-xml": path += "get-" + args[0] + "/" + Id(1); output = Arg(2); break;
        case "send": method = HttpMethod.Post; path += "convert-to-einvoice"; body = Body(1); break;
        case "status": method = HttpMethod.Post; path += "check-invoice-status"; body = new JsonObject { ["invoiceId"] = Id(1), ["invoiceDocumentDirection"] = Direction(2) }; break;
        case "drafts": path += "get-draft-invoice-list?PageNumber=1&PageSize=10"; break;
        case "preview": path += "get-draft-invoice-preview/" + Id(1); break;
        case "preview-ref": path += "get-draft-invoice-preview-by-ref/" + Id(1); break;
        case "invoices": path += "get-" + Side(1) + "-invoice-list?PageNumber=1&PageSize=10"; break;
        case "despatches": path += "get-" + Side(1) + "-despatch-list?PageNumber=1&PageSize=10"; break;
        case "pdf": case "xml":
            var side = Side(1);
            path += "get-" + (side == "incoming" ? "incoming-" : "") + "invoice-" + args[0] + "/" + Id(2);
            output = Arg(3); break;
        case "despatch-pdf": path += "get-despatch-pdf?DespatchId=" + Id(1) + "&InvoiceDocumentDirection=" + Direction(2); output = Arg(3); break;
        default: throw new ArgumentException("Bilinmeyen komut. README komut tablosunu okuyun.");
    }
    var baseUrl = (Environment.GetEnvironmentVariable("FATURAPORT_BASE_URL") ?? "https://devapi.faturaport.com").TrimEnd('/');
    if (baseUrl is not ("https://devapi.faturaport.com" or "https://prodapi.faturaport.com")) throw new ArgumentException("Dev veya Canlı HTTPS adresini kullanın.");
    using var client = new HttpClient(new HttpClientHandler { AllowAutoRedirect = false }) { BaseAddress = new Uri(baseUrl), Timeout = TimeSpan.FromSeconds(60) };
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    async Task<JsonNode> Request(HttpMethod verb, string endpoint, JsonNode? payload)
    {
        using var request = new HttpRequestMessage(verb, endpoint);
        if (payload is not null) request.Content = new StringContent(payload.ToJsonString(), Encoding.UTF8, "application/json");
        using var response = await client.SendAsync(request);
        var raw = await response.Content.ReadAsStringAsync();
        if (!response.IsSuccessStatusCode) throw new InvalidOperationException($"HTTP {(int)response.StatusCode} ({endpoint}). Gizli bilgilerden arındırılmış yanıtı uygulamanızda inceleyin.");
        var result = JsonNode.Parse(raw) ?? throw new InvalidOperationException("Boş JSON yanıtı.");
        if (result["success"]?.GetValue<bool>() == false || result["succeeded"]?.GetValue<bool>() == false)
            throw new InvalidOperationException("API işlem başarısızlığı bildirdi. Yanıtı ve sorun giderme rehberini inceleyin.");
        return result;
    }
    var login = await Request(HttpMethod.Post, "/api/Invoice/getapitoken", new JsonObject {
        ["company_code"] = Env("FATURAPORT_COMPANY_CODE"), ["client_id"] = Env("FATURAPORT_CLIENT_ID"), ["client_secret"] = Env("FATURAPORT_CLIENT_SECRET")
    });
    var token = login["data"]?["accessToken"]?.GetValue<string>();
    if (string.IsNullOrWhiteSpace(token)) throw new InvalidOperationException("Yanıtta data.accessToken bulunamadı.");
    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
    var result = await Request(method, path, body);
    if (output is null) Console.WriteLine(result.ToJsonString(new JsonSerializerOptions { WriteIndented = true }));
    else
    {
        var encoded = result["data"]?.GetValue<string>() ?? throw new InvalidOperationException("Yanıtta Base64 data alanı bulunamadı.");
        var bytes = Convert.FromBase64String(encoded);
        if (Path.GetDirectoryName(Path.GetFullPath(output)) is { } dir) Directory.CreateDirectory(dir);
        await File.WriteAllBytesAsync(output, bytes);
        Console.WriteLine($"Dosya kaydedildi: {output} ({bytes.Length} bayt)");
    }
}
catch (Exception error)
{
    Console.Error.WriteLine(error.Message);
    Environment.ExitCode = 1;
}

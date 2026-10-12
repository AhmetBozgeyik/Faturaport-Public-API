# Başlangıç ve kimlik doğrulama

Test hesabını https://test.faturaport.com adresinde açın. **Ayarlar → API Ayarları** bölümünden Client ID ve Client Secret oluşturun. Token modelinde ayrıca `company_code` (firma kodu) bulunur. Firma kodunu portal hesabınızdan temin edin; görünmüyorsa destek@faturaport.com ile görüşün.

## Yapılandırma

PowerShell:

```powershell
$env:FATURAPORT_BASE_URL = 'https://devapi.faturaport.com'
$env:FATURAPORT_COMPANY_CODE = 'FIRMA_KODUNUZ'
$env:FATURAPORT_CLIENT_ID = 'CLIENT_ID_DEGERINIZ'
$env:FATURAPORT_CLIENT_SECRET = 'CLIENT_SECRET_DEGERINIZ'
```

Bash:

```bash
export FATURAPORT_BASE_URL='https://devapi.faturaport.com'
export FATURAPORT_COMPANY_CODE='FIRMA_KODUNUZ'
export FATURAPORT_CLIENT_ID='CLIENT_ID_DEGERINIZ'
export FATURAPORT_CLIENT_SECRET='CLIENT_SECRET_DEGERINIZ'
```

`.env.example` yapılandırma isimlerini gösterir. Örnek programlar `.env` dosyasını otomatik yüklemez; ortam değişkenlerini yukarıdaki gibi tanımlayın.

## Token alma

`POST /api/Invoice/getapitoken`, `Content-Type: application/json`:

```json
{
  "company_code": "FIRMA_KODUNUZ",
  "client_id": "CLIENT_ID_DEGERINIZ",
  "client_secret": "CLIENT_SECRET_DEGERINIZ"
}
```

Başarılı yanıtın token alanı **`data.accessToken`** değeridir. Dokümandaki `access_token` ifadesi header kullanımını anlatır; yanıt alanının adı değildir.

```json
{
  "success": true,
  "message": "Oturum başarılı.",
  "data": { "accessToken": "TOKEN_DEGERI" }
}
```

Diğer isteklerde `Authorization: Bearer TOKEN_DEGERI` gönderin. Hem HTTP durumunu hem `success`/`succeeded` alanlarını kontrol edin. Token süresini sabit varsaymayın; public dokümanda refresh endpointi bulunmuyor. 401 durumunda erişim bilgilerini ve token geçerliliğini kontrol edin.

İlk doğrulama için `GET /api/Invoice/units` kullanın. Bu istek belge oluşturmaz. Örnekler tokenı ekrana yazdırmaz ve işleme özel yanıtı gösterir.

# Faturaport API bağlantısı: test hesabı açma ve token alma

Faturaport API'yi kullanmak için önce bir hesap açmanız ve bu hesaba ait API bilgilerini almanız gerekir. İlk denemeyi test ortamında yapabilirsiniz.

## 1. Test hesabınızı açın

[test.faturaport.com](https://test.faturaport.com) üzerinden hesap oluşturun. Giriş yaptıktan sonra **Ayarlar → API Ayarları** bölümünü açın ve Client ID ile Client Secret oluşturun.

Bağlantı için üç bilgi kullanılır:

| Bilgi | API'de kullanılan alan | Açıklama |
|---|---|---|
| Firma kodu | `company_code` | İşlem yapacağınız hesabın firma kodu |
| Client ID | `client_id` | API Ayarları bölümünde oluşturduğunuz kimlik |
| Client Secret | `client_secret` | Aynı bölümde oluşturduğunuz gizli anahtar |

Firma kodunuzu portal hesabınızdan alın. Bulamıyorsanız destek@faturaport.com adresinden yardım isteyin.

## 2. Token alın

Token, sonraki API isteklerinde hesabınızı tanıtan geçici erişim anahtarıdır. Şu adrese POST isteği gönderin:

```text
https://devapi.faturaport.com/api/Invoice/getapitoken
```

İsteğin başlığı `Content-Type: application/json` olmalı. Aşağıdaki değerleri kendi bilgilerinizle değiştirin:

```json
{
  "company_code": "FIRMA_KODUNUZ",
  "client_id": "CLIENT_ID_DEGERINIZ",
  "client_secret": "CLIENT_SECRET_DEGERINIZ"
}
```

Başarılı yanıtta token `data.accessToken` alanında döner:

```json
{
  "success": true,
  "message": "Oturum başarılı.",
  "data": { "accessToken": "TOKEN_DEGERI" }
}
```

## 3. İlk isteğinizi gönderin

Birim listesini almak için aşağıdaki adrese GET isteği gönderin. Bu işlem belge oluşturmaz:

```text
https://devapi.faturaport.com/api/Invoice/units
```

İsteğin başlığına aldığınız tokenı ekleyin:

```text
Authorization: Bearer TOKEN_DEGERI
```

Liste geliyorsa API bağlantınız kurulmuştur. Artık [e-Fatura](efatura.md), [e-İrsaliye](eirsaliye.md) veya [e-SMM](esmm.md) rehberine geçebilirsiniz. Hata alıyorsanız [hata çözümlerini](sorun-giderme.md) kontrol edin.

## Hazır kod örneklerini nasıl çalıştırırım?

Örnekler API bilgilerini bilgisayarınızda tanımladığınız ortam değişkenlerinden okur. Böylece bu bilgileri kod dosyasına yazmanız gerekmez.

PowerShell kullanıyorsanız:

```powershell
$env:FATURAPORT_BASE_URL = 'https://devapi.faturaport.com'
$env:FATURAPORT_COMPANY_CODE = 'FIRMA_KODUNUZ'
$env:FATURAPORT_CLIENT_ID = 'CLIENT_ID_DEGERINIZ'
$env:FATURAPORT_CLIENT_SECRET = 'CLIENT_SECRET_DEGERINIZ'
```

Bash kullanıyorsanız:

```bash
export FATURAPORT_BASE_URL='https://devapi.faturaport.com'
export FATURAPORT_COMPANY_CODE='FIRMA_KODUNUZ'
export FATURAPORT_CLIENT_ID='CLIENT_ID_DEGERINIZ'
export FATURAPORT_CLIENT_SECRET='CLIENT_SECRET_DEGERINIZ'
```

Ardından aynı terminalde [.NET](../examples/dotnet/README.md), [PHP](../examples/php/README.md) veya [cURL](../examples/curl/README.md) örneğini çalıştırın. `.env.example` dosyası gereken bilgilerin listesidir; kod örnekleri `.env` dosyasını kendiliğinden okumaz.

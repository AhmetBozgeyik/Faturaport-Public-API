# Faturaport Public API

Faturaport API V3 ile e-Fatura, e-Arşiv ve e-İrsaliye entegrasyonu için teknik rehberler; .NET, PHP, cURL ve JSON örnekleri.

## İlk entegrasyon

1. [Test portalında](https://test.faturaport.com) hesap oluşturun.
2. **Ayarlar → API Ayarları** bölümünden Client ID ve Client Secret oluşturun. Token isteğinde kullanılan firma kodunu (`company_code`) da hazırlayın.
3. [Başlangıç rehberindeki](docs/baslangic.md) ortam değişkenlerini tanımlayın.
4. [.NET](examples/dotnet/README.md), [PHP](examples/php/README.md) veya [cURL](examples/curl/README.md) örneğiyle birim listesini alın.
5. [e-Fatura rehberiyle](docs/efatura.md) mükellef sorgulama, taslak oluşturma ve gönderme akışını uygulayın.

## Ortamlar

| Ortam | Portal | API temel adresi | Doküman |
|---|---|---|---|
| Test / Dev | https://test.faturaport.com | https://devapi.faturaport.com | [Dev dokümanı](https://devapi.faturaport.com/docs/index.html) |
| Canlı / Prod | https://portal.faturaport.com | https://prodapi.faturaport.com | [Canlı dokümanı](https://prodapi.faturaport.com/docs/index.html) |

Her ortamın erişim bilgilerini ilgili portalın **Ayarlar → API Ayarları** bölümünden oluşturun. Örnekler varsayılan olarak Dev adresini kullanır.

## Rehberler

- [Başlangıç ve kimlik doğrulama](docs/baslangic.md)
- [e-Fatura: taslak, gönderim, durum, PDF ve XML](docs/efatura.md)
- [e-Arşiv kapsamı](docs/earsiv.md)
- [e-İrsaliye: listeleme ve PDF](docs/eirsaliye.md)
- [e-SMM public API kapsamı](docs/esmm.md)
- [Tüm endpointler ve alanlar](docs/api-referansi.md)
- [Hatalar ve sorun giderme](docs/sorun-giderme.md)
- [Canlıya geçiş](docs/canliya-gecis.md)
- [JSON örnekleri](samples/json/README.md)
- [Postman koleksiyonu](postman/README.md)
- [Kaynaklar ve doğrulama durumu](docs/dogrulama.md)

## Mevcut kapsam

| Ürün | Public dokümanda bulunan işlemler |
|---|---|
| e-Fatura | Mükellef sorgulama, taslak oluşturma/listeleme/görüntüleme/silme, e-Faturaya dönüştürme, gelen/giden liste, durum, PDF ve XML |
| e-Arşiv | `EARSIVFATURA` profil tanımı ve giden e-Arşiv iptal endpointi; gönderim ayrıntıları için [kapsam notları](docs/earsiv.md) |
| e-İrsaliye | Gelen/giden listeleme ve PDF alma; oluşturma/gönderme endpointi yayımlanmamış |
| e-SMM | Şemada `ESMM` profili var; public e-SMM işlem endpointi yayımlanmamış |

Bu kapsam 12 Ekim 2026 tarihinde Dev ve Canlı OpenAPI dokümanlarıyla karşılaştırıldı. API hesabıyla uçtan uca test henüz yapılmadı. [Doğrulama ayrıntıları](docs/dogrulama.md).

API desteği: destek@faturaport.com. Sorun bildirirken Client Secret veya token paylaşmayın.

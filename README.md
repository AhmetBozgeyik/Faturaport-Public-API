# Faturaport API entegrasyonu: e-Fatura, e-Arşiv, e-İrsaliye ve e-SMM

Faturaport API'yi kendi uygulamanıza bağlamak için gereken adımları ve kod örneklerini bu repoda bulabilirsiniz. Test hesabı açarak başlayabilir, .NET veya PHP ile ilk isteğinizi gönderebilir ve belge oluşturma adımlarını takip edebilirsiniz.

## Nereden başlamalıyım?

1. [Test hesabı açın ve API bilgilerinizi alın](docs/baslangic.md).
2. Kullandığınız dile göre [.NET](examples/dotnet/README.md), [PHP](examples/php/README.md) veya [cURL](examples/curl/README.md) örneğini çalıştırın.
3. Yapacağınız işlem için aşağıdaki rehberlerden birini seçin.

| Ne yapmak istiyorsunuz? | Rehber |
|---|---|
| e-Fatura oluşturmak, göndermek ve PDF/XML almak | [e-Fatura API entegrasyonu](docs/efatura.md) |
| e-Arşiv faturası hazırlamak veya iptal etmek | [e-Arşiv API kullanımı](docs/earsiv.md) |
| e-İrsaliye oluşturmak, göndermek ve PDF almak | [e-İrsaliye API entegrasyonu](docs/eirsaliye.md) |
| Serbest meslek makbuzu oluşturmak ve PDF/XML almak | [e-SMM API entegrasyonu](docs/esmm.md) |

## API bağlantı bilgileri

| Ortam | Hesap açma ve API ayarları | API adresi | Ayrıntılı doküman |
|---|---|---|---|
| Test | https://test.faturaport.com | https://devapi.faturaport.com | [Test API dokümanı](https://devapi.faturaport.com/docs/index.html) |
| Canlı | https://portal.faturaport.com | https://prodapi.faturaport.com | [Canlı API dokümanı](https://prodapi.faturaport.com/docs/index.html) |

Client ID ve Client Secret bilgilerini ilgili portalda **Ayarlar → API Ayarları** bölümünden oluşturun. Token almak için firma kodunuz da gerekir. Hazır kod örnekleri test adresiyle başlar.

## Kod ve istek örnekleri

- [.NET ile Faturaport API kullanımı](examples/dotnet/README.md)
- [PHP ile Faturaport API kullanımı](examples/php/README.md)
- [cURL ile token alma ve ilk istek](examples/curl/README.md)
- [Örnek JSON istekleri ve yanıtları](samples/json/README.md)
- [Postman ile API'yi deneme](postman/README.md)

## Entegrasyon sırasında ihtiyaç duyabilecekleriniz

- [Fatura türleri: tevkifat, istisna, özel matrah ve ihraç kayıtlı örnekleri](docs/fatura-turleri.md)
- [API işlem adresleri](docs/api-referansi.md)
- [JSON alanlarının açıklamaları](docs/veri-alanlari.md)
- [Sık karşılaşılan hatalar ve çözümleri](docs/sorun-giderme.md)
- [Testten Canlıya geçiş](docs/canliya-gecis.md)
- [Güncelleme ve kontrol bilgileri](docs/dogrulama.md)

Rehberler 13 Ekim 2026 tarihli API V3 dokümanına göre güncellendi. e-İrsaliye ve e-SMM oluşturma işlemleri de örneklere eklendi. Hesabınızda belge oluşturmadan önce örneklerdeki firma, seri, birim ve tarih bilgilerini değiştirin.

Entegrasyon desteği için **destek@faturaport.com** adresine yazabilirsiniz. Sorununuzu anlatırken kullandığınız işlem adresini ve aldığınız hata mesajını paylaşın; Client Secret veya token göndermeyin.

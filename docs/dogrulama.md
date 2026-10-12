# Kaynaklar ve doğrulama

## Kaynak ve kapsam

- [Dev dokümanı](https://devapi.faturaport.com/docs/index.html)
- [Canlı dokümanı](https://prodapi.faturaport.com/docs/index.html)
- API V3.0.0; kaynak inceleme tarihi: **12 Ekim 2026**.
- İki ortamda aynı 21 public işlem bulunur. Kaynak şemalar public işlemlerin kullandığı modellere indirgenerek [openapi](../openapi/README.md) altında saklanır.
- Portal üzerinden erişim bilgisi oluşturma adımları Faturaport tarafından sağlanan bilgiye dayanır.

## Yerel kontroller

Repo kökünden Node.js 20+ ve .NET 8 SDK ile:

```powershell
node tools/verify.mjs
dotnet build examples/dotnet/Faturaport.Examples.csproj
node tools/smoke-dotnet.mjs
```

PHP 8.1+ bulunan ortamda:

```bash
php -l examples/php/faturaport.php
```

Doğrulama betiği JSON biçimini, Markdown dosya bağlantılarını, şema referanslarını, Dev/Canlı endpoint kapsamını, token/taslak/gönderim isteklerinin modellerle uyumunu ve Postman endpoint eşleşmesini kontrol eder. Bu kontrol tam JSON Schema doğrulayıcısı değildir; iş kurallarını veya şemada açıklama olarak verilen seçenekleri sunucu yerine doğrulamaz.

`node tools/prepare.mjs`, yerel OpenAPI dosyalarından referans dokümanı, JSON şablonları ve Postman koleksiyonunu yeniden oluşturur. Mevcut örnek dosyaları üzerine yazar; kişisel erişim bilgileriyle uyarlanmış dosyalarda çalıştırmayın.

## API hesabıyla doğrulanması gerekenler

Henüz API erişim bilgisi sağlanmadığı için gerçek token alma, belge oluşturma/gönderme ve indirme yapılmadı. e-Arşiv gönderim ayrıntıları ve yön alanının sayısal/string farkı da test hesabıyla doğrulanmalıdır. e-SMM ve e-İrsaliye gönderimi public endpoint listesinde bulunmadığından örnek kapsamına dahil edilmedi.

Bu kontrollerin geçmesi gerçek sunucu üzerinde uçtan uca entegrasyonun başarılı olduğu anlamına gelmez. Hesabınızla denemeye [başlangıç rehberinden](baslangic.md) başlayın.

## İlk hazırlama sırasında alınan sonuçlar

12 Ekim 2026 tarihindeki yerel kontrolde JSON/doküman/OpenAPI/Postman doğrulamaları geçti. .NET 8 derlemesi sıfır hata ve sıfır uyarıyla tamamlandı. Çevrimdışı .NET çalıştırma kontrolleri, Windows Application Control politikası derlenen DLL'yi engellediği için çalıştırılamadı. PHP bu makinede kurulu olmadığından yerel PHP sözdizimi/çalıştırma kontrolü yapılmadı.

GitHub Actions iş akışı bu doğrulamaları, .NET çevrimdışı komut kontrollerini ve PHP sözdizimi kontrolünü repo yayımlandığında çalıştıracak şekilde hazırlanmıştır; henüz CI sonucu yoktur.

# API dokümanı güncellemeleri ve örneklerin kontrolü

Bu repo, Faturaport'un [test](https://devapi.faturaport.com/docs/index.html) ve [Canlı](https://prodapi.faturaport.com/docs/index.html) API dokümanlarına göre hazırlanır. Son karşılaştırma tarihi **13 Ekim 2026**. İki ortamda da aynı 34 işlem bulunuyor.

Bu güncellemede e-İrsaliye oluşturma, irsaliye taslak işlemleri, e-SMM oluşturma, makbuz listeleme ve PDF/XML indirme adımları eklendi.

## Neler kontrol ediliyor?

Dosyaların okunabilir JSON olması, rehber bağlantılarının çalışması, örnek isteklerdeki alanların API tanımlarıyla uyuşması ve Postman adreslerinin güncel olması kontrol edilir. .NET örneği ayrıca derlenir. Bu kontroller, hesabınızla yapılacak gerçek belge denemesinin yerine geçmez.

API erişim bilgileri sağlanmadığı için token alma, belge gönderme ve indirme işlemleri gerçek hesapla denenmedi. e-Arşiv gönderim adımı, gelen/giden yönünün kabul edilen değeri ve e-SMM kesinti bilgileri de test hesabıyla netleştirilmelidir.

## Dosya kontrollerini çalıştırma

Repo klasöründe Node.js 20+ ve .NET 8 SDK ile:

```powershell
node tools/verify.mjs
dotnet build examples/dotnet/Faturaport.Examples.csproj
node tools/smoke-dotnet.mjs
```

PHP 8.1+ kuruluysa:

```bash
php -l examples/php/faturaport.php
```

`verify.mjs` dosyalar ve alan türleri için temel kontroller yapar; sunucunun bütün işlem kurallarını kontrol etmez. `smoke-dotnet.mjs` yanlış komut veya eksik bağlantı bilgisi verildiğinde örneğin hata bildirdiğini kontrol eder; API'ye bağlanmaz.

İlk hazırlamada Windows uygulama denetimi derlenen .NET örneğinin çalıştırılmasını engelledi. PHP bu bilgisayarda kurulu değil. GitHub Actions'ta bu kontroller için [iş akışı](../.github/workflows/verify.yml) bulunur.

## API dosyaları değiştiğinde

Güncel API dosyalarını [openapi klasöründeki](../openapi/README.md) adreslerden alın. `node tools/prepare.mjs` komutu bu dosyalardan işlem listesi, JSON örnekleri ve Postman koleksiyonunu yeniden hazırlar.

Bu komut örnek dosyaların üzerine yazar. Kendi hesap bilgilerinizi eklediğiniz dosyaları ayrı yerde tutun. Ardından ürün rehberlerini gözden geçirin ve yukarıdaki kontrolleri çalıştırın.

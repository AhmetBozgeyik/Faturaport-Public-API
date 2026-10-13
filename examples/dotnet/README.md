# .NET ile Faturaport API entegrasyonu

Bu örnek .NET 8 ile token alır, seçtiğiniz API işlemini çalıştırır ve sonucu gösterir. PDF/XML indirme komutları belgeyi dosyaya kaydeder. Ek NuGet paketi gerekmez.

## İlk isteği çalıştırın

.NET 8 SDK'yı kurun ve [API bilgilerinizi tanımlayın](../../docs/baslangic.md). Terminalde bu repo klasörünü açıp çalıştırın:

```powershell
dotnet run --project examples/dotnet -- units
```

Birim listesi geliyorsa bağlantı kurulmuştur. Her komut çalıştığında yeni token alınır; token ekrana yazdırılmaz.

## e-Fatura örneği

Önce alıcının VKN/TCKN bilgisiyle sorgu yapın:

```powershell
dotnet run --project examples/dotnet -- customer VKN_VEYA_TCKN
dotnet run --project examples/dotnet -- codes Satis
```

[Örnek JSON'u](../../samples/json/create-invoice.request.json) kendi seri, alıcı, tarih, birim ve tutar bilgilerinizle düzenledikten sonra taslak oluşturun:

```powershell
dotnet run --project examples/dotnet -- create samples/json/create-invoice.request.json
dotnet run --project examples/dotnet -- preview TASLAK_GUID
```

`TASLAK_GUID` yerine oluşturma yanıtındaki `invoiceId` değerini yazın. Kontrol sonrasında [gönderim JSON'unu](../../samples/json/convert-to-einvoice.request.json) doldurun:

```powershell
dotnet run --project examples/dotnet -- send samples/json/convert-to-einvoice.request.json
dotnet run --project examples/dotnet -- invoices outgoing
dotnet run --project examples/dotnet -- status BELGE_GUID 1
dotnet run --project examples/dotnet -- pdf outgoing BELGE_GUID output/fatura.pdf
```

Bu komutları sırayla ve aldığınız gerçek ID'leri kullanarak çalıştırın. İşlem açıklamaları için [e-Fatura rehberine](../../docs/efatura.md) bakın.

Tevkifat, istisna, özel matrah ve ihraç kayıtlı faturalar için aynı `create` komutuna [ilgili JSON dosyasını](../../docs/fatura-turleri.md) verin. Bu dosyaların kayıt türünü ve tutarlarını çalıştırmadan önce kontrol edin.

## e-İrsaliye ve e-SMM örnekleri

```powershell
dotnet run --project examples/dotnet -- despatch-prefixes
dotnet run --project examples/dotnet -- create-despatch samples/json/add-despatch.request.json
dotnet run --project examples/dotnet -- smm-prefixes
dotnet run --project examples/dotnet -- create-smm samples/json/add-smm-invoice.request.json
```

Önce seri listesini alın, sonra ilgili JSON'u düzenleyin. İki örnek de taslak kaydeder. Doğrudan gönderim ve belge indirme için [e-İrsaliye](../../docs/eirsaliye.md) ve [e-SMM](../../docs/esmm.md) rehberlerini okuyun.

## Kullanabileceğiniz komutlar

Aşağıdaki komutları `dotnet run --project examples/dotnet --` ifadesinin sonuna ekleyin. GUID yazan yerlere gerçek belge ID'si girin.

| Komut | Yaptığı işlem |
|---|---|
| `units` | Birim listesini alır |
| `codes Satis` | Vergi kodlarını alır |
| `customer VKN_VEYA_TCKN` | Alıcı, seri ve posta kutusu bilgilerini sorgular |
| `create samples/json/create-invoice.request.json` | Fatura taslağı oluşturur |
| `preview TASLAK_GUID` | Fatura taslağını gösterir |
| `preview-ref REFERANS_GUID` | Kendi referansınızla fatura taslağını bulur |
| `drafts` | Fatura taslaklarını listeler |
| `send samples/json/convert-to-einvoice.request.json` | Fatura taslağını gönderir |
| `status BELGE_GUID 1` | Giden faturanın durumunu sorgular; gelen için `2` |
| `invoices outgoing` | Giden faturaları listeler; gelen için `incoming` |
| `pdf outgoing BELGE_GUID output/fatura.pdf` | Giden fatura PDF'sini kaydeder; gelen için `incoming` |
| `xml outgoing BELGE_GUID output/fatura.xml` | Giden fatura XML'ini kaydeder; gelen için `incoming` |
| `despatch-prefixes` | İrsaliye serilerini alır |
| `create-despatch samples/json/add-despatch.request.json` | İrsaliye oluşturur; JSON örneği taslak seçer |
| `despatch-drafts` | İrsaliye taslaklarını listeler |
| `despatch-preview TASLAK_GUID` | İrsaliye taslağını gösterir |
| `despatches outgoing` | Giden irsaliyeleri listeler; gelen için `incoming` |
| `despatch-pdf BELGE_GUID 1 output/irsaliye.pdf` | Giden irsaliye PDF'sini kaydeder; gelen için `2` |
| `smm-prefixes` | e-SMM serilerini alır |
| `create-smm samples/json/add-smm-invoice.request.json` | Makbuz oluşturur; JSON örneği taslak seçer |
| `smm-drafts` | Makbuz taslaklarını listeler |
| `smm-preview TASLAK_GUID` | Makbuz taslağını gösterir |
| `smm-list` | Gönderilen makbuzları listeler |
| `smm-pdf BELGE_GUID output/makbuz.pdf` | Makbuz PDF'sini kaydeder |
| `smm-xml BELGE_GUID output/makbuz.xml` | Makbuz XML'ini kaydeder |

Liste komutları ilk 10 kaydı getirir. Tüm kayıtları almak için kodda `PageNumber` değerini artırarak `totalPages` kadar sayfa okuyabilirsiniz. [Hata alırsanız](../../docs/sorun-giderme.md).

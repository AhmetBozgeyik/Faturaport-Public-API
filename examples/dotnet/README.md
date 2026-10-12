# .NET örnekleri

.NET 8 SDK gereklidir. NuGet paketi gerektirmez. Önce [ortam değişkenlerini](../../docs/baslangic.md) tanımlayın. Aşağıdaki komutları **repo kökünden** çalıştırın.

```powershell
dotnet run --project examples/dotnet -- units
dotnet run --project examples/dotnet -- customer VKN_VEYA_TCKN
dotnet run --project examples/dotnet -- codes Satis
```

Her çalıştırma yeni token alır; token ekrana yazdırılmaz. JSON yanıtı terminalde gösterilir. Örnekler yalnızca ilk liste sayfasını alır; tüm sayfaları almak için yanıtın `totalPages` alanını kullanarak istemciyi genişletin.

| Komut argümanları | İşlem |
|---|---|
| `units` | Birim listesi |
| `codes Satis` | Vergi kodları |
| `customer VKN_VEYA_TCKN` | Mükellef, seri ve posta kutuları |
| `create samples/json/create-invoice.request.json` | Uyarlanmış JSON ile taslak oluşturma |
| `preview TASLAK_GUID` | Taslak görüntüleme |
| `preview-ref REFERANS_GUID` | RefId ile taslak görüntüleme |
| `drafts` | Taslak listesi |
| `send samples/json/convert-to-einvoice.request.json` | Uyarlanmış JSON ile gönderim |
| `status BELGE_GUID 1` | Giden belge durum sorgusu; gelen için `2` |
| `invoices outgoing` | Giden fatura listesi; gelen için `incoming` |
| `pdf outgoing BELGE_GUID output/fatura.pdf` | Giden PDF; gelen için `incoming` |
| `xml outgoing BELGE_GUID output/fatura.xml` | Giden XML; gelen için `incoming` |
| `despatches outgoing` | Giden irsaliye listesi; gelen için `incoming` |
| `despatch-pdf BELGE_GUID 1 output/irsaliye.pdf` | Giden irsaliye PDF; gelen için `2` |

Örnek: `dotnet run --project examples/dotnet -- pdf outgoing BELGE_GUID output/fatura.pdf`. `BELGE_GUID` yerine gerçek GUID yazın.

`create` öncesinde JSON içindeki alıcı, seri, posta kutusu, birim, vergi kodu, tarih ve tutarları kendi hesabınıza uyarlayın. `send` dosyasına oluşturulan taslağın ID'sini yazın. Ayrıntılı akış: [e-Fatura rehberi](../../docs/efatura.md).

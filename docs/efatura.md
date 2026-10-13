# e-Fatura API entegrasyonu: fatura oluşturma, gönderme ve PDF alma

Faturaport API ile e-Fatura göndermek için önce alıcının bilgilerini sorgulayın, faturayı taslak olarak oluşturun ve ardından gönderin. Bu rehberde bir satış faturası üzerinden ilerleyeceğiz. Başlamadan önce [token alma](baslangic.md) adımını tamamlayın.

Aşağıdaki işlem adresleri test için `https://devapi.faturaport.com` ile başlar. Her istekte `Authorization: Bearer TOKEN_DEGERI` başlığını kullanın.

## 1. Alıcının e-Fatura bilgilerini sorgulayın

Alıcının VKN veya TCKN değerini adresin sonuna yazarak POST isteği gönderin. Bu istekte JSON göndermeniz gerekmez.

```text
POST /api/Invoice/check-customer-einvoice-info/{taxnumber}
```

Yanıttan şu bilgileri alın:

| Alan | Ne için kullanılır? |
|---|---|
| `data.customerIsEInvoiceAndAliasList.isEInvoiceUser` | Alıcının e-Fatura kullanıcısı olup olmadığını gösterir |
| `data.customerIsEInvoiceAndAliasList.aliasList` | Faturanın gönderileceği posta kutusunu seçmenizi sağlar |
| `data.prefixList[].invoicePrefixId` | Faturanın hangi seriyle oluşturulacağını belirtir |
| `data.companyInfo` | Alıcının unvan, vergi dairesi ve adres bilgilerini verir |

Alıcı e-Fatura kullanıcısı değilse [e-Arşiv rehberine](earsiv.md) bakın. Birden fazla seri veya posta kutusu dönüyorsa işlem için uygun olanı seçin.

## 2. Faturanın alıcı ve kalem bilgilerini hazırlayın

[Örnek fatura JSON'unu](../samples/json/create-invoice.request.json) açın. `company` bölümünü sorgudan gelen bilgilerle doldurun:

| Sorgudan gelen bilgi | Faturaya yazacağınız alan |
|---|---|
| `companyInfo.unvan` | `company.companyName` |
| `companyInfo.vergiDairesiAdi` | `company.taxOffice` |
| `companyInfo.adres` | `company.address` |
| `companyInfo.ilAdi` | `company.city` |
| `companyInfo.ilceAdi` | `company.district` |

Alıcının VKN/TCKN değerini `company.taxNumber`, ülkesini `company.country` alanına yazın.

Kalemlerdeki `unitId` için `GET /api/Invoice/units` listesinden uygun birimi seçin. Vergi kodu gerekiyorsa `GET /api/Invoice/invoice-code/Satis` listesini kullanın. Örnekteki birim ve vergi kodunu hesabınızdan aldığınız değerlerle değiştirin.

## 3. Faturayı taslak olarak oluşturun

```text
POST /api/Invoice/add-invoice
```

Hazırladığınız JSON'u bu adrese gönderin. Örnekte kullanılan temel alanlar:

| Alan | Açıklama |
|---|---|
| `invoiceProfileId` | Örnekte `TICARIFATURA`; faturaya uygun profili seçin |
| `invoiceTypeId` | Satış faturası için `Satis` |
| `draftInvoiceType` | Örnekte `DraftInvoice`, yani taslak |
| `invoicePrefixId` | İlk adımda seçtiğiniz seri ID'si |
| `alias` | Alıcının seçtiğiniz posta kutusu |
| `invoiceDate` | Fatura tarihi; örneğin `2026-10-13T10:00:00Z` |
| `invoiceOutputType` | Yanıtta istediğiniz belge biçimi: `Pdf`, `Html`, `Xml` veya `Ubl` |

Örnek dosyada 1 adet ürün, 1000 TL tutar, 200 TL vergi ve 1200 TL toplam bulunur. Kendi ürünlerinizi yazarken hem kalem tutarlarını hem fatura toplamlarını güncelleyin.

Başarılı yanıtta `invoiceId` döner. Bu değeri kaydedin; taslağı görüntülerken ve gönderirken kullanacaksınız. Bu aşamada fatura henüz gönderilmiş değildir.

## 4. Taslağı kontrol edin ve gönderin

Önce taslağı görüntüleyin:

```text
GET /api/Invoice/get-draft-invoice-preview/{draftInvoiceId}
```

Alıcı, tarih, ürün ve tutarlar doğruysa aşağıdaki adrese POST isteği gönderin:

```text
POST /api/Invoice/convert-to-einvoice
```

[Gönderim JSON'unda](../samples/json/convert-to-einvoice.request.json) üç bilgiyi değiştirin:

- `invoiceId`: Oluşturduğunuz taslağın ID'si.
- `prefixId`: İlk adımda seçtiğiniz seri ID'si.
- `alias`: Alıcının posta kutusu.

Bu işlemden gelen başarı mesajı, faturanın son durumunu tek başına göstermez. Sonraki adımda durumunu kontrol edin.

## 5. Faturanın durumunu sorgulayın

```text
POST /api/Invoice/check-invoice-status
```

[Durum sorgusu JSON'unda](../samples/json/check-invoice-status.request.json) `invoiceId` alanını belge ID'siyle değiştirin. Dokümandaki örnekte `invoiceDocumentDirection: 1` giden, `2` gelen fatura için kullanılır. Bu alanda hata alırsanız [yön bilgisi açıklamasına](sorun-giderme.md) bakın.

Gönderdiğiniz faturayı giden listede de kontrol edebilirsiniz:

```text
GET /api/Invoice/get-outgoing-invoice-list?PageNumber=1&PageSize=10
```

Listeden dönen `invoiceId`, belge indirme işlemlerinde kullanılır. Gelen faturalar için `get-incoming-invoice-list` adresini kullanın.

## 6. PDF veya XML indirin

```text
GET /api/Invoice/get-invoice-pdf/{invoiceId}
GET /api/Invoice/get-invoice-xml/{invoiceId}
```

Yanıtın `data` alanı dosyanın Base64 ile kodlanmış içeriğidir. Bu metni çözüp dosyaya kaydetmeniz gerekir. [.NET](../examples/dotnet/README.md) ve [PHP](../examples/php/README.md) örneklerindeki `pdf` ve `xml` komutları bunu sizin için yapar.

Gelen faturaları indirmek için `get-incoming-invoice-pdf` ve `get-incoming-invoice-xml` adreslerini kullanın.

## Birden fazla sayfa varsa

Liste sonuçları `datas` içinde gelir. `totalPages` toplam sayfa sayısını verir. `PageNumber` değerini artırarak diğer sayfaları alın. Tarih aralığı için `StartDate` ve `EndDate`, arama için `Search` ekleyebilirsiniz.

Kendi sisteminizde faturayı takip etmek istiyorsanız oluştururken `refId` alanına bir GUID yazabilirsiniz. Bu değerle `get-draft-invoice-preview-by-ref/{refId}` üzerinden taslağı bulabilirsiniz. Aynı `refId` ile tekrar istek göndermenin ikinci faturayı engellediği belgelenmediğinden, yanıt alamadığınızda önce mevcut taslağı kontrol edin.

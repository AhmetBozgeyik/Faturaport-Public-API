# e-Fatura API entegrasyonu

## 1. Alıcı ve referans bilgilerini alın

`POST /api/Invoice/check-customer-einvoice-info/{taxnumber}` (gövdesiz) çağrısında VKN/TCKN değerini URL içinde gönderin.

| Yanıt alanı | Kullanım |
|---|---|
| `data.customerIsEInvoiceAndAliasList.isEInvoiceUser` | Alıcının e-Fatura mükellefiyeti |
| `data.customerIsEInvoiceAndAliasList.aliasList` | Alıcı posta kutusu (`alias`) seçimi |
| `data.prefixList[].invoicePrefixId` | Taslakta `invoicePrefixId`, gönderimde `prefixId` |
| `data.companyInfo` | Alıcı unvan ve adres bilgileri |

`companyInfo.unvan` → `company.companyName`, `vergiDairesiAdi` → `taxOffice`, `adres` → `address`, `ilAdi` → `city`, `ilceAdi` → `district` şeklinde eşleyin. VKN/TCKN'yi `taxNumber` alanına yazın; ülke bilgisini ayrıca doldurun. Dönen nesneyi alan adlarını dönüştürmeden doğrudan `company` olarak göndermeyin.

`GET /api/Invoice/units` ile gerçek `unitId` değerini alın. İhtiyaç duyulan vergi kodlarını `GET /api/Invoice/invoice-code/Satis` ile sorgulayın. Sabit örnek seri, birim, vergi kodu ve posta kutusu değerlerini hesabınızdan alınan değerlerle değiştirin.

## 2. Taslak oluşturun

`POST /api/Invoice/add-invoice` için [taslak JSON şablonunu](../samples/json/create-invoice.request.json) uyarlayın. Bu endpointin açıklaması **taslak oluşturma** olarak verilmiştir; yanıt alınması belgenin gönderildiğini göstermez.

- `invoiceProfileId`: Örnek `TICARIFATURA`; işleme uygun profili seçin.
- `invoiceTypeId`: Örnek `Satis`.
- `draftInvoiceType`: Örnekte `DraftInvoice` ile taslak akışı açıkça seçilir.
- `invoicePrefixId`: Hesabınızın uygun seri ID'si.
- `invoiceDate`: Geçerli ISO 8601 tarih/saat.
- `invoiceOutputType`: `Ubl`, `Html`, `Pdf` veya `Xml`.
- `refId`: İsteğe bağlı GUID dış referansı. Public doküman bu alan için idempotency garantisi vermez.
- Örnekte 1 × 1000 TRY, 200 TRY vergi ve 1200 TRY toplam kullanılır. Tutarları kendi kalemlerinizle tutarlı hesaplayın.

Başarılı yanıtın **üst seviyesindeki `invoiceId`** taslak ID'sidir. `data` alanı seçilen çıktı formatına ait içeriktir.

## 3. Taslağı kontrol edin ve gönderin

`GET /api/Invoice/get-draft-invoice-preview/{draftInvoiceId}` ile taslağı kontrol edin. RefId kullanıldıysa `GET /api/Invoice/get-draft-invoice-preview-by-ref/{refId}` çağrılabilir.

Gönderim için `POST /api/Invoice/convert-to-einvoice`:

```json
{
  "invoiceId": "TASLAK_ID",
  "prefixId": "SERI_ID",
  "alias": "ALICININ_POSTA_KUTUSU"
}
```

Bu örnekteki ID alanlarına gerçek GUID değerleri yazılmalıdır. Örnek istemciler gönderimi otomatik yapmaz; `send` komutuyla ayrı çağırın. Başarılı dönüşüm yanıtı nihai belge kabul durumu yerine geçmez.

## 4. Durum ve belgeyi alın

`POST /api/Invoice/check-invoice-status` gövdesi, dokümandaki örneğe göre:

```json
{ "invoiceId": "BELGE_ID", "invoiceDocumentDirection": 1 }
```

`1` giden, `2` gelen yönüdür. Şemanın string yön tanımı ile örnek arasındaki fark için [sorun giderme](sorun-giderme.md) bölümünü okuyun. Gönderim sonrası belge ID'sini giden listeden doğrulayın; dönüşüm yanıtında yeni bir ID alanı belgelenmemiştir.

Giden belgeler: `GET /api/Invoice/get-outgoing-invoice-list?PageNumber=1&PageSize=10`. Gelen belgeler: `GET /api/Invoice/get-incoming-invoice-list?PageNumber=1&PageSize=10`.

PDF: `GET /api/Invoice/get-invoice-pdf/{invoiceId}`. XML: `GET /api/Invoice/get-invoice-xml/{invoiceId}`. Gelen belge için `get-incoming-invoice-pdf` ve `get-incoming-invoice-xml` kullanılır. Yanıtın `data` alanındaki Base64 içeriği çözerek dosyaya yazın. [.NET ve PHP komutları](../README.md) bunu destekler.

Liste çağrılarında `datas`, `pageNumber`, `totalPages`, `totalRecords` alanları vardır. Tarih filtresi `StartDate`/`EndDate`, arama filtresi `Search` şeklindedir. Sayfaları `totalPages` değerine göre ilerletin; tarih sınırlarının dahil olma davranışı public dokümanda açıklanmamıştır.

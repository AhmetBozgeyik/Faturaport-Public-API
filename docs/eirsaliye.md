# e-İrsaliye API entegrasyonu: irsaliye oluşturma ve PDF indirme

Faturaport API ile alıcı, ürün, teslimat ve taşıyıcı bilgilerini göndererek e-İrsaliye oluşturabilirsiniz. İlk denemede taslak kaydetmek, bilgileri kontrol etmenizi sağlar. [API bağlantınızı](baslangic.md) kurduktan sonra aşağıdaki adımları izleyin.

## 1. İrsaliye serisini seçin

```text
GET /api/Invoice/get-despatch-prefix-list
```

Yanıtın `data` listesindeki serilerden birini seçin. Seçtiğiniz kaydın **`invoicePrefixId`** değerini, irsaliye isteğindeki **`despatchPrefixId`** alanına yazın. İki alanın adı farklı olsa da kullanacağınız ID aynıdır.

Kalemlerdeki `unitId` değerlerini `GET /api/Invoice/units` listesinden alın.

## 2. İrsaliye bilgilerini doldurun

[İrsaliye JSON örneğini](../samples/json/add-despatch.request.json) kendi bilgilerinizle düzenleyin:

| Bölüm / Alan | Yazacağınız bilgi |
|---|---|
| `despatchPrefixId` | Seçtiğiniz seri ID'si |
| `despatchDate` | İrsaliyenin düzenlenme tarihi |
| `actualDespatchDate` | Fiili sevk tarihi ve saati |
| `company` | Alıcı firmanın unvanı, VKN/TCKN ve adresi |
| `deliveryAddress`, `deliveryCity`, `deliveryDistrict` | Teslimat adresi, il ve ilçe |
| `carrier` | Taşıyıcı firma, şoför, araç ve varsa dorse bilgileri |
| `lineItems` | Sevk edilen ürünler, miktarları ve birimleri |
| `despatchOutputType` | Yanıtta almak istediğiniz biçim; örnekte `Pdf` |

İl ve ilçe adlarını metin olarak yazabilirsiniz. API bu isimlerin karşılığını bulur; ayrıca il/ilçe ID'si aramanız gerekmez. Sipariş bilgisi kullanıyorsanız `orderNumber` ve `orderDate` alanlarını da doldurun.

## 3. Taslak oluşturun veya doğrudan gönderin

```text
POST /api/Invoice/add-despatch
```

Belgenin nasıl kaydedileceğini **`draftDespatchType`** belirler:

| Değer | Sonuç |
|---|---|
| `DraftInvoice` | Taslak irsaliye kaydeder |
| `EInvoice` | e-İrsaliyeyi onaylar ve GİB'e gönderir |

Repo örneği `DraftInvoice` kullanır. Güncel API dokümanına göre bu alanı hiç göndermezseniz varsayılan değer **`EInvoice`** olur. Bu nedenle ilk denemenizde alanı açıkça yazın.

Başarılı yanıtta `despatchId` döner. Bu ID'yi saklayın. Taslağı kontrol etmek için:

```text
GET /api/Invoice/get-draft-despatch-preview/{draftDespatchId}
GET /api/Invoice/get-draft-despatch-list?PageNumber=1&PageSize=10
```

Mevcut dokümanda kayıtlı taslağı sonradan göndermek için ayrı bir adres bulunmuyor. `add-despatch` ile yeniden istek göndermek yeni bir belge oluşturabilir. Kayıtlı taslağın gönderim adımını destekten öğrenin. Doğrudan gönderim yapacaksanız yeni belge isteğini `EInvoice` değeriyle hazırlayın.

## 4. Gönderilen irsaliyeleri listeleyin

```text
GET /api/Invoice/get-outgoing-despatch-list?PageNumber=1&PageSize=10
GET /api/Invoice/get-incoming-despatch-list?PageNumber=1&PageSize=10
```

Belgeler `datas` listesinde gelir. `despatchStatus` alanını ve belge numarasını kontrol edin. PDF indirmek için buradaki `despatchId` değerini kullanın.

## 5. İrsaliye PDF'sini indirin

```text
GET /api/Invoice/get-despatch-pdf?DespatchId=BELGE_GUID&InvoiceDocumentDirection=1
```

`BELGE_GUID` yerine irsaliye ID'sini yazın. Dokümandaki örneğe göre giden irsaliye için yön `1`, gelen için `2` olur. [Yön alanında hata alırsanız](sorun-giderme.md).

Yanıtın `data` alanındaki Base64 içeriği dosyaya çevirin. Hazır örneklerle, repo klasöründen:

```powershell
dotnet run --project examples/dotnet -- despatch-prefixes
dotnet run --project examples/dotnet -- create-despatch samples/json/add-despatch.request.json
dotnet run --project examples/dotnet -- despatch-pdf BELGE_GUID 1 output/irsaliye.pdf
```

```bash
php examples/php/faturaport.php despatch-prefixes
php examples/php/faturaport.php create-despatch samples/json/add-despatch.request.json
php examples/php/faturaport.php despatch-pdf BELGE_GUID 1 output/irsaliye.pdf
```

PDF komutunu gönderilmiş bir belge için kullanın; taslağı kontrol etmek için `despatch-preview` komutunu kullanabilirsiniz.

## Taslağı silmek istiyorsanız

`DELETE /api/Invoice/delete-draft-despatch/{draftDespatchId}` adresini kullanın. Bu işlem taslağı siler; gönderilmiş irsaliyeyi iptal etmez.

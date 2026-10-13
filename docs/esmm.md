# e-SMM API entegrasyonu: serbest meslek makbuzu oluşturma ve indirme

Faturaport API ile serbest meslek makbuzunu taslak olarak kaydedebilir veya oluştururken doğrudan GİB'e gönderebilirsiniz. Bu rehber seri seçimi, alıcı ve hizmet bilgileri, kayıt ve PDF/XML indirme adımlarını anlatır. Önce [API erişim bilgilerinizi hazırlayın](baslangic.md).

## 1. e-SMM serisini alın

```text
GET /api/Invoice/get-smm-prefix-list
```

Yanıtın `data` listesinden kullanacağınız seriyi seçin. Seçtiğiniz kaydın `invoicePrefixId` değerini makbuz isteğine yazın. Hizmet kalemi için uygun `unitId` değerini `GET /api/Invoice/units` listesinden alın.

## 2. Makbuz bilgilerini hazırlayın

[e-SMM JSON örneğini](../samples/json/add-smm-invoice.request.json) açın. Öncelikle şu alanları değiştirin:

| Alan | Yazacağınız bilgi |
|---|---|
| `invoicePrefixId` | Seçtiğiniz e-SMM serisi |
| `invoiceDate` | Makbuz tarihi |
| `company` | Alıcının unvanı, VKN/TCKN, vergi dairesi ve adresi |
| `lineItems` | Verdiğiniz hizmet, miktar, ücret ve vergiler |
| `subTotalAmount` | Vergi hariç toplam |
| `totalTax` | Vergi toplamı |
| `totalAmount` | Makbuzun toplam / ödenecek tutarı |
| `invoiceOutputType` | Yanıtta almak istediğiniz biçim: `Pdf`, `Html`, `Xml` veya `Ubl` |

Alıcının il ve ilçesini isim olarak yazabilirsiniz. Örnekte 15.000 TL hizmet bedeli ve 1.500 TL KDV bulunur; kesinti eklenmemiştir ve toplam 16.500 TL'dir. Oranları ve kesintileri kendi işleminize göre düzenleyin. Bu dosya, istek alanlarını göstermek için hazırlanmış bir örnektir.

Güncel API dokümanındaki stopajlı örnekte kesinti türü sayı olarak verilmiş; alan tanımında ise metin seçenekleri bulunuyor. Kesinti ekleyecekseniz kullanılacak tür ve vergi kodunu destekten doğrulayın. [Ayrıntı](sorun-giderme.md).

## 3. Makbuzu oluşturun

```text
POST /api/Invoice/add-smm-invoice
```

Hazırladığınız JSON'u gönderin. **`draftSmmInvoiceType`** alanını nasıl işlem yapmak istediğinize göre seçin:

| Değer | Sonuç |
|---|---|
| `DraftInvoice` | Taslak makbuz kaydeder |
| `Invoice` | Makbuzu onaylar ve GİB'e gönderir |

Repodaki JSON örneği `DraftInvoice` kullanır. e-SMM doğrudan gönderiminde değer **`Invoice`** olmalıdır; e-İrsaliye örneğindeki `EInvoice` ile karıştırmayın.

Başarılı yanıtta dönen `invoiceId` değerini kaydedin. Taslağı görmek için:

```text
GET /api/Invoice/get-draft-smm-preview/{draftInvoiceId}
GET /api/Invoice/get-draft-smm-list?PageNumber=1&PageSize=10
```

Mevcut dokümanda kayıtlı e-SMM taslağını sonradan göndermek için ayrı bir adres bulunmuyor. Oluşturma isteğini tekrar göndermek ikinci bir makbuz oluşturabilir; kayıtlı taslağın gönderim işlemini destekten öğrenin.

## 4. Gönderilen makbuzları listeleyin

```text
GET /api/Invoice/get-outgoing-smm-list?PageNumber=1&PageSize=10
```

Makbuzlar `datas` içinde döner. Makbuz numarası ve `outgoingStatus` bilgisini kontrol edin. PDF ve XML indirmek için listedeki `invoiceId` değerini kullanın.

Listeyi `StartDate`, `EndDate` ve `Search` ile filtreleyebilirsiniz. Birden fazla sayfa varsa `totalPages` değerine göre `PageNumber` artırın.

## 5. PDF veya XML alın

```text
GET /api/Invoice/get-smm-pdf/{invoiceId}
GET /api/Invoice/get-smm-xml/{invoiceId}
```

Yanıtın `data` alanında Base64 ile kodlanmış dosya gelir. Hazır örnekler bu içeriği dosyaya kaydeder. Repo klasöründen çalıştırın:

```powershell
dotnet run --project examples/dotnet -- smm-prefixes
dotnet run --project examples/dotnet -- create-smm samples/json/add-smm-invoice.request.json
dotnet run --project examples/dotnet -- smm-pdf BELGE_GUID output/makbuz.pdf
```

```bash
php examples/php/faturaport.php smm-prefixes
php examples/php/faturaport.php create-smm samples/json/add-smm-invoice.request.json
php examples/php/faturaport.php smm-xml BELGE_GUID output/makbuz.xml
```

`BELGE_GUID` yerine gönderilmiş makbuzun ID'sini yazın. Taslak için `smm-preview` komutunu kullanın.

## Taslak makbuzu silmek istiyorsanız

`DELETE /api/Invoice/delete-draft-smm/{draftInvoiceId}` adresini kullanın. Bu işlem taslağı siler; gönderilmiş makbuzu iptal etmez.

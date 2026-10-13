# e-Arşiv API kullanımı: fatura hazırlama ve iptal işlemi

Faturaport fatura oluşturma isteğinde e-Arşiv için `EARSIVFATURA` profili bulunur. Fatura bilgilerini hazırlarken [e-Fatura rehberindeki](efatura.md) alıcı, birim, vergi ve kalem adımlarını kullanabilirsiniz.

## e-Arşiv faturası hazırlama

Tevkifat, istisna, özel matrah ve ihraç kayıtlı işlemler için [ayrı JSON örnekleri](fatura-turleri.md) de bulunuyor. Bu dört dosya e-Arşiv profili kullanır ve `draftInvoiceType` alanı `EInvoice` olarak verilmiştir. Aşağıdaki taslak adımlarını izleyecekseniz dosyada bu değeri `DraftInvoice` olarak değiştirin.

1. `check-customer-einvoice-info/{taxnumber}` ile alıcı bilgilerini sorgulayın.
2. [Fatura JSON örneğinde](../samples/json/create-invoice.request.json) `invoiceProfileId` değerini `EARSIVFATURA` olarak düzenleyin.
3. Alıcı, tarih, seri ve kalem bilgilerini kendi işleminize göre doldurun.
4. `POST /api/Invoice/add-invoice` ile taslak oluşturun.

API dokümanı e-Arşiv için gönderimde hangi seri ve posta kutusu bilgileriyle ilerlenmesi gerektiğini ayrı olarak açıklamıyor. Canlı kullanım öncesinde bu adımı test hesabınızla ve destek ekibiyle netleştirin.

## Gönderilmiş e-Arşiv faturasını iptal etme

İptal edilecek faturanın ID'sini aşağıdaki adresin sonuna yazın:

```text
POST /api/Invoice/cancel-outgoing-invoice/{outgoingInvoiceId}
```

`Authorization: Bearer TOKEN_DEGERI` başlığını ekleyin. Bu istek için JSON gönderilmesi belgelenmemiştir. Başarılı yanıtta `success: true` ve işlem mesajı döner.

Bu işlem giden **e-Arşiv faturası** için tanımlıdır. e-Fatura veya e-SMM iptali için kullanmayın. İptal koşullarını ve sürelerini destek ekibinden öğrenebilirsiniz.

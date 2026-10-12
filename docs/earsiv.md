# e-Arşiv API kapsamı

Public şemada `InvoiceProfile` içinde `EARSIVFATURA` bulunur. Ortak taslak modeli ve mükellef sorgusu için [e-Fatura rehberini](efatura.md) kullanabilirsiniz. Ancak public doküman e-Arşiv gönderiminde alias, seri ve dönüştürme davranışını ayrı bir akışla açıklamıyor. Canlı kullanım öncesinde bu akışı test hesabında doğrulayın; e-Fatura gönderim kurallarını e-Arşiv için otomatik varsaymayın.

Belgelenen iptal işlemi:

```text
POST /api/Invoice/cancel-outgoing-invoice/{outgoingInvoiceId}
Authorization: Bearer TOKEN
```

İstek gövdesi belgelenmemiştir. Bu endpoint **giden e-Arşiv faturayı iptal etmek** için açıklanmıştır; genel e-Fatura iptal endpointi olarak kullanmayın. Belgeyi ve ortamı kontrol ederek çağırın. İptal koşulları/süreleri public API dokümanında verilmemiştir; destekten doğrulayın.

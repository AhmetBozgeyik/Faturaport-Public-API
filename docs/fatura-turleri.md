# Fatura türleri: tevkifat, istisna, özel matrah ve ihraç kayıtlı JSON örnekleri

Faturaport API'de satış faturası dışında farklı fatura türleri de oluşturabilirsiniz. Bu sayfada her tür için kullanılacak JSON dosyasını ve değiştirmeniz gereken alanları bulabilirsiniz. API bağlantısını henüz kurmadıysanız [başlangıç rehberinden](baslangic.md) başlayın.

Bu örneklerin hepsi aynı adrese gönderilir:

```text
POST /api/Invoice/add-invoice
```

İsteğe `Authorization: Bearer TOKEN_DEGERI` ve `Content-Type: application/json` başlıklarını ekleyin.

## Hangi örneği kullanmalıyım?

| Fatura türü | `invoiceTypeId` | JSON dosyası | Vergi kodu sorgusu |
|---|---|---|---|
| Satış | `Satis` | [Satış faturası](../samples/json/create-invoice.request.json) | `/api/Invoice/invoice-code/Satis` |
| Tevkifat | `Tevkifat` | [Tevkifatlı fatura](../samples/json/tevkifat-invoice.request.json) | `/api/Invoice/invoice-code/Tevkifat` |
| İstisna | `Istisna` | [İstisna faturası](../samples/json/istisna-invoice.request.json) | `/api/Invoice/invoice-code/Istisna` |
| Özel matrah | `OzelMatrah` | [Özel matrah faturası](../samples/json/ozelmatrah-invoice.request.json) | `/api/Invoice/invoice-code/OzelMatrah` |
| İhraç kayıtlı | `IhracKayitli` | [İhraç kayıtlı fatura](../samples/json/ihrackayitli-invoice.request.json) | `/api/Invoice/invoice-code/IhracKayitli` |

Vergi kodu sorgularını GET ile çalıştırın. Dönen listeden işleminize uygun kodu seçin; örneklerdeki `invoiceCodeId` değerlerini bütün faturalar için sabit kabul etmeyin.

## Göndermeden önce ortak alanları düzenleyin

Yeni dört dosyada `invoiceProfileId: EARSIVFATURA` ve `alias: null` kullanılmıştır. Fatura türü ile fatura profili farklı bilgilerdir: örneğin `Tevkifat` türü, alıcının e-Fatura kullanıcısı olup olmadığını belirtmez. Alıcı ve profil seçimi için [e-Fatura](efatura.md) ve [e-Arşiv](earsiv.md) rehberlerini kullanın.

Dosyalardaki `draftInvoiceType` değeri **`EInvoice`** olarak verilmiştir. Taslakla başlamak istiyorsanız bu alanı **`DraftInvoice`** olarak değiştirin. Bu dosyaları, satış örneğindeki taslak seçimiyle aynı kabul ederek çalıştırmayın.

Kendi hesabınıza göre şu alanları değiştirin:

- `invoicePrefixId`: Kullanacağınız fatura serisi. [Alıcı sorgusundan](efatura.md#1-alıcının-e-fatura-bilgilerini-sorgulayın) alın.
- `company`: Alıcının unvanı, VKN/TCKN, vergi dairesi ve adresi.
- `invoiceDate`: Fatura tarihi ve saati.
- `lineItems`: Ürün veya hizmet, miktar, fiyat, birim ve vergiler.
- `subTotalAmount`, `totalTax`, `totalAmount`: Kendi kalemlerinize göre hesaplanan toplamlar.

`unitId` için `GET /api/Invoice/units` listesini kullanın. Çıktı biçimini API dokümanındaki yazımla `Pdf`, `Html`, `Xml` veya `Ubl` olarak seçin. İhraç kayıtlı örnekte bir `productId` de bulunuyor; kendi hesabınızın ürün ID'siyle değiştirin veya kayıtlı bir ürün kullanmıyorsanız bu isteğe bağlı alanı kaldırın.

## Tevkifatlı fatura örneği

[Tevkifat JSON'unda](../samples/json/tevkifat-invoice.request.json) `invoiceTypeId: Tevkifat` kullanılır. Kalemin `lineItemTaxes` listesinde KDV ve `TEVKIFAT` için ayrı kayıtlar vardır.

Dosyadaki hesap 10.000 TL tutar, 2.000 TL KDV ve 1.800 TL tevkifat üzerinden hazırlanmıştır. Fatura toplamı 10.200 TL'dir. `taxAmount` alanındaki KDV tutarı ile fatura düzeyindeki `totalTax` değerinin bu örnekte farklı olduğunu dikkate alın. Kendi işlem tutarınız, oranınız ve kodunuzla birlikte bütün ilgili alanları güncelleyin.

## İstisna faturası örneği

[İstisna JSON'unda](../samples/json/istisna-invoice.request.json) `invoiceTypeId: Istisna` kullanılır. Kalemde `KDV_0`, vergiler listesinde ise KDV ve `ISTISNA` kayıtları yer alır.

Dosyadaki `invoiceCodeId: 46` örnek bir değerdir. İşleminize uygun istisna kodunu sorgudan seçin. Dosyadaki 50.000 TL tutarı ürün veya hizmetinize göre değiştirin.

## Özel matrah faturası örneği

[Özel matrah JSON'unda](../samples/json/ozelmatrah-invoice.request.json) `invoiceTypeId: OzelMatrah` ve vergiler listesinde `OZELMATRAH` kullanılır. `taxableAmount` alanı üzerinden verginin hesaplandığı tutar gösterilir.

**Bu dosyanın tutarlarını kontrol etmeden göndermeyin.** Mevcut örnekte ara toplam 1.000.000 TL, `totalTax` 40.000 TL, ancak `totalAmount` ve kalem toplamı 1.240.000 TL olarak yazılmıştır. Ayrıca KDV kaydındaki `taxableAmount` 1.000.000 TL, özel matrah kaydında 200.000 TL'dir. İşlemde kullanılacak matrahı ve toplamları örneği ekleyen ekip ile netleştirip bütün alanları birlikte düzenleyin.

## İhraç kayıtlı fatura örneği

[İhraç kayıtlı JSON'da](../samples/json/ihrackayitli-invoice.request.json) `invoiceTypeId: IhracKayitli` ve vergiler listesinde `IHRACKAYITLI` kullanılır. Dosyada 500.000 TL tutar ve sıfır vergi bulunur.

Fiyat, vergi kodu ve ürün bilgilerini kendi işleminize göre düzenleyin. Bu örnek, `invoiceProfileId: IHRACAT` kullanan ihracat faturasıyla aynı değildir.

## .NET veya PHP ile nasıl çalıştırırım?

API bilgilerinizi [tanımladıktan](baslangic.md) ve seçtiğiniz dosyayı düzenledikten sonra repo klasöründen çalıştırın. Aşağıdaki komutlar tevkifat dosyasını kullanır; diğer türler için dosya adını değiştirin:

```powershell
dotnet run --project examples/dotnet -- create samples/json/tevkifat-invoice.request.json
```

```bash
php examples/php/faturaport.php create samples/json/tevkifat-invoice.request.json
```

Yanıttaki `invoiceId` değerini kaydedin. Sonraki adımları seçtiğiniz profil ve kayıt türüne göre [e-Fatura](efatura.md) veya [e-Arşiv](earsiv.md) rehberinden takip edin.

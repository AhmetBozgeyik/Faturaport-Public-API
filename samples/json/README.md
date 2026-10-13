# Faturaport API için örnek JSON istekleri ve yanıtları

İstek dosyasını açıp kendi bilgilerinizle düzenleyerek API'ye gönderebilirsiniz. Dosya adı `request.json` ile bitiyorsa gönderilecek bilgileri, `response.json` ile bitiyorsa örnek yanıtı gösterir.

## Hangi dosyayı kullanmalıyım?

| Yapacağınız işlem | JSON örneği |
|---|---|
| Token alma | [token.request.json](token.request.json) |
| Fatura taslağı oluşturma | [create-invoice.request.json](create-invoice.request.json) |
| Tevkifatlı fatura | [tevkifat-invoice.request.json](tevkifat-invoice.request.json) |
| İstisna faturası | [istisna-invoice.request.json](istisna-invoice.request.json) |
| Özel matrah faturası | [ozelmatrah-invoice.request.json](ozelmatrah-invoice.request.json) |
| İhraç kayıtlı fatura | [ihrackayitli-invoice.request.json](ihrackayitli-invoice.request.json) |
| Fatura taslağını gönderme | [convert-to-einvoice.request.json](convert-to-einvoice.request.json) |
| Fatura durumunu sorgulama | [check-invoice-status.request.json](check-invoice-status.request.json) |
| İrsaliye oluşturma | [add-despatch.request.json](add-despatch.request.json) |
| Serbest meslek makbuzu oluşturma | [add-smm-invoice.request.json](add-smm-invoice.request.json) |

İrsaliye ve e-SMM örnekleri taslak oluşturacak şekilde hazırlanmıştır. Gönderim yapmak için ilgili rehberde açıklanan kayıt türünü seçin: [e-İrsaliye](../../docs/eirsaliye.md), [e-SMM](../../docs/esmm.md).

Yeni fatura türü dosyaları `EARSIVFATURA` profili ve `EInvoice` kayıt türü kullanır. Bunları kullanmadan önce [fatura türleri rehberindeki](../../docs/fatura-turleri.md) alan ve tutar kontrollerini yapın. Özellikle özel matrah dosyasındaki toplamların netleştirilmesi gerekir.

## Göndermeden önce hangi bilgileri değiştirmeliyim?

Firma unvanı, VKN/TCKN, adres, seri, tarih, birim ve tutarları değiştirin. Faturada alıcının posta kutusunu da kendi sorgu sonucunuza göre doldurun.

`0000000000`, örnek ID'ler ve `example.com` adresleri deneme değerleridir. Örnekteki `unitId: 1` ve `invoiceCodeId: 0` sizin hesabınızda geçerli olmayabilir; ilgili listelerden aldığınız değerleri kullanın.

e-SMM örneği yalnızca KDV içerir; stopaj veya başka kesinti eklemez. Kesinti kullanacaksanız [ilgili açıklamayı](../../docs/sorun-giderme.md) okuyun.

## Yanıt örnekleri

- [Token yanıtı](getapitoken.response.json): `data.accessToken`.
- [Fatura oluşturma yanıtı](add-invoice.response.json): `invoiceId`.
- [İrsaliye oluşturma yanıtı](add-despatch.response.json): `despatchId`.
- [e-SMM oluşturma yanıtı](add-smm-invoice.response.json): `invoiceId`.
- [Alıcı sorgusu yanıtı](check-customer-einvoice-info.response.json): mükellefiyet, seri ve posta kutuları.
- [Fatura listesi](get-outgoing-invoice-list.response.json): `datas` ve sayfa bilgileri.

Yanıt örnekleri API dokümanından alınmıştır; gerçek hesap testinin sonucu değildir. Firma ve erişim bilgileri örnek değerlerle değiştirilmiştir. PDF/XML dosyalarının `...` ile kısaltılmış içeriği indirilebilir bir belge değildir; indirme işlemi için API'nin döndürdüğü tam `data` değerini kullanın.

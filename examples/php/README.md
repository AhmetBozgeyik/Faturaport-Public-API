# PHP ile Faturaport API entegrasyonu

PHP örneği token alıp seçtiğiniz işlemi çalıştırır. PHP 8.1 veya üzeri ve cURL eklentisi gerekir. Composer paketi kurulmasına gerek yoktur.

## İlk isteği çalıştırın

[API bilgilerinizi tanımlayın](../../docs/baslangic.md). Terminalde repo klasörüne geçip çalıştırın:

```bash
php examples/php/faturaport.php units
```

Birim listesi geliyorsa bağlantınız hazırdır. Her komutta yeni token alınır.

## e-Fatura oluşturma ve gönderme

Önce alıcı bilgilerini sorgulayın:

```bash
php examples/php/faturaport.php customer VKN_VEYA_TCKN
php examples/php/faturaport.php codes Satis
```

[Fatura JSON'unu](../../samples/json/create-invoice.request.json) hesabınıza ve faturaya göre düzenleyin. Taslak oluşturup yanıttaki `invoiceId` değerini kullanarak kontrol edin:

```bash
php examples/php/faturaport.php create samples/json/create-invoice.request.json
php examples/php/faturaport.php preview TASLAK_GUID
```

[Gönderim JSON'undaki](../../samples/json/convert-to-einvoice.request.json) taslak ID'sini, seri ve posta kutusunu doldurun. Ardından:

```bash
php examples/php/faturaport.php send samples/json/convert-to-einvoice.request.json
php examples/php/faturaport.php invoices outgoing
php examples/php/faturaport.php status BELGE_GUID 1
php examples/php/faturaport.php pdf outgoing BELGE_GUID output/fatura.pdf
php examples/php/faturaport.php xml outgoing BELGE_GUID output/fatura.xml
```

`TASLAK_GUID` ve `BELGE_GUID` yerlerine gerçek ID'leri yazın. Bu komutlar otomatik bir işlem zinciri değildir; her adımın sonucunu kontrol ederek ilerleyin. [e-Fatura adımlarının açıklaması](../../docs/efatura.md).

## e-İrsaliye ve e-SMM oluşturma

```bash
php examples/php/faturaport.php despatch-prefixes
php examples/php/faturaport.php create-despatch samples/json/add-despatch.request.json
php examples/php/faturaport.php smm-prefixes
php examples/php/faturaport.php create-smm samples/json/add-smm-invoice.request.json
```

Önce seri listesini alın ve JSON dosyasını kendi bilgilerinizle doldurun. Örnek dosyalar taslak oluşturur. Gönderim ve indirme adımları için [e-İrsaliye](../../docs/eirsaliye.md) ve [e-SMM](../../docs/esmm.md) rehberlerini kullanın.

## Diğer komutlar

PHP örneği [.NET komut tablosundaki](../dotnet/README.md#kullanabileceğiniz-komutlar) bütün komutları destekler. Komutun önüne `php examples/php/faturaport.php` yazmanız yeterlidir.

Liste komutları ilk 10 kaydı alır. PDF/XML komutları belgeyi belirtilen dosyaya kaydeder. cURL eklentisi hatası alırsanız PHP ayarlarınızda eklentinin açık olduğunu kontrol edin. Diğer hatalar için [çözüm önerilerine](../../docs/sorun-giderme.md) bakın.

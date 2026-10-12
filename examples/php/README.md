# PHP örnekleri

PHP 8.1+ ve cURL uzantısı gereklidir. Composer paketi gerektirmez. [Ortam değişkenlerini](../../docs/baslangic.md) tanımladıktan sonra **repo kökünden** çalıştırın:

```bash
php examples/php/faturaport.php units
php examples/php/faturaport.php customer VKN_VEYA_TCKN
php examples/php/faturaport.php codes Satis
php examples/php/faturaport.php create samples/json/create-invoice.request.json
php examples/php/faturaport.php preview TASLAK_GUID
php examples/php/faturaport.php send samples/json/convert-to-einvoice.request.json
php examples/php/faturaport.php status BELGE_GUID 1
php examples/php/faturaport.php pdf outgoing BELGE_GUID output/fatura.pdf
php examples/php/faturaport.php xml outgoing BELGE_GUID output/fatura.xml
php examples/php/faturaport.php despatches incoming
```

`create` ve `send` öncesinde JSON dosyalarını gerçek hesap ve belge bilgileriyle uyarlayın. Yukarıdaki komutlar ayrı işlemlerdir; otomatik gönderim zinciri değildir. `BELGE_GUID`/`TASLAK_GUID` yerine gerçek GUID kullanın.

PHP örneği [.NET komut tablosundaki](../dotnet/README.md) bütün komutları aynı argümanlarla destekler. Her çalıştırmada token alınır. Liste komutları yalnızca ilk sayfayı getirir. PDF/XML komutları `data` içindeki Base64 çıktıyı dosyaya yazar. Ayrıntılı akış: [e-Fatura rehberi](../../docs/efatura.md).

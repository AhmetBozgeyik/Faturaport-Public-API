# Postman ile Faturaport API'yi deneme

Kod yazmadan API bağlantısını ve belge işlemlerini denemek için bu koleksiyonu kullanabilirsiniz. Koleksiyon güncel dokümandaki 34 işlemi içerir.

## Bağlantıyı kurun

1. [Koleksiyon dosyasını](faturaport.postman_collection.json) Postman'de **Import** ile açın.
2. Koleksiyon değişkenlerinde `companyCode`, `clientId` ve `clientSecret` alanlarını kendi bilgilerinizle doldurun.
3. `baseUrl` test için `https://devapi.faturaport.com` olarak hazırdır.
4. **POST Token Alma** isteğini çalıştırın. Başarılı yanıtta token otomatik olarak `accessToken` değişkenine kaydedilir.
5. **GET Birim listesi** isteğini çalıştırarak bağlantıyı kontrol edin.

## Belge oluşturun

Yapacağınız işleme göre [e-Fatura](../docs/efatura.md), [e-İrsaliye](../docs/eirsaliye.md) veya [e-SMM](../docs/esmm.md) rehberini izleyin. Önce gerekli seriyi ve birimleri sorgulayın, ardından oluşturma isteğinin **Body** bölümündeki örnek JSON'u düzenleyin.

İstek adresindeki `invoiceId`, `despatchId`, `draftDespatchId` gibi değerleri koleksiyon değişkenlerinden doldurabilirsiniz. **Body içindeki seri ve belge ID'leri ayrıca değiştirilmelidir**; adres değişkenlerini düzenlemek JSON içeriğini değiştirmez.

İrsaliye ve e-SMM oluşturma örnekleri taslak kaydeder. Doğrudan gönderim yapacaksanız rehberdeki kayıt türünü seçin.

## İstekleri ayrı çalıştırın

İhtiyacınız olan isteği seçip **Send** ile gönderin. Koleksiyonun tamamını **Runner** üzerinden çalıştırmayın; içinde belge oluşturma, gönderme, taslak silme ve e-Arşiv iptal işlemleri bulunur.

Canlıya geçerken API adresini, erişim bilgilerini ve belge/seri ID'lerini Canlı hesabınıza göre değiştirin. Erişim bilgilerinizi veya tokenınızı içeren koleksiyonu dışa aktarıp GitHub'a yüklemeyin.

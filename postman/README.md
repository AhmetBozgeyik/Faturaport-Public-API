# Postman koleksiyonu

1. [Koleksiyonu](faturaport.postman_collection.json) Postman'e import edin.
2. `baseUrl` varsayılan olarak Dev adresidir. `companyCode`, `clientId` ve `clientSecret` değerlerini kendi yerel değişkenlerinize girin.
3. **POST Token Alma** isteğini çalıştırın. Başarılı yanıtta `data.accessToken`, koleksiyonun `accessToken` değişkenine aktarılır.
4. **GET Birim listesi** isteğiyle erişimi doğrulayın.
5. Mükellef sorgusu için `taxnumber`, belge çağrıları için uygun ID değişkenlerini doldurun.

Koleksiyon bütün 21 public işlemi içerir. **Koleksiyonun tamamını Runner ile çalıştırmayın**: taslak oluşturma, gönderme, silme ve e-Arşiv iptal işlemleri içerir. İstekleri ihtiyacınız olan sırayla ayrı çalıştırın.

Taslak oluşturma ve dönüştürme gövdeleri JSON şablonlarıdır; gövde içindeki UUID/alias değerlerini kendiniz değiştirin. URL değişkenlerinin değiştirilmesi gövdeleri otomatik güncellemez. `direction` varsayılan `1` (giden), gelen için `2`; [şema farkı](../docs/sorun-giderme.md).

Erişim bilgilerini veya tokenı içeren koleksiyonu export edip repoya eklemeyin. Canlıya geçerken `baseUrl`, erişim bilgileri ve belge/seri ID'lerini Canlı değerleriyle değiştirin.

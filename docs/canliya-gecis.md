# Canlıya geçiş

1. Dev ortamında token, referans sorguları, taslak, gönderim, durum ve belge indirme adımlarını kendi hesabınızla doğrulayın.
2. https://portal.faturaport.com üzerinden **Ayarlar → API Ayarları** bölümünde Canlı erişim bilgilerinizi oluşturun; firma kodunu hazırlayın.
3. `FATURAPORT_BASE_URL=https://prodapi.faturaport.com` ayarlayın ve Canlı erişim bilgilerini kullanın.
4. Canlı ortamda seri, posta kutusu, birim ve vergi kodlarını yeniden sorgulayın. Dev belge/seri ID'lerini taşımayın.
5. Önce `units` gibi bir sorguyla kimlik doğrulamayı kontrol edin. Belge oluşturma ve gönderimi uygulamanızın kontrollü akışıyla başlatın.
6. Gönderim sonrasında işlem durumunu izleyin ve PDF/XML çıktısını kontrol edin.

Client Secret yalnızca sunucu tarafında tutulmalıdır. Public repo, tarayıcı kodu veya uygulama loglarına eklemeyin. Örneklerdeki UUID, tarih, firma ve posta kutusu değerlerini Canlıya aynen taşımayın.

# Faturaport API: test ortamından Canlıya geçiş

Test hesabınızda bağlantıyı kurup kullanacağınız belge işlemlerini denedikten sonra Canlı API'ye geçebilirsiniz. Canlı ortam için ayrıca API erişim bilgileri oluşturmanız gerekir.

## 1. Canlı API bilgilerinizi alın

[portal.faturaport.com](https://portal.faturaport.com) hesabınıza giriş yapın. **Ayarlar → API Ayarları** bölümünden Client ID ve Client Secret oluşturun. Aynı hesabın firma kodunu da hazırlayın.

## 2. API adresini değiştirin

Hazır örneklerde `FATURAPORT_BASE_URL` değerini şu adresle değiştirin:

```text
https://prodapi.faturaport.com
```

Firma kodu, Client ID ve Client Secret değerlerini Canlı hesabınıza ait bilgilerle güncelleyin. Yeni token alın ve önce birim listesi gibi bir sorguyla bağlantıyı kontrol edin.

## 3. Belge bilgilerini Canlı hesaptan alın

Fatura serisini, irsaliye serisini, e-SMM serisini, posta kutusunu ve gereken birim/vergi kodlarını Canlı API'den sorgulayın. Test hesabına ait seri ve belge ID'leriyle devam etmeyin.

## 4. Gönderimi kontrol edin

Belge oluşturmadan önce alıcı, tarih, tutar ve seçilen kayıt türünü kontrol edin. e-İrsaliyede `EInvoice`, e-SMM'de `Invoice` değeri doğrudan gönderim yapar. İşlem sonrasında giden belge listesini ve PDF/XML çıktısını kontrol edin.

Client Secret bilgisini yalnızca sunucunuzda tutun. GitHub'a, tarayıcıda çalışan kodlara veya uygulama loglarına yazmayın.

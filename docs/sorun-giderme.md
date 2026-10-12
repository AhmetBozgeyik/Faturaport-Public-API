# Hatalar ve sorun giderme

| Durum | Kontrol |
|---|---|
| HTTP 400 | JSON biçimi, alan adları, GUID ve tarih biçimleri, zorunlu alanlar, işleme uygun seri ve tutarlar |
| HTTP 401 | `Authorization: Bearer ...`, token geçerliliği ve seçilen ortam |
| HTTP 403 | Hesap ve işlem erişimi; destekle görüşün |
| HTTP 404 | Endpoint, belge ID'si, gelen/giden yönü ve ortam |
| HTTP 2xx ama `success: false` veya `succeeded: false` | İşlem başarısızdır; `message` ve hata içeriğini inceleyin |
| Ağ hatası veya timeout | İşlemin sonucu belirsiz olabilir; belge oluşturan/gönderen isteği kontrol etmeden tekrar göndermeyin |

Örnek istemciler otomatik tekrar deneme yapmaz. GET sorgularında kontrollü tekrar deneme uygulanabilir; belge oluşturan/gönderen POST isteklerinde önce taslak/belge durumunu kontrol edin. `refId` idempotency garantisi değildir.

## Public dokümandaki farklılıklar

- `InvoiceDocumentDirection` şeması string `Outgoing`/`Incoming` olarak tanımlanırken durum ve irsaliye PDF açıklamaları `1`/`2` kullanıyor. Repodaki yön örnekleri işlem açıklamalarındaki sayısal değerleri izler. Test ortamında 400 alırsanız şema değerini kontrol edin; doğru sözleşmeyi destekten doğrulayın.
- Token yanıtı `data.accessToken` alanını kullanır.
- Taslak oluşturma yanıtı `invoiceId` alanını üst seviyede döndürür.
- Liste sonuçları `data` yerine `datas` dizisinde bulunur.
- `getapitoken` için şemada `company_code` vardır; yalnızca Client ID ve Client Secret ile yetinmeyin.
- Şemadaki `required` listesi iş kurallarının tamamını belirtmeyebilir; endpoint açıklamalarını ve referans listelerini de takip edin.

Destek bildiriminize ortam, yöntem, endpoint, HTTP durum kodu ve gizli bilgilerden arındırılmış hata mesajı ekleyin. Token, Client Secret ve müşteri verilerini public issue içine koymayın.

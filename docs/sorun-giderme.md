# Faturaport API hataları ve çözüm önerileri

Bir istek başarısız olduğunda önce HTTP durum koduna, ardından API'nin verdiği mesajı taşıyan `message` alanına bakın. Aşağıdaki kontroller en sık karşılaşılan bağlantı ve veri hatalarını bulmanıza yardımcı olur.

| Aldığınız sonuç | Ne yapmalısınız? |
|---|---|
| 400 — İstek kabul edilmedi | JSON alan adlarını, tarihleri, belge ID'lerini, seri ve tutar bilgilerini kontrol edin |
| 401 — Giriş gerekiyor | Tokenın doğru gönderildiğini kontrol edin; gerekirse yeni token alın. Test tokenını Canlı adrese göndermeyin |
| 403 — İzin yok | Hesabınızın ilgili işlem için yetkisini destek ekibiyle kontrol edin |
| 404 — Bulunamadı | Belge ID'sini, gelen/giden yönünü ve seçtiğiniz ortamı kontrol edin |
| `success: false` veya `succeeded: false` | HTTP kodu başarılı görünse bile işlem başarısızdır; mesajı inceleyin |
| Bağlantı kesildi veya süre doldu | Tekrar belge oluşturmadan önce taslak ve gönderilen belge listelerini kontrol edin |

## Token alırken hata alıyorum

Firma kodu, Client ID ve Client Secret aynı hesaba ve ortama ait olmalıdır. Token yanıtındaki alan `data.accessToken` adını taşır. Diğer isteklere `Authorization: Bearer TOKEN_DEGERI` başlığı ekleyin.

## Belge ID'sini nereden alacağım?

Fatura ve e-SMM oluşturma yanıtında `invoiceId`, irsaliye oluşturma yanıtında `despatchId` döner. Liste sonuçlarında belgeler `datas` içinde yer alır. PDF/XML isteğinde doğru belge türüne ait ID'yi kullanın.

ID alanları `3fa85f64-5717-4562-b3fc-2c963f66afa6` biçimindeki GUID değerleridir; fatura numarasıyla aynı şey değildir.

## Gelen/giden yönü için hangi değeri yazmalıyım?

Durum sorgusu ve irsaliye PDF açıklamaları giden için `1`, gelen için `2` kullanıyor. API'nin alan tanımında ise `Outgoing` ve `Incoming` yazıyor. Repo örnekleri işlem açıklamasındaki `1`/`2` değerlerini kullanır. Bu alanda 400 alırsanız iki tanım arasındaki farkı destek ekibine ileterek hesabınızda kabul edilen değeri doğrulayın.

## e-SMM kesinti örneğini nasıl kullanmalıyım?

Kaynak dokümandaki e-SMM örneğinde bazı vergi tutarları tırnak içinde, kesinti türü ise sayı olarak verilmiş. Alan tanımlarında tutarlar sayı, vergi türleri metin olarak açıklanıyor. Ayrıca açıklamadaki `discountAmountBeforePayableAmount` alanı istek alanları arasında bulunmuyor.

Repodaki e-SMM örneği bu belirsiz kesinti alanlarını kullanmadan, yalnızca KDV ile hazırlanmıştır. Stopaj veya başka kesinti ekleyecekseniz doğru vergi türü, kodu ve toplam hesabını destekten doğrulayın.

## Aynı belgeyi iki kez oluşturmamak için ne yapmalıyım?

Belge oluştururken bağlantı kesilirse istek sunucuya ulaşmış olabilir. İsteği tekrar göndermeden önce taslak ve gönderilen belge listelerini kontrol edin. Faturada `refId` kullandıysanız `get-draft-invoice-preview-by-ref/{refId}` ile arayabilirsiniz. Aynı referansın ikinci belgeyi engellediği dokümanda belirtilmiyor.

## Destek ekibine hangi bilgileri göndermeliyim?

Kullandığınız ortamı, işlem adresini, HTTP durum kodunu ve aldığınız hata mesajını yazın. Client Secret, token ve müşteri bilgilerini GitHub'da açık bir sorun kaydına eklemeyin. İletişim: **destek@faturaport.com**.

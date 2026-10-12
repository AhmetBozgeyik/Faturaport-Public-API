# JSON örnekleri

`*.request.json` dosyaları istek şablonlarıdır. `*.response.json` dosyaları public dokümandan alınmış, firma/VKN/posta kutusu alanları temsili değerlerle değiştirilmiş yanıt örnekleridir; gerçek API test çıktısı değildir.

| Dosya | Kullanım |
|---|---|
| [token.request.json](token.request.json) | Firma kodu, Client ID ve Client Secret |
| [create-invoice.request.json](create-invoice.request.json) | Tek kalemli satış taslağı |
| [convert-to-einvoice.request.json](convert-to-einvoice.request.json) | Taslağı gönderme |
| [check-invoice-status.request.json](check-invoice-status.request.json) | Belge durumu |
| [getapitoken.response.json](getapitoken.response.json) | `data.accessToken` yapısı |
| [add-invoice.response.json](add-invoice.response.json) | Üst seviyede `invoiceId` |
| [check-customer-einvoice-info.response.json](check-customer-einvoice-info.response.json) | Mükellef, seri ve alıcı bilgileri |
| [get-outgoing-invoice-list.response.json](get-outgoing-invoice-list.response.json) | Sayfalama ve `datas` yapısı |

Göndermeden önce firma, tarih, seri, birim, vergi kodu ve alias alanlarını güncelleyin. `0000000000`, örnek UUID'ler ve `example.com` adresleri şablon değeridir. `unitId: 1` ve `invoiceCodeId: 0` hesabınızda geçerli olmak zorunda değildir.

PDF/XML yanıt örneklerindeki kısaltılmış Base64 içerikleri (`...`) dosyaya çevrilemez. Gerçek API yanıtındaki tam `data` alanını kullanın. Durum sorgusu örneği işlem açıklamasındaki sayısal yönü izler; [şema farkını](../../docs/sorun-giderme.md) okuyun.

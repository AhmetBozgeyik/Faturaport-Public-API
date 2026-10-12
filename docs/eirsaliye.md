# e-İrsaliye API entegrasyonu

Public API gelen/giden e-İrsaliye listeleme ve PDF alma işlemlerini sunar. Oluşturma, gönderme ve irsaliye yanıtı endpointleri Dev ve Canlı public dokümanda bulunmuyor.

```text
GET /api/Invoice/get-outgoing-despatch-list?PageNumber=1&PageSize=10
GET /api/Invoice/get-incoming-despatch-list?PageNumber=1&PageSize=10
```

Her iki çağrı `StartDate`, `EndDate`, `PageNumber`, `PageSize`, `Search` filtrelerini destekler. Sonuçlar `datas` dizisindedir. PDF için listedeki **`despatchId`** değerini kullanın.

```text
GET /api/Invoice/get-despatch-pdf?DespatchId=BELGE_GUID&InvoiceDocumentDirection=1
```

Dokümandaki örneğe göre `1` giden, `2` gelen yönüdür. [Yön alanı şema farkı](sorun-giderme.md). PDF içeriği JSON yanıtının `data` alanında Base64 olarak döner.

Repo kökünden:

```powershell
dotnet run --project examples/dotnet -- despatches outgoing
dotnet run --project examples/dotnet -- despatch-pdf BELGE_GUID 1 output/irsaliye.pdf
```

```bash
php examples/php/faturaport.php despatches incoming
php examples/php/faturaport.php despatch-pdf BELGE_GUID 2 output/irsaliye.pdf
```

# Faturaport API adresleri ve istek alanları

Fatura, irsaliye ve serbest meslek makbuzu işlemlerinin adreslerini bu sayfada bulabilirsiniz. İlk kez bağlantı kuruyorsanız [hesap açma ve token alma](baslangic.md) adımlarıyla başlayın.

İstek adresinin başına test için `https://devapi.faturaport.com`, Canlı için `https://prodapi.faturaport.com` ekleyin. Token alma dışında bütün işlemlerde `Authorization: Bearer TOKEN` gönderin. JSON gönderirken `Content-Type: application/json` kullanın.

13 Ekim 2026 tarihinde [Dev](https://devapi.faturaport.com/docs/index.html) ve [Canlı](https://prodapi.faturaport.com/docs/index.html) dokümanlarıyla güncellendi.

## İşlem listesi

| İşlem | Yöntem ve adres |
|---|---|
| Token Alma | `POST /api/Invoice/getapitoken` |
| Fatura oluşturma | `POST /api/Invoice/add-invoice` |
| Giden e-fatura listesi | `GET /api/Invoice/get-outgoing-invoice-list` |
| Giden e fatura pdf görüntüleme | `GET /api/Invoice/get-invoice-pdf/{invoiceId}` |
| Giden e fatura ubl (xml) | `GET /api/Invoice/get-invoice-xml/{invoiceId}` |
| Gelen e-fatura listesi | `GET /api/Invoice/get-incoming-invoice-list` |
| Gelen e fatura pdf görüntüleme | `GET /api/Invoice/get-incoming-invoice-pdf/{invoiceId}` |
| Gelen e fatura ubl (xml) | `GET /api/Invoice/get-incoming-invoice-xml/{invoiceId}` |
| Taslak fatura listesi | `GET /api/Invoice/get-draft-invoice-list` |
| Taslak fatura silme | `DELETE /api/Invoice/delete-draft-invoice/{draftInvoiceId}` |
| Taslak faturayı e-faturaya dönüştürme | `POST /api/Invoice/convert-to-einvoice` |
| Fatura durum kontrolü | `POST /api/Invoice/check-invoice-status` |
| Giden e-arşiv faturayı iptal etme | `POST /api/Invoice/cancel-outgoing-invoice/{outgoingInvoiceId}` |
| e-Fatura mükellefiyet, posta kutuları, fatura serisi | `POST /api/Invoice/check-customer-einvoice-info/{taxnumber}` |
| fatura tipine göre vergi kodu listesi | `GET /api/Invoice/invoice-code/{invoiceType}` |
| Birim listesi | `GET /api/Invoice/units` |
| Taslak fatura detayı | `GET /api/Invoice/get-draft-invoice-preview/{draftInvoiceId}` |
| RefId ile taslak fatura detayı | `GET /api/Invoice/get-draft-invoice-preview-by-ref/{refId}` |
| Giden e-irsaliye listesi | `GET /api/Invoice/get-outgoing-despatch-list` |
| Gelen e-irsaliye listesi | `GET /api/Invoice/get-incoming-despatch-list` |
| E-irsaliye pdf görüntüleme | `GET /api/Invoice/get-despatch-pdf` |
| E-İrsaliye oluşturma | `POST /api/Invoice/add-despatch` |
| İrsaliye seri (prefix) listesi | `GET /api/Invoice/get-despatch-prefix-list` |
| Taslak irsaliye listesi | `GET /api/Invoice/get-draft-despatch-list` |
| Taslak irsaliye detayı | `GET /api/Invoice/get-draft-despatch-preview/{draftDespatchId}` |
| Taslak irsaliye silme | `DELETE /api/Invoice/delete-draft-despatch/{draftDespatchId}` |
| SMM Fatura oluşturma | `POST /api/Invoice/add-smm-invoice` |
| Giden e-SMM listesi | `GET /api/Invoice/get-outgoing-smm-list` |
| Taslak SMM listesi | `GET /api/Invoice/get-draft-smm-list` |
| Giden e-SMM PDF görüntüleme | `GET /api/Invoice/get-smm-pdf/{invoiceId}` |
| Giden e-SMM UBL (XML) | `GET /api/Invoice/get-smm-xml/{invoiceId}` |
| Taslak SMM detayı | `GET /api/Invoice/get-draft-smm-preview/{draftInvoiceId}` |
| SMM seri (prefix) listesi | `GET /api/Invoice/get-smm-prefix-list` |
| Taslak SMM silme | `DELETE /api/Invoice/delete-draft-smm/{draftInvoiceId}` |

## İstek ayrıntıları

## Token Alma

`POST /api/Invoice/getapitoken`

Gönderilecek JSON alanları: [LoginTokenDTO](veri-alanlari.md#logintokendto).

HTTP yanıtları: `200`, `400`.

Başarılı yanıtta dönen alanlar: [LoginResponseDTODataResult](veri-alanlari.md#loginresponsedtodataresult).

## Fatura oluşturma

`POST /api/Invoice/add-invoice`

Gönderilecek JSON alanları: [CreateInvoiceRequestDTO](veri-alanlari.md#createinvoicerequestdto).

HTTP yanıtları: `200`, `400`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [CreateInvoiceResponse](veri-alanlari.md#createinvoiceresponse).

## Giden e-fatura listesi

`GET /api/Invoice/get-outgoing-invoice-list`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `StartDate` | Soru işaretinden sonra | Hayır | date-time |
| `EndDate` | Soru işaretinden sonra | Hayır | date-time |
| `PageSize` | Soru işaretinden sonra | Hayır | int32 |
| `PageNumber` | Soru işaretinden sonra | Hayır | int32 |
| `Search` | Soru işaretinden sonra | Hayır | string |

HTTP yanıtları: `200`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [GetOutgoingInvoiceListResponseDTOPaginatedResult](veri-alanlari.md#getoutgoinginvoicelistresponsedtopaginatedresult).

## Giden e fatura pdf görüntüleme

`GET /api/Invoice/get-invoice-pdf/{invoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `invoiceId` | Adreste | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

Başarılı yanıtta dönen alanlar: [StringDataResult](veri-alanlari.md#stringdataresult).

## Giden e fatura ubl (xml)

`GET /api/Invoice/get-invoice-xml/{invoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `invoiceId` | Adreste | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

Başarılı yanıtta dönen alanlar: [StringDataResult](veri-alanlari.md#stringdataresult).

## Gelen e-fatura listesi

`GET /api/Invoice/get-incoming-invoice-list`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `StartDate` | Soru işaretinden sonra | Hayır | date-time |
| `EndDate` | Soru işaretinden sonra | Hayır | date-time |
| `PageSize` | Soru işaretinden sonra | Hayır | int32 |
| `PageNumber` | Soru işaretinden sonra | Hayır | int32 |
| `Search` | Soru işaretinden sonra | Hayır | string |

HTTP yanıtları: `200`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [GetIncomingInvoiceListResponseDTOPaginatedResult](veri-alanlari.md#getincominginvoicelistresponsedtopaginatedresult).

## Gelen e fatura pdf görüntüleme

`GET /api/Invoice/get-incoming-invoice-pdf/{invoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `invoiceId` | Adreste | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

Başarılı yanıtta dönen alanlar: [StringDataResult](veri-alanlari.md#stringdataresult).

## Gelen e fatura ubl (xml)

`GET /api/Invoice/get-incoming-invoice-xml/{invoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `invoiceId` | Adreste | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

Başarılı yanıtta dönen alanlar: [StringDataResult](veri-alanlari.md#stringdataresult).

## Taslak fatura listesi

`GET /api/Invoice/get-draft-invoice-list`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `CurrencyTypeId` | Soru işaretinden sonra | Hayır | int32 |
| `StartDate` | Soru işaretinden sonra | Hayır | date-time |
| `EndDate` | Soru işaretinden sonra | Hayır | date-time |
| `PageSize` | Soru işaretinden sonra | Hayır | int32 |
| `PageNumber` | Soru işaretinden sonra | Hayır | int32 |
| `Search` | Soru işaretinden sonra | Hayır | string |

HTTP yanıtları: `200`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [DraftInvoiceResponseDtoPaginatedResult](veri-alanlari.md#draftinvoiceresponsedtopaginatedresult).

## Taslak fatura silme

`DELETE /api/Invoice/delete-draft-invoice/{draftInvoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `draftInvoiceId` | Adreste | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

Başarılı yanıtta dönen alanlar: [Result](veri-alanlari.md#result).

## Taslak faturayı e-faturaya dönüştürme

`POST /api/Invoice/convert-to-einvoice`

Gönderilecek JSON alanları: [ConvertToEInvoiceOpenApiRequestDto](veri-alanlari.md#converttoeinvoiceopenapirequestdto).

HTTP yanıtları: `200`, `400`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [Result](veri-alanlari.md#result).

## Fatura durum kontrolü

`POST /api/Invoice/check-invoice-status`

Gönderilecek JSON alanları: [EInvoiceIdAndDirectionDTO](veri-alanlari.md#einvoiceidanddirectiondto).

HTTP yanıtları: `200`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [Result](veri-alanlari.md#result).

## Giden e-arşiv faturayı iptal etme

`POST /api/Invoice/cancel-outgoing-invoice/{outgoingInvoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `outgoingInvoiceId` | Adreste | Evet | uuid |

HTTP yanıtları: `200`, `400`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [Result](veri-alanlari.md#result).

## e-Fatura mükellefiyet, posta kutuları, fatura serisi

`POST /api/Invoice/check-customer-einvoice-info/{taxnumber}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `taxnumber` | Adreste | Evet | string |

HTTP yanıtları: `200`, `400`, `401`, `403`, `404`, `422`.

Başarılı yanıtta dönen alanlar: [CustomerEInvoiceInfoResponseDto](veri-alanlari.md#customereinvoiceinforesponsedto).

## fatura tipine göre vergi kodu listesi

`GET /api/Invoice/invoice-code/{invoiceType}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `invoiceType` | Adreste | Evet | InvoiceType |

HTTP yanıtları: `200`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [GetInvoiceCodeResponseDTOListDataResult](veri-alanlari.md#getinvoicecoderesponsedtolistdataresult).

## Birim listesi

`GET /api/Invoice/units`

HTTP yanıtları: `200`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [GetUnitForSelectDTOListDataResult](veri-alanlari.md#getunitforselectdtolistdataresult).

## Taslak fatura detayı

`GET /api/Invoice/get-draft-invoice-preview/{draftInvoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `draftInvoiceId` | Adreste | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

Başarılı yanıtta dönen alanlar: [DraftInvoicePreviewResponseDTODataResult](veri-alanlari.md#draftinvoicepreviewresponsedtodataresult).

## RefId ile taslak fatura detayı

`GET /api/Invoice/get-draft-invoice-preview-by-ref/{refId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `refId` | Adreste | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

Başarılı yanıtta dönen alanlar: [DraftInvoicePreviewResponseDTODataResult](veri-alanlari.md#draftinvoicepreviewresponsedtodataresult).

## Giden e-irsaliye listesi

`GET /api/Invoice/get-outgoing-despatch-list`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `StartDate` | Soru işaretinden sonra | Hayır | date-time |
| `EndDate` | Soru işaretinden sonra | Hayır | date-time |
| `PageSize` | Soru işaretinden sonra | Hayır | int32 |
| `PageNumber` | Soru işaretinden sonra | Hayır | int32 |
| `Search` | Soru işaretinden sonra | Hayır | string |

HTTP yanıtları: `200`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [OutgoingDespatchForTableResponseDTOPaginatedResult](veri-alanlari.md#outgoingdespatchfortableresponsedtopaginatedresult).

## Gelen e-irsaliye listesi

`GET /api/Invoice/get-incoming-despatch-list`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `StartDate` | Soru işaretinden sonra | Hayır | date-time |
| `EndDate` | Soru işaretinden sonra | Hayır | date-time |
| `PageSize` | Soru işaretinden sonra | Hayır | int32 |
| `PageNumber` | Soru işaretinden sonra | Hayır | int32 |
| `Search` | Soru işaretinden sonra | Hayır | string |

HTTP yanıtları: `200`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [IncomingDespatchForTableResponseDTOPaginatedResult](veri-alanlari.md#incomingdespatchfortableresponsedtopaginatedresult).

## E-irsaliye pdf görüntüleme

`GET /api/Invoice/get-despatch-pdf`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `DespatchId` | Soru işaretinden sonra | Hayır | uuid |
| `InvoiceDocumentDirection` | Soru işaretinden sonra | Hayır | InvoiceDocumentDirection |

HTTP yanıtları: `200`, `401`, `403`, `404`.

Başarılı yanıtta dönen alanlar: [StringDataResult](veri-alanlari.md#stringdataresult).

## E-İrsaliye oluşturma

`POST /api/Invoice/add-despatch`

Gönderilecek JSON alanları: [CreateDespatchRequestDTO](veri-alanlari.md#createdespatchrequestdto).

HTTP yanıtları: `200`, `400`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [CreateDespatchResponse](veri-alanlari.md#createdespatchresponse).

## İrsaliye seri (prefix) listesi

`GET /api/Invoice/get-despatch-prefix-list`

HTTP yanıtları: `200`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [InvoicePrefixForDropdownResponseDtoListDataResult](veri-alanlari.md#invoiceprefixfordropdownresponsedtolistdataresult).

## Taslak irsaliye listesi

`GET /api/Invoice/get-draft-despatch-list`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `StartDate` | Soru işaretinden sonra | Hayır | date-time |
| `EndDate` | Soru işaretinden sonra | Hayır | date-time |
| `PageSize` | Soru işaretinden sonra | Hayır | int32 |
| `PageNumber` | Soru işaretinden sonra | Hayır | int32 |
| `Search` | Soru işaretinden sonra | Hayır | string |

HTTP yanıtları: `200`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [DraftDespatchResponseDtoPaginatedResult](veri-alanlari.md#draftdespatchresponsedtopaginatedresult).

## Taslak irsaliye detayı

`GET /api/Invoice/get-draft-despatch-preview/{draftDespatchId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `draftDespatchId` | Adreste | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

Başarılı yanıtta dönen alanlar: [DraftDespatchPreviewResponseDTODataResult](veri-alanlari.md#draftdespatchpreviewresponsedtodataresult).

## Taslak irsaliye silme

`DELETE /api/Invoice/delete-draft-despatch/{draftDespatchId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `draftDespatchId` | Adreste | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

Başarılı yanıtta dönen alanlar: [Result](veri-alanlari.md#result).

## SMM Fatura oluşturma

`POST /api/Invoice/add-smm-invoice`

Gönderilecek JSON alanları: [CreateSMMInvoiceRequestDTO](veri-alanlari.md#createsmminvoicerequestdto).

HTTP yanıtları: `200`, `400`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [CreateInvoiceResponse](veri-alanlari.md#createinvoiceresponse).

## Giden e-SMM listesi

`GET /api/Invoice/get-outgoing-smm-list`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `StartDate` | Soru işaretinden sonra | Hayır | date-time |
| `EndDate` | Soru işaretinden sonra | Hayır | date-time |
| `PageSize` | Soru işaretinden sonra | Hayır | int32 |
| `PageNumber` | Soru işaretinden sonra | Hayır | int32 |
| `Search` | Soru işaretinden sonra | Hayır | string |

HTTP yanıtları: `200`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [GetOutgoingInvoiceListResponseDTOPaginatedResult](veri-alanlari.md#getoutgoinginvoicelistresponsedtopaginatedresult).

## Taslak SMM listesi

`GET /api/Invoice/get-draft-smm-list`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `CurrencyTypeId` | Soru işaretinden sonra | Hayır | int32 |
| `StartDate` | Soru işaretinden sonra | Hayır | date-time |
| `EndDate` | Soru işaretinden sonra | Hayır | date-time |
| `PageSize` | Soru işaretinden sonra | Hayır | int32 |
| `PageNumber` | Soru işaretinden sonra | Hayır | int32 |
| `Search` | Soru işaretinden sonra | Hayır | string |

HTTP yanıtları: `200`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [DraftInvoiceResponseDtoPaginatedResult](veri-alanlari.md#draftinvoiceresponsedtopaginatedresult).

## Giden e-SMM PDF görüntüleme

`GET /api/Invoice/get-smm-pdf/{invoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `invoiceId` | Adreste | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

Başarılı yanıtta dönen alanlar: [StringDataResult](veri-alanlari.md#stringdataresult).

## Giden e-SMM UBL (XML)

`GET /api/Invoice/get-smm-xml/{invoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `invoiceId` | Adreste | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

Başarılı yanıtta dönen alanlar: [StringDataResult](veri-alanlari.md#stringdataresult).

## Taslak SMM detayı

`GET /api/Invoice/get-draft-smm-preview/{draftInvoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `draftInvoiceId` | Adreste | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

Başarılı yanıtta dönen alanlar: [DraftInvoicePreviewResponseDTODataResult](veri-alanlari.md#draftinvoicepreviewresponsedtodataresult).

## SMM seri (prefix) listesi

`GET /api/Invoice/get-smm-prefix-list`

HTTP yanıtları: `200`, `401`, `403`.

Başarılı yanıtta dönen alanlar: [InvoicePrefixForDropdownResponseDtoListDataResult](veri-alanlari.md#invoiceprefixfordropdownresponsedtolistdataresult).

## Taslak SMM silme

`DELETE /api/Invoice/delete-draft-smm/{draftInvoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `draftInvoiceId` | Adreste | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

Başarılı yanıtta dönen alanlar: [Result](veri-alanlari.md#result).


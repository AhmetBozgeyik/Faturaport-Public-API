# API V3 endpoint ve alan referansı

Kaynak: [Dev](https://devapi.faturaport.com/docs/index.html) ve [Canlı](https://prodapi.faturaport.com/docs/index.html) public OpenAPI. Yerel şemalar: [Dev](../openapi/dev.json), [Canlı](../openapi/prod.json). İnceleme tarihi: 12 Ekim 2026.

Token endpointi dışında `Authorization: Bearer TOKEN` gönderin. POST gövdesi olan işlemlerde `Content-Type: application/json` kullanın.

## Token Alma

`POST /api/Invoice/getapitoken`

İstek modeli: [LoginTokenDTO](#logintokendto).

HTTP yanıtları: `200`, `400`.

200 yanıt modeli: [LoginResponseDTODataResult](#loginresponsedtodataresult).

## Fatura oluşturma

`POST /api/Invoice/add-invoice`

İstek modeli: [CreateInvoiceRequestDTO](#createinvoicerequestdto).

HTTP yanıtları: `200`, `400`, `401`, `403`.

200 yanıt modeli: [CreateInvoiceResponse](#createinvoiceresponse).

## Giden e-fatura listesi

`GET /api/Invoice/get-outgoing-invoice-list`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `StartDate` | query | Şemada zorunlu değil | date-time |
| `EndDate` | query | Şemada zorunlu değil | date-time |
| `PageSize` | query | Şemada zorunlu değil | int32 |
| `PageNumber` | query | Şemada zorunlu değil | int32 |
| `Search` | query | Şemada zorunlu değil | string |

HTTP yanıtları: `200`, `401`, `403`.

200 yanıt modeli: [GetOutgoingInvoiceListResponseDTOPaginatedResult](#getoutgoinginvoicelistresponsedtopaginatedresult).

## Giden e fatura pdf görüntüleme

`GET /api/Invoice/get-invoice-pdf/{invoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `invoiceId` | path | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

200 yanıt modeli: [StringDataResult](#stringdataresult).

## Giden e fatura ubl (xml)

`GET /api/Invoice/get-invoice-xml/{invoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `invoiceId` | path | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

200 yanıt modeli: [StringDataResult](#stringdataresult).

## Gelen e-fatura listesi

`GET /api/Invoice/get-incoming-invoice-list`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `StartDate` | query | Şemada zorunlu değil | date-time |
| `EndDate` | query | Şemada zorunlu değil | date-time |
| `PageSize` | query | Şemada zorunlu değil | int32 |
| `PageNumber` | query | Şemada zorunlu değil | int32 |
| `Search` | query | Şemada zorunlu değil | string |

HTTP yanıtları: `200`, `401`, `403`.

200 yanıt modeli: [GetIncomingInvoiceListResponseDTOPaginatedResult](#getincominginvoicelistresponsedtopaginatedresult).

## Gelen e fatura pdf görüntüleme

`GET /api/Invoice/get-incoming-invoice-pdf/{invoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `invoiceId` | path | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

200 yanıt modeli: [StringDataResult](#stringdataresult).

## Gelen e fatura ubl (xml)

`GET /api/Invoice/get-incoming-invoice-xml/{invoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `invoiceId` | path | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

200 yanıt modeli: [StringDataResult](#stringdataresult).

## Taslak fatura listesi

`GET /api/Invoice/get-draft-invoice-list`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `CurrencyTypeId` | query | Şemada zorunlu değil | int32 |
| `StartDate` | query | Şemada zorunlu değil | date-time |
| `EndDate` | query | Şemada zorunlu değil | date-time |
| `PageSize` | query | Şemada zorunlu değil | int32 |
| `PageNumber` | query | Şemada zorunlu değil | int32 |
| `Search` | query | Şemada zorunlu değil | string |

HTTP yanıtları: `200`, `401`, `403`.

200 yanıt modeli: [DraftInvoiceResponseDtoPaginatedResult](#draftinvoiceresponsedtopaginatedresult).

## Taslak fatura silme

`DELETE /api/Invoice/delete-draft-invoice/{draftInvoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `draftInvoiceId` | path | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

200 yanıt modeli: [Result](#result).

## Taslak faturayı e-faturaya dönüştürme

`POST /api/Invoice/convert-to-einvoice`

İstek modeli: [ConvertToEInvoiceOpenApiRequestDto](#converttoeinvoiceopenapirequestdto).

HTTP yanıtları: `200`, `400`, `401`, `403`.

200 yanıt modeli: [Result](#result).

## Fatura durum kontrolü

`POST /api/Invoice/check-invoice-status`

İstek modeli: [EInvoiceIdAndDirectionDTO](#einvoiceidanddirectiondto).

HTTP yanıtları: `200`, `401`, `403`.

200 yanıt modeli: [Result](#result).

## Giden e-arşiv faturayı iptal etme

`POST /api/Invoice/cancel-outgoing-invoice/{outgoingInvoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `outgoingInvoiceId` | path | Evet | uuid |

HTTP yanıtları: `200`, `400`, `401`, `403`.

200 yanıt modeli: [Result](#result).

## e-Fatura mükellefiyet, posta kutuları, fatura serisi

`POST /api/Invoice/check-customer-einvoice-info/{taxnumber}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `taxnumber` | path | Evet | string |

HTTP yanıtları: `200`, `400`, `401`, `403`, `404`, `422`.

200 yanıt modeli: [CustomerEInvoiceInfoResponseDto](#customereinvoiceinforesponsedto).

## fatura tipine göre vergi kodu listesi

`GET /api/Invoice/invoice-code/{invoiceType}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `invoiceType` | path | Evet | InvoiceType |

HTTP yanıtları: `200`, `401`, `403`.

200 yanıt modeli: [GetInvoiceCodeResponseDTOListDataResult](#getinvoicecoderesponsedtolistdataresult).

## Birim listesi

`GET /api/Invoice/units`

HTTP yanıtları: `200`, `401`, `403`.

200 yanıt modeli: [GetUnitForSelectDTOListDataResult](#getunitforselectdtolistdataresult).

## Taslak fatura detayı

`GET /api/Invoice/get-draft-invoice-preview/{draftInvoiceId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `draftInvoiceId` | path | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

200 yanıt modeli: [DraftInvoicePreviewResponseDTODataResult](#draftinvoicepreviewresponsedtodataresult).

## RefId ile taslak fatura detayı

`GET /api/Invoice/get-draft-invoice-preview-by-ref/{refId}`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `refId` | path | Evet | uuid |

HTTP yanıtları: `200`, `401`, `403`, `404`.

200 yanıt modeli: [DraftInvoicePreviewResponseDTODataResult](#draftinvoicepreviewresponsedtodataresult).

## Giden e-irsaliye listesi

`GET /api/Invoice/get-outgoing-despatch-list`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `StartDate` | query | Şemada zorunlu değil | date-time |
| `EndDate` | query | Şemada zorunlu değil | date-time |
| `PageSize` | query | Şemada zorunlu değil | int32 |
| `PageNumber` | query | Şemada zorunlu değil | int32 |
| `Search` | query | Şemada zorunlu değil | string |

HTTP yanıtları: `200`, `401`, `403`.

200 yanıt modeli: [OutgoingDespatchForTableResponseDTOPaginatedResult](#outgoingdespatchfortableresponsedtopaginatedresult).

## Gelen e-irsaliye listesi

`GET /api/Invoice/get-incoming-despatch-list`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `StartDate` | query | Şemada zorunlu değil | date-time |
| `EndDate` | query | Şemada zorunlu değil | date-time |
| `PageSize` | query | Şemada zorunlu değil | int32 |
| `PageNumber` | query | Şemada zorunlu değil | int32 |
| `Search` | query | Şemada zorunlu değil | string |

HTTP yanıtları: `200`, `401`, `403`.

200 yanıt modeli: [IncomingDespatchForTableResponseDTOPaginatedResult](#incomingdespatchfortableresponsedtopaginatedresult).

## E-irsaliye pdf görüntüleme

`GET /api/Invoice/get-despatch-pdf`

| Alan | Konum | Zorunlu | Tip |
|---|---|---|---|
| `DespatchId` | query | Şemada zorunlu değil | uuid |
| `InvoiceDocumentDirection` | query | Şemada zorunlu değil | InvoiceDocumentDirection |

HTTP yanıtları: `200`, `401`, `403`, `404`.

200 yanıt modeli: [StringDataResult](#stringdataresult).

## Veri modelleri

`required` bilgileri şema tanımıdır; iş kuralları için ürün rehberlerini de okuyun. String seçenekler aşağıda kaynak şemanın açıklamalarından verilmiştir.

### CompanyInfoForAPIDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `unvan` | string / null | Şemada zorunlu değil |  |
| `vergiDairesiAdi` | string / null | Şemada zorunlu değil |  |
| `adres` | string / null | Şemada zorunlu değil |  |
| `ilceAdi` | string / null | Şemada zorunlu değil |  |
| `ilAdi` | string / null | Şemada zorunlu değil |  |

### ConvertToEInvoiceOpenApiRequestDto

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoiceId` | uuid | Şemada zorunlu değil |  |
| `prefixId` | uuid / null | Şemada zorunlu değil |  |
| `alias` | string / null | Şemada zorunlu değil |  |

### CreateInvoiceCompanyRequestDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `companyName` | string | Şemada zorunlu değil | Firmanın resmi unvanını temsil eder. |
| `taxNumber` | string | Şemada zorunlu değil | Firmanın vergi kimlik numarasını belirtir. |
| `taxOffice` | string | Şemada zorunlu değil | Firmanın bağlı olduğu vergi dairesinin adını ifade eder. |
| `address` | string | Şemada zorunlu değil | Firmanın resmi adresini belirtir. |
| `country` | string | Şemada zorunlu değil | Firmanın bulunduğu ülkeyi temsil eder. |
| `city` | string | Şemada zorunlu değil | Firmanın bulunduğu ili belirtir. |
| `district` | string | Şemada zorunlu değil | Firmanın bulunduğu ilçeyi ifade eder. |
| `isAddCompany` | boolean | Şemada zorunlu değil | Faturanın cariye borç olarak işlenmesi için gerekli parametre. |

### CreateInvoiceLineItemProductRequestDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `productName` | string | Şemada zorunlu değil | Ürünün veya hizmetin adını belirtir. |
| `price` | double / null | Şemada zorunlu değil | Ürünün veya hizmetin birim fiyatını ifade eder. |
| `esuSerialNo` | string / null | Şemada zorunlu değil | SARJANLIK faturası için kalem EsuSeriNo. |

### CreateInvoiceLineItemRequestDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `taxRateType` | TaxRateType | Şemada zorunlu değil |  |
| `quantity` | double | Şemada zorunlu değil | Kalemdeki ürün veya hizmetin miktarını ifade eder. |
| `unitPrice` | double | Şemada zorunlu değil | Kalemdeki ürün veya hizmetin birim fiyatını belirtir. |
| `unitId` | int32 | Şemada zorunlu değil | Birim türünü tanımlar. |
| `taxAmount` | double | Şemada zorunlu değil | Kaleme ait toplam vergi tutarını ifade eder. |
| `isDiscountPercent` | boolean | Şemada zorunlu değil | İndirimin yüzde bazlı olup olmadığını belirtir. |
| `discountAmount` | double | Şemada zorunlu değil | Kaleme uygulanan indirim tutarını belirtir. |
| `discountValue` | double | Şemada zorunlu değil | Kaleme uygulanan indirim değerini ifade eder. |
| `subTotal` | double | Şemada zorunlu değil | Kalemin vergi hariç toplam tutarını belirtir. |
| `subTotalIncludingDiscount` | double | Şemada zorunlu değil | İndirim uygulanmış ara toplam tutarını ifade eder. |
| `total` | double | Şemada zorunlu değil | Kalemin vergi dahil toplam tutarını belirtir. |
| `lineDescription` | string / null | Şemada zorunlu değil | Kaleme ait açıklamayı veya notu ifade eder. |
| `product` | CreateInvoiceLineItemProductRequestDTO | Şemada zorunlu değil |  |
| `lineItemTaxes` | array: CreateInvoiceLineItemTaxRequestDTO | Şemada zorunlu değil | Kaleme uygulanan vergilerin listesini içerir. |

### CreateInvoiceLineItemTaxRequestDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoiceCodeId` | int32 / null | Şemada zorunlu değil | Vergiye ait benzersiz kod tanımlayıcısını belirtir. |
| `lineItemTaxType` | LineItemTaxType | Şemada zorunlu değil |  |
| `isTaxPercent` | boolean | Şemada zorunlu değil | Verginin yüzde bazlı olup olmadığını belirtir. |
| `amount` | double | Şemada zorunlu değil | Verginin toplam tutarını ifade eder. |
| `percent` | double / null | Şemada zorunlu değil | Vergi oranını yüzde olarak belirtir. |
| `taxableAmount` | double / null | Şemada zorunlu değil | Vergiye tabi olan tutarı ifade eder. |

### CreateInvoiceRequestDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoiceOutputType` | InvoiceOutputType | Şemada zorunlu değil |  |
| `invoiceTypeId` | InvoiceType | Şemada zorunlu değil |  |
| `invoiceProfileId` | InvoiceProfile | Şemada zorunlu değil |  |
| `invoicePrefixId` | uuid | Evet | Fatura serisi için benzersiz tanımlayıcı. **Önemli**: Bu alan zorunludur. |
| `invoiceDate` | date-time | Evet | Faturanın düzenlenme tarihini belirtir. |
| `alias` | string / null | Şemada zorunlu değil | Firmaya ait posta kutusunu ifade eder. |
| `company` | CreateInvoiceCompanyRequestDTO | Şemada zorunlu değil |  |
| `isTaxIncludedInPrice` | boolean | Şemada zorunlu değil | Fiyatlara verginin dahil olup olmadığını belirtir. |
| `currencyType` | CurrencyType | Şemada zorunlu değil |  |
| `draftInvoiceType` | DraftInvoiceType | Şemada zorunlu değil |  |
| `currencyRate` | double / null | Şemada zorunlu değil | Faturada kullanılan döviz kuru oranını belirtir. |
| `subTotalAmount` | double | Şemada zorunlu değil | Faturanın vergi hariç toplam tutarını ifade eder. |
| `totalTax` | double | Şemada zorunlu değil | Faturadaki toplam vergi tutarını belirtir. |
| `totalAmount` | double | Şemada zorunlu değil | Faturanın vergi dahil toplam tutarını ifade eder. |
| `subTotalGrossAmount` | double / null | Şemada zorunlu değil | Faturanın brüt ara toplam tutarını belirtir (indirim öncesi). |
| `subTotalDiscountValue` | double / null | Şemada zorunlu değil | Faturadaki indirim tutarını belirtir. |
| `subTotalDiscountIsPercent` | boolean / null | Şemada zorunlu değil | İndirimin yüzde bazlı olup olmadığını belirtir. |
| `description` | string / null | Şemada zorunlu değil | Faturaya ait genel açıklamayı veya notu ifade eder. |
| `returnInvoiceNumber` | string / null | Şemada zorunlu değil | İade faturası için iade fatura numarasını belirtir. |
| `returnInvoiceDate` | date-time / null | Şemada zorunlu değil | İade faturası için iade fatura tarihini belirtir. |
| `invoicePeriodStartDate` | date-time / null | Şemada zorunlu değil | SARJANLIK faturası için başlama tarihi saati. |
| `invoiceLicensePlateNo` | string / null | Şemada zorunlu değil | SARJANLIK faturası için araç plaka. |
| `invoicePeriodEndDate` | date-time / null | Şemada zorunlu değil | SARJANLIK faturası için başlama tarihi saati. |
| `lineItems` | array: CreateInvoiceLineItemRequestDTO | Şemada zorunlu değil | Faturadaki kalemlerin listesini içerir. |
| `orderInfos` | array: DraftInvoiceAdditionalInfoWithDateDto / null | Şemada zorunlu değil | Faturaya ait eğer sipariş bilgisi eklemek isterseniz doldurmanız gerekir. |
| `despatchInfos` | array: DraftInvoiceAdditionalInfoWithDateDto / null | Şemada zorunlu değil | Faturaya ait eğer irsaliye bilgisi eklemek isterseniz doldurmanız gerekir. |
| `refId` | string / null | Şemada zorunlu değil | Entegrasyon veya dış referans ID değeri (GUID formatında). |

### CreateInvoiceResponse

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `success` | boolean | Şemada zorunlu değil |  |
| `message` | string / null | Şemada zorunlu değil |  |
| `data` | string / null | Şemada zorunlu değil |  |
| `invoiceId` | uuid / null | Şemada zorunlu değil |  |

### CurrencyType

Faturada kullanılan para birimini belirtir (örneğin, TRY, USD). Available : *USD, EUR, GBP, TRY* 

### CustomerEInvoiceInfoResponseDto

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `customerIsEInvoiceAndAliasList` | CustomerIsEInvoiceResponseDto | Şemada zorunlu değil |  |
| `prefixList` | array: InvoicePrefixForDropdownResponseDto / null | Şemada zorunlu değil |  |
| `companyInfo` | CompanyInfoForAPIDTO | Şemada zorunlu değil |  |

### CustomerIsEInvoiceResponseDto

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `isEInvoiceUser` | boolean | Şemada zorunlu değil |  |
| `aliasList` | array: string / null | Şemada zorunlu değil |  |

### DespatchIncomingInvoice

 Available : *Received, PendingAnswer, AcceptAnswered, AcceptAnswerCompleted, PartiallyAcceptAnswered, PartiallyAcceptAnswerCompleted, RejectAnswered, RejectAnswerCompleted, AutomaticallyAccepted, Failed, FromArchive* 

### DraftInvoiceAdditionalInfoWithDateDto

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `additionalInfoDate` | date-time / null | Şemada zorunlu değil | Tarih alanını temsil eder. |
| `additionalInfoValue` | string / null | Şemada zorunlu değil | Numaras alanını temsil eder. |

### DraftInvoicePreviewResponseDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoiceOutputType` | InvoiceOutputType | Şemada zorunlu değil |  |
| `invoiceTypeId` | InvoiceType | Şemada zorunlu değil |  |
| `invoiceProfileId` | InvoiceProfile | Şemada zorunlu değil |  |
| `invoicePrefixId` | uuid | Evet | Fatura serisi için benzersiz tanımlayıcı. **Önemli**: Bu alan zorunludur. |
| `invoiceDate` | date-time | Evet | Faturanın düzenlenme tarihini belirtir. |
| `alias` | string / null | Şemada zorunlu değil | Firmaya ait posta kutusunu ifade eder. |
| `company` | CreateInvoiceCompanyRequestDTO | Şemada zorunlu değil |  |
| `isTaxIncludedInPrice` | boolean | Şemada zorunlu değil | Fiyatlara verginin dahil olup olmadığını belirtir. |
| `currencyType` | CurrencyType | Şemada zorunlu değil |  |
| `draftInvoiceType` | DraftInvoiceType | Şemada zorunlu değil |  |
| `currencyRate` | double / null | Şemada zorunlu değil | Faturada kullanılan döviz kuru oranını belirtir. |
| `subTotalAmount` | double | Şemada zorunlu değil | Faturanın vergi hariç toplam tutarını ifade eder. |
| `totalTax` | double | Şemada zorunlu değil | Faturadaki toplam vergi tutarını belirtir. |
| `totalAmount` | double | Şemada zorunlu değil | Faturanın vergi dahil toplam tutarını ifade eder. |
| `subTotalGrossAmount` | double / null | Şemada zorunlu değil | Faturanın brüt ara toplam tutarını belirtir (indirim öncesi). |
| `subTotalDiscountValue` | double / null | Şemada zorunlu değil | Faturadaki indirim tutarını belirtir. |
| `subTotalDiscountIsPercent` | boolean / null | Şemada zorunlu değil | İndirimin yüzde bazlı olup olmadığını belirtir. |
| `description` | string / null | Şemada zorunlu değil | Faturaya ait genel açıklamayı veya notu ifade eder. |
| `returnInvoiceNumber` | string / null | Şemada zorunlu değil | İade faturası için iade fatura numarasını belirtir. |
| `returnInvoiceDate` | date-time / null | Şemada zorunlu değil | İade faturası için iade fatura tarihini belirtir. |
| `invoicePeriodStartDate` | date-time / null | Şemada zorunlu değil | SARJANLIK faturası için başlama tarihi saati. |
| `invoiceLicensePlateNo` | string / null | Şemada zorunlu değil | SARJANLIK faturası için araç plaka. |
| `invoicePeriodEndDate` | date-time / null | Şemada zorunlu değil | SARJANLIK faturası için başlama tarihi saati. |
| `lineItems` | array: CreateInvoiceLineItemRequestDTO | Şemada zorunlu değil | Faturadaki kalemlerin listesini içerir. |
| `orderInfos` | array: DraftInvoiceAdditionalInfoWithDateDto / null | Şemada zorunlu değil | Faturaya ait eğer sipariş bilgisi eklemek isterseniz doldurmanız gerekir. |
| `despatchInfos` | array: DraftInvoiceAdditionalInfoWithDateDto / null | Şemada zorunlu değil | Faturaya ait eğer irsaliye bilgisi eklemek isterseniz doldurmanız gerekir. |
| `refId` | string / null | Şemada zorunlu değil | Entegrasyon veya dış referans ID değeri (GUID formatında). |
| `draftInvoiceStatus` | DraftInvoiceStatus | Şemada zorunlu değil |  |

### DraftInvoicePreviewResponseDTODataResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `success` | boolean | Şemada zorunlu değil |  |
| `message` | string / null | Şemada zorunlu değil |  |
| `data` | DraftInvoicePreviewResponseDTO | Şemada zorunlu değil |  |

### DraftInvoiceResponseDto

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `draftInvoiceId` | uuid | Şemada zorunlu değil |  |
| `companyName` | string / null | Şemada zorunlu değil |  |
| `invoiceDate` | date-time | Şemada zorunlu değil |  |
| `invoiceNumber` | string / null | Şemada zorunlu değil |  |
| `currencySymbol` | string / null | Şemada zorunlu değil |  |
| `category` | string / null | Şemada zorunlu değil |  |
| `createdOnDate` | date-time / null | Şemada zorunlu değil |  |
| `totalAmount` | double | Şemada zorunlu değil |  |
| `invoiceType` | string / null | Şemada zorunlu değil |  |
| `draftStatus` | string / null | Şemada zorunlu değil |  |
| `invoiceProfile` | string / null | Şemada zorunlu değil |  |
| `draftStatusId` | int32 | Şemada zorunlu değil |  |

### DraftInvoiceResponseDtoPaginatedResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `succeeded` | boolean | Şemada zorunlu değil |  |
| `success` | boolean | Şemada zorunlu değil |  |
| `message` | string / null | Şemada zorunlu değil |  |
| `datas` | array: DraftInvoiceResponseDto / null | Şemada zorunlu değil |  |
| `pageNumber` | int32 | Şemada zorunlu değil |  |
| `pageSize` | int32 | Şemada zorunlu değil |  |
| `isFirstPage` | boolean | Şemada zorunlu değil |  |
| `isLastPage` | boolean | Şemada zorunlu değil |  |
| `totalPages` | int32 | Şemada zorunlu değil |  |
| `totalRecords` | int32 | Şemada zorunlu değil |  |

### DraftInvoiceStatus

 Available : *TASLAK, IMZABEKLIYOR, EINVOICE* 

### DraftInvoiceType

 Available : *DraftInvoice, EInvoice* 

### EInvoiceIdAndDirectionDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoiceId` | uuid | Şemada zorunlu değil |  |
| `invoiceDocumentDirection` | InvoiceDocumentDirection | Şemada zorunlu değil |  |

### GetIncomingInvoiceListResponseDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoiceId` | uuid | Şemada zorunlu değil |  |
| `invoiceDate` | date-time | Şemada zorunlu değil |  |
| `invoiceNumber` | string / null | Şemada zorunlu değil |  |
| `companyTitle` | string / null | Şemada zorunlu değil |  |
| `companyTaxNumber` | string / null | Şemada zorunlu değil |  |
| `invoiceProfile` | string / null | Şemada zorunlu değil |  |
| `invoiceDocumentType` | string / null | Şemada zorunlu değil |  |
| `incomingStatus` | string / null | Şemada zorunlu değil |  |
| `payableAmount` | double | Şemada zorunlu değil |  |
| `taxAmount` | double | Şemada zorunlu değil |  |
| `currencyType` | string / null | Şemada zorunlu değil |  |
| `uuid` | string / null | Şemada zorunlu değil |  |

### GetIncomingInvoiceListResponseDTOPaginatedResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `succeeded` | boolean | Şemada zorunlu değil |  |
| `success` | boolean | Şemada zorunlu değil |  |
| `message` | string / null | Şemada zorunlu değil |  |
| `datas` | array: GetIncomingInvoiceListResponseDTO / null | Şemada zorunlu değil |  |
| `pageNumber` | int32 | Şemada zorunlu değil |  |
| `pageSize` | int32 | Şemada zorunlu değil |  |
| `isFirstPage` | boolean | Şemada zorunlu değil |  |
| `isLastPage` | boolean | Şemada zorunlu değil |  |
| `totalPages` | int32 | Şemada zorunlu değil |  |
| `totalRecords` | int32 | Şemada zorunlu değil |  |

### GetInvoiceCodeResponseDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoiceCodeId` | int32 | Şemada zorunlu değil |  |
| `invoiceCodeKey` | string / null | Şemada zorunlu değil |  |
| `invoiceCodeName` | string / null | Şemada zorunlu değil |  |
| `invoiceCodeValue` | int32 / null | Şemada zorunlu değil |  |
| `isStatic` | boolean | Şemada zorunlu değil |  |
| `isPercentage` | boolean | Şemada zorunlu değil |  |

### GetInvoiceCodeResponseDTOListDataResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `success` | boolean | Şemada zorunlu değil |  |
| `message` | string / null | Şemada zorunlu değil |  |
| `data` | array: GetInvoiceCodeResponseDTO / null | Şemada zorunlu değil |  |

### GetOutgoingInvoiceListResponseDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoiceId` | uuid | Şemada zorunlu değil |  |
| `invoiceDate` | date-time | Şemada zorunlu değil |  |
| `invoiceNumber` | string / null | Şemada zorunlu değil |  |
| `companyTitle` | string / null | Şemada zorunlu değil |  |
| `companyTaxNumber` | string / null | Şemada zorunlu değil |  |
| `invoiceProfile` | string / null | Şemada zorunlu değil |  |
| `invoiceDocumentType` | string / null | Şemada zorunlu değil |  |
| `outgoingStatus` | string / null | Şemada zorunlu değil |  |
| `payableAmount` | double | Şemada zorunlu değil |  |
| `taxAmount` | double | Şemada zorunlu değil |  |
| `currencyType` | string / null | Şemada zorunlu değil |  |
| `uuid` | string / null | Şemada zorunlu değil |  |

### GetOutgoingInvoiceListResponseDTOPaginatedResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `succeeded` | boolean | Şemada zorunlu değil |  |
| `success` | boolean | Şemada zorunlu değil |  |
| `message` | string / null | Şemada zorunlu değil |  |
| `datas` | array: GetOutgoingInvoiceListResponseDTO / null | Şemada zorunlu değil |  |
| `pageNumber` | int32 | Şemada zorunlu değil |  |
| `pageSize` | int32 | Şemada zorunlu değil |  |
| `isFirstPage` | boolean | Şemada zorunlu değil |  |
| `isLastPage` | boolean | Şemada zorunlu değil |  |
| `totalPages` | int32 | Şemada zorunlu değil |  |
| `totalRecords` | int32 | Şemada zorunlu değil |  |

### GetUnitForSelectDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `unitId` | int32 | Şemada zorunlu değil |  |
| `unitDescription` | string / null | Şemada zorunlu değil |  |
| `unitHasDecimal` | boolean | Şemada zorunlu değil |  |

### GetUnitForSelectDTOListDataResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `success` | boolean | Şemada zorunlu değil |  |
| `message` | string / null | Şemada zorunlu değil |  |
| `data` | array: GetUnitForSelectDTO / null | Şemada zorunlu değil |  |

### IncomingDespatchForTableResponseDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `despatchId` | uuid | Şemada zorunlu değil |  |
| `despatchDate` | date-time | Şemada zorunlu değil |  |
| `actualDespatchDate` | date-time / null | Şemada zorunlu değil |  |
| `despatchNumber` | string / null | Şemada zorunlu değil |  |
| `despatchStatus` | string / null | Şemada zorunlu değil |  |
| `despatchIncomingInvoiceStatus` | DespatchIncomingInvoice | Şemada zorunlu değil |  |
| `despatchProfile` | string / null | Şemada zorunlu değil |  |
| `despatchDocumentType` | string / null | Şemada zorunlu değil |  |
| `companyTitle` | string / null | Şemada zorunlu değil |  |
| `isReaded` | boolean | Şemada zorunlu değil |  |
| `isPrinted` | boolean | Şemada zorunlu değil |  |

### IncomingDespatchForTableResponseDTOPaginatedResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `succeeded` | boolean | Şemada zorunlu değil |  |
| `success` | boolean | Şemada zorunlu değil |  |
| `message` | string / null | Şemada zorunlu değil |  |
| `datas` | array: IncomingDespatchForTableResponseDTO / null | Şemada zorunlu değil |  |
| `pageNumber` | int32 | Şemada zorunlu değil |  |
| `pageSize` | int32 | Şemada zorunlu değil |  |
| `isFirstPage` | boolean | Şemada zorunlu değil |  |
| `isLastPage` | boolean | Şemada zorunlu değil |  |
| `totalPages` | int32 | Şemada zorunlu değil |  |
| `totalRecords` | int32 | Şemada zorunlu değil |  |

### InvoiceDocumentDirection

 Available : *Outgoing, Incoming* 

### InvoiceOutputType

 Available : *Ubl, Html, Pdf, Xml* 

### InvoicePrefixForDropdownResponseDto

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoicePrefixId` | uuid | Şemada zorunlu değil |  |
| `prefix` | string / null | Şemada zorunlu değil |  |
| `lastUsedNumber` | double | Şemada zorunlu değil |  |
| `isDefault` | boolean | Şemada zorunlu değil |  |

### InvoiceProfile

 Available : *TEMELFATURA, TICARIFATURA, YOLCUBERABERFATURA, IHRACAT, KAMU, HKS, ENERJI, EARSIVFATURA, ILAC_TIBBICIHAZ, YATIRIMTESVIK, ESMM, IDIS* 

### InvoiceStatus

 Available : *All, NotInvoiced, Invoiced, DraftInvoice* 

### InvoiceType

 Available : *Satis, Tevkifat, OzelMatrah, SatisIade, Istisna, IhracKayitli, KONAKLAMAVERGISI, IDIS, OTV, SARJANLIK, YTBSATIS, SGK* 

### LineItemTaxType

 Available : *SATIS, TEVKIFAT, OZELMATRAH, ISTISNA, IHRACKAYITLI, KONAKLAMA, KDV, OTV, OIV* 

### LoginResponseDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `accessToken` | string / null | Şemada zorunlu değil |  |

### LoginResponseDTODataResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `success` | boolean | Şemada zorunlu değil |  |
| `message` | string / null | Şemada zorunlu değil |  |
| `data` | LoginResponseDTO | Şemada zorunlu değil |  |

### LoginTokenDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `company_code` | string | Şemada zorunlu değil | Uygulama içerisinden alınan Firma Kodu. |
| `client_id` | string | Şemada zorunlu değil | Uygulama içerisinden alınan ClientId |
| `client_secret` | string | Şemada zorunlu değil | Uygulama içerisinden alınan ClientSecret |

### OutgoingDespatchForTableResponseDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `despatchId` | uuid | Şemada zorunlu değil |  |
| `despatchDate` | date-time | Şemada zorunlu değil |  |
| `actualDespatchDate` | date-time / null | Şemada zorunlu değil |  |
| `despatchNumber` | string / null | Şemada zorunlu değil |  |
| `despatchStatus` | string / null | Şemada zorunlu değil |  |
| `despatchProfile` | string / null | Şemada zorunlu değil |  |
| `despatchDocumentType` | string / null | Şemada zorunlu değil |  |
| `companyTitle` | string / null | Şemada zorunlu değil |  |
| `isPrinted` | boolean | Şemada zorunlu değil |  |
| `isConvertedToInvoice` | boolean | Şemada zorunlu değil |  |
| `invoiceStatus` | InvoiceStatus | Şemada zorunlu değil |  |
| `invoiceId` | uuid / null | Şemada zorunlu değil |  |

### OutgoingDespatchForTableResponseDTOPaginatedResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `succeeded` | boolean | Şemada zorunlu değil |  |
| `success` | boolean | Şemada zorunlu değil |  |
| `message` | string / null | Şemada zorunlu değil |  |
| `datas` | array: OutgoingDespatchForTableResponseDTO / null | Şemada zorunlu değil |  |
| `pageNumber` | int32 | Şemada zorunlu değil |  |
| `pageSize` | int32 | Şemada zorunlu değil |  |
| `isFirstPage` | boolean | Şemada zorunlu değil |  |
| `isLastPage` | boolean | Şemada zorunlu değil |  |
| `totalPages` | int32 | Şemada zorunlu değil |  |
| `totalRecords` | int32 | Şemada zorunlu değil |  |

### ProblemDetails

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `type` | string / null | Şemada zorunlu değil |  |
| `title` | string / null | Şemada zorunlu değil |  |
| `status` | int32 / null | Şemada zorunlu değil |  |
| `detail` | string / null | Şemada zorunlu değil |  |
| `instance` | string / null | Şemada zorunlu değil |  |

### Result

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `success` | boolean | Şemada zorunlu değil |  |
| `message` | string / null | Şemada zorunlu değil |  |

### StringDataResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `success` | boolean | Şemada zorunlu değil |  |
| `message` | string / null | Şemada zorunlu değil |  |
| `data` | string / null | Şemada zorunlu değil |  |

### TaxRateType

 Available : *KDV_0, KDV_1, KDV_10, KDV_20* 


# Faturaport API JSON alanları

Bu sayfa, API dokümanında yer alan istek ve yanıt alanlarını bir araya getirir. Alan isimleri kodunuzda kullanacağınız şekliyle korunmuştur. İlgili işlemi bulmak için [API adresleri](api-referansi.md) sayfasını kullanın.

Zorunlu sütunu API dosyasındaki tanımı gösterir. Belge oluştururken seri, alıcı ve kalem bilgilerini ürün rehberindeki adımlara göre doldurun. `uuid`, `3fa85f64-5717-4562-b3fc-2c963f66afa6` gibi bir ID; `date-time`, `2026-10-13T10:00:00Z` gibi bir tarih ve saattir.

### CompanyInfoForAPIDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `unvan` | string / null | Hayır |  |
| `vergiDairesiAdi` | string / null | Hayır |  |
| `adres` | string / null | Hayır |  |
| `ilceAdi` | string / null | Hayır |  |
| `ilAdi` | string / null | Hayır |  |

### ConvertToEInvoiceOpenApiRequestDto

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoiceId` | uuid | Hayır |  |
| `prefixId` | uuid / null | Hayır |  |
| `alias` | string / null | Hayır |  |

### CreateDespatchCarrierRequestDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `carrierTitle` | string / null | Hayır | Taşıyıcı unvanı. |
| `carrierTaxNumber` | string / null | Hayır | Taşıyıcı vergi kimlik numarası veya TCKN. |
| `driverPersonFirstName` | string / null | Hayır | Şoför adı. |
| `driverPersonLastName` | string / null | Hayır | Şoför soyadı. |
| `driverPersonTaxNumber` | string / null | Hayır | Şoför TCKN. |
| `licensePlate` | string / null | Hayır | Araç plaka numarası. |
| `transportLicensePlate` | string / null | Hayır | Dorse / taşıma plaka numarası. |
| `phoneNumber` | string / null | Hayır | İletişim telefon numarası. |
| `country` | string / null | Hayır | Taşıyıcı ülke adı (örn. Türkiye). |
| `city` | string / null | Hayır | Taşıyıcı il / şehir adı (örn. Gaziantep). Sistem otomatik olarak ID karşılığını bulur. |
| `district` | string / null | Hayır | Taşıyıcı ilçe adı (örn. Şahinbey). Sistem otomatik olarak ID karşılığını bulur. |
| `cityId` | int32 / null | Hayır | Taşıyıcı il ID değeri (isteğe bağlı, City yerine doğrudan ID gönderilebilir). |
| `districtId` | int32 / null | Hayır | Taşıyıcı ilçe ID değeri (isteğe bağlı, District yerine doğrudan ID gönderilebilir). |
| `countryId` | int32 / null | Hayır | Taşıyıcı ülke ID değeri (isteğe bağlı). |

### CreateDespatchDeliveryRequestDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `deliveryAddress` | string / null | Hayır | Teslimat adresi. |
| `country` | string / null | Hayır | Teslimat ülke adı (örn. Türkiye). |
| `city` | string / null | Hayır | Teslimat il / şehir adı (örn. Gaziantep). Sistem otomatik olarak ID karşılığını bulur. |
| `district` | string / null | Hayır | Teslimat ilçe adı (örn. Şahinbey). Sistem otomatik olarak ID karşılığını bulur. |
| `cityId` | int32 / null | Hayır | Teslimat il ID değeri (isteğe bağlı, City yerine doğrudan ID gönderilebilir). |
| `districtId` | int32 / null | Hayır | Teslimat ilçe ID değeri (isteğe bağlı, District yerine doğrudan ID gönderilebilir). |
| `countryId` | int32 / null | Hayır | Teslimat ülke ID değeri (isteğe bağlı). |

### CreateDespatchLineItemRequestDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `productId` | uuid / null | Hayır | Mevcut bir ürünün ID değeri. Belirtilmezse yeni ürün bilgisi kullanılır. |
| `quantity` | double | Hayır | Ürün miktarı (sıfırdan büyük olmalıdır). |
| `unitId` | int32 | Hayır | Birim türü ID değeri (varsayılan: 1 - Adet). /api/Invoice/units endpoint'inden alınabilir. |
| `lineDescription` | string / null | Hayır | Kalem açıklaması. |
| `idisLabelNumber` | string / null | Hayır | İDİS irsaliyesi için İDİS etiket numarası. |
| `productWarehouseId` | uuid / null | Hayır | Ürün depo ID değeri (stok takibi için isteğe bağlı). |
| `product` | CreateDespatchProductRequestDTO | Hayır |  |

### CreateDespatchProductRequestDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `productName` | string | Hayır | Ürün adı. |
| `productDescription` | string / null | Hayır | Ürün açıklaması. |
| `price` | double / null | Hayır | Ürün birim fiyatı (irsaliye için isteğe bağlı). |

### CreateDespatchRequestDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `despatchOutputType` | InvoiceOutputType | Hayır |  |
| `despatchProfileId` | DespatchProfile | Hayır |  |
| `despatchDocumentTypeId` | DespatchDocumentType | Hayır |  |
| `despatchPrefixId` | uuid | Evet | İrsaliye serisi (prefix) için benzersiz tanımlayıcı. **Önemli**: Zorunludur. |
| `despatchDate` | date-time | Evet | İrsaliyenin düzenlenme tarihi. |
| `actualDespatchDate` | date-time / null | Hayır | Fiili sevk tarihi ve saati. Belirtilmezse irsaliye tarihi kullanılır. |
| `orderNumber` | string / null | Hayır | Sipariş numarası. |
| `orderDate` | date-time / null | Hayır | Sipariş tarihi. |
| `matbuNumber` | string / null | Hayır | Matbu irsaliye numarası. |
| `matbuDate` | date-time / null | Hayır | Matbu irsaliye tarihi. |
| `shipmentNumber` | string / null | Hayır | Sevkiyat numarası. |
| `description` | string / null | Hayır | İrsaliyeye ait genel açıklama veya not. |
| `company` | CreateInvoiceCompanyRequestDTO | Hayır |  |
| `alias` | string / null | Hayır | Alıcı firmaya ait posta kutusu (alias/etiket). |
| `draftDespatchType` | DraftInvoiceType | Hayır |  |
| `delivery` | CreateDespatchDeliveryRequestDTO | Hayır |  |
| `deliveryAddress` | string / null | Hayır | Farklı bir teslimat adresi varsa açık adres metni. |
| `deliveryCountry` | string / null | Hayır | Teslimat ülke adı (örn. Türkiye). |
| `deliveryCity` | string / null | Hayır | Teslimat il / şehir adı (örn. Gaziantep). Sistem otomatik olarak ID karşılığını bulur. |
| `deliveryDistrict` | string / null | Hayır | Teslimat ilçe adı (örn. Şahinbey). Sistem otomatik olarak ID karşılığını bulur. |
| `deliveryCityId` | int32 / null | Hayır | Teslimat il ID değeri (isteğe bağlı, DeliveryCity yerine doğrudan ID verilebilir). |
| `deliveryDistrictId` | int32 / null | Hayır | Teslimat ilçe ID değeri (isteğe bağlı, DeliveryDistrict yerine doğrudan ID verilebilir). |
| `deliveryCountryId` | int32 / null | Hayır | Teslimat ülke ID değeri (isteğe bağlı). |
| `carrier` | CreateDespatchCarrierRequestDTO | Hayır |  |
| `carrierTitle` | string / null | Hayır | Taşıyıcı unvanı. |
| `carrierTaxNumber` | string / null | Hayır | Taşıyıcı vergi kimlik numarası veya TCKN. |
| `driverPersonFirstName` | string / null | Hayır | Şoför adı. |
| `driverPersonLastName` | string / null | Hayır | Şoför soyadı. |
| `driverPersonTaxNumber` | string / null | Hayır | Şoför TCKN. |
| `licensePlate` | string / null | Hayır | Araç plaka numarası. |
| `transportLicensePlate` | string / null | Hayır | Dorse / taşıma plaka numarası. |
| `phoneNumber` | string / null | Hayır | İletişim telefon numarası. |
| `carrierCountry` | string / null | Hayır | Taşıyıcı ülke adı (örn. Türkiye). |
| `carrierCity` | string / null | Hayır | Taşıyıcı il / şehir adı (örn. Gaziantep). Sistem otomatik olarak ID karşılığını bulur. |
| `carrierDistrict` | string / null | Hayır | Taşıyıcı ilçe adı (örn. Şahinbey). Sistem otomatik olarak ID karşılığını bulur. |
| `carrierCityId` | int32 / null | Hayır | Taşıyıcı il ID değeri (isteğe bağlı). |
| `carrierDistrictId` | int32 / null | Hayır | Taşıyıcı ilçe ID değeri (isteğe bağlı). |
| `carrierCountryId` | int32 / null | Hayır | Taşıyıcı ülke ID değeri (isteğe bağlı). |
| `lineItems` | array: CreateDespatchLineItemRequestDTO | Hayır | İrsaliye kalemlerinin listesini içerir. |

### CreateDespatchResponse

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `success` | boolean | Hayır |  |
| `message` | string / null | Hayır |  |
| `data` | string / null | Hayır |  |
| `despatchId` | uuid / null | Hayır |  |
| `invoiceId` | uuid / null | Hayır |  |
| `outgoingDespatchId` | uuid / null | Hayır |  |
| `draftDespatchId` | uuid / null | Hayır |  |
| `isEDespatch` | boolean | Hayır |  |

### CreateInvoiceCompanyRequestDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `companyName` | string | Hayır | Firmanın resmi unvanını temsil eder. |
| `taxNumber` | string | Hayır | Firmanın vergi kimlik numarasını belirtir. |
| `taxOffice` | string | Hayır | Firmanın bağlı olduğu vergi dairesinin adını ifade eder. |
| `address` | string | Hayır | Firmanın resmi adresini belirtir. |
| `country` | string | Hayır | Firmanın bulunduğu ülkeyi temsil eder. |
| `city` | string | Hayır | Firmanın bulunduğu ili belirtir. |
| `district` | string | Hayır | Firmanın bulunduğu ilçeyi ifade eder. |
| `isAddCompany` | boolean | Hayır | Faturanın cariye borç olarak işlenmesi için gerekli parametre. |

### CreateInvoiceLineItemProductRequestDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `productName` | string | Hayır | Ürünün veya hizmetin adını belirtir. |
| `price` | double / null | Hayır | Ürünün veya hizmetin birim fiyatını ifade eder. |
| `esuSerialNo` | string / null | Hayır | SARJANLIK faturası için kalem EsuSeriNo. |
| `productId` | string / null | Hayır |  |
| `productDescription` | string / null | Hayır |  |
| `unitId` | int32 / null | Hayır |  |
| `taxRateId` | int32 / null | Hayır |  |

### CreateInvoiceLineItemRequestDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `taxRateType` | TaxRateType | Hayır |  |
| `taxRateId` | int32 / null | Hayır |  |
| `productId` | uuid / null | Hayır |  |
| `quantity` | double | Hayır | Kalemdeki ürün veya hizmetin miktarını ifade eder. |
| `unitPrice` | double | Hayır | Kalemdeki ürün veya hizmetin birim fiyatını belirtir. |
| `unitId` | int32 | Hayır | Birim türünü tanımlar. |
| `taxAmount` | double | Hayır | Kaleme ait toplam vergi tutarını ifade eder. |
| `isDiscountPercent` | boolean | Hayır | İndirimin yüzde bazlı olup olmadığını belirtir. |
| `discountAmount` | double | Hayır | Kaleme uygulanan indirim tutarını belirtir. |
| `discountValue` | double | Hayır | Kaleme uygulanan indirim değerini ifade eder. |
| `subTotal` | double | Hayır | Kalemin vergi hariç toplam tutarını belirtir. |
| `subTotalIncludingDiscount` | double | Hayır | İndirim uygulanmış ara toplam tutarını ifade eder. |
| `total` | double | Hayır | Kalemin vergi dahil toplam tutarını belirtir. |
| `lineDescription` | string / null | Hayır | Kaleme ait açıklamayı veya notu ifade eder. |
| `product` | CreateInvoiceLineItemProductRequestDTO | Hayır |  |
| `lineItemTaxes` | array: CreateInvoiceLineItemTaxRequestDTO | Hayır | Kaleme uygulanan vergilerin listesini içerir. |

### CreateInvoiceLineItemTaxRequestDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoiceCodeId` | int32 / null | Hayır | Vergiye ait benzersiz kod tanımlayıcısını belirtir. |
| `lineItemTaxType` | LineItemTaxType | Hayır |  |
| `isTaxPercent` | boolean | Hayır | Verginin yüzde bazlı olup olmadığını belirtir. |
| `amount` | double | Hayır | Verginin toplam tutarını ifade eder. |
| `percent` | double / null | Hayır | Vergi oranını yüzde olarak belirtir. |
| `taxableAmount` | double / null | Hayır | Vergiye tabi olan tutarı ifade eder. |

### CreateInvoiceRequestDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoiceOutputType` | InvoiceOutputType | Hayır |  |
| `invoiceTypeId` | InvoiceType | Hayır |  |
| `invoiceProfileId` | InvoiceProfile | Hayır |  |
| `invoicePrefixId` | uuid | Evet | Fatura serisi için benzersiz tanımlayıcı. **Önemli**: Bu alan zorunludur. |
| `invoiceDate` | date-time | Evet | Faturanın düzenlenme tarihini belirtir. |
| `alias` | string / null | Hayır | Firmaya ait posta kutusunu ifade eder. |
| `company` | CreateInvoiceCompanyRequestDTO | Hayır |  |
| `isTaxIncludedInPrice` | boolean | Hayır | Fiyatlara verginin dahil olup olmadığını belirtir. |
| `currencyType` | CurrencyType | Hayır |  |
| `draftInvoiceType` | DraftInvoiceType | Hayır |  |
| `currencyRate` | double / null | Hayır | Faturada kullanılan döviz kuru oranını belirtir. |
| `subTotalAmount` | double | Hayır | Faturanın vergi hariç toplam tutarını ifade eder. |
| `totalTax` | double | Hayır | Faturadaki toplam vergi tutarını belirtir. |
| `totalAmount` | double | Hayır | Faturanın vergi dahil toplam tutarını ifade eder. |
| `subTotalGrossAmount` | double / null | Hayır | Faturanın brüt ara toplam tutarını belirtir (indirim öncesi). |
| `subTotalDiscountValue` | double / null | Hayır | Faturadaki indirim tutarını belirtir. |
| `subTotalDiscountIsPercent` | boolean / null | Hayır | İndirimin yüzde bazlı olup olmadığını belirtir. |
| `description` | string / null | Hayır | Faturaya ait genel açıklamayı veya notu ifade eder. |
| `returnInvoiceNumber` | string / null | Hayır | İade faturası için iade fatura numarasını belirtir. |
| `returnInvoiceDate` | date-time / null | Hayır | İade faturası için iade fatura tarihini belirtir. |
| `invoicePeriodStartDate` | date-time / null | Hayır | SARJANLIK faturası için başlama tarihi saati. |
| `invoiceLicensePlateNo` | string / null | Hayır | SARJANLIK faturası için araç plaka. |
| `invoicePeriodEndDate` | date-time / null | Hayır | SARJANLIK faturası için başlama tarihi saati. |
| `lineItems` | array: CreateInvoiceLineItemRequestDTO | Hayır | Faturadaki kalemlerin listesini içerir. |
| `orderInfos` | array: DraftInvoiceAdditionalInfoWithDateDto / null | Hayır | Faturaya ait eğer sipariş bilgisi eklemek isterseniz doldurmanız gerekir. |
| `despatchInfos` | array: DraftInvoiceAdditionalInfoWithDateDto / null | Hayır | Faturaya ait eğer irsaliye bilgisi eklemek isterseniz doldurmanız gerekir. |
| `refId` | string / null | Hayır | Entegrasyon veya dış referans ID değeri (GUID formatında). |

### CreateInvoiceResponse

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `success` | boolean | Hayır |  |
| `message` | string / null | Hayır |  |
| `data` | string / null | Hayır |  |
| `invoiceId` | uuid / null | Hayır |  |

### CreateSMMInvoiceRequestDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoiceOutputType` | InvoiceOutputType | Hayır |  |
| `invoiceTypeId` | InvoiceType | Hayır |  |
| `invoicePrefixId` | uuid | Evet | e-SMM serisi için benzersiz tanımlayıcı. **Önemli**: Bu alan zorunludur. |
| `invoiceDate` | date-time | Evet | Makbuzun düzenlenme tarihini belirtir. |
| `company` | CreateInvoiceCompanyRequestDTO | Hayır |  |
| `isTaxIncludedInPrice` | boolean | Hayır | Fiyatlara verginin dahil olup olmadığını belirtir. |
| `currencyType` | CurrencyType | Hayır |  |
| `currencyRate` | double / null | Hayır | Döviz kuru oranını belirtir. |
| `subTotalAmount` | double | Hayır | Makbuzun vergi hariç ara toplam tutarını ifade eder. |
| `totalTax` | double | Hayır | Makbuzdaki toplam vergi tutarını belirtir (KDV vb.). |
| `totalAmount` | double | Hayır | Makbuzun net / genel toplam tutarını ifade eder. |
| `subTotalGrossAmount` | double / null | Hayır | Makbuzun brüt ara toplam tutarını belirtir (indirim/kesinti öncesi). |
| `draftSmmInvoiceType` | DraftSmmInvoiceType | Hayır |  |
| `description` | string / null | Hayır | Makbuza ait genel açıklamayı veya notu ifade eder. |
| `lineItems` | array: CreateInvoiceLineItemRequestDTO | Hayır | Makbuzdaki hizmet kalemlerinin listesini içerir. |
| `refId` | string / null | Hayır | Entegrasyon veya dış referans ID değeri (GUID formatında). |
| `alias` | string / null | Hayır | Firmaya ait posta kutusunu ifade eder. |
| `subTotalDiscountIsPercent` | boolean / null | Hayır | İndirimin yüzde bazlı olup olmadığını belirtir. |
| `subTotalDiscountValue` | double / null | Hayır | Faturadaki indirim tutarını belirtir. |

### CurrencyType

Faturada kullanılan para birimini belirtir (örneğin, TRY, USD). Available : *USD, EUR, GBP, TRY* 

### CustomerEInvoiceInfoResponseDto

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `customerIsEInvoiceAndAliasList` | CustomerIsEInvoiceResponseDto | Hayır |  |
| `prefixList` | array: InvoicePrefixForDropdownResponseDto / null | Hayır |  |
| `companyInfo` | CompanyInfoForAPIDTO | Hayır |  |

### CustomerIsEInvoiceResponseDto

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `isEInvoiceUser` | boolean | Hayır |  |
| `aliasList` | array: string / null | Hayır |  |

### DespatchDocumentType

 Available : *SEVK, MATBUDAN* 

### DespatchIncomingInvoice

 Available : *Received, PendingAnswer, AcceptAnswered, AcceptAnswerCompleted, PartiallyAcceptAnswered, PartiallyAcceptAnswerCompleted, RejectAnswered, RejectAnswerCompleted, AutomaticallyAccepted, Failed, FromArchive* 

### DespatchProfile

 Available : *TEMELIRSALIYE, HKSIRSALIYE, IDISIRSALIYE* 

### DraftDespatchPreviewResponseDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `despatchOutputType` | InvoiceOutputType | Hayır |  |
| `despatchProfileId` | DespatchProfile | Hayır |  |
| `despatchDocumentTypeId` | DespatchDocumentType | Hayır |  |
| `despatchPrefixId` | uuid | Evet | İrsaliye serisi (prefix) için benzersiz tanımlayıcı. **Önemli**: Zorunludur. |
| `despatchDate` | date-time | Evet | İrsaliyenin düzenlenme tarihi. |
| `actualDespatchDate` | date-time / null | Hayır | Fiili sevk tarihi ve saati. Belirtilmezse irsaliye tarihi kullanılır. |
| `orderNumber` | string / null | Hayır | Sipariş numarası. |
| `orderDate` | date-time / null | Hayır | Sipariş tarihi. |
| `matbuNumber` | string / null | Hayır | Matbu irsaliye numarası. |
| `matbuDate` | date-time / null | Hayır | Matbu irsaliye tarihi. |
| `shipmentNumber` | string / null | Hayır | Sevkiyat numarası. |
| `description` | string / null | Hayır | İrsaliyeye ait genel açıklama veya not. |
| `company` | CreateInvoiceCompanyRequestDTO | Hayır |  |
| `alias` | string / null | Hayır | Alıcı firmaya ait posta kutusu (alias/etiket). |
| `draftDespatchType` | DraftInvoiceType | Hayır |  |
| `delivery` | CreateDespatchDeliveryRequestDTO | Hayır |  |
| `deliveryAddress` | string / null | Hayır | Farklı bir teslimat adresi varsa açık adres metni. |
| `deliveryCountry` | string / null | Hayır | Teslimat ülke adı (örn. Türkiye). |
| `deliveryCity` | string / null | Hayır | Teslimat il / şehir adı (örn. Gaziantep). Sistem otomatik olarak ID karşılığını bulur. |
| `deliveryDistrict` | string / null | Hayır | Teslimat ilçe adı (örn. Şahinbey). Sistem otomatik olarak ID karşılığını bulur. |
| `deliveryCityId` | int32 / null | Hayır | Teslimat il ID değeri (isteğe bağlı, DeliveryCity yerine doğrudan ID verilebilir). |
| `deliveryDistrictId` | int32 / null | Hayır | Teslimat ilçe ID değeri (isteğe bağlı, DeliveryDistrict yerine doğrudan ID verilebilir). |
| `deliveryCountryId` | int32 / null | Hayır | Teslimat ülke ID değeri (isteğe bağlı). |
| `carrier` | CreateDespatchCarrierRequestDTO | Hayır |  |
| `carrierTitle` | string / null | Hayır | Taşıyıcı unvanı. |
| `carrierTaxNumber` | string / null | Hayır | Taşıyıcı vergi kimlik numarası veya TCKN. |
| `driverPersonFirstName` | string / null | Hayır | Şoför adı. |
| `driverPersonLastName` | string / null | Hayır | Şoför soyadı. |
| `driverPersonTaxNumber` | string / null | Hayır | Şoför TCKN. |
| `licensePlate` | string / null | Hayır | Araç plaka numarası. |
| `transportLicensePlate` | string / null | Hayır | Dorse / taşıma plaka numarası. |
| `phoneNumber` | string / null | Hayır | İletişim telefon numarası. |
| `carrierCountry` | string / null | Hayır | Taşıyıcı ülke adı (örn. Türkiye). |
| `carrierCity` | string / null | Hayır | Taşıyıcı il / şehir adı (örn. Gaziantep). Sistem otomatik olarak ID karşılığını bulur. |
| `carrierDistrict` | string / null | Hayır | Taşıyıcı ilçe adı (örn. Şahinbey). Sistem otomatik olarak ID karşılığını bulur. |
| `carrierCityId` | int32 / null | Hayır | Taşıyıcı il ID değeri (isteğe bağlı). |
| `carrierDistrictId` | int32 / null | Hayır | Taşıyıcı ilçe ID değeri (isteğe bağlı). |
| `carrierCountryId` | int32 / null | Hayır | Taşıyıcı ülke ID değeri (isteğe bağlı). |
| `lineItems` | array: CreateDespatchLineItemRequestDTO | Hayır | İrsaliye kalemlerinin listesini içerir. |
| `draftDespatchId` | uuid | Hayır | Taslak irsaliyenin benzersiz kimliği (ID). |
| `despatchNumber` | string / null | Hayır | İrsaliye numarası (varsa). |
| `createdOnDate` | date-time / null | Hayır | Kayıt oluşturulma tarihi. |

### DraftDespatchPreviewResponseDTODataResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `success` | boolean | Hayır |  |
| `message` | string / null | Hayır |  |
| `data` | DraftDespatchPreviewResponseDTO | Hayır |  |

### DraftDespatchResponseDto

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `draftDespatchId` | uuid | Hayır |  |
| `companyName` | string / null | Hayır |  |
| `despatchDate` | date-time | Hayır |  |
| `actualDespatchDate` | date-time | Hayır |  |
| `despatchNumber` | string / null | Hayır |  |
| `createdOnDate` | date-time / null | Hayır |  |

### DraftDespatchResponseDtoPaginatedResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `succeeded` | boolean | Hayır |  |
| `success` | boolean | Hayır |  |
| `message` | string / null | Hayır |  |
| `datas` | array: DraftDespatchResponseDto / null | Hayır |  |
| `pageNumber` | int32 | Hayır |  |
| `pageSize` | int32 | Hayır |  |
| `isFirstPage` | boolean | Hayır |  |
| `isLastPage` | boolean | Hayır |  |
| `totalPages` | int32 | Hayır |  |
| `totalRecords` | int32 | Hayır |  |

### DraftInvoiceAdditionalInfoWithDateDto

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `additionalInfoDate` | date-time / null | Hayır | Tarih alanını temsil eder. |
| `additionalInfoValue` | string / null | Hayır | Numaras alanını temsil eder. |

### DraftInvoicePreviewResponseDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoiceOutputType` | InvoiceOutputType | Hayır |  |
| `invoiceTypeId` | InvoiceType | Hayır |  |
| `invoiceProfileId` | InvoiceProfile | Hayır |  |
| `invoicePrefixId` | uuid | Evet | Fatura serisi için benzersiz tanımlayıcı. **Önemli**: Bu alan zorunludur. |
| `invoiceDate` | date-time | Evet | Faturanın düzenlenme tarihini belirtir. |
| `alias` | string / null | Hayır | Firmaya ait posta kutusunu ifade eder. |
| `company` | CreateInvoiceCompanyRequestDTO | Hayır |  |
| `isTaxIncludedInPrice` | boolean | Hayır | Fiyatlara verginin dahil olup olmadığını belirtir. |
| `currencyType` | CurrencyType | Hayır |  |
| `draftInvoiceType` | DraftInvoiceType | Hayır |  |
| `currencyRate` | double / null | Hayır | Faturada kullanılan döviz kuru oranını belirtir. |
| `subTotalAmount` | double | Hayır | Faturanın vergi hariç toplam tutarını ifade eder. |
| `totalTax` | double | Hayır | Faturadaki toplam vergi tutarını belirtir. |
| `totalAmount` | double | Hayır | Faturanın vergi dahil toplam tutarını ifade eder. |
| `subTotalGrossAmount` | double / null | Hayır | Faturanın brüt ara toplam tutarını belirtir (indirim öncesi). |
| `subTotalDiscountValue` | double / null | Hayır | Faturadaki indirim tutarını belirtir. |
| `subTotalDiscountIsPercent` | boolean / null | Hayır | İndirimin yüzde bazlı olup olmadığını belirtir. |
| `description` | string / null | Hayır | Faturaya ait genel açıklamayı veya notu ifade eder. |
| `returnInvoiceNumber` | string / null | Hayır | İade faturası için iade fatura numarasını belirtir. |
| `returnInvoiceDate` | date-time / null | Hayır | İade faturası için iade fatura tarihini belirtir. |
| `invoicePeriodStartDate` | date-time / null | Hayır | SARJANLIK faturası için başlama tarihi saati. |
| `invoiceLicensePlateNo` | string / null | Hayır | SARJANLIK faturası için araç plaka. |
| `invoicePeriodEndDate` | date-time / null | Hayır | SARJANLIK faturası için başlama tarihi saati. |
| `lineItems` | array: CreateInvoiceLineItemRequestDTO | Hayır | Faturadaki kalemlerin listesini içerir. |
| `orderInfos` | array: DraftInvoiceAdditionalInfoWithDateDto / null | Hayır | Faturaya ait eğer sipariş bilgisi eklemek isterseniz doldurmanız gerekir. |
| `despatchInfos` | array: DraftInvoiceAdditionalInfoWithDateDto / null | Hayır | Faturaya ait eğer irsaliye bilgisi eklemek isterseniz doldurmanız gerekir. |
| `refId` | string / null | Hayır | Entegrasyon veya dış referans ID değeri (GUID formatında). |
| `draftInvoiceStatus` | DraftInvoiceStatus | Hayır |  |

### DraftInvoicePreviewResponseDTODataResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `success` | boolean | Hayır |  |
| `message` | string / null | Hayır |  |
| `data` | DraftInvoicePreviewResponseDTO | Hayır |  |

### DraftInvoiceResponseDto

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `draftInvoiceId` | uuid | Hayır |  |
| `companyName` | string / null | Hayır |  |
| `invoiceDate` | date-time | Hayır |  |
| `invoiceNumber` | string / null | Hayır |  |
| `currencySymbol` | string / null | Hayır |  |
| `category` | string / null | Hayır |  |
| `createdOnDate` | date-time / null | Hayır |  |
| `totalAmount` | double | Hayır |  |
| `invoiceType` | string / null | Hayır |  |
| `draftStatus` | string / null | Hayır |  |
| `invoiceProfile` | string / null | Hayır |  |
| `draftStatusId` | int32 | Hayır |  |

### DraftInvoiceResponseDtoPaginatedResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `succeeded` | boolean | Hayır |  |
| `success` | boolean | Hayır |  |
| `message` | string / null | Hayır |  |
| `datas` | array: DraftInvoiceResponseDto / null | Hayır |  |
| `pageNumber` | int32 | Hayır |  |
| `pageSize` | int32 | Hayır |  |
| `isFirstPage` | boolean | Hayır |  |
| `isLastPage` | boolean | Hayır |  |
| `totalPages` | int32 | Hayır |  |
| `totalRecords` | int32 | Hayır |  |

### DraftInvoiceStatus

 Available : *TASLAK, IMZABEKLIYOR, EINVOICE* 

### DraftInvoiceType

 Available : *DraftInvoice, EInvoice* 

### DraftSmmInvoiceType

 Available : *DraftInvoice, Invoice* 

### EInvoiceIdAndDirectionDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoiceId` | uuid | Hayır |  |
| `invoiceDocumentDirection` | InvoiceDocumentDirection | Hayır |  |

### GetIncomingInvoiceListResponseDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoiceId` | uuid | Hayır |  |
| `invoiceDate` | date-time | Hayır |  |
| `invoiceNumber` | string / null | Hayır |  |
| `companyTitle` | string / null | Hayır |  |
| `companyTaxNumber` | string / null | Hayır |  |
| `invoiceProfile` | string / null | Hayır |  |
| `invoiceDocumentType` | string / null | Hayır |  |
| `incomingStatus` | string / null | Hayır |  |
| `payableAmount` | double | Hayır |  |
| `taxAmount` | double | Hayır |  |
| `currencyType` | string / null | Hayır |  |
| `uuid` | string / null | Hayır |  |

### GetIncomingInvoiceListResponseDTOPaginatedResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `succeeded` | boolean | Hayır |  |
| `success` | boolean | Hayır |  |
| `message` | string / null | Hayır |  |
| `datas` | array: GetIncomingInvoiceListResponseDTO / null | Hayır |  |
| `pageNumber` | int32 | Hayır |  |
| `pageSize` | int32 | Hayır |  |
| `isFirstPage` | boolean | Hayır |  |
| `isLastPage` | boolean | Hayır |  |
| `totalPages` | int32 | Hayır |  |
| `totalRecords` | int32 | Hayır |  |

### GetInvoiceCodeResponseDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoiceCodeId` | int32 | Hayır |  |
| `invoiceCodeKey` | string / null | Hayır |  |
| `invoiceCodeName` | string / null | Hayır |  |
| `invoiceCodeValue` | int32 / null | Hayır |  |
| `isStatic` | boolean | Hayır |  |
| `isPercentage` | boolean | Hayır |  |

### GetInvoiceCodeResponseDTOListDataResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `success` | boolean | Hayır |  |
| `message` | string / null | Hayır |  |
| `data` | array: GetInvoiceCodeResponseDTO / null | Hayır |  |

### GetOutgoingInvoiceListResponseDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoiceId` | uuid | Hayır |  |
| `invoiceDate` | date-time | Hayır |  |
| `invoiceNumber` | string / null | Hayır |  |
| `companyTitle` | string / null | Hayır |  |
| `companyTaxNumber` | string / null | Hayır |  |
| `invoiceProfile` | string / null | Hayır |  |
| `invoiceDocumentType` | string / null | Hayır |  |
| `outgoingStatus` | string / null | Hayır |  |
| `payableAmount` | double | Hayır |  |
| `taxAmount` | double | Hayır |  |
| `currencyType` | string / null | Hayır |  |
| `uuid` | string / null | Hayır |  |

### GetOutgoingInvoiceListResponseDTOPaginatedResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `succeeded` | boolean | Hayır |  |
| `success` | boolean | Hayır |  |
| `message` | string / null | Hayır |  |
| `datas` | array: GetOutgoingInvoiceListResponseDTO / null | Hayır |  |
| `pageNumber` | int32 | Hayır |  |
| `pageSize` | int32 | Hayır |  |
| `isFirstPage` | boolean | Hayır |  |
| `isLastPage` | boolean | Hayır |  |
| `totalPages` | int32 | Hayır |  |
| `totalRecords` | int32 | Hayır |  |

### GetUnitForSelectDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `unitId` | int32 | Hayır |  |
| `unitDescription` | string / null | Hayır |  |
| `unitHasDecimal` | boolean | Hayır |  |

### GetUnitForSelectDTOListDataResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `success` | boolean | Hayır |  |
| `message` | string / null | Hayır |  |
| `data` | array: GetUnitForSelectDTO / null | Hayır |  |

### IncomingDespatchForTableResponseDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `despatchId` | uuid | Hayır |  |
| `despatchDate` | date-time | Hayır |  |
| `actualDespatchDate` | date-time / null | Hayır |  |
| `despatchNumber` | string / null | Hayır |  |
| `despatchStatus` | string / null | Hayır |  |
| `despatchIncomingInvoiceStatus` | DespatchIncomingInvoice | Hayır |  |
| `despatchProfile` | string / null | Hayır |  |
| `despatchDocumentType` | string / null | Hayır |  |
| `companyTitle` | string / null | Hayır |  |
| `isReaded` | boolean | Hayır |  |
| `isPrinted` | boolean | Hayır |  |

### IncomingDespatchForTableResponseDTOPaginatedResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `succeeded` | boolean | Hayır |  |
| `success` | boolean | Hayır |  |
| `message` | string / null | Hayır |  |
| `datas` | array: IncomingDespatchForTableResponseDTO / null | Hayır |  |
| `pageNumber` | int32 | Hayır |  |
| `pageSize` | int32 | Hayır |  |
| `isFirstPage` | boolean | Hayır |  |
| `isLastPage` | boolean | Hayır |  |
| `totalPages` | int32 | Hayır |  |
| `totalRecords` | int32 | Hayır |  |

### InvoiceDocumentDirection

 Available : *Outgoing, Incoming* 

### InvoiceOutputType

 Available : *Ubl, Html, Pdf, Xml* 

### InvoicePrefixForDropdownResponseDto

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `invoicePrefixId` | uuid | Hayır |  |
| `prefix` | string / null | Hayır |  |
| `lastUsedNumber` | double | Hayır |  |
| `isDefault` | boolean | Hayır |  |

### InvoicePrefixForDropdownResponseDtoListDataResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `success` | boolean | Hayır |  |
| `message` | string / null | Hayır |  |
| `data` | array: InvoicePrefixForDropdownResponseDto / null | Hayır |  |

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
| `accessToken` | string / null | Hayır |  |

### LoginResponseDTODataResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `success` | boolean | Hayır |  |
| `message` | string / null | Hayır |  |
| `data` | LoginResponseDTO | Hayır |  |

### LoginTokenDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `company_code` | string | Hayır | Uygulama içerisinden alınan Firma Kodu. |
| `client_id` | string | Hayır | Uygulama içerisinden alınan ClientId |
| `client_secret` | string | Hayır | Uygulama içerisinden alınan ClientSecret |

### OutgoingDespatchForTableResponseDTO

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `despatchId` | uuid | Hayır |  |
| `despatchDate` | date-time | Hayır |  |
| `actualDespatchDate` | date-time / null | Hayır |  |
| `despatchNumber` | string / null | Hayır |  |
| `despatchStatus` | string / null | Hayır |  |
| `despatchProfile` | string / null | Hayır |  |
| `despatchDocumentType` | string / null | Hayır |  |
| `companyTitle` | string / null | Hayır |  |
| `isPrinted` | boolean | Hayır |  |
| `isConvertedToInvoice` | boolean | Hayır |  |
| `invoiceStatus` | InvoiceStatus | Hayır |  |
| `invoiceId` | uuid / null | Hayır |  |

### OutgoingDespatchForTableResponseDTOPaginatedResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `succeeded` | boolean | Hayır |  |
| `success` | boolean | Hayır |  |
| `message` | string / null | Hayır |  |
| `datas` | array: OutgoingDespatchForTableResponseDTO / null | Hayır |  |
| `pageNumber` | int32 | Hayır |  |
| `pageSize` | int32 | Hayır |  |
| `isFirstPage` | boolean | Hayır |  |
| `isLastPage` | boolean | Hayır |  |
| `totalPages` | int32 | Hayır |  |
| `totalRecords` | int32 | Hayır |  |

### ProblemDetails

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `type` | string / null | Hayır |  |
| `title` | string / null | Hayır |  |
| `status` | int32 / null | Hayır |  |
| `detail` | string / null | Hayır |  |
| `instance` | string / null | Hayır |  |

### Result

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `success` | boolean | Hayır |  |
| `message` | string / null | Hayır |  |

### StringDataResult

| Alan | Tip / Model | Zorunlu | Açıklama |
|---|---|---|---|
| `success` | boolean | Hayır |  |
| `message` | string / null | Hayır |  |
| `data` | string / null | Hayır |  |

### TaxRateType

 Available : *KDV_0, KDV_1, KDV_10, KDV_20* 


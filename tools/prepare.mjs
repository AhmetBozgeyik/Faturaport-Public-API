// Yalnızca yerel OpenAPI dosyalarını okur; API çağrısı yapmaz.
import fs from 'node:fs';
import path from 'node:path';
const write = (file, value) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, typeof value === 'string' ? value : JSON.stringify(value, null, 2) + '\n');
};
const specs = {};
for (const env of ['dev', 'prod']) {
  const spec = JSON.parse(fs.readFileSync(`openapi/${env}.json`, 'utf8'));
  // Public endpointlerin kullandığı modellere indirger; ilgisiz portal modellerini yayımlamaz.
  const names = new Set();
  function visit(value) {
    if (!value || typeof value !== 'object') return;
    if (value.$ref?.startsWith('#/components/schemas/')) {
      const name = value.$ref.split('/').pop();
      if (!names.has(name)) { names.add(name); visit(spec.components.schemas[name]); }
    }
    Object.values(value).forEach(visit);
  }
  visit(spec.paths);
  spec.components.schemas = Object.fromEntries([...names].sort().map(n => [n, spec.components.schemas[n]]));
  write(`openapi/${env}.json`, spec);
  specs[env] = spec;
}
const spec = specs.dev;
const operations = Object.entries(spec.paths).flatMap(([url, methods]) => Object.entries(methods)
  .filter(([method]) => ['get', 'post', 'delete', 'put', 'patch'].includes(method))
  .map(([method, op]) => ({ url, method, op })));
function scrub(value, key = '') {
  if (Array.isArray(value)) return value.map(x => scrub(x, key));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k,v]) => [k, scrub(v,k)]));
  if (typeof value !== 'string') return value;
  if (key === 'driverPersonTaxNumber') return '00000000000';
  if (/taxNumber|companyTaxNumber/i.test(key)) return '0000000000';
  if (/companyName|companyTitle|unvan/i.test(key)) return 'ÖRNEK TEST FİRMASI';
  if (/taxOffice|vergiDairesiAdi/i.test(key)) return 'Örnek Vergi Dairesi';
  if (/^address$|^adres$/i.test(key)) return 'Örnek Mahalle, Örnek Sokak No:1';
  if (key === 'alias' || key === 'aliasList') return 'test@pk.example.com';
  if (key === 'accessToken') return 'TOKEN_DEGERI';
  return value;
}
const examples = new Map();
for (const {url, op} of operations) {
  const name = url.split('/')[3];
  const match = op.description?.match(/```json\s*([\s\S]*?)```/);
  if (match && op.requestBody) {
    const value = scrub(JSON.parse(match[1]));
    if (name === 'add-invoice') {
      value.returnInvoiceNumber = null;
      value.returnInvoiceDate = null;
      value.draftInvoiceType = 'DraftInvoice';
      value.subTotalGrossAmount = 1000;
      value.orderInfos = [];
      value.despatchInfos = [];
    }
    if (name === 'add-despatch') value.draftDespatchType = 'DraftInvoice';
    if (name === 'add-smm-invoice') {
      // Kaynak örnekte kesinti türü sayı, tutarlar metin verilmiş.
      // Örnek istekte yalnızca KDV kullanılır; kesinti tanımı tahmin edilmez.
      value.draftSmmInvoiceType = 'DraftInvoice';
      value.totalAmount = 16500;
      value.subTotalGrossAmount = 15000;
      value.alias = null;
      value.lineItems[0].total = 16500;
      value.lineItems[0].lineItemTaxes = [{
        lineItemTaxType: 'KDV', invoiceCodeId: null, isTaxPercent: true,
        amount: 1500, percent: 10, taxableAmount: 15000
      }];
    }
    examples.set(name, value);
    write(`samples/json/${name === 'add-invoice' ? 'create-invoice' : name}.request.json`, value);
  }
  const response = op.responses?.['200']?.description?.match(/```json\s*([\s\S]*?)```/)
    ?? (!op.requestBody ? op.description?.match(/```json\s*([\s\S]*?)```/) : null);
  if (response) {
    try { write(`samples/json/${name}.response.json`, scrub(JSON.parse(response[1]))); }
    catch { /* JSON olmayan doküman örneği kopyalanmaz. */ }
  }
}
write('samples/json/token.request.json', { company_code: 'FIRMA_KODUNUZ', client_id: 'CLIENT_ID_DEGERINIZ', client_secret: 'CLIENT_SECRET_DEGERINIZ' });
let reference = '# Faturaport API adresleri ve istek alanları\n\nFatura, irsaliye ve serbest meslek makbuzu işlemlerinin adreslerini bu sayfada bulabilirsiniz. İlk kez bağlantı kuruyorsanız [hesap açma ve token alma](baslangic.md) adımlarıyla başlayın.\n\nİstek adresinin başına test için `https://devapi.faturaport.com`, Canlı için `https://prodapi.faturaport.com` ekleyin. Token alma dışında bütün işlemlerde `Authorization: Bearer TOKEN` gönderin. JSON gönderirken `Content-Type: application/json` kullanın.\n\n13 Ekim 2026 tarihinde [Dev](https://devapi.faturaport.com/docs/index.html) ve [Canlı](https://prodapi.faturaport.com/docs/index.html) dokümanlarıyla güncellendi.\n\n## İşlem listesi\n\n| İşlem | Yöntem ve adres |\n|---|---|\n';
for (const {url,method,op} of operations) reference += `| ${op.summary} | \`${method.toUpperCase()} ${url}\` |\n`;
reference += '\n## İstek ayrıntıları\n\n';
const escape = value => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n',' ').replaceAll('\r','');
for (const {url,method,op} of operations) {
  reference += `## ${op.summary}\n\n\`${method.toUpperCase()} ${url}\`\n\n`;
  if (op.parameters?.length) {
    reference += '| Alan | Konum | Zorunlu | Tip |\n|---|---|---|---|\n';
    for (const p of op.parameters) reference += `| \`${p.name}\` | ${p.in === 'path' ? 'Adreste' : 'Soru işaretinden sonra'} | ${p.required ? 'Evet' : 'Hayır'} | ${p.schema?.$ref?.split('/').pop() ?? p.schema?.format ?? p.schema?.type} |\n`;
    reference += '\n';
  }
  const requestSchema = op.requestBody?.content?.['application/json']?.schema?.$ref?.split('/').pop();
  if (requestSchema) reference += `Gönderilecek JSON alanları: [${requestSchema}](veri-alanlari.md#${requestSchema.toLowerCase()}).\n\n`;
  reference += 'HTTP yanıtları: ' + Object.keys(op.responses ?? {}).map(x => `\`${x}\``).join(', ') + '.\n\n';
  const responseSchema = op.responses?.['200']?.content?.['application/json']?.schema?.$ref?.split('/').pop();
  if (responseSchema) reference += `Başarılı yanıtta dönen alanlar: [${responseSchema}](veri-alanlari.md#${responseSchema.toLowerCase()}).\n\n`;
}
write('docs/api-referansi.md',reference);
reference = '# Faturaport API JSON alanları\n\nBu sayfa, API dokümanında yer alan istek ve yanıt alanlarını bir araya getirir. Alan isimleri kodunuzda kullanacağınız şekliyle korunmuştur. İlgili işlemi bulmak için [API adresleri](api-referansi.md) sayfasını kullanın.\n\nZorunlu sütunu API dosyasındaki tanımı gösterir. Belge oluştururken seri, alıcı ve kalem bilgilerini ürün rehberindeki adımlara göre doldurun. `uuid`, `3fa85f64-5717-4562-b3fc-2c963f66afa6` gibi bir ID; `date-time`, `2026-10-13T10:00:00Z` gibi bir tarih ve saattir.\n\n';
for (const [name,schema] of Object.entries(spec.components.schemas)) {
  reference += `### ${name}\n\n`;
  if (!schema.properties) { reference += escape(schema.description || schema.type) + '\n\n'; continue; }
  reference += '| Alan | Tip / Model | Zorunlu | Açıklama |\n|---|---|---|---|\n';
  for (const [key,p] of Object.entries(schema.properties)) {
    const type = p.$ref?.split('/').pop() ?? (p.type === 'array' ? `array: ${p.items?.$ref?.split('/').pop() ?? p.items?.type}` : p.format ?? p.type);
    reference += `| \`${key}\` | ${escape(type)}${p.nullable ? ' / null' : ''} | ${schema.required?.includes(key) ? 'Evet' : 'Hayır'} | ${escape(p.description ?? p.title)} |\n`;
  }
  reference += '\n';
}
write('docs/veri-alanlari.md',reference);
const variables = [ ['baseUrl','https://devapi.faturaport.com'], ['companyCode',''], ['clientId',''], ['clientSecret',''], ['accessToken',''], ['taxnumber','0000000000'], ['invoiceId',''], ['draftInvoiceId',''], ['draftDespatchId',''], ['outgoingInvoiceId',''], ['refId',''], ['invoiceType','Satis'], ['despatchId',''], ['direction','1'] ].map(([key,value])=>({key,value,type:'string'}));
const items = operations.map(({url,method,op}) => {
  const name = url.split('/')[3];
  let target = '{{baseUrl}}' + url.replace(/\{([^}]+)\}/g,'{{$1}}');
  if (op.parameters?.some(p => p.name === 'PageNumber')) target += '?PageNumber=1&PageSize=10';
  if (name === 'get-despatch-pdf') target += '?DespatchId={{despatchId}}&InvoiceDocumentDirection={{direction}}';
  const request = { method: method.toUpperCase(), header: [], url: target,
    description: op.summary + '. Kullanım ayrıntıları: docs/api-referansi.md.' };
  const body = examples.get(name);
  if (name === 'getapitoken' || body) {
    request.header.push({key:'Content-Type',value:'application/json'});
    request.body = {mode:'raw',raw:JSON.stringify(name === 'getapitoken' ? {company_code:'{{companyCode}}',client_id:'{{clientId}}',client_secret:'{{clientSecret}}'} : body,null,2),options:{raw:{language:'json'}}};
  }
  if (name === 'getapitoken') request.auth = {type:'noauth'};
  const item = {name:method.toUpperCase() + ' ' + op.summary,request};
  if (name === 'getapitoken') item.event = [{listen:'test',script:{type:'text/javascript',exec:[
    'pm.collectionVariables.unset("accessToken");',
    'if (pm.response.code >= 200 && pm.response.code < 300) {',
    '  const result = pm.response.json();',
    '  if (result.success !== false && result.data && result.data.accessToken) pm.collectionVariables.set("accessToken", result.data.accessToken);',
    '}'
  ]}}];
  return item;
});
write('postman/faturaport.postman_collection.json',{
  info:{name:'Faturaport Public API V3',description:'Önce token alın ve birim listesini sorgulayın. Belge oluşturmadan önce Body bölümündeki bilgileri hesabınıza göre değiştirin. İrsaliye ve e-SMM örnekleri taslak kaydeder. İşlemleri ayrı çalıştırın; koleksiyonda gönderim, silme ve iptal işlemleri de bulunur.',schema:'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'},
  auth:{type:'bearer',bearer:[{key:'token',value:'{{accessToken}}',type:'string'}]},variable:variables,item:items
});
console.log(`${operations.length} endpoint; ${Object.keys(spec.components.schemas).length} kullanılan model. Referans, JSON ve Postman dosyaları oluşturuldu.`);

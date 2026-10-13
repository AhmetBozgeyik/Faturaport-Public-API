import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir,{withFileTypes:true})) {
    if (['.git','bin','obj'].includes(entry.name)) continue;
    const file = path.join(dir,entry.name);
    if (entry.isDirectory()) walk(file); else files.push(file);
  }
}
walk('.');
for (const file of files.filter(x=>x.endsWith('.json'))) JSON.parse(fs.readFileSync(file,'utf8'));
for (const file of files.filter(x=>x.endsWith('.md'))) {
  const text = fs.readFileSync(file,'utf8');
  assert(!text.includes('\uFFFD'), `Bozuk UTF-8: ${file}`);
  for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    assert(fs.existsSync(path.resolve(path.dirname(file),target.split('#')[0])),`Kırık bağlantı: ${file} → ${target}`);
  }
}
const specs = ['dev','prod'].map(env=>JSON.parse(fs.readFileSync(`openapi/${env}.json`,'utf8')));
assert.deepEqual(Object.keys(specs[0].paths).sort(),Object.keys(specs[1].paths).sort(),'Dev/Canlı endpoint farkı');
for (const spec of specs) {
  function refs(value) {
    if (!value || typeof value !== 'object') return;
    if (value.$ref) {
      const resolved = value.$ref.slice(2).split('/').reduce((v,k)=>v?.[k],spec);
      assert(resolved,`Çözülemeyen referans: ${value.$ref}`);
    }
    Object.values(value).forEach(refs);
  }
  refs(spec);
}
function validate(value,schema,spec,label) {
  if (schema.$ref) schema = schema.$ref.slice(2).split('/').reduce((v,k)=>v[k],spec);
  if (value === null && schema.nullable) return;
  if (schema.type === 'object') {
    assert(value && typeof value === 'object' && !Array.isArray(value),label);
    for (const required of schema.required ?? []) assert(required in value,`${label}.${required} eksik`);
    for (const [key,v] of Object.entries(value)) {
      const property = schema.properties?.[key];
      if (!property) { assert(schema.additionalProperties !== false,`${label}.${key} tanımsız`); continue; }
      validate(v,property,spec,`${label}.${key}`);
    }
  } else if (schema.type === 'array') { assert(Array.isArray(value),label); value.forEach(v=>validate(v,schema.items,spec,label)); }
  else {
    const expected = schema.type === 'integer' ? 'number' : schema.type;
    assert(typeof value === expected,`${label}: ${expected} gerekli`);
    if (schema.type === 'integer') assert(Number.isInteger(value),label);
    if (schema.format === 'uuid') assert(/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(value),label);
    if (schema.format === 'date-time') assert(!Number.isNaN(Date.parse(value)),label);
  }
}
for (const spec of specs) {
  for (const [file,model] of [['token.request.json','LoginTokenDTO'],['create-invoice.request.json','CreateInvoiceRequestDTO'],['convert-to-einvoice.request.json','ConvertToEInvoiceOpenApiRequestDto'],['add-despatch.request.json','CreateDespatchRequestDTO'],['add-smm-invoice.request.json','CreateSMMInvoiceRequestDTO']]) {
    validate(JSON.parse(fs.readFileSync(`samples/json/${file}`,'utf8')),spec.components.schemas[model],spec,file);
  }
}
const collection = JSON.parse(fs.readFileSync('postman/faturaport.postman_collection.json','utf8'));
for (const file of ['samples/json/add-despatch.request.json', 'samples/json/add-smm-invoice.request.json']) {
  const request = JSON.parse(fs.readFileSync(file,'utf8'));
  assert.equal(request.draftDespatchType ?? request.draftSmmInvoiceType,'DraftInvoice','İlk örnek taslak oluşturmalı');
}
assert.equal(collection.item.length,Object.keys(specs[0].paths).length);
for (const item of collection.item) {
  const p = item.request.url.replace('{{baseUrl}}','').split('?')[0].replace(/\{\{([^}]+)\}\}/g,'{$1}');
  assert(specs[0].paths[p]?.[item.request.method.toLowerCase()],`Postman endpointi: ${p}`);
}
console.log('JSON, yerel Markdown bağlantıları, OpenAPI referansları, Dev/Canlı kapsamı, istek modelleri ve Postman endpointleri doğrulandı.');

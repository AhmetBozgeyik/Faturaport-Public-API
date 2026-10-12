// Ağ çağrısı yapılmadan komut doğrulama ve eksik yapılandırma davranışlarını kontrol eder.
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
const env = { ...process.env };
for (const key of Object.keys(env)) if (key.startsWith('FATURAPORT_')) delete env[key];
const assembly = process.argv[2] ?? 'examples/dotnet/bin/Debug/net8.0/Faturaport.Examples.dll';
for (const [args,expected] of [
  [[], 'Komut gerekli'],
  [['unknown'], 'Bilinmeyen komut'],
  [['units'], 'FATURAPORT_COMPANY_CODE'],
  [['customer','abc'], 'VKN/TCKN'],
  [['status','bad-id','1'], 'GUID'],
  [['status','3fa85f64-5717-4562-b3fc-2c963f66afa6','3'], 'Yön 1 veya 2'],
  [['invoices','other'], 'incoming veya outgoing'],
  [['create','missing-example.json'], 'missing-example.json']
]) {
  const result = spawnSync('dotnet',[assembly,...args],{env,encoding:'utf8'});
  assert.equal(result.status,1,`Beklenen hata çıkışı: ${args.join(' ')}. ${result.stderr}`);
  assert(result.stderr.includes(expected),`${args.join(' ')}: ${result.stderr}`);
  assert.equal(result.stdout,'','Hata durumunda veri/token yazılmamalı');
}
console.log('8 çevrimdışı .NET komut/yapılandırma hata kontrolü geçti.');

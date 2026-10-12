# cURL ile ilk istek

Aşağıdaki örnek **Bash**, cURL ve `jq` gerektirir. Önce [ortam değişkenlerini](../../docs/baslangic.md) tanımlayın. JSON gövdesini `jq` ile oluşturmak özel karakterlerin doğru kodlanmasını sağlar.

```bash
set -euo pipefail
base_url="${FATURAPORT_BASE_URL:-https://devapi.faturaport.com}"
case "$base_url" in
  https://devapi.faturaport.com|https://prodapi.faturaport.com) ;;
  *) echo 'Geçersiz API adresi' >&2; exit 1 ;;
esac
token_response=$(jq -n \
  --arg company_code "${FATURAPORT_COMPANY_CODE:?Firma kodu gerekli}" \
  --arg client_id "${FATURAPORT_CLIENT_ID:?Client ID gerekli}" \
  --arg client_secret "${FATURAPORT_CLIENT_SECRET:?Client Secret gerekli}" \
  '{company_code:$company_code,client_id:$client_id,client_secret:$client_secret}' |
  curl --fail-with-body --silent --show-error --connect-timeout 10 --max-time 60 \
    -H 'Content-Type: application/json' --data-binary @- \
    "$base_url/api/Invoice/getapitoken")
token=$(printf '%s' "$token_response" | jq -er \
  'if .success == false then error("Token alınamadı") else .data.accessToken | select(type == "string" and length > 0) end')
curl --fail-with-body --silent --show-error --connect-timeout 10 --max-time 60 \
  -H "Authorization: Bearer $token" \
  "$base_url/api/Invoice/units" |
  jq -e 'if .success == false or .succeeded == false then error("İşlem başarısız") else . end'
unset token token_response
```

Tokenı ekrana yazdırmayın; shell debug (`set -x`) kullanmayın. Windows'ta PowerShell kullanıcıları [.NET örneğini](../dotnet/README.md) kullanabilir.

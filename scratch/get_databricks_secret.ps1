# Tai file secret (da ghi vao DBFS tu notebook) ve may local, qua Azure Databricks REST API
#
# DIEU KIEN TRUOC: trong Databricks, da chay 1 cell:
#   secret_value = dbutils.secrets.get(scope="gcp", key="gdrive-sa-key-json")
#   dbutils.fs.put("/tmp/gdrive-sa-key.json", secret_value, overwrite=True)
# (Databricks Secrets REST API KHONG co endpoint tra ve gia tri secret truc tiep -
#  day la gioi han bao mat co dinh cua Databricks, khong phai chuyen redaction o notebook.
#  Ghi ra file roi tai file ve la cach duy nhat hop le.)

$WorkspaceUrl = "https://adb-xxxxxxxxxxxxxxx.xx.azuredatabricks.net"  # <-- sua URL workspace cua ban
$PatToken     = "dapiXXXXXXXXXXXXXXXXXXXXXXXXXXXX"                   # <-- sua PAT token cua ban

$headers = @{ Authorization = "Bearer $PatToken" }
$dbfsPath = "/tmp/gdrive-sa-key.json"

$readUrl = "$WorkspaceUrl/api/2.0/dbfs/read?path=$dbfsPath"
$resp = Invoke-RestMethod -Uri $readUrl -Headers $headers -Method Get

# DBFS read API tra ve base64 trong field "data" (gioi han 1MB/lan doc - file JSON key nho nen du dung)
$bytes = [System.Convert]::FromBase64String($resp.data)

New-Item -ItemType Directory -Force -Path "D:\keys" | Out-Null
[System.IO.File]::WriteAllBytes("D:\keys\gdrive-sa-key.json", $bytes)

Write-Host "Da luu file JSON that vao D:\keys\gdrive-sa-key.json"

# Don dep: xoa file tam tren DBFS sau khi tai xong (khuyen nghi, tranh de lo secret tren DBFS)
$deleteUrl = "$WorkspaceUrl/api/2.0/dbfs/delete"
Invoke-RestMethod -Uri $deleteUrl -Headers $headers -Method Post -ContentType "application/json" `
    -Body (@{ path = $dbfsPath; recursive = $false } | ConvertTo-Json)
Write-Host "Da xoa file tam tren DBFS: $dbfsPath"

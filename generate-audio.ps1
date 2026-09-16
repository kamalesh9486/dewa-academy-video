$API_KEY  = "sk_0585258c676e3579dbe7cd3ebf514fb697164ada7b43afcf"
$VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"
$MODEL_ID = "eleven_multilingual_v2"
$OUT_DIR  = Join-Path $PSScriptRoot "public\audio"
New-Item -ItemType Directory -Force -Path $OUT_DIR | Out-Null

$items = Get-Content (Join-Path $PSScriptRoot "src\narration.json") -Raw | ConvertFrom-Json

foreach ($item in $items) {
    $outPath = Join-Path $OUT_DIR ("scene$($item.scene).mp3")
    Write-Host "Scene $($item.scene) ..." -ForegroundColor Cyan

    $bodyObj = @{
        text = $item.text
        model_id = $MODEL_ID
        voice_settings = @{
            stability = 0.42
            similarity_boost = 0.82
            style = 0.28
            use_speaker_boost = $true
        }
    }
    $bodyJson = $bodyObj | ConvertTo-Json -Depth 5
    $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($bodyJson)

    $params = @{
        Method  = "Post"
        Uri     = "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_ID"
        Headers = @{ "xi-api-key" = $API_KEY; "Content-Type" = "application/json"; "Accept" = "audio/mpeg" }
        Body    = $bodyBytes
        OutFile = $outPath
    }

    try {
        Invoke-RestMethod @params
        $sz = (Get-Item $outPath).Length
        Write-Host "  OK $sz bytes" -ForegroundColor Green
    } catch {
        Write-Host "  FAIL: $_" -ForegroundColor Red
        break
    }
    Start-Sleep -Milliseconds 400
}

Write-Host "Checking for duplicate clips..." -ForegroundColor Yellow
$sizes = Get-ChildItem $OUT_DIR -Filter "*.mp3" | ForEach-Object { $_.Length }
$dupes = $sizes | Group-Object | Where-Object { $_.Count -gt 1 }
if ($dupes) { Write-Host "WARNING: duplicate sizes found" -ForegroundColor Red }
else { Write-Host "All distinct. Done." -ForegroundColor Green }

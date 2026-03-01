param(
  [switch]$SkipFirmware
)

$ErrorActionPreference = "Stop"

function Run-Step {
  param(
    [string]$Name,
    [string]$Command,
    [string]$Workdir
  )
  Write-Host "`n==> $Name" -ForegroundColor Cyan
  Push-Location $Workdir
  try {
    Invoke-Expression $Command
    if ($LASTEXITCODE -ne 0) {
      throw "Step failed with exit code ${LASTEXITCODE}: $Name"
    }
  } finally {
    Pop-Location
  }
}

Run-Step "Frontend build" "cmd /c npm run build" "D:\AA_Project\OVYON_CONTROL\frontend"
Run-Step "Frontend lint" "cmd /c npm run lint" "D:\AA_Project\OVYON_CONTROL\frontend"
Run-Step "Frontend tests" "cmd /c npm run test" "D:\AA_Project\OVYON_CONTROL\frontend"
Run-Step "Backend build" "cmd /c npm run build" "D:\AA_Project\OVYON_CONTROL\backend"
Run-Step "Backend tests" "cmd /c npm run test" "D:\AA_Project\OVYON_CONTROL\backend"
Run-Step "AI voice syntax check" "python -m py_compile ai_voice\aion.py ai_voice\aion_brain.py" "D:\AA_Project\OVYON_CONTROL"

if (-not $SkipFirmware) {
  if (Get-Command arduino-cli -ErrorAction SilentlyContinue) {
    Run-Step "Firmware Door compile" "arduino-cli compile --fqbn esp32:esp32:esp32 firmware\Door" "D:\AA_Project\OVYON_CONTROL"
    Run-Step "Firmware Environment compile" "arduino-cli compile --fqbn esp32:esp32:esp32 firmware\Environment" "D:\AA_Project\OVYON_CONTROL"
    Run-Step "Firmware Lights compile" "arduino-cli compile --fqbn esp32:esp32:esp32 firmware\Lights" "D:\AA_Project\OVYON_CONTROL"
    Run-Step "Firmware Plugs compile" "arduino-cli compile --fqbn esp32:esp32:esp32 firmware\Plugs" "D:\AA_Project\OVYON_CONTROL"
    Run-Step "Firmware Window compile" "arduino-cli compile --fqbn esp32:esp32:esp32 firmware\Window" "D:\AA_Project\OVYON_CONTROL"
  } else {
    throw "arduino-cli not found. Install it or rerun with -SkipFirmware."
  }
}

Write-Host "`nAll soutenance checks passed." -ForegroundColor Green

function Ensure-Dir {
  param([string]$Path)

  if (-not (Test-Path $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-Utf8NoBom {
  param(
    [string]$Path,
    [string]$Content
  )

  $dir = Split-Path $Path -Parent

  if ($dir -and -not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

function Write-GeneratedFile {
  param(
    [string]$Path,
    [string]$Content,
    [switch]$Force
  )

  if ((Test-Path $Path) -and -not $Force) {
    Write-Host "SKIPPED $Path"
    return
  }

  if (Test-Path $Path) {
    Copy-Item $Path "$Path.bak" -Force
    Write-Host "BACKUP $Path.bak"
  }

  Write-Utf8NoBom -Path $Path -Content $Content
  Write-Host "WRITTEN $Path"
}
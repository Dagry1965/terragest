function Write-TerragestFile {
  param(
    [string]$Path,
    [string]$Content
  )

  if ([string]::IsNullOrWhiteSpace($Path)) {
    throw "Path vide dans Write-TerragestFile"
  }

  $dir = Split-Path -Path $Path -Parent

  if (
    ![string]::IsNullOrWhiteSpace($dir) `
    -and `
    !(Test-Path $dir)
  ) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }

  if (Get-Command Write-UTF8File -ErrorAction SilentlyContinue) {
    Write-UTF8File -Path $Path -Content $Content
    return
  }

  if (Get-Command Write-GeneratedFile -ErrorAction SilentlyContinue) {
    Write-GeneratedFile -Path $Path -Content $Content
    return
  }

  if (Get-Command Save-UTF8File -ErrorAction SilentlyContinue) {
    Save-UTF8File -Path $Path -Content $Content
    return
  }

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )
}
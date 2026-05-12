function Ensure-DirectoryExists(
  [string]$Path
) {

  if (!(Test-Path $Path)) {

    New-Item `
      -ItemType Directory `
      -Path $Path `
      -Force | Out-Null
  }
}

function Write-Utf8NoBomFile(
  [string]$Path,

  [string]$Content
) {

  $Directory =
    Split-Path $Path -Parent

  Ensure-DirectoryExists `
    $Directory

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host `
    "WRITTEN UTF8-NO-BOM $Path"
}

function Read-Utf8File(
  [string]$Path
) {

  return (
    [System.IO.File]::ReadAllText(
      $Path,
      [System.Text.Encoding]::UTF8
    )
  )
}
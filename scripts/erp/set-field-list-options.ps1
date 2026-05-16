param(
  [Parameter(Mandatory = $true)]
  [string]$Module,

  [Parameter(Mandatory = $true)]
  [string]$Field,

  [Parameter(Mandatory = $true)]
  [bool]$Visible,

  [Parameter(Mandatory = $true)]
  [int]$Order
)

$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$path = Join-Path `
  $root `
  "src\runtime\modules\definitions\generated\$Module.module.ts"

if (!(Test-Path $path)) {
  throw "Module file not found: $path"
}

$content = [System.IO.File]::ReadAllText($path)

$pattern = '(?s)(\{\s*key:\s*"' + [regex]::Escape($Field) + '".*?)(\n\s*\},)'

$match = [regex]::Match($content, $pattern)

if (!$match.Success) {
  throw "Field '$Field' not found in module '$Module'"
}

$fieldBlock = $match.Groups[1].Value
$fieldEnd = $match.Groups[2].Value

$listBlock = @"
        list: {
          visible: `$$($Visible.ToString().ToLower()),
          order: $Order,
        },
"@

if ($fieldBlock -match '(?s)\n\s*list:\s*\{.*?\},') {
  $fieldBlock = [regex]::Replace(
    $fieldBlock,
    '(?s)\n\s*list:\s*\{.*?\},',
    "`n$listBlock"
  )
} else {
  $fieldBlock = $fieldBlock + "`n" + $listBlock
}

$newBlock = $fieldBlock + $fieldEnd

$content = $content.Substring(0, $match.Index) +
  $newBlock +
  $content.Substring($match.Index + $match.Length)

[System.IO.File]::WriteAllText(
  $path,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "OK - list options updated"
Write-Host "Module : $Module"
Write-Host "Field  : $Field"
Write-Host "Visible: $Visible"
Write-Host "Order  : $Order"
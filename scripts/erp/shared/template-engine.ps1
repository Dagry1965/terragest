function Expand-Template {
  param(
    [string]$TemplatePath,
    [hashtable]$Tokens
  )

  if (-not (Test-Path $TemplatePath)) {
    throw "Template introuvable: $TemplatePath"
  }

  $content = [System.IO.File]::ReadAllText($TemplatePath)

  foreach ($key in $Tokens.Keys) {
    $content = $content.Replace("{{$key}}", [string]$Tokens[$key])
  }

  return $content
}
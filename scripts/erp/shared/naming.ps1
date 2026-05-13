function Convert-ToPascalCase {
  param([string]$Value)

  return (($Value -split "[-_\s]") | ForEach-Object {
    if ($_.Length -eq 0) {
      ""
    } else {
      $_.Substring(0, 1).ToUpper() + $_.Substring(1).ToLower()
    }
  }) -join ""
}

function Assert-ModuleKey {
  param([string]$ModuleKey)

  if ([string]::IsNullOrWhiteSpace($ModuleKey)) {
    throw "ModuleKey obligatoire."
  }

  if ($ModuleKey -notmatch "^[a-z0-9-]+$") {
    throw "ModuleKey invalide. Utilise uniquement minuscules, chiffres et tirets. Exemple: contrats-fonciers"
  }
}
$importLine = 'import { formatDisplayValue } from "@/core/utils/formatFirestoreDate";'

$files = Get-ChildItem ".\src" -Recurse -Include *.tsx |
Where-Object { $_.FullName -notmatch "\\.next\\|\\node_modules\\" }

foreach ($file in $files) {
  $path = $file.FullName
  $content = [System.IO.File]::ReadAllText($path)

  if ($content -notmatch "formatDisplayValue" -and $content -notmatch '"use client";') {
    continue
  }

  $hasImport = $content.Contains($importLine)
  if (-not $hasImport) {
    continue
  }

  $hasUseClient = $content -match '"use client";'

  # Supprimer tous les imports formatDisplayValue dupliqués
  $content = $content -replace 'import \{ formatDisplayValue \} from "@/core/utils/formatFirestoreDate";\s*', ''

  if ($hasUseClient) {
    # Supprimer tous les "use client" existants
    $content = $content -replace '"use client";\s*', ''

    # Remettre "use client" en toute première instruction
    $content = '"use client";' + "`r`n`r`n" + $importLine + "`r`n" + $content.TrimStart()
  }
  else {
    # Fichier serveur : import normal en haut
    $content = $importLine + "`r`n" + $content.TrimStart()
  }

  [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
  Write-Host "Nettoyé : $path"
}

Write-Host "Correction terminée."

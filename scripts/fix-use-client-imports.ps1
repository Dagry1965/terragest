$files = @(
  ".\src\features\observability\widgets\live\LiveEventStream.tsx",
  ".\src\features\observability\dashboards\LiveRuntimeDashboard.tsx",
  ".\src\app\(private)\observability\page.tsx"
)

foreach ($file in $files) {
  if (!(Test-Path $file)) { continue }

  $content = Get-Content $file -Raw

  # Supprime l'import mal placé
  $content = $content -replace 'import \{ formatDisplayValue \} from "@/core/utils/formatFirestoreDate";\r?\n', ''

  # Remet l'import après "use client"; si présent
  if ($content -match '^\s*"use client";') {
    $content = $content -replace '("use client";\r?\n)', "`$1`r`nimport { formatDisplayValue } from `"@/core/utils/formatFirestoreDate`";`r`n"
  }
  else {
    $content = 'import { formatDisplayValue } from "@/core/utils/formatFirestoreDate";' + "`r`n" + $content
  }

  Set-Content $file $content -Encoding UTF8
  Write-Host "Corrigé : $file"
}

Write-Host "Correction import/use client terminée."

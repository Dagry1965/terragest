$files = Get-ChildItem ".\src" -Recurse -Include *.tsx |
Where-Object {
  $_.FullName -notmatch "\\.next\\|\\node_modules\\"
}

$importLine = 'import { formatDisplayValue } from "@/core/utils/formatFirestoreDate";'

foreach ($file in $files) {
  $path = $file.FullName
  $content = [System.IO.File]::ReadAllText($path)

  if ($content -notmatch [regex]::Escape($importLine)) {
    continue
  }

  $content = $content -replace [regex]::Escape($importLine) + "\r?\n", ""

  if ($content -match '^\s*//[^\r\n]*\r?\n\s*"use client";') {
    $content = $content -replace '(^\s*//[^\r\n]*\r?\n\s*"use client";\r?\n)', "`$1`r`n$importLine`r`n"
  }
  elseif ($content -match '^\s*"use client";') {
    $content = $content -replace '(^\s*"use client";\r?\n)', "`$1`r`n$importLine`r`n"
  }
  else {
    $content = $importLine + "`r`n" + $content
  }

  [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
  Write-Host "Import repositionné : $path"
}

Write-Host ""
Write-Host "Terminé. Lance maintenant : pnpm build"

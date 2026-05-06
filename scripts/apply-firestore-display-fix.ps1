$helperPath = ".\src\core\utils\formatFirestoreDate.ts"

New-Item -ItemType Directory -Force -Path ".\src\core\utils" | Out-Null

@"
export function formatFirestoreDate(value: any): string {
  if (!value) return "";

  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toLocaleDateString("fr-FR");

  if (typeof value === "object" && value !== null && "seconds" in value) {
    return new Date(value.seconds * 1000).toLocaleDateString("fr-FR");
  }

  return "";
}

export function formatDisplayValue(value: any): string {
  if (value === null || value === undefined) return "";

  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "Oui" : "Non";

  if (typeof value === "object" && value !== null && "seconds" in value) {
    return formatFirestoreDate(value);
  }

  if (Array.isArray(value)) {
    return value.map(formatDisplayValue).join(", ");
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}
"@ | Set-Content $helperPath -Encoding UTF8

$files = Get-ChildItem ".\src" -Recurse -Include *.tsx |
Where-Object {
  $_.FullName -notmatch "\\.next\\|\\node_modules\\"
}

$patterns = @(
  "createdAt",
  "updatedAt",
  "deletedAt",
  "date",
  "dateCreation",
  "created_at",
  "updated_at",
  "timestamp"
)

foreach ($file in $files) {
  $path = $file.FullName
  $content = Get-Content $path -Raw
  $original = $content
  $changed = $false

  foreach ($field in $patterns) {
    $content = $content -replace "\{([a-zA-Z0-9_]+)\.$field\}", "{formatDisplayValue(`$1.$field)}"
    $content = $content -replace "\{([a-zA-Z0-9_]+)\?\.$field\}", "{formatDisplayValue(`$1?.$field)}"
    $content = $content -replace "\{([a-zA-Z0-9_]+)\[`"$field`"\]\}", "{formatDisplayValue(`$1[`"$field`"])}"
  }

  if ($content -ne $original) {
    if ($content -notmatch "formatDisplayValue") {
      continue
    }

    if ($content -notmatch "@/core/utils/formatFirestoreDate") {
      $content = 'import { formatDisplayValue } from "@/core/utils/formatFirestoreDate";' + "`r`n" + $content
    }

    Copy-Item $path "$path.bak" -Force
    Set-Content $path $content -Encoding UTF8
    Write-Host "Corrigé : $path"
  }
}

Write-Host ""
Write-Host "Correction terminée."
Write-Host "Des backups .bak ont été créés pour les fichiers modifiés."
Write-Host ""
Write-Host "Lance maintenant : pnpm build"

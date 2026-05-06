New-Item -ItemType Directory -Force -Path ".\src\core\utils" | Out-Null

@"
export function formatFirestoreDate(value: any): string {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  if (value instanceof Date) {
    return value.toLocaleDateString("fr-FR");
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "seconds" in value
  ) {
    return new Date(
      value.seconds * 1000
    ).toLocaleDateString("fr-FR");
  }

  return "";
}
"@ | Set-Content `
".\src\core\utils\formatFirestoreDate.ts" `
-Encoding UTF8

Write-Host ""
Write-Host "====================================="
Write-Host "Firestore Date Helper créé"
Write-Host "====================================="
Write-Host ""

Write-Host "Recherche des champs createdAt..."
Write-Host ""

Get-ChildItem .\src -Recurse -Include *.tsx,*.ts |
Where-Object {
    $_.FullName -notmatch "node_modules|\.next"
} |
ForEach-Object {

    $matches = Select-String `
        -Path $_.FullName `
        -Pattern "createdAt"

    if ($matches) {

        Write-Host "Fichier :" $_.FullName

        $matches | ForEach-Object {
            Write-Host " -> Ligne" $_.LineNumber ":" $_.Line.Trim()
        }

        Write-Host ""
    }
}

Write-Host ""
Write-Host "====================================="
Write-Host "UTILISATION"
Write-Host "====================================="
Write-Host ""
Write-Host 'import { formatFirestoreDate } from "@/core/utils/formatFirestoreDate";'
Write-Host ""
Write-Host '{formatFirestoreDate(item.createdAt)}'

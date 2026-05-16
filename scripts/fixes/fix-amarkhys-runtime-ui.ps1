$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"

Set-Location $Root

function Write-Utf8NoBom {
  param(
    [Parameter(Mandatory = $true)]
    [string] $Path,

    [Parameter(Mandatory = $true)]
    [string] $Content
  )

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )
}

Write-Host ""
Write-Host "=== FIX AMARKHYS RUNTIME UI ===" -ForegroundColor Cyan

$pagePath = Join-Path $Root "src\components\erp\runtime\ERPRuntimePage.tsx"
$tablePath = Join-Path $Root "src\components\erp\runtime\ERPRuntimeTable.tsx"

if (-not (Test-Path $pagePath)) {
  throw "Fichier introuvable : $pagePath"
}

if (-not (Test-Path $tablePath)) {
  throw "Fichier introuvable : $tablePath"
}

# =====================================================
# ERPRuntimePage.tsx
# =====================================================

$page = [System.IO.File]::ReadAllText($pagePath)

if ($page -notmatch "function getRuntimePageTypeLabel") {
  $helper = @(
    'function getRuntimePageTypeLabel(type: string): string {',
    '  switch (type) {',
    '    case "list":',
    '      return "liste";',
    '    case "create":',
    '      return "crÃ©ation";',
    '    case "edit":',
    '      return "modification";',
    '    case "detail":',
    '      return "fiche";',
    '    default:',
    '      return type;',
    '  }',
    '}',
    '',
    'interface ERPRuntimePageProps {'
  ) -join [Environment]::NewLine

  $page = [System.Text.RegularExpressions.Regex]::Replace(
    $page,
    'interface\s+ERPRuntimePageProps\s*\{',
    $helper
  )
}

$page = [System.Text.RegularExpressions.Regex]::Replace(
  $page,
  'const\s+resolvedTitle\s*=\s*title\s*\?\?\s*`[^`]*`\s*;',
  @(
    '  const resolvedTitle =',
    '    title ?? `${moduleLabel} â€” ${getRuntimePageTypeLabel(type)}`;'
  ) -join [Environment]::NewLine
)

$page = [System.Text.RegularExpressions.Regex]::Replace(
  $page,
  'const\s+pageTitle\s*=\s*title\s*\?\?\s*`[^`]*`\s*;',
  @(
    '  const pageTitle =',
    '    title ?? `${moduleLabel} â€” ${getRuntimePageTypeLabel(type)}`;'
  ) -join [Environment]::NewLine
)

$runtimeActionsBlock = @(
  '  const runtimeActions =',
  '    type === "detail" && record',
  '      ? RuntimeActionEngine.getAvailableActions({',
  '          actions: module?.actions ?? [],',
  '          userPermissions: ["*"],',
  '          workflow: module?.workflows?.[0],',
  '          record,',
  '        })',
  '      : [];'
) -join [Environment]::NewLine

$page = [System.Text.RegularExpressions.Regex]::Replace(
  $page,
  'const\s+runtimeActions\s*=\s*RuntimeActionEngine\.getAvailableActions\(\{[\s\S]*?\}\);',
  $runtimeActionsBlock
)

$page = $page.Replace(
  "{runtimeActions.length > 0 && (",
  '{type !== "list" && runtimeActions.length > 0 && ('
)

$page = $page.Replace(
  '{type !== "list" && type !== "list" && runtimeActions.length > 0 && (',
  '{type !== "list" && runtimeActions.length > 0 && ('
)

$page = $page.Replace("Ã¢â‚¬â€", "â€”")
$page = $page.Replace("gÃƒÂ©nÃƒÂ©rÃƒÂ©e", "gÃ©nÃ©rÃ©e")
$page = $page.Replace("connectÃƒÂ©", "connectÃ©")
$page = $page.Replace("mÃƒÂ©tier", "mÃ©tier")
$page = $page.Replace("MÃƒÂ©tier", "MÃ©tier")
$page = $page.Replace("ÃƒÂ©lÃƒÂ©ment", "Ã©lÃ©ment")
$page = $page.Replace("ÃƒÂ©lÃƒÂ©ments", "Ã©lÃ©ments")
$page = $page.Replace("CrÃƒÂ©ation", "CrÃ©ation")
$page = $page.Replace("crÃƒÂ©ation", "crÃ©ation")
$page = $page.Replace("DÃƒÂ©tails", "DÃ©tails")
$page = $page.Replace("dÃƒÂ©tail", "dÃ©tail")
$page = $page.Replace("ÃƒÂ©", "Ã©")
$page = $page.Replace("ÃƒÂ¨", "Ã¨")
$page = $page.Replace("Ãƒ ", "Ã ")
$page = $page.Replace("ÃƒÂ´", "Ã´")
$page = $page.Replace("Ã¢â€ â€™", "â†’")

Write-Utf8NoBom -Path $pagePath -Content $page

Write-Host "OK - ERPRuntimePage corrigÃ©" -ForegroundColor Green

# =====================================================
# ERPRuntimeTable.tsx
# =====================================================

$table = [System.IO.File]::ReadAllText($tablePath)

$table = $table.Replace(
  '`/${module.metadata.key}/${id}`',
  '`/${module.metadata.key}/${id}/edit`'
)

$table = $table.Replace(
  'title="Cliquer pour ouvrir la fiche"',
  'title="Cliquer pour modifier"'
)

$table = $table.Replace("Liste opÃƒÂ©rationnelle", "Liste opÃ©rationnelle")
$table = $table.Replace("DonnÃƒÂ©es mÃƒÂ©tier", "DonnÃ©es mÃ©tier")
$table = $table.Replace("SynchronisÃƒÂ©", "DonnÃ©es Ã  jour")
$table = $table.Replace("Aucune donnÃƒÂ©e", "Aucune donnÃ©e")
$table = $table.Replace("PrÃƒÂ©cÃƒÂ©dent", "PrÃ©cÃ©dent")
$table = $table.Replace("ÃƒÂ©lÃƒÂ©ments", "Ã©lÃ©ments")
$table = $table.Replace("ÃƒÂ©lÃƒÂ©ment", "Ã©lÃ©ment")
$table = $table.Replace("ÃƒÂ©", "Ã©")
$table = $table.Replace("ÃƒÂ¨", "Ã¨")
$table = $table.Replace("Ãƒ ", "Ã ")
$table = $table.Replace("Ã¢â‚¬â€", "â€”")

Write-Utf8NoBom -Path $tablePath -Content $table

Write-Host "OK - ERPRuntimeTable corrigÃ©" -ForegroundColor Green

# =====================================================
# VERIFICATIONS
# =====================================================

Write-Host ""
Write-Host "=== VERIFICATIONS ERPRuntimePage ===" -ForegroundColor Cyan

Select-String -Path $pagePath -Pattern "resolvedTitle","getRuntimePageTypeLabel","runtimeActions","type !== `"list`"","Ã¢â‚¬â€" -Context 2,4

Write-Host ""
Write-Host "=== VERIFICATIONS ERPRuntimeTable ===" -ForegroundColor Cyan

Select-String -Path $tablePath -Pattern "Liste opÃ©rationnelle","DonnÃ©es mÃ©tier","DonnÃ©es Ã  jour","/edit","Voir","Modifier","Ã¢â‚¬â€" -Context 1,2

Write-Host ""
Write-Host "=== TERMINE ===" -ForegroundColor Green
Write-Host "Lance maintenant : Remove-Item -Recurse -Force .\.next -ErrorAction SilentlyContinue ; pnpm build"
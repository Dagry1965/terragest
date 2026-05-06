
param(
    [Parameter(Mandatory = $true)]
    [string]$ModuleName
)

$Root = Resolve-Path "."
$TemplateRoot = Join-Path $Root "templates\erp-module"
$TargetRoot = Join-Path $Root "src\features\$ModuleName"

function To-PascalCase {
    param([string]$Value)

    return ($Value -split "[-_\s]" | ForEach-Object {
        $_.Substring(0,1).ToUpper() + $_.Substring(1).ToLower()
    }) -join ""
}

$ModulePascal = To-PascalCase $ModuleName
$ModuleEventPrefix = $ModuleName.ToUpper()

if (!(Test-Path $TemplateRoot)) {
    throw "Template folder not found: $TemplateRoot"
}

if (Test-Path $TargetRoot) {
    throw "Module already exists: $TargetRoot"
}

Copy-Item $TemplateRoot $TargetRoot -Recurse -Force

Get-ChildItem $TargetRoot -Recurse -File | ForEach-Object {

    $content = [System.IO.File]::ReadAllText($_.FullName)

    $content = $content `
        -replace "__MODULE_PASCAL__", $ModulePascal `
        -replace "__MODULE_EVENT_PREFIX__", $ModuleEventPrefix `
        -replace "__MODULE__", $ModuleName

    [System.IO.File]::WriteAllText($_.FullName, $content)

    $newName = $_.Name `
        -replace "__MODULE_PASCAL__", $ModulePascal `
        -replace "__MODULE_EVENT_PREFIX__", $ModuleEventPrefix `
        -replace "__MODULE__", $ModuleName

    if ($newName -ne $_.Name) {
        Rename-Item $_.FullName $newName -Force
    }
}

$RegistryPath = Join-Path $Root "src\runtime\events\RuntimeEventRegistry.ts"

$CreatedEvent = "$($ModuleEventPrefix)_CREATED"
$UpdatedEvent = "$($ModuleEventPrefix)_UPDATED"
$DeletedEvent = "$($ModuleEventPrefix)_DELETED"

$RegistryContent = [System.IO.File]::ReadAllText($RegistryPath)

if ($RegistryContent -notmatch $CreatedEvent) {

    $Insert = @"

  // ======================
  // $ModulePascal
  // ======================

  ${CreatedEvent}:
    "$CreatedEvent",

  ${UpdatedEvent}:
    "$UpdatedEvent",

  ${DeletedEvent}:
    "$DeletedEvent",

"@

    $RegistryContent =
        $RegistryContent -replace "} as const;", "$Insert} as const;"

    [System.IO.File]::WriteAllText($RegistryPath, $RegistryContent)
}

Write-Host ""
Write-Host "ERP module generated : $ModulePascal" -ForegroundColor Green
Write-Host "Path : $TargetRoot" -ForegroundColor Yellow
Write-Host ""
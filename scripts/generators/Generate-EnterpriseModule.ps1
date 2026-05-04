param(

    [string]$ModuleName,

    [string[]]$Features = @(
        "Crud",
        "Tests"
    ),

    [string]$Manifest
)

# ============================================
# LOAD SHARED HELPERS
# ============================================

$sharedPath = Resolve-Path "$PSScriptRoot\..\shared"

. "$sharedPath\naming.ps1"
. "$sharedPath\filesystem.ps1"
. "$sharedPath\template-engine.ps1"

# ============================================
# LOAD FEATURE REGISTRY
# ============================================

. "$PSScriptRoot\registry\features.ps1"

# ============================================
# LOAD MANIFEST
# ============================================

if ($Manifest) {

    if (-not (Test-Path $Manifest)) {

        throw "Manifest not found: $Manifest"
    }

    $manifestContent = Get-Content $Manifest -Raw `
        | ConvertFrom-Json

    $ModuleName = $manifestContent.module

    $Features = $manifestContent.features
}

# ============================================
# VALIDATIONS
# ============================================

if ([string]::IsNullOrWhiteSpace($ModuleName)) {

    throw "ModuleName is required"
}

foreach ($feature in $Features) {

    if (-not $FeatureRegistry.ContainsKey($feature)) {

        throw "Unknown feature: $feature"
    }
}

# ============================================
# NAMING
# ============================================

$modulePascal = Convert-ToPascalCase $ModuleName
$moduleCamel = Convert-ToCamelCase $ModuleName

$paths = Get-ModulePaths $ModuleName

# ============================================
# CREATE STRUCTURE
# ============================================

Ensure-ModuleStructure $paths.Root

# ============================================
# VARIABLES
# ============================================

$templateVariables = @{
    ModuleName = $modulePascal
    ModuleSlug = $moduleCamel
}

# ============================================
# FEATURES HELPERS
# ============================================

function Has-Feature {

    param(
        [string]$Feature
    )

    return $Features -contains $Feature
}

function Generate-IfFeature {

    param(
        [string]$Feature,
        [scriptblock]$Action
    )

    if (Has-Feature $Feature) {

        Write-Host "[FEATURE] $Feature" -ForegroundColor Cyan

        & $Action
    }
}

# ============================================
# CORE
# ============================================

Write-Host ""
Write-Host "[CORE] Generating core module..." -ForegroundColor Yellow

# DTO

$dtoContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/dto.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.DTO)/$($modulePascal)DTO.ts" `
    -Content $dtoContent `
    -Force

# SCHEMA

$schemaContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/schema.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Root)/schemas/$($modulePascal).schema.ts" `
    -Content $schemaContent `
    -Force

# REPOSITORY

$repositoryContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/repository.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Repositories)/$($modulePascal)Repository.ts" `
    -Content $repositoryContent `
    -Force

# SERVICE

$serviceContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/service.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Services)/$($modulePascal)Service.ts" `
    -Content $serviceContent `
    -Force

# INDEX

$indexContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/index.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Root)/index.ts" `
    -Content $indexContent `
    -Force

# ============================================
# CRUD
# ============================================

Generate-IfFeature "Crud" {

    # QUERY HOOK

    $queryHookContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/query-hook.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Hooks)/use$($modulePascal).ts" `
        -Content $queryHookContent `
        -Force

    # CREATE MUTATION

    $createMutationContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/create-mutation.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Hooks)/useCreate$($modulePascal).ts" `
        -Content $createMutationContent `
        -Force

    # UPDATE MUTATION

    $updateMutationContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/update-mutation.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Hooks)/useUpdate$($modulePascal).ts" `
        -Content $updateMutationContent `
        -Force

    # DELETE MUTATION

    $deleteMutationContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/delete-mutation.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Hooks)/useDelete$($modulePascal).ts" `
        -Content $deleteMutationContent `
        -Force

    # FILTERS

    $filtersContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/filters.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Components)/$($modulePascal)Filters.tsx" `
        -Content $filtersContent `
        -Force

    # PAGINATION

    $paginationContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/pagination.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Components)/$($modulePascal)Pagination.tsx" `
        -Content $paginationContent `
        -Force

    # SORTING

    $sortingContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/sorting.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Components)/$($modulePascal)Sorting.tsx" `
        -Content $sortingContent `
        -Force

    # BULK ACTIONS

    $bulkActionsContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/bulk-actions.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Components)/$($modulePascal)BulkActions.tsx" `
        -Content $bulkActionsContent `
        -Force

    # EXPORT ACTIONS

    $exportActionsContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/export-actions.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Components)/$($modulePascal)ExportActions.tsx" `
        -Content $exportActionsContent `
        -Force

    # PAGES

    $listPageContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/list-page.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Pages)/page.tsx" `
        -Content $listPageContent `
        -Force

    $newPageContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/new-page.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Pages)/nouveau/page.tsx" `
        -Content $newPageContent `
        -Force

    $detailsPageContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/details-page.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Pages)/[id]/page.tsx" `
        -Content $detailsPageContent `
        -Force

    $editPageContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/edit-page.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Pages)/[id]/edit/page.tsx" `
        -Content $editPageContent `
        -Force

    # FORM

    $formContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/form.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Components)/$($modulePascal)Form.tsx" `
        -Content $formContent `
        -Force

    # TABLE

    $tableContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/table.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Components)/$($modulePascal)Table.tsx" `
        -Content $tableContent `
        -Force
}

# ============================================
# TESTS
# ============================================

Generate-IfFeature "Tests" {

    $testContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/test.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Tests)/$($modulePascal)Service.test.ts" `
        -Content $testContent `
        -Force
}

# ============================================
# REALTIME
# ============================================

Generate-IfFeature "Realtime" {

    $realtimeWidgetContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/realtime-widget.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Components)/$($modulePascal)RealtimeWidget.tsx" `
        -Content $realtimeWidgetContent `
        -Force

    $realtimeListenerContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/realtime-listener.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Services)/subscribeTo$($modulePascal).ts" `
        -Content $realtimeListenerContent `
        -Force
}

# ============================================
# OFFLINE
# ============================================

Generate-IfFeature "Offline" {

    $offlineQueueContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/offline-queue.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Services)/offlineQueue.ts" `
        -Content $offlineQueueContent `
        -Force
}

# ============================================
# DASHBOARD
# ============================================

Generate-IfFeature "Dashboard" {

    $dashboardCardContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/dashboard-card.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Components)/$($modulePascal)DashboardCard.tsx" `
        -Content $dashboardCardContent `
        -Force

    $chartWidgetContent = Render-Template `
        -TemplatePath "$PSScriptRoot/../templates/chart-widget.template.txt" `
        -Variables $templateVariables

    Write-GeneratedFile `
        -Path "$($paths.Components)/$($modulePascal)ChartWidget.tsx" `
        -Content $chartWidgetContent `
        -Force
}

# ============================================
# DONE
# ============================================

Write-Host ""
Write-Host "[OK] Enterprise module generated: $modulePascal" -ForegroundColor Green
Write-Host ""
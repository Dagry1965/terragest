param(
    [Parameter(Mandatory = $true)]
    [string]$ModuleName
)

# ============================================
# LOAD SHARED HELPERS
# ============================================

$sharedPath = Resolve-Path "$PSScriptRoot\..\shared"

. "$sharedPath\naming.ps1"
. "$sharedPath\filesystem.ps1"
. "$sharedPath\template-engine.ps1"

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
# DTO
# ============================================

$dtoContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/dto.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.DTO)/$($modulePascal)DTO.ts" `
    -Content $dtoContent `
    -Force

# ============================================
# SCHEMA
# ============================================

$schemaContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/schema.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Root)/schemas/$($modulePascal).schema.ts" `
    -Content $schemaContent `
    -Force
# ============================================
# REPOSITORY
# ============================================

$repositoryContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/repository.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Repositories)/$($modulePascal)Repository.ts" `
    -Content $repositoryContent `
    -Force

# ============================================
# SERVICE
# ============================================

$serviceContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/service.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Services)/$($modulePascal)Service.ts" `
    -Content $serviceContent `
    -Force
# ============================================
# QUERY HOOK
# ============================================

$queryHookContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/query-hook.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Hooks)/use$($modulePascal).ts" `
    -Content $queryHookContent `
    -Force


# ============================================
# CREATE MUTATION
# ============================================

$createMutationContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/create-mutation.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Hooks)/useCreate$($modulePascal).ts" `
    -Content $createMutationContent `
    -Force

# ============================================
# UPDATE MUTATION
# ============================================

$updateMutationContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/update-mutation.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Hooks)/useUpdate$($modulePascal).ts" `
    -Content $updateMutationContent `
    -Force

# ============================================
# DELETE MUTATION
# ============================================

$deleteMutationContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/delete-mutation.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Hooks)/useDelete$($modulePascal).ts" `
    -Content $deleteMutationContent `
    -Force

# ============================================
# TEST
# ============================================

$testContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/test.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Tests)/$($modulePascal)Service.test.ts" `
    -Content $testContent `
    -Force

# ============================================
# INDEX
# ============================================

$indexContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/index.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Root)/index.ts" `
    -Content $indexContent `
    -Force

# ============================================
# CRUD PAGES
# ============================================

# LIST PAGE

$listPageContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/list-page.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Pages)/page.tsx" `
    -Content $listPageContent `
    -Force

# NEW PAGE

$newPageContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/new-page.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Pages)/nouveau/page.tsx" `
    -Content $newPageContent `
    -Force

# DETAILS PAGE

$detailsPageContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/details-page.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Pages)/[id]/page.tsx" `
    -Content $detailsPageContent `
    -Force

# EDIT PAGE

$editPageContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/edit-page.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Pages)/[id]/edit/page.tsx" `
    -Content $editPageContent `
    -Force



# ============================================
# FORM
# ============================================

$formContent = Render-Template `
    -TemplatePath "$PSScriptRoot/../templates/form.template.txt" `
    -Variables $templateVariables

Write-GeneratedFile `
    -Path "$($paths.Components)/$($modulePascal)Form.tsx" `
    -Content $formContent `
    -Force

# ============================================
# DONE
# ============================================

Write-Host ""
Write-Host "[OK] Enterprise module generated: $modulePascal"
Write-Host ""

function Convert-ToPascalCase {
    param([string]$Value)

    return ($Value -split '[-_\s]' | ForEach-Object {
        if ($_.Length -gt 0) {
            $_.Substring(0,1).ToUpper() + $_.Substring(1).ToLower()
        }
    }) -join ''
}

function Convert-ToCamelCase {
    param([string]$Value)

    $pascal = Convert-ToPascalCase $Value

    if ($pascal.Length -eq 0) {
        return ""
    }

    return $pascal.Substring(0,1).ToLower() + $pascal.Substring(1)
}

function Convert-ToKebabCase {
    param([string]$Value)

    return $Value.ToLower()
}

function Get-ModulePaths {
    param([string]$ModuleName)

    $module = Convert-ToKebabCase $ModuleName

    return @{
        Root = "src/modules/$module"
        DTO = "src/modules/$module/dto"
        Repositories = "src/modules/$module/repositories"
        Services = "src/modules/$module/services"
        Components = "src/modules/$module/components"
        Hooks = "src/modules/$module/hooks"
        Pages = "src/modules/$module/pages"
        Tests = "src/modules/$module/tests"
    }
}
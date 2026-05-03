function Ensure-DirectoryExists {
    param(
        [string]$Path
    )

    if (-not (Test-Path $Path)) {
        New-Item -ItemType Directory -Force -Path $Path | Out-Null
        Write-Host "[DIR] Created directory: $Path"
    }
}

function Ensure-FileExists {
    param(
        [string]$Path
    )

    if (-not (Test-Path $Path)) {
        New-Item -ItemType File -Force -Path $Path | Out-Null
        Write-Host "[FILE] Created file: $Path"
    }
}

function Write-GeneratedFile {
    param(
        [string]$Path,
        [string]$Content,
        [switch]$Force
    )

    $directory = Split-Path $Path

    Ensure-DirectoryExists $directory

    if ((Test-Path $Path) -and (-not $Force)) {
        Write-Host "[WARN] File already exists: $Path"
        return
    }

    $content | Out-File -LiteralPath $Path -Encoding utf8

    Write-Host "[OK] Generated: $Path"
}

function Ensure-ModuleStructure {
    param(
        [string]$ModuleRoot
    )

    $directories = @(
        "$ModuleRoot/dto",
        "$ModuleRoot/repositories",
        "$ModuleRoot/services",
        "$ModuleRoot/hooks",
        "$ModuleRoot/components",
        "$ModuleRoot/pages",
        "$ModuleRoot/tests",
        "$ModuleRoot/schemas",
        "$ModuleRoot/validators",
        "$ModuleRoot/permissions",
        "$ModuleRoot/workflows"
    )

    foreach ($dir in $directories) {
        Ensure-DirectoryExists $dir
    }
}
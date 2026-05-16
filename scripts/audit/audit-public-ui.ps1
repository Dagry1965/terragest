$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$Report = Join-Path $Root "PUBLIC_UI_AUDIT.txt"

if (Test-Path $Report) {
    Remove-Item $Report -Force
}

function Add-Line {
    param([string]$Text = "")
    Add-Content `
        -Path $Report `
        -Value $Text `
        -Encoding UTF8
}

Add-Line "===================================="
Add-Line "AMARKHYS PUBLIC UI AUDIT"
Add-Line "===================================="
Add-Line ""

$patterns = @(
    "Hero",
    "Landing",
    "Navbar",
    "Footer",
    "Marketing",
    "PageHeader",
    "ERPCard",
    "ERPButton",
    "ERPSection",
    "Dashboard",
    "EmptyState",
    "ERPPage"
)

foreach ($pattern in $patterns) {

    Add-Line ""
    Add-Line "PATTERN: $pattern"

    $matches =
        Select-String `
        -Path "$Root\src\**\*.tsx" `
        -Pattern $pattern `
        -ErrorAction SilentlyContinue

    if (!$matches) {

        Add-Line "NONE"

    }
    else {

        foreach (
            $m in
            $matches |
            Select-Object -First 20
        ) {

            Add-Line (
                $m.Path +
                ":" +
                $m.LineNumber +
                " " +
                $m.Line.Trim()
            )

        }

    }

}

Add-Line ""
Add-Line "===================================="
Add-Line "APP ROUTES"
Add-Line "===================================="

Get-ChildItem `
"$Root\src\app" `
-Recurse `
-Filter "page.tsx" |

ForEach-Object {

    Add-Line $_.FullName

}

Write-Host ""
Write-Host "OK"
Write-Host $Report
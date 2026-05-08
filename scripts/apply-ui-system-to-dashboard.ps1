Set-Location "C:\Users\Admin\terragest"

$dashboard =
".\src\app\(private)\dashboard\page.tsx"

$content =
Get-Content $dashboard -Raw

$content =
$content.Replace(
'import { ERPWidgetCard }
from "@/components/erp/page/ERPWidgetCard";',
'import { ERPWidgetCard }
from "@/components/erp/page/ERPWidgetCard";

import { ERPCard }
from "@/components/erp/ui";'
)

$content =
$content.Replace(
'<ERPWidgetCard title="Santé système ERP">',
'<ERPCard title="Santé système ERP" premium>'
)

$content =
$content.Replace(
'</ERPWidgetCard>',
'</ERPCard>'
)

Set-Content `
$dashboard `
$content `
-Encoding UTF8

Write-Host ""
Write-Host "Dashboard premium UI applied."
Write-Host ""
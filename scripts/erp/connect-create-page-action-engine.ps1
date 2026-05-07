Write-Host "=== TERRAGEST_V2 - CONNECT CREATE PAGE TO ERP ACTION ENGINE ===" -ForegroundColor Cyan

$file = "src/components/erp/generic/GenericCreatePage.tsx"

$content = Get-Content $file -Raw

$content = $content -replace 'import \{ getModuleByKey \} from "@\/core\/modules\/module-registry";',
'import { getModuleByKey } from "@/core/modules/module-registry";
import { executeERPAction } from "@/core/actions/erp-action-engine";'

$content = $content -replace 'console\.log\("ERP CREATE", \{
\s+module: moduleKey,
\s+data: formData,
\s+\}\);

\s+alert\(
\s+`Création \$\{module\?\.label \?\? moduleKey\} simulée`
\s+\);',
'executeERPAction({
      module: moduleKey,
      action: "create",
      data: formData,
    });

    alert(
      `Action ERP exécutée : ${module?.label ?? moduleKey}`
    );'

Set-Content $file $content

Write-Host "=== CREATE PAGE connectée au ERP ACTION ENGINE ===" -ForegroundColor Green
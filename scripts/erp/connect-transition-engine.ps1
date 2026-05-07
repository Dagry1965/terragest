Write-Host "=== TERRAGEST_V2 - CONNECT TRANSITION ENGINE ===" -ForegroundColor Cyan

$file = "src/components/erp/generic/GenericEditPage.tsx"

$content = Get-Content $file -Raw

$content = $content -replace 'import \{ executeERPAction \} from "@\/core\/actions\/erp-action-engine";',
'import { executeERPAction } from "@/core/actions/erp-action-engine";
import { executeTransition } from "@/core/transitions/transition-engine";'

$content = $content -replace 'await executeERPAction\(\{
\s+module: moduleKey,
\s+action: "update",
\s+data: \{
\s+id,
\s+\.\.\.formData,
\s+\},
\s+\}\);',
'const currentData =
      mockData[moduleKey];

    const currentStatus =
      currentData?.status ||
      currentData?.etat;

    const nextStatus =
      formData?.status ||
      formData?.etat;

    if (
      currentStatus &&
      nextStatus &&
      currentStatus !== nextStatus
    ) {
      const transition =
        await executeTransition({
          module: moduleKey,
          from: currentStatus,
          to: nextStatus,
          entityId: id,
        });

      if (!transition.allowed) {
        alert(
          transition.reason
        );

        return;
      }
    }

    await executeERPAction({
      module: moduleKey,
      action: "update",
      data: {
        id,
        ...formData,
      },
    });'

Set-Content $file $content

Write-Host "=== TRANSITION ENGINE connecté au GenericEditPage ===" -ForegroundColor Green
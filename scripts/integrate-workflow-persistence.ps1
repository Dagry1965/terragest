$maintenancePage =
".\src\app\(private)\maintenance\page.tsx"

$content =
Get-Content `
$maintenancePage `
-Raw

if (
  $content -notmatch
  "WorkflowRuntimeService"
) {

  $content =
    $content.Replace(

'import { ERPWorkflowActions } from "@/runtime/workflow-ui/ERPWorkflowActions";',

'import { ERPWorkflowActions } from "@/runtime/workflow-ui/ERPWorkflowActions";
import { WorkflowRuntimeService } from "@/runtime/workflow-persistence/WorkflowRuntimeService";'
    )

  $content =
    $content.Replace(

'console.log(
              "Workflow Action:",
              action
            );

            console.log(
              "Next State:",
              targetState
            );',

'await WorkflowRuntimeService.executeTransition({

              module:
                "maintenance",

              entityId:
                "maintenance-demo",

              fromState:
                "ouverte",

              toState:
                targetState,

              action,

              user:
                "superviseur-demo",
            });

            console.log(
              "Workflow persisted"
            );'
    )

  Set-Content `
  $maintenancePage `
  $content `
  -Encoding UTF8

  Write-Host ""
  Write-Host "Workflow persistence intégré"
  Write-Host ""

} else {

  Write-Host ""
  Write-Host "Workflow persistence déjà intégré"
  Write-Host ""
}

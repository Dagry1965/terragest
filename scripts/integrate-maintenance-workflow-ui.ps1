$maintenancePage =
".\src\app\(private)\maintenance\page.tsx"

$content =
Get-Content `
$maintenancePage `
-Raw

if (
  $content -notmatch
  "ERPWorkflowActions"
) {

  $content =
    $content.Replace(

'import { ERPDynamicForm } from "@/components/erp/forms/ERPDynamicForm";',

'import { ERPDynamicForm } from "@/components/erp/forms/ERPDynamicForm";
import { ERPWorkflowActions } from "@/runtime/workflow-ui/ERPWorkflowActions";'
    )

  $workflowBlock = @"

      <div
        className="
          rounded-2xl
          bg-white
          p-6
          shadow-md
        "
      >

        <h2
          className="
            mb-4
            text-xl
            font-semibold
          "
        >
          Actions Workflow
        </h2>

        <ERPWorkflowActions
          module="maintenance"
          state="ouverte"
          role="superviseur"

          onAction={(
            action,
            targetState
          ) => {

            console.log(
              "Workflow Action:",
              action
            );

            console.log(
              "Next State:",
              targetState
            );
          }}
        />

      </div>

"@

  $content =
    $content.Replace(

'<div className="rounded-2xl bg-white p-6 shadow-md">',
"$workflowBlock
      <div className=`"rounded-2xl bg-white p-6 shadow-md`">"
    )

  Set-Content `
  $maintenancePage `
  $content `
  -Encoding UTF8

  Write-Host ""
  Write-Host "Workflow Runtime UI ajouté à maintenance"
  Write-Host ""

} else {

  Write-Host ""
  Write-Host "Workflow déjà intégré"
  Write-Host ""
}

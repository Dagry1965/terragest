$layoutFile =
"C:\Users\Admin\terragest\src\app\(private)\layout.tsx"

$content =
[System.IO.File]::ReadAllText(
  $layoutFile
)

if (
  $content -notmatch
  "RuntimeSchedulerBootstrap"
) {

  $content =
    $content.Replace(

'import { AppShell } from "@/core/layout/AppShell";',

'import { AppShell } from "@/core/layout/AppShell";
import { RuntimeSchedulerBootstrap } from "@/runtime/scheduler/RuntimeSchedulerBootstrap";'
    )

  $content =
    $content.Replace(

'<AppShell>',

'<>
  <RuntimeSchedulerBootstrap />

  <AppShell>'
    )

  $content =
    $content.Replace(

'</AppShell>',

'</AppShell>
</>'
    )

  [System.IO.File]::WriteAllText(

    $layoutFile,

    $content,

    [System.Text.Encoding]::UTF8
  )

  Write-Host ""
  Write-Host "Runtime Scheduler intégré au layout ERP."
  Write-Host ""

} else {

  Write-Host ""
  Write-Host "Scheduler déjà intégré."
  Write-Host ""
}

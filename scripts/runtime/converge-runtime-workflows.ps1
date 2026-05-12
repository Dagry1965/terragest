$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$adapterFile = Join-Path $root "src\runtime\modules\adapters\CoreModuleRuntimeAdapter.ts"
$workflowRegistryFile = Join-Path $root "src\runtime\core\RuntimeWorkflowRegistry.ts"

if (!(Test-Path $adapterFile)) {
  throw "Adapter introuvable: $adapterFile"
}

if (!(Test-Path $workflowRegistryFile)) {
  throw "RuntimeWorkflowRegistry introuvable: $workflowRegistryFile"
}

Copy-Item $adapterFile "$adapterFile.bak" -Force
Copy-Item $workflowRegistryFile "$workflowRegistryFile.bak" -Force

$adapterContent = Get-Content $adapterFile -Raw

if ($adapterContent -notmatch "toRuntimeWorkflows") {
  $method = @'

  static toRuntimeWorkflows() {
    return Object.fromEntries(
      coreERPModules.map((module) => [
        module.metadata.key,
        module.workflows?.map(
          (workflow) => workflow.key
        ) ?? [],
      ])
    );
  }
'@

  $adapterContent = $adapterContent -replace '\n}\s*$', "$method`r`n}"
}

[System.IO.File]::WriteAllText(
  $adapterFile,
  $adapterContent,
  [System.Text.UTF8Encoding]::new($false)
)

$workflowRegistryContent = @'
import {
  CoreModuleRuntimeAdapter,
} from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";

export class RuntimeWorkflowRegistry {
  private workflows =
    new Map<
      string,
      string[]
    >();

  initialize() {
    for (
      const [moduleId, workflows]
      of Object.entries(
        CoreModuleRuntimeAdapter.toRuntimeWorkflows()
      )
    ) {
      this.workflows.set(
        moduleId,
        workflows
      );
    }
  }

  getModuleWorkflows(
    moduleId: string
  ) {
    return this.workflows.get(
      moduleId
    ) ?? [];
  }

  getAllWorkflows() {
    return Array.from(
      this.workflows.entries()
    );
  }
}

export const runtimeWorkflowRegistry =
  new RuntimeWorkflowRegistry();

runtimeWorkflowRegistry.initialize();
'@

[System.IO.File]::WriteAllText(
  $workflowRegistryFile,
  $workflowRegistryContent,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "OK - CoreModuleRuntimeAdapter enrichi avec toRuntimeWorkflows"
Write-Host "OK - RuntimeWorkflowRegistry converge vers coreERPModules"
Write-Host "Backups créés:"
Write-Host " - $adapterFile.bak"
Write-Host " - $workflowRegistryFile.bak"
Write-Host ""
Write-Host "Lance maintenant: pnpm build"
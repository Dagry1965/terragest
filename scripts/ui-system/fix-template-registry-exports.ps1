$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

function Write-Utf8 {
  param(
    [string]$Path,
    [string]$Content
  )

  $FullPath = Join-Path $ProjectRoot $Path
  $Dir = Split-Path $FullPath -Parent

  if (!(Test-Path -LiteralPath $Dir)) {
    New-Item -ItemType Directory -Path $Dir -Force | Out-Null
  }

  $Utf8 = [System.Text.UTF8Encoding]::new($false)
  [System.IO.File]::WriteAllText($FullPath, $Content, $Utf8)

  Write-Host "WRITTEN: $Path" -ForegroundColor Green
}

Write-Utf8 "src\components\erp\templates\ERPPageTemplateRegistry.tsx" @'
import type { ERPModule } from "@/runtime/modules";

import { ERPModuleActionPageTemplate } from "./ERPModuleActionPageTemplate";

export type ERPPageTemplateType =
  | "list"
  | "detail"
  | "create"
  | "edit"
  | "audit"
  | "import"
  | "export"
  | "relations"
  | "workflows";

type ERPTemplateProps = {
  module?: ERPModule;
  type?: ERPPageTemplateType | string;
};

function GenericERPTemplate({
  module,
  type,
}: ERPTemplateProps) {
  return (
    <ERPModuleActionPageTemplate
      module={module}
      type={type}
    />
  );
}

export const ERPPageTemplateRegistry: Record<
  string,
  (props: ERPTemplateProps) => JSX.Element
> = {
  list: GenericERPTemplate,
  detail: GenericERPTemplate,
  create: GenericERPTemplate,
  edit: GenericERPTemplate,
  audit: GenericERPTemplate,
  import: GenericERPTemplate,
  export: GenericERPTemplate,
  relations: GenericERPTemplate,
  workflows: GenericERPTemplate,
};
'@

Write-Utf8 "src\components\erp\templates\index.ts" @'
export * from "./ERPModuleActionPageTemplate";
export * from "./ERPPageTemplateRegistry";
'@

Write-Host ""
Write-Host "Template registry corrige." -ForegroundColor Green
Write-Host "Relance : pnpm build" -ForegroundColor Yellow
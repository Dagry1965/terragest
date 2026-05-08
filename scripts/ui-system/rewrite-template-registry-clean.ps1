$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

$Path = "src\components\erp\templates\ERPPageTemplateRegistry.tsx"
$FullPath = Join-Path $ProjectRoot $Path

$Content = @'
import type { ReactNode } from "react";
import type { ERPModule } from "@/runtime/modules";

import { ERPModuleActionPageTemplate } from "./ERPModuleActionPageTemplate";

export type ERPPageTemplateType =
  | "list"
  | "detail"
  | "details"
  | "create"
  | "edit"
  | "audit"
  | "import"
  | "export"
  | "relations"
  | "workflows";

export type ERPTemplateProps = {
  module?: ERPModule;
  type?: ERPPageTemplateType | string;
  data?: unknown;
  record?: unknown;
};

function GenericERPTemplate({
  module,
  type,
}: ERPTemplateProps): ReactNode {
  return (
    <ERPModuleActionPageTemplate
      module={module}
      type={type}
    />
  );
}

export const ERPPageTemplateRegistry: Record<
  string,
  (props: ERPTemplateProps) => ReactNode
> = {
  list: GenericERPTemplate,
  detail: GenericERPTemplate,
  details: GenericERPTemplate,
  create: GenericERPTemplate,
  edit: GenericERPTemplate,
  audit: GenericERPTemplate,
  import: GenericERPTemplate,
  export: GenericERPTemplate,
  relations: GenericERPTemplate,
  workflows: GenericERPTemplate,
};
'@

[System.IO.File]::WriteAllText(
  $FullPath,
  $Content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "Registry corrige avec data/record : $Path" -ForegroundColor Green
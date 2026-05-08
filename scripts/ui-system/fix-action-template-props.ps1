$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

$Path = "src\components\erp\templates\ERPModuleActionPageTemplate.tsx"
$FullPath = Join-Path $ProjectRoot $Path

$Content = @'
import {
  ERPPageHeader,
  ERPSection,
  ERPEmptyState,
} from "@/components/erp/ui";

type ERPModuleActionPageTemplateProps = {
  module?: unknown;
  type?: string;
  moduleLabel?: string;
  moduleName?: string;
  actionLabel?: string;
  title?: string;
  description?: string;
};

function getModuleValue(
  module: unknown,
  key: string
): string | undefined {
  if (!module || typeof module !== "object") {
    return undefined;
  }

  const value = (module as Record<string, unknown>)[key];

  if (typeof value === "string") {
    return value;
  }

  return undefined;
}

function formatActionType(type?: string) {
  switch (type) {
    case "audit":
      return "Audit";
    case "import":
      return "Import";
    case "export":
      return "Export";
    case "relations":
      return "Relations";
    case "workflows":
      return "Workflows";
    default:
      return "Action ERP";
  }
}

export function ERPModuleActionPageTemplate({
  module,
  type,
  moduleLabel,
  moduleName,
  actionLabel,
  title,
  description,
}: ERPModuleActionPageTemplateProps) {
  const resolvedModule =
    moduleLabel ??
    moduleName ??
    getModuleValue(module, "label") ??
    getModuleValue(module, "name") ??
    getModuleValue(module, "title") ??
    getModuleValue(module, "id") ??
    "Module ERP";

  const resolvedAction =
    actionLabel ??
    title ??
    formatActionType(type);

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow={resolvedModule}
        title={resolvedAction}
        description={
          description ??
          getModuleValue(module, "description") ??
          "Page action raccordee au template ERP enterprise centralise."
        }
      />

      <ERPSection>
        <ERPEmptyState
          title={`${resolvedAction} pret`}
          description="Cette page utilise maintenant le template ERP central."
        />
      </ERPSection>
    </div>
  );
}
'@

$Utf8 = [System.Text.UTF8Encoding]::new($false)
[System.IO.File]::WriteAllText($FullPath, $Content, $Utf8)

Write-Host "Template corrige avec module unknown : $Path" -ForegroundColor Green
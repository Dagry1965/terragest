$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

function WriteFile {
  param([string]$Path, [string]$Content)

  $fullPath = Join-Path $projectRoot $Path
  $dir = Split-Path $fullPath
  New-Item -ItemType Directory -Force $dir | Out-Null

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($fullPath, $Content, $utf8NoBom)

  Write-Host "OK $fullPath" -ForegroundColor Green
}

WriteFile "src\runtime\actions\ERPActionResolver.ts" @'
import type { ERPModule } from "@/runtime/modules";
import type { ERPAction } from "./ERPAction";

export class ERPActionResolver {
  static resolve(module: ERPModule): ERPAction[] {
    const routes = module.metadata.routes ?? {};
    const basePath = routes.list ?? `/${module.metadata.key}`;

    const actions: ERPAction[] = [
      {
        key: "create",
        label: "Nouveau",
        href: routes.create ?? `${basePath}/nouveau`,
        variant: "primary",
      },
      {
        key: "export",
        label: "Exporter",
        href: `${basePath}/export`,
        variant: "secondary",
      },
      {
        key: "import",
        label: "Importer",
        href: `${basePath}/import`,
        variant: "ghost",
      },
      {
        key: "workflow",
        label: "Workflow",
        href: `${basePath}/workflows`,
        variant: "ghost",
        visible: module.metadata.features?.workflows === true,
      },
      {
        key: "audit",
        label: "Audit",
        href: `${basePath}/audit`,
        variant: "ghost",
        visible: module.metadata.features?.audit === true,
      },
      {
        key: "relations",
        label: "Relations",
        href: `${basePath}/relations`,
        variant: "ghost",
      },
    ];

    return actions.filter((action) => action.visible !== false);
  }

  static resolveRowActions(module: ERPModule, id?: string): ERPAction[] {
    const basePath = module.metadata.routes?.list ?? `/${module.metadata.key}`;

    const actions: ERPAction[] = [
      {
        key: "details",
        label: "Ouvrir",
        href: id ? `${basePath}/${id}` : basePath,
        variant: "ghost",
      },
      {
        key: "edit",
        label: "Modifier",
        href: id ? `${basePath}/${id}/edit` : basePath,
        variant: "secondary",
      },
    ];

    return actions;
  }
}
'@

WriteFile "src\components\erp\templates\ERPModuleActionPageTemplate.tsx" @'
import Link from "next/link";
import { ERPBadge, ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";

interface ERPModuleActionPageTemplateProps {
  module: ERPModule;
  type: "workflows" | "audit" | "relations" | "import" | "export";
}

const labels = {
  workflows: {
    title: "Workflows",
    description: "Pilotage des processus metier et validations du module.",
  },
  audit: {
    title: "Audit",
    description: "Historique discret des actions et modifications du module.",
  },
  relations: {
    title: "Relations",
    description: "Vue des dependances et liens avec les autres objets metier.",
  },
  import: {
    title: "Import",
    description: "Preparation de l'import des donnees du module.",
  },
  export: {
    title: "Export",
    description: "Preparation de l'export des donnees du module.",
  },
};

export function ERPModuleActionPageTemplate({
  module,
  type,
}: ERPModuleActionPageTemplateProps) {
  const config = labels[type];
  const backHref = module.metadata.routes?.list ?? `/${module.metadata.key}`;

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-8 py-8 text-white">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <ERPBadge tone="info">{module.metadata.label}</ERPBadge>
                <ERPBadge tone="success">{config.title}</ERPBadge>
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight">
                {config.title} - {module.metadata.label}
              </h1>

              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
                {config.description}
              </p>
            </div>

            <Link href={backHref}>
              <ERPButton variant="secondary" type="button">
                Retour au module
              </ERPButton>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">
            Espace {config.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Cette page est branchee par le systeme central d'actions ERP. Elle
            servira de point d'entree pour connecter les traitements reels :
            workflows, audit, relations, imports ou exports.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              "Action centralisee",
              "Controle des permissions",
              "Journalisation audit",
              "Connexion runtime",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
              >
                <h3 className="font-bold text-slate-900">{item}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Connectable au moteur ERP central.
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">
            Prochaine connexion
          </h2>

          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <p>1. Brancher les donnees reelles</p>
            <p>2. Appliquer les permissions</p>
            <p>3. Declencher les workflows</p>
            <p>4. Tracer dans l'audit</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
'@

WriteFile "src\components\erp\templates\index.ts" @'
export { ERPModuleActivityPanel } from "./ERPModuleActivityPanel";
export { ERPModuleWorkflowPanel } from "./ERPModuleWorkflowPanel";
export { ERPModuleKpiGrid } from "./ERPModuleKpiGrid";
export { ERPModuleTabs } from "./ERPModuleTabs";
export { ERPModuleToolbar } from "./ERPModuleToolbar";
export { ERPModuleHeader } from "./ERPModuleHeader";
export { ERPModuleListTemplate } from "./ERPModuleListTemplate";
export { ERPModuleDashboardTemplate } from "./ERPModuleDashboardTemplate";
export { ERPModuleActionPageTemplate } from "./ERPModuleActionPageTemplate";
export { ERPPageTemplateRegistry } from "./ERPPageTemplateRegistry";
export type { ERPPageTemplateType } from "./ERPPageTemplateRegistry";
'@

$modules = @("exploitations", "materiels", "terrains", "stocks", "produits")
$actionPages = @("workflows", "audit", "relations", "import", "export")

foreach ($module in $modules) {
  foreach ($action in $actionPages) {
    $pagePath = "src\app\(private)\$module\$action\page.tsx"

    $content = @"
import { coreERPModules } from "@/runtime/modules";
import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function Page() {
  const runtimeModule = coreERPModules.find(
    (module) => module.metadata.key === "$module"
  );

  if (!runtimeModule) {
    return null;
  }

  return (
    <ERPModuleActionPageTemplate
      module={runtimeModule}
      type="$action"
    />
  );
}
"@

    WriteFile $pagePath $content
  }
}

Set-Location $projectRoot
pnpm build

Write-Host ""
Write-Host "=== ERP ACTION ROUTING PAGES TERMINE ===" -ForegroundColor Green
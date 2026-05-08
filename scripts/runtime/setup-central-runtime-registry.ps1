$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location -LiteralPath $ProjectRoot

function Ensure-Dir($Path) {

  if (!(Test-Path -LiteralPath $Path)) {

    New-Item `
      -ItemType Directory `
      -Path $Path `
      -Force | Out-Null
  }
}

function Write-Utf8($Path, $Content) {

  $FullPath =
    Join-Path $ProjectRoot $Path

  $Dir =
    Split-Path $FullPath -Parent

  Ensure-Dir $Dir

  if (Test-Path -LiteralPath $FullPath) {

    $BackupDir =
      Join-Path `
        $ProjectRoot `
        "backup\central-runtime-registry"

    Ensure-Dir $BackupDir

$SafeName = $Path
$SafeName = $SafeName.Replace("\", "__")
$SafeName = $SafeName.Replace("/", "__")
$SafeName = $SafeName.Replace(":", "")
    Copy-Item `
      -LiteralPath $FullPath `
      -Destination (
        Join-Path `
          $BackupDir `
          "$SafeName.bak"
      ) `
      -Force
  }

  [System.IO.File]::WriteAllText(
    $FullPath,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host `
    "WRITTEN: $Path" `
    -ForegroundColor Green
}

Write-Host ""
Write-Host "ERP CENTRAL RUNTIME REGISTRY" -ForegroundColor Cyan
Write-Host ""

Ensure-Dir "src\runtime\registry"
Ensure-Dir "src\runtime\registry\modules"
Ensure-Dir "src\runtime\registry\schemas"
Ensure-Dir "src\runtime\registry\actions"
Ensure-Dir "src\runtime\registry\permissions"
Ensure-Dir "src\runtime\registry\workflows"
Ensure-Dir "src\runtime\registry\automation"
Ensure-Dir "src\runtime\registry\events"
Ensure-Dir "src\runtime\registry\navigation"

Write-Utf8 "src\runtime\registry\types.ts" @'
import type {
  ERPGeneratedSchema,
} from "@/runtime/ui-generation";

export type ERPRegistryAction = {
  key: string;
  label: string;
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "danger";
};

export type ERPRegistryPermission = {
  key: string;
  label: string;
};

export type ERPRegistryWorkflow = {
  key: string;
  label: string;
};

export type ERPRegistryAutomation = {
  key: string;
  label: string;
};

export type ERPRegistryEvent = {
  key: string;
  label: string;
};

export type ERPRegistryNavigationItem = {
  key: string;
  label: string;
  href: string;
  icon?: string;
};

export type ERPRegistryModule = {
  key: string;
  label: string;

  description?: string;

  schema: ERPGeneratedSchema;

  navigation: ERPRegistryNavigationItem[];

  actions: ERPRegistryAction[];

  permissions: ERPRegistryPermission[];

  workflows: ERPRegistryWorkflow[];

  automation: ERPRegistryAutomation[];

  events: ERPRegistryEvent[];
};
'@

Write-Utf8 "src\runtime\registry\modules\ERPRegistryModules.ts" @'
import {
  resolveERPGeneratedSchema,
} from "@/runtime/ui-generation";

import type {
  ERPRegistryModule,
} from "../types";

const ModuleKeys = [
  "exploitations",
  "terrains",
  "materiels",
  "produits",
  "stocks",
  "paiements",
  "interventions",
  "contrats",
  "maintenance",
];

export const ERPRegistryModules:
  ERPRegistryModule[] =
    ModuleKeys.map((moduleKey) => {

      const schema =
        resolveERPGeneratedSchema(
          moduleKey
        );

      return {

        key: moduleKey,

        label:
          schema.moduleLabel,

        description:
          schema.description,

        schema,

        navigation: [
          {
            key: "list",
            label: "Liste",
            href: `/${moduleKey}`,
          },
          {
            key: "create",
            label: "Creation",
            href: `/${moduleKey}/nouveau`,
          },
        ],

        actions: [
          {
            key: "create",
            label: "Nouveau",
            variant: "primary",
          },
          {
            key: "import",
            label: "Importer",
            variant: "secondary",
          },
          {
            key: "export",
            label: "Exporter",
            variant: "secondary",
          },
        ],

        permissions: [
          {
            key: "read",
            label: "Lecture",
          },
          {
            key: "write",
            label: "Ecriture",
          },
          {
            key: "delete",
            label: "Suppression",
          },
        ],

        workflows: [
          {
            key: "default",
            label: "Workflow principal",
          },
        ],

        automation: [
          {
            key: "notifications",
            label: "Notifications runtime",
          },
        ],

        events: [
          {
            key: "created",
            label: "Entite creee",
          },
          {
            key: "updated",
            label: "Entite modifiee",
          },
          {
            key: "deleted",
            label: "Entite supprimee",
          },
        ],
      };
    });
'@

Write-Utf8 "src\runtime\registry\ERPRegistry.ts" @'
import {
  ERPRegistryModules,
} from "./modules/ERPRegistryModules";

import type {
  ERPRegistryModule,
} from "./types";

export const ERPRegistry = {

  modules():
    ERPRegistryModule[] {

    return ERPRegistryModules;
  },

  module(
    moduleKey: string
  ): ERPRegistryModule | undefined {

    return ERPRegistryModules.find(
      (module) =>
        module.key === moduleKey
    );
  },

  navigation() {

    return ERPRegistryModules.flatMap(
      (module) =>
        module.navigation
    );
  },

  actions(
    moduleKey: string
  ) {

    return (
      this.module(moduleKey)
        ?.actions ?? []
    );
  },

  permissions(
    moduleKey: string
  ) {

    return (
      this.module(moduleKey)
        ?.permissions ?? []
    );
  },

  workflows(
    moduleKey: string
  ) {

    return (
      this.module(moduleKey)
        ?.workflows ?? []
    );
  },

  automation(
    moduleKey: string
  ) {

    return (
      this.module(moduleKey)
        ?.automation ?? []
    );
  },

  events(
    moduleKey: string
  ) {

    return (
      this.module(moduleKey)
        ?.events ?? []
    );
  },
};
'@

Write-Utf8 "src\runtime\registry\index.ts" @'
export * from "./types";

export * from "./ERPRegistry";

export * from "./modules/ERPRegistryModules";
'@

Write-Utf8 "src\components\erp\runtime-ui\ERPRuntimeRegistryDashboard.tsx" @'
import {
  ERPPageHeader,
  ERPSection,
  ERPStatCard,
} from "@/components/erp/ui";

import {
  ERPRegistry,
} from "@/runtime/registry";

export function ERPRuntimeRegistryDashboard() {

  const modules =
    ERPRegistry.modules();

  const navigation =
    ERPRegistry.navigation();

  return (
    <div className="space-y-8">

      <ERPPageHeader
        eyebrow="ERP Runtime"
        title="Central Runtime Registry"
        description="Source unique de verite ERP pour modules, schemas, actions, workflows, permissions et automation."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">

        <ERPStatCard
          label="Modules"
          value={modules.length}
          helper="Modules enregistres"
        />

        <ERPStatCard
          label="Navigation"
          value={navigation.length}
          helper="Routes runtime"
        />

        <ERPStatCard
          label="Schemas"
          value={modules.length}
          helper="Schemas centralises"
        />

        <ERPStatCard
          label="Automation"
          value="Active"
          helper="Runtime ERP"
        />

      </div>

      <ERPSection>

        <div className="overflow-hidden rounded-2xl border border-slate-200">

          <table className="w-full text-sm">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-4 py-3 text-left font-semibold">
                  Module
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Fields
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Actions
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Workflows
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Events
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {modules.map((module) => (

                <tr key={module.key}>

                  <td className="px-4 py-3">
                    {module.label}
                  </td>

                  <td className="px-4 py-3">
                    {module.schema.fields.length}
                  </td>

                  <td className="px-4 py-3">
                    {module.actions.length}
                  </td>

                  <td className="px-4 py-3">
                    {module.workflows.length}
                  </td>

                  <td className="px-4 py-3">
                    {module.events.length}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </ERPSection>

    </div>
  );
}
'@

Write-Utf8 "src\components\erp\runtime-ui\index.ts" @'
export * from "./ERPDataTableRuntime";

export * from "./ERPRuntimeModulePage";

export * from "./ERPRuntimeRegistryDashboard";
'@

Write-Utf8 "src\app\(private)\runtime-registry\page.tsx" @'
import {
  ERPRuntimeRegistryDashboard,
} from "@/components/erp/runtime-ui";

export default function Page() {

  return (
    <ERPRuntimeRegistryDashboard />
  );
}
'@

Write-Host ""
Write-Host "CENTRAL RUNTIME REGISTRY INSTALLE" -ForegroundColor Green
Write-Host ""
Write-Host "Executer :" -ForegroundColor Yellow
Write-Host "pnpm build" -ForegroundColor White
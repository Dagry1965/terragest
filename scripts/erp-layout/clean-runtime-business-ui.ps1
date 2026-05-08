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

WriteFile "src\runtime\modules\definitions\coreModules.ts" @'
import type { ERPModule } from "../ERPModule";

export const coreERPModules: ERPModule[] = [
  {
    metadata: {
      key: "exploitations",
      label: "Exploitations",
      description: "Gestion des exploitations agricoles et operationnelles.",
      icon: "building-2",
      category: "Metier",
      enabled: true,
      visible: true,
      order: 10,
      routes: {
        list: "/exploitations",
        create: "/exploitations/nouveau",
        details: "/exploitations/details",
        edit: "/exploitations/edit",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "exploitations",
      collection: "exploitations",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Exploitation", type: "text", required: true, searchable: true, sortable: true },
        { key: "responsable", label: "Responsable", type: "text", searchable: true },
        { key: "type", label: "Type", type: "select", filterable: true },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
  },
  {
    metadata: {
      key: "materiels",
      label: "Materiels",
      description: "Gestion du parc materiel, etats, pannes et maintenance.",
      icon: "tractor",
      category: "Operations",
      enabled: true,
      visible: true,
      order: 20,
      routes: {
        list: "/materiels",
        create: "/materiels/nouveau",
        details: "/materiels/details",
        edit: "/materiels/edit",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        automation: true,
        notifications: true,
        observability: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "materiels",
      collection: "materiels",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Materiel", type: "text", required: true, searchable: true, sortable: true },
        { key: "type", label: "Type", type: "select", filterable: true },
        { key: "etat", label: "Statut", type: "status", filterable: true },
        { key: "exploitationId", label: "Exploitation", type: "relation", relation: "exploitations" },
      ],
    },
  },
  {
    metadata: {
      key: "terrains",
      label: "Terrains",
      description: "Gestion des terrains, surfaces et affectations.",
      icon: "map",
      category: "Metier",
      enabled: true,
      visible: true,
      order: 30,
      routes: {
        list: "/terrains",
        create: "/terrains/nouveau",
        details: "/terrains/details",
        edit: "/terrains/edit",
      },
      features: {
        dashboard: true,
        analytics: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "terrains",
      collection: "terrains",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Terrain", type: "text", required: true, searchable: true, sortable: true },
        { key: "surface", label: "Surface", type: "number", sortable: true },
        { key: "localisation", label: "Localisation", type: "text", searchable: true },
        { key: "exploitationId", label: "Exploitation", type: "relation", relation: "exploitations" },
      ],
    },
  },
  {
    metadata: {
      key: "stocks",
      label: "Stocks",
      description: "Suivi des stocks, mouvements et niveaux d'alerte.",
      icon: "boxes",
      category: "Logistique",
      enabled: true,
      visible: true,
      order: 40,
      routes: {
        list: "/stocks",
        create: "/stocks/nouveau",
        details: "/stocks/details",
        edit: "/stocks/edit",
      },
      features: {
        dashboard: true,
        analytics: true,
        automation: true,
        notifications: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "stocks",
      collection: "stocks",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "produit", label: "Produit", type: "text", required: true, searchable: true },
        { key: "quantite", label: "Quantite", type: "number", sortable: true },
        { key: "seuil", label: "Seuil alerte", type: "number" },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
  },
  {
    metadata: {
      key: "produits",
      label: "Produits",
      description: "Catalogue des produits agricoles, animaux, intrants et marchandises.",
      icon: "package",
      category: "Referentiel",
      enabled: true,
      visible: true,
      order: 50,
      routes: {
        list: "/produits",
        create: "/produits/nouveau",
        details: "/produits/details",
        edit: "/produits/edit",
      },
      features: {
        dashboard: true,
        analytics: true,
        audit: true,
      },
    },
    schema: {
      module: "produits",
      collection: "produits",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Produit", type: "text", required: true, searchable: true, sortable: true },
        { key: "categorie", label: "Categorie", type: "select", filterable: true },
        { key: "unite", label: "Unite", type: "text" },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
  },
];
'@

WriteFile "src\components\erp\runtime\ERPRuntimeTable.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { ERPRuntimeFieldValue } from "./ERPRuntimeFieldValue";

interface ERPRuntimeTableProps {
  module: ERPModule;
  data?: Record<string, unknown>[];
}

function createDemoRows(module: ERPModule): Record<string, unknown>[] {
  return Array.from({ length: 6 }).map((_, index) => {
    const row: Record<string, unknown> = {};

    module.schema.fields.forEach((field) => {
      if (field.type === "number") {
        row[field.key] = index * 10 + 5;
      } else if (field.type === "status") {
        row[field.key] = index % 2 === 0 ? "Actif" : "En suivi";
      } else if (field.type === "relation") {
        row[field.key] = "REF-" + String(index + 1).padStart(3, "0");
      } else {
        row[field.key] = `${field.label} ${index + 1}`;
      }
    });

    return row;
  });
}

export function ERPRuntimeTable({ module, data }: ERPRuntimeTableProps) {
  const table = ERPModuleBuilder.buildTable(module);
  const rows = data && data.length > 0 ? data : createDemoRows(module);

  const columns = table.columns.map((column) => {
    const field = module.schema.fields.find((item) => item.key === column.key);

    return {
      key: column.key,
      label: column.label,
      render: (row: Record<string, unknown>) =>
        field ? (
          <ERPRuntimeFieldValue field={field} value={row[column.key]} />
        ) : (
          String(row[column.key] ?? "")
        ),
    };
  });

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
      <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-black text-slate-950">
            Liste des enregistrements
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Vue metier centralisee du module {module.metadata.label}.
          </p>
        </div>

        <div className="flex gap-2">
          <ERPBadge tone="success">{rows.length} lignes</ERPBadge>
          <ERPBadge tone="info">{columns.length} colonnes</ERPBadge>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="whitespace-nowrap px-6 py-4 text-xs font-black uppercase tracking-wide text-slate-500"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr key={index} className="transition hover:bg-blue-50">
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="whitespace-nowrap px-6 py-4 font-medium text-slate-700"
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
'@

WriteFile "src\components\erp\runtime\ERPRuntimePage.tsx" @'
import { ERPBadge, ERPButton, ERPCard, ERPEmptyState } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPRuntimeTable } from "./ERPRuntimeTable";
import { ERPRuntimeForm } from "./ERPRuntimeForm";
import { ERPRuntimeDetails } from "./ERPRuntimeDetails";

type ERPRuntimePageType = "list" | "create" | "edit" | "details";

interface ERPRuntimePageProps {
  module?: ERPModule;
  type?: ERPRuntimePageType;
  data?: Record<string, unknown>[];
  record?: Record<string, unknown>;
}

export function ERPRuntimePage({
  module,
  type = "list",
  data = [],
  record,
}: ERPRuntimePageProps) {
  if (!module) {
    return (
      <ERPEmptyState
        title="Module introuvable"
        description="La definition du module est absente."
      />
    );
  }

  if (type === "create" || type === "edit") {
    return <ERPRuntimeForm module={module} />;
  }

  if (type === "details") {
    return <ERPRuntimeDetails module={module} data={record} />;
  }

  const enabledFeatures = Object.entries(module.metadata.features ?? {})
    .filter(([, enabled]) => enabled)
    .map(([feature]) => feature);

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <ERPBadge tone="info">Module ERP</ERPBadge>
              <ERPBadge tone="success">Actif</ERPBadge>
              {module.metadata.category && (
                <ERPBadge>{module.metadata.category}</ERPBadge>
              )}
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950">
              {module.metadata.label}
            </h1>

            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-500">
              {module.metadata.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ERPButton type="button">Nouveau</ERPButton>
            <ERPButton variant="secondary" type="button">Exporter</ERPButton>
            <ERPButton variant="ghost" type="button">Importer</ERPButton>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <ERPCard title="Collection">
          <p className="text-2xl font-black text-slate-100">
            {module.schema.collection}
          </p>
        </ERPCard>

        <ERPCard title="Champs metier">
          <p className="text-2xl font-black text-slate-100">
            {module.schema.fields.length}
          </p>
        </ERPCard>

        <ERPCard title="Capacites">
          <p className="text-2xl font-black text-slate-100">
            {enabledFeatures.length}
          </p>
        </ERPCard>

        <ERPCard title="Statut" premium>
          <p className="text-2xl font-black text-emerald-300">
            Actif
          </p>
        </ERPCard>
      </section>

      <div className="flex flex-wrap gap-2 rounded-[2rem] border border-slate-200 bg-white p-3 shadow-xl">
        {["Vue generale", "Liste", "Activite", "Workflows", "Audit"].map(
          (tab, index) => (
            <button
              key={tab}
              type="button"
              className={[
                "rounded-2xl px-5 py-3 text-sm font-bold transition",
                index === 0
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
              ].join(" ")}
            >
              {tab}
            </button>
          )
        )}
      </div>

      <section className="grid gap-8 xl:grid-cols-[1fr_340px]">
        <ERPRuntimeTable module={module} data={data} />

        <aside className="space-y-5">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
            <h3 className="text-lg font-black text-slate-950">
              Actions metier
            </h3>

            <div className="mt-5 grid gap-3">
              <ERPButton type="button">Lancer workflow</ERPButton>
              <ERPButton variant="secondary" type="button">Voir audit</ERPButton>
              <ERPButton variant="ghost" type="button">Relations</ERPButton>
              <ERPButton variant="ghost" type="button">Permissions</ERPButton>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
            <h3 className="text-lg font-black text-slate-950">
              Capacites
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {enabledFeatures.map((feature) => (
                <ERPBadge key={feature} tone="info">
                  {feature}
                </ERPBadge>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
'@

Set-Location $projectRoot
pnpm build
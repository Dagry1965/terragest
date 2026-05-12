$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"

function Ensure-Dir($Path) {
  if (!(Test-Path $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-File($Path, $Content) {
  $Dir = Split-Path $Path -Parent
  Ensure-Dir $Dir
  [System.IO.File]::WriteAllText($Path, $Content, [System.Text.UTF8Encoding]::new($false))
  Write-Host "WRITTEN $Path"
}

Ensure-Dir "$Root\src\runtime\dashboard\generic"
Ensure-Dir "$Root\src\components\erp\dashboard\generic"

$Types = @'
export type ERPDashboardWidgetType =
  | "kpi"
  | "alert"
  | "timeline";

export type ERPDashboardFilterOperator =
  | "equals"
  | "notEquals"
  | "exists"
  | "lteDaysFromNow"
  | "gteDaysFromNow";

export interface ERPDashboardFilter {
  field: string;
  operator: ERPDashboardFilterOperator;
  value?: unknown;
}

export interface ERPDashboardWidgetConfig {
  key: string;
  type: ERPDashboardWidgetType;
  moduleKey: string;
  title: string;
  description?: string;
  href?: string;
  dateField?: string;
  labelField?: string;
  filters?: ERPDashboardFilter[];
  level?: "info" | "warning" | "critical";
}

export interface ERPDashboardConfig {
  key: string;
  title: string;
  subtitle?: string;
  widgets: ERPDashboardWidgetConfig[];
}

export interface ERPDashboardWidgetResult {
  key: string;
  type: ERPDashboardWidgetType;
  title: string;
  description?: string;
  href?: string;
  value?: number;
  items?: Array<{
    id: string;
    title: string;
    description?: string;
    date?: string;
    level?: "info" | "warning" | "critical";
  }>;
}
'@

$Resolver = @'
import type { ERPModule } from "@/runtime/modules";
import { coreERPModules } from "@/runtime/modules/definitions/coreModules";

export function resolveDashboardModule(moduleKey: string): ERPModule | null {
  return (
    coreERPModules.find(
      (module) => module.metadata.key === moduleKey
    ) ?? null
  );
}
'@

$Engine = @'
import { RuntimeDataBinding } from "@/runtime/data-binding";
import { resolveDashboardModule } from "./ERPDashboardModuleResolver";
import type {
  ERPDashboardConfig,
  ERPDashboardFilter,
  ERPDashboardWidgetConfig,
  ERPDashboardWidgetResult,
} from "./ERPDashboardTypes";

function readValue(record: any, field: string): any {
  return record?.[field];
}

function toDate(value: unknown): Date | null {
  if (!value) return null;

  if (value instanceof Date) return value;

  if (
    typeof value === "object" &&
    value !== null &&
    "seconds" in value
  ) {
    return new Date((value as any).seconds * 1000);
  }

  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

function daysFromNow(value: unknown): number | null {
  const date = toDate(value);
  if (!date) return null;

  const now = new Date();
  const diff = date.getTime() - now.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function matchFilter(record: any, filter: ERPDashboardFilter): boolean {
  const value = readValue(record, filter.field);

  if (filter.operator === "equals") {
    return value === filter.value;
  }

  if (filter.operator === "notEquals") {
    return value !== filter.value;
  }

  if (filter.operator === "exists") {
    return value !== undefined && value !== null && value !== "";
  }

  if (filter.operator === "lteDaysFromNow") {
    const days = daysFromNow(value);
    return days !== null && days <= Number(filter.value);
  }

  if (filter.operator === "gteDaysFromNow") {
    const days = daysFromNow(value);
    return days !== null && days >= Number(filter.value);
  }

  return true;
}

function applyFilters(
  records: any[],
  filters?: ERPDashboardFilter[]
): any[] {
  if (!filters || filters.length === 0) {
    return records;
  }

  return records.filter((record) =>
    filters.every((filter) => matchFilter(record, filter))
  );
}

function getRecordLabel(
  record: any,
  widget: ERPDashboardWidgetConfig
): string {
  const labelField = widget.labelField ?? "nom";

  return (
    record[labelField] ??
    record.nom ??
    record.code ??
    record.title ??
    record.id ??
    "Element"
  );
}

export class ERPDashboardWidgetEngine {
  static async resolveWidget(
    widget: ERPDashboardWidgetConfig
  ): Promise<ERPDashboardWidgetResult> {
    const module = resolveDashboardModule(widget.moduleKey);

    if (!module) {
      return {
        key: widget.key,
        type: widget.type,
        title: widget.title,
        description: "Module introuvable : " + widget.moduleKey,
        value: 0,
        items: [],
      };
    }

    const records = await RuntimeDataBinding.list(module);
    const filtered = applyFilters(records, widget.filters);

    if (widget.type === "kpi") {
      return {
        key: widget.key,
        type: widget.type,
        title: widget.title,
        description: widget.description,
        href: widget.href,
        value: filtered.length,
      };
    }

    const items = filtered.map((record: any) => ({
      id: String(record.id),
      title: getRecordLabel(record, widget),
      description: widget.description,
      date: widget.dateField ? String(record[widget.dateField] ?? "") : undefined,
      level: widget.level ?? "info",
    }));

    return {
      key: widget.key,
      type: widget.type,
      title: widget.title,
      description: widget.description,
      href: widget.href,
      items,
    };
  }

  static async resolveDashboard(
    config: ERPDashboardConfig
  ): Promise<ERPDashboardWidgetResult[]> {
    return Promise.all(
      config.widgets.map((widget) => this.resolveWidget(widget))
    );
  }
}
'@

$Config = @'
import type { ERPDashboardConfig } from "./ERPDashboardTypes";

export const ERPBusinessDashboardConfig: ERPDashboardConfig = {
  key: "business-dashboard",
  title: "Cockpit TerraGest",
  subtitle:
    "Pilotage ERP des terrains, contrats, exploitations, campagnes, stocks et actifs.",
  widgets: [
    {
      key: "terrains-total",
      type: "kpi",
      moduleKey: "terrains",
      title: "Terrains",
      href: "/terrains",
    },
    {
      key: "exploitations-total",
      type: "kpi",
      moduleKey: "exploitations",
      title: "Exploitations",
      href: "/exploitations",
    },
    {
      key: "contrats-actifs",
      type: "kpi",
      moduleKey: "contrats",
      title: "Contrats actifs",
      href: "/contrats",
      filters: [
        {
          field: "statutContrat",
          operator: "equals",
          value: "Actif",
        },
      ],
    },
    {
      key: "campagnes-actives",
      type: "kpi",
      moduleKey: "campagnes",
      title: "Campagnes actives",
      href: "/campagnes",
      filters: [
        {
          field: "statutCampagne",
          operator: "equals",
          value: "En cours",
        },
      ],
    },
    {
      key: "stocks-bas",
      type: "kpi",
      moduleKey: "stocks",
      title: "Stocks bas",
      href: "/stocks",
      filters: [
        {
          field: "statutStock",
          operator: "equals",
          value: "Bas",
        },
      ],
    },
    {
      key: "actifs-maintenance",
      type: "kpi",
      moduleKey: "actifs",
      title: "Actifs maintenance",
      href: "/actifs",
      filters: [
        {
          field: "statutActif",
          operator: "equals",
          value: "Maintenance",
        },
      ],
    },
    {
      key: "contrats-expiration",
      type: "alert",
      moduleKey: "contrats",
      title: "Contrats proches expiration",
      labelField: "code",
      dateField: "dateFin",
      level: "warning",
      filters: [
        {
          field: "statutContrat",
          operator: "equals",
          value: "Actif",
        },
        {
          field: "dateFin",
          operator: "lteDaysFromNow",
          value: 30,
        },
      ],
    },
    {
      key: "timeline-campagnes",
      type: "timeline",
      moduleKey: "campagnes",
      title: "Timeline campagnes",
      labelField: "nom",
      dateField: "dateFinPrevue",
      filters: [
        {
          field: "statutCampagne",
          operator: "notEquals",
          value: "Archivée",
        },
      ],
    },
  ],
};
'@

$Renderer = @'
"use client";

import Link from "next/link";
import type {
  ERPDashboardConfig,
  ERPDashboardWidgetResult,
} from "@/runtime/dashboard/generic/ERPDashboardTypes";

interface Props {
  config: ERPDashboardConfig;
  widgets: ERPDashboardWidgetResult[];
}

function KPIWidget({ widget }: { widget: ERPDashboardWidgetResult }) {
  const content = (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <p className="text-sm text-slate-500">{widget.title}</p>
      <p className="mt-3 text-4xl font-bold text-slate-950">
        {widget.value ?? 0}
      </p>
    </div>
  );

  if (widget.href) {
    return <Link href={widget.href}>{content}</Link>;
  }

  return content;
}

function ListWidget({ widget }: { widget: ERPDashboardWidgetResult }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">
        {widget.title}
      </h2>

      <div className="mt-5 space-y-3">
        {(widget.items ?? []).length === 0 ? (
          <p className="text-sm text-slate-500">Aucune donnée.</p>
        ) : (
          widget.items?.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm"
            >
              <div className="font-semibold text-slate-950">
                {item.title}
              </div>

              {item.date ? (
                <div className="mt-1 text-xs text-slate-500">
                  {item.date}
                </div>
              ) : null}

              {item.description ? (
                <div className="mt-1 text-slate-600">
                  {item.description}
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function ERPDashboardRenderer({ config, widgets }: Props) {
  const kpis = widgets.filter((widget) => widget.type === "kpi");
  const lists = widgets.filter((widget) => widget.type !== "kpi");

  return (
    <main className="space-y-8 p-8">
      <section className="rounded-3xl border bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-emerald-700">
          Tableau de bord ERP
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          {config.title}
        </h1>

        {config.subtitle ? (
          <p className="mt-3 max-w-3xl text-slate-600">
            {config.subtitle}
          </p>
        ) : null}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {kpis.map((widget) => (
          <KPIWidget key={widget.key} widget={widget} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {lists.map((widget) => (
          <ListWidget key={widget.key} widget={widget} />
        ))}
      </section>
    </main>
  );
}
'@

$Dashboard = @'
"use client";

import { useEffect, useState } from "react";
import { ERPBusinessDashboardConfig } from "@/runtime/dashboard/generic/ERPBusinessDashboardConfig";
import { ERPDashboardWidgetEngine } from "@/runtime/dashboard/generic/ERPDashboardWidgetEngine";
import type { ERPDashboardWidgetResult } from "@/runtime/dashboard/generic/ERPDashboardTypes";
import { ERPDashboardRenderer } from "@/components/erp/dashboard/generic/ERPDashboardRenderer";

export function ERPBusinessDashboard() {
  const [widgets, setWidgets] = useState<ERPDashboardWidgetResult[] | null>(null);

  useEffect(() => {
    async function load() {
      const result =
        await ERPDashboardWidgetEngine.resolveDashboard(
          ERPBusinessDashboardConfig
        );

      setWidgets(result);
    }

    load();
  }, []);

  if (!widgets) {
    return <div className="p-10">Chargement dashboard ERP...</div>;
  }

  return (
    <ERPDashboardRenderer
      config={ERPBusinessDashboardConfig}
      widgets={widgets}
    />
  );
}
'@

Write-File "$Root\src\runtime\dashboard\generic\ERPDashboardTypes.ts" $Types
Write-File "$Root\src\runtime\dashboard\generic\ERPDashboardModuleResolver.ts" $Resolver
Write-File "$Root\src\runtime\dashboard\generic\ERPDashboardWidgetEngine.ts" $Engine
Write-File "$Root\src\runtime\dashboard\generic\ERPBusinessDashboardConfig.ts" $Config
Write-File "$Root\src\components\erp\dashboard\generic\ERPDashboardRenderer.tsx" $Renderer
Write-File "$Root\src\components\erp\dashboard\business\ERPBusinessDashboard.tsx" $Dashboard

Write-Host ""
Write-Host "DONE GENERIC ERP DASHBOARD"
Write-Host "NEXT: pnpm build"
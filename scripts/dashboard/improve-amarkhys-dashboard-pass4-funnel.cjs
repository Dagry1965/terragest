const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function write(relativePath, content) {
  const file = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("WRITTEN", relativePath);
}

write(
  "src/runtime/dashboard/generic/ERPDashboardTypes.ts",
`export type ERPDashboardWidgetType =
  | "kpi"
  | "alert"
  | "timeline"
  | "activity"
  | "quickActions"
  | "funnel";

export type ERPDashboardFilterOperator =
  | "equals"
  | "notEquals"
  | "exists"
  | "lteDaysFromNow"
  | "gteDaysFromNow";

export type ERPDashboardAggregation =
  | "count"
  | "sum";

export interface ERPDashboardFilter {
  field: string;
  operator: ERPDashboardFilterOperator;
  value?: unknown;
}

export interface ERPDashboardQuickAction {
  label: string;
  href: string;
  description?: string;
  tone?: "primary" | "secondary" | "danger";
}

export interface ERPDashboardFunnelStepConfig {
  key: string;
  label: string;
  moduleKey: string;
  href?: string;
  filters?: ERPDashboardFilter[];
}

export interface ERPDashboardFunnelStepResult {
  key: string;
  label: string;
  value: number;
  href?: string;
  conversionRate?: number;
}

export interface ERPDashboardWidgetConfig {
  key: string;
  type: ERPDashboardWidgetType;
  moduleKey?: string;
  title: string;
  description?: string;
  href?: string;
  dateField?: string;
  labelField?: string;
  filters?: ERPDashboardFilter[];
  level?: "info" | "warning" | "critical";
  limit?: number;
  actions?: ERPDashboardQuickAction[];
  aggregation?: ERPDashboardAggregation;
  sumFields?: string[];
  valueSuffix?: string;
  steps?: ERPDashboardFunnelStepConfig[];
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
  valueSuffix?: string;
  actions?: ERPDashboardQuickAction[];
  steps?: ERPDashboardFunnelStepResult[];
  items?: Array<{
    id: string;
    title: string;
    description?: string;
    date?: string;
    level?: "info" | "warning" | "critical";
    href?: string;
  }>;
}
`
);

write(
  "src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts",
`import { RuntimeDataBinding } from "@/runtime/data-binding";
import { resolveDashboardModule } from "./ERPDashboardModuleResolver";
import type {
  ERPDashboardConfig,
  ERPDashboardFilter,
  ERPDashboardFunnelStepConfig,
  ERPDashboardFunnelStepResult,
  ERPDashboardWidgetConfig,
  ERPDashboardWidgetResult,
} from "./ERPDashboardTypes";

function readValue(record: any, field: string): any {
  return record?.[field];
}

function toDate(value: unknown): Date | null {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "seconds" in value
  ) {
    return new Date((value as any).seconds * 1000);
  }

  const date =
    new Date(String(value));

  return Number.isNaN(date.getTime()) ? null : date;
}

function dateTimeValue(value: unknown): number {
  const date =
    toDate(value);

  return date ? date.getTime() : 0;
}

function daysFromNow(value: unknown): number | null {
  const date =
    toDate(value);

  if (!date) {
    return null;
  }

  const now =
    new Date();

  const diff =
    date.getTime() - now.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function matchFilter(record: any, filter: ERPDashboardFilter): boolean {
  const value =
    readValue(record, filter.field);

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
    const days =
      daysFromNow(value);

    return days !== null && days <= Number(filter.value);
  }

  if (filter.operator === "gteDaysFromNow") {
    const days =
      daysFromNow(value);

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

function sumRecordFields(
  records: any[],
  fields: string[] = []
): number {
  return records.reduce((total, record) => {
    for (const field of fields) {
      const value =
        Number(record[field] ?? 0);

      if (!Number.isNaN(value) && value > 0) {
        return total + value;
      }
    }

    return total;
  }, 0);
}

function getRecordLabel(
  record: any,
  widget: ERPDashboardWidgetConfig
): string {
  const labelField =
    widget.labelField ?? "nom";

  return String(
    record[labelField] ??
    record.nom ??
    record.code ??
    record.title ??
    record.motif ??
    record.message ??
    record.immatriculation ??
    record.id ??
    "Élément"
  );
}

function getRecordDescription(
  record: any,
  widget: ERPDashboardWidgetConfig
): string | undefined {
  const value =
    record.telephone ??
    record.immatriculation ??
    record.typeService ??
    record.statutPaiement ??
    record.statut ??
    record.source ??
    widget.description;

  return value ? String(value) : undefined;
}

function getRecordHref(
  record: any,
  widget: ERPDashboardWidgetConfig
): string | undefined {
  if (!widget.href) {
    return undefined;
  }

  if (!record.id) {
    return widget.href;
  }

  return widget.href + "/" + record.id;
}

async function resolveFunnelStep(
  step: ERPDashboardFunnelStepConfig,
  previousValue?: number
): Promise<ERPDashboardFunnelStepResult> {
  const module =
    resolveDashboardModule(step.moduleKey);

  if (!module) {
    return {
      key: step.key,
      label: step.label,
      value: 0,
      href: step.href,
      conversionRate: 0,
    };
  }

  const records =
    await RuntimeDataBinding.list(module);

  const filtered =
    applyFilters(records, step.filters);

  const value =
    filtered.length;

  const conversionRate =
    previousValue && previousValue > 0
      ? Math.round((value / previousValue) * 100)
      : undefined;

  return {
    key: step.key,
    label: step.label,
    value,
    href: step.href,
    conversionRate,
  };
}

async function resolveFunnelWidget(
  widget: ERPDashboardWidgetConfig
): Promise<ERPDashboardWidgetResult> {
  const results: ERPDashboardFunnelStepResult[] = [];
  let previousValue: number | undefined = undefined;

  for (const step of widget.steps ?? []) {
    const result =
      await resolveFunnelStep(
        step,
        previousValue
      );

    results.push(result);
    previousValue = result.value;
  }

  const first =
    results[0]?.value ?? 0;

  const last =
    results[results.length - 1]?.value ?? 0;

  const globalConversion =
    first > 0
      ? Math.round((last / first) * 100)
      : 0;

  return {
    key: widget.key,
    type: widget.type,
    title: widget.title,
    description: widget.description,
    value: globalConversion,
    valueSuffix: "%",
    steps: results,
  };
}

export class ERPDashboardWidgetEngine {
  static async resolveWidget(
    widget: ERPDashboardWidgetConfig
  ): Promise<ERPDashboardWidgetResult> {
    if (widget.type === "quickActions") {
      return {
        key: widget.key,
        type: widget.type,
        title: widget.title,
        description: widget.description,
        actions: widget.actions ?? [],
      };
    }

    if (widget.type === "funnel") {
      return resolveFunnelWidget(widget);
    }

    if (!widget.moduleKey) {
      return {
        key: widget.key,
        type: widget.type,
        title: widget.title,
        description: "Module non défini pour le widget.",
        value: 0,
        items: [],
      };
    }

    const module =
      resolveDashboardModule(widget.moduleKey);

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

    const records =
      await RuntimeDataBinding.list(module);

    const filtered =
      applyFilters(records, widget.filters);

    if (widget.type === "kpi") {
      const value =
        widget.aggregation === "sum"
          ? sumRecordFields(filtered, widget.sumFields)
          : filtered.length;

      return {
        key: widget.key,
        type: widget.type,
        title: widget.title,
        description: widget.description,
        href: widget.href,
        value,
        valueSuffix: widget.valueSuffix,
      };
    }

    const sorted =
      widget.dateField
        ? [...filtered].sort(
            (left, right) =>
              dateTimeValue(right[widget.dateField ?? ""]) -
              dateTimeValue(left[widget.dateField ?? ""])
          )
        : filtered;

    const items =
      sorted.slice(0, widget.limit ?? 8).map((record: any) => ({
        id: String(record.id),
        title: getRecordLabel(record, widget),
        description: getRecordDescription(record, widget),
        date: widget.dateField
          ? String(record[widget.dateField] ?? "")
          : undefined,
        level: widget.level ?? "info",
        href: getRecordHref(record, widget),
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
`
);

write(
  "src/components/erp/dashboard/generic/widgets/ERPFunnelWidget.tsx",
`import Link from "next/link";

import type {
  ERPDashboardWidgetProps,
} from "../registry/ERPDashboardWidgetRegistry";

function formatPercent(value?: number): string {
  if (value === undefined) {
    return "Départ";
  }

  return value + "%";
}

export function ERPFunnelWidget({
  widget,
}: ERPDashboardWidgetProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl xl:col-span-4">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-black text-white">
            {widget.title}
          </h2>

          {widget.description ? (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              {widget.description}
            </p>
          ) : null}
        </div>

        <div className="rounded-2xl border border-emerald-300/30 bg-emerald-400/10 px-4 py-3 text-sm font-black text-emerald-200">
          Conversion globale : {widget.value ?? 0}{widget.valueSuffix ?? "%"}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {(widget.steps ?? []).map((step, index) => {
          const content = (
            <div className="h-full rounded-3xl border border-white/10 bg-black/20 p-5 transition hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-400/10">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
                Étape {index + 1}
              </p>

              <h3 className="mt-3 text-base font-black text-white">
                {step.label}
              </h3>

              <p className="mt-4 text-4xl font-black text-white">
                {step.value}
              </p>

              <p className="mt-3 text-sm font-bold text-slate-500">
                {formatPercent(step.conversionRate)}
              </p>
            </div>
          );

          if (step.href) {
            return (
              <Link
                key={step.key}
                href={step.href}
              >
                {content}
              </Link>
            );
          }

          return (
            <div key={step.key}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
`
);

write(
  "src/components/erp/dashboard/generic/registerDashboardWidgets.ts",
`import {
  ERPDashboardWidgetRegistry,
} from "./registry/ERPDashboardWidgetRegistry";

import {
  ERPKPIWidget,
} from "./widgets/ERPKPIWidget";

import {
  ERPListWidget,
} from "./widgets/ERPListWidget";

import {
  ERPQuickActionsWidget,
} from "./widgets/ERPQuickActionsWidget";

import {
  ERPFunnelWidget,
} from "./widgets/ERPFunnelWidget";

export function registerDashboardWidgets() {
  ERPDashboardWidgetRegistry.register(
    "kpi",
    ERPKPIWidget
  );

  ERPDashboardWidgetRegistry.register(
    "alert",
    ERPListWidget
  );

  ERPDashboardWidgetRegistry.register(
    "timeline",
    ERPListWidget
  );

  ERPDashboardWidgetRegistry.register(
    "activity",
    ERPListWidget
  );

  ERPDashboardWidgetRegistry.register(
    "quickActions",
    ERPQuickActionsWidget
  );

  ERPDashboardWidgetRegistry.register(
    "funnel",
    ERPFunnelWidget
  );
}
`
);

const configPath = path.join(
  ROOT,
  "src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts"
);

let config = fs.readFileSync(configPath, "utf8");

config = config
  .split("vÃ©hicules").join("véhicules")
  .split("activitÃ©").join("activité")
  .split("financiÃ¨re").join("financière")
  .split("AccÃ¨s").join("Accès")
  .split("opÃ©rations").join("opérations")
  .split("CrÃ©er").join("Créer")
  .split("lâ€™activitÃ©").join("l’activité")
  .split("crÃ©Ã©s").join("créés")
  .split("VÃ©hicules").join("Véhicules")
  .split("planifiÃ©s").join("planifiés")
  .split("Ã ").join("à")
  .split("confirmÃ©s").join("confirmés")
  .split("payÃ©es").join("payées")
  .split("encaissÃ©").join("encaissé")
  .split("terminÃ©es").join("terminées")
  .split("finalisÃ©s").join("finalisés")
  .split("rÃ©glÃ©es").join("réglées")
  .split("exÃ©cuter").join("exécuter")
  .split("DerniÃ¨res").join("Dernières")
  .split("rÃ©centes").join("récentes");

if (!config.includes('key: "conversion-funnel"')) {
  config = config.replace(
    `    {
      key: "ca-total-ttc",`,
    `    {
      key: "conversion-funnel",
      type: "funnel",
      title: "Funnel garage",
      description:
        "Lecture du parcours commercial et opérationnel : lead, rendez-vous, intervention, facture, paiement.",
      steps: [
        {
          key: "leads",
          label: "Leads",
          moduleKey: "clientsauto",
          href: "/clientsauto",
          filters: [
            {
              field: "source",
              operator: "equals",
              value: "site_public",
            },
          ],
        },
        {
          key: "rdv",
          label: "RDV",
          moduleKey: "rendezvous",
          href: "/rendezvous",
        },
        {
          key: "interventions",
          label: "Interventions",
          moduleKey: "interventionsauto",
          href: "/interventionsauto",
        },
        {
          key: "factures",
          label: "Factures",
          moduleKey: "facturesauto",
          href: "/facturesauto",
        },
        {
          key: "paiements",
          label: "Payées",
          moduleKey: "facturesauto",
          href: "/facturesauto",
          filters: [
            {
              field: "statutPaiement",
              operator: "equals",
              value: "paye",
            },
          ],
        },
      ],
    },
    {
      key: "ca-total-ttc",`
  );
}

fs.writeFileSync(configPath, config, "utf8");

console.log("UPDATED src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts");
console.log("");
console.log("AMARKHYS dashboard pass 4 funnel installed.");
console.log("Done.");
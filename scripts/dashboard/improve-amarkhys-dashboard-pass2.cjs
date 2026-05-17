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
  | "quickActions";

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

export interface ERPDashboardQuickAction {
  label: string;
  href: string;
  description?: string;
  tone?: "primary" | "secondary" | "danger";
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
  actions?: ERPDashboardQuickAction[];
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
      return {
        key: widget.key,
        type: widget.type,
        title: widget.title,
        description: widget.description,
        href: widget.href,
        value: filtered.length,
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
  "src/components/erp/dashboard/generic/widgets/ERPQuickActionsWidget.tsx",
`import Link from "next/link";

import type {
  ERPDashboardWidgetProps,
} from "../registry/ERPDashboardWidgetRegistry";

export function ERPQuickActionsWidget({
  widget,
}: ERPDashboardWidgetProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl xl:col-span-2">
      <div className="mb-5">
        <h2 className="text-lg font-black text-white">
          {widget.title}
        </h2>

        {widget.description ? (
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {widget.description}
          </p>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {(widget.actions ?? []).map((action) => {
          const isPrimary =
            action.tone === "primary";

          const className =
            isPrimary
              ? "rounded-2xl border border-emerald-300/40 bg-emerald-400/15 px-5 py-4 text-emerald-50 transition hover:-translate-y-1"
              : "rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-slate-100 transition hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-400/10";

          return (
            <Link
              key={action.href}
              href={action.href}
              className={className}
            >
              <p className="text-sm font-black">
                {action.label}
              </p>

              {action.description ? (
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  {action.description}
                </p>
              ) : null}
            </Link>
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
}
`
);

write(
  "src/components/erp/dashboard/generic/ERPDashboardRenderer.tsx",
`"use client";

import type {
  ERPDashboardConfig,
  ERPDashboardWidgetResult,
} from "@/runtime/dashboard/generic/ERPDashboardTypes";

import {
  registerDashboardWidgets,
} from "./registerDashboardWidgets";

import {
  ERPDashboardWidgetRegistry,
} from "./registry/ERPDashboardWidgetRegistry";

interface Props {
  config: ERPDashboardConfig;
  widgets: ERPDashboardWidgetResult[];
}

registerDashboardWidgets();

export function ERPDashboardRenderer({
  config,
  widgets,
}: Props) {
  return (
    <main className="min-h-screen space-y-8 bg-slate-950 p-6 text-slate-50 md:p-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-300">
            Tableau de bord métier
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-white">
            {config.title}
          </h1>

          {config.subtitle ? (
            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-400 md:text-base">
              {config.subtitle}
            </p>
          ) : null}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {widgets.map((widget) => {
          const Component =
            ERPDashboardWidgetRegistry.get(widget.type);

          if (!Component) {
            return (
              <div
                key={widget.key}
                className="rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-sm font-semibold text-red-100"
              >
                Widget inconnu : {widget.type}
              </div>
            );
          }

          return (
            <Component
              key={widget.key}
              widget={widget}
            />
          );
        })}
      </section>
    </main>
  );
}
`
);

write(
  "src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts",
`import type { ERPDashboardConfig } from "./ERPDashboardTypes";

export const ERPBusinessAmarkhysDashboardConfig: ERPDashboardConfig = {
  key: "amarkhys-dashboard",
  title: "Cockpit AMARKHYS",
  subtitle:
    "Pilotage garage : leads entrants, clients, véhicules, rendez-vous, interventions, factures, rappels et activité atelier.",
  widgets: [
    {
      key: "quick-actions",
      type: "quickActions",
      title: "Actions rapides",
      description: "Accès direct aux opérations quotidiennes du garage.",
      actions: [
        {
          label: "Nouveau rendez-vous",
          href: "/rendezvous/nouveau",
          description: "Créer un rendez-vous manuel.",
          tone: "primary",
        },
        {
          label: "Clients",
          href: "/clientsauto",
          description: "Voir les prospects et clients.",
        },
        {
          label: "Interventions",
          href: "/interventionsauto",
          description: "Suivre l’activité atelier.",
        },
        {
          label: "Factures",
          href: "/facturesauto",
          description: "Consulter la facturation.",
        },
      ],
    },
    {
      key: "leads-site-public",
      type: "kpi",
      moduleKey: "clientsauto",
      title: "Leads site public",
      description: "Prospects créés depuis le formulaire public.",
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
      key: "clientsauto-total",
      type: "kpi",
      moduleKey: "clientsauto",
      title: "Clients",
      description: "Base clients et prospects AMARKHYS.",
      href: "/clientsauto",
    },
    {
      key: "vehicules-total",
      type: "kpi",
      moduleKey: "vehicules",
      title: "Véhicules",
      description: "Véhicules suivis dans le garage.",
      href: "/vehicules",
    },
    {
      key: "rdv-planifies",
      type: "kpi",
      moduleKey: "rendezvous",
      title: "RDV planifiés",
      description: "Rendez-vous à traiter ou confirmer.",
      href: "/rendezvous",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "planifie",
        },
      ],
    },
    {
      key: "rdv-confirmes",
      type: "kpi",
      moduleKey: "rendezvous",
      title: "RDV confirmés",
      description: "Rendez-vous confirmés par le garage.",
      href: "/rendezvous",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "confirme",
        },
      ],
    },
    {
      key: "interventions-en-cours",
      type: "kpi",
      moduleKey: "interventionsauto",
      title: "Interventions en cours",
      description: "Travaux actuellement ouverts à l’atelier.",
      href: "/interventionsauto",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "en_cours",
        },
      ],
    },
    {
      key: "factures-en-attente",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "Factures en attente",
      description: "Factures non encore payées.",
      href: "/facturesauto",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "en_attente",
        },
      ],
    },
    {
      key: "rappels-a-traiter",
      type: "kpi",
      moduleKey: "rappelsauto",
      title: "Rappels à traiter",
      description: "Relances client et actions de suivi à exécuter.",
      href: "/rappelsauto",
      filters: [
        {
          field: "statut",
          operator: "notEquals",
          value: "traite",
        },
      ],
    },
    {
      key: "derniers-leads",
      type: "activity",
      moduleKey: "clientsauto",
      title: "Derniers leads entrants",
      description: "Prospects créés depuis le site public.",
      labelField: "nom",
      dateField: "createdAt",
      href: "/clientsauto",
      limit: 6,
      filters: [
        {
          field: "source",
          operator: "equals",
          value: "site_public",
        },
      ],
    },
    {
      key: "derniers-rdv-publics",
      type: "activity",
      moduleKey: "rendezvous",
      title: "Derniers RDV publics",
      description: "Demandes issues du formulaire public.",
      labelField: "motif",
      dateField: "dateRendezVous",
      href: "/rendezvous",
      limit: 6,
      filters: [
        {
          field: "source",
          operator: "equals",
          value: "site_public",
        },
      ],
    },
    {
      key: "prochains-rappels",
      type: "timeline",
      moduleKey: "rappelsauto",
      title: "Prochains rappels",
      description: "Actions de relance à venir.",
      labelField: "message",
      dateField: "dateRappel",
      href: "/rappelsauto",
      limit: 8,
      filters: [
        {
          field: "statut",
          operator: "notEquals",
          value: "traite",
        },
      ],
    },
  ],
};
`
);

console.log("");
console.log("AMARKHYS dashboard pass 2 installed.");
console.log("Done.");
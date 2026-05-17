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
  "src/components/erp/dashboard/generic/widgets/ERPKPIWidget.tsx",
`import Link from "next/link";

import type {
  ERPDashboardWidgetProps,
} from "../registry/ERPDashboardWidgetRegistry";

function formatValue(
  value: number,
  suffix?: string
): string {
  if (suffix) {
    return value.toLocaleString("fr-FR") + " " + suffix;
  }

  return value.toLocaleString("fr-FR");
}

export function ERPKPIWidget({
  widget,
}: ERPDashboardWidgetProps) {
  const content = (
    <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl transition hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-400/10">
      <p className="text-sm font-bold text-slate-400">
        {widget.title}
      </p>

      <h2 className="mt-4 text-4xl font-black tracking-tight text-white">
        {formatValue(widget.value ?? 0, widget.valueSuffix)}
      </h2>

      {widget.description ? (
        <p className="mt-4 text-sm leading-6 text-slate-500">
          {widget.description}
        </p>
      ) : null}
    </div>
  );

  if (widget.href) {
    return (
      <Link href={widget.href}>
        {content}
      </Link>
    );
  }

  return content;
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
    "Pilotage garage : leads entrants, clients, véhicules, rendez-vous, interventions, factures, rappels, activité atelier et performance financière.",
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
      key: "ca-total-ttc",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "CA total TTC",
      description: "Montant TTC total des factures atelier.",
      href: "/facturesauto",
      aggregation: "sum",
      sumFields: ["montantTTC", "totalTTC", "montantTotal", "total"],
      valueSuffix: "FCFA",
    },
    {
      key: "ca-encaisse",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "CA encaissé",
      description: "Montant TTC des factures payées.",
      href: "/facturesauto",
      aggregation: "sum",
      sumFields: ["montantTTC", "totalTTC", "montantTotal", "total"],
      valueSuffix: "FCFA",
      filters: [
        {
          field: "statutPaiement",
          operator: "equals",
          value: "paye",
        },
      ],
    },
    {
      key: "ca-en-attente",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "CA en attente",
      description: "Montant TTC des factures non encore payées.",
      href: "/facturesauto",
      aggregation: "sum",
      sumFields: ["montantTTC", "totalTTC", "montantTotal", "total"],
      valueSuffix: "FCFA",
      filters: [
        {
          field: "statutPaiement",
          operator: "notEquals",
          value: "paye",
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
      key: "interventions-terminees",
      type: "kpi",
      moduleKey: "interventionsauto",
      title: "Interventions terminées",
      description: "Travaux finalisés.",
      href: "/interventionsauto",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "terminee",
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
          field: "statutPaiement",
          operator: "equals",
          value: "en_attente",
        },
      ],
    },
    {
      key: "factures-partielles",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "Paiements partiels",
      description: "Factures partiellement réglées.",
      href: "/facturesauto",
      filters: [
        {
          field: "statutPaiement",
          operator: "equals",
          value: "partiel",
        },
      ],
    },
    {
      key: "factures-payees",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "Factures payées",
      description: "Factures encaissées.",
      href: "/facturesauto",
      filters: [
        {
          field: "statutPaiement",
          operator: "equals",
          value: "paye",
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
      key: "dernieres-factures",
      type: "activity",
      moduleKey: "facturesauto",
      title: "Dernières factures",
      description: "Factures atelier récentes.",
      labelField: "numeroFacture",
      dateField: "dateFacture",
      href: "/facturesauto",
      limit: 6,
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
console.log("AMARKHYS dashboard pass 3 finance installed.");
console.log("Done.");
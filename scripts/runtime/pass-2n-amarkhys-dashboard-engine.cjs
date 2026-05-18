const fs = require("fs");
const path = require("path");

const root = process.cwd();

function writeFile(filePath, content) {
  const absolutePath = path.join(root, filePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content, "utf8");
  console.log("WRITTEN", filePath);
}

const typesPath = "src/runtime/dashboard/generic/ERPDashboardTypes.ts";
const enginePath = "src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts";
const configPath = "src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts";

const typesContent = `export type ERPDashboardWidgetType =
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
  | "notEmpty"
  | "in"
  | "notIn"
  | "today"
  | "notToday"
  | "beforeToday"
  | "afterToday"
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
`;

const engineContent = `
import { RuntimeDataBinding } from "@/runtime/data-binding";
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

  const date = new Date(String(value));

  return Number.isNaN(date.getTime()) ? null : date;
}

function startOfDay(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
}

function isSameDay(left: Date, right: Date): boolean {
  return startOfDay(left).getTime() === startOfDay(right).getTime();
}

function dateTimeValue(value: unknown): number {
  const date = toDate(value);

  return date ? date.getTime() : 0;
}

function daysFromNow(value: unknown): number | null {
  const date = toDate(value);

  if (!date) {
    return null;
  }

  const now = new Date();

  const diff = startOfDay(date).getTime() - startOfDay(now).getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function normalizeText(value: unknown): string {
  return String(value ?? "").trim();
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

  if (filter.operator === "notEmpty") {
    return normalizeText(value) !== "";
  }

  if (filter.operator === "in") {
    return Array.isArray(filter.value) && filter.value.includes(value);
  }

  if (filter.operator === "notIn") {
    return Array.isArray(filter.value) && !filter.value.includes(value);
  }

  if (filter.operator === "today") {
    const date = toDate(value);

    return date ? isSameDay(date, new Date()) : false;
  }

  if (filter.operator === "notToday") {
    const date = toDate(value);

    return date ? !isSameDay(date, new Date()) : false;
  }

  if (filter.operator === "beforeToday") {
    const date = toDate(value);

    return date ? startOfDay(date).getTime() < startOfDay(new Date()).getTime() : false;
  }

  if (filter.operator === "afterToday") {
    const date = toDate(value);

    return date ? startOfDay(date).getTime() > startOfDay(new Date()).getTime() : false;
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

function sumRecordFields(
  records: any[],
  fields: string[] = []
): number {
  return records.reduce((total, record) => {
    for (const field of fields) {
      const rawValue = record[field];

      if (rawValue === undefined || rawValue === null || rawValue === "") {
        continue;
      }

      const value = Number(rawValue);

      if (!Number.isNaN(value)) {
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
  const labelField = widget.labelField ?? "nom";

  return String(
    record[labelField] ??
    record.nom ??
    record.prenom ??
    record.codeClient ??
    record.numeroFacture ??
    record.immatriculation ??
    record.marque ??
    record.modele ??
    record.code ??
    record.title ??
    record.motif ??
    record.message ??
    record.typeIntervention ??
    record.id ??
    "Élément"
  );
}

function getRecordDescription(
  record: any,
  widget: ERPDashboardWidgetConfig
): string | undefined {
  const fragments = [
    record.telephone,
    record.immatriculation,
    record.marque && record.modele
      ? String(record.marque) + " " + String(record.modele)
      : undefined,
    record.typeService,
    record.statutFacture
      ? "Facture : " + String(record.statutFacture)
      : undefined,
    record.statutPaiement
      ? "Paiement : " + String(record.statutPaiement)
      : undefined,
    record.statut
      ? "Statut : " + String(record.statut)
      : undefined,
    record.source,
  ].filter(Boolean);

  if (fragments.length > 0) {
    return fragments.join(" · ");
  }

  return widget.description;
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
  const module = resolveDashboardModule(step.moduleKey);

  if (!module) {
    return {
      key: step.key,
      label: step.label,
      value: 0,
      href: step.href,
      conversionRate: 0,
    };
  }

  const records = await RuntimeDataBinding.list(module);
  const filtered = applyFilters(records, step.filters);
  const value = filtered.length;

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
    const result = await resolveFunnelStep(step, previousValue);

    results.push(result);
    previousValue = result.value;
  }

  const first = results[0]?.value ?? 0;
  const last = results[results.length - 1]?.value ?? 0;

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
`;

let config = fs.readFileSync(path.join(root, configPath), "utf8");

config = config
  .replaceAll("vÃ©hicules", "véhicules")
  .replaceAll("activitÃ©", "activité")
  .replaceAll("financiÃ¨re", "financière")
  .replaceAll("AccÃ¨s", "Accès")
  .replaceAll("opÃ©rations", "opérations")
  .replaceAll("CrÃ©er", "Créer")
  .replaceAll("lâ€™activitÃ©", "l’activité")
  .replaceAll("confirmÃ©s", "confirmés")
  .replaceAll("planifiÃ©s", "planifiés")
  .replaceAll("Ãªtre", "être")
  .replaceAll("Ã ", "à")
  .replaceAll("dÃ©jÃ ", "déjà")
  .replaceAll("impayÃ©es", "impayées")
  .replaceAll("rÃ©glÃ©es", "réglées")
  .replaceAll("Ã‰chÃ©ances", "Échéances")
  .replaceAll("Ã©chÃ©ances", "échéances")
  .replaceAll("dâ€™Ã©chÃ©ances", "d’échéances")
  .replaceAll("dÃ©passÃ©es", "dépassées")
  .replaceAll("prÃ©vus", "prévus")
  .replaceAll("nÃ©cessitant", "nécessitant")
  .replaceAll("Ã© venir", "à venir")
  .replaceAll("PayÃ©es", "Payées")
  .replaceAll("encaissÃ©", "encaissé")
  .replaceAll("payÃ©es", "payées")
  .replaceAll("rÃ©centes", "récentes")
  .replaceAll("DerniÃ¨res", "Dernières")
  .replaceAll("crÃ©Ã©s", "créés")
  .replaceAll("VÃ©hicules", "Véhicules")
  .replaceAll("Rappels Ã  traiter", "Rappels à traiter")
  .replaceAll("exÃ©cuter", "exécuter")
  .replaceAll("aujourdâ€™hui", "aujourd’hui")
  .replaceAll("lâ€™atelier", "l’atelier")
  .replaceAll("rÃ©gl", "régl");

const insertion = `
    {
      key: "rdv-du-jour",
      type: "kpi",
      moduleKey: "rendezvous",
      title: "RDV du jour",
      description: "Rendez-vous prévus aujourd’hui.",
      href: "/rendezvous",
      filters: [
        {
          field: "dateRendezVous",
          operator: "today",
        },
        {
          field: "statut",
          operator: "notIn",
          value: ["annule", "annulee"],
        },
      ],
    },
    {
      key: "liste-rdv-du-jour",
      type: "timeline",
      moduleKey: "rendezvous",
      title: "Planning du jour",
      description: "Rendez-vous à traiter aujourd’hui.",
      labelField: "motif",
      dateField: "dateRendezVous",
      href: "/rendezvous",
      limit: 8,
      filters: [
        {
          field: "dateRendezVous",
          operator: "today",
        },
        {
          field: "statut",
          operator: "notIn",
          value: ["annule", "annulee"],
        },
      ],
    },
    {
      key: "clients-actifs",
      type: "kpi",
      moduleKey: "clientsauto",
      title: "Clients actifs",
      description: "Clients non archivés dans le portefeuille AMARKHYS.",
      href: "/clientsauto",
      filters: [
        {
          field: "statut",
          operator: "notEquals",
          value: "archive",
        },
      ],
    },
    {
      key: "vehicules-actifs",
      type: "kpi",
      moduleKey: "vehicules",
      title: "Véhicules actifs",
      description: "Véhicules non archivés suivis par le garage.",
      href: "/vehicules",
      filters: [
        {
          field: "statut",
          operator: "notEquals",
          value: "archive",
        },
      ],
    },
    {
      key: "encaissements-recents",
      type: "activity",
      moduleKey: "encaissementsauto",
      title: "Encaissements récents",
      description: "Derniers règlements enregistrés.",
      labelField: "referencePaiement",
      dateField: "datePaiement",
      href: "/encaissementsauto",
      limit: 8,
      filters: [
        {
          field: "statut",
          operator: "notEquals",
          value: "annule",
        },
      ],
    },
`;

if (!config.includes('key: "rdv-du-jour"')) {
  config = config.replace(
    '    {\n      key: "quick-actions",',
    insertion + '\n    {\n      key: "quick-actions",'
  );
}

config = config.replaceAll(
  `{
          field: "statutPaiement",
          operator: "notEquals",
          value: "paye",
        },`,
  `{
          field: "statutPaiement",
          operator: "notEquals",
          value: "paye",
        },
        {
          field: "statutFacture",
          operator: "notEquals",
          value: "annulee",
        },`
);

config = config.replaceAll(
  `{
          field: "statutPaiement",
          operator: "equals",
          value: "en_attente",
        },`,
  `{
          field: "statutPaiement",
          operator: "equals",
          value: "en_attente",
        },
        {
          field: "statutFacture",
          operator: "notEquals",
          value: "annulee",
        },`
);

config = config.replaceAll(
  `{
          field: "statutPaiement",
          operator: "equals",
          value: "partiel",
        },`,
  `{
          field: "statutPaiement",
          operator: "equals",
          value: "partiel",
        },
        {
          field: "statutFacture",
          operator: "notEquals",
          value: "annulee",
        },`
);

config = config.replaceAll(
  `{
          field: "statutPaiement",
          operator: "equals",
          value: "paye",
        },`,
  `{
          field: "statutPaiement",
          operator: "equals",
          value: "paye",
        },
        {
          field: "statutFacture",
          operator: "notEquals",
          value: "annulee",
        },`
);

writeFile(typesPath, typesContent);
writeFile(enginePath, engineContent);
writeFile(configPath, config);

console.log("PASS 2N-A OK: AMARKHYS dashboard engine strengthened.");
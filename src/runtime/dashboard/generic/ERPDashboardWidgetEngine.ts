import { RuntimeDataBinding } from "@/runtime/data-binding";
import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";
import { resolveDashboardModule } from "./ERPDashboardModuleResolver";
import type {
  ERPDashboardConfig,
  ERPDashboardFilter,
  ERPDashboardFunnelStepConfig,
  ERPDashboardFunnelStepResult,
  ERPDashboardWidgetConfig,
  ERPDashboardWidgetResult,
} from "./ERPDashboardTypes";

type RecordData = Record<string, unknown>;

const relationLabelCache = new Map<string, string>();
const relationOptionsCache = new Map<string, Array<{ id: string; label: string }>>();

function readValue(record: RecordData, field: string): unknown {
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
    return new Date(Number((value as { seconds: number }).seconds) * 1000);
  }

  const date = new Date(String(value));

  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value: unknown): string {
  const date = toDate(value);

  if (!date) {
    return "";
  }

  return date.toLocaleDateString("fr-FR");
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

function formatMoney(value: unknown): string {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "";
  }

  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return String(value);
  }

  return amount.toLocaleString("fr-FR") + " FCFA";
}

function compact(...parts: Array<string | undefined>): string {
  return parts
    .map((part) => String(part ?? "").trim())
    .filter(Boolean)
    .join(" · ");
}

function isLikelyTechnicalId(value: unknown): boolean {
  const text = String(value ?? "").trim();

  if (!text) {
    return false;
  }

  if (/^[A-Za-z0-9_-]{16,}$/.test(text)) {
    return true;
  }

  if (/^[0-9a-f]{20,}$/i.test(text)) {
    return true;
  }

  return false;
}

function relationFragment(
  label: string,
  relationLabel: string,
  relationId: unknown
): string | undefined {
  const id = String(relationId ?? "").trim();
  const value = String(relationLabel ?? "").trim();

  if (!id) {
    return undefined;
  }

  if (!value || value === id || isLikelyTechnicalId(value)) {
    return label + " introuvable";
  }

  return label + " : " + value;
}

async function resolveRelationLabel(
  moduleKey: string,
  id: unknown
): Promise<string> {
  const relationId = String(id ?? "").trim();

  if (!moduleKey || !relationId) {
    return "";
  }

  const cacheKey = moduleKey + ":" + relationId;
  const cached = relationLabelCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  let resolved = "";

  try {
    const directLabel = await ERPRelationDataLoader.resolveLabel(
      moduleKey,
      relationId
    );

    if (directLabel && directLabel !== relationId) {
      resolved = directLabel;
    }
  } catch {
    resolved = "";
  }

  if (!resolved) {
    try {
      let options = relationOptionsCache.get(moduleKey);

      if (!options) {
        options = await ERPRelationDataLoader.load(moduleKey);
        relationOptionsCache.set(moduleKey, options);
      }

      const match = options.find(
        (option) => String(option.id) === relationId
      );

      if (match?.label && match.label !== relationId) {
        resolved = match.label;
      }
    } catch {
      resolved = "";
    }
  }

  if (!resolved) {
    resolved = relationId;
  }

  relationLabelCache.set(cacheKey, resolved);

  return resolved;
}

function matchFilter(record: RecordData, filter: ERPDashboardFilter): boolean {
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

    return date
      ? startOfDay(date).getTime() < startOfDay(new Date()).getTime()
      : false;
  }

  if (filter.operator === "afterToday") {
    const date = toDate(value);

    return date
      ? startOfDay(date).getTime() > startOfDay(new Date()).getTime()
      : false;
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
  records: RecordData[],
  filters?: ERPDashboardFilter[]
): RecordData[] {
  if (!filters || filters.length === 0) {
    return records;
  }

  return records.filter((record) =>
    filters.every((filter) => matchFilter(record, filter))
  );
}

function sumRecordFields(
  records: RecordData[],
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
  record: RecordData,
  widget: ERPDashboardWidgetConfig
): string {
  const labelField = widget.labelField ?? "nom";

  const explicitLabel = normalizeText(record[labelField]);

  if (explicitLabel) {
    return explicitLabel;
  }

  const clientName = compact(
    normalizeText(record.prenom),
    normalizeText(record.nom)
  );

  if (clientName) {
    return clientName;
  }

  const vehicleName = compact(
    normalizeText(record.marque),
    normalizeText(record.modele),
    normalizeText(record.immatriculation)
  );

  if (vehicleName) {
    return vehicleName;
  }

  return String(
    record.numeroFacture ??
    record.referenceTransaction ??
    record.referencePaiement ??
    record.reference ??
    record.codeClient ??
    record.immatriculation ??
    record.code ??
    record.title ??
    record.motif ??
    record.message ??
    record.typeIntervention ??
    record.id ??
    "Élément"
  );
}

async function getRecordDescription(
  record: RecordData,
  widget: ERPDashboardWidgetConfig
): Promise<string | undefined> {
  const clientLabel = await resolveRelationLabel("clientsauto", record.clientId);
  const vehicleLabel = await resolveRelationLabel("vehicules", record.vehiculeId);
  const invoiceLabel = await resolveRelationLabel("facturesauto", record.factureId);
  const interventionLabel = await resolveRelationLabel("interventionsauto", record.interventionId);
  const appointmentLabel = await resolveRelationLabel("rendezvous", record.rendezVousId);

  const amount =
    formatMoney(record.montant) ||
    formatMoney(record.montantTTC) ||
    formatMoney(record.resteAPayer) ||
    formatMoney(record.montantPrevu);

  const date =
    formatDate(record.datePaiement) ||
    formatDate(record.dateFacture) ||
    formatDate(record.dateEcheance) ||
    formatDate(record.dateIntervention) ||
    formatDate(record.dateRendezVous);

  const fragments = [
    relationFragment("Client", clientLabel, record.clientId),
    relationFragment("Véhicule", vehicleLabel, record.vehiculeId),
    relationFragment("Facture", invoiceLabel, record.factureId),
    relationFragment("Intervention", interventionLabel, record.interventionId),
    relationFragment("RDV", appointmentLabel, record.rendezVousId),
    amount ? "Montant : " + amount : undefined,
    date ? "Date : " + date : undefined,
    record.statutFacture ? "Statut facture : " + String(record.statutFacture) : undefined,
    record.statutPaiement ? "Paiement : " + String(record.statutPaiement) : undefined,
    record.statut ? "Statut : " + String(record.statut) : undefined,
    record.source ? "Source : " + String(record.source) : undefined,
  ].filter(Boolean);

  if (fragments.length > 0) {
    return fragments.join(" · ");
  }

  return widget.description;
}

function getRecordHref(
  record: RecordData,
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

async function resolveItems(
  records: RecordData[],
  widget: ERPDashboardWidgetConfig
) {
  const items = [];

  for (const record of records.slice(0, widget.limit ?? 8)) {
    items.push({
      id: String(record.id),
      title: getRecordLabel(record, widget),
      description: await getRecordDescription(record, widget),
      date: widget.dateField
        ? String(record[widget.dateField] ?? "")
        : undefined,
      level: widget.level ?? "info",
      href: getRecordHref(record, widget),
    });
  }

  return items;
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

    return {
      key: widget.key,
      type: widget.type,
      title: widget.title,
      description: widget.description,
      href: widget.href,
      items: await resolveItems(sorted, widget),
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

const fs = require("fs");
const path = require("path");

const root = process.cwd();

function writeFile(filePath, content) {
  const absolutePath = path.join(root, filePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content, "utf8");
  console.log("WRITTEN", filePath);
}

writeFile(
  "src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts",
`import { RuntimeDataBinding } from "@/runtime/data-binding";
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

  const label = await ERPRelationDataLoader.resolveLabel(
    moduleKey,
    relationId
  );

  const resolved = label || relationId;
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
    clientLabel ? "Client : " + clientLabel : undefined,
    vehicleLabel ? "Véhicule : " + vehicleLabel : undefined,
    invoiceLabel ? "Facture : " + invoiceLabel : undefined,
    interventionLabel ? "Intervention : " + interventionLabel : undefined,
    appointmentLabel ? "RDV : " + appointmentLabel : undefined,
    amount ? "Montant : " + amount : undefined,
    date ? "Date : " + date : undefined,
    record.statutFacture ? "Facture : " + String(record.statutFacture) : undefined,
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
`
);

writeFile(
  "src/runtime/modules/lifecycle/ERPRelationDataLoader.ts",
`import { RuntimeDataBinding } from "@/runtime/data-binding";

import { allERPModules } from "../definitions/coreModules";

export class ERPRelationDataLoader {
  static async load(moduleKey: string) {
    const module = allERPModules.find(
      (item) => item.metadata.key === moduleKey
    );

    if (!module) {
      return [];
    }

    const records =
      await RuntimeDataBinding.list(module);

    return records.map((record) => ({
      id: String(record.id),
      label: ERPRelationDataLoader.getLabel(
        record as Record<string, unknown>
      ),
      record: record as Record<string, unknown>,
    }));
  }

  static async resolveLabel(
    moduleKey: string,
    id: string
  ): Promise<string> {
    if (!moduleKey || !id) {
      return "";
    }

    const module = allERPModules.find(
      (item) => item.metadata.key === moduleKey
    );

    if (!module) {
      return "";
    }

    try {
      const record =
        await RuntimeDataBinding.detail(
          module,
          id
        );

      if (!record) {
        return "";
      }

      const label =
        ERPRelationDataLoader.getLabel(
          record as Record<string, unknown>
        );

      return label || id;
    } catch {
      return id;
    }
  }

  static getLabel(
    record: Record<string, unknown>
  ): string {
    const value = (key: string) =>
      String(record[key] ?? "").trim();

    const compact = (...parts: string[]) =>
      parts
        .filter((part) => Boolean(part && part.trim()))
        .join(" · ")
        .trim();

    const money = (key: string) => {
      const raw =
        record[key];

      if (
        raw === null ||
        raw === undefined ||
        raw === ""
      ) {
        return "";
      }

      const amount =
        Number(raw);

      if (Number.isNaN(amount)) {
        return String(raw);
      }

      return amount.toLocaleString("fr-FR") + " FCFA";
    };

    const id = value("id");

    const numeroFacture =
      value("numeroFacture");

    const referenceTransaction =
      value("referenceTransaction");

    const referencePaiement =
      value("referencePaiement");

    const reference =
      value("reference");

    const numero =
      value("numero");

    const montant =
      money("montant");

    const montantTTC =
      money("montantTTC");

    const resteAPayer =
      money("resteAPayer");

    const factureNumber =
      numeroFacture || referenceTransaction || referencePaiement || reference || numero;

    if (factureNumber) {
      const amount = montant || montantTTC || resteAPayer;
      return compact(factureNumber, amount);
    }

    const marque =
      value("marque");

    const modele =
      value("modele");

    const immatriculation =
      value("immatriculation");

    const vehiculeLabel =
      compact(
        compact(marque, modele),
        immatriculation
      );

    if (vehiculeLabel) {
      return vehiculeLabel;
    }

    const nom =
      value("nom");

    const prenom =
      value("prenom");

    const raisonSociale =
      value("raisonSociale");

    const codeClient =
      value("codeClient");

    const personneLabel =
      compact(
        compact(prenom, nom),
        codeClient
      );

    if (personneLabel) {
      return personneLabel;
    }

    if (raisonSociale) {
      return compact(raisonSociale, codeClient);
    }

    const typeIntervention =
      value("typeIntervention");

    const dateIntervention =
      value("dateIntervention");

    if (typeIntervention) {
      return compact(typeIntervention, dateIntervention);
    }

    const motif =
      value("motif");

    const dateRendezVous =
      value("dateRendezVous");

    if (motif) {
      return compact(motif, dateRendezVous);
    }

    const name =
      value("name");

    const label =
      value("label");

    const titre =
      value("titre");

    const libelle =
      value("libelle");

    if (name) {
      return name;
    }

    if (label) {
      return label;
    }

    if (libelle) {
      return libelle;
    }

    if (titre) {
      return titre;
    }

    const code =
      value("code");

    const typeContrat =
      value("typeContrat");

    const referenceLabel =
      compact(
        typeContrat,
        reference || numero
      );

    if (referenceLabel) {
      return referenceLabel;
    }

    if (code) {
      return code;
    }

    const commune =
      value("commune");

    const adresse =
      value("adresse");

    const typeExploitation =
      value("typeExploitation");

    const localisationLabel =
      compact(
        commune,
        adresse
      );

    if (localisationLabel) {
      return localisationLabel;
    }

    if (typeExploitation) {
      return typeExploitation;
    }

    const designation =
      value("designation");

    const produit =
      value("produit");

    if (designation) {
      return designation;
    }

    if (produit) {
      return produit;
    }

    const telephone =
      value("telephone");

    const phone =
      value("phone");

    const email =
      value("email");

    if (telephone) {
      return telephone;
    }

    if (phone) {
      return phone;
    }

    if (email) {
      return email;
    }

    return id;
  }
}
`
);

console.log("PASS 2N-E OK: dashboard business labels strengthened.");
import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { clientsautoModule } from "@/runtime/modules/generated/clientsauto/clientsauto.module";
import { vehiculesModule } from "@/runtime/modules/generated/vehicules/vehicules.module";
import { rendezvousModule } from "@/runtime/modules/generated/rendezvous/rendezvous.module";
import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto/interventionsauto.module";
import { lignesinterventionautoModule } from "@/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module";
import { facturesautoModule } from "@/runtime/modules/generated/facturesauto/facturesauto.module";
import { encaissementsautoModule } from "@/runtime/modules/generated/encaissementsauto/encaissementsauto.module";
import type { ERPModule } from "@/runtime/modules/ERPModule";
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "./RuntimeHubTypes";

export type RuntimeClientOperationalHubLoadResult = {
  config: ERPRecordHubConfig;
  rootRecord: ERPRecordHubRecord | null;
  primaryRecords: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
};

export type RuntimeClientOperationalHubLoaderInput = {
  config: ERPRecordHubConfig;
  clientId?: string | null;
  selectedVehicleId?: string | null;
};

function normalizeRecord(record: unknown): ERPRecordHubRecord | null {
  if (!record || typeof record !== "object") {
    return null;
  }

  return record as ERPRecordHubRecord;
}

function normalizeRecords(records: unknown): ERPRecordHubRecord[] {
  if (!Array.isArray(records)) {
    return [];
  }

  return records.filter((record): record is ERPRecordHubRecord => {
    return !!record && typeof record === "object";
  });
}

function moduleLabel(module: ERPModule): string {
  return module.metadata?.key ?? "unknown-module";
}

async function safeDetail(
  module: ERPModule,
  recordId: string
): Promise<ERPRecordHubRecord | null> {
  try {
    return normalizeRecord(await RuntimeDataBinding.detail(module, recordId));
  } catch (error) {
    console.warn(
      "[RuntimeClientOperationalHubLoader] detail failed:",
      moduleLabel(module),
      recordId,
      error
    );

    return null;
  }
}

async function safeList(module: ERPModule): Promise<ERPRecordHubRecord[]> {
  try {
    return normalizeRecords(await RuntimeDataBinding.list(module));
  } catch (error) {
    console.warn(
      "[RuntimeClientOperationalHubLoader] list failed:",
      moduleLabel(module),
      error
    );

    return [];
  }
}

function readFirstString(record: ERPRecordHubRecord, fields: string[]): string {
  for (const field of fields) {
    const value = record[field];

    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
  }

  return "";
}

function readNumber(record: ERPRecordHubRecord, fields: string[]): number {
  for (const field of fields) {
    const value = record[field];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string") {
      const normalized = Number(value.replace(",", "."));
      if (Number.isFinite(normalized)) {
        return normalized;
      }
    }
  }

  return 0;
}

function sumRecords(records: ERPRecordHubRecord[], fields: string[]): number {
  return records.reduce((total, record) => total + readNumber(record, fields), 0);
}

function parseDateValue(value: unknown): number | null {
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value).getTime();
    return Number.isFinite(parsed) ? parsed : null;
  }

  if (value && typeof value === "object") {
    const maybeDate = value as { seconds?: number; toDate?: () => Date };

    if (typeof maybeDate.toDate === "function") {
      const parsed = maybeDate.toDate().getTime();
      return Number.isFinite(parsed) ? parsed : null;
    }

    if (typeof maybeDate.seconds === "number") {
      return maybeDate.seconds * 1000;
    }
  }

  return null;
}

function readDate(record: ERPRecordHubRecord, fields: string[]): number | null {
  for (const field of fields) {
    const parsed = parseDateValue(record[field]);
    if (parsed !== null) {
      return parsed;
    }
  }

  return null;
}

function formatDate(timestamp: number | null): string {
  if (!timestamp) {
    return "";
  }

  return new Date(timestamp).toISOString().slice(0, 10);
}

function buildBusinessLabel(record: ERPRecordHubRecord, fallback: string): string {
  const label = readFirstString(record, [
    "displayLabel",
    "label",
    "libelle",
    "libell\u00e9",
    "raisonSociale",
    "nomComplet",
    "nom",
    "prenom",
    "pr\u00e9nom",
    "immatriculation",
    "marque",
    "modele",
    "mod\u00e8le",
    "numero",
    "num\u00e9ro",
    "numeroFacture",
    "num\u00e9roFacture",
    "numeroIntervention",
    "num\u00e9roIntervention",
    "dateIntervention",
    "dateRendezVous",
    "designation",
    "d\u00e9signation",
    "titre",
    "title",
    "codeClient",
    "code",
    "reference",
    "r\u00e9f\u00e9rence",
  ]);

  return label || fallback;
}

function enrichRecord(
  record: ERPRecordHubRecord,
  fallback: string
): ERPRecordHubRecord {
  const label = buildBusinessLabel(record, fallback);

  return {
    ...record,
    label,
    displayLabel: label,
    titre: label,
  };
}

function findById(
  records: ERPRecordHubRecord[],
  id?: string | null
): ERPRecordHubRecord | null {
  if (!id) {
    return null;
  }

  return records.find((record) => String(record.id ?? "") === String(id)) ?? null;
}

function filterByAnyKey(
  records: ERPRecordHubRecord[],
  keys: string[],
  value: string
): ERPRecordHubRecord[] {
  return records.filter((record) => {
    return keys.some((key) => String(record[key] ?? "") === value);
  });
}

function isClosedStatus(record: ERPRecordHubRecord): boolean {
  const status = String(record.statut ?? record.status ?? record.etat ?? "")
    .trim()
    .toLowerCase();

  if (!status) {
    return false;
  }

  return [
    "terminee",
    "termin\u00e9e",
    "cloturee",
    "cl\u00f4tur\u00e9e",
    "annulee",
    "annul\u00e9e",
    "archivee",
    "archiv\u00e9e",
    "payee",
    "pay\u00e9e",
    "reglee",
    "r\u00e9gl\u00e9e",
  ].includes(status);
}

function isPaidInvoice(record: ERPRecordHubRecord): boolean {
  const status = String(record.statut ?? record.status ?? record.etat ?? "")
    .trim()
    .toLowerCase();

  return [
    "payee",
    "pay\u00e9e",
    "reglee",
    "r\u00e9gl\u00e9e",
    "soldee",
    "sold\u00e9e",
  ].includes(status);
}


function normalizeFinancialStatus(record: ERPRecordHubRecord): string {
  return String(record.statut ?? record.status ?? record.etat ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isCancelledFinancialRecord(record: ERPRecordHubRecord): boolean {
  const status = normalizeFinancialStatus(record);

  return [
    "annulee",
    "annule",
    "cancelled",
    "canceled",
    "supprimee",
    "removed",
  ].includes(status);
}

function isDraftFinancialRecord(record: ERPRecordHubRecord): boolean {
  const status = normalizeFinancialStatus(record);

  return [
    "brouillon",
    "draft",
  ].includes(status);
}

function invoiceTotalAmount(invoice: ERPRecordHubRecord): number {
  return readNumber(invoice, [
    "montantTTC",
    "totalTTC",
    "montantTotal",
    "total",
    "montant",
    "amount",
  ]);
}

function invoiceExplicitRemainingAmount(invoice: ERPRecordHubRecord): number {
  return readNumber(invoice, [
    "resteAPayer",
    "reste\u00c0Payer",
    "resteARegler",
    "solde",
    "montantRestant",
    "balanceDue",
  ]);
}

function paymentAmount(payment: ERPRecordHubRecord): number {
  return readNumber(payment, [
    "montantEncaisse",
    "montantEncaiss\u00e9",
    "montantPaye",
    "montantPay\u00e9",
    "montant",
    "amount",
    "total",
  ]);
}

function invoiceLinkedPayments(
  invoice: ERPRecordHubRecord,
  payments: ERPRecordHubRecord[]
): ERPRecordHubRecord[] {
  const invoiceId = String(invoice.id ?? "");

  if (!invoiceId) {
    return [];
  }

  return payments.filter((payment) => {
    if (isCancelledFinancialRecord(payment)) {
      return false;
    }

    return [
      "factureId",
      "invoiceId",
      "factureAutoId",
      "facturesautoId",
    ].some((key) => String(payment[key] ?? "") === invoiceId);
  });
}

function invoicePaidAmount(
  invoice: ERPRecordHubRecord,
  payments: ERPRecordHubRecord[]
): number {
  return sumRecords(invoiceLinkedPayments(invoice, payments), [
    "montantEncaisse",
    "montantEncaiss\u00e9",
    "montantPaye",
    "montantPay\u00e9",
    "montant",
    "amount",
    "total",
  ]);
}

function invoiceRemainingAmount(
  invoice: ERPRecordHubRecord,
  payments: ERPRecordHubRecord[]
): number {
  if (isCancelledFinancialRecord(invoice)) {
    return 0;
  }

  if (isPaidInvoice(invoice)) {
    return 0;
  }

  const total = invoiceTotalAmount(invoice);
  const explicitRemaining = invoiceExplicitRemainingAmount(invoice);

  if (explicitRemaining > 0) {
    return Math.max(explicitRemaining, 0);
  }

  const paid = invoicePaidAmount(invoice, payments);

  return Math.max(total - paid, 0);
}

function buildClientLabel(client: ERPRecordHubRecord): string {
  const company = readFirstString(client, ["raisonSociale", "societe", "soci\u00e9t\u00e9"]);
  if (company) {
    return company;
  }

  const firstName = readFirstString(client, ["prenom", "pr\u00e9nom"]);
  const lastName = readFirstString(client, ["nom"]);

  const fullName = [lastName, firstName].filter(Boolean).join(" ").trim();

  return fullName || buildBusinessLabel(client, "Client");
}

function vehicleDate(record: ERPRecordHubRecord): number | null {
  return readDate(record, [
    "dateIntervention",
    "dateRendezVous",
    "dateFacture",
    "dateEncaissement",
    "createdAt",
    "updatedAt",
  ]);
}

function buildActivityRecord(
  type: string,
  record: ERPRecordHubRecord,
  fallback: string
): ERPRecordHubRecord {
  const label = buildBusinessLabel(record, fallback);
  const date = vehicleDate(record);

  return {
    ...record,
    activityType: type,
    activityDate: formatDate(date),
    activityTimestamp: date ?? 0,
    label,
    displayLabel: label,
    titre: label,
  };
}

function sortByActivityDesc(records: ERPRecordHubRecord[]): ERPRecordHubRecord[] {
  return [...records].sort((a, b) => {
    return readNumber(b, ["activityTimestamp"]) - readNumber(a, ["activityTimestamp"]);
  });
}

function sortByDateAsc(records: ERPRecordHubRecord[]): ERPRecordHubRecord[] {
  return [...records].sort((a, b) => {
    const dateA = vehicleDate(a) ?? Number.MAX_SAFE_INTEGER;
    const dateB = vehicleDate(b) ?? Number.MAX_SAFE_INTEGER;
    return dateA - dateB;
  });
}

function enrichClientRoot(
  client: ERPRecordHubRecord,
  vehicles: ERPRecordHubRecord[],
  appointments: ERPRecordHubRecord[],
  interventions: ERPRecordHubRecord[],
  invoices: ERPRecordHubRecord[],
  payments: ERPRecordHubRecord[],
  recentActivity: ERPRecordHubRecord[],
  upcomingAppointments: ERPRecordHubRecord[]
): ERPRecordHubRecord {
  const now = Date.now();

  const activeInterventions = interventions.filter((record) => !isClosedStatus(record));

  const validInvoices = invoices.filter((record) => {
    return !isCancelledFinancialRecord(record) && !isDraftFinancialRecord(record);
  });

  const validPayments = payments.filter((record) => {
    return !isCancelledFinancialRecord(record);
  });

  const unpaidInvoices = validInvoices.filter((record) => {
    return invoiceRemainingAmount(record, validPayments) > 0;
  });

  const revenueTotal = validInvoices.reduce((total, invoice) => {
    return total + invoiceTotalAmount(invoice);
  }, 0);

  const paidTotal = validPayments.reduce((total, payment) => {
    return total + paymentAmount(payment);
  }, 0);

  const unpaidInvoicesAmount = validInvoices.reduce((total, invoice) => {
    return total + invoiceRemainingAmount(invoice, validPayments);
  }, 0);

  const visitDates = [
    ...interventions.map(vehicleDate),
    ...appointments.map(vehicleDate),
    ...invoices.map(vehicleDate),
  ].filter((value): value is number => typeof value === "number" && value <= now);

  const futureAppointmentDates = appointments
    .map(vehicleDate)
    .filter((value): value is number => typeof value === "number" && value >= now);

  const lastVisitTimestamp = visitDates.length > 0 ? Math.max(...visitDates) : null;
  const nextAppointmentTimestamp =
    futureAppointmentDates.length > 0 ? Math.min(...futureAppointmentDates) : null;

  const clientLabel = buildClientLabel(client);
  const clientType = readFirstString(client, [
    "typeClient",
    "categorieClient",
    "cat\u00e9gorieClient",
    "type",
    "categorie",
    "cat\u00e9gorie",
  ]);

  return {
    ...client,
    label: clientLabel,
    displayLabel: clientLabel,
    titre: clientLabel,
    clientLabel,
    clientType,

    vehiclesCount: vehicles.length,
    vehiculesCount: vehicles.length,
    nombreVehicules: vehicles.length,

    activeInterventionsCount: activeInterventions.length,
    activeInterventions: activeInterventions.length,
    interventionsActives: activeInterventions.length,

    unpaidInvoicesCount: unpaidInvoices.length,
    unpaidInvoices: unpaidInvoices.length,
    facturesImpayees: unpaidInvoices.length,

    unpaidInvoicesAmount,
    montantImpayees: unpaidInvoicesAmount,

    revenueTotal,
    chiffreAffaires: revenueTotal,
    caCumule: revenueTotal,

    paidTotal,
    montantEncaisse: paidTotal,
    montantEncaiss\u00e9: paidTotal,

    remainingAmount: unpaidInvoicesAmount,
    resteAEncaisser: unpaidInvoicesAmount,
    reste\u00c0Encaisser: unpaidInvoicesAmount,

    lastVisit: formatDate(lastVisitTimestamp),
    derniereVisite: formatDate(lastVisitTimestamp),

    nextAppointment: formatDate(nextAppointmentTimestamp),
    prochainRendezVous: formatDate(nextAppointmentTimestamp),

    recentActivity,
    activiteRecente: recentActivity,

    upcomingAppointments,
    prochainsRendezVous: upcomingAppointments,

    businessBenefits: [
      "Vue 360\u00b0 du client en un coup d\u2019\u0153il",
      "Meilleure relation client et r\u00e9activit\u00e9",
      "Suivi clair des impay\u00e9s et du CA",
      "Gain de temps pour vos \u00e9quipes",
      "D\u00e9cisions bas\u00e9es sur des donn\u00e9es r\u00e9elles",
    ],
  };
}

function emptyResult(config: ERPRecordHubConfig): RuntimeClientOperationalHubLoadResult {
  return {
    config,
    rootRecord: null,
    primaryRecords: [],
    relatedRecordsBySection: {
      rendezvous: [],
      interventions: [],
      lignes: [],
      factures: [],
      encaissements: [],
      recentActivity: [],
      upcomingAppointments: [],
    },
  };
}

export class RuntimeClientOperationalHubLoader {
  static async load(
    input: RuntimeClientOperationalHubLoaderInput
  ): Promise<RuntimeClientOperationalHubLoadResult> {
    let rootRecord: ERPRecordHubRecord | null = null;

    if (input.clientId) {
      rootRecord = await safeDetail(clientsautoModule, input.clientId);
    }

    if (!rootRecord) {
      const clients = await safeList(clientsautoModule);

      rootRecord = input.clientId
        ? clients.find((record) => String(record.id ?? "") === String(input.clientId)) ?? null
        : clients[0] ?? null;
    }

    if (!rootRecord) {
      return emptyResult(input.config);
    }

    const clientId = String(rootRecord.id ?? input.clientId ?? "");

    const [
      vehiclesRaw,
      appointmentsRaw,
      interventionsRaw,
      linesRaw,
      invoicesRaw,
      paymentsRaw
    ] = await Promise.all([
      safeList(vehiculesModule),
      safeList(rendezvousModule),
      safeList(interventionsautoModule),
      safeList(lignesinterventionautoModule),
      safeList(facturesautoModule),
      safeList(encaissementsautoModule)
    ]);

    const vehicles = vehiclesRaw
      .filter((record) => {
        return [
          input.config.primaryCollection.foreignKey,
          "clientId",
          "proprietaireId",
          "ownerId",
        ].some((key) => String(record[key] ?? "") === clientId);
      })
      .map((record) => enrichRecord(record, "V\u00e9hicule"));

    const vehicleIds = new Set(
      vehicles.map((record) => String(record.id ?? "")).filter(Boolean)
    );

    const appointments = appointmentsRaw
      .filter((record) => {
        const byClient = String(record.clientId ?? "") === clientId;
        const byVehicle = vehicleIds.has(String(record.vehiculeId ?? record.vehicleId ?? ""));
        return byClient || byVehicle;
      })
      .map((record) => enrichRecord(record, "Rendez-vous"));

    const interventions = interventionsRaw
      .filter((record) => {
        const byClient = String(record.clientId ?? "") === clientId;
        const byVehicle = vehicleIds.has(String(record.vehiculeId ?? record.vehicleId ?? ""));
        return byClient || byVehicle;
      })
      .map((record) => enrichRecord(record, "Intervention"));

    const interventionIds = new Set(
      interventions.map((record) => String(record.id ?? "")).filter(Boolean)
    );

    const invoices = invoicesRaw
      .filter((record) => {
        const byClient = String(record.clientId ?? "") === clientId;
        const byVehicle = vehicleIds.has(String(record.vehiculeId ?? record.vehicleId ?? ""));
        const byIntervention = interventionIds.has(String(record.interventionId ?? ""));
        return byClient || byVehicle || byIntervention;
      })
      .map((record) => enrichRecord(record, "Facture"));

    const invoiceIds = new Set(
      invoices.map((record) => String(record.id ?? "")).filter(Boolean)
    );

    const payments = paymentsRaw
      .filter((record) => {
        const byClient = String(record.clientId ?? "") === clientId;
        const byVehicle = vehicleIds.has(String(record.vehiculeId ?? record.vehicleId ?? ""));
        const byInvoice = invoiceIds.has(String(record.factureId ?? ""));
        return byClient || byVehicle || byInvoice;
      })
      .map((record) => enrichRecord(record, "Encaissement"));

    const selectedVehicle =
      findById(vehicles, input.selectedVehicleId) ?? vehicles[0] ?? null;

    const selectedVehicleId = String(
      selectedVehicle?.id ?? input.selectedVehicleId ?? ""
    );

    const selectedVehicleInterventions = selectedVehicleId
      ? filterByAnyKey(interventions, ["vehiculeId", "vehicleId"], selectedVehicleId)
      : [];

    const selectedVehicleAppointments = selectedVehicleId
      ? filterByAnyKey(appointments, ["vehiculeId", "vehicleId"], selectedVehicleId)
      : [];

    const selectedVehicleInvoices = selectedVehicleId
      ? invoices.filter((invoice) => {
          const directVehicle = ["vehiculeId", "vehicleId"].some(
            (key) => String(invoice[key] ?? "") === selectedVehicleId
          );

          const interventionMatch = selectedVehicleInterventions.some(
            (intervention) =>
              String(invoice.interventionId ?? "") === String(intervention.id ?? "")
          );

          return directVehicle || interventionMatch;
        })
      : [];

    const selectedInterventionIds = new Set(
      selectedVehicleInterventions.map((record) => String(record.id ?? "")).filter(Boolean)
    );

    const selectedInvoiceIds = new Set(
      selectedVehicleInvoices.map((record) => String(record.id ?? "")).filter(Boolean)
    );

    const selectedVehicleLines = linesRaw
      .filter((record) => selectedInterventionIds.has(String(record.interventionId ?? "")))
      .map((record) => enrichRecord(record, "Ligne d'intervention"));

    const selectedVehiclePayments = payments.filter((record) => {
      return selectedInvoiceIds.has(String(record.factureId ?? ""));
    });

    const recentActivity = sortByActivityDesc([
      ...interventions.map((record) =>
        buildActivityRecord("intervention", record, "Intervention")
      ),
      ...invoices.map((record) =>
        buildActivityRecord("facture", record, "Facture")
      ),
      ...payments.map((record) =>
        buildActivityRecord("encaissement", record, "Encaissement")
      ),
      ...appointments.map((record) =>
        buildActivityRecord("rendezvous", record, "Rendez-vous")
      ),
    ]).slice(0, 8);

    const now = Date.now();

    const upcomingAppointments = sortByDateAsc(
      appointments.filter((record) => {
        const date = vehicleDate(record);
        return typeof date === "number" && date >= now;
      })
    ).slice(0, 5);

    const enrichedRoot = enrichClientRoot(
      rootRecord,
      vehicles,
      appointments,
      interventions,
      invoices,
      payments,
      recentActivity,
      upcomingAppointments
    );

    return {
      config: input.config,
      rootRecord: enrichedRoot,
      primaryRecords: vehicles,
      relatedRecordsBySection: {
        rendezvous: selectedVehicleAppointments,
        interventions: selectedVehicleInterventions,
        lignes: selectedVehicleLines,
        factures: selectedVehicleInvoices,
        encaissements: selectedVehiclePayments,
        recentActivity,
        upcomingAppointments,
      },
    };
  }
}

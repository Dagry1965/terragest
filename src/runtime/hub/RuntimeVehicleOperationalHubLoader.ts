import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { vehiculesModule } from "@/runtime/modules/generated/vehicules/vehicules.module";
import { clientsautoModule } from "@/runtime/modules/generated/clientsauto/clientsauto.module";
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

export type RuntimeVehicleOperationalHubLoadResult = {
  config: ERPRecordHubConfig;
  rootRecord: ERPRecordHubRecord | null;
  primaryRecords: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
};

export type RuntimeVehicleOperationalHubLoaderInput = {
  config: ERPRecordHubConfig;
  vehicleId?: string | null;
  selectedInterventionId?: string | null;
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
      "[RuntimeVehicleOperationalHubLoader] detail failed:",
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
      "[RuntimeVehicleOperationalHubLoader] list failed:",
      moduleLabel(module),
      error
    );

    return [];
  }
}

function readFirstString(
  record: ERPRecordHubRecord,
  fields: string[]
): string {
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

function buildBusinessLabel(record: ERPRecordHubRecord, fallback: string): string {
  const label = readFirstString(record, [
    "displayLabel",
    "label",
    "libelle",
    "libell\u00e9",
    "immatriculation",
    "numero",
    "num\u00e9ro",
    "numeroFacture",
    "num\u00e9roFacture",
    "numeroIntervention",
    "num\u00e9roIntervention",
    "dateIntervention",
    "dateRendezVous",
    "nom",
    "name",
    "designation",
    "d\u00e9signation",
    "titre",
    "title",
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

function enrichVehicleRecord(
  vehicle: ERPRecordHubRecord,
  client: ERPRecordHubRecord | null,
  appointments: ERPRecordHubRecord[],
  interventions: ERPRecordHubRecord[],
  invoices: ERPRecordHubRecord[],
  payments: ERPRecordHubRecord[]
): ERPRecordHubRecord {
  const vehicleLabel = buildBusinessLabel(vehicle, "V\u00e9hicule");
  const clientLabel = client ? buildBusinessLabel(client, "Client") : "";

  const appointmentsCount = appointments.length;
  const interventionsCount = interventions.length;
  const invoicesCount = invoices.length;
  const paymentsCount = payments.length;
  const revenueTotal = sumRecords(invoices, ["montantTTC", "totalTTC", "total", "montant"]);

  return {
    ...vehicle,
    label: vehicleLabel,
    displayLabel: vehicleLabel,
    titre: vehicleLabel,
    clientLabel,

    appointmentsCount,
    rendezvousCount: appointmentsCount,

    interventionsCount,
    interventionsTotal: interventionsCount,

    invoicesCount,
    facturesCount: invoicesCount,

    paymentsCount,
    encaissementsCount: paymentsCount,

    revenueTotal,
    chiffreAffaires: revenueTotal,
  };
}

function emptyResult(config: ERPRecordHubConfig): RuntimeVehicleOperationalHubLoadResult {
  return {
    config,
    rootRecord: null,
    primaryRecords: [],
    relatedRecordsBySection: {
      rendezvous: [],
      lignes: [],
      factures: [],
      encaissements: [],
    },
  };
}

export class RuntimeVehicleOperationalHubLoader {
  static async load(
    input: RuntimeVehicleOperationalHubLoaderInput
  ): Promise<RuntimeVehicleOperationalHubLoadResult> {
    const vehicleId = input.vehicleId ? String(input.vehicleId) : "";

    if (!vehicleId) {
      return emptyResult(input.config);
    }

    const rootVehicle = await safeDetail(vehiculesModule, vehicleId);

    if (!rootVehicle) {
      return emptyResult(input.config);
    }

    const [
      clients,
      appointmentsRaw,
      interventionsRaw,
      linesRaw,
      invoicesRaw,
      paymentsRaw
    ] = await Promise.all([
      safeList(clientsautoModule),
      safeList(rendezvousModule),
      safeList(interventionsautoModule),
      safeList(lignesinterventionautoModule),
      safeList(facturesautoModule),
      safeList(encaissementsautoModule)
    ]);

    const clientId = String(
      rootVehicle.clientId ??
        rootVehicle.proprietaireId ??
        rootVehicle.ownerId ??
        ""
    );

    const client =
      clients.find((record) => String(record.id ?? "") === clientId) ?? null;

    const appointments = filterByAnyKey(
      appointmentsRaw,
      ["vehiculeId", "vehicleId"],
      vehicleId
    ).map((record) => enrichRecord(record, "Rendez-vous"));

    const interventions = filterByAnyKey(
      interventionsRaw,
      ["vehiculeId", "vehicleId"],
      vehicleId
    ).map((record) => enrichRecord(record, "Intervention"));

    const selectedIntervention =
      findById(interventions, input.selectedInterventionId) ??
      interventions[0] ??
      null;

    const selectedInterventionId = String(
      selectedIntervention?.id ?? input.selectedInterventionId ?? ""
    );

    const selectedRendezVousId = String(
      selectedIntervention?.rendezVousId ??
        selectedIntervention?.rendezvousId ??
        selectedIntervention?.rdvId ??
        ""
    );

    const lines = selectedInterventionId
      ? filterByAnyKey(linesRaw, ["interventionId"], selectedInterventionId).map((record) =>
          enrichRecord(record, "Ligne d'intervention")
        )
      : [];

    const invoicesForVehicle = invoicesRaw.filter((record) => {
      const directVehicleMatch = ["vehiculeId", "vehicleId"].some(
        (key) => String(record[key] ?? "") === vehicleId
      );

      const interventionMatch = interventions.some(
        (intervention) =>
          String(record.interventionId ?? "") === String(intervention.id ?? "")
      );

      return directVehicleMatch || interventionMatch;
    });

    const invoicesForSelectedIntervention = selectedInterventionId
      ? invoicesForVehicle.filter(
          (record) => String(record.interventionId ?? "") === selectedInterventionId
        )
      : [];

    const selectedInvoiceIds = new Set(
      invoicesForSelectedIntervention
        .map((record) => String(record.id ?? ""))
        .filter((id) => id.length > 0)
    );

    const paymentsForVehicle = paymentsRaw.filter((record) => {
      const invoiceMatch = invoicesForVehicle.some(
        (invoice) => String(record.factureId ?? "") === String(invoice.id ?? "")
      );

      const directVehicleMatch = ["vehiculeId", "vehicleId"].some(
        (key) => String(record[key] ?? "") === vehicleId
      );

      return invoiceMatch || directVehicleMatch;
    });

    const paymentsForSelectedIntervention = paymentsForVehicle.filter((record) => {
      const factureId = String(record.factureId ?? "");
      return factureId.length > 0 && selectedInvoiceIds.has(factureId);
    });

    const relatedRendezvous = selectedRendezVousId
      ? appointments.filter(
          (record) => String(record.id ?? "") === selectedRendezVousId
        )
      : appointments;

    const enrichedRoot = enrichVehicleRecord(
      rootVehicle,
      client,
      appointments,
      interventions,
      invoicesForVehicle,
      paymentsForVehicle
    );

    return {
      config: input.config,
      rootRecord: enrichedRoot,
      primaryRecords: interventions,
      relatedRecordsBySection: {
        rendezvous: relatedRendezvous,
        lignes: lines,
        factures: invoicesForSelectedIntervention.map((record) =>
          enrichRecord(record, "Facture")
        ),
        encaissements: paymentsForSelectedIntervention.map((record) =>
          enrichRecord(record, "Encaissement")
        ),
      },
    };
  }
}

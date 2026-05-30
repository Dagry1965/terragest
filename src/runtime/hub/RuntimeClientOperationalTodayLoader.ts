import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { rendezvousModule } from "@/runtime/modules/generated/rendezvous/rendezvous.module";
import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto/interventionsauto.module";
import { facturesautoModule } from "@/runtime/modules/generated/facturesauto/facturesauto.module";
import { vehiculesModule } from "@/runtime/modules/generated/vehicules/vehicules.module";
import type { ERPRecordHubRecord } from "./RuntimeHubTypes";

export type ClientOperationalTodayCard = {
  key: string;
  label: string;
  value: number;
  description: string;
  icon: string;
  href: string;
};

export type ClientOperationalTodayItem = {
  id: string;
  label: string;
  subtitle: string;
  href: string;
  type: "rendezvous" | "intervention" | "facture" | "vehicule";
};

export type ClientOperationalTodayResult = {
  cards: ClientOperationalTodayCard[];
  items: ClientOperationalTodayItem[];
};

function normalizeRecords(records: unknown): ERPRecordHubRecord[] {
  if (!Array.isArray(records)) {
    return [];
  }

  return records.filter((record): record is ERPRecordHubRecord => {
    return !!record && typeof record === "object";
  });
}

async function safeList(module: unknown): Promise<ERPRecordHubRecord[]> {
  try {
    return normalizeRecords(await RuntimeDataBinding.list(module as never));
  } catch (error) {
    console.warn("[RuntimeClientOperationalTodayLoader] list failed", error);
    return [];
  }
}

function recordId(record: ERPRecordHubRecord): string {
  return String(record.id ?? "");
}

function readFirstString(record: ERPRecordHubRecord, fields: string[], fallback = ""): string {
  for (const field of fields) {
    const value = record[field];

    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
  }

  return fallback;
}

function readNumber(record: ERPRecordHubRecord, fields: string[]): number {
  for (const field of fields) {
    const value = record[field];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string") {
      const parsed = Number(value.replace(",", "."));
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return 0;
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

function isToday(timestamp: number | null): boolean {
  if (!timestamp) return false;

  const date = new Date(timestamp);
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function isFutureOrToday(timestamp: number | null): boolean {
  if (!timestamp) return false;

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  return timestamp >= start.getTime();
}

function normalizedStatus(record: ERPRecordHubRecord): string {
  return readFirstString(record, ["statut", "status", "etat"]).toLowerCase();
}

function isActiveIntervention(record: ERPRecordHubRecord): boolean {
  const status = normalizedStatus(record);

  if (!status) return true;

  return ![
    "terminee",
    "terminée",
    "annulee",
    "annulée",
    "archivee",
    "archivée",
    "facturee",
    "facturée",
  ].includes(status);
}

function isUnpaidInvoice(record: ERPRecordHubRecord): boolean {
  const status = normalizedStatus(record);

  return ![
    "payee",
    "payée",
    "reglee",
    "réglée",
    "soldee",
    "soldée",
  ].includes(status);
}

function vehicleLabel(record: ERPRecordHubRecord): string {
  return [
    readFirstString(record, ["immatriculation"]),
    readFirstString(record, ["marque"]),
    readFirstString(record, ["modele", "modèle"]),
  ]
    .filter(Boolean)
    .join(" · ") || "Véhicule";
}

function appointmentLabel(record: ERPRecordHubRecord): string {
  return [
    readFirstString(record, ["dateRendezVous", "date"]),
    readFirstString(record, ["heure"]),
    readFirstString(record, ["typeService", "service"]),
  ]
    .filter(Boolean)
    .join(" · ") || "Rendez-vous";
}

function interventionLabel(record: ERPRecordHubRecord): string {
  return (
    readFirstString(record, ["displayLabel", "titre", "dateIntervention", "numeroIntervention"]) ||
    "Intervention"
  );
}

function invoiceLabel(record: ERPRecordHubRecord): string {
  const number = readFirstString(record, ["numero", "numeroFacture", "numéroFacture"]);
  const amount = readNumber(record, ["montantTTC", "totalTTC", "montantTotal", "total", "montant"]);

  return [number || "Facture", amount ? String(amount) : ""].filter(Boolean).join(" · ");
}

export class RuntimeClientOperationalTodayLoader {
  static async load(): Promise<ClientOperationalTodayResult> {
    const [appointmentsRaw, interventionsRaw, invoicesRaw, vehiclesRaw] = await Promise.all([
      safeList(rendezvousModule),
      safeList(interventionsautoModule),
      safeList(facturesautoModule),
      safeList(vehiculesModule),
    ]);

    const todaysAppointments = appointmentsRaw.filter((record) => {
      return isToday(readDate(record, ["dateRendezVous", "date", "startAt", "createdAt"]));
    });

    const upcomingAppointments = appointmentsRaw.filter((record) => {
      return isFutureOrToday(readDate(record, ["dateRendezVous", "date", "startAt"]));
    });

    const activeInterventions = interventionsRaw.filter(isActiveIntervention);
    const unpaidInvoices = invoicesRaw.filter(isUnpaidInvoice);

    const recentVehicles = vehiclesRaw.slice(0, 5);

    const unpaidAmount = unpaidInvoices.reduce((total, record) => {
      return total + readNumber(record, ["montantTTC", "totalTTC", "montantTotal", "total", "montant"]);
    }, 0);

    const cards: ClientOperationalTodayCard[] = [
      {
        key: "appointments-today",
        label: "Rendez-vous aujourd’hui",
        value: todaysAppointments.length,
        description: "Clients attendus au garage aujourd’hui",
        icon: "📅",
        href: "/rendezvous",
      },
      {
        key: "active-interventions",
        label: "Interventions en cours",
        value: activeInterventions.length,
        description: "Travaux ouverts ou à terminer",
        icon: "🔧",
        href: "/interventionsauto",
      },
      {
        key: "unpaid-invoices",
        label: "Factures impayées",
        value: unpaidInvoices.length,
        description: unpaidAmount > 0 ? `${unpaidAmount} à suivre` : "Aucun montant détecté",
        icon: "🧾",
        href: "/facturesauto",
      },
      {
        key: "vehicles-followup",
        label: "Véhicules à suivre",
        value: recentVehicles.length,
        description: "Derniers véhicules disponibles pour recherche",
        icon: "🚗",
        href: "/vehicules",
      },
    ];

    const items: ClientOperationalTodayItem[] = [
      ...todaysAppointments.slice(0, 4).map((record) => ({
        id: `rdv:${recordId(record)}`,
        type: "rendezvous" as const,
        label: appointmentLabel(record),
        subtitle: readFirstString(record, ["statut", "typeService", "clientLabel"], "Rendez-vous"),
        href: `/rendezvous/${recordId(record)}`,
      })),
      ...activeInterventions.slice(0, 4).map((record) => ({
        id: `intervention:${recordId(record)}`,
        type: "intervention" as const,
        label: interventionLabel(record),
        subtitle: readFirstString(record, ["statut", "dateIntervention"], "Intervention"),
        href: `/interventionsauto/${recordId(record)}`,
      })),
      ...unpaidInvoices.slice(0, 4).map((record) => ({
        id: `facture:${recordId(record)}`,
        type: "facture" as const,
        label: invoiceLabel(record),
        subtitle: readFirstString(record, ["statut", "dateFacture"], "Facture"),
        href: `/facturesauto/${recordId(record)}`,
      })),
      ...recentVehicles.slice(0, 4).map((record) => ({
        id: `vehicule:${recordId(record)}`,
        type: "vehicule" as const,
        label: vehicleLabel(record),
        subtitle: readFirstString(record, ["statut", "clientLabel"], "Véhicule"),
        href: `/vehicules/${recordId(record)}`,
      })),
    ].slice(0, 10);

    return {
      cards,
      items,
    };
  }
}

"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";
import { ClientOperationalSearchBox } from "./ClientOperationalSearchBox";
import { ERPRelatedRecordsPanel } from "@/components/erp/runtime/ERPRelatedRecordsPanel";
import { InvoicePaymentsHistory } from "@/components/erp/billing/InvoicePaymentsHistory";
import { ERPOperationalTable } from "@/components/erp/operational/ERPOperationalTable";
import { RuntimeHubActionContextAdapter } from "@/runtime/hub/RuntimeHubActionContextAdapter";
import { rendezvousModule } from "@/runtime/modules/generated/rendezvous/rendezvous.module";
import { vehiculesModule } from "@/runtime/modules/generated/vehicules/vehicules.module";
import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto/interventionsauto.module";
import type { ERPCompositionChild } from "@/runtime/modules/ERPModule";
import { useAuth } from "@/providers/AuthProvider";

const VEHICLE_SEDAN_VISUAL_PRESETS = [
  {
    name: "gris-argent",
    label: "Berline gris argent",
    kickerClass: "text-slate-700",
    sedanClass: "text-slate-400/45",
    selectedCardClass: "border-slate-300 bg-gradient-to-br from-white via-slate-50 to-slate-200/70 ring-2 ring-slate-100",
    idleCardClass: "border-slate-200 bg-gradient-to-br from-white via-slate-50/80 to-slate-100/70 hover:border-slate-300 hover:shadow-md",
  },
  {
    name: "blanc-nacre",
    label: "Berline blanc nacré",
    kickerClass: "text-zinc-700",
    sedanClass: "text-zinc-300/55",
    selectedCardClass: "border-zinc-200 bg-gradient-to-br from-white via-zinc-50 to-stone-100/75 ring-2 ring-zinc-100",
    idleCardClass: "border-zinc-100 bg-gradient-to-br from-white via-zinc-50/70 to-stone-50/80 hover:border-zinc-200 hover:shadow-md",
  },
  {
    name: "noir-graphite",
    label: "Berline noir graphite",
    kickerClass: "text-slate-900",
    sedanClass: "text-slate-900/24",
    selectedCardClass: "border-slate-500 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-300/70 ring-2 ring-slate-200",
    idleCardClass: "border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-200/60 hover:border-slate-400 hover:shadow-md",
  },
  {
    name: "rouge-bordeaux",
    label: "Berline rouge bordeaux",
    kickerClass: "text-red-800",
    sedanClass: "text-red-800/28",
    selectedCardClass: "border-red-300 bg-gradient-to-br from-white via-red-50 to-rose-100/75 ring-2 ring-red-100",
    idleCardClass: "border-red-100 bg-gradient-to-br from-white via-red-50/55 to-rose-50/75 hover:border-red-200 hover:shadow-md",
  },
  {
    name: "vert-profond",
    label: "Berline vert profond",
    kickerClass: "text-emerald-800",
    sedanClass: "text-emerald-800/28",
    selectedCardClass: "border-emerald-300 bg-gradient-to-br from-white via-emerald-50 to-green-100/75 ring-2 ring-emerald-100",
    idleCardClass: "border-emerald-100 bg-gradient-to-br from-white via-emerald-50/55 to-green-50/75 hover:border-emerald-200 hover:shadow-md",
  },
] as const;

function pickVehicleSedanVisual(recordKey: string, fallbackIndex = 0) {
  const key = String(recordKey || fallbackIndex || "0");
  let hash = 0;

  for (let index = 0; index < key.length; index += 1) {
    hash = (hash * 31 + key.charCodeAt(index)) >>> 0;
  }

  return VEHICLE_SEDAN_VISUAL_PRESETS[hash % VEHICLE_SEDAN_VISUAL_PRESETS.length];
}

function VehicleSedanIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 120" aria-hidden="true" className={className} fill="none">
      <path d="M42 74h176c10 0 18 8 18 18v6H24v-6c0-10 8-18 18-18Z" fill="currentColor" />
      <path d="M74 74c13-24 31-36 57-36h16c24 0 42 12 58 36H74Z" fill="currentColor" opacity="0.86" />
      <path d="M91 67c10-15 22-22 40-22h10v22H91Z" fill="white" opacity="0.62" />
      <path d="M150 45h2c16 0 28 7 39 22h-41V45Z" fill="white" opacity="0.48" />
      <circle cx="72" cy="98" r="14" fill="white" opacity="0.82" />
      <circle cx="72" cy="98" r="7" fill="currentColor" opacity="0.65" />
      <circle cx="192" cy="98" r="14" fill="white" opacity="0.82" />
      <circle cx="192" cy="98" r="7" fill="currentColor" opacity="0.65" />
      <path d="M40 74c7-10 17-15 30-15h16l-12 15H40Z" fill="currentColor" opacity="0.72" />
      <path d="M218 74c-8-10-18-15-31-15h-17l13 15h35Z" fill="currentColor" opacity="0.72" />
    </svg>
  );
}

type ERPClientOperationalSheetProps = {
  config: ERPRecordHubConfig;
  rootRecord: ERPRecordHubRecord | null;
  vehicles: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
  selectedVehicleId?: string | null;
};

function text(
  record: ERPRecordHubRecord | null | undefined,
  fields: string[],
  fallback = "-"
): string {
  if (!record) return fallback;

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

function numberValue(
  record: ERPRecordHubRecord | null | undefined,
  fields: string[]
): number {
  if (!record) return 0;

  for (const field of fields) {
    const value = record[field];

    if (typeof value === "number" && Number.isFinite(value)) return value;

    if (typeof value === "string") {
      const parsed = Number(value.replace(",", "."));
      if (Number.isFinite(parsed)) return parsed;
    }
  }

  return 0;
}

function money(value: number): string {
  return `${new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(value)} FCFA`;
}

function formatTodayLabel(): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function getUserLabel(user: unknown): string {
  const candidate = user as
    | {
        displayName?: string | null;
        email?: string | null;
      }
    | null
    | undefined;

  return (
    candidate?.displayName?.trim() ||
    candidate?.email?.trim() ||
    "Utilisateur connecté"
  );
}

function recordId(record: ERPRecordHubRecord | null | undefined): string {
  return String(record?.id ?? "");
}

function href(modulePath: string, record: ERPRecordHubRecord | null | undefined): string {
  const id = recordId(record);
  return id ? `${modulePath}/${id}` : modulePath;
}

function queryHref(
  pathname: string,
  params: Record<string, string | null | undefined>
): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string" && value.trim().length > 0) {
      searchParams.set(key, value);
    }
  }

  const query = searchParams.toString();
  return query ? `${pathname}?${query}` : pathname;
}

function withReturnTo(
  pathname: string,
  returnTo: string,
  params: Record<string, string | null | undefined> = {}
): string {
  return queryHref(pathname, {
    ...params,
    returnTo,
  });
}

function badgeTone(value: string): string {
  const normalized = value.toLowerCase();

  if (
    normalized.includes("pay") ||
    normalized.includes("actif") ||
    normalized.includes("termin") ||
    normalized.includes("valid")
  ) {
    return "bg-emerald-100 text-emerald-800 ring-emerald-200";
  }

  if (
    normalized.includes("impay") ||
    normalized.includes("retard") ||
    normalized.includes("annul")
  ) {
    return "bg-rose-100 text-rose-800 ring-rose-200";
  }

  if (normalized.includes("cours") || normalized.includes("brouillon")) {
    return "bg-amber-100 text-amber-800 ring-amber-200";
  }

  return "bg-slate-100 text-slate-700 ring-slate-200";
}

function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-900">
        {title}
      </h2>
      {action}
    </div>
  );
}

function EmptyCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[1.5rem] bg-slate-50 px-5 py-4 text-sm text-slate-500 ring-1 ring-slate-100">
      {children}
    </div>
  );
}

function normalizeRelancePhone(value: string): string {
  return value.replace(/[^0-9]/g, "");
}

function buildRelanceWhatsAppHref(phone: string, message: string): string {
  const normalizedPhone = normalizeRelancePhone(phone);

  return normalizedPhone
    ? `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`
    : "";
}

function buildRelanceSmsHref(phone: string, message: string): string {
  const normalizedPhone = normalizeRelancePhone(phone);

  return normalizedPhone
    ? `sms:${normalizedPhone}?body=${encodeURIComponent(message)}`
    : "";
}

function buildRelanceMailHref(email: string, subject: string, message: string): string {
  const cleanEmail = email.trim();

  return cleanEmail
    ? `mailto:${cleanEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
    : "";
}

function hubActionIcon(actionKey: string): string {
  if (actionKey.includes("relancer-client")) return "📱";
  if (actionKey.includes("relancer-facture")) return "▤";
  if (actionKey.includes("enregistrer-paiement")) return "$";
  if (actionKey.includes("ouvrir-intervention")) return "⚒";
  if (actionKey.includes("ouvrir-facture")) return "▣";
  if (actionKey.includes("voir-encaissements")) return "☷";

  return "•";
}

function hubActionClassName(actionKey: string): string {
  const base =
    "group flex w-full items-center gap-4 rounded-[1.35rem] px-4 py-4 text-left text-sm font-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-md";

  if (
    actionKey.includes("relancer-client") ||
    actionKey.includes("relancer-facture")
  ) {
    return [
      base,
      "bg-gradient-to-r from-orange-500 to-orange-400 text-white ring-1 ring-orange-300",
    ].join(" ");
  }

  if (actionKey.includes("enregistrer-paiement")) {
    return [
      base,
      "bg-gradient-to-r from-emerald-700 to-teal-600 text-white ring-1 ring-emerald-300",
    ].join(" ");
  }

  if (
    actionKey.includes("ouvrir-intervention") ||
    actionKey.includes("ouvrir-facture")
  ) {
    return [
      base,
      "bg-gradient-to-r from-slate-600 to-slate-500 text-white ring-1 ring-slate-300",
    ].join(" ");
  }

  return [
    base,
    "bg-slate-100 text-slate-950 ring-1 ring-slate-200 hover:bg-slate-200",
  ].join(" ");
}
function buildOperationalChild(
  child: ERPCompositionChild
): ERPCompositionChild {
  return {
    ...child,
    mode: child.mode ?? "readonly",
    allowCreate: child.allowCreate ?? false,
  };
}

const rendezvousChild = buildOperationalChild({
  key: "client-sheet-rendezvous",
  title: "Rendez-vous du véhicule sélectionné",
  description: "Les rendez-vous rattachés au véhicule sélectionné dans la fiche client.",
  moduleKey: "rendezvous",
  foreignKey: "vehiculeId",
  badgeLabel: "rendez-vous",
  mode: "readonly",
  allowCreate: false,
  labelFields: ["dateRendezVous", "heureRendezVous", "heure", "typeService", "statut"],
  subtitleFields: ["service", "durationMinutes", "clientLabel"],
  relations: [],
});

const interventionsChild = buildOperationalChild({
  key: "client-sheet-interventions",
  title: "Interventions du véhicule",
  description: "Les interventions rattachées au véhicule sélectionné.",
  moduleKey: "interventionsauto",
  foreignKey: "vehiculeId",
  badgeLabel: "intervention(s)",
  mode: "readonly",
  allowCreate: false,
  labelFields: ["dateIntervention", "titre", "numeroIntervention", "statut"],
  subtitleFields: ["montantTTC", "montantHT", "rendezVousId"],
  relations: [],
});

const lignesInterventionChild = buildOperationalChild({
  key: "client-sheet-lignes-intervention",
  title: "Lignes d’intervention",
  description: "Lignes liées à l’intervention sélectionnée. Le total ne compte que les lignes validées.",
  moduleKey: "lignesinterventionauto",
  foreignKey: "interventionId",
  badgeLabel: "ligne(s)",
  mode: "readonly",
  allowCreate: false,
  totalField: "montantTotal",
  labelFields: ["designation", "typeLigne", "produitLabel", "statut"],
  subtitleFields: ["quantite", "prixUnitaire", "montantTotal"],
  relations: [],
});

const facturesChild = buildOperationalChild({
  key: "client-sheet-factures",
  title: "Factures liées",
  description: "Factures liées à l’intervention sélectionnée.",
  moduleKey: "facturesauto",
  foreignKey: "interventionId",
  badgeLabel: "facture(s)",
  mode: "readonly",
  allowCreate: false,
  totalField: "montantTTC",
  labelFields: ["numero", "numeroFacture", "statut", "montantTTC"],
  subtitleFields: ["dateFacture", "montantHT", "tva", "resteAPayer"],
  relations: [],
});

export function ERPClientOperationalSheet({
  config: _config,
  rootRecord,
  vehicles,
  relatedRecordsBySection,
  selectedVehicleId = null,
}: ERPClientOperationalSheetProps) {
  
  const { user } = useAuth();
const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
    selectedVehicleId ?? recordId(vehicles[0]) ?? null
  );

  const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);
  const [openedRendezvousDetailId, setOpenedRendezvousDetailId] = useState<string | null>(null);
  const [openedRelanceActionKey, setOpenedRelanceActionKey] = useState<string | null>(null);
  const [expandedInterventionId, setExpandedInterventionId] = useState<string | null>(null);
  const [expandedFactureId, setExpandedFactureId] = useState<string | null>(null);
  const [expandedEncaissementId, setExpandedEncaissementId] = useState<string | null>(null);
  const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);

  const selectedVehicle = useMemo(() => {
    return (
      vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
      vehicles[0] ??
      null
    );
  }, [vehicles, localSelectedVehicleId]);

  const clientName = text(
    rootRecord,
    ["displayLabel", "raisonSociale", "nomComplet", "nom", "prenom"],
    "Client"
  );

  const clientType = text(
    rootRecord,
    ["clientType", "typeClient", "categorieClient", "type"],
    "Particulier"
  );

  const clientId = recordId(rootRecord);
  const selectedVehicleRecordId = recordId(selectedVehicle);

  const clientReturnTo = queryHref("/clientsauto/hub", {
    clientId,
    selectedVehicleId: selectedVehicleRecordId,
  });

  const addVehicleHref = queryHref("/vehicules/nouveau", {
    clientId,
    returnTo: clientReturnTo,
  });

  const fullActivityHref = queryHref("/clientsauto/hub", {
    clientId,
    selectedVehicleId: selectedVehicleRecordId,
    view: "activity",
  }) + "#activite-recente";

  const allAppointmentsHref = queryHref("/rendezvous", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const interventionsHref = queryHref("/interventionsauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const invoicesHref = queryHref("/facturesauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const paymentsHref = queryHref("/encaissementsauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const vehicleDetailHref = queryHref(href("/vehicules", selectedVehicle), {
    clientId,
    returnTo: clientReturnTo,
  });

  const interventionDetailHref = queryHref("/interventionsauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const invoiceDetailHref = queryHref("/facturesauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const paymentDetailHref = queryHref("/encaissementsauto", {
    clientId,
    vehiculeId: selectedVehicleRecordId,
  });

  const unpaidAmount = numberValue(rootRecord, [
    "unpaidInvoicesAmount",
    "montantImpayees",
  ]);

  const revenueTotal = numberValue(rootRecord, [
    "revenueTotal",
    "chiffreAffaires",
    "caCumule",
  ]);

  const interventions = relatedRecordsBySection.interventions ?? [];
  const rendezvous = useMemo(() => {
    const records = relatedRecordsBySection.rendezvous ?? [];

    const getRendezvousTime = (record: ERPRecordHubRecord) => {
      const raw =
        record.dateRendezVous ??
        record.date ??
        record.activityDate ??
        record.startAt ??
        record.createdAt;

      if (typeof raw === "object" && raw !== null && "seconds" in raw) {
        const seconds = Number((raw as { seconds?: unknown }).seconds);
        return Number.isFinite(seconds) ? seconds * 1000 : 0;
      }

      if (typeof raw === "number") {
        return raw;
      }

      if (typeof raw === "string") {
        const parsed = Date.parse(raw);
        return Number.isFinite(parsed) ? parsed : 0;
      }

      return 0;
    };

    return [...records].sort((a, b) => getRendezvousTime(b) - getRendezvousTime(a));
  }, [relatedRecordsBySection.rendezvous]);
  const lignes = relatedRecordsBySection.lignes ?? [];
  const factures = relatedRecordsBySection.factures ?? [];
  const encaissements = relatedRecordsBySection.encaissements ?? [];
  const recentActivity = relatedRecordsBySection.recentActivity ?? [];
  const upcomingAppointments = relatedRecordsBySection.upcomingAppointments ?? [];

  const toggleExpandedIntervention = (id: string) => {
    setExpandedInterventionId((current) => (current === id ? null : id));
  };

  const toggleExpandedFacture = (id: string) => {
    setExpandedFactureId((current) => (current === id ? null : id));
  };

  const toggleExpandedEncaissement = (id: string) => {
    setExpandedEncaissementId((current) => (current === id ? null : id));
  };

  const selectedRendezvous = useMemo(() => {
    return (
      rendezvous.find((item) => recordId(item) === selectedRendezvousId) ??
      rendezvous[0] ??
      null
    );
  }, [rendezvous, selectedRendezvousId]);

  const openedRendezvousDetail = useMemo(() => {
    if (!openedRendezvousDetailId) {
      return null;
    }

    return (
      rendezvous.find((item) => recordId(item) === openedRendezvousDetailId) ??
      null
    );
  }, [rendezvous, openedRendezvousDetailId]);

  const interventionsForSelectedRendezvous = useMemo(() => {
    if (!selectedRendezvous) {
      return interventions;
    }

    const rendezvousId = recordId(selectedRendezvous);

    const filtered = interventions.filter((intervention) => {
      return [
        "rendezVousId",
        "rendezvousId",
        "rdvId",
      ].some((field) => String(intervention[field] ?? "") === rendezvousId);
    });

    return filtered.length > 0 ? filtered : interventions;
  }, [interventions, selectedRendezvous]);

  const selectedIntervention = useMemo(() => {
    return (
      interventionsForSelectedRendezvous.find(
        (item) => recordId(item) === selectedInterventionId
      ) ??
      interventionsForSelectedRendezvous[0] ??
      null
    );
  }, [interventionsForSelectedRendezvous, selectedInterventionId]);

  const facturesForSelectedIntervention = useMemo(() => {
    if (!selectedIntervention) {
      return [];
    }

    const interventionId = recordId(selectedIntervention);

    const filtered = factures.filter((facture) => {
      return String(facture.interventionId ?? "") === interventionId;
    });

    return filtered.length > 0 ? filtered : factures;
  }, [factures, selectedIntervention]);

  const selectedInvoice = facturesForSelectedIntervention[0] ?? null;

  const interventionsHubModule = useMemo(() => {
    const operational = interventionsautoModule.operational as
      | {
          table?: {
            fields?: string[];
            [key: string]: unknown;
          };
          [key: string]: unknown;
        }
      | undefined;

    const table = operational?.table;

    return {
      ...interventionsautoModule,
      operational: {
        ...operational,
        table: {
          ...table,
          fields: (table?.fields ?? []).filter(
            (field) => !["clientId", "vehiculeId"].includes(field)
          ),
        },
      },
    };
  }, []);

  const parcoursAtelierStatus = useMemo(() => {
    const normalize = (value: string) =>
      value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const rdvStatus = normalize(text(selectedRendezvous, ["statut", "status"], ""));
    const interventionStatus = normalize(text(selectedIntervention, ["statut", "status"], ""));
    const invoiceIds = new Set(facturesForSelectedIntervention.map((facture) => recordId(facture)));

    const paymentsForSelectedIntervention = encaissements.filter((encaissement) => {
      const factureId = String(
        encaissement.factureId ??
          encaissement.invoiceId ??
          encaissement.factureAutoId ??
          ""
      );

      return (
        invoiceIds.has(factureId) ||
        String(encaissement.interventionId ?? "") === recordId(selectedIntervention)
      );
    });

    const invoiceTotal = facturesForSelectedIntervention.reduce((total, facture) => {
      return total + numberValue(facture, ["montantTTC", "totalTTC", "montantTotal", "total", "montant"]);
    }, 0);

    const explicitRemaining = facturesForSelectedIntervention.reduce((total, facture) => {
      return total + numberValue(facture, ["resteAPayer", "solde", "montantRestant"]);
    }, 0);

    const paidTotal = paymentsForSelectedIntervention.reduce((total, encaissement) => {
      return total + numberValue(encaissement, ["montantEncaisse", "montant", "amount"]);
    }, 0);

    const remainingAmount =
      explicitRemaining > 0
        ? explicitRemaining
        : Math.max(invoiceTotal - paidTotal, 0);

    const hasRdv = Boolean(selectedRendezvous);
    const hasIntervention = Boolean(selectedIntervention);
    const hasInvoice = facturesForSelectedIntervention.length > 0;
    const hasPayment = paymentsForSelectedIntervention.length > 0;

    let label = "Aucun parcours sélectionné";
    let description = "Sélectionnez un rendez-vous pour lire le parcours atelier.";
    let tone = "slate";
    let nextAction = "Choisir un rendez-vous";

    if (hasRdv) {
      label = "RDV planifié";
      description = "Le rendez-vous est identifié. L'intervention reste à suivre.";
      tone = "blue";
      nextAction = "Suivre l'intervention";
    }

    if (rdvStatus.includes("annul")) {
      label = "Parcours annulé";
      description = "Le rendez-vous est annulé. Aucune suite atelier active n'est attendue.";
      tone = "rose";
      nextAction = "Replanifier si nécessaire";
    } else if (hasRdv && hasIntervention) {
      label = "Intervention en cours";
      description = "Une intervention est rattachée au rendez-vous sélectionné.";
      tone = "amber";
      nextAction = "Suivre les travaux";

      if (
        interventionStatus.includes("terminee") ||
        interventionStatus.includes("facturee") ||
        interventionStatus.includes("termin")
      ) {
        label = "Intervention terminée";
        description = "Les travaux sont terminés. La facturation ou le paiement doit être vérifié.";
        tone = "emerald";
        nextAction = "Vérifier la facture";
      }
    }

    if (hasInvoice) {
      label = "Facturé à encaisser";
      description = "Une facture est rattachée à l'intervention. Le règlement reste à contrôler.";
      tone = "orange";
      nextAction = "Suivre le paiement";

      if (hasPayment && remainingAmount > 0) {
        label = "Paiement partiel";
        description = `${money(remainingAmount)} restent à encaisser sur ce parcours.`;
        tone = "orange";
        nextAction = "Relancer ou encaisser le solde";
      }

      if (remainingAmount <= 0 && invoiceTotal > 0) {
        label = "Parcours soldé";
        description = "Le parcours atelier est facturé et soldé.";
        tone = "emerald";
        nextAction = "Dossier clôturé";
      }
    }

    const toneClass =
      tone === "emerald"
        ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
        : tone === "orange"
          ? "bg-orange-50 text-orange-800 ring-orange-200"
          : tone === "amber"
            ? "bg-amber-50 text-amber-800 ring-amber-200"
            : tone === "rose"
              ? "bg-rose-50 text-rose-800 ring-rose-200"
              : tone === "blue"
                ? "bg-blue-50 text-blue-800 ring-blue-200"
                : "bg-slate-50 text-slate-700 ring-slate-200";

    return {
      label,
      description,
      nextAction,
      toneClass,
      remainingAmount,
      steps: [
        {
          label: "RDV",
          done: hasRdv,
          value: text(selectedRendezvous, ["statut", "status"], hasRdv ? "suivi" : "à sélectionner"),
        },
        {
          label: "Intervention",
          done: hasIntervention,
          value: text(selectedIntervention, ["statut", "status"], hasIntervention ? "suivi" : "non créée"),
        },
        {
          label: "Facture",
          done: hasInvoice,
          value: hasInvoice ? `${facturesForSelectedIntervention.length} facture(s)` : "non émise",
        },
        {
          label: "Paiement",
          done: hasPayment || (hasInvoice && remainingAmount <= 0 && invoiceTotal > 0),
          value:
            hasInvoice && remainingAmount <= 0 && invoiceTotal > 0
              ? "soldé"
              : hasPayment
                ? `${money(paidTotal)} encaissé(s)`
                : "à encaisser",
        },
      ],
    };
  }, [
    selectedRendezvous,
    selectedIntervention,
    facturesForSelectedIntervention,
    encaissements,
  ]);

  const hubReturnTo = useMemo(() => {
    const selectedFacture = facturesForSelectedIntervention[0] ?? null;

    return queryHref("/clientsauto/hub", {
      clientId: recordId(rootRecord),
      selectedVehicleId: recordId(selectedVehicle),
      selectedRendezvousId: recordId(selectedRendezvous),
      selectedInterventionId: recordId(selectedIntervention),
      selectedFactureId: recordId(selectedFacture),
    });
  }, [
    rootRecord,
    selectedVehicle,
    selectedRendezvous,
    selectedIntervention,
    facturesForSelectedIntervention,
  ]);

  const hubActions = useMemo(() => {
    const selectedFacture = facturesForSelectedIntervention[0] ?? null;

    return RuntimeHubActionContextAdapter.resolve({
      clientId: recordId(rootRecord),
      clientLabel: text(rootRecord, ["displayLabel", "raisonSociale", "nomComplet", "nom", "prenom"], "Client"),
      clientPhone: text(rootRecord, ["telephone", "phone", "mobile", "whatsapp"], ""),
      clientEmail: text(rootRecord, ["email"], ""),
      vehiculeId: recordId(selectedVehicle),
      rendezvousId: recordId(selectedRendezvous),
      interventionId: recordId(selectedIntervention),
      factureId: recordId(selectedFacture),
      unpaidAmount,
      remainingAmount: parcoursAtelierStatus.remainingAmount,
      returnTo: hubReturnTo,
    });
  }, [
    rootRecord,
    selectedVehicle,
    selectedRendezvous,
    selectedIntervention,
    facturesForSelectedIntervention,
    unpaidAmount,
    parcoursAtelierStatus.remainingAmount,
    hubReturnTo,
  ]);

  const openedRelanceAction = useMemo(() => {
    if (!openedRelanceActionKey) {
      return null;
    }

    return hubActions.find((action) => action.key === openedRelanceActionKey) ?? null;
  }, [hubActions, openedRelanceActionKey]);

  const relanceModalContext = useMemo(() => {
    const isFactureRelance =
      openedRelanceAction?.key.includes("relancer-facture") ?? false;

    const selectedFacture = facturesForSelectedIntervention[0] ?? null;
    const amount = isFactureRelance
      ? parcoursAtelierStatus.remainingAmount
      : unpaidAmount;

    const clientLabel = text(
      rootRecord,
      ["displayLabel", "raisonSociale", "nomComplet", "nom", "prenom"],
      "Client"
    );

    const phone = text(rootRecord, ["telephone", "phone", "mobile", "whatsapp"], "");
    const email = text(rootRecord, ["email"], "");
    const factureLabel = text(selectedFacture, ["numero", "numeroFacture", "code"], "-");
    const vehiculeLabel = text(selectedVehicle, ["displayLabel", "immatriculation", "marque"], "-");

    const message = isFactureRelance
      ? [
          "Bonjour " + clientLabel + ",",
          "AMARKHYS Garage vous informe qu'un solde de " + money(amount) + " reste à régler sur votre facture " + factureLabel + ".",
          "Merci de bien vouloir procéder au règlement ou nous contacter pour toute précision.",
        ].join(" ")
      : [
          "Bonjour " + clientLabel + ",",
          "AMARKHYS Garage vous informe que votre compte présente un impayé de " + money(amount) + ".",
          "Merci de bien vouloir procéder au règlement ou nous contacter pour régulariser la situation.",
        ].join(" ");

    const subject = isFactureRelance
      ? "Relance facture AMARKHYS Garage"
      : "Relance compte client AMARKHYS Garage";

    return {
      isFactureRelance,
      amount,
      clientLabel,
      phone,
      email,
      factureLabel,
      vehiculeLabel,
      message,
      subject,
      whatsappHref: buildRelanceWhatsAppHref(phone, message),
      smsHref: buildRelanceSmsHref(phone, message),
      mailHref: buildRelanceMailHref(email, subject, message),
      telHref: normalizeRelancePhone(phone) ? "tel:" + normalizeRelancePhone(phone) : "",
    };
  }, [
    openedRelanceAction,
    facturesForSelectedIntervention,
    parcoursAtelierStatus.remainingAmount,
    unpaidAmount,
    rootRecord,
    selectedVehicle,
  ]);

  const headerContext = useMemo(() => {
    return {
      today: formatTodayLabel(),
      userLabel: getUserLabel(user),
    };
  }, [user]);

  const isCardMode = !["flotte", "entreprise"].includes(clientType.toLowerCase());

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-[2040px] px-8 py-10 xl:px-12 2xl:px-16">
        <section className="space-y-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Clients / Fiche client
              </p>

              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 xl:text-4xl">
                FICHE CLIENT OPÉRATIONNELLE
              </h1>

              <p className="mt-3 max-w-5xl text-base leading-7 text-slate-600">
                Vue 360° du client depuis ses véhicules jusqu’aux factures et encaissements.
                Une interface adaptative selon le type de client (Particulier, Flotte, Entreprise).
              </p>

              <ClientOperationalSearchBox className="mt-6 max-w-5xl" />
            </div>

            <div
              data-amarkhys-hub-header-context="USER_DATE"
              className="min-w-[290px] rounded-[1.75rem] border border-white/70 bg-white/75 p-4 shadow-sm ring-1 ring-slate-100 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-50 to-sky-50 text-2xl ring-1 ring-emerald-100">
                  👤
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-slate-900">
                    {headerContext.userLabel}
                  </p>
                  <p className="mt-1 text-xs font-semibold capitalize text-slate-500">
                    {headerContext.today}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 2xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="space-y-8">
              <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-emerald-100 text-4xl font-black text-emerald-800">
                    {clientName.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-extrabold text-slate-950">{clientName}</h2>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 ring-1 ring-emerald-200">
                        {clientType}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-x-8 gap-y-3 text-sm text-slate-600 md:grid-cols-2 xl:grid-cols-4">
                      <p><span className="font-semibold text-slate-900">Code client :</span> {text(rootRecord, ["codeClient", "code"])}</p>
                      <p><span className="font-semibold text-slate-900">Téléphone :</span> {text(rootRecord, ["telephone", "téléphone"])}</p>
                      <p><span className="font-semibold text-slate-900">Email :</span> {text(rootRecord, ["email"])}</p>
                      <p><span className="font-semibold text-slate-900">Adresse :</span> {text(rootRecord, ["adresse"])}</p>
                      <p><span className="font-semibold text-slate-900">Création :</span> {text(rootRecord, ["dateCreation", "createdAt"])}</p>
                      <p><span className="font-semibold text-slate-900">Dernière visite :</span> {text(rootRecord, ["lastVisit", "derniereVisite"])}</p>
                      <p><span className="font-semibold text-slate-900">Prochain RDV :</span> {text(rootRecord, ["nextAppointment", "prochainRendezVous"])}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    label: "Interventions en cours",
                    value: text(rootRecord, ["activeInterventionsCount", "interventionsActives"], "0"),
                    alert: false,
                  },
                  {
                    label: "Impayés client",
                    value: money(unpaidAmount),
                    alert: unpaidAmount > 0,
                  },
                  {
                    label: "CA cumulé",
                    value: money(revenueTotal),
                    alert: false,
                  },
                  {
                    label: "Prochain RDV",
                    value: text(rootRecord, ["nextAppointment", "prochainRendezVous"]),
                    alert: false,
                  },
                ].map((item) => (
                  <article
                    key={item.label}
                    data-amarkhys-kpi={item.label}
                    className={[
                      "min-h-[112px] rounded-[1.75rem] px-5 py-5 shadow-sm ring-1 transition",
                      item.alert
                        ? "bg-orange-50/70 ring-orange-200"
                        : "bg-white ring-slate-200",
                    ].join(" ")}
                  >
                    <p
                      className={[
                        "text-[10px] font-black uppercase tracking-[0.14em]",
                        item.alert ? "text-orange-600" : "text-slate-500",
                      ].join(" ")}
                    >
                      {item.label}
                    </p>
                    <p
                      className={[
                        "mt-3 text-xl font-black leading-tight md:text-2xl",
                        item.alert ? "text-orange-800" : "text-slate-950",
                      ].join(" ")}
                    >
                      {item.value}
                    </p>
                  </article>
                ))}
              </section>

<section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
                <SectionTitle
                  title="🚗 VÉHICULES DU CLIENT"
                  action={
                    <Link
                      href={addVehicleHref}
                      className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white"
                    >
                      Ajouter un véhicule
                    </Link>
                  }
                />

                <p className="mb-5 text-sm font-medium text-slate-500">
                  Selectionnez un vehicule pour afficher ses rendez-vous, interventions, lignes, factures et encaissements.
                </p>

                {vehicles.length === 0 ? (
                  <EmptyCard>Aucun véhicule lié à ce client.</EmptyCard>
                ) : isCardMode ? (
                  <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
                    {vehicles.map((vehicle, vehicleIndex) => {
                    const isSelectedVehicle =
                      recordId(vehicle) === recordId(selectedVehicle);

                    const vehicleEditHref = queryHref(
                      href("/vehicules", vehicle) + "/edit",
                      {
                        clientId,
                        selectedVehicleId: recordId(vehicle),
                        returnTo: clientReturnTo,
                      }
                    );

                    const vehicleVisual = pickVehicleSedanVisual(
                      recordId(vehicle),
                      vehicleIndex
                    );

                    const vehicleBrand = text(vehicle, ["marque"], "Marque");
                    const vehicleModel = text(vehicle, ["modele", "modèle"], "Modèle");
                    const vehiclePlate = text(
                      vehicle,
                      [
                        "immatriculation",
                        "plaqueImmatriculation",
                        "numeroImmatriculation",
                        "numeroPlaque",
                      ],
                      "Non renseignée"
                    );

                    const vehicleMileageRaw = text(
                      vehicle,
                      ["kilometrage", "kilométrage"],
                      "Non renseigné"
                    );

                    const vehicleMileage =
                      vehicleMileageRaw !== "Non renseigné" &&
                      !/km/i.test(vehicleMileageRaw)
                        ? vehicleMileageRaw + " km"
                        : vehicleMileageRaw;

                    return (
                      <article
                        key={recordId(vehicle)}
                        data-amarkhys-vehicle-card="sedan-premium"
                        className={[
                          "relative min-h-[238px] overflow-hidden rounded-[1.9rem] border p-5 text-left shadow-sm transition",
                          isSelectedVehicle
                            ? vehicleVisual.selectedCardClass
                            : vehicleVisual.idleCardClass,
                        ].join(" ")}
                      >
                        <button
                          type="button"
                          onClick={() => setLocalSelectedVehicleId(recordId(vehicle))}
                          className="absolute inset-0 z-0 cursor-pointer"
                          aria-label="Sélectionner ce véhicule"
                        />

                        <Link
                          href={vehicleEditHref}
                          onClick={(event) => event.stopPropagation()}
                          aria-label="Modifier le véhicule"
                          title="Modifier le véhicule"
                          className="pointer-events-auto absolute -right-7 -top-2 z-20 inline-flex w-[190px] transition hover:scale-105"
                        >
                          <VehicleSedanIcon
                            className={[
                              "h-auto w-full drop-shadow-sm",
                              vehicleVisual.sedanClass,
                            ].join(" ")}
                          />
                        </Link>

                        <div className="relative z-10 pr-24">
                          <p
                            className={[
                              "text-[10px] font-black uppercase tracking-[0.22em]",
                              vehicleVisual.kickerClass,
                            ].join(" ")}
                          >
                            {vehicleVisual.label}
                          </p>

                          <p className="mt-2 text-lg font-extrabold text-slate-950">
                            {vehicleBrand} {vehicleModel}
                          </p>

                          <p className="mt-1 text-sm font-semibold text-slate-500">
                            {text(
                              vehicle,
                              ["typeVehicule", "type", "categorie", "genre"],
                              "Berline"
                            )}
                          </p>
                        </div>

                        <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-2xl bg-white/65 px-4 py-3 ring-1 ring-white/80">
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                              Immatriculation
                            </p>
                            <p className="mt-1 text-base font-black tracking-[0.08em] text-slate-900">
                              {vehiclePlate}
                            </p>
                          </div>

                          <div className="rounded-2xl bg-white/65 px-4 py-3 ring-1 ring-white/80">
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                              Kilométrage
                            </p>
                            <p className="mt-1 text-base font-black text-slate-900">
                              {vehicleMileage}
                            </p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-[1.75rem] border border-slate-200">
                    <table className="min-w-full text-left text-sm">
                      <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                          <th className="px-5 py-4">Véhicule</th>
                          <th className="px-5 py-4">Immatriculation</th>
                          <th className="px-5 py-4">Statut</th>
                          <th className="px-5 py-4">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {vehicles.map((vehicle) => (
                          <tr key={recordId(vehicle)}>
                            <td className="px-5 py-4 font-semibold text-slate-900">
                              {text(vehicle, ["displayLabel", "marque"])}
                            </td>
                            <td className="px-5 py-4 text-slate-600">
                              {text(vehicle, ["immatriculation"])}
                            </td>
                            <td className="px-5 py-4 text-slate-600">
                              {text(vehicle, ["statut"], "actif")}
                            </td>
                            <td className="px-5 py-4">
                              <button
                                type="button"
                                onClick={() => setLocalSelectedVehicleId(recordId(vehicle))}
                                className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white"
                              >
                                Sélectionner
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              <section
                id="parcours-operationnel"
                className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 xl:p-8"
              >
                <SectionTitle title="PARCOURS OPÉRATIONNEL : CLIENT → VÉHICULE → RENDEZ-VOUS → INTERVENTION → FACTURE" />

                <div
                  data-amarkhys-parcours-atelier-status="SUMMARY"
                  className="mb-6 rounded-[1.75rem] bg-white p-5 shadow-sm ring-1 ring-slate-200"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                        Statut synthétique du parcours atelier
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <span
                          className={[
                            "rounded-full px-4 py-2 text-sm font-black ring-1",
                            parcoursAtelierStatus.toneClass,
                          ].join(" ")}
                        >
                          {parcoursAtelierStatus.label}
                        </span>

                        <span className="text-sm font-semibold text-slate-600">
                          {parcoursAtelierStatus.nextAction}
                        </span>
                      </div>

                      <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">
                        {parcoursAtelierStatus.description}
                      </p>
                    </div>

                    <div className="grid min-w-[360px] flex-1 gap-3 sm:grid-cols-4">
                      {parcoursAtelierStatus.steps.map((step) => (
                        <div
                          key={step.label}
                          className={[
                            "rounded-2xl p-4 ring-1",
                            step.done
                              ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
                              : "bg-slate-50 text-slate-500 ring-slate-200",
                          ].join(" ")}
                        >
                          <p className="text-[10px] font-black uppercase tracking-wide">
                            {step.label}
                          </p>
                          <p className="mt-2 text-sm font-bold">
                            {step.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white">
                      <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                          1. Choisir un rendez-vous
                        </p>
                        <h3 className="mt-1 text-lg font-extrabold text-slate-950">
                          Rendez-vous du véhicule
                        </h3>
                      </div>

                      {rendezvous.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-left text-sm">
                            <thead className="bg-slate-950 text-xs uppercase tracking-wide text-white">
                              <tr>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Heure</th>
                                <th className="px-4 py-3">Service</th>
                                <th className="px-4 py-3">Statut</th>
                                <th className="px-4 py-3">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                              {rendezvous.map((appointment) => {
                                const isSelected =
                                  recordId(appointment) === recordId(selectedRendezvous);

                                return (
                                  <tr
                                    key={recordId(appointment)}
                                    onClick={() => {
                                      setSelectedRendezvousId(recordId(appointment));
                                      setSelectedInterventionId(null);
                                    }}
                                    className={[
                                      "cursor-pointer transition",
                                      isSelected ? "bg-emerald-50" : "hover:bg-slate-50",
                                    ].join(" ")}
                                  >
                                    <td className="px-4 py-3 font-semibold text-slate-950">
                                      {text(appointment, ["dateRendezVous", "date", "activityDate"])}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                      {text(appointment, ["heureRendezVous", "heure", "startAt"])}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                      {text(appointment, ["typeService", "service", "displayLabel"])}
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">
                                      {text(appointment, ["statut", "status"], "suivi")}
                                    </td>
                                    <td className="px-4 py-3">
                                                                            <button
                                        type="button"
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          const appointmentId = recordId(appointment);
                                          setSelectedRendezvousId(appointmentId);
                                          setSelectedInterventionId(null);
                                          setOpenedRendezvousDetailId((current) =>
                                            current === appointmentId ? null : appointmentId
                                          );
                                        }}
                                        className={[
                                          "rounded-full px-3 py-1.5 text-xs font-bold",
                                          openedRendezvousDetailId === recordId(appointment)
                                            ? "bg-emerald-700 text-white"
                                            : "bg-slate-100 text-slate-900",
                                        ].join(" ")}
                                      >
                                        Détails
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <EmptyCard>Aucun rendez-vous trouvé pour ce véhicule.</EmptyCard>
                      )}
                    </section>

                    {openedRendezvousDetail ? (
                      <div
                        data-amarkhys-rdv-detail-modal="RENDEZVOUS_DETAIL_MODAL"
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm"
                        role="dialog"
                        aria-modal="true"
                      >
                        <div className="w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-slate-200">
                          <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white px-6 py-5">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <div>
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
                                  Rendez-vous atelier
                                </p>
                                <h3 className="mt-2 text-2xl font-black text-slate-950">
                                  Détails du rendez-vous
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                  Consultation rapide du rendez-vous sélectionné.
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => setOpenedRendezvousDetailId(null)}
                                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
                              >
                                Fermer
                              </button>
                            </div>
                          </div>

                          <div className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-5">
                            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                              <p className="text-xs font-bold uppercase text-slate-400">Date</p>
                              <p className="mt-2 font-semibold text-slate-950">
                                {text(openedRendezvousDetail, ["dateRendezVous", "date", "activityDate"])}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                              <p className="text-xs font-bold uppercase text-slate-400">Heure</p>
                              <p className="mt-2 font-semibold text-slate-950">
                                {text(openedRendezvousDetail, ["heureRendezVous", "heure", "startAt"])}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                              <p className="text-xs font-bold uppercase text-slate-400">Durée</p>
                              <p className="mt-2 font-semibold text-slate-950">
                                {text(openedRendezvousDetail, ["durationMinutes", "dureeMinutes", "duration"], "-")} min
                              </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                              <p className="text-xs font-bold uppercase text-slate-400">Type service</p>
                              <p className="mt-2 font-semibold text-slate-950">
                                {text(openedRendezvousDetail, ["typeService", "service", "displayLabel"])}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                              <p className="text-xs font-bold uppercase text-slate-400">Statut</p>
                              <span className="mt-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                                {text(openedRendezvousDetail, ["statut", "status"], "suivi")}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
                            <Link
                              href={withReturnTo("/rendezvous/" + recordId(openedRendezvousDetail), hubReturnTo, {
                                clientId: recordId(rootRecord),
                                selectedVehicleId: recordId(selectedVehicle),
                                selectedRendezvousId: recordId(openedRendezvousDetail),
                              })}
                              className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-100"
                            >
                              Ouvrir la fiche
                            </Link>

                            <Link
                              href={withReturnTo("/rendezvous/" + recordId(openedRendezvousDetail) + "/edit", hubReturnTo, {
                                clientId: recordId(rootRecord),
                                selectedVehicleId: recordId(selectedVehicle),
                                selectedRendezvousId: recordId(openedRendezvousDetail),
                              })}
                              className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-800"
                            >
                              Modifier le RDV
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        2. Interventions liées au rendez-vous
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-500">
                        Les interventions ci-dessous sont filtrées par le rendez-vous sélectionné.
                      </p>

                      {selectedRendezvous ? (
                        <p className="mt-1 text-sm text-slate-500">
                          Filtre actif : {text(selectedRendezvous, ["dateRendezVous", "date"])} · {text(selectedRendezvous, ["typeService", "service"])}
                        </p>
                      ) : null}

                      {interventionsForSelectedRendezvous.length > 0 ? (
                        <div className="mt-4 rounded-[1.5rem] border border-slate-200 bg-white p-3">
                          <ERPOperationalTable
                            module={interventionsHubModule}
                            data={interventionsForSelectedRendezvous as Record<string, unknown>[]}
                          />
                        </div>
                      ) : (
                        <EmptyCard>Aucune intervention n’est encore liée à ce rendez-vous. Sélectionnez un autre rendez-vous ou créez une intervention depuis le parcours atelier.</EmptyCard>
                      )}
                    </section>
              </section>

              <section id="parcours-detaille" className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 xl:p-8">
                <SectionTitle title="SYNTHÈSE DU PARCOURS" />

                <div className="grid gap-4 xl:grid-cols-5">
                  {[
                    [
                      "1. Sélection du véhicule",
                      selectedVehicle
                        ? text(selectedVehicle, ["displayLabel", "immatriculation"])
                        : "Aucun véhicule",
                    ],
                    ["2. Interventions du véhicule", `${interventions.length} intervention(s)`],
                    ["3. Détail intervention", `${lignes.length} ligne(s)`],
                    ["4. Facture liée", `${factures.length} facture(s)`],
                    ["5. Encaissements", `${encaissements.length} encaissement(s)`],
                  ].map(([title, value]) => (
                    <article key={title} className="rounded-[1.5rem] bg-slate-50 p-5">
                      <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                        {title}
                      </p>
                      <p className="mt-3 text-base font-bold text-slate-950">{value}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <SectionTitle title="ADAPTATION SELON LE TYPE DE CLIENT" />
                <div className="space-y-4 text-sm">
                  <div className="rounded-[1.5rem] bg-emerald-50 p-4">
                    <p className="font-black text-emerald-900">Particulier</p>
                    <p className="mt-1 text-emerald-800">
                      Véhicules en cartes, max 4 par ligne, lecture visuelle rapide.
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] bg-slate-50 p-4">
                    <p className="font-black text-slate-950">Flotte</p>
                    <p className="mt-1 text-slate-600">
                      Véhicules en tableau compact, volume important, comparaison facilitée.
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] bg-slate-50 p-4">
                    <p className="font-black text-slate-950">Entreprise</p>
                    <p className="mt-1 text-slate-600">
                      Tableau administratif avec affectation, contrat et statut.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <SectionTitle title="NAVIGATION RAPIDE" />
                <div className="grid gap-3">
                  <Link
                    href={vehicleDetailHref}
                    className="rounded-[1.25rem] bg-slate-950 px-4 py-3 text-sm font-bold text-white"
                  >
                    🚗 Fiche véhicule complète
                  </Link>

                  <Link
                    href={interventionDetailHref}
                    className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"
                  >
                    🔧 Fiche intervention
                  </Link>

                  <Link
                    href={invoiceDetailHref}
                    className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"
                  >
                    🧾 Facture complète
                  </Link>

                  <Link
                    href={paymentDetailHref}
                    className="rounded-[1.25rem] bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900"
                  >
                    💳 Historique encaissements
                  </Link>
                </div>
              </section>

                            <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <SectionTitle title="ACTIONS CLIENT" />

                <div data-amarkhys-hub-actions="CLIENT_CONTEXT_ACTIONS">
                                <div className="space-y-3">
                  {hubActions.map((action) => {
                    const isRelanceAction = action.key.includes("relancer-client") || action.key.includes("relancer-facture");

                    const content = (
                      <>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center text-2xl font-black text-current">
                          {hubActionIcon(action.key)}
                        </span>

                        <span className="min-w-0 flex-1">
                          {action.label}
                        </span>
                      </>
                    );

                    if (isRelanceAction) {
                      return (
                        <button
                          key={action.key}
                          type="button"
                          disabled={action.disabled}
                          className={[
                            hubActionClassName(action.key),
                            action.disabled ? "cursor-not-allowed opacity-50" : "",
                          ].join(" ")}
                          title={action.description}
                          onClick={() => setOpenedRelanceActionKey(action.key)}
                        >
                          {content}
                        </button>
                      );
                    }

                    if (action.href && !action.disabled) {
                      return (
                        <Link
                          key={action.key}
                          href={action.href}
                          className={hubActionClassName(action.key)}
                          title={action.description}
                        >
                          {content}
                        </Link>
                      );
                    }

                    return (
                      <button
                        key={action.key}
                        type="button"
                        disabled={action.disabled}
                        className={[
                          hubActionClassName(action.key),
                          action.disabled ? "cursor-not-allowed opacity-50" : "",
                        ].join(" ")}
                        title={action.description}
                      >
                        {content}
                      </button>
                    );
                  })}
                </div>
              </div>
              </section>

              <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <SectionTitle title="DOSSIER VÉHICULE SÉLECTIONNÉ" />

                {selectedVehicle ? (
                  <div className="space-y-4">
                    <div className="rounded-[1.5rem] bg-emerald-50 p-4">
                      <p className="text-lg font-black text-slate-950">
                        {text(selectedVehicle, ["displayLabel", "immatriculation", "marque"])}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {text(selectedVehicle, ["marque"])} · {text(selectedVehicle, ["modele", "modèle"])}
                      </p>
                    </div>

                    <div className="grid gap-3">
                      <EmptyCard>Rendez-vous liés : {rendezvous.length}</EmptyCard>
                      <EmptyCard>Interventions liées : {interventions.length}</EmptyCard>
                      <EmptyCard>Factures liées : {factures.length}</EmptyCard>
                      <EmptyCard>Encaissements liés : {encaissements.length}</EmptyCard>
                    </div>
                  </div>
                ) : (
                  <EmptyCard>Aucun véhicule sélectionné.</EmptyCard>
                )}
              </section>
            </aside>
          </div>
        </section>
      </div>

      {openedRelanceAction ? (
        <div
          data-amarkhys-relance-modal="CLIENT_RELANCE_MODAL"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-slate-200">
            <div className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white px-6 py-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-700">
                    Relance AMARKHYS
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-slate-950">
                    {openedRelanceAction.label}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Choisissez le canal de relance et gardez le contexte client.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenedRelanceActionKey(null)}
                  className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
                >
                  Fermer
                </button>
              </div>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <p className="text-xs font-bold uppercase text-slate-400">Client</p>
                <p className="mt-2 font-semibold text-slate-950">
                  {relanceModalContext.clientLabel}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <p className="text-xs font-bold uppercase text-slate-400">Téléphone</p>
                <p className="mt-2 font-semibold text-slate-950">
                  {relanceModalContext.phone || "Non renseigné"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <p className="text-xs font-bold uppercase text-slate-400">Véhicule</p>
                <p className="mt-2 font-semibold text-slate-950">
                  {relanceModalContext.vehiculeLabel}
                </p>
              </div>

              <div className="rounded-2xl bg-orange-50 p-4 ring-1 ring-orange-200">
                <p className="text-xs font-bold uppercase text-orange-500">
                  {relanceModalContext.isFactureRelance ? "Reste à encaisser" : "Impayés client"}
                </p>
                <p className="mt-2 text-xl font-black text-orange-800">
                  {money(relanceModalContext.amount)}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                  Message proposé
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {relanceModalContext.message}
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <a
                  href={relanceModalContext.whatsappHref || undefined}
                  target="_blank"
                  rel="noreferrer"
                  className={[
                    "rounded-2xl px-4 py-3 text-center text-sm font-semibold ring-1",
                    relanceModalContext.whatsappHref
                      ? "bg-white text-emerald-600 ring-emerald-100 hover:bg-emerald-50/40"
                      : "pointer-events-none bg-white text-slate-300 ring-slate-100",
                  ].join(" ")}
                >
                  💬 WhatsApp
                </a>

                <a
                  href={relanceModalContext.smsHref || undefined}
                  className={[
                    "rounded-2xl px-4 py-3 text-center text-sm font-semibold ring-1",
                    relanceModalContext.smsHref
                      ? "bg-white text-sky-600 ring-sky-100 hover:bg-sky-50/40"
                      : "pointer-events-none bg-white text-slate-300 ring-slate-100",
                  ].join(" ")}
                >
                  📱 SMS
                </a>

                <a
                  href={relanceModalContext.telHref || undefined}
                  className={[
                    "rounded-2xl px-4 py-3 text-center text-sm font-semibold ring-1",
                    relanceModalContext.telHref
                      ? "bg-white text-slate-600 ring-slate-100 hover:bg-slate-50/50"
                      : "pointer-events-none bg-white text-slate-300 ring-slate-100",
                  ].join(" ")}
                >
                  📱 Appel
                </a>

                <a
                  href={relanceModalContext.mailHref || undefined}
                  className={[
                    "rounded-2xl px-4 py-3 text-center text-sm font-semibold ring-1",
                    relanceModalContext.mailHref
                      ? "bg-white text-slate-600 ring-slate-100 hover:bg-slate-50/50"
                      : "pointer-events-none bg-white text-slate-300 ring-slate-100",
                  ].join(" ")}
                >
                  ✉ Email
                </a>

                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(relanceModalContext.message)}
                  className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-600 ring-1 ring-slate-100 hover:bg-slate-50/50"
                >
                  ⧉ Copier message
                </button>

                <button
                  type="button"
                  onClick={() => setOpenedRelanceActionKey(null)}
                  className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-600 ring-1 ring-slate-100 hover:bg-slate-50/50"
                >
                  ✓ Terminer
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

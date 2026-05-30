const fs = require("fs");
const path = require("path");

const root = process.cwd();

function full(relativePath) {
  return path.join(root, relativePath);
}

function ensureDir(relativePath) {
  fs.mkdirSync(full(relativePath), { recursive: true });
}

function write(relativePath, content) {
  ensureDir(path.dirname(relativePath));
  fs.writeFileSync(full(relativePath), content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

function backup(relativePath, suffix) {
  const source = full(relativePath);
  if (!fs.existsSync(source)) return;

  const target = `${source}.${suffix}`;
  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[BACKUP]", path.relative(root, target));
  }
}

const loaderPath = "src/runtime/hub/RuntimeClientOperationalTodayLoader.ts";
const cardsPath = "src/components/erp/hub/ClientOperationalTodayCards.tsx";
const pagePath = "src/app/(private)/clientsauto/hub/page.tsx";

backup(pagePath, "bak-q2op-b8b-empty-today-cards");

const loader = `import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
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
        description: unpaidAmount > 0 ? \`\${unpaidAmount} à suivre\` : "Aucun montant détecté",
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
        id: \`rdv:\${recordId(record)}\`,
        type: "rendezvous" as const,
        label: appointmentLabel(record),
        subtitle: readFirstString(record, ["statut", "typeService", "clientLabel"], "Rendez-vous"),
        href: \`/rendezvous/\${recordId(record)}\`,
      })),
      ...activeInterventions.slice(0, 4).map((record) => ({
        id: \`intervention:\${recordId(record)}\`,
        type: "intervention" as const,
        label: interventionLabel(record),
        subtitle: readFirstString(record, ["statut", "dateIntervention"], "Intervention"),
        href: \`/interventionsauto/\${recordId(record)}\`,
      })),
      ...unpaidInvoices.slice(0, 4).map((record) => ({
        id: \`facture:\${recordId(record)}\`,
        type: "facture" as const,
        label: invoiceLabel(record),
        subtitle: readFirstString(record, ["statut", "dateFacture"], "Facture"),
        href: \`/facturesauto/\${recordId(record)}\`,
      })),
      ...recentVehicles.slice(0, 4).map((record) => ({
        id: \`vehicule:\${recordId(record)}\`,
        type: "vehicule" as const,
        label: vehicleLabel(record),
        subtitle: readFirstString(record, ["statut", "clientLabel"], "Véhicule"),
        href: \`/vehicules/\${recordId(record)}\`,
      })),
    ].slice(0, 10);

    return {
      cards,
      items,
    };
  }
}
`;

const cards = `"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  RuntimeClientOperationalTodayLoader,
  type ClientOperationalTodayResult,
} from "@/runtime/hub/RuntimeClientOperationalTodayLoader";

export function ClientOperationalTodayCards() {
  const [state, setState] = useState<ClientOperationalTodayResult | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const result = await RuntimeClientOperationalTodayLoader.load();

        if (!active) return;

        setState(result);
      } catch (error) {
        console.error("[ClientOperationalTodayCards] load failed", error);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  if (!state) {
    return (
      <section className="grid gap-5 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-36 animate-pulse rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200"
          />
        ))}
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Aujourd’hui au garage
        </p>
        <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
          Ce qui va se passer aujourd’hui
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        {state.cards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
                {card.icon}
              </span>
              <span className="text-3xl font-extrabold text-slate-950">
                {card.value}
              </span>
            </div>

            <p className="mt-5 text-sm font-extrabold uppercase tracking-wide text-slate-500">
              {card.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {card.description}
            </p>
          </Link>
        ))}
      </div>

      <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Activité opérationnelle
            </p>
            <h3 className="mt-1 text-lg font-extrabold text-slate-950">
              Derniers éléments à traiter
            </h3>
          </div>
        </div>

        {state.items.length > 0 ? (
          <div className="grid gap-3 lg:grid-cols-2">
            {state.items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="rounded-[1.5rem] bg-slate-50 p-4 ring-1 ring-slate-100 hover:bg-emerald-50"
              >
                <p className="text-sm font-extrabold text-slate-950">
                  {item.label}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.type} · {item.subtitle}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] bg-slate-50 p-5 text-sm text-slate-500">
            Aucun élément opérationnel urgent détecté pour aujourd’hui.
          </div>
        )}
      </section>
    </section>
  );
}
`;

write(loaderPath, loader);
write(cardsPath, cards);

let page = fs.readFileSync(full(pagePath), "utf8");

if (!page.includes("ClientOperationalTodayCards")) {
  page = page.replace(
    `import { ClientOperationalSearchBox } from "@/components/erp/hub/ClientOperationalSearchBox";`,
    `import { ClientOperationalSearchBox } from "@/components/erp/hub/ClientOperationalSearchBox";
import { ClientOperationalTodayCards } from "@/components/erp/hub/ClientOperationalTodayCards";`
  );
}

if (!page.includes("<ClientOperationalTodayCards />")) {
  page = page.replace(
    `</section>

            <section className="grid gap-6 lg:grid-cols-3">`,
    `</section>

            <ClientOperationalTodayCards />

            <section className="grid gap-6 lg:grid-cols-3">`
  );
}

fs.writeFileSync(full(pagePath), page, "utf8");
console.log("[WRITTEN]", pagePath);

const required = [
  "RuntimeClientOperationalTodayLoader",
  "ClientOperationalTodayCards",
  "Aujourd’hui au garage",
  "Ce qui va se passer aujourd’hui",
  "Rendez-vous aujourd’hui",
  "Interventions en cours",
  "Factures impayées",
  "Véhicules à suivre",
];

const scope = loader + cards + page;

for (const marker of required) {
  if (!scope.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

console.log("[Q2-OP-B8B] Empty client sheet now shows today garage operational cards.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");
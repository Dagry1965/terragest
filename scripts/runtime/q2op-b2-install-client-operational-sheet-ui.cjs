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

const pagePath = "src/app/(private)/clientsauto/hub/page.tsx";
const clientPath = "src/app/(private)/clientsauto/hub/ClientOperationalSheetClient.tsx";
const sheetPath = "src/components/erp/hub/ERPClientOperationalSheet.tsx";

if (!fs.existsSync(full("src/runtime/hub/RuntimeClientOperationalHubLoader.ts"))) {
  console.error("[MISSING] RuntimeClientOperationalHubLoader");
  process.exit(1);
}

backup(pagePath, "bak-q2op-b2-client-operational-sheet");
backup(clientPath, "bak-q2op-b2-client-operational-sheet");
backup(sheetPath, "bak-q2op-b2-client-operational-sheet");

const pageContent = `import type { ERPRecordHubConfig } from "@/runtime/hub";
import { ClientOperationalSheetClient } from "./ClientOperationalSheetClient";

type ClientOperationalHubPageProps = {
  searchParams?: Promise<{
    clientId?: string;
    selectedVehicleId?: string;
  }>;
};

const clientOperationalSheetConfig: ERPRecordHubConfig = {
  enabled: true,
  key: "clientsauto-operational-sheet",
  label: "Fiche Client Op\\u00e9rationnelle",
  rootModule: "clientsauto",
  layout: "wide",
  search: {
    placeholder: "Rechercher un client...",
    filterFields: ["typeClient", "categorieClient", "statut"],
    searchFields: ["nom", "prenom", "raisonSociale", "telephone", "email", "codeClient"],
  },
  header: {
    titleFields: ["displayLabel", "raisonSociale", "nom", "prenom"],
    subtitleFields: ["typeClient", "telephone", "email", "codeClient"],
    badgeFields: ["typeClient", "statut"],
    avatarField: "avatar",
  },
  kpis: [
    {
      key: "vehiclesCount",
      label: "V\\u00e9hicules",
      source: "computed",
      field: "vehiclesCount",
      format: "number",
    },
    {
      key: "activeInterventionsCount",
      label: "Interventions actives",
      source: "computed",
      field: "activeInterventionsCount",
      format: "number",
    },
    {
      key: "unpaidInvoicesCount",
      label: "Factures impay\\u00e9es",
      source: "computed",
      field: "unpaidInvoicesCount",
      format: "number",
    },
    {
      key: "revenueTotal",
      label: "CA cumul\\u00e9",
      source: "computed",
      field: "revenueTotal",
      format: "number",
    },
    {
      key: "lastVisit",
      label: "Derni\\u00e8re visite",
      source: "computed",
      field: "lastVisit",
      format: "date",
    },
    {
      key: "nextAppointment",
      label: "Prochain RDV",
      source: "computed",
      field: "nextAppointment",
      format: "date",
    },
  ],
  primaryCollection: {
    moduleKey: "vehicules",
    foreignKey: "clientId",
    label: "V\\u00e9hicules du client",
    defaultDisplayMode: "cards",
    displayModeSourceField: "clientType",
    displayModes: {
      Particulier: "cards",
      particulier: "cards",
      Flotte: "table",
      flotte: "table",
      Entreprise: "table",
      entreprise: "table",
    },
    selectionQueryParam: "selectedVehicleId",
    labelFields: ["displayLabel", "immatriculation", "marque", "modele"],
    subtitleFields: ["annee", "carburant", "kilometrage", "statut"],
    cardFields: ["displayLabel", "immatriculation", "annee", "carburant", "kilometrage", "statut"],
    tableFields: ["immatriculation", "marque", "modele", "annee", "statut"],
    actions: [
      {
        key: "open-vehicle",
        label: "Fiche v\\u00e9hicule",
        kind: "open-record",
        moduleKey: "vehicules",
        hrefTemplate: "/vehicules/{id}",
        variant: "secondary",
      },
    ],
  },
  selectedRecordDetails: [
    {
      key: "rendezvous",
      label: "Rendez-vous li\\u00e9s",
      moduleKey: "rendezvous",
      foreignKey: "vehiculeId",
      layout: "collapsible-list",
      labelFields: ["displayLabel", "dateRendezVous", "heure", "statut"],
      subtitleFields: ["typeService", "durationMinutes"],
      actions: [
        {
          key: "open-rdv",
          label: "Fiche RDV",
          kind: "open-record",
          moduleKey: "rendezvous",
          hrefTemplate: "/rendezvous/{id}",
          variant: "secondary",
        },
      ],
    },
    {
      key: "interventions",
      label: "Interventions du v\\u00e9hicule",
      moduleKey: "interventionsauto",
      foreignKey: "vehiculeId",
      layout: "collapsible-list",
      labelFields: ["displayLabel", "dateIntervention", "statut", "montantTTC"],
      subtitleFields: ["rendezVousId"],
      actions: [
        {
          key: "open-intervention",
          label: "Fiche intervention",
          kind: "open-record",
          moduleKey: "interventionsauto",
          hrefTemplate: "/interventionsauto/{id}",
          variant: "secondary",
        },
      ],
    },
    {
      key: "lignes",
      label: "Lignes d'intervention",
      moduleKey: "lignesinterventionauto",
      foreignKey: "interventionId",
      layout: "collapsible-list",
      labelFields: ["displayLabel", "designation", "typeLigne", "quantite"],
      subtitleFields: ["montantTTC", "statut"],
      actions: [
        {
          key: "open-ligne",
          label: "Fiche ligne",
          kind: "open-record",
          moduleKey: "lignesinterventionauto",
          hrefTemplate: "/lignesinterventionauto/{id}",
          variant: "secondary",
        },
      ],
    },
    {
      key: "factures",
      label: "Factures li\\u00e9es",
      moduleKey: "facturesauto",
      foreignKey: "vehiculeId",
      layout: "collapsible-list",
      labelFields: ["displayLabel", "numero", "statut", "montantTTC"],
      subtitleFields: ["dateFacture"],
      actions: [
        {
          key: "open-facture",
          label: "Facture compl\\u00e8te",
          kind: "open-record",
          moduleKey: "facturesauto",
          hrefTemplate: "/facturesauto/{id}",
          variant: "secondary",
        },
      ],
    },
    {
      key: "encaissements",
      label: "Encaissements li\\u00e9s",
      moduleKey: "encaissementsauto",
      foreignKey: "factureId",
      layout: "collapsible-list",
      labelFields: ["displayLabel", "numero", "statut", "montant"],
      subtitleFields: ["dateEncaissement", "modePaiement"],
      actions: [
        {
          key: "open-encaissement",
          label: "Historique encaissements",
          kind: "open-record",
          moduleKey: "encaissementsauto",
          hrefTemplate: "/encaissementsauto/{id}",
          variant: "secondary",
        },
      ],
    },
  ],
};

export default async function ClientOperationalHubPage({
  searchParams,
}: ClientOperationalHubPageProps) {
  const params = searchParams ? await searchParams : {};
  const clientId = params.clientId ?? null;
  const selectedVehicleId = params.selectedVehicleId ?? null;

  if (!clientId) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
            Fiche client op\\u00e9rationnelle
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            Aucun client s\\u00e9lectionn\\u00e9
          </h1>

          <p className="mt-2 max-w-3xl text-sm text-slate-500">
            {"S\\u00e9lectionnez un client pour afficher la vue 360\\u00b0 depuis ses v\\u00e9hicules jusqu\\u2019aux factures et encaissements."}
          </p>
        </section>
      </main>
    );
  }

  return (
    <ClientOperationalSheetClient
      config={clientOperationalSheetConfig}
      clientId={clientId}
      selectedVehicleId={selectedVehicleId}
    />
  );
}
`;

const clientContent = `"use client";

import { useEffect, useState } from "react";
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";
import { RuntimeClientOperationalHubLoader } from "@/runtime/hub/RuntimeClientOperationalHubLoader";
import { ERPClientOperationalSheet } from "@/components/erp/hub/ERPClientOperationalSheet";

type ClientOperationalSheetClientProps = {
  config: ERPRecordHubConfig;
  clientId: string;
  selectedVehicleId?: string | null;
};

type LoadState = {
  rootRecord: ERPRecordHubRecord | null;
  primaryRecords: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
};

export function ClientOperationalSheetClient({
  config,
  clientId,
  selectedVehicleId = null,
}: ClientOperationalSheetClientProps) {
  const [state, setState] = useState<LoadState | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setError(null);

        const result = await RuntimeClientOperationalHubLoader.load({
          config,
          clientId,
          selectedVehicleId,
        });

        if (!active) return;

        setState({
          rootRecord: result.rootRecord,
          primaryRecords: result.primaryRecords,
          relatedRecordsBySection: result.relatedRecordsBySection,
        });
      } catch (loadError) {
        console.error("[ClientOperationalSheetClient] load failed", loadError);

        if (!active) return;

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Impossible de charger la fiche client op\\u00e9rationnelle."
        );
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [config, clientId, selectedVehicleId]);

  if (error) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl rounded-[2rem] border border-red-100 bg-white p-8 text-sm text-red-700 shadow-sm">
          {error}
        </section>
      </main>
    );
  }

  if (!state) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
          Chargement de la fiche client op\\u00e9rationnelle...
        </section>
      </main>
    );
  }

  return (
    <ERPClientOperationalSheet
      config={config}
      rootRecord={state.rootRecord}
      vehicles={state.primaryRecords}
      relatedRecordsBySection={state.relatedRecordsBySection}
      selectedVehicleId={selectedVehicleId}
    />
  );
}
`;

const sheetContent = `"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";

type ERPClientOperationalSheetProps = {
  config: ERPRecordHubConfig;
  rootRecord: ERPRecordHubRecord | null;
  vehicles: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
  selectedVehicleId?: string | null;
};

function text(record: ERPRecordHubRecord | null | undefined, fields: string[], fallback = "-"): string {
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

function numberValue(record: ERPRecordHubRecord | null | undefined, fields: string[]): number {
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
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(value);
}

function recordId(record: ERPRecordHubRecord | null | undefined): string {
  return String(record?.id ?? "");
}

function href(modulePath: string, record: ERPRecordHubRecord | null | undefined): string {
  const id = recordId(record);
  return id ? \`\${modulePath}/\${id}\` : modulePath;
}

function badgeTone(value: string): string {
  const normalized = value.toLowerCase();

  if (normalized.includes("pay") || normalized.includes("actif") || normalized.includes("termin")) {
    return "bg-emerald-100 text-emerald-800 ring-emerald-200";
  }

  if (normalized.includes("impay") || normalized.includes("retard") || normalized.includes("annul")) {
    return "bg-rose-100 text-rose-800 ring-rose-200";
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
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-950">
        {title}
      </h2>
      {action}
    </div>
  );
}

export function ERPClientOperationalSheet({
  config,
  rootRecord,
  vehicles,
  relatedRecordsBySection,
  selectedVehicleId = null,
}: ERPClientOperationalSheetProps) {
  const [localSelectedVehicleId, setLocalSelectedVehicleId] = useState<string | null>(
    selectedVehicleId ?? recordId(vehicles[0]) ?? null
  );

  const selectedVehicle = useMemo(() => {
    return (
      vehicles.find((vehicle) => recordId(vehicle) === localSelectedVehicleId) ??
      vehicles[0] ??
      null
    );
  }, [vehicles, localSelectedVehicleId]);

  const clientName = text(rootRecord, ["displayLabel", "raisonSociale", "nomComplet", "nom"], "Client");
  const clientType = text(rootRecord, ["clientType", "typeClient", "categorieClient", "type"], "Particulier");
  const unpaidAmount = numberValue(rootRecord, ["unpaidInvoicesAmount", "montantImpayees"]);
  const revenueTotal = numberValue(rootRecord, ["revenueTotal", "chiffreAffaires", "caCumule"]);

  const interventions = relatedRecordsBySection.interventions ?? [];
  const rendezvous = relatedRecordsBySection.rendezvous ?? [];
  const lignes = relatedRecordsBySection.lignes ?? [];
  const factures = relatedRecordsBySection.factures ?? [];
  const encaissements = relatedRecordsBySection.encaissements ?? [];
  const recentActivity = relatedRecordsBySection.recentActivity ?? [];
  const upcomingAppointments = relatedRecordsBySection.upcomingAppointments ?? [];

  const isCardMode = !["flotte", "entreprise"].includes(clientType.toLowerCase());

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8">
        <aside className="hidden rounded-[2rem] bg-slate-950 p-5 text-white shadow-xl lg:block">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">
              AMARKHYS
            </p>
            <p className="mt-2 text-lg font-bold">ERP Garage</p>
          </div>

          <nav className="space-y-1 text-sm">
            {[
              "Tableau de bord",
              "Clients",
              "V\\u00e9hicules",
              "Rendez-vous",
              "Interventions",
              "Factures",
              "Encaissements",
              "Produits / Stocks",
              "Param\\u00e8tres",
            ].map((item) => (
              <div
                key={item}
                className={[
                  "rounded-2xl px-4 py-3",
                  item === "Clients"
                    ? "bg-emerald-400 text-slate-950 font-semibold"
                    : "text-slate-300 hover:bg-white/10",
                ].join(" ")}
              >
                {item}
              </div>
            ))}
          </nav>
        </aside>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Clients / Fiche client
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 lg:text-4xl">
                FICHE CLIENT OP\\u00c9RATIONNELLE
              </h1>
              <p className="mt-2 max-w-4xl text-sm text-slate-600">
                Vue 360\\u00b0 du client depuis ses v\\u00e9hicules jusqu\\u2019aux factures et encaissements.
                Une interface adaptative selon le type de client (Particulier, Flotte, Entreprise).
              </p>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6">
              <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex flex-col gap-5 md:flex-row md:items-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-emerald-100 text-3xl font-black text-emerald-800">
                    {clientName.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-black text-slate-950">{clientName}</h2>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 ring-1 ring-emerald-200">
                        {clientType}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2 xl:grid-cols-4">
                      <p><span className="font-semibold text-slate-900">Code :</span> {text(rootRecord, ["codeClient", "code"])}</p>
                      <p><span className="font-semibold text-slate-900">T\\u00e9l. :</span> {text(rootRecord, ["telephone", "t\\u00e9l\\u00e9phone"])}</p>
                      <p><span className="font-semibold text-slate-900">Email :</span> {text(rootRecord, ["email"])}</p>
                      <p><span className="font-semibold text-slate-900">Adresse :</span> {text(rootRecord, ["adresse"])}</p>
                      <p><span className="font-semibold text-slate-900">Cr\\u00e9ation :</span> {text(rootRecord, ["dateCreation", "createdAt"])}</p>
                      <p><span className="font-semibold text-slate-900">Derni\\u00e8re visite :</span> {text(rootRecord, ["lastVisit", "derniereVisite"])}</p>
                      <p><span className="font-semibold text-slate-900">Prochain RDV :</span> {text(rootRecord, ["nextAppointment", "prochainRendezVous"])}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                {[
                  ["V\\u00e9hicules", text(rootRecord, ["vehiclesCount", "vehiculesCount", "nombreVehicules"], "0")],
                  ["Interventions actives", text(rootRecord, ["activeInterventionsCount", "interventionsActives"], "0")],
                  ["Factures impay\\u00e9es", \`\${text(rootRecord, ["unpaidInvoicesCount", "facturesImpayees"], "0")} · \${money(unpaidAmount)}\`],
                  ["CA cumul\\u00e9", money(revenueTotal)],
                  ["Derni\\u00e8re visite", text(rootRecord, ["lastVisit", "derniereVisite"])],
                  ["Prochain RDV", text(rootRecord, ["nextAppointment", "prochainRendezVous"])],
                ].map(([label, value]) => (
                  <article key={label} className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-slate-200">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                    <p className="mt-2 text-xl font-black text-slate-950">{value}</p>
                  </article>
                ))}
              </section>

              <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <SectionTitle
                  title="V\\u00c9HICULES DU CLIENT"
                  action={
                    <Link href="/vehicules/nouveau" className="rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white">
                      Ajouter un v\\u00e9hicule
                    </Link>
                  }
                />

                {isCardMode ? (
                  <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                    {vehicles.map((vehicle) => (
                      <button
                        key={recordId(vehicle)}
                        type="button"
                        onClick={() => setLocalSelectedVehicleId(recordId(vehicle))}
                        className={[
                          "rounded-[1.5rem] border p-4 text-left shadow-sm transition",
                          recordId(vehicle) === recordId(selectedVehicle)
                            ? "border-emerald-400 bg-emerald-50"
                            : "border-slate-200 bg-white hover:border-emerald-200",
                        ].join(" ")}
                      >
                        <div className="mb-4 h-24 rounded-[1.25rem] bg-gradient-to-br from-slate-200 to-slate-100" />
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-black text-slate-950">{text(vehicle, ["displayLabel", "immatriculation", "marque"])}</p>
                            <p className="mt-1 text-xs text-slate-500">
                              {text(vehicle, ["marque"])} · {text(vehicle, ["modele", "mod\\u00e8le"])}
                            </p>
                          </div>
                          <span className={["rounded-full px-2 py-1 text-[10px] font-bold ring-1", badgeTone(text(vehicle, ["statut"], "actif"))].join(" ")}>
                            {text(vehicle, ["statut"], "actif")}
                          </span>
                        </div>
                        <div className="mt-4 grid gap-1 text-xs text-slate-600">
                          <p>Immatriculation : {text(vehicle, ["immatriculation"])}</p>
                          <p>Ann\\u00e9e : {text(vehicle, ["annee", "ann\\u00e9e"])}</p>
                          <p>Carburant : {text(vehicle, ["carburant"])}</p>
                          <p>Kilom\\u00e9trage : {text(vehicle, ["kilometrage", "kilom\\u00e9trage"])}</p>
                        </div>
                        <Link
                          href={href("/vehicules", vehicle)}
                          className="mt-4 inline-flex rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-900 ring-1 ring-slate-200"
                        >
                          Voir la fiche v\\u00e9hicule
                        </Link>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-[1.5rem] border border-slate-200">
                    <table className="min-w-full text-left text-sm">
                      <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                          <th className="px-4 py-3">V\\u00e9hicule</th>
                          <th className="px-4 py-3">Immatriculation</th>
                          <th className="px-4 py-3">Statut</th>
                          <th className="px-4 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {vehicles.map((vehicle) => (
                          <tr key={recordId(vehicle)}>
                            <td className="px-4 py-3 font-semibold text-slate-900">{text(vehicle, ["displayLabel", "marque"])}</td>
                            <td className="px-4 py-3 text-slate-600">{text(vehicle, ["immatriculation"])}</td>
                            <td className="px-4 py-3 text-slate-600">{text(vehicle, ["statut"], "actif")}</td>
                            <td className="px-4 py-3">
                              <button
                                type="button"
                                onClick={() => setLocalSelectedVehicleId(recordId(vehicle))}
                                className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-bold text-white"
                              >
                                S\\u00e9lectionner
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              <section className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <SectionTitle title="ACTIVIT\\u00c9 R\\u00c9CENTE" />
                  <div className="space-y-3">
                    {recentActivity.slice(0, 5).map((activity) => (
                      <article key={recordId(activity) || text(activity, ["displayLabel"])} className="rounded-2xl bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-bold text-slate-950">{text(activity, ["displayLabel"])}</p>
                            <p className="text-xs text-slate-500">{text(activity, ["activityDate"])} · {text(activity, ["activityType"])}</p>
                          </div>
                          <span className={["rounded-full px-2 py-1 text-[10px] font-bold ring-1", badgeTone(text(activity, ["statut"], ""))].join(" ")}>
                            {text(activity, ["statut"], "suivi")}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                  <Link href="/clientsauto" className="mt-4 inline-flex text-sm font-bold text-emerald-700">
                    Voir toute l'activit\\u00e9
                  </Link>
                </div>

                <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <SectionTitle title="\\u00c0 VENIR" />
                  <div className="space-y-3">
                    {upcomingAppointments.length > 0 ? upcomingAppointments.map((appointment) => (
                      <article key={recordId(appointment) || text(appointment, ["displayLabel"])} className="rounded-2xl bg-emerald-50 p-4">
                        <p className="font-bold text-slate-950">{text(appointment, ["displayLabel", "typeService"])}</p>
                        <p className="mt-1 text-xs text-slate-600">
                          {text(appointment, ["dateRendezVous", "activityDate"])} · {text(appointment, ["heure"])}
                        </p>
                      </article>
                    )) : (
                      <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Aucun rendez-vous \\u00e0 venir.</p>
                    )}
                  </div>
                  <Link href="/rendezvous" className="mt-4 inline-flex text-sm font-bold text-emerald-700">
                    Voir tous les rendez-vous
                  </Link>
                </div>
              </section>

              <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <SectionTitle title="PARCOURS D\\u00c9TAILL\\u00c9 : DU V\\u00c9HICULE \\u00c0 LA FACTURE" />
                <div className="grid gap-4 xl:grid-cols-5">
                  {[
                    ["1. S\\u00e9lection du v\\u00e9hicule", selectedVehicle ? text(selectedVehicle, ["displayLabel", "immatriculation"]) : "Aucun v\\u00e9hicule"],
                    ["2. Interventions du v\\u00e9hicule", \`\${interventions.length} intervention(s)\`],
                    ["3. D\\u00e9tail intervention", \`\${lignes.length} ligne(s)\`],
                    ["4. Facture li\\u00e9e", \`\${factures.length} facture(s)\`],
                    ["5. Encaissements", \`\${encaissements.length} encaissement(s)\`],
                  ].map(([title, value]) => (
                    <article key={title} className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{title}</p>
                      <p className="mt-2 text-sm font-bold text-slate-950">{value}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <SectionTitle title="ADAPTATION SELON LE TYPE DE CLIENT" />
                <div className="space-y-3 text-sm">
                  <div className="rounded-2xl bg-emerald-50 p-4">
                    <p className="font-black text-emerald-900">Particulier</p>
                    <p className="mt-1 text-emerald-800">V\\u00e9hicules en cartes, max 4 par ligne, lecture visuelle rapide.</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-black text-slate-950">Flotte</p>
                    <p className="mt-1 text-slate-600">V\\u00e9hicules en tableau compact, volume important, comparaison facilit\\u00e9e.</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-black text-slate-950">Entreprise</p>
                    <p className="mt-1 text-slate-600">Tableau administratif avec affectation, contrat et statut.</p>
                  </div>
                </div>
              </section>

              <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <SectionTitle title="NAVIGATION RAPIDE" />
                <div className="grid gap-3">
                  <Link href={href("/vehicules", selectedVehicle)} className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white">
                    Fiche v\\u00e9hicule compl\\u00e8te
                  </Link>
                  <Link href="/interventionsauto" className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900">
                    Fiche intervention
                  </Link>
                  <Link href="/facturesauto" className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900">
                    Facture compl\\u00e8te
                  </Link>
                  <Link href="/encaissementsauto" className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-900">
                    Historique encaissements
                  </Link>
                </div>
              </section>

              <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <SectionTitle title="B\\u00c9N\\u00c9FICES M\\u00c9TIER" />
                <ul className="space-y-3 text-sm text-slate-700">
                  {[
                    "Vue 360\\u00b0 du client en un coup d\\u2019\\u0153il",
                    "Meilleure relation client et r\\u00e9activit\\u00e9",
                    "Suivi clair des impay\\u00e9s et du CA",
                    "Gain de temps pour vos \\u00e9quipes",
                    "D\\u00e9cisions bas\\u00e9es sur des donn\\u00e9es r\\u00e9elles",
                  ].map((benefit) => (
                    <li key={benefit} className="rounded-2xl bg-slate-50 p-3 font-medium">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
`;

write(pagePath, pageContent);
write(clientPath, clientContent);
write(sheetPath, sheetContent);

console.log("[Q2-OP-B2] Exact Client Operational Sheet UI installed.");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\\\scripts\\\\runtime\\\\q2op-a1-audit-client-operational-sheet-target.cjs");
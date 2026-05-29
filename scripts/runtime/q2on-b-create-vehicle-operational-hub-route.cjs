const fs = require("fs");
const path = require("path");

const root = process.cwd();

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function ensureDir(relativePath) {
  fs.mkdirSync(path.join(root, relativePath), { recursive: true });
}

function write(relativePath, content) {
  const full = path.join(root, relativePath);
  ensureDir(path.dirname(relativePath));
  fs.writeFileSync(full, content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

function backupIfExists(relativePath, suffix) {
  const full = path.join(root, relativePath);
  if (!fs.existsSync(full)) return;

  const backup = `${full}.${suffix}`;
  if (!fs.existsSync(backup)) {
    fs.copyFileSync(full, backup);
    console.log("[BACKUP]", path.relative(root, backup));
  }
}

const vehicleModuleCandidates = [
  {
    moduleKey: "vehiculesauto",
    moduleImportName: "vehiculesautoModule",
    modulePath: "@/runtime/modules/generated/vehiculesauto/vehiculesauto.module",
    routeBase: "vehiculesauto",
    label: "V\u00e9hicule",
  },
  {
    moduleKey: "vehicules",
    moduleImportName: "vehiculesModule",
    modulePath: "@/runtime/modules/generated/vehicules/vehicules.module",
    routeBase: "vehicules",
    label: "V\u00e9hicule",
  },
];

const foundVehicle = vehicleModuleCandidates.find((candidate) => {
  const moduleFile = candidate.modulePath
    .replace("@/", "src/")
    .replace(/$/, ".ts");

  return exists(moduleFile);
});

if (!foundVehicle) {
  console.error("[FAILED] No vehicle module found.");
  process.exit(1);
}

const requiredModules = [
  "src/runtime/modules/generated/clientsauto/clientsauto.module.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
];

for (const required of requiredModules) {
  if (!exists(required)) {
    console.error("[FAILED] Missing required module:", required);
    process.exit(1);
  }
}

const hasEncaissements = exists(
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts"
);

const routeDir = `src/app/(private)/${foundVehicle.routeBase}/hub`;
const pagePath = `${routeDir}/page.tsx`;
const clientPath = `${routeDir}/VehicleOperationalHubClient.tsx`;
const loaderPath = "src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts";

backupIfExists(pagePath, "bak-q2on-b-vehicle-hub");
backupIfExists(clientPath, "bak-q2on-b-vehicle-hub");
backupIfExists(loaderPath, "bak-q2on-b-vehicle-hub");

const pageContent = `import type { ERPRecordHubConfig } from "@/runtime/hub";
import { VehicleOperationalHubClient } from "./VehicleOperationalHubClient";

type VehicleOperationalHubPageProps = {
  searchParams?: Promise<{
    vehicleId?: string;
    selectedInterventionId?: string;
  }>;
};

const vehicleOperationalHubConfig: ERPRecordHubConfig = {
  enabled: true,
  key: "${foundVehicle.moduleKey}-operational-hub",
  label: "Fiche V\\u00e9hicule Op\\u00e9rationnelle",
  rootModule: "${foundVehicle.moduleKey}",
  layout: "wide",
  search: {
    placeholder: "Rechercher un v\\u00e9hicule...",
    filterFields: ["marque", "modele", "mod\\u00e8le", "statut"],
    searchFields: ["immatriculation", "marque", "modele", "mod\\u00e8le", "vin", "numeroChassis"],
  },
  header: {
    titleFields: ["immatriculation", "marque", "modele", "mod\\u00e8le"],
    subtitleFields: ["clientLabel", "vin", "numeroChassis", "statut"],
    badgeFields: ["statut", "marque"],
  },
  kpis: [
    {
      key: "appointmentsCount",
      label: "Rendez-vous",
      source: "computed",
      field: "appointmentsCount",
      format: "number",
    },
    {
      key: "interventionsCount",
      label: "Interventions",
      source: "computed",
      field: "interventionsCount",
      format: "number",
    },
    {
      key: "invoicesCount",
      label: "Factures",
      source: "computed",
      field: "invoicesCount",
      format: "number",
    },
    {
      key: "revenueTotal",
      label: "CA v\\u00e9hicule",
      source: "computed",
      field: "revenueTotal",
      format: "number",
    },
  ],
  primaryCollection: {
    moduleKey: "interventionsauto",
    foreignKey: "vehiculeId",
    label: "Interventions du v\\u00e9hicule",
    defaultDisplayMode: "table",
    selectionQueryParam: "selectedInterventionId",
    labelFields: ["displayLabel", "titre", "numero", "dateIntervention", "statut"],
    subtitleFields: ["montantTTC", "rendezVousId"],
    cardFields: ["displayLabel", "dateIntervention", "montantTTC", "statut"],
    tableFields: ["dateIntervention", "statut", "montantTTC", "rendezVousId"],
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
  selectedRecordDetails: [
    {
      key: "rendezvous",
      label: "Rendez-vous li\\u00e9",
      moduleKey: "rendezvous",
      foreignKey: "vehiculeId",
      layout: "collapsible-list",
      labelFields: ["displayLabel", "dateRendezVous", "heure", "statut"],
      subtitleFields: ["typeService", "durationMinutes"],
      actions: [
        {
          key: "open-rendezvous",
          label: "Fiche RDV",
          kind: "open-record",
          moduleKey: "rendezvous",
          hrefTemplate: "/rendezvous/{id}",
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
      foreignKey: "interventionId",
      layout: "collapsible-list",
      labelFields: ["displayLabel", "numero", "statut", "montantTTC"],
      subtitleFields: ["dateFacture"],
      actions: [
        {
          key: "open-facture",
          label: "Fiche facture",
          kind: "open-record",
          moduleKey: "facturesauto",
          hrefTemplate: "/facturesauto/{id}",
          variant: "secondary",
        },
      ],
    }${hasEncaissements ? `,
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
          label: "Fiche encaissement",
          kind: "open-record",
          moduleKey: "encaissementsauto",
          hrefTemplate: "/encaissementsauto/{id}",
          variant: "secondary",
        },
      ],
    }` : ""}
  ],
};

export default async function VehicleOperationalHubPage({
  searchParams,
}: VehicleOperationalHubPageProps) {
  const params = searchParams ? await searchParams : {};
  const vehicleId = params.vehicleId ?? null;
  const selectedInterventionId = params.selectedInterventionId ?? null;

  if (!vehicleId) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl rounded-3xl border border-dashed border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Hub op\\u00e9rationnel
          </p>

          <h1 className="mt-3 text-2xl font-semibold text-slate-950">
            Aucun v\\u00e9hicule s\\u00e9lectionn\\u00e9
          </h1>

          <p className="mt-2 max-w-3xl text-sm text-slate-500">
            {"S\\u00e9lectionnez un v\\u00e9hicule pour afficher ses rendez-vous, interventions, lignes, factures et encaissements. Cette page n\\u2019effectue aucun chargement runtime tant qu\\u2019aucun v\\u00e9hicule n\\u2019est s\\u00e9lectionn\\u00e9."}
          </p>
        </section>
      </main>
    );
  }

  return (
    <VehicleOperationalHubClient
      config={vehicleOperationalHubConfig}
      vehicleId={vehicleId}
      selectedInterventionId={selectedInterventionId}
    />
  );
}
`;

const clientContent = `"use client";

import { useEffect, useState } from "react";
import { ERPRecordHubPage } from "@/components/erp/hub";
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";
import { RuntimeVehicleOperationalHubLoader } from "@/runtime/hub/RuntimeVehicleOperationalHubLoader";

type VehicleOperationalHubClientProps = {
  config: ERPRecordHubConfig;
  vehicleId: string;
  selectedInterventionId?: string | null;
};

type LoadState = {
  rootRecord: ERPRecordHubRecord | null;
  primaryRecords: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
};

export function VehicleOperationalHubClient({
  config,
  vehicleId,
  selectedInterventionId = null,
}: VehicleOperationalHubClientProps) {
  const [state, setState] = useState<LoadState | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setError(null);

        const result = await RuntimeVehicleOperationalHubLoader.load({
          config,
          vehicleId,
          selectedInterventionId,
        });

        if (!active) return;

        setState({
          rootRecord: result.rootRecord,
          primaryRecords: result.primaryRecords,
          relatedRecordsBySection: result.relatedRecordsBySection,
        });
      } catch (loadError) {
        console.error("[VehicleOperationalHubClient] load failed", loadError);

        if (!active) return;

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Impossible de charger le hub v\\u00e9hicule."
        );
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [config, vehicleId, selectedInterventionId]);

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl rounded-3xl border border-red-100 bg-white p-8 text-sm text-red-700 shadow-sm">
          {error}
        </section>
      </main>
    );
  }

  if (!state) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
          Chargement du hub v\\u00e9hicule...
        </section>
      </main>
    );
  }

  return (
    <ERPRecordHubPage
      config={config}
      rootRecord={state.rootRecord}
      primaryRecords={state.primaryRecords}
      relatedRecordsBySection={state.relatedRecordsBySection}
      selectedRecordId={selectedInterventionId}
    />
  );
}
`;

const loaderContent = `import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { ${foundVehicle.moduleImportName} } from "${foundVehicle.modulePath}";
import { clientsautoModule } from "@/runtime/modules/generated/clientsauto/clientsauto.module";
import { rendezvousModule } from "@/runtime/modules/generated/rendezvous/rendezvous.module";
import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto/interventionsauto.module";
import { lignesinterventionautoModule } from "@/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module";
import { facturesautoModule } from "@/runtime/modules/generated/facturesauto/facturesauto.module";
${hasEncaissements ? `import { encaissementsautoModule } from "@/runtime/modules/generated/encaissementsauto/encaissementsauto.module";` : ""}
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
    "libell\\u00e9",
    "immatriculation",
    "numero",
    "num\\u00e9ro",
    "numeroFacture",
    "num\\u00e9roFacture",
    "numeroIntervention",
    "num\\u00e9roIntervention",
    "dateIntervention",
    "dateRendezVous",
    "nom",
    "name",
    "designation",
    "d\\u00e9signation",
    "titre",
    "title",
    "code",
    "reference",
    "r\\u00e9f\\u00e9rence",
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
  const vehicleLabel = buildBusinessLabel(vehicle, "V\\u00e9hicule");
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

    const rootVehicle = await safeDetail(${foundVehicle.moduleImportName}, vehicleId);

    if (!rootVehicle) {
      return emptyResult(input.config);
    }

    const [
      clients,
      appointmentsRaw,
      interventionsRaw,
      linesRaw,
      invoicesRaw${hasEncaissements ? `,
      paymentsRaw` : ""}
    ] = await Promise.all([
      safeList(clientsautoModule),
      safeList(rendezvousModule),
      safeList(interventionsautoModule),
      safeList(lignesinterventionautoModule),
      safeList(facturesautoModule)${hasEncaissements ? `,
      safeList(encaissementsautoModule)` : ""}
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

${hasEncaissements ? `    const paymentsForVehicle = paymentsRaw.filter((record) => {
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
    });` : `    const paymentsForVehicle: ERPRecordHubRecord[] = [];
    const paymentsForSelectedIntervention: ERPRecordHubRecord[] = [];`}

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
`;

write(pagePath, pageContent);
write(clientPath, clientContent);
write(loaderPath, loaderContent);

console.log("[Q2-ON-B] Vehicle Operational Hub route created.");
console.log("[ROUTE]", `/${foundVehicle.routeBase}/hub?vehicleId=...`);
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");
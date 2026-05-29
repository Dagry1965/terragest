const fs = require("fs");
const path = require("path");

const root = process.cwd();

function write(relativePath, content) {
  const full = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });

  if (fs.existsSync(full)) {
    const backup = full + ".bak-q2oe-vehicle-details";
    if (!fs.existsSync(backup)) {
      fs.writeFileSync(backup, fs.readFileSync(full, "utf8"), "utf8");
      console.log("[BACKUP] " + path.relative(root, backup));
    }
  }

  fs.writeFileSync(full, content.trimStart(), "utf8");
  console.log("[WRITTEN] " + relativePath);
}

console.log("[Q2-OE] Wiring selected vehicle details");
console.log("[ROOT] " + root);

write("src/runtime/hub/RuntimeClientOperationalHubLoader.ts", `
import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { clientsautoModule } from "@/runtime/modules/generated/clientsauto/clientsauto.module";
import { vehiculesModule } from "@/runtime/modules/generated/vehicules/vehicules.module";
import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto/interventionsauto.module";
import { facturesautoModule } from "@/runtime/modules/generated/facturesauto/facturesauto.module";
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

function filterByForeignKey(
  records: ERPRecordHubRecord[],
  foreignKey: string,
  expectedValue: string
): ERPRecordHubRecord[] {
  return records.filter((record) => String(record[foreignKey] ?? "") === expectedValue);
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

export class RuntimeClientOperationalHubLoader {
  static async load(
    input: RuntimeClientOperationalHubLoaderInput
  ): Promise<RuntimeClientOperationalHubLoadResult> {
    let rootRecord: ERPRecordHubRecord | null = null;

    if (input.clientId) {
      rootRecord = normalizeRecord(
        await RuntimeDataBinding.detail(clientsautoModule, input.clientId)
      );
    }

    if (!rootRecord) {
      const clients = normalizeRecords(await RuntimeDataBinding.list(clientsautoModule));

      rootRecord = input.clientId
        ? clients.find((record) => String(record.id ?? "") === String(input.clientId)) ?? null
        : clients[0] ?? null;
    }

    const clientId = String(rootRecord?.id ?? input.clientId ?? "");

    let primaryRecords: ERPRecordHubRecord[] = [];

    if (clientId) {
      const vehicules = normalizeRecords(await RuntimeDataBinding.list(vehiculesModule));

      primaryRecords = filterByForeignKey(
        vehicules,
        input.config.primaryCollection.foreignKey,
        clientId
      );
    }

    const selectedVehicle =
      findById(primaryRecords, input.selectedVehicleId) ?? primaryRecords[0] ?? null;

    const selectedVehicleId = String(selectedVehicle?.id ?? input.selectedVehicleId ?? "");

    const relatedRecordsBySection: Record<string, ERPRecordHubRecord[]> = {};

    if (selectedVehicleId) {
      const interventions = normalizeRecords(
        await RuntimeDataBinding.list(interventionsautoModule)
      );

      const factures = normalizeRecords(
        await RuntimeDataBinding.list(facturesautoModule)
      );

      relatedRecordsBySection.interventions = filterByForeignKey(
        interventions,
        "vehiculeId",
        selectedVehicleId
      );

      relatedRecordsBySection.factures = filterByForeignKey(
        factures,
        "vehiculeId",
        selectedVehicleId
      );
    }

    return {
      config: input.config,
      rootRecord,
      primaryRecords,
      relatedRecordsBySection,
    };
  }
}
`);

write("src/app/(private)/clientsauto/hub/page.tsx", `
import { ERPRecordHubPage } from "@/components/erp/hub";
import type { ERPRecordHubConfig } from "@/runtime/hub";
import { RuntimeClientOperationalHubLoader } from "@/runtime/hub/RuntimeClientOperationalHubLoader";

type ClientOperationalHubPageProps = {
  searchParams?: Promise<{
    clientId?: string;
    selectedVehicleId?: string;
  }>;
};

const clientOperationalHubConfig: ERPRecordHubConfig = {
  enabled: true,
  key: "clientsauto-operational-hub",
  label: "Fiche Client Opérationnelle",
  rootModule: "clientsauto",
  layout: "wide",
  search: {
    placeholder: "Rechercher un client...",
    filterFields: ["typeClient"],
    searchFields: ["nom", "prenom", "telephone", "email", "code"],
  },
  header: {
    titleFields: ["nom", "prenom", "raisonSociale"],
    subtitleFields: ["telephone", "email", "code"],
    badgeFields: ["typeClient", "statut"],
  },
  kpis: [
    {
      key: "vehiculesCount",
      label: "Véhicules",
      source: "computed",
      format: "number",
    },
    {
      key: "activeInterventionsCount",
      label: "Interventions actives",
      source: "computed",
      format: "number",
    },
    {
      key: "unpaidInvoicesCount",
      label: "Factures impayées",
      source: "computed",
      format: "number",
    },
    {
      key: "totalBilledAmount",
      label: "Total facturé",
      source: "computed",
      format: "currency",
    },
  ],
  primaryCollection: {
    moduleKey: "vehicules",
    foreignKey: "clientId",
    label: "Véhicules",
    defaultDisplayMode: "table",
    displayModeSourceField: "typeClient",
    displayModes: {
      Particulier: "cards",
      particulier: "cards",
      Flotte: "table",
      flotte: "table",
      Entreprise: "table",
      entreprise: "table",
    },
    labelFields: ["immatriculation", "marque", "modele"],
    subtitleFields: ["annee", "statut"],
    cardFields: ["immatriculation", "marque", "modele", "statut"],
    tableFields: ["immatriculation", "marque", "modele", "statut"],
  },
  selectedRecordDetails: [
    {
      key: "interventions",
      label: "Interventions du véhicule",
      moduleKey: "interventionsauto",
      foreignKey: "vehiculeId",
      layout: "collapsible-list",
      labelFields: ["numero", "titre", "statut"],
      subtitleFields: ["dateIntervention", "montantTTC"],
    },
    {
      key: "factures",
      label: "Factures associées",
      moduleKey: "facturesauto",
      foreignKey: "vehiculeId",
      layout: "collapsible-list",
      labelFields: ["numero", "statut", "montantTTC"],
      subtitleFields: ["dateFacture", "dateEcheance"],
    },
  ],
};

export default async function ClientOperationalHubPage({
  searchParams,
}: ClientOperationalHubPageProps) {
  const resolvedSearchParams = await searchParams;

  const data = await RuntimeClientOperationalHubLoader.load({
    config: clientOperationalHubConfig,
    clientId: resolvedSearchParams?.clientId ?? null,
    selectedVehicleId: resolvedSearchParams?.selectedVehicleId ?? null,
  });

  return (
    <ERPRecordHubPage
      config={data.config}
      rootRecord={data.rootRecord}
      primaryRecords={data.primaryRecords}
      relatedRecordsBySection={data.relatedRecordsBySection}
    />
  );
}
`);

write("scripts/runtime/q2oe-audit-vehicle-details.cjs", `
const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "src/runtime/hub/RuntimeClientOperationalHubLoader.ts",
  "src/app/(private)/clientsauto/hub/page.tsx",
];

let ok = 0;
let fail = 0;

console.log("[Q2-OE] Vehicle details audit");
console.log("[ROOT] " + root);

for (const file of files) {
  const full = path.join(root, file);

  if (!fs.existsSync(full)) {
    console.log("[FAIL] Missing file: " + file);
    fail += 1;
    continue;
  }

  console.log("[OK] Found: " + file);
  ok += 1;

  const content = fs.readFileSync(full, "utf8");

  const forbidden = ["firebase/firestore", "getDocs(", "collection("];

  for (const pattern of forbidden) {
    if (content.includes(pattern)) {
      console.log("[FAIL] Forbidden local Firestore pattern " + pattern + " in " + file);
      fail += 1;
    }
  }
}

const loader = fs.readFileSync(
  path.join(root, "src/runtime/hub/RuntimeClientOperationalHubLoader.ts"),
  "utf8"
);

const expected = [
  "interventionsautoModule",
  "facturesautoModule",
  "selectedVehicleId",
  "relatedRecordsBySection.interventions",
  "relatedRecordsBySection.factures",
];

for (const item of expected) {
  if (loader.includes(item)) {
    console.log("[OK] Loader contains " + item);
    ok += 1;
  } else {
    console.log("[FAIL] Loader missing " + item);
    fail += 1;
  }
}

function walk(dir, backups) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, backups);
      continue;
    }

    if (entry.name.includes(".bak-q2oe")) {
      backups.push(full);
    }
  }
}

const backups = [];
walk(root, backups);

if (backups.length > 0) {
  for (const backup of backups) {
    console.log("[FAIL] Backup still present: " + path.relative(root, backup));
    fail += 1;
  }
} else {
  console.log("[OK] No Q2-OE backup detected");
  ok += 1;
}

console.log("[OK] " + ok);
console.log("[FAIL] " + fail);

if (fail > 0) {
  process.exit(1);
}

console.log("[Q2-OE] Vehicle details audit completed successfully.");
`);

console.log("[Q2-OE] DONE");
console.log("Next:");
console.log("  Get-ChildItem -Recurse -File | Where-Object { $_.Name -like '*.bak-q2oe-vehicle-details' } | Remove-Item -Force");
console.log("  node .\\\\scripts\\\\runtime\\\\q2oe-audit-vehicle-details.cjs");
console.log("  pnpm build");
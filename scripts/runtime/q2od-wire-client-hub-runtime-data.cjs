const fs = require("fs");
const path = require("path");

const root = process.cwd();

function write(relativePath, content) {
  const full = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });

  if (fs.existsSync(full)) {
    const backup = full + ".bak-q2od-runtime-data";
    if (!fs.existsSync(backup)) {
      fs.writeFileSync(backup, fs.readFileSync(full, "utf8"), "utf8");
      console.log("[BACKUP] " + path.relative(root, backup));
    }
  }

  fs.writeFileSync(full, content.trimStart(), "utf8");
  console.log("[WRITTEN] " + relativePath);
}

console.log("[Q2-OD] Wiring Client Operational Hub to runtime data");
console.log("[ROOT] " + root);

write("src/runtime/hub/RuntimeClientOperationalHubLoader.ts", `
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
};

type RuntimeListLike = (moduleKey: string) => Promise<ERPRecordHubRecord[]>;
type RuntimeDetailLike = (
  moduleKey: string,
  recordId: string
) => Promise<ERPRecordHubRecord | null>;

async function tryImportRuntimeDataBinding(): Promise<{
  list?: RuntimeListLike;
  detail?: RuntimeDetailLike;
} | null> {
  try {
    const mod = await import("@/runtime/data/RuntimeDataBinding");

    const binding =
      mod.RuntimeDataBinding ??
      mod.default ??
      mod.runtimeDataBinding ??
      null;

    if (!binding) {
      return null;
    }

    const list: RuntimeListLike | undefined =
      typeof binding.list === "function"
        ? async (moduleKey: string) => normalizeRecords(await binding.list(moduleKey))
        : undefined;

    const detail: RuntimeDetailLike | undefined =
      typeof binding.detail === "function"
        ? async (moduleKey: string, recordId: string) =>
            normalizeRecord(await binding.detail(moduleKey, recordId))
        : undefined;

    return { list, detail };
  } catch {
    return null;
  }
}

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

export class RuntimeClientOperationalHubLoader {
  static async load(
    input: RuntimeClientOperationalHubLoaderInput
  ): Promise<RuntimeClientOperationalHubLoadResult> {
    const runtime = await tryImportRuntimeDataBinding();

    if (!runtime?.list && !runtime?.detail) {
      return {
        config: input.config,
        rootRecord: null,
        primaryRecords: [],
        relatedRecordsBySection: {},
      };
    }

    let rootRecord: ERPRecordHubRecord | null = null;

    if (input.clientId && runtime.detail) {
      rootRecord = await runtime.detail(input.config.rootModule, input.clientId);
    }

    if (!rootRecord && input.clientId && runtime.list) {
      const clients = await runtime.list(input.config.rootModule);
      rootRecord =
        clients.find((record) => String(record.id ?? "") === String(input.clientId)) ?? null;
    }

    if (!rootRecord && runtime.list) {
      const clients = await runtime.list(input.config.rootModule);
      rootRecord = clients[0] ?? null;
    }

    const clientId = String(rootRecord?.id ?? input.clientId ?? "");

    let primaryRecords: ERPRecordHubRecord[] = [];

    if (clientId && runtime.list) {
      const allPrimaryRecords = await runtime.list(input.config.primaryCollection.moduleKey);

      primaryRecords = filterByForeignKey(
        allPrimaryRecords,
        input.config.primaryCollection.foreignKey,
        clientId
      );
    }

    return {
      config: input.config,
      rootRecord,
      primaryRecords,
      relatedRecordsBySection: {},
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
  const clientId = resolvedSearchParams?.clientId ?? null;

  const data = await RuntimeClientOperationalHubLoader.load({
    config: clientOperationalHubConfig,
    clientId,
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

write("scripts/runtime/q2od-audit-client-hub-runtime-data.cjs", `
const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "src/runtime/hub/RuntimeClientOperationalHubLoader.ts",
  "src/app/(private)/clientsauto/hub/page.tsx",
];

let ok = 0;
let fail = 0;

console.log("[Q2-OD] Client Hub runtime data audit");
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

if (loader.includes("RuntimeDataBinding")) {
  console.log("[OK] RuntimeDataBinding reference detected");
  ok += 1;
} else {
  console.log("[FAIL] RuntimeDataBinding reference not detected");
  fail += 1;
}

if (loader.includes("preview-client") || loader.includes("opérationnel")) {
  console.log("[FAIL] Preview client fallback still detected");
  fail += 1;
} else {
  console.log("[OK] Preview fallback removed");
  ok += 1;
}

function walk(dir, backups) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, backups);
      continue;
    }

    if (entry.name.includes(".bak-q2od")) {
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
  console.log("[OK] No Q2-OD backup detected");
  ok += 1;
}

console.log("[OK] " + ok);
console.log("[FAIL] " + fail);

if (fail > 0) {
  process.exit(1);
}

console.log("[Q2-OD] Client Hub runtime data audit completed successfully.");
`);

console.log("[Q2-OD] DONE");
console.log("Next:");
console.log("  Get-ChildItem -Recurse -File | Where-Object { $_.Name -like '*.bak-q2od-runtime-data' } | Remove-Item -Force");
console.log("  node .\\\\scripts\\\\runtime\\\\q2od-audit-client-hub-runtime-data.cjs");
console.log("  pnpm build");
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function write(relativePath, content) {
  const full = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });

  if (fs.existsSync(full)) {
    const backup = full + ".bak-q2oh-b-product-stock-hub";
    if (!fs.existsSync(backup)) {
      fs.writeFileSync(backup, fs.readFileSync(full, "utf8"), "utf8");
      console.log("[BACKUP] " + path.relative(root, backup));
    }
  }

  fs.writeFileSync(full, content.trimStart(), "utf8");
  console.log("[WRITTEN] " + relativePath);
}

console.log("[Q2-OH-B] Installing Product / Stock Operational Hub route");
console.log("[ROOT] " + root);

write("src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts", `
import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { produitsautoModule } from "@/runtime/modules/generated/produitsauto/produitsauto.module";
import { stocksautoModule } from "@/runtime/modules/generated/stocksauto/stocksauto.module";
import { mouvementsstockautoModule } from "@/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module";
import { commandesstockautoModule } from "@/runtime/modules/generated/commandesstockauto/commandesstockauto.module";
import { receptionsstockautoModule } from "@/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module";
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "./RuntimeHubTypes";

export type RuntimeProductStockOperationalHubLoadResult = {
  config: ERPRecordHubConfig;
  rootRecord: ERPRecordHubRecord | null;
  primaryRecords: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
};

export type RuntimeProductStockOperationalHubLoaderInput = {
  config: ERPRecordHubConfig;
  productId?: string | null;
  selectedStockId?: string | null;
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

function filterByAnyProductKey(
  records: ERPRecordHubRecord[],
  productId: string
): ERPRecordHubRecord[] {
  const possibleKeys = ["produitId", "productId", "articleId"];

  return records.filter((record) => {
    return possibleKeys.some((key) => String(record[key] ?? "") === productId);
  });
}

function filterByAnyStockKey(
  records: ERPRecordHubRecord[],
  stockId: string
): ERPRecordHubRecord[] {
  const possibleKeys = ["stockId", "stockSourceId", "stockDestinationId"];

  return records.filter((record) => {
    return possibleKeys.some((key) => String(record[key] ?? "") === stockId);
  });
}

export class RuntimeProductStockOperationalHubLoader {
  static async load(
    input: RuntimeProductStockOperationalHubLoaderInput
  ): Promise<RuntimeProductStockOperationalHubLoadResult> {
    let rootRecord: ERPRecordHubRecord | null = null;

    if (input.productId) {
      rootRecord = normalizeRecord(
        await RuntimeDataBinding.detail(produitsautoModule, input.productId)
      );
    }

    if (!rootRecord) {
      const produits = normalizeRecords(await RuntimeDataBinding.list(produitsautoModule));

      rootRecord = input.productId
        ? produits.find((record) => String(record.id ?? "") === String(input.productId)) ?? null
        : produits[0] ?? null;
    }

    const productId = String(rootRecord?.id ?? input.productId ?? "");

    let primaryRecords: ERPRecordHubRecord[] = [];

    if (productId) {
      const stocks = normalizeRecords(await RuntimeDataBinding.list(stocksautoModule));

      primaryRecords = filterByAnyProductKey(stocks, productId);
    }

    const selectedStock =
      findById(primaryRecords, input.selectedStockId) ?? primaryRecords[0] ?? null;

    const selectedStockId = String(selectedStock?.id ?? input.selectedStockId ?? "");

    const relatedRecordsBySection: Record<string, ERPRecordHubRecord[]> = {};

    if (productId) {
      const mouvements = normalizeRecords(
        await RuntimeDataBinding.list(mouvementsstockautoModule)
      );

      const commandes = normalizeRecords(
        await RuntimeDataBinding.list(commandesstockautoModule)
      );

      const receptions = normalizeRecords(
        await RuntimeDataBinding.list(receptionsstockautoModule)
      );

      relatedRecordsBySection.mouvements = selectedStockId
        ? filterByAnyStockKey(mouvements, selectedStockId)
        : filterByAnyProductKey(mouvements, productId);

      relatedRecordsBySection.commandes = filterByAnyProductKey(commandes, productId);

      relatedRecordsBySection.receptions = selectedStockId
        ? filterByAnyStockKey(receptions, selectedStockId)
        : filterByAnyProductKey(receptions, productId);
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

write("src/app/(private)/produitsauto/hub/page.tsx", `
import { ERPRecordHubPage } from "@/components/erp/hub";
import type { ERPRecordHubConfig } from "@/runtime/hub";
import { RuntimeProductStockOperationalHubLoader } from "@/runtime/hub/RuntimeProductStockOperationalHubLoader";

type ProductStockOperationalHubPageProps = {
  searchParams?: Promise<{
    productId?: string;
    selectedStockId?: string;
  }>;
};

const productStockOperationalHubConfig: ERPRecordHubConfig = {
  enabled: true,
  key: "produitsauto-stock-operational-hub",
  label: "Fiche Produit / Stock Opérationnelle",
  rootModule: "produitsauto",
  layout: "wide",
  search: {
    placeholder: "Rechercher un produit...",
    filterFields: ["typeArticle", "famille", "statut"],
    searchFields: ["nom", "designation", "code", "reference"],
  },
  header: {
    titleFields: ["nom", "designation", "code"],
    subtitleFields: ["famille", "typeArticle", "statut"],
    badgeFields: ["typeArticle", "statut"],
  },
  kpis: [
    {
      key: "stockTotal",
      label: "Stock total",
      source: "computed",
      format: "number",
    },
    {
      key: "stocksCount",
      label: "Stocks",
      source: "computed",
      format: "number",
    },
    {
      key: "openOrdersCount",
      label: "Commandes ouvertes",
      source: "computed",
      format: "number",
    },
    {
      key: "recentMovementsCount",
      label: "Mouvements récents",
      source: "computed",
      format: "number",
    },
  ],
  primaryCollection: {
    moduleKey: "stocksauto",
    foreignKey: "produitId",
    label: "Stocks / emplacements",
    defaultDisplayMode: "table",
    selectionQueryParam: "selectedStockId",
    labelFields: ["nom", "emplacement", "code"],
    subtitleFields: ["quantite", "seuilAlerte", "statut"],
    cardFields: ["nom", "emplacement", "quantite", "statut"],
    tableFields: ["nom", "emplacement", "quantite", "seuilAlerte", "statut"],
    actions: [
      {
        key: "open-stock",
        label: "Fiche stock",
        kind: "open-record",
        moduleKey: "stocksauto",
        hrefTemplate: "/stocksauto/{id}",
        variant: "secondary",
      },
    ],
  },
  selectedRecordDetails: [
    {
      key: "mouvements",
      label: "Mouvements du stock",
      moduleKey: "mouvementsstockauto",
      foreignKey: "stockId",
      layout: "collapsible-list",
      labelFields: ["typeMouvement", "quantite", "motif"],
      subtitleFields: ["createdAt", "sourceType", "sourceId"],
      actions: [
        {
          key: "open-mouvement",
          label: "Fiche mouvement",
          kind: "open-record",
          moduleKey: "mouvementsstockauto",
          hrefTemplate: "/mouvementsstockauto/{id}",
          variant: "secondary",
        },
      ],
    },
    {
      key: "commandes",
      label: "Commandes liées au produit",
      moduleKey: "commandesstockauto",
      foreignKey: "produitId",
      layout: "collapsible-list",
      labelFields: ["numero", "statut", "montantTTC"],
      subtitleFields: ["dateCommande", "fournisseurId"],
      actions: [
        {
          key: "open-commande",
          label: "Fiche commande",
          kind: "open-record",
          moduleKey: "commandesstockauto",
          hrefTemplate: "/commandesstockauto/{id}",
          variant: "secondary",
        },
      ],
    },
    {
      key: "receptions",
      label: "Réceptions liées",
      moduleKey: "receptionsstockauto",
      foreignKey: "stockId",
      layout: "collapsible-list",
      labelFields: ["numero", "statut", "quantiteRecue"],
      subtitleFields: ["dateReception", "commandeId"],
      actions: [
        {
          key: "open-reception",
          label: "Fiche réception",
          kind: "open-record",
          moduleKey: "receptionsstockauto",
          hrefTemplate: "/receptionsstockauto/{id}",
          variant: "secondary",
        },
      ],
    },
  ],
};

export default async function ProductStockOperationalHubPage({
  searchParams,
}: ProductStockOperationalHubPageProps) {
  const resolvedSearchParams = await searchParams;

  const data = await RuntimeProductStockOperationalHubLoader.load({
    config: productStockOperationalHubConfig,
    productId: resolvedSearchParams?.productId ?? null,
    selectedStockId: resolvedSearchParams?.selectedStockId ?? null,
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

write("scripts/runtime/q2oh-b-audit-product-stock-hub-route.cjs", `
const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts",
  "src/app/(private)/produitsauto/hub/page.tsx",
  "src/components/erp/hub/ERPRecordHubPage.tsx",
  "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",
];

let ok = 0;
let fail = 0;

console.log("[Q2-OH-B] Product / Stock Hub route audit");
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

  for (const marker of forbidden) {
    if (content.includes(marker)) {
      console.log("[FAIL] Forbidden local Firestore marker " + marker + " in " + file);
      fail += 1;
    }
  }
}

const loader = fs.readFileSync(
  path.join(root, "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts"),
  "utf8"
);

const route = fs.readFileSync(
  path.join(root, "src/app/(private)/produitsauto/hub/page.tsx"),
  "utf8"
);

const expectedLoader = [
  "produitsautoModule",
  "stocksautoModule",
  "mouvementsstockautoModule",
  "commandesstockautoModule",
  "receptionsstockautoModule",
  "RuntimeDataBinding",
  "relatedRecordsBySection.mouvements",
  "relatedRecordsBySection.commandes",
  "relatedRecordsBySection.receptions",
];

for (const marker of expectedLoader) {
  if (loader.includes(marker)) {
    console.log("[OK] Loader marker detected: " + marker);
    ok += 1;
  } else {
    console.log("[FAIL] Loader marker missing: " + marker);
    fail += 1;
  }
}

const expectedRoute = [
  "Fiche Produit / Stock Opérationnelle",
  "selectedStockId",
  "selectionQueryParam",
  "open-stock",
  "open-mouvement",
  "open-commande",
  "open-reception",
];

for (const marker of expectedRoute) {
  if (route.includes(marker)) {
    console.log("[OK] Route marker detected: " + marker);
    ok += 1;
  } else {
    console.log("[FAIL] Route marker missing: " + marker);
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

    if (entry.name.includes(".bak-q2oh-b")) {
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
  console.log("[OK] No Q2-OH-B backup detected");
  ok += 1;
}

console.log("[OK] " + ok);
console.log("[FAIL] " + fail);

if (fail > 0) {
  process.exit(1);
}

console.log("[Q2-OH-B] Product / Stock Hub route audit completed successfully.");
`);

console.log("[Q2-OH-B] DONE");
console.log("Next:");
console.log("  Get-ChildItem -Recurse -File | Where-Object { $_.Name -like '*.bak-q2oh-b-product-stock-hub' } | Remove-Item -Force");
console.log("  node .\\\\scripts\\\\runtime\\\\q2oh-b-audit-product-stock-hub-route.cjs");
console.log("  pnpm build");
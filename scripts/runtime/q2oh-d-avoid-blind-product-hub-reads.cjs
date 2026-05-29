const fs = require("fs");
const path = require("path");

const root = process.cwd();

function write(relativePath, content) {
  const full = path.join(root, relativePath);
  const backup = full + ".bak-q2oh-d-avoid-blind-product-reads";

  if (fs.existsSync(full) && !fs.existsSync(backup)) {
    fs.writeFileSync(backup, fs.readFileSync(full, "utf8"), "utf8");
    console.log("[BACKUP] " + path.relative(root, backup));
  }

  fs.writeFileSync(full, content.trimStart(), "utf8");
  console.log("[WRITTEN] " + relativePath);
}

console.log("[Q2-OH-D] Avoid blind Firestore reads in Product / Stock Hub");
console.log("[ROOT] " + root);

write("src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts", `
import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { produitsautoModule } from "@/runtime/modules/generated/produitsauto/produitsauto.module";
import { stocksautoModule } from "@/runtime/modules/generated/stocksauto/stocksauto.module";
import { mouvementsstockautoModule } from "@/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module";
import { commandesstockautoModule } from "@/runtime/modules/generated/commandesstockauto/commandesstockauto.module";
import { receptionsstockautoModule } from "@/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module";
import type { ERPModule } from "@/runtime/modules/ERPModule";
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

function moduleLabel(module: ERPModule): string {
  return module.key ?? module.metadata?.key ?? module.label ?? "unknown-module";
}

async function safeDetail(
  module: ERPModule,
  recordId: string
): Promise<ERPRecordHubRecord | null> {
  try {
    return normalizeRecord(await RuntimeDataBinding.detail(module, recordId));
  } catch (error) {
    console.warn(
      "[RuntimeProductStockOperationalHubLoader] detail failed:",
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
      "[RuntimeProductStockOperationalHubLoader] list failed:",
      moduleLabel(module),
      error
    );

    return [];
  }
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

function findById(
  records: ERPRecordHubRecord[],
  id?: string | null
): ERPRecordHubRecord | null {
  if (!id) {
    return null;
  }

  return records.find((record) => String(record.id ?? "") === String(id)) ?? null;
}

export class RuntimeProductStockOperationalHubLoader {
  static async load(
    input: RuntimeProductStockOperationalHubLoaderInput
  ): Promise<RuntimeProductStockOperationalHubLoadResult> {
    const productId = input.productId ? String(input.productId) : "";

    /**
     * Important:
     * Do not blindly list products when /produitsauto/hub is opened without productId.
     * Firestore can emit server-side GRPC logs even when errors are caught.
     * The hub must wait for an explicit productId before loading runtime data.
     */
    if (!productId) {
      return {
        config: input.config,
        rootRecord: null,
        primaryRecords: [],
        relatedRecordsBySection: {
          mouvements: [],
          commandes: [],
          receptions: [],
        },
      };
    }

    const rootRecord = await safeDetail(produitsautoModule, productId);

    if (!rootRecord) {
      return {
        config: input.config,
        rootRecord: null,
        primaryRecords: [],
        relatedRecordsBySection: {
          mouvements: [],
          commandes: [],
          receptions: [],
        },
      };
    }

    const stocks = await safeList(stocksautoModule);
    const primaryRecords = filterByAnyProductKey(stocks, productId);

    const selectedStock =
      findById(primaryRecords, input.selectedStockId) ?? primaryRecords[0] ?? null;

    const selectedStockId = String(selectedStock?.id ?? input.selectedStockId ?? "");

    const relatedRecordsBySection: Record<string, ERPRecordHubRecord[]> = {
      mouvements: [],
      commandes: [],
      receptions: [],
    };

    const [mouvements, commandes, receptions] = await Promise.all([
      safeList(mouvementsstockautoModule),
      safeList(commandesstockautoModule),
      safeList(receptionsstockautoModule),
    ]);

    relatedRecordsBySection.mouvements = selectedStockId
      ? filterByAnyStockKey(mouvements, selectedStockId)
      : filterByAnyProductKey(mouvements, productId);

    relatedRecordsBySection.commandes = filterByAnyProductKey(commandes, productId);

    relatedRecordsBySection.receptions = selectedStockId
      ? filterByAnyStockKey(receptions, selectedStockId)
      : filterByAnyProductKey(receptions, productId);

    return {
      config: input.config,
      rootRecord,
      primaryRecords,
      relatedRecordsBySection,
    };
  }
}
`);

write("scripts/runtime/q2oh-d-audit-no-blind-product-hub-reads.cjs", `
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts";
const full = path.join(root, file);

let ok = 0;
let fail = 0;

console.log("[Q2-OH-D] No blind Product Hub reads audit");
console.log("[ROOT] " + root);

if (!fs.existsSync(full)) {
  console.log("[FAIL] Missing file: " + file);
  process.exit(1);
}

console.log("[OK] Found: " + file);
ok += 1;

const content = fs.readFileSync(full, "utf8");

const expected = [
  "if (!productId)",
  "Do not blindly list products",
  "safeDetail(produitsautoModule, productId)",
  "safeList(stocksautoModule)",
  "relatedRecordsBySection",
];

for (const marker of expected) {
  if (content.includes(marker)) {
    console.log("[OK] Marker detected: " + marker);
    ok += 1;
  } else {
    console.log("[FAIL] Marker missing: " + marker);
    fail += 1;
  }
}

const forbidden = [
  "RuntimeDataBinding.list(produitsautoModule)",
  "safeList(produitsautoModule)",
  "firebase/firestore",
  "getDocs(",
  "collection(",
];

for (const marker of forbidden) {
  if (content.includes(marker)) {
    console.log("[FAIL] Forbidden marker detected: " + marker);
    fail += 1;
  }
}

function walk(dir, backups) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, backups);
      continue;
    }

    if (entry.name.includes(".bak-q2oh-d")) {
      backups.push(fullPath);
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
  console.log("[OK] No Q2-OH-D backup detected");
  ok += 1;
}

console.log("[OK] " + ok);
console.log("[FAIL] " + fail);

if (fail > 0) {
  process.exit(1);
}

console.log("[Q2-OH-D] No blind reads audit completed successfully.");
`);

console.log("[Q2-OH-D] DONE");
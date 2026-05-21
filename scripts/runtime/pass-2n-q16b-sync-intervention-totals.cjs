const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function write(file, content) {
  fs.writeFileSync(path.join(ROOT, file), content, "utf8");
  console.log("[WRITTEN]", file);
}

function backup(file, suffix) {
  const source = path.join(ROOT, file);
  const target = path.join(ROOT, `${file}.${suffix}`);
  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[BACKUP]", `${file}.${suffix}`);
  }
}

function ensureDir(dir) {
  fs.mkdirSync(path.join(ROOT, dir), { recursive: true });
}

function installTotalsService() {
  ensureDir("src/runtime/interventions");

  const file = "src/runtime/interventions/RuntimeInterventionTotalsService.ts";

  const content = `import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { allERPModules } from "@/runtime/modules/definitions/coreModules";
import type { ERPModule } from "@/runtime/modules/ERPModule";

type RuntimeRecord = Record<string, unknown>;

interface SyncInterventionTotalsParams {
  interventionId: string;
}

interface InterventionTotals {
  coutPieces: number;
  coutMainOeuvre: number;
  coutTotal: number;
}

function getModule(moduleKey: string): ERPModule | undefined {
  return allERPModules.find(
    (module) => module.metadata.key === moduleKey
  );
}

function getRecordId(record: RuntimeRecord): string {
  return String(record.id ?? record._id ?? "");
}

function asNumber(value: unknown): number {
  const numberValue = Number(value ?? 0);

  return Number.isFinite(numberValue) ? numberValue : 0;
}

function asText(value: unknown): string {
  return String(value ?? "").trim();
}

function isCancelled(line: RuntimeRecord): boolean {
  return asText(line.statut) === "annulee";
}

function getLineAmount(line: RuntimeRecord): number {
  const montantTotal = asNumber(line.montantTotal);

  if (montantTotal !== 0) {
    return montantTotal;
  }

  return asNumber(line.quantite) * asNumber(line.prixUnitaire);
}

function computeTotals(lines: RuntimeRecord[]): InterventionTotals {
  return lines.reduce<InterventionTotals>(
    (totals, line) => {
      if (isCancelled(line)) {
        return totals;
      }

      const typeLigne = asText(line.typeLigne);
      const amount = getLineAmount(line);

      if (typeLigne === "piece") {
        totals.coutPieces += amount;
        totals.coutTotal += amount;
        return totals;
      }

      if (typeLigne === "main_oeuvre") {
        totals.coutMainOeuvre += amount;
        totals.coutTotal += amount;
        return totals;
      }

      if (typeLigne === "remise") {
        totals.coutTotal -= Math.abs(amount);
        return totals;
      }

      totals.coutTotal += amount;
      return totals;
    },
    {
      coutPieces: 0,
      coutMainOeuvre: 0,
      coutTotal: 0,
    }
  );
}

export const RuntimeInterventionTotalsService = {
  async syncInterventionTotals({
    interventionId,
  }: SyncInterventionTotalsParams): Promise<InterventionTotals | null> {
    const normalizedInterventionId =
      String(interventionId ?? "").trim();

    if (!normalizedInterventionId) {
      return null;
    }

    const lineModule = getModule("lignesinterventionauto");
    const interventionModule = getModule("interventionsauto");

    if (!lineModule || !interventionModule) {
      return null;
    }

    const lines = await RuntimeDataBinding.list(lineModule);

    const interventionLines = lines.filter(
      (line) =>
        asText(line.interventionId) === normalizedInterventionId
    );

    const totals = computeTotals(interventionLines);

    const intervention =
      await RuntimeDataBinding.detail(
        interventionModule,
        normalizedInterventionId
      );

    if (!intervention) {
      return totals;
    }

    await RuntimeDataBinding.update(
      interventionModule,
      normalizedInterventionId,
      {
        ...intervention,
        coutPieces: totals.coutPieces,
        coutMainOeuvre: totals.coutMainOeuvre,
        coutTotal: totals.coutTotal,
        updatedAt: new Date().toISOString(),
      }
    );

    return totals;
  },
};
`;

  write(file, content);

  const indexFile = "src/runtime/interventions/index.ts";
  write(indexFile, `export * from "./RuntimeInterventionTotalsService";\n`);
}

function patchFirestoreMutation() {
  const file = "src/runtime/firestore/FirestoreRuntimeMutation.ts";
  backup(file, "bak-q16b-sync-intervention-totals");

  let content = read(file);

  if (content.includes("RuntimeInterventionTotalsService")) {
    console.log("[SKIP] FirestoreRuntimeMutation already patched");
    return;
  }

  const target = `async function processRuntimePostMutationSideEffects(
  module: ERPModule,
  record: Record<string, unknown>
): Promise<void> {
  if (module.metadata.key !== "lignesinterventionauto") {
    return;
  }

  try {
    const { RuntimeStockMovementService } =
      await import("@/runtime/stock");

    const result =
      await RuntimeStockMovementService.processInterventionLineStock({
        line: record,
      });`;

  const replacement = `async function processRuntimePostMutationSideEffects(
  module: ERPModule,
  record: Record<string, unknown>
): Promise<void> {
  if (module.metadata.key !== "lignesinterventionauto") {
    return;
  }

  try {
    const { RuntimeInterventionTotalsService } =
      await import("@/runtime/interventions");

    const interventionId =
      String(record.interventionId ?? "").trim();

    if (interventionId) {
      await RuntimeInterventionTotalsService.syncInterventionTotals({
        interventionId,
      });
    }
  } catch (error) {
    console.error(
      "[RUNTIME_INTERVENTION_TOTALS_SYNC_ERROR]",
      error
    );
  }

  try {
    const { RuntimeStockMovementService } =
      await import("@/runtime/stock");

    const result =
      await RuntimeStockMovementService.processInterventionLineStock({
        line: record,
      });`;

  if (!content.includes(target)) {
    throw new Error("Insertion point not found in FirestoreRuntimeMutation.ts");
  }

  content = content.replace(target, replacement);

  write(file, content);
}

installTotalsService();
patchFirestoreMutation();

console.log("[Q16B] Runtime intervention totals sync installed.");
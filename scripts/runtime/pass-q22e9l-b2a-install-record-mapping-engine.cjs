/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9L-B2-A";

const MAPPING_DIR = path.join(ROOT, "src", "runtime", "mapping");
const MAPPING_ENGINE = path.join(MAPPING_DIR, "RuntimeRecordMappingEngine.ts");
const MAPPING_INDEX = path.join(MAPPING_DIR, "index.ts");

const BUSINESS_RULES = path.join(
  ROOT,
  "src",
  "runtime",
  "business-rules",
  "runtimeBusinessRules.ts"
);

const BUSINESS_RULES_BACKUP = `${BUSINESS_RULES}.bak-q22e9l-b2a-record-mapping-engine`;

function normalizePath(filePath) {
  return filePath.split(path.sep).join("/");
}

function rel(filePath) {
  return normalizePath(path.relative(ROOT, filePath));
}

function read(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`[${PASS_ID}] Fichier introuvable: ${rel(file)}`);
  }

  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

function backup(file, backupFile) {
  if (!fs.existsSync(backupFile)) {
    fs.copyFileSync(file, backupFile);
    console.log(`[BACKUP] ${rel(backupFile)}`);
  } else {
    console.log(`[BACKUP_EXISTS] ${rel(backupFile)}`);
  }
}

function ensureMappingEngine() {
  const content = `export type RuntimeMappingSourceRecord = Record<string, unknown>;
export type RuntimeMappingTargetRecord = Record<string, unknown>;

export type RuntimeRecordMappingRule =
  | string
  | {
      from?: string;
      value?: unknown;
      fallback?: unknown;
      transform?: (value: unknown, source: RuntimeMappingSourceRecord) => unknown;
    };

export type RuntimeRecordMappingDefinition = Record<string, RuntimeRecordMappingRule>;

function getSourceValue(
  source: RuntimeMappingSourceRecord,
  fieldName?: string
): unknown {
  if (!fieldName) return undefined;
  return source[fieldName];
}

function hasValue(value: unknown): boolean {
  return value !== undefined && value !== null && value !== "";
}

export class RuntimeRecordMappingEngine {
  static mapRecord(
    source: RuntimeMappingSourceRecord,
    mapping: RuntimeRecordMappingDefinition
  ): RuntimeMappingTargetRecord {
    const target: RuntimeMappingTargetRecord = {};

    for (const [targetField, rule] of Object.entries(mapping)) {
      if (typeof rule === "string") {
        target[targetField] = getSourceValue(source, rule);
        continue;
      }

      if ("value" in rule) {
        target[targetField] = rule.value;
        continue;
      }

      const sourceValue = getSourceValue(source, rule.from);
      const mappedValue = hasValue(sourceValue) ? sourceValue : rule.fallback;

      target[targetField] = rule.transform
        ? rule.transform(mappedValue, source)
        : mappedValue;
    }

    return target;
  }
}
`;

  write(MAPPING_ENGINE, content);
  console.log(`[WRITTEN] ${rel(MAPPING_ENGINE)}`);
}

function ensureMappingIndex() {
  const content = `export * from "./RuntimeRecordMappingEngine";
`;

  write(MAPPING_INDEX, content);
  console.log(`[WRITTEN] ${rel(MAPPING_INDEX)}`);
}

function patchBusinessRules() {
  let content = read(BUSINESS_RULES);
  backup(BUSINESS_RULES, BUSINESS_RULES_BACKUP);

  if (!content.includes('from "../mapping"')) {
    const importMarker = 'import { RuntimeSchedulingEngine } from "../scheduling";';

    if (!content.includes(importMarker)) {
      throw new Error(
        `[${PASS_ID}] Import RuntimeSchedulingEngine introuvable dans runtimeBusinessRules.ts`
      );
    }

    content = content.replace(
      importMarker,
      `${importMarker}
import { RuntimeRecordMappingEngine } from "../mapping";`
    );

    console.log("[PATCHED] import RuntimeRecordMappingEngine");
  } else {
    console.log("[SKIP] import mapping déjà présent");
  }

  const mappingHelper = `
function buildInterventionFromRendezvousRecord(
  rendezvous: Record<string, unknown>
): Record<string, unknown> {
  return RuntimeRecordMappingEngine.mapRecord(rendezvous, {
    clientId: "clientId",
    vehiculeId: "vehiculeId",
    rendezVousId: "id",
    typeIntervention: {
      from: "typeService",
      fallback: "autre",
    },
    dateIntervention: "dateRendezVous",
    statut: {
      value: "planifiee",
    },
  });
}
`;

  if (!content.includes("function buildInterventionFromRendezvousRecord(")) {
    const helperInsertMarker = "function asString(value: unknown): string {";

    if (!content.includes(helperInsertMarker)) {
      throw new Error(
        `[${PASS_ID}] Point d'insertion helper asString introuvable.`
      );
    }

    content = content.replace(
      helperInsertMarker,
      `${mappingHelper}
${helperInsertMarker}`
    );

    console.log("[PATCHED] helper buildInterventionFromRendezvousRecord");
  } else {
    console.log("[SKIP] helper déjà présent");
  }

  const before = content;
  content = content.replace(
    /RuntimeSchedulingEngine\s*\.\s*buildInterventionFromRendezvous\s*\(/g,
    "buildInterventionFromRendezvousRecord("
  );

  if (content !== before) {
    console.log("[PATCHED] appels RuntimeSchedulingEngine.buildInterventionFromRendezvous remplacés");
  } else {
    console.log("[SKIP] aucun appel RuntimeSchedulingEngine.buildInterventionFromRendezvous trouvé");
  }

  write(BUSINESS_RULES, content);
  console.log(`[WRITTEN] ${rel(BUSINESS_RULES)}`);
}

function main() {
  console.log(`[${PASS_ID}] Installation RuntimeRecordMappingEngine...`);

  ensureMappingEngine();
  ensureMappingIndex();
  patchBusinessRules();

  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  node .\\\\scripts\\\\runtime\\\\audit-q22e9l-b2-rdv-intervention-extraction.cjs");
  console.log("  git diff -- src/runtime/mapping src/runtime/business-rules/runtimeBusinessRules.ts");
}

main();
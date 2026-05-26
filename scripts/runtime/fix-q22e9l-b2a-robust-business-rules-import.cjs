/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9L-B2-A-FIX1";

const BUSINESS_RULES = path.join(
  ROOT,
  "src",
  "runtime",
  "business-rules",
  "runtimeBusinessRules.ts"
);

const MAPPING_DIR = path.join(ROOT, "src", "runtime", "mapping");
const MAPPING_ENGINE = path.join(MAPPING_DIR, "RuntimeRecordMappingEngine.ts");
const MAPPING_INDEX = path.join(MAPPING_DIR, "index.ts");

const BACKUP = `${BUSINESS_RULES}.bak-q22e9l-b2a-fix1-robust-import`;

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

function backup(file) {
  if (!fs.existsSync(BACKUP)) {
    fs.copyFileSync(file, BACKUP);
    console.log(`[BACKUP] ${rel(BACKUP)}`);
  } else {
    console.log(`[BACKUP_EXISTS] ${rel(BACKUP)}`);
  }
}

function ensureMappingEngineFiles() {
  if (!fs.existsSync(MAPPING_ENGINE)) {
    const engine = `export type RuntimeMappingSourceRecord = Record<string, unknown>;
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

    write(MAPPING_ENGINE, engine);
    console.log(`[WRITTEN] ${rel(MAPPING_ENGINE)}`);
  } else {
    console.log(`[SKIP] ${rel(MAPPING_ENGINE)} existe déjà`);
  }

  if (!fs.existsSync(MAPPING_INDEX)) {
    write(MAPPING_INDEX, `export * from "./RuntimeRecordMappingEngine";\n`);
    console.log(`[WRITTEN] ${rel(MAPPING_INDEX)}`);
  } else {
    console.log(`[SKIP] ${rel(MAPPING_INDEX)} existe déjà`);
  }
}

function addMappingImport(content) {
  if (content.includes("RuntimeRecordMappingEngine")) {
    console.log("[SKIP] RuntimeRecordMappingEngine déjà importé ou utilisé");
    return content;
  }

  const importLine = `import { RuntimeRecordMappingEngine } from "../mapping";`;

  const lastImportMatch = [...content.matchAll(/^import .+;$/gm)].pop();

  if (!lastImportMatch) {
    throw new Error(`[${PASS_ID}] Aucun import trouvé dans runtimeBusinessRules.ts`);
  }

  const insertAt = lastImportMatch.index + lastImportMatch[0].length;

  console.log("[PATCHED] import RuntimeRecordMappingEngine ajouté après le dernier import");

  return (
    content.slice(0, insertAt) +
    `\n${importLine}` +
    content.slice(insertAt)
  );
}

function addMappingHelper(content) {
  if (content.includes("function buildInterventionFromRendezvousRecord(")) {
    console.log("[SKIP] helper buildInterventionFromRendezvousRecord déjà présent");
    return content;
  }

  const helper = `
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

  const firstFunctionIndex = content.search(/^function\s+/m);

  if (firstFunctionIndex !== -1) {
    console.log("[PATCHED] helper inséré avant la première fonction");
    return content.slice(0, firstFunctionIndex) + helper + "\n" + content.slice(firstFunctionIndex);
  }

  const lastImportMatch = [...content.matchAll(/^import .+;$/gm)].pop();

  if (!lastImportMatch) {
    throw new Error(`[${PASS_ID}] Aucun point d'insertion trouvé pour helper`);
  }

  const insertAt = lastImportMatch.index + lastImportMatch[0].length;

  console.log("[PATCHED] helper inséré après imports");

  return content.slice(0, insertAt) + "\n" + helper + content.slice(insertAt);
}

function replaceSchedulingCalls(content) {
  const before = content;

  content = content.replace(
    /RuntimeSchedulingEngine\s*\.\s*buildInterventionFromRendezvous\s*\(/g,
    "buildInterventionFromRendezvousRecord("
  );

  content = content.replace(
    /\.buildInterventionFromRendezvous\s*\(/g,
    "buildInterventionFromRendezvousRecord("
  );

  if (content !== before) {
    console.log("[PATCHED] appels buildInterventionFromRendezvous remplacés");
  } else {
    console.log("[SKIP] aucun appel buildInterventionFromRendezvous à remplacer");
  }

  return content;
}

function main() {
  console.log(`[${PASS_ID}] Patch robuste BusinessRules vers RuntimeRecordMappingEngine...`);

  ensureMappingEngineFiles();

  let content = read(BUSINESS_RULES);
  backup(BUSINESS_RULES);

  content = addMappingImport(content);
  content = addMappingHelper(content);
  content = replaceSchedulingCalls(content);

  write(BUSINESS_RULES, content);

  console.log(`[WRITTEN] ${rel(BUSINESS_RULES)}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  node .\\\\scripts\\\\runtime\\\\audit-q22e9l-b2-rdv-intervention-extraction.cjs");
}

main();
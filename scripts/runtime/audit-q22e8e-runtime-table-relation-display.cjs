const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  table: path.join(
    root,
    "src",
    "components",
    "erp",
    "runtime",
    "ERPRuntimeTable.tsx"
  ),
  fieldValue: path.join(
    root,
    "src",
    "components",
    "erp",
    "runtime",
    "ERPRuntimeFieldValue.tsx"
  ),
  dataLoader: path.join(
    root,
    "src",
    "runtime",
    "modules",
    "lifecycle",
    "ERPRelationDataLoader.ts"
  ),
  labelEngine: path.join(
    root,
    "src",
    "runtime",
    "relations",
    "RuntimeRelationLabelEngine.ts"
  ),
  labelResolver: path.join(
    root,
    "src",
    "runtime",
    "relations",
    "RuntimeRelationLabelResolver.ts"
  ),
};

const checks = [
  {
    file: "table",
    label: "ERPRuntimeTable délègue les cellules à ERPRuntimeFieldValue",
    pattern: /<ERPRuntimeFieldValue[\s\S]*field=\{field\}[\s\S]*value=\{row\[column\.key\]\}/,
  },
  {
    file: "table",
    label: "ERPRuntimeTable ne charge pas directement les relations",
    pattern: /ERPRelationDataLoader|RuntimeRelationLabelResolver|RuntimeDataBinding\.list/,
    negative: true,
  },
  {
    file: "fieldValue",
    label: "ERPRuntimeFieldValue détecte les champs relationnels",
    pattern: /field\.type === "relation"[\s\S]*field\.relation/,
  },
  {
    file: "fieldValue",
    label: "ERPRuntimeFieldValue utilise ERPRelationDataLoader",
    pattern: /ERPRelationDataLoader/,
  },
  {
    file: "fieldValue",
    label: "ERPRuntimeFieldValue possède un cache relationnel",
    pattern: /relationCache/,
  },
  {
    file: "dataLoader",
    label: "ERPRelationDataLoader charge les relations",
    pattern: /RuntimeDataBinding\.list/,
  },
  {
    file: "dataLoader",
    label: "ERPRelationDataLoader sait résoudre un label par id",
    pattern: /static async resolveLabel/,
  },
  {
    file: "dataLoader",
    label: "ERPRelationDataLoader délègue à RuntimeRelationLabelEngine",
    pattern: /RuntimeRelationLabelEngine\.buildLabelAsync/,
  },
  {
    file: "labelEngine",
    label: "RuntimeRelationLabelEngine est le moteur central label métier",
    pattern: /export class RuntimeRelationLabelEngine/,
  },
  {
    file: "labelResolver",
    label: "RuntimeRelationLabelResolver est consolidé comme façade batch",
    pattern: /Q22E8D_CONSOLIDATED_RELATION_LABEL_RESOLVER|RuntimeRelationLabelEngine/,
  },
];

function fail(message) {
  console.error(`\n[ERROR] ${message}`);
  process.exit(1);
}

function read(fileKey) {
  const filePath = files[fileKey];

  if (!fs.existsSync(filePath)) {
    fail(`Fichier introuvable: ${path.relative(root, filePath)}`);
  }

  return fs.readFileSync(filePath, "utf8");
}

console.log("\n[Q22E-8E] Audit table -> field value -> relation labels\n");

let hasError = false;

for (const check of checks) {
  const content = read(check.file);
  const matched = check.pattern.test(content);
  const ok = check.negative ? !matched : matched;

  if (ok) {
    console.log(`[OK] ${check.label}`);
  } else {
    console.log(`[FAIL] ${check.label}`);
    console.log(`     File: ${path.relative(root, files[check.file])}`);
    hasError = true;
  }
}

const backupFiles = [];

for (const filePath of Object.values(files)) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath);

  if (!fs.existsSync(dir)) {
    continue;
  }

  for (const file of fs.readdirSync(dir)) {
    if (file.startsWith(base + ".bak")) {
      backupFiles.push(path.join(dir, file));
    }
  }
}

if (backupFiles.length > 0) {
  console.log("\n[WARN] Backups détectés :");
  for (const file of backupFiles) {
    console.log(` - ${path.relative(root, file)}`);
  }
} else {
  console.log("\n[OK] Aucun backup ciblé détecté.");
}

if (hasError) {
  console.error("\n[Q22E8E_AUDIT_FAILED]");
  process.exit(1);
}

console.log("\n[Q22E8E_AUDIT_OK] Pipeline relationnel des listes conforme.");
console.log("\n[DECISION]");
console.log("- Ne pas brancher RuntimeRelationLabelResolver directement dans ERPRuntimeTable.");
console.log("- Si des IDs restent visibles en liste, renforcer ERPRuntimeFieldValue ou ERPRelationDataLoader.");
console.log("- La table doit rester un consommateur UI, pas un moteur relationnel.");
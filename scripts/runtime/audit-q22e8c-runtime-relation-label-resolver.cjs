const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  resolver: path.join(
    root,
    "src",
    "runtime",
    "relations",
    "RuntimeRelationLabelResolver.ts"
  ),
  planning: path.join(
    root,
    "src",
    "components",
    "erp",
    "scheduling",
    "ERPSchedulingPlanningView.tsx"
  ),
};

const checks = [
  {
    file: "resolver",
    label: "Resolver générique présent",
    pattern: /export class RuntimeRelationLabelResolver/,
  },
  {
    file: "resolver",
    label: "Utilise les metadata schema.fields relation",
    pattern: /module\.schema\.fields\.filter[\s\S]*Boolean\(field\.relation\)/,
  },
  {
    file: "resolver",
    label: "Résout le module lié via relation metadata",
    pattern: /getRelationModuleKey/,
  },
  {
    file: "resolver",
    label: "Utilise allERPModules pour trouver le module lié",
    pattern: /allERPModules\.find/,
  },
  {
    file: "resolver",
    label: "Utilise RuntimeDataBinding pour charger les records liés",
    pattern: /RuntimeDataBinding\.list/,
  },
  {
    file: "resolver",
    label: "Supporte contextBanner labelFields",
    pattern: /contextBanner[\s\S]*labelFields/,
  },
  {
    file: "resolver",
    label: "Supporte composition labelFields",
    pattern: /relationModule\.composition\?\.labelFields/,
  },
  {
    file: "resolver",
    label: "Masque les IDs techniques non résolus",
    pattern: /isLikelyTechnicalId/,
  },
  {
    file: "resolver",
    label: "Aucun hardcode rendezvous",
    pattern: /\brendezvous\b/i,
    negative: true,
  },
  {
    file: "resolver",
    label: "Aucun hardcode AMARKHYS",
    pattern: /\bAMARKHYS\b/i,
    negative: true,
  },
  {
    file: "resolver",
    label: "Aucun hardcode garage",
    pattern: /\bgarage\b/i,
    negative: true,
  },
  {
    file: "planning",
    label: "Planning consomme RuntimeRelationLabelResolver",
    pattern: /RuntimeRelationLabelResolver/,
  },
  {
    file: "planning",
    label: "Planning stocke relationLabels",
    pattern: /relationLabels/,
  },
  {
    file: "planning",
    label: "Planning formate les réservations via resolver",
    pattern: /RuntimeRelationLabelResolver\.formatRecordLabel/,
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

console.log("\n[Q22E-8C] Audit RuntimeRelationLabelResolver\n");

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
  console.error("\n[Q22E8C_AUDIT_FAILED]");
  process.exit(1);
}

console.log("\n[Q22E8C_AUDIT_OK] RuntimeRelationLabelResolver conforme.");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const reportPath = path.join(root, "docs", "audits", "Q2-OH-product-stock-hub-readiness.md");

const checks = [];

function add(scope, status, severity, message) {
  checks.push({ scope, status, severity, message });
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function walk(dir, predicate, results = []) {
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, predicate, results);
      continue;
    }

    if (predicate(full)) results.push(full);
  }

  return results;
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

console.log("[Q2-OH] Product / Stock Hub readiness audit");
console.log("[ROOT] " + root);

const foundationFiles = [
  "src/runtime/hub/RuntimeHubTypes.ts",
  "src/runtime/hub/RuntimeHubEngine.ts",
  "src/runtime/hub/RuntimeHubRelationResolver.ts",
  "src/components/erp/hub/ERPRecordHubPage.tsx",
  "src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx",
  "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",
  "src/runtime/data-binding/RuntimeDataBinding.ts",
];

for (const file of foundationFiles) {
  if (exists(file)) {
    add("foundation", "OK", "HIGH", "Found " + file);
  } else {
    add("foundation", "FAIL", "HIGH", "Missing " + file);
  }
}

const moduleCandidates = [
  {
    key: "produitsauto",
    file: "src/runtime/modules/generated/produitsauto/produitsauto.module.ts",
    expectedExport: "produitsautoModule",
  },
  {
    key: "stocksauto",
    file: "src/runtime/modules/generated/stocksauto/stocksauto.module.ts",
    expectedExport: "stocksautoModule",
  },
  {
    key: "mouvementsstockauto",
    file: "src/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module.ts",
    expectedExport: "mouvementsstockautoModule",
  },
  {
    key: "commandesstockauto",
    file: "src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts",
    expectedExport: "commandesstockautoModule",
  },
  {
    key: "receptionsstockauto",
    file: "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts",
    expectedExport: "receptionsstockautoModule",
  },
];

for (const module of moduleCandidates) {
  if (!exists(module.file)) {
    add("modules", "FAIL", "HIGH", "Missing module file for " + module.key + ": " + module.file);
    continue;
  }

  const content = read(module.file);

  add("modules", "OK", "HIGH", "Found module file for " + module.key);

  if (content.includes("export const " + module.expectedExport)) {
    add("modules", "OK", "HIGH", "Expected export detected: " + module.expectedExport);
  } else {
    add("modules", "FAIL", "HIGH", "Expected export missing: " + module.expectedExport);
  }

  if (content.includes('key: "' + module.key + '"') || content.includes("key: '" + module.key + "'")) {
    add("modules", "OK", "MEDIUM", "Module key detected in " + module.key);
  } else {
    add("modules", "WARN", "LOW", "Module key text not detected in " + module.key);
  }

  if (content.includes("operational")) {
    add("modules", "OK", "LOW", module.key + " has operational metadata");
  } else {
    add("modules", "WARN", "LOW", module.key + " has no operational metadata marker");
  }
}

const expectedRelations = [
  {
    from: "stocksauto",
    file: "src/runtime/modules/generated/stocksauto/stocksauto.module.ts",
    marker: "produitId",
  },
  {
    from: "mouvementsstockauto",
    file: "src/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module.ts",
    marker: "produitId",
  },
  {
    from: "commandesstockauto",
    file: "src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts",
    marker: "produit",
  },
  {
    from: "receptionsstockauto",
    file: "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts",
    marker: "commande",
  },
];

for (const relation of expectedRelations) {
  if (!exists(relation.file)) continue;

  const content = read(relation.file);

  if (content.includes(relation.marker)) {
    add("relations", "OK", "MEDIUM", relation.from + " contains relation marker: " + relation.marker);
  } else {
    add("relations", "WARN", "LOW", relation.from + " missing relation marker: " + relation.marker);
  }
}

const existingProductHubFiles = walk(path.join(root, "src"), (file) => {
  const normalized = rel(file).toLowerCase();
  if (!(file.endsWith(".ts") || file.endsWith(".tsx"))) return false;

  const content = fs.readFileSync(file, "utf8").toLowerCase();

  return (
    normalized.includes("productstockhub") ||
    normalized.includes("product-stock-hub") ||
    content.includes("product-stock-operational-hub") ||
    content.includes("produit stock opérationnel")
  );
});

if (existingProductHubFiles.length === 0) {
  add("existing-hub", "OK", "HIGH", "No existing Product / Stock Hub implementation detected");
} else {
  for (const file of existingProductHubFiles) {
    add("existing-hub", "WARN", "LOW", "Existing product hub marker detected: " + rel(file));
  }
}

const forbiddenUiPatterns = ["firebase/firestore", "getDocs(", "collection("];

for (const file of [
  "src/components/erp/hub/ERPRecordHubPage.tsx",
  "src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx",
  "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",
]) {
  if (!exists(file)) continue;

  const content = read(file);

  for (const marker of forbiddenUiPatterns) {
    if (content.includes(marker)) {
      add("ui-boundary", "FAIL", "HIGH", "Forbidden local Firestore marker " + marker + " in " + file);
    }
  }
}

const backups = walk(root, (file) => path.basename(file).includes(".bak-q2oh"));

if (backups.length > 0) {
  for (const backup of backups) {
    add("cleanup", "FAIL", "HIGH", "Q2-OH backup still present: " + rel(backup));
  }
} else {
  add("cleanup", "OK", "HIGH", "No Q2-OH backup detected");
}

const ok = checks.filter((check) => check.status === "OK");
const warn = checks.filter((check) => check.status === "WARN");
const fail = checks.filter((check) => check.status === "FAIL");
const highFail = checks.filter((check) => check.status === "FAIL" && check.severity === "HIGH");

const lines = [];

lines.push("# Q2-OH — Product / Stock Operational Hub Readiness");
lines.push("");
lines.push("- Date: " + new Date().toISOString());
lines.push("- Root: `" + root + "`");
lines.push("");
lines.push("## Objectif");
lines.push("");
lines.push("Préparer la création du Product / Stock Operational Hub avec le moteur générique ERPRecordHub.");
lines.push("");
lines.push("Cible métier :");
lines.push("");
lines.push("- Produit");
lines.push("- Stocks");
lines.push("- Mouvements de stock");
lines.push("- Commandes stock");
lines.push("- Réceptions stock");
lines.push("- Alertes");
lines.push("");
lines.push("## Règles");
lines.push("");
lines.push("- réutiliser ERPRecordHub");
lines.push("- loader runtime côté serveur");
lines.push("- aucune requête Firestore dans l’UI");
lines.push("- ne pas créer une page produit/stock hardcodée");
lines.push("- rester générique comme Client Operational Hub");
lines.push("");
lines.push("## Résumé");
lines.push("");
lines.push("- OK: " + ok.length);
lines.push("- WARN: " + warn.length);
lines.push("- FAIL: " + fail.length);
lines.push("- HIGH FAIL: " + highFail.length);
lines.push("");
lines.push("## Checks");
lines.push("");
lines.push("| Scope | Status | Severity | Message |");
lines.push("|---|---:|---:|---|");

for (const check of checks) {
  lines.push("| " + check.scope + " | " + check.status + " | " + check.severity + " | " + check.message.replaceAll("|", "\\|") + " |");
}

lines.push("");
lines.push("## Décision");
lines.push("");

if (highFail.length > 0) {
  lines.push("Q2-OH n’est pas prêt. Corriger les HIGH FAIL avant création du Product / Stock Hub.");
} else {
  lines.push("Q2-OH est prêt techniquement pour créer le Product / Stock Operational Hub.");
}

fs.writeFileSync(reportPath, lines.join("\n"), "utf8");

console.log("[REPORT] " + rel(reportPath));
console.log("[OK] " + ok.length);
console.log("[WARN] " + warn.length);
console.log("[FAIL] " + fail.length);
console.log("[FAIL_HIGH] " + highFail.length);

if (highFail.length > 0) {
  process.exit(1);
}

console.log("[Q2-OH] Readiness audit completed without HIGH failure.");
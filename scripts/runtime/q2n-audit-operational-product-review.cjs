const fs = require("fs");
const path = require("path");

const root = process.cwd();

const reportPath = path.join(
  root,
  "docs",
  "audits",
  "Q2-N-operational-product-review.md"
);

const checks = [];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function addCheck(scope, status, severity, message) {
  checks.push({ scope, status, severity, message });
}

function findFiles(dir, predicate, results = []) {
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      findFiles(fullPath, predicate, results);
      continue;
    }

    if (predicate(fullPath)) {
      results.push(fullPath);
    }
  }

  return results;
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

console.log("[Q2-N] Operational product review audit");
console.log(`[ROOT] ${root}`);

const requiredFiles = [
  {
    scope: "runtime-page",
    file: "src/components/erp/runtime/ERPRuntimePage.tsx",
    expectations: ["ERPOperationalModulePage"],
  },
  {
    scope: "operational-index",
    file: "src/components/erp/operational/index.ts",
    expectations: [
      "ERPOperationalModulePage",
      "ERPOperationalTable",
      "ERPOperationalFilters",
      "ERPOperationalRightPanel",
      "ERPOperationalExpandedChildren",
    ],
  },
  {
    scope: "module-page",
    file: "src/components/erp/operational/ERPOperationalModulePage.tsx",
    expectations: [
      "ERPOperationalKpiStrip",
      "ERPOperationalFilters",
      "ERPOperationalTable",
      "ERPOperationalRightPanel",
      "operationalUiTokens",
    ],
  },
  {
    scope: "kpi-strip",
    file: "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
    expectations: ["operational"],
  },
  {
    scope: "filters",
    file: "src/components/erp/operational/ERPOperationalFilters.tsx",
    expectations: ["operationalUiTokens"],
  },
  {
    scope: "table",
    file: "src/components/erp/operational/ERPOperationalTable.tsx",
    expectations: [
      "ERPOperationalExpandedChildren",
      "operationalUiTokens",
    ],
  },
  {
    scope: "expanded-children",
    file: "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
    expectations: [
      "operationalUiTokens",
      "RuntimeOperationalChildrenResolver",
    ],
  },
  {
    scope: "right-panel",
    file: "src/components/erp/operational/ERPOperationalRightPanel.tsx",
    expectations: ["operational"],
  },
  {
    scope: "children-resolver",
    file: "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
    expectations: ["metadata.key"],
  },
  {
    scope: "tokens",
    file: "src/components/erp/operational/operationalUiTokens.ts",
    expectations: ["operationalUiTokens"],
  },
];

for (const item of requiredFiles) {
  if (!exists(item.file)) {
    addCheck(item.scope, "FAIL", "HIGH", `Missing required file: ${item.file}`);
    continue;
  }

  const content = read(item.file);
  addCheck(item.scope, "OK", "HIGH", `File found: ${item.file}`);

  for (const expectation of item.expectations) {
    if (content.includes(expectation)) {
      addCheck(item.scope, "OK", "MEDIUM", `Expected reference found: ${expectation}`);
    } else {
      addCheck(item.scope, "WARN", "LOW", `Expected reference not found or renamed: ${expectation}`);
    }
  }
}

const operationalModules = [
  "clientsauto",
  "vehicules",
  "rendezvous",
  "interventionsauto",
  "facturesauto",
];

const moduleDir = path.join(root, "src", "runtime", "modules");
const moduleFiles = findFiles(moduleDir, (file) => {
  const normalized = file.replaceAll("\\", "/");
  return (
    normalized.endsWith(".module.ts") ||
    normalized.endsWith(".ts")
  );
});

for (const moduleKey of operationalModules) {
  const candidates = moduleFiles.filter((file) => {
    const content = fs.readFileSync(file, "utf8");
    return content.includes(moduleKey);
  });

  if (candidates.length === 0) {
    addCheck("modules", "FAIL", "HIGH", `Operational module not found in runtime definitions: ${moduleKey}`);
    continue;
  }

  addCheck(
    "modules",
    "OK",
    "HIGH",
    `Operational module detected: ${moduleKey} in ${candidates.map(rel).join(", ")}`
  );

  const joined = candidates.map((file) => fs.readFileSync(file, "utf8")).join("\n");

  if (joined.includes("operational")) {
    addCheck("modules", "OK", "HIGH", `${moduleKey} has operational metadata reference`);
  } else {
    addCheck("modules", "FAIL", "HIGH", `${moduleKey} has no operational metadata reference`);
  }

  if (joined.includes("table")) {
    addCheck("modules", "OK", "MEDIUM", `${moduleKey} has table metadata reference`);
  } else {
    addCheck("modules", "WARN", "LOW", `${moduleKey} table metadata not detected`);
  }

  if (joined.includes("relationLabelFields")) {
    addCheck("modules", "OK", "MEDIUM", `${moduleKey} relation label metadata detected`);
  } else {
    addCheck("modules", "WARN", "LOW", `${moduleKey} relation label metadata not detected`);
  }
}

const q2nBackups = findFiles(root, (file) => {
  const normalized = file.replaceAll("\\", "/");
  return normalized.includes(".bak-q2n-");
});

if (q2nBackups.length === 0) {
  addCheck("cleanup", "OK", "HIGH", "No Q2-N backup file detected");
} else {
  for (const backup of q2nBackups) {
    addCheck("cleanup", "FAIL", "HIGH", `Q2-N backup still present: ${rel(backup)}`);
  }
}

const q2mBackups = findFiles(root, (file) => {
  const normalized = file.replaceAll("\\", "/");
  return normalized.includes(".bak-q2m-");
});

if (q2mBackups.length === 0) {
  addCheck("cleanup", "OK", "HIGH", "No Q2-M backup file detected");
} else {
  for (const backup of q2mBackups) {
    addCheck("cleanup", "FAIL", "HIGH", `Q2-M backup still present: ${rel(backup)}`);
  }
}

const highFails = checks.filter((check) => check.status === "FAIL" && check.severity === "HIGH");
const fails = checks.filter((check) => check.status === "FAIL");
const warns = checks.filter((check) => check.status === "WARN");
const oks = checks.filter((check) => check.status === "OK");

const lines = [];

lines.push("# Q2-N — Operational Product Review");
lines.push("");
lines.push(`- Date: ${new Date().toISOString()}`);
lines.push(`- Root: \`${root}\``);
lines.push("");
lines.push("## Objectif");
lines.push("");
lines.push("Revue produit finale de la chaîne opérationnelle après Q2-M :");
lines.push("");
lines.push("`Clients → Véhicules → Rendez-vous → Interventions → Factures`");
lines.push("");
lines.push("Cette passe ne modifie pas le runtime. Elle vérifie la présence du socle opérationnel, des modules, des metadata opérationnelles et l’absence de backups Q2-M/Q2-N.");
lines.push("");
lines.push("## Résumé");
lines.push("");
lines.push(`- OK: ${oks.length}`);
lines.push(`- WARN: ${warns.length}`);
lines.push(`- FAIL: ${fails.length}`);
lines.push(`- HIGH FAIL: ${highFails.length}`);
lines.push("");
lines.push("## Checklist produit manuelle à exécuter");
lines.push("");
lines.push("### /clientsauto");
lines.push("- [ ] KPI visibles et lisibles");
lines.push("- [ ] Recherche visible et fonctionnelle");
lines.push("- [ ] Colonnes lisibles");
lines.push("- [ ] Expand véhicule présent si données liées");
lines.push("- [ ] Panneau droit cohérent");
lines.push("");
lines.push("### /vehicules");
lines.push("- [ ] Client affiché lisiblement");
lines.push("- [ ] Recherche véhicule/client fonctionnelle");
lines.push("- [ ] Expand rendez-vous/interventions cohérent");
lines.push("- [ ] Navigation vers fiche véhicule OK");
lines.push("");
lines.push("### /rendezvous");
lines.push("- [ ] Client lisible");
lines.push("- [ ] Véhicule lisible");
lines.push("- [ ] Date/heure/statut lisibles");
lines.push("- [ ] Expand intervention cohérent");
lines.push("");
lines.push("### /interventionsauto");
lines.push("- [ ] Client lisible");
lines.push("- [ ] Véhicule lisible");
lines.push("- [ ] Rendez-vous lisible");
lines.push("- [ ] Lignes intervention visibles au bon endroit");
lines.push("- [ ] Total lisible");
lines.push("- [ ] Expand lignes intervention OK");
lines.push("");
lines.push("### /facturesauto");
lines.push("- [ ] Client lisible");
lines.push("- [ ] Véhicule lisible");
lines.push("- [ ] Intervention lisible");
lines.push("- [ ] Montants HT/TTC lisibles");
lines.push("- [ ] Statut facture lisible");
lines.push("");
lines.push("## Checks techniques");
lines.push("");
lines.push("| Scope | Status | Severity | Message |");
lines.push("|---|---:|---:|---|");

for (const check of checks) {
  lines.push(
    `| ${check.scope} | ${check.status} | ${check.severity} | ${check.message.replaceAll("|", "\\|")} |`
  );
}

lines.push("");
lines.push("## Décision");
lines.push("");

if (highFails.length > 0) {
  lines.push("Q2-N n’est **pas validé** techniquement. Corriger les HIGH FAIL avant revue visuelle finale.");
} else {
  lines.push("Q2-N est **validé techniquement**. Passer à la revue visuelle manuelle sur les 5 routes opérationnelles.");
}

lines.push("");

fs.writeFileSync(reportPath, lines.join("\n"), "utf8");

console.log(`[REPORT] ${rel(reportPath)}`);
console.log(`[OK] ${oks.length}`);
console.log(`[WARN] ${warns.length}`);
console.log(`[FAIL] ${fails.length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);

if (highFails.length > 0) {
  console.error("[Q2-N] Blocking failures detected.");
  process.exit(1);
}

console.log("[Q2-N] Technical audit completed without HIGH failure.");
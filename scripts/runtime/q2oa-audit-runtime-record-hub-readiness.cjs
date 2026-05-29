const fs = require("fs");
const path = require("path");

const root = process.cwd();

const reportPath = path.join(
  root,
  "docs",
  "audits",
  "Q2-OA-runtime-record-hub-readiness.md"
);

const checks = [];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function add(scope, status, severity, message) {
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

function scanFiles(baseDir, extensions = [".ts", ".tsx"]) {
  return findFiles(path.join(root, baseDir), (file) =>
    extensions.some((ext) => file.endsWith(ext))
  );
}

console.log("[Q2-OA] Runtime Record Hub readiness audit");
console.log(`[ROOT] ${root}`);

const requiredFoundation = [
  {
    scope: "operational-page",
    file: "src/components/erp/operational/ERPOperationalModulePage.tsx",
    expectations: [
      "ERPOperationalKpiStrip",
      "ERPOperationalFilters",
      "ERPOperationalTable",
      "ERPOperationalRightPanel",
    ],
  },
  {
    scope: "operational-table",
    file: "src/components/erp/operational/ERPOperationalTable.tsx",
    expectations: ["ERPOperationalExpandedChildren"],
  },
  {
    scope: "expanded-children",
    file: "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
    expectations: ["RuntimeOperationalChildrenResolver"],
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
  {
    scope: "runtime-page",
    file: "src/components/erp/runtime/ERPRuntimePage.tsx",
    expectations: ["ERPOperationalModulePage"],
  },
];

for (const item of requiredFoundation) {
  if (!exists(item.file)) {
    add(item.scope, "FAIL", "HIGH", `Missing foundation file: ${item.file}`);
    continue;
  }

  const content = read(item.file);
  add(item.scope, "OK", "HIGH", `Foundation file found: ${item.file}`);

  for (const expected of item.expectations) {
    if (content.includes(expected)) {
      add(item.scope, "OK", "MEDIUM", `Expected reference detected: ${expected}`);
    } else {
      add(item.scope, "WARN", "LOW", `Expected reference not detected or renamed: ${expected}`);
    }
  }
}

const runtimeDirs = [
  "src/runtime",
  "src/components/erp",
  "src/app",
];

for (const dir of runtimeDirs) {
  if (exists(dir)) {
    add("structure", "OK", "HIGH", `Directory found: ${dir}`);
  } else {
    add("structure", "FAIL", "HIGH", `Directory missing: ${dir}`);
  }
}

const runtimeFiles = scanFiles("src/runtime");
const componentFiles = scanFiles("src/components/erp");
const appFiles = scanFiles("src/app");

const importantPatterns = [
  {
    scope: "runtime-data",
    pattern: "RuntimeDataBinding",
    files: [...runtimeFiles, ...componentFiles, ...appFiles],
    severity: "HIGH",
  },
  {
    scope: "runtime-relations",
    pattern: "relationLabelFields",
    files: runtimeFiles,
    severity: "MEDIUM",
  },
  {
    scope: "runtime-operational",
    pattern: "operational",
    files: runtimeFiles,
    severity: "HIGH",
  },
  {
    scope: "runtime-composition",
    pattern: "composition",
    files: runtimeFiles,
    severity: "MEDIUM",
  },
  {
    scope: "runtime-kpis",
    pattern: "kpi",
    files: [...runtimeFiles, ...componentFiles],
    severity: "LOW",
  },
  {
    scope: "runtime-actions",
    pattern: "actions",
    files: runtimeFiles,
    severity: "MEDIUM",
  },
  {
    scope: "runtime-module-key",
    pattern: "moduleKey",
    files: [...runtimeFiles, ...componentFiles],
    severity: "HIGH",
  },
];

for (const item of importantPatterns) {
  const matches = [];

  for (const file of item.files) {
    const content = fs.readFileSync(file, "utf8");
    if (content.includes(item.pattern)) {
      matches.push(rel(file));
    }
  }

  if (matches.length > 0) {
    add(
      item.scope,
      "OK",
      item.severity,
      `${item.pattern} detected in ${matches.length} file(s)`
    );
  } else {
    add(
      item.scope,
      item.severity === "HIGH" ? "FAIL" : "WARN",
      item.severity,
      `${item.pattern} not detected`
    );
  }
}

const operationalModules = [
  "clientsauto",
  "vehicules",
  "rendezvous",
  "interventionsauto",
  "facturesauto",
  "produitsauto",
  "stocksauto",
  "commandesstockauto",
  "receptionsstockauto",
  "mouvementsstockauto",
];

const moduleFiles = runtimeFiles.filter((file) => {
  const normalized = file.replaceAll("\\", "/");
  return normalized.includes("/modules/") && normalized.endsWith(".ts");
});

for (const moduleKey of operationalModules) {
  const candidates = [];

  for (const file of moduleFiles) {
    const content = fs.readFileSync(file, "utf8");
    if (content.includes(moduleKey)) {
      candidates.push(file);
    }
  }

  if (candidates.length === 0) {
    add("modules", "WARN", "MEDIUM", `Module not detected yet or named differently: ${moduleKey}`);
    continue;
  }

  const joined = candidates.map((file) => fs.readFileSync(file, "utf8")).join("\n");

  add("modules", "OK", "HIGH", `Module detected: ${moduleKey}`);

  if (joined.includes("operational")) {
    add("modules", "OK", "MEDIUM", `${moduleKey} has operational metadata`);
  } else {
    add("modules", "WARN", "LOW", `${moduleKey} has no operational metadata detected`);
  }

  if (joined.includes("relationLabelFields")) {
    add("modules", "OK", "LOW", `${moduleKey} has relation label fields`);
  } else {
    add("modules", "WARN", "LOW", `${moduleKey} has no relation label fields detected`);
  }

  if (joined.includes("composition")) {
    add("modules", "OK", "LOW", `${moduleKey} has composition metadata`);
  } else {
    add("modules", "WARN", "LOW", `${moduleKey} has no composition metadata detected`);
  }
}

const hubExisting = [
  ...runtimeFiles,
  ...componentFiles,
  ...appFiles,
].filter((file) => {
  const normalized = file.replaceAll("\\", "/").toLowerCase();
  const content = fs.readFileSync(file, "utf8").toLowerCase();

  return normalized.includes("hub") || content.includes("recordhub") || content.includes("operationalhub");
});

if (hubExisting.length === 0) {
  add("hub-existing", "OK", "HIGH", "No existing Record Hub implementation detected. Safe to create a new generic foundation.");
} else {
  for (const file of hubExisting) {
    add("hub-existing", "WARN", "MEDIUM", `Potential existing hub-related file/content detected: ${rel(file)}`);
  }
}

const backupFiles = findFiles(root, (file) => {
  const normalized = file.replaceAll("\\", "/");
  return normalized.includes(".bak-q2o") || normalized.includes(".bak-q2n") || normalized.includes(".bak-q2m");
});

if (backupFiles.length === 0) {
  add("cleanup", "OK", "HIGH", "No Q2-O/Q2-N/Q2-M backup detected");
} else {
  for (const file of backupFiles) {
    add("cleanup", "FAIL", "HIGH", `Backup still present: ${rel(file)}`);
  }
}

const designNotes = [
  {
    title: "Décision produit",
    text:
      "Le besoin doit être traité comme un ERP Record Hub générique, pas comme une page AMARKHYS codée localement.",
  },
  {
    title: "Principe UX",
    text:
      "Utiliser toute la largeur utile de la page sans surcharge : résumé en haut, relation principale au centre, détails contextuels après sélection.",
  },
  {
    title: "Premier cas métier",
    text:
      "Client Operational Hub : Client → Véhicules → Rendez-vous → Interventions → Factures.",
  },
  {
    title: "Deuxième cas métier",
    text:
      "Product / Stock Operational Hub : Produit → Stocks → Mouvements → Commandes → Réceptions → Alertes.",
  },
  {
    title: "Principe technique",
    text:
      "Réutiliser ERPOperationalModulePage, les tokens Q2-M, RuntimeOperationalChildrenResolver, metadata operational, relationLabelFields et composition metadata.",
  },
  {
    title: "À éviter",
    text:
      "Pas de requêtes Firestore locales dans une page hub, pas de logique conditionnelle AMARKHYS dispersée, pas de duplication carte/tableau sans resolver générique.",
  },
];

const ok = checks.filter((check) => check.status === "OK");
const warn = checks.filter((check) => check.status === "WARN");
const fail = checks.filter((check) => check.status === "FAIL");
const highFail = checks.filter((check) => check.status === "FAIL" && check.severity === "HIGH");

const lines = [];

lines.push("# Q2-OA — Runtime Record Hub Readiness Audit");
lines.push("");
lines.push(`- Date: ${new Date().toISOString()}`);
lines.push(`- Root: \`${root}\``);
lines.push("");
lines.push("## Objectif");
lines.push("");
lines.push("Auditer l’existant avant de créer le Runtime Hub générique.");
lines.push("");
lines.push("Le but est de confirmer ce qui peut être réutilisé pour construire un système de hub relationnel opérationnel générique :");
lines.push("");
lines.push("- Client → Véhicules → Rendez-vous → Interventions → Factures");
lines.push("- Produit → Stocks → Mouvements → Commandes → Réceptions → Alertes");
lines.push("");
lines.push("Cette passe ne modifie pas l’application.");
lines.push("");
lines.push("## Résumé");
lines.push("");
lines.push(`- OK: ${ok.length}`);
lines.push(`- WARN: ${warn.length}`);
lines.push(`- FAIL: ${fail.length}`);
lines.push(`- HIGH FAIL: ${highFail.length}`);
lines.push("");
lines.push("## Notes de design");
lines.push("");

for (const note of designNotes) {
  lines.push(`### ${note.title}`);
  lines.push("");
  lines.push(note.text);
  lines.push("");
}

lines.push("## Architecture cible proposée");
lines.push("");
lines.push("```text");
lines.push("ERPRecordHubRuntime");
lines.push("├─ RuntimeHubEngine");
lines.push("├─ RuntimeHubConfigResolver");
lines.push("├─ RuntimeHubDataLoader");
lines.push("├─ RuntimeHubLayoutResolver");
lines.push("├─ RuntimeHubKpiResolver");
lines.push("├─ RuntimeHubRelationResolver");
lines.push("└─ RuntimeHubActionResolver");
lines.push("");
lines.push("ERPRecordHub UI");
lines.push("├─ ERPRecordHubPage");
lines.push("├─ ERPRecordHubSearchBar");
lines.push("├─ ERPRecordHubHeader");
lines.push("├─ ERPRecordHubKpiStrip");
lines.push("├─ ERPRecordHubPrimaryCollection");
lines.push("├─ ERPRecordHubCardGrid");
lines.push("├─ ERPRecordHubDataTable");
lines.push("├─ ERPRecordHubSelectedDetails");
lines.push("└─ ERPRecordHubQuickActions");
lines.push("```");
lines.push("");
lines.push("## Layout UX cible");
lines.push("");
lines.push("```text");
lines.push("┌──────────────────────────────────────────────────────────────┐");
lines.push("│ Recherche / filtres / actions rapides                        │");
lines.push("├──────────────────────────────────────────────────────────────┤");
lines.push("│ Header record + badges + KPIs                                │");
lines.push("├────────────────────────┬─────────────────────────────────────┤");
lines.push("│ Relation principale    │ Résumé contexte / actions            │");
lines.push("│ cartes/table/timeline  │ détail sélectionné                   │");
lines.push("├────────────────────────┴─────────────────────────────────────┤");
lines.push("│ Sections liées contextuelles : interventions, factures, etc.  │");
lines.push("└──────────────────────────────────────────────────────────────┘");
lines.push("```");
lines.push("");
lines.push("## Metadata cible exemple");
lines.push("");
lines.push("```ts");
lines.push("operationalHub: {");
lines.push("  enabled: true,");
lines.push("  rootModule: 'clientsauto',");
lines.push("  search: {");
lines.push("    placeholder: 'Rechercher un client...',");
lines.push("    filterFields: ['typeClient'],");
lines.push("  },");
lines.push("  header: {");
lines.push("    titleFields: ['nom', 'prenom'],");
lines.push("    subtitleFields: ['telephone', 'email'],");
lines.push("    badgeFields: ['typeClient'],");
lines.push("  },");
lines.push("  kpis: [");
lines.push("    'vehiculesCount',");
lines.push("    'activeInterventionsCount',");
lines.push("    'unpaidInvoicesCount',");
lines.push("    'totalBilledAmount',");
lines.push("  ],");
lines.push("  primaryCollection: {");
lines.push("    moduleKey: 'vehicules',");
lines.push("    foreignKey: 'clientId',");
lines.push("    displayModes: {");
lines.push("      particulier: 'cards',");
lines.push("      flotte: 'table',");
lines.push("      entreprise: 'table',");
lines.push("    },");
lines.push("  },");
lines.push("  selectedRecordDetails: [");
lines.push("    { moduleKey: 'interventionsauto', foreignKey: 'vehiculeId', layout: 'collapsible-list' },");
lines.push("    { moduleKey: 'facturesauto', foreignKey: 'vehiculeId', layout: 'collapsible-list' },");
lines.push("  ],");
lines.push("}");
lines.push("```");
lines.push("");
lines.push("## Checks");
lines.push("");
lines.push("| Scope | Status | Severity | Message |");
lines.push("|---|---:|---:|---|");

for (const check of checks) {
  lines.push(`| ${check.scope} | ${check.status} | ${check.severity} | ${check.message.replaceAll("|", "\\|")} |`);
}

lines.push("");
lines.push("## Décision");
lines.push("");

if (highFail.length > 0) {
  lines.push("Q2-OA n’est **pas validé**. Corriger les HIGH FAIL avant de créer la foundation hub.");
} else {
  lines.push("Q2-OA est **validé techniquement**. La prochaine étape peut être Q2-OB — création de la foundation ERPRecordHub.");
}

lines.push("");

fs.writeFileSync(reportPath, lines.join("\n"), "utf8");

console.log(`[REPORT] ${rel(reportPath)}`);
console.log(`[OK] ${ok.length}`);
console.log(`[WARN] ${warn.length}`);
console.log(`[FAIL] ${fail.length}`);
console.log(`[FAIL_HIGH] ${highFail.length}`);

if (highFail.length > 0) {
  console.error("[Q2-OA] Blocking failures detected.");
  process.exit(1);
}

console.log("[Q2-OA] Audit completed without HIGH failure.");
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function full(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  const file = full(relativePath);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function write(relativePath, content) {
  const file = full(relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

function lineNumberAt(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function findLines(content, marker) {
  const hits = [];
  let index = content.indexOf(marker);

  while (index !== -1) {
    hits.push(lineNumberAt(content, index));
    index = content.indexOf(marker, index + marker.length);
  }

  return hits;
}

function contextAround(content, lineNumber, before = 6, after = 10) {
  const lines = content.split(/\r?\n/);
  const start = Math.max(0, lineNumber - before - 1);
  const end = Math.min(lines.length, lineNumber + after);

  return lines
    .slice(start, end)
    .map((line, index) => {
      const actual = start + index + 1;
      return `${String(actual).padStart(5, " ")}: ${line}`;
    })
    .join("\n");
}

const priorityModules = [
  {
    key: "rendezvous",
    expectedActions: [
      "confirmer",
      "annuler",
      "reporter",
      "intervention",
    ],
    expectedEffects: [
      "confirme",
      "intervention",
      "consumedByInterventionId",
      "planning",
    ],
  },
  {
    key: "interventionsauto",
    expectedActions: [
      "demarrer",
      "terminer",
      "facture",
      "annuler",
    ],
    expectedEffects: [
      "terminee",
      "facture",
      "facturesauto",
      "coutTotal",
    ],
  },
  {
    key: "lignesinterventionauto",
    expectedActions: [
      "valider",
      "retirer",
    ],
    expectedEffects: [
      "retirer-ligne",
      "RuntimeLineRemovalService",
      "stock",
      "totaux",
    ],
  },
  {
    key: "facturesauto",
    expectedActions: [
      "envoyer",
      "paiement",
      "encaissement",
      "annuler",
    ],
    expectedEffects: [
      "encaissementsauto",
      "resteAPayer",
      "montantPaye",
      "statutFacture",
    ],
  },
  {
    key: "encaissementsauto",
    expectedActions: [
      "valider",
      "annuler",
    ],
    expectedEffects: [
      "factureId",
      "montantPaye",
      "resteAPayer",
      "historique",
    ],
  },
  {
    key: "commandesstockauto",
    expectedActions: [
      "envoyer",
      "reception",
      "annuler",
    ],
    expectedEffects: [
      "lignescommandestockauto",
      "receptionsstockauto",
      "fournisseurId",
    ],
  },
  {
    key: "receptionsstockauto",
    expectedActions: [
      "valider",
    ],
    expectedEffects: [
      "mouvementsstockauto",
      "stock",
      "mouvementStockId",
      "quantite",
    ],
  },
];

const files = {
  runtimePage: "src/components/erp/runtime/ERPRuntimePage.tsx",
  actionBar: "src/components/erp/runtime/ERPRuntimeActionBar.tsx",
  actionEngine: "src/runtime/actions/RuntimeActionEngine.ts",
  businessRules: "src/runtime/business-rules/runtimeBusinessRules.ts",
  coreModules: "src/runtime/modules/definitions/coreModules.ts",
  generatedRoot: "src/runtime/modules/generated",
  form: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
};

const runtimePage = read(files.runtimePage);
const actionBar = read(files.actionBar);
const actionEngine = read(files.actionEngine);
const businessRules = read(files.businessRules);
const coreModules = read(files.coreModules);
const form = read(files.form);

const checks = [];
const contexts = [];

function add(area, status, severity, message, file = "", lines = "") {
  checks.push({ area, status, severity, message, file, lines });
}

function addContext(file, content, marker, limit = 4) {
  const lines = findLines(content, marker);

  for (const line of lines.slice(0, limit)) {
    contexts.push({
      title: `${file} :: ${marker} :: line ${line}`,
      body: contextAround(content, line),
    });
  }

  return lines;
}

for (const [name, file] of Object.entries(files)) {
  if (name === "generatedRoot") {
    const exists = fs.existsSync(full(file));
    add("file", exists ? "OK" : "FAIL", "HIGH", `${file} ${exists ? "found" : "missing"}`, file);
  } else {
    const content = read(file);
    add("file", content ? "OK" : "FAIL", "HIGH", `${file} ${content ? "found" : "missing"}`, file);
  }
}

/**
 * Architecture checks.
 */
const runtimeRequired = [
  "RuntimeActionEngine.execute",
  "RuntimeActionEngine.getAvailableActions",
  "handleRuntimeAction",
  "ERPRuntimeActionBar",
  "void handleRuntimeAction",
  "RuntimeDataBinding.detail",
  "setCurrentRecord(freshRecord)",
];

for (const marker of runtimeRequired) {
  const lines = addContext(files.runtimePage, runtimePage, marker);
  add(
    "runtime-actionbar-execution",
    lines.length > 0 ? "OK" : "FAIL",
    "HIGH",
    `${marker} ${lines.length > 0 ? "present" : "missing"}`,
    files.runtimePage,
    lines.join(", ")
  );
}

const runtimeForbidden = [
  "runtimeActions.map",
  "workflowActions",
];

for (const marker of runtimeForbidden) {
  const lines = addContext(files.runtimePage, runtimePage, marker);
  add(
    "runtime-page-forbidden",
    lines.length === 0 ? "OK" : "FAIL",
    "HIGH",
    `${marker} ${lines.length === 0 ? "absent" : "still present"}`,
    files.runtimePage,
    lines.join(", ")
  );
}

const formForbidden = [
  "RuntimeActionEngine",
  "workflowActions",
  "workflowActions.map",
  "pendingWorkflowActionRef",
];

for (const marker of formForbidden) {
  const lines = addContext(files.form, form, marker);
  add(
    "form-forbidden",
    lines.length === 0 ? "OK" : "FAIL",
    "HIGH",
    `${marker} ${lines.length === 0 ? "absent" : "still present"}`,
    files.form,
    lines.join(", ")
  );
}

const actionBarRequired = [
  "action.href",
  "action.onClick",
  "disabled",
];

for (const marker of actionBarRequired) {
  const lines = addContext(files.actionBar, actionBar, marker);
  add(
    "actionbar-capability",
    lines.length > 0 ? "OK" : "FAIL",
    "HIGH",
    `${marker} ${lines.length > 0 ? "present" : "missing"}`,
    files.actionBar,
    lines.join(", ")
  );
}

/**
 * Module-level checks.
 */
for (const mod of priorityModules) {
  const modulePath = `src/runtime/modules/generated/${mod.key}/${mod.key}.module.ts`;
  const moduleSource = read(modulePath);
  const fallbackInCore = coreModules.includes(mod.key);

  if (!moduleSource && !fallbackInCore) {
    add(
      "module-file",
      "FAIL",
      "HIGH",
      `${mod.key} module definition not found in generated module nor coreModules`,
      modulePath
    );
    continue;
  }

  // Q2OP_I16C5_ACTION_FILE_AWARE_AUDIT
  // Some generated modules delegate their actions to a sibling *.actions.ts file.
  // The audit must inspect both the module definition and its action file,
  // otherwise it reports false missing actions for modules using actions: xxxActions.
  const actionFilePath = `src/runtime/modules/generated/${mod.key}/${mod.key}.actions.ts`;
  const actionFileSource = read(actionFilePath);

  // Q2OP_I16E2_LINE_TOTALS_EFFECT_AWARE_AUDIT
  // Some business effects are intentionally implemented outside module metadata:
  // - line totals are currently detectable through form/runtime line services/intervention totals fields.
  // The audit must read these runtime sources to avoid false positives while we progressively centralize logic.
  // Q2OP_I16F2_PAYMENT_HISTORY_EFFECT_AWARE_AUDIT
  // Some payment history effects are implemented through billing UI/runtime modules.
  // The audit must include these files to avoid false positives for encaissementsauto.
  const extraEffectSources =
    mod.key === "lignesinterventionauto"
      ? [
          read("src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx"),
          read("src/runtime/line-items/RuntimeLineRemovalService.ts"),
          read("src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts"),
        ]
      : mod.key === "encaissementsauto"
        ? [
            read("src/components/erp/billing/InvoicePaymentsHistory.tsx"),
            read("src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx"),
            read("src/runtime/modules/generated/facturesauto/facturesauto.module.ts"),
            read("src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts"),
          ]
        : [];

  const source = [moduleSource || coreModules, actionFileSource, ...extraEffectSources]
    .filter(Boolean)
    .join("\n");

  const sourceFile = moduleSource ? modulePath : files.coreModules;

  add(
    "module-file",
    "OK",
    "HIGH",
    `${mod.key} module definition found`,
    sourceFile
  );

  const hasActions =
    source.includes("actions") ||
    source.includes(".actions");

  add(
    "module-actions",
    hasActions ? "OK" : "WARN",
    hasActions ? "HIGH" : "MEDIUM",
    `${mod.key} actions declaration ${hasActions ? "found" : "not clearly found"}`,
    sourceFile,
    hasActions ? addContext(sourceFile, source, "actions", 3).join(", ") : ""
  );

  const hasWorkflow =
    source.includes("workflow") ||
    source.includes("workflows") ||
    source.includes("transitions") ||
    source.includes("states");

  add(
    "module-workflow",
    hasWorkflow ? "OK" : "WARN",
    "MEDIUM",
    `${mod.key} workflow/states/transitions markers ${hasWorkflow ? "found" : "not clearly found"}`,
    sourceFile,
    hasWorkflow ? addContext(sourceFile, source, "workflow", 2).join(", ") : ""
  );

  for (const expectedAction of mod.expectedActions) {
    const found =
      source.toLowerCase().includes(expectedAction.toLowerCase());

    add(
      "module-expected-action",
      found ? "OK" : "WARN",
      "MEDIUM",
      `${mod.key} expected action marker "${expectedAction}" ${found ? "found" : "not found"}`,
      sourceFile,
      found ? addContext(sourceFile, source, expectedAction, 2).join(", ") : ""
    );
  }

  for (const expectedEffect of mod.expectedEffects) {
    const foundInModule =
      source.toLowerCase().includes(expectedEffect.toLowerCase());

    const foundInRules =
      businessRules.toLowerCase().includes(expectedEffect.toLowerCase());

    const foundInEngine =
      actionEngine.toLowerCase().includes(expectedEffect.toLowerCase());

    const found =
      foundInModule || foundInRules || foundInEngine;

    add(
      "business-effect-marker",
      found ? "OK" : "WARN",
      "MEDIUM",
      `${mod.key} expected effect marker "${expectedEffect}" ${found ? "found" : "not found"} in module/rules/action engine`,
      foundInModule ? sourceFile : foundInRules ? files.businessRules : foundInEngine ? files.actionEngine : sourceFile
    );
  }
}

/**
 * RuntimeActionEngine generic checks.
 */
const engineMarkers = [
  "getAvailableActions",
  "execute",
  "runtimeOnly",
  "action.key",
  "record",
  "module",
];

for (const marker of engineMarkers) {
  const lines = addContext(files.actionEngine, actionEngine, marker);
  add(
    "runtime-action-engine",
    lines.length > 0 ? "OK" : "WARN",
    "MEDIUM",
    `RuntimeActionEngine marker "${marker}" ${lines.length > 0 ? "found" : "not found"}`,
    files.actionEngine,
    lines.join(", ")
  );
}

const ok = checks.filter((c) => c.status === "OK").length;
const info = checks.filter((c) => c.status === "INFO").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const warnHigh = checks.filter((c) => c.status === "WARN" && c.severity === "HIGH").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

const report = [];

report.push("# Q2-OP-I16-A — Audit fonctionnel des workflows métier prioritaires depuis ERPRuntimeActionBar");
report.push("");
report.push("Objectif : vérifier que les workflows/actions métier prioritaires peuvent être pilotés par `ERPRuntimeActionBar`, avec `ERPRuntimePage` comme orchestrateur d’exécution.");
report.push("");
report.push("## Résumé");
report.push("");
report.push(`- OK : ${ok}`);
report.push(`- INFO : ${info}`);
report.push(`- WARN : ${warn}`);
report.push(`- WARN HIGH : ${warnHigh}`);
report.push(`- FAIL : ${fail}`);
report.push(`- FAIL HIGH : ${failHigh}`);
report.push("");
report.push("## Modules prioritaires");
report.push("");
for (const mod of priorityModules) {
  report.push(`- \`${mod.key}\``);
}
report.push("");
report.push("## Checks");
report.push("");
report.push("| Area | Status | Severity | File | Lines | Message |");
report.push("|---|---:|---:|---|---|---|");
for (const check of checks) {
  report.push(
    `| ${check.area} | ${check.status} | ${check.severity} | ${check.file ? "`" + check.file + "`" : ""} | ${check.lines || ""} | ${check.message.replace(/\|/g, "/")} |`
  );
}

report.push("");
report.push("## Contextes utiles");
report.push("");

for (const ctx of contexts.slice(0, 100)) {
  report.push(`### ${ctx.title}`);
  report.push("");
  report.push("```tsx");
  report.push(ctx.body);
  report.push("```");
  report.push("");
}

report.push("## Conclusion");
report.push("");
if (failHigh > 0) {
  report.push("Audit non validé : il reste un blocage critique pour l’exécution ou la centralisation des actions runtime.");
} else if (warn > 0) {
  report.push("Architecture d’exécution validée, mais certains modules/actions/effets métier attendus ne sont pas encore suffisamment déclarés ou détectables.");
} else {
  report.push("Architecture et déclarations prioritaires validées sans réserve.");
}

report.push("");
report.push("## Prochaine passe recommandée");
report.push("");
report.push("- Si WARN sur actions manquantes : enrichir les modules générés concernés.");
report.push("- Si WARN sur effets métier manquants : brancher `RuntimeActionEngine` vers les services/règles runtime existants.");
report.push("- Puis tester manuellement les parcours : RDV confirmé → intervention, intervention terminée → facture, retirer ligne, réception stock validée.");

write("docs/audits/Q2-OP-I16-A-priority-workflows-actionbar-audit.md", report.join("\n"));

console.log("[Q2-OP-I16-A] Priority workflows from RuntimeActionBar audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[INFO]", info);
console.log("[WARN]", warn);
console.log("[WARN_HIGH]", warnHigh);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);
console.log("[REPORT] docs/audits/Q2-OP-I16-A-priority-workflows-actionbar-audit.md");
console.log("[IMPORTANT]");
for (const check of checks) {
  if (check.status === "WARN" || check.status === "FAIL") {
    console.log(
      `[${check.status}] [${check.severity}] [${check.area}] ${check.message}${check.file ? " :: " + check.file : ""}${check.lines ? " :: lines " + check.lines : ""}`
    );
  }
}
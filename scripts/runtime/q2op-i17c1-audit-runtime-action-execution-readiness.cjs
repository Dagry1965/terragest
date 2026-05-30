const fs = require("fs");
const path = require("path");

const root = process.cwd();

const actions = [
  {
    moduleKey: "rendezvous",
    actionKey: "reporter-rdv",
    risk: "MEDIUM",
    recommendation: "Ne pas exécuter sans scénario de report préparé.",
  },
  {
    moduleKey: "interventionsauto",
    actionKey: "demarrer-intervention",
    risk: "LOW",
    recommendation: "Action candidate pour premier test si l'intervention est une fiche de test.",
  },
  {
    moduleKey: "facturesauto",
    actionKey: "envoyer-facture",
    risk: "LOW",
    recommendation: "Action candidate si la facture est une fiche de test.",
  },
  {
    moduleKey: "facturesauto",
    actionKey: "annuler-facture",
    risk: "HIGH",
    recommendation: "Ne pas exécuter sur une facture réelle.",
  },
  {
    moduleKey: "commandesstockauto",
    actionKey: "envoyer-commande",
    risk: "LOW",
    recommendation: "Action candidate si commande de test.",
  },
  {
    moduleKey: "commandesstockauto",
    actionKey: "annuler-commande",
    risk: "HIGH",
    recommendation: "Ne pas exécuter sur une commande réelle.",
  },
  {
    moduleKey: "receptionsstockauto",
    actionKey: "valider-reception",
    risk: "HIGH",
    recommendation: "Ne pas exécuter sauf réception de test, car peut créer mouvement stock.",
  },
];

const files = {
  runtimePage: "src/components/erp/runtime/ERPRuntimePage.tsx",
  actionBar: "src/components/erp/runtime/ERPRuntimeActionBar.tsx",
  actionEngine: "src/runtime/actions/RuntimeActionEngine.ts",
};

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

const checks = [];

function add(area, status, severity, message, file = "", lines = "") {
  checks.push({ area, status, severity, message, file, lines });
}

for (const [name, file] of Object.entries(files)) {
  const source = read(file);
  add("file", source ? "OK" : "FAIL", "HIGH", `${file} ${source ? "found" : "missing"}`, file);
}

const runtimePage = read(files.runtimePage);
const actionBar = read(files.actionBar);
const actionEngine = read(files.actionEngine);

const requiredRuntimeMarkers = [
  "RuntimeActionEngine.execute",
  "handleRuntimeAction",
  "void handleRuntimeAction",
  "RuntimeDataBinding.detail",
  "setCurrentRecord(freshRecord)",
];

for (const marker of requiredRuntimeMarkers) {
  const lines = findLines(runtimePage, marker);
  add(
    "execution-chain",
    lines.length > 0 ? "OK" : "FAIL",
    "HIGH",
    `${marker} ${lines.length > 0 ? "found" : "missing"}`,
    files.runtimePage,
    lines.join(", ")
  );
}

for (const marker of ["action.onClick", "action.href", "disabled"]) {
  const lines = findLines(actionBar, marker);
  add(
    "actionbar-capability",
    lines.length > 0 ? "OK" : "FAIL",
    "HIGH",
    `${marker} ${lines.length > 0 ? "found" : "missing"}`,
    files.actionBar,
    lines.join(", ")
  );
}

for (const marker of ["getAvailableActions", "execute", "runtimeOnly"]) {
  const lines = findLines(actionEngine, marker);
  add(
    "engine-capability",
    lines.length > 0 ? "OK" : "WARN",
    "MEDIUM",
    `${marker} ${lines.length > 0 ? "found" : "not found"}`,
    files.actionEngine,
    lines.join(", ")
  );
}

for (const action of actions) {
  const moduleFile = `src/runtime/modules/generated/${action.moduleKey}/${action.moduleKey}.module.ts`;
  const actionsFile = `src/runtime/modules/generated/${action.moduleKey}/${action.moduleKey}.actions.ts`;

  const combined = [read(moduleFile), read(actionsFile)].filter(Boolean).join("\n");
  const found = combined.includes(action.actionKey);
  const runtimeOnly = combined.includes("runtimeOnly: true");

  add(
    "candidate-action",
    found ? "OK" : "WARN",
    found ? "LOW" : "HIGH",
    `${action.moduleKey}.${action.actionKey} ${found ? "found" : "missing"} risk=${action.risk}`,
    fs.existsSync(full(actionsFile)) ? actionsFile : moduleFile
  );

  add(
    "candidate-runtime-contract",
    runtimeOnly ? "OK" : "WARN",
    "MEDIUM",
    `${action.moduleKey}.${action.actionKey} runtimeOnly ${runtimeOnly ? "available in action source" : "not detected"}`,
    fs.existsSync(full(actionsFile)) ? actionsFile : moduleFile
  );
}

const ok = checks.filter((c) => c.status === "OK").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const warnHigh = checks.filter((c) => c.status === "WARN" && c.severity === "HIGH").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

const report = [];

report.push("# Q2-OP-I17-C1 — Préparation test d’exécution actions runtime");
report.push("");
report.push("Objectif : choisir une action runtime à exécuter sur fiche de test, en limitant les risques métier.");
report.push("");
report.push("## Résumé");
report.push("");
report.push(`- OK : ${ok}`);
report.push(`- WARN : ${warn}`);
report.push(`- WARN HIGH : ${warnHigh}`);
report.push(`- FAIL : ${fail}`);
report.push(`- FAIL HIGH : ${failHigh}`);
report.push("");
report.push("## Actions candidates");
report.push("");
report.push("| Module | Action | Risque | Recommandation |");
report.push("|---|---|---:|---|");
for (const action of actions) {
  report.push(`| ${action.moduleKey} | ${action.actionKey} | ${action.risk} | ${action.recommendation} |`);
}
report.push("");
report.push("## Premier test recommandé");
report.push("");
report.push("1. `interventionsauto.demarrer-intervention` sur une intervention de test, si disponible.");
report.push("2. Sinon `facturesauto.envoyer-facture` sur une facture de test.");
report.push("3. Sinon `commandesstockauto.envoyer-commande` sur une commande de test.");
report.push("");
report.push("Ne pas commencer par `receptionsstockauto.valider-reception`, car cette action peut impacter le stock.");
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

write("docs/audits/Q2-OP-I17-C1-runtime-action-execution-readiness.md", report.join("\n"));

console.log("[Q2-OP-I17-C1] Runtime action execution readiness audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[WARN]", warn);
console.log("[WARN_HIGH]", warnHigh);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);
console.log("[REPORT] docs/audits/Q2-OP-I17-C1-runtime-action-execution-readiness.md");
console.log("[IMPORTANT]");
for (const check of checks) {
  if (check.status === "WARN" || check.status === "FAIL") {
    console.log(
      `[${check.status}] [${check.severity}] [${check.area}] ${check.message}${check.file ? " :: " + check.file : ""}${check.lines ? " :: lines " + check.lines : ""}`
    );
  }
}
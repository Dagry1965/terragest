const fs = require("fs");
const path = require("path");

const root = process.cwd();

const priorityModules = [
  "rendezvous",
  "interventionsauto",
  "facturesauto",
  "commandesstockauto",
  "receptionsstockauto",
];

const files = {
  runtimePage: "src/components/erp/runtime/ERPRuntimePage.tsx",
  actionBar: "src/components/erp/runtime/ERPRuntimeActionBar.tsx",
  enterpriseForm: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  runtimeActionEngine: "src/runtime/actions/RuntimeActionEngine.ts",
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

function contextAround(content, lineNumber, before = 5, after = 10) {
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

const checks = [];
const contexts = [];

function add(area, status, severity, message, file = "", lines = "") {
  checks.push({ area, status, severity, message, file, lines });
}

function inspect(file, marker, area, expected = "present", severity = "HIGH") {
  const source = read(file);
  const lines = findLines(source, marker);

  const ok =
    expected === "present"
      ? lines.length > 0
      : lines.length === 0;

  add(
    area,
    ok ? "OK" : expected === "present" ? "FAIL" : "WARN",
    severity,
    `${marker} ${expected === "present" ? (lines.length > 0 ? "present" : "missing") : (lines.length === 0 ? "absent" : "still present")}`,
    file,
    lines.join(", ")
  );

  for (const line of lines.slice(0, 5)) {
    contexts.push({
      title: `${file} :: ${marker} :: line ${line}`,
      body: contextAround(source, line),
    });
  }
}

for (const [name, file] of Object.entries(files)) {
  const source = read(file);
  add("file", source ? "OK" : "FAIL", "HIGH", `${file} ${source ? "found" : "missing"}`, file);
}

/**
 * Runtime page must render centralized action bar and execute via runtime.
 */
inspect(files.runtimePage, "ERPRuntimeActionBar", "runtime-page-actionbar", "present", "HIGH");
inspect(files.runtimePage, 'data-runtime-action-bar-placement="runtime-page"', "runtime-page-actionbar", "present", "HIGH");
inspect(files.runtimePage, "RuntimeActionEngine.execute", "runtime-page-execution", "present", "HIGH");
inspect(files.runtimePage, "handleRuntimeAction", "runtime-page-execution", "present", "HIGH");
inspect(files.runtimePage, "void handleRuntimeAction", "runtime-page-execution", "present", "HIGH");
inspect(files.runtimePage, "RuntimeDataBinding.detail", "runtime-page-refresh", "present", "HIGH");
inspect(files.runtimePage, "setCurrentRecord(freshRecord)", "runtime-page-refresh", "present", "HIGH");

/**
 * Legacy rendering must be absent.
 */
inspect(files.runtimePage, "runtimeActions.map", "runtime-page-forbidden", "absent", "HIGH");
inspect(files.runtimePage, "handleRuntimeAction(action)", "runtime-page-forbidden", "absent", "HIGH");
inspect(files.enterpriseForm, "workflowActions", "form-forbidden", "absent", "HIGH");
inspect(files.enterpriseForm, "RuntimeActionEngine", "form-forbidden", "absent", "HIGH");
inspect(files.enterpriseForm, "workflowActions.map", "form-forbidden", "absent", "HIGH");

/**
 * Action bar capabilities.
 */
inspect(files.actionBar, "action.href", "actionbar-capability", "present", "HIGH");
inspect(files.actionBar, "action.onClick", "actionbar-capability", "present", "HIGH");
inspect(files.actionBar, "disabled", "actionbar-capability", "present", "MEDIUM");

/**
 * Runtime action engine.
 */
inspect(files.runtimeActionEngine, "getAvailableActions", "runtime-action-engine", "present", "HIGH");
inspect(files.runtimeActionEngine, "execute", "runtime-action-engine", "present", "HIGH");
inspect(files.runtimeActionEngine, "runtimeOnly", "runtime-action-engine", "present", "MEDIUM");

for (const moduleKey of priorityModules) {
  const moduleFile = `src/runtime/modules/generated/${moduleKey}/${moduleKey}.module.ts`;
  const actionsFile = `src/runtime/modules/generated/${moduleKey}/${moduleKey}.actions.ts`;

  const moduleSource = read(moduleFile);
  const actionsSource = read(actionsFile);
  const combined = [moduleSource, actionsSource].filter(Boolean).join("\n");

  add(
    "priority-module-file",
    moduleSource ? "OK" : "FAIL",
    "HIGH",
    `${moduleKey} module file ${moduleSource ? "found" : "missing"}`,
    moduleFile
  );

  add(
    "priority-actions-source",
    combined.includes("actions") ? "OK" : "WARN",
    "HIGH",
    `${moduleKey} actions source ${combined.includes("actions") ? "found" : "not clearly found"}`,
    actionsSource ? actionsFile : moduleFile
  );

  add(
    "priority-runtime-contract",
    combined.includes("runtimeOnly") ? "OK" : "WARN",
    "MEDIUM",
    `${moduleKey} runtimeOnly ${combined.includes("runtimeOnly") ? "found" : "not found"}`,
    actionsSource ? actionsFile : moduleFile
  );

  const expectedActionMarkers = {
    rendezvous: ["reporter-rdv"],
    interventionsauto: ["demarrer-intervention"],
    facturesauto: ["envoyer-facture", "annuler-facture"],
    commandesstockauto: ["envoyer-commande", "annuler-commande"],
    receptionsstockauto: ["valider-reception"],
  }[moduleKey] ?? [];

  for (const marker of expectedActionMarkers) {
    const found = combined.includes(marker);

    add(
      "priority-expected-action",
      found ? "OK" : "WARN",
      "HIGH",
      `${moduleKey} expected action ${marker} ${found ? "found" : "missing"}`,
      actionsSource ? actionsFile : moduleFile
    );
  }
}

/**
 * Route readiness check: generic app routes should exist.
 */
for (const moduleKey of priorityModules) {
  const routeCandidates = [
    `src/app/(private)/${moduleKey}/page.tsx`,
    `src/app/(private)/${moduleKey}/[id]/page.tsx`,
    `src/app/(private)/${moduleKey}/[id]/edit/page.tsx`,
  ];

  for (const route of routeCandidates) {
    add(
      "route-readiness",
      fs.existsSync(full(route)) ? "OK" : "WARN",
      "LOW",
      `${route} ${fs.existsSync(full(route)) ? "found" : "missing"}`,
      route
    );
  }
}

const ok = checks.filter((c) => c.status === "OK").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const warnHigh = checks.filter((c) => c.status === "WARN" && c.severity === "HIGH").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

const report = [];

report.push("# Q2-OP-I17-A — Audit UI readiness des actions runtime sur fiches réelles");
report.push("");
report.push("Objectif : vérifier que les actions métier prioritaires peuvent être rendues et exécutées depuis `ERPRuntimeActionBar`, sans rendu legacy ni workflow dans le formulaire.");
report.push("");
report.push("## Résumé");
report.push("");
report.push(`- OK : ${ok}`);
report.push(`- WARN : ${warn}`);
report.push(`- WARN HIGH : ${warnHigh}`);
report.push(`- FAIL : ${fail}`);
report.push(`- FAIL HIGH : ${failHigh}`);
report.push("");
report.push("## Modules prioritaires");
report.push("");
for (const moduleKey of priorityModules) {
  report.push(`- \`${moduleKey}\``);
}
report.push("");
report.push("## Routes à tester manuellement");
report.push("");
for (const moduleKey of priorityModules) {
  report.push(`- http://localhost:3000/${moduleKey}`);
  report.push(`- http://localhost:3000/${moduleKey}/[id]`);
  report.push(`- http://localhost:3000/${moduleKey}/[id]/edit`);
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

for (const ctx of contexts.slice(0, 80)) {
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
  report.push("Audit non validé : il reste un blocage critique dans le rendu ou l’exécution centralisée des actions runtime.");
} else if (warnHigh > 0) {
  report.push("Audit structurel validé sans FAIL, mais certains modules/actions prioritaires doivent être vérifiés manuellement.");
} else {
  report.push("Audit structurel validé : l’UI runtime est prête pour les tests manuels sur fiches réelles.");
}

write("docs/audits/Q2-OP-I17-A-runtime-actions-ui-readiness-audit.md", report.join("\n"));

console.log("[Q2-OP-I17-A] Runtime actions UI readiness audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[WARN]", warn);
console.log("[WARN_HIGH]", warnHigh);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);
console.log("[REPORT] docs/audits/Q2-OP-I17-A-runtime-actions-ui-readiness-audit.md");
console.log("[IMPORTANT]");
for (const check of checks) {
  if (check.status === "WARN" || check.status === "FAIL") {
    console.log(
      `[${check.status}] [${check.severity}] [${check.area}] ${check.message}${check.file ? " :: " + check.file : ""}${check.lines ? " :: lines " + check.lines : ""}`
    );
  }
}
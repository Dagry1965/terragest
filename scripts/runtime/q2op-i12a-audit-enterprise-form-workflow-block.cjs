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

function contextAround(content, lineNumber, before = 12, after = 18) {
  const lines = content.split(/\r?\n/);
  const start = Math.max(0, lineNumber - before - 1);
  const end = Math.min(lines.length, lineNumber + after);

  return lines
    .slice(start, end)
    .map((line, index) => {
      const actual = start + index + 1;
      return `${String(actual).padStart(4, " ")}: ${line}`;
    })
    .join("\n");
}

function count(content, pattern) {
  const matches = content.match(pattern);
  return matches ? matches.length : 0;
}

const files = {
  form: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  runtimePage: "src/components/erp/runtime/ERPRuntimePage.tsx",
  actionBar: "src/components/erp/runtime/ERPRuntimeActionBar.tsx",
};

const form = read(files.form);
const runtimePage = read(files.runtimePage);
const actionBar = read(files.actionBar);

const checks = [];
const contexts = [];

function add(area, status, severity, message, file = "", lines = "") {
  checks.push({ area, status, severity, message, file, lines });
}

if (!form) {
  add("file", "FAIL", "HIGH", "ERPEnterpriseForm missing", files.form);
} else {
  add("file", "OK", "HIGH", "ERPEnterpriseForm found", files.form);
}

if (!runtimePage) {
  add("file", "FAIL", "HIGH", "ERPRuntimePage missing", files.runtimePage);
} else {
  add("file", "OK", "HIGH", "ERPRuntimePage found", files.runtimePage);
}

if (!actionBar) {
  add("file", "FAIL", "HIGH", "ERPRuntimeActionBar missing", files.actionBar);
} else {
  add("file", "OK", "HIGH", "ERPRuntimeActionBar found", files.actionBar);
}

const markers = [
  "workflowActions",
  "workflowActions.map",
  "RuntimeActionEngine",
  "handleWorkflow",
  "handleRuntimeAction",
  "executeAction",
  "onClick",
  "type=\"button\"",
];

for (const marker of markers) {
  const regex = new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
  const matches = [...form.matchAll(regex)];
  const lines = matches.map((match) => lineNumberAt(form, match.index ?? 0));

  if (matches.length > 0) {
    add(
      "form-marker",
      "WARN",
      marker === "workflowActions.map" || marker === "RuntimeActionEngine" ? "HIGH" : "MEDIUM",
      `${marker} found ${matches.length} time(s)`,
      files.form,
      lines.join(", ")
    );

    for (const line of lines.slice(0, 8)) {
      contexts.push({
        title: `${files.form} :: ${marker} :: line ${line}`,
        body: contextAround(form, line),
      });
    }
  } else {
    add("form-marker", "OK", "MEDIUM", `${marker} not found`, files.form);
  }
}

const runtimePageChecks = [
  "ERPRuntimeActionBar",
  "mapRuntimeActionsToActionBarActions",
  "workflowActions={",
  "workflowActions=",
  "runtimeActions",
];

for (const marker of runtimePageChecks) {
  const regex = new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
  const matches = [...runtimePage.matchAll(regex)];
  const lines = matches.map((match) => lineNumberAt(runtimePage, match.index ?? 0));

  if (matches.length > 0) {
    add(
      "runtime-page-marker",
      marker.includes("workflowActions") ? "WARN" : "OK",
      marker.includes("workflowActions") ? "HIGH" : "MEDIUM",
      `${marker} found ${matches.length} time(s)`,
      files.runtimePage,
      lines.join(", ")
    );

    for (const line of lines.slice(0, 6)) {
      contexts.push({
        title: `${files.runtimePage} :: ${marker} :: line ${line}`,
        body: contextAround(runtimePage, line),
      });
    }
  } else {
    add(
      "runtime-page-marker",
      marker.includes("workflowActions") ? "OK" : "WARN",
      marker.includes("workflowActions") ? "HIGH" : "MEDIUM",
      `${marker} not found`,
      files.runtimePage
    );
  }
}

const actionBarHasOnClick = actionBar.includes("onClick={action.onClick}");
const actionBarCanRenderHref = actionBar.includes("action.href");

if (actionBarHasOnClick) {
  add("action-bar-capability", "OK", "HIGH", "ERPRuntimeActionBar can render onClick actions", files.actionBar);
} else {
  add("action-bar-capability", "WARN", "HIGH", "ERPRuntimeActionBar cannot render onClick actions", files.actionBar);
}

if (actionBarCanRenderHref) {
  add("action-bar-capability", "OK", "HIGH", "ERPRuntimeActionBar can render href actions", files.actionBar);
} else {
  add("action-bar-capability", "WARN", "HIGH", "ERPRuntimeActionBar cannot render href actions", files.actionBar);
}

const workflowMapCount = count(form, /workflowActions\.map/g);
const runtimeEngineCount = count(form, /RuntimeActionEngine/g);
const pagePassCount = count(runtimePage, /workflowActions=/g);

if (workflowMapCount > 0 && pagePassCount > 0) {
  add(
    "decision",
    "WARN",
    "HIGH",
    "Extraction still required: form renders workflowActions and runtime page still passes workflowActions",
    `${files.form} / ${files.runtimePage}`
  );
}

const ok = checks.filter((c) => c.status === "OK").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const warnHigh = checks.filter((c) => c.status === "WARN" && c.severity === "HIGH").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

const report = [];

report.push("# Q2-OP-I12-A — Audit du bloc workflow dans ERPEnterpriseForm");
report.push("");
report.push("Objectif : identifier précisément ce qui doit être déplacé du formulaire vers la barre d’actions runtime.");
report.push("");
report.push("## Résumé");
report.push("");
report.push(`- OK : ${ok}`);
report.push(`- WARN : ${warn}`);
report.push(`- WARN HIGH : ${warnHigh}`);
report.push(`- FAIL : ${fail}`);
report.push(`- FAIL HIGH : ${failHigh}`);
report.push("");
report.push("## Doctrine");
report.push("");
report.push("- `ERPEnterpriseForm` doit conserver le submit et les champs.");
report.push("- `ERPEnterpriseForm` ne doit plus rendre les boutons workflow.");
report.push("- `ERPRuntimePage` doit donner les actions à `ERPRuntimeActionBar`.");
report.push("- `ERPRuntimeActionBar` doit savoir afficher href et onClick.");
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
report.push("## Contextes");
report.push("");

for (const ctx of contexts.slice(0, 60)) {
  report.push(`### ${ctx.title}`);
  report.push("");
  report.push("```tsx");
  report.push(ctx.body);
  report.push("```");
  report.push("");
}

report.push("## Décision pour I12-B");
report.push("");
report.push("La prochaine passe doit :");
report.push("");
report.push("1. Construire dans `ERPRuntimePage` des actions avec `onClick` si l’action n’a pas de `href`.");
report.push("2. Afficher ces actions dans `ERPRuntimeActionBar`.");
report.push("3. Ne plus passer `workflowActions` au formulaire.");
report.push("4. Garder le bouton submit du formulaire.");
report.push("5. Ne pas supprimer les handlers métier tant que l’action bar ne les remplace pas.");

write("docs/audits/Q2-OP-I12-A-enterprise-form-workflow-block-audit.md", report.join("\n"));

console.log("[Q2-OP-I12-A] Enterprise form workflow block audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[WARN]", warn);
console.log("[WARN_HIGH]", warnHigh);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);
console.log("[REPORT] docs/audits/Q2-OP-I12-A-enterprise-form-workflow-block-audit.md");
console.log("[IMPORTANT]");
for (const check of checks) {
  if (check.status === "WARN" || check.status === "FAIL") {
    console.log(
      `[${check.status}] [${check.severity}] [${check.area}] ${check.message}${check.file ? " :: " + check.file : ""}${check.lines ? " :: lines " + check.lines : ""}`
    );
  }
}
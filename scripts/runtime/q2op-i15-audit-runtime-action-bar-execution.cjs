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

const files = {
  runtimePage: "src/components/erp/runtime/ERPRuntimePage.tsx",
  actionBar: "src/components/erp/runtime/ERPRuntimeActionBar.tsx",
  form: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
};

const runtimePage = read(files.runtimePage);
const actionBar = read(files.actionBar);
const form = read(files.form);

const checks = [];
const contexts = [];

function add(area, status, severity, message, file = "", lines = "") {
  checks.push({ area, status, severity, message, file, lines });
}

function inspect(file, content, marker, area, expected = "present", severity = "HIGH") {
  const lines = findLines(content, marker);

  if (expected === "present") {
    add(
      area,
      lines.length > 0 ? "OK" : "FAIL",
      severity,
      `${marker} ${lines.length > 0 ? "present" : "missing"}`,
      file,
      lines.join(", ")
    );
  } else {
    add(
      area,
      lines.length === 0 ? "OK" : "FAIL",
      severity,
      `${marker} ${lines.length === 0 ? "absent" : "still present"}`,
      file,
      lines.join(", ")
    );
  }

  for (const line of lines.slice(0, 5)) {
    contexts.push({
      title: `${file} :: ${marker} :: line ${line}`,
      body: contextAround(content, line),
    });
  }
}

for (const [key, file] of Object.entries(files)) {
  add("file", read(file) ? "OK" : "FAIL", "HIGH", `${file} ${read(file) ? "found" : "missing"}`, file);
}

/**
 * Runtime page must own action execution.
 */
inspect(files.runtimePage, runtimePage, "RuntimeActionEngine.execute", "runtime-page-execution", "present", "HIGH");
inspect(files.runtimePage, runtimePage, "handleRuntimeAction", "runtime-page-execution", "present", "HIGH");
inspect(files.runtimePage, runtimePage, "RuntimeDataBinding.detail", "runtime-page-refresh", "present", "HIGH");
inspect(files.runtimePage, runtimePage, "setCurrentRecord(freshRecord)", "runtime-page-refresh", "present", "HIGH");

/**
 * Runtime page must render only action bar, not legacy direct buttons.
 */
inspect(files.runtimePage, runtimePage, "ERPRuntimeActionBar", "runtime-page-render", "present", "HIGH");
inspect(files.runtimePage, runtimePage, 'data-runtime-action-bar-placement="runtime-page"', "runtime-page-render", "present", "HIGH");
inspect(files.runtimePage, runtimePage, "runtimeActions.map", "runtime-page-forbidden", "absent", "HIGH");
inspect(files.runtimePage, runtimePage, "handleRuntimeAction(action)", "runtime-page-forbidden", "absent", "HIGH");

/**
 * ActionBar must support href and onClick.
 */
inspect(files.actionBar, actionBar, "action.href", "action-bar-capability", "present", "HIGH");
inspect(files.actionBar, actionBar, "action.onClick", "action-bar-capability", "present", "HIGH");
inspect(files.actionBar, actionBar, "disabled", "action-bar-capability", "present", "MEDIUM");

/**
 * Mapper must pass onClick for non-href actions.
 */
inspect(files.runtimePage, runtimePage, "onClick", "runtime-page-mapper", "present", "HIGH");
inspect(files.runtimePage, runtimePage, "void handleRuntimeAction", "runtime-page-mapper", "present", "HIGH");

/**
 * Form must not own workflow execution anymore.
 */
inspect(files.form, form, "RuntimeActionEngine", "form-forbidden", "absent", "HIGH");
inspect(files.form, form, "workflowActions", "form-forbidden", "absent", "HIGH");
inspect(files.form, form, "workflowActions.map", "form-forbidden", "absent", "HIGH");
inspect(files.form, form, "pendingWorkflowActionRef", "form-forbidden", "absent", "HIGH");

const ok = checks.filter((c) => c.status === "OK").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;
const warnHigh = checks.filter((c) => c.status === "WARN" && c.severity === "HIGH").length;

const report = [];

report.push("# Q2-OP-I15 — Audit exécution des actions depuis ERPRuntimeActionBar");
report.push("");
report.push("Objectif : vérifier que les actions métier sont affichées uniquement via `ERPRuntimeActionBar` et exécutées par `ERPRuntimePage` via `RuntimeActionEngine`.");
report.push("");
report.push("## Résumé");
report.push("");
report.push(`- OK : ${ok}`);
report.push(`- WARN : ${warn}`);
report.push(`- WARN HIGH : ${warnHigh}`);
report.push(`- FAIL : ${fail}`);
report.push(`- FAIL HIGH : ${failHigh}`);
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

for (const ctx of contexts.slice(0, 60)) {
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
  report.push("L’exécution des actions runtime via `ERPRuntimeActionBar` n’est pas encore validée.");
} else {
  report.push("L’architecture cible est validée : `ERPEnterpriseForm` ne porte plus les workflows, `ERPRuntimePage` orchestre l’exécution, et `ERPRuntimeActionBar` rend les actions.");
}

write("docs/audits/Q2-OP-I15-runtime-action-bar-execution-audit.md", report.join("\n"));

console.log("[Q2-OP-I15] Runtime action bar execution audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[WARN]", warn);
console.log("[WARN_HIGH]", warnHigh);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);
console.log("[REPORT] docs/audits/Q2-OP-I15-runtime-action-bar-execution-audit.md");
console.log("[IMPORTANT]");
for (const check of checks) {
  if (check.status === "WARN" || check.status === "FAIL") {
    console.log(
      `[${check.status}] [${check.severity}] [${check.area}] ${check.message}${check.file ? " :: " + check.file : ""}${check.lines ? " :: lines " + check.lines : ""}`
    );
  }
}
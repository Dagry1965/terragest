const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targets = [
  {
    key: "rendezvous",
    moduleFile: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
    actionsFile: "src/runtime/modules/generated/rendezvous/rendezvous.actions.ts",
    actionsIdentifier: "rendezvousActions",
    expectedActionKey: "reporter-rdv",
    expectedActionLabel: "Reporter RDV",
  },
  {
    key: "interventionsauto",
    moduleFile: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
    actionsFile: "src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts",
    actionsIdentifier: "interventionsautoActions",
    expectedActionKey: "demarrer-intervention",
    expectedActionLabel: "Demarrer intervention",
  },
];

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

for (const target of targets) {
  const moduleSource = read(target.moduleFile);
  const actionsSource = read(target.actionsFile);

  add(
    "module-file",
    moduleSource ? "OK" : "FAIL",
    "HIGH",
    `${target.key} module file ${moduleSource ? "found" : "missing"}`,
    target.moduleFile
  );

  add(
    "actions-file",
    actionsSource ? "OK" : "FAIL",
    "HIGH",
    `${target.key} actions file ${actionsSource ? "found" : "missing"}`,
    target.actionsFile
  );

  const moduleIdentifierLines = findLines(moduleSource, `actions: ${target.actionsIdentifier}`);
  add(
    "module-actions-binding",
    moduleIdentifierLines.length > 0 ? "OK" : "WARN",
    "HIGH",
    `${target.key} module binding actions: ${target.actionsIdentifier} ${moduleIdentifierLines.length > 0 ? "found" : "missing"}`,
    target.moduleFile,
    moduleIdentifierLines.join(", ")
  );

  const inlineActionsLines = findLines(moduleSource, "actions: [");
  add(
    "module-inline-actions",
    inlineActionsLines.length === 0 ? "OK" : "WARN",
    "MEDIUM",
    `${target.key} inline actions block in module ${inlineActionsLines.length === 0 ? "absent" : "still present"}`,
    target.moduleFile,
    inlineActionsLines.join(", ")
  );

  const actionKeyLines = findLines(actionsSource, target.expectedActionKey);
  add(
    "actions-file-expected-key",
    actionKeyLines.length > 0 ? "OK" : "WARN",
    "MEDIUM",
    `${target.key} action key ${target.expectedActionKey} ${actionKeyLines.length > 0 ? "found" : "missing"} in actions file`,
    target.actionsFile,
    actionKeyLines.join(", ")
  );

  const actionLabelLines = findLines(actionsSource, target.expectedActionLabel);
  add(
    "actions-file-expected-label",
    actionLabelLines.length > 0 ? "OK" : "WARN",
    "LOW",
    `${target.key} action label ${target.expectedActionLabel} ${actionLabelLines.length > 0 ? "found" : "missing"} in actions file`,
    target.actionsFile,
    actionLabelLines.join(", ")
  );

  const runtimeOnlyLines = findLines(actionsSource, "runtimeOnly: true");
  add(
    "actions-file-runtime-contract",
    runtimeOnlyLines.length > 0 ? "OK" : "WARN",
    "MEDIUM",
    `${target.key} runtimeOnly marker ${runtimeOnlyLines.length > 0 ? "found" : "missing"} in actions file`,
    target.actionsFile,
    runtimeOnlyLines.join(", ")
  );

  const unsupported = ["description:", "visibleWhen:"];
  for (const marker of unsupported) {
    const lines = findLines(actionsSource, marker);
    add(
      "actions-file-type-contract",
      lines.length === 0 ? "OK" : "WARN",
      "MEDIUM",
      `${target.key} unsupported marker ${marker} ${lines.length === 0 ? "absent" : "present"} in actions file`,
      target.actionsFile,
      lines.join(", ")
    );
  }
}

const ok = checks.filter((c) => c.status === "OK").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const warnHigh = checks.filter((c) => c.status === "WARN" && c.severity === "HIGH").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

const report = [];

report.push("# Q2-OP-I16-C3 — Audit fichiers actions rendezvous / interventionsauto");
report.push("");
report.push("Objectif : vérifier si les actions manquantes sont dans les fichiers `*.actions.ts` plutôt que dans les fichiers `*.module.ts`.");
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

write("docs/audits/Q2-OP-I16-C3-rdv-intervention-action-files-audit.md", report.join("\n"));

console.log("[Q2-OP-I16-C3] Rendezvous/interventions action files audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[WARN]", warn);
console.log("[WARN_HIGH]", warnHigh);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);
console.log("[REPORT] docs/audits/Q2-OP-I16-C3-rdv-intervention-action-files-audit.md");
console.log("[IMPORTANT]");
for (const check of checks) {
  if (check.status === "WARN" || check.status === "FAIL") {
    console.log(
      `[${check.status}] [${check.severity}] [${check.area}] ${check.message}${check.file ? " :: " + check.file : ""}${check.lines ? " :: lines " + check.lines : ""}`
    );
  }
}
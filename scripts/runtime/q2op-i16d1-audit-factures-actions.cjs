const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = {
  key: "facturesauto",
  moduleFile: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  actionsFile: "src/runtime/modules/generated/facturesauto/facturesauto.actions.ts",
  actionsIdentifier: "facturesautoActions",
  expectedActions: [
    {
      key: "envoyer-facture",
      label: "Envoyer facture",
    },
    {
      key: "annuler-facture",
      label: "Annuler facture",
    },
  ],
  expectedStatus: [
    "brouillon",
    "envoyee",
    "annulee",
    "payee",
    "partiellement_payee",
  ],
  expectedFields: [
    "statutFacture",
    "montantTTC",
    "montantPaye",
    "resteAPayer",
    "clientId",
    "vehiculeId",
  ],
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

function contextAround(content, lineNumber, before = 6, after = 12) {
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

const moduleSource = read(target.moduleFile);
const actionsSource = read(target.actionsFile);
const combinedSource = [moduleSource, actionsSource].filter(Boolean).join("\n");

const checks = [];
const contexts = [];

function add(area, status, severity, message, file = "", lines = "") {
  checks.push({ area, status, severity, message, file, lines });
}

function addContext(file, source, marker) {
  const lines = findLines(source, marker);

  for (const line of lines.slice(0, 5)) {
    contexts.push({
      title: `${file} :: ${marker} :: line ${line}`,
      body: contextAround(source, line),
    });
  }

  return lines;
}

add(
  "module-file",
  moduleSource ? "OK" : "FAIL",
  "HIGH",
  `facturesauto module file ${moduleSource ? "found" : "missing"}`,
  target.moduleFile
);

add(
  "actions-file",
  actionsSource ? "OK" : "WARN",
  "MEDIUM",
  `facturesauto actions file ${actionsSource ? "found" : "missing"}`,
  target.actionsFile
);

const bindingLines = addContext(
  target.moduleFile,
  moduleSource,
  `actions: ${target.actionsIdentifier}`
);

add(
  "module-actions-binding",
  bindingLines.length > 0 ? "OK" : "WARN",
  "HIGH",
  `facturesauto module binding actions: ${target.actionsIdentifier} ${bindingLines.length > 0 ? "found" : "missing"}`,
  target.moduleFile,
  bindingLines.join(", ")
);

const inlineActionLines = addContext(target.moduleFile, moduleSource, "actions: [");

add(
  "module-inline-actions",
  inlineActionLines.length === 0 ? "OK" : "WARN",
  "MEDIUM",
  `facturesauto inline actions block ${inlineActionLines.length === 0 ? "absent" : "present"}`,
  target.moduleFile,
  inlineActionLines.join(", ")
);

for (const action of target.expectedActions) {
  const keyLines = addContext(
    actionsSource ? target.actionsFile : target.moduleFile,
    actionsSource || moduleSource,
    action.key
  );

  add(
    "expected-action-key",
    keyLines.length > 0 ? "OK" : "WARN",
    "MEDIUM",
    `facturesauto expected action key ${action.key} ${keyLines.length > 0 ? "found" : "missing"}`,
    actionsSource ? target.actionsFile : target.moduleFile,
    keyLines.join(", ")
  );

  const labelLines = addContext(
    actionsSource ? target.actionsFile : target.moduleFile,
    actionsSource || moduleSource,
    action.label
  );

  add(
    "expected-action-label",
    labelLines.length > 0 ? "OK" : "WARN",
    "LOW",
    `facturesauto expected action label "${action.label}" ${labelLines.length > 0 ? "found" : "missing"}`,
    actionsSource ? target.actionsFile : target.moduleFile,
    labelLines.join(", ")
  );
}

const runtimeOnlyLines = addContext(
  actionsSource ? target.actionsFile : target.moduleFile,
  actionsSource || moduleSource,
  "runtimeOnly: true"
);

add(
  "runtime-action-contract",
  runtimeOnlyLines.length > 0 ? "OK" : "WARN",
  "MEDIUM",
  `facturesauto runtimeOnly marker ${runtimeOnlyLines.length > 0 ? "found" : "missing"}`,
  actionsSource ? target.actionsFile : target.moduleFile,
  runtimeOnlyLines.join(", ")
);

for (const marker of ["description:", "visibleWhen:"]) {
  const lines = addContext(
    actionsSource ? target.actionsFile : target.moduleFile,
    actionsSource || moduleSource,
    marker
  );

  add(
    "action-type-contract",
    lines.length === 0 ? "OK" : "WARN",
    "MEDIUM",
    `facturesauto unsupported marker ${marker} ${lines.length === 0 ? "absent" : "present"} in actions file/module`,
    actionsSource ? target.actionsFile : target.moduleFile,
    lines.join(", ")
  );
}

for (const status of target.expectedStatus) {
  const lines = addContext(target.moduleFile, moduleSource, status);

  add(
    "expected-status",
    lines.length > 0 ? "OK" : "WARN",
    "LOW",
    `facturesauto status marker ${status} ${lines.length > 0 ? "found" : "missing"}`,
    target.moduleFile,
    lines.join(", ")
  );
}

for (const field of target.expectedFields) {
  const lines = addContext(target.moduleFile, moduleSource, field);

  add(
    "expected-field",
    lines.length > 0 ? "OK" : "WARN",
    "LOW",
    `facturesauto field marker ${field} ${lines.length > 0 ? "found" : "missing"}`,
    target.moduleFile,
    lines.join(", ")
  );
}

const ok = checks.filter((c) => c.status === "OK").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const warnHigh = checks.filter((c) => c.status === "WARN" && c.severity === "HIGH").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

const report = [];

report.push("# Q2-OP-I16-D1 — Audit actions facturesauto");
report.push("");
report.push("Objectif : vérifier précisément les actions runtime `envoyer-facture` et `annuler-facture` dans `facturesauto`, en lisant module + fichier actions.");
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

for (const ctx of contexts.slice(0, 80)) {
  report.push(`### ${ctx.title}`);
  report.push("");
  report.push("```ts");
  report.push(ctx.body);
  report.push("```");
  report.push("");
}

report.push("## Prochaine passe");
report.push("");
report.push("- Si `facturesauto.actions.ts` existe : ajouter les actions dans ce fichier.");
report.push("- Si le module n'utilise pas de fichier actions : ajouter les actions au niveau racine du module.");
report.push("- Ne pas toucher au formulaire.");
report.push("- Ne pas utiliser `description` ou `visibleWhen` tant que `ERPModuleAction` ne les type pas.");

write("docs/audits/Q2-OP-I16-D1-factures-actions-audit.md", report.join("\n"));

console.log("[Q2-OP-I16-D1] Factures actions audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[WARN]", warn);
console.log("[WARN_HIGH]", warnHigh);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);
console.log("[REPORT] docs/audits/Q2-OP-I16-D1-factures-actions-audit.md");
console.log("[IMPORTANT]");
for (const check of checks) {
  if (check.status === "WARN" || check.status === "FAIL") {
    console.log(
      `[${check.status}] [${check.severity}] [${check.area}] ${check.message}${check.file ? " :: " + check.file : ""}${check.lines ? " :: lines " + check.lines : ""}`
    );
  }
}
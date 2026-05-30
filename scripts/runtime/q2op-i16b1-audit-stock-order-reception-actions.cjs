const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targets = [
  {
    key: "receptionsstockauto",
    file: "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts",
    expectedActions: ["valider-reception"],
    expectedLabels: ["Valider réception", "Valider reception"],
    expectedStatus: ["brouillon", "validee"],
    expectedFields: ["mouvementStockId", "statut", "quantiteRecue", "stockId", "produitId"],
  },
  {
    key: "commandesstockauto",
    file: "src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts",
    expectedActions: ["envoyer-commande", "annuler-commande"],
    expectedLabels: ["Envoyer commande", "Annuler commande"],
    expectedStatus: ["brouillon", "envoyee", "annulee"],
    expectedFields: ["fournisseurId", "statut", "montantHT", "montantTTC"],
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

for (const target of targets) {
  const source = read(target.file);

  if (!source) {
    add("module-file", "FAIL", "HIGH", `${target.key} module file missing`, target.file);
    continue;
  }

  add("module-file", "OK", "HIGH", `${target.key} module file found`, target.file);

  const actionLines = addContext(target.file, source, "actions");
  add(
    "actions-block",
    actionLines.length > 0 ? "OK" : "WARN",
    actionLines.length > 0 ? "HIGH" : "MEDIUM",
    `${target.key} actions block ${actionLines.length > 0 ? "found" : "not found"}`,
    target.file,
    actionLines.join(", ")
  );

  for (const actionKey of target.expectedActions) {
    const lines = addContext(target.file, source, actionKey);
    add(
      "expected-action-key",
      lines.length > 0 ? "OK" : "WARN",
      "MEDIUM",
      `${target.key} expected action key ${actionKey} ${lines.length > 0 ? "found" : "missing"}`,
      target.file,
      lines.join(", ")
    );
  }

  for (const label of target.expectedLabels) {
    const lines = addContext(target.file, source, label);
    add(
      "expected-action-label",
      lines.length > 0 ? "OK" : "WARN",
      "LOW",
      `${target.key} expected action label "${label}" ${lines.length > 0 ? "found" : "missing"}`,
      target.file,
      lines.join(", ")
    );
  }

  for (const status of target.expectedStatus) {
    const lines = addContext(target.file, source, status);
    add(
      "expected-status",
      lines.length > 0 ? "OK" : "WARN",
      "LOW",
      `${target.key} status marker ${status} ${lines.length > 0 ? "found" : "missing"}`,
      target.file,
      lines.join(", ")
    );
  }

  for (const field of target.expectedFields) {
    const lines = addContext(target.file, source, field);
    add(
      "expected-field",
      lines.length > 0 ? "OK" : "WARN",
      "LOW",
      `${target.key} field marker ${field} ${lines.length > 0 ? "found" : "missing"}`,
      target.file,
      lines.join(", ")
    );
  }

  const runtimeOnlyLines = addContext(target.file, source, "runtimeOnly");
  add(
    "runtime-action-contract",
    runtimeOnlyLines.length > 0 ? "OK" : "WARN",
    "MEDIUM",
    `${target.key} runtimeOnly marker ${runtimeOnlyLines.length > 0 ? "found" : "not found"}`,
    target.file,
    runtimeOnlyLines.join(", ")
  );

  const typeLines = addContext(target.file, source, "type:");
  add(
    "action-type-contract",
    typeLines.length > 0 ? "OK" : "WARN",
    "LOW",
    `${target.key} action/type markers ${typeLines.length > 0 ? "found" : "not found"}`,
    target.file,
    typeLines.join(", ")
  );
}

const ok = checks.filter((c) => c.status === "OK").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const warnHigh = checks.filter((c) => c.status === "WARN" && c.severity === "HIGH").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

const report = [];

report.push("# Q2-OP-I16-B1 — Audit actions commandes/réceptions stock");
report.push("");
report.push("Objectif : vérifier précisément les actions runtime manquantes dans `commandesstockauto` et `receptionsstockauto` avant enrichissement metadata.");
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
report.push("- Ajouter `actions` metadata dans `receptionsstockauto` si absentes.");
report.push("- Ajouter `actions` metadata dans `commandesstockauto` si absentes.");
report.push("- Ne pas toucher aux formulaires.");
report.push("- Ne pas ajouter de logique locale page par page.");

write("docs/audits/Q2-OP-I16-B1-stock-order-reception-actions-audit.md", report.join("\n"));

console.log("[Q2-OP-I16-B1] Stock order/reception actions audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[WARN]", warn);
console.log("[WARN_HIGH]", warnHigh);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);
console.log("[REPORT] docs/audits/Q2-OP-I16-B1-stock-order-reception-actions-audit.md");
console.log("[IMPORTANT]");
for (const check of checks) {
  if (check.status === "WARN" || check.status === "FAIL") {
    console.log(
      `[${check.status}] [${check.severity}] [${check.area}] ${check.message}${check.file ? " :: " + check.file : ""}${check.lines ? " :: lines " + check.lines : ""}`
    );
  }
}
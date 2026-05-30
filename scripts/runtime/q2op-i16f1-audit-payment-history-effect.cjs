const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  encaissementModule: "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
  encaissementActions: "src/runtime/modules/generated/encaissementsauto/encaissementsauto.actions.ts",
  factureModule: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  factureActions: "src/runtime/modules/generated/facturesauto/facturesauto.actions.ts",
  invoicePaymentsHistory: "src/components/erp/billing/InvoicePaymentsHistory.tsx",
  form: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  runtimeBusinessRules: "src/runtime/business-rules/runtimeBusinessRules.ts",
  actionEngine: "src/runtime/actions/RuntimeActionEngine.ts",
  runtimePage: "src/components/erp/runtime/ERPRuntimePage.tsx",
};

const markerGroups = [
  {
    area: "encaissement-module",
    file: files.encaissementModule,
    markers: ["factureId", "montant", "datePaiement", "statut", "valide"],
    severity: "LOW",
  },
  {
    area: "facture-payment-fields",
    file: files.factureModule,
    markers: ["montantPaye", "resteAPayer", "statutFacture", "encaissementsauto"],
    severity: "MEDIUM",
  },
  {
    area: "payment-history-component",
    file: files.invoicePaymentsHistory,
    markers: ["InvoicePaymentsHistory", "historique", "encaissement", "factureId", "datePaiement"],
    severity: "MEDIUM",
  },
  {
    area: "form-payment-history",
    file: files.form,
    markers: ["InvoicePaymentsHistory", "data-invoice-payments-history", "factureId", "montantPaye", "resteAPayer"],
    severity: "MEDIUM",
  },
  {
    area: "runtime-rules-payment-history",
    file: files.runtimeBusinessRules,
    markers: ["encaissementsauto", "facturesauto", "montantPaye", "resteAPayer", "historique"],
    severity: "MEDIUM",
  },
  {
    area: "action-engine-payment",
    file: files.actionEngine,
    markers: ["encaissementsauto", "facturesauto", "historique", "montantPaye", "resteAPayer"],
    severity: "MEDIUM",
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
  const lower = content.toLowerCase();
  const needle = marker.toLowerCase();
  const hits = [];

  let index = lower.indexOf(needle);

  while (index !== -1) {
    hits.push(lineNumberAt(content, index));
    index = lower.indexOf(needle, index + needle.length);
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

for (const [name, file] of Object.entries(files)) {
  const source = read(file);

  add(
    "file",
    source ? "OK" : "WARN",
    ["encaissementActions"].includes(name) ? "LOW" : "MEDIUM",
    `${file} ${source ? "found" : "missing"}`,
    file
  );
}

for (const group of markerGroups) {
  const source = read(group.file);

  for (const marker of group.markers) {
    const lines = addContext(group.file, source, marker);

    add(
      group.area,
      lines.length > 0 ? "OK" : "WARN",
      group.severity,
      `${marker} ${lines.length > 0 ? "found" : "not found"}`,
      group.file,
      lines.join(", ")
    );
  }
}

const combined =
  Object.values(files)
    .map((file) => read(file))
    .join("\n")
    .toLowerCase();

const historyEffectDetected =
  combined.includes("encaissementsauto") &&
  combined.includes("facturesauto") &&
  combined.includes("invoicepaymentshistory") &&
  (
    combined.includes("historique") ||
    combined.includes("history")
  );

add(
  "business-effect-detection",
  historyEffectDetected ? "OK" : "WARN",
  "HIGH",
  `encaissementsauto historique effect ${historyEffectDetected ? "detected" : "not detected"} across runtime files`
);

const ok = checks.filter((c) => c.status === "OK").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const warnHigh = checks.filter((c) => c.status === "WARN" && c.severity === "HIGH").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

const report = [];

report.push("# Q2-OP-I16-F1 — Audit effet historique encaissementsauto");
report.push("");
report.push("Objectif : vérifier si l’effet métier `historique` existe déjà pour `encaissementsauto`, notamment via l’historique des paiements facture.");
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

for (const ctx of contexts.slice(0, 100)) {
  report.push(`### ${ctx.title}`);
  report.push("");
  report.push("```ts");
  report.push(ctx.body);
  report.push("```");
  report.push("");
}

report.push("## Conclusion");
report.push("");
if (historyEffectDetected) {
  report.push("L’effet `historique` est présent dans le runtime/UI facture, mais il n’est pas encore suffisamment visible pour l’audit prioritaire.");
  report.push("");
  report.push("Prochaine passe recommandée : rendre l’audit prioritaire `encaissementsauto` aware des composants/services d’historique paiement.");
} else {
  report.push("L’effet `historique` n’est pas détecté de manière fiable. Il faut décider si l’historique doit rester UI facture ou être exposé par un service runtime.");
}

write("docs/audits/Q2-OP-I16-F1-payment-history-effect-audit.md", report.join("\n"));

console.log("[Q2-OP-I16-F1] Payment history effect audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[WARN]", warn);
console.log("[WARN_HIGH]", warnHigh);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);
console.log("[REPORT] docs/audits/Q2-OP-I16-F1-payment-history-effect-audit.md");
console.log("[IMPORTANT]");
for (const check of checks) {
  if (check.status === "WARN" || check.status === "FAIL") {
    console.log(
      `[${check.status}] [${check.severity}] [${check.area}] ${check.message}${check.file ? " :: " + check.file : ""}${check.lines ? " :: lines " + check.lines : ""}`
    );
  }
}
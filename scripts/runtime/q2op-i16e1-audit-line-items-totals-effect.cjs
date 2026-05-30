const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  lineModule: "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  lineActions: "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.actions.ts",
  interventionModule: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  form: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  lineRemovalService: "src/runtime/line-items/RuntimeLineRemovalService.ts",
  runtimeBusinessRules: "src/runtime/business-rules/runtimeBusinessRules.ts",
  actionEngine: "src/runtime/actions/RuntimeActionEngine.ts",
};

const expectedMarkers = [
  {
    area: "line-module-fields",
    file: files.lineModule,
    markers: ["interventionId", "montantTotal", "montantHT", "montantTTC", "quantite", "prixUnitaire"],
    severity: "LOW",
  },
  {
    area: "intervention-module-totals",
    file: files.interventionModule,
    markers: ["coutTotal", "coutPieces", "coutMainOeuvre"],
    severity: "MEDIUM",
  },
  {
    area: "form-total-sync",
    file: files.form,
    markers: ["syncInterventionTotalsFromLines", "AMARKHYS_SYNC_INTERVENTION_TOTALS_AFTER_SAVE", "coutTotal"],
    severity: "MEDIUM",
  },
  {
    area: "line-removal-totals",
    file: files.lineRemovalService,
    markers: ["RuntimeLineRemovalService", "recompute", "total", "totaux", "coutTotal", "interventionId"],
    severity: "MEDIUM",
  },
  {
    area: "runtime-rules-totals",
    file: files.runtimeBusinessRules,
    markers: ["lignesinterventionauto", "interventionsauto", "coutTotal", "totaux", "total"],
    severity: "MEDIUM",
  },
  {
    area: "action-engine-line-actions",
    file: files.actionEngine,
    markers: ["retirer-ligne", "lignesinterventionauto", "RuntimeLineRemovalService", "totaux", "coutTotal"],
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
  const hits = [];
  let index = content.toLowerCase().indexOf(marker.toLowerCase());

  while (index !== -1) {
    hits.push(lineNumberAt(content, index));
    index = content.toLowerCase().indexOf(marker.toLowerCase(), index + marker.length);
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
    name === "lineActions" ? "LOW" : "MEDIUM",
    `${file} ${source ? "found" : "missing"}`,
    file
  );
}

for (const group of expectedMarkers) {
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
    .join("\n");

const totalsEffectDetected =
  (
    combined.toLowerCase().includes("syncinterventiontotalsfromlines") ||
    combined.toLowerCase().includes("couttotal") ||
    combined.toLowerCase().includes("totaux")
  ) &&
  combined.toLowerCase().includes("lignesinterventionauto") &&
  combined.toLowerCase().includes("interventionsauto");

add(
  "business-effect-detection",
  totalsEffectDetected ? "OK" : "WARN",
  "HIGH",
  `lignesinterventionauto totals effect ${totalsEffectDetected ? "detected" : "not detected"} across runtime files`
);

const ok = checks.filter((c) => c.status === "OK").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const warnHigh = checks.filter((c) => c.status === "WARN" && c.severity === "HIGH").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

const report = [];

report.push("# Q2-OP-I16-E1 — Audit effet totaux lignesinterventionauto");
report.push("");
report.push("Objectif : vérifier si l’effet métier `totaux` existe déjà pour `lignesinterventionauto`, et s’il est détectable par les audits runtime.");
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
if (totalsEffectDetected) {
  report.push("L’effet `totaux` est présent dans le runtime, mais il peut ne pas être suffisamment exposé/détectable par l’audit prioritaire.");
  report.push("");
  report.push("Prochaine passe recommandée : ajouter un marqueur metadata/runtime explicite `totaux` sans déplacer la logique métier vers le formulaire.");
} else {
  report.push("L’effet `totaux` n’est pas détecté de manière fiable. Il faut identifier si le recalcul existe seulement dans le formulaire ou s’il doit être centralisé dans un service runtime.");
}

write("docs/audits/Q2-OP-I16-E1-line-items-totals-effect-audit.md", report.join("\n"));

console.log("[Q2-OP-I16-E1] Line items totals effect audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[WARN]", warn);
console.log("[WARN_HIGH]", warnHigh);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);
console.log("[REPORT] docs/audits/Q2-OP-I16-E1-line-items-totals-effect-audit.md");
console.log("[IMPORTANT]");
for (const check of checks) {
  if (check.status === "WARN" || check.status === "FAIL") {
    console.log(
      `[${check.status}] [${check.severity}] [${check.area}] ${check.message}${check.file ? " :: " + check.file : ""}${check.lines ? " :: lines " + check.lines : ""}`
    );
  }
}
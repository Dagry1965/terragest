const fs = require("fs");
const path = require("path");

const root = process.cwd();

const scanRoots = [
  "src/runtime",
  "src/components/erp",
  "src/app/(private)",
];

const extensions = new Set([".ts", ".tsx"]);

const checks = [];

function add(area, status, severity, message, file = "") {
  checks.push({ area, status, severity, message, file });
}

function full(relativePath) {
  return path.join(root, relativePath);
}

function walk(relativeDir, results = []) {
  const absoluteDir = full(relativeDir);

  if (!fs.existsSync(absoluteDir)) {
    return results;
  }

  for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
    const absolutePath = path.join(absoluteDir, entry.name);
    const relativePath = path.relative(root, absolutePath).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === "dist" ||
        entry.name === "coverage"
      ) {
        continue;
      }

      walk(relativePath, results);
      continue;
    }

    if (!extensions.has(path.extname(entry.name))) {
      continue;
    }

    results.push(relativePath);
  }

  return results;
}

function read(file) {
  return fs.readFileSync(full(file), "utf8");
}

const files = scanRoots.flatMap((rootDir) => walk(rootDir));

const patterns = [
  "Enregistrer un paiement",
  "Ajouter un paiement",
  "Encaissement facture",
  "encaissementsauto/nouveau",
  "encaissementsauto",
  "facturesauto",
  "paiement",
  "payment",
  "runtimeOnly",
  "hrefTemplate",
  "actions:",
  "RuntimeActionEngine",
  "ERPRuntimePage",
  "Action",
];

const candidates = [];

for (const file of files) {
  const content = read(file);
  const lower = content.toLowerCase();

  const hits = patterns.filter((pattern) =>
    lower.includes(pattern.toLowerCase())
  );

  if (hits.length === 0) {
    continue;
  }

  const isStrong =
    content.includes("Enregistrer un paiement") ||
    content.includes("encaissementsauto/nouveau") ||
    content.includes("hrefTemplate") ||
    content.includes("runtimeOnly") ||
    content.includes("actions:") ||
    content.includes("RuntimeActionEngine");

  const score = hits.length + (isStrong ? 10 : 0);

  candidates.push({
    file,
    score,
    hits,
    hasManualEncaissementHref: content.includes("encaissementsauto/nouveau"),
    hasRuntimeBuilder: content.includes("buildRuntimeChildCreateHref") || content.includes("buildRuntimeFactureEncaissementCreateHref"),
    hasActions: content.includes("actions") || content.includes("actions:"),
    hasHrefTemplate: content.includes("hrefTemplate"),
    hasRuntimeOnly: content.includes("runtimeOnly"),
  });
}

candidates.sort((a, b) => b.score - a.score);

for (const candidate of candidates.slice(0, 40)) {
  add(
    "candidate",
    "INFO",
    candidate.hasManualEncaissementHref ? "HIGH" : "MEDIUM",
    [
      `score=${candidate.score}`,
      `manualHref=${candidate.hasManualEncaissementHref}`,
      `builder=${candidate.hasRuntimeBuilder}`,
      `actions=${candidate.hasActions}`,
      `hrefTemplate=${candidate.hasHrefTemplate}`,
      `runtimeOnly=${candidate.hasRuntimeOnly}`,
      `hits=${candidate.hits.join(", ")}`
    ].join("; "),
    candidate.file
  );
}

const facturesModule = "src/runtime/modules/generated/facturesauto/facturesauto.module.ts";

if (fs.existsSync(full(facturesModule))) {
  const moduleContent = read(facturesModule);

  if (moduleContent.includes("Enregistrer un paiement") || moduleContent.includes("encaissementsauto")) {
    add("factures-module", "WARN", "HIGH", "facturesauto module declares or references payment/encaissement action", facturesModule);
  } else {
    add("factures-module", "OK", "HIGH", "facturesauto module does not directly reference payment action", facturesModule);
  }

  if (moduleContent.includes("actions")) {
    add("factures-module", "INFO", "MEDIUM", "facturesauto module has actions metadata", facturesModule);
  }
} else {
  add("factures-module", "FAIL", "HIGH", "facturesauto module not found", facturesModule);
}

const runtimeActionFiles = candidates.filter((candidate) => {
  return (
    candidate.file.includes("Action") ||
    candidate.file.includes("action") ||
    candidate.file.includes("RuntimeAction") ||
    candidate.file.includes("ERPRuntimePage")
  );
});

if (runtimeActionFiles.length > 0) {
  add(
    "runtime-actions",
    "OK",
    "HIGH",
    "Runtime action rendering/engine candidates found: " + runtimeActionFiles.slice(0, 8).map((item) => item.file).join(", ")
  );
} else {
  add(
    "runtime-actions",
    "WARN",
    "HIGH",
    "No runtime action rendering/engine candidate found"
  );
}

const manualHrefFiles = candidates.filter((candidate) => candidate.hasManualEncaissementHref);

if (manualHrefFiles.length > 0) {
  add(
    "manual-href",
    "WARN",
    "HIGH",
    "Manual encaissementsauto/nouveau href still exists in: " + manualHrefFiles.map((item) => item.file).join(", ")
  );
} else {
  add(
    "manual-href",
    "OK",
    "HIGH",
    "No manual encaissementsauto/nouveau href detected in scanned files"
  );
}

const ok = checks.filter((c) => c.status === "OK").length;
const info = checks.filter((c) => c.status === "INFO").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

console.log("[Q2-OP-H3-A] Generic runtime payment actions audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[INFO]", info);
console.log("[WARN]", warn);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);

console.log("[TOP_CANDIDATES]");
for (const candidate of candidates.slice(0, 20)) {
  console.log(
    `- score=${candidate.score} manualHref=${candidate.hasManualEncaissementHref} builder=${candidate.hasRuntimeBuilder} actions=${candidate.hasActions} hrefTemplate=${candidate.hasHrefTemplate} runtimeOnly=${candidate.hasRuntimeOnly} file=${candidate.file}`
  );
}

for (const check of checks) {
  if (check.status === "WARN" || check.status === "FAIL") {
    console.log(
      `[${check.status}] [${check.severity}] [${check.area}] ${check.message}${check.file ? " :: " + check.file : ""}`
    );
  }
}

const reportLines = [];

reportLines.push("# Q2-OP-H3-A Generic runtime payment actions audit");
reportLines.push("");
reportLines.push("Goal: find the generic mechanism that still renders invoice payment actions.");
reportLines.push("");
reportLines.push(`- OK: ${ok}`);
reportLines.push(`- INFO: ${info}`);
reportLines.push(`- WARN: ${warn}`);
reportLines.push(`- FAIL: ${fail}`);
reportLines.push(`- HIGH FAIL: ${failHigh}`);
reportLines.push("");
reportLines.push("## Top candidates");
reportLines.push("");
reportLines.push("| Score | Manual href | Builder | Actions | Href template | Runtime only | File | Hits |");
reportLines.push("|---:|---:|---:|---:|---:|---:|---|---|");

for (const candidate of candidates.slice(0, 50)) {
  reportLines.push(
    `| ${candidate.score} | ${candidate.hasManualEncaissementHref} | ${candidate.hasRuntimeBuilder} | ${candidate.hasActions} | ${candidate.hasHrefTemplate} | ${candidate.hasRuntimeOnly} | \`${candidate.file}\` | ${candidate.hits.join(", ").replace(/\|/g, "/")} |`
  );
}

reportLines.push("");
reportLines.push("## Checks");
reportLines.push("");
reportLines.push("| Area | Status | Severity | File | Message |");
reportLines.push("|---|---:|---:|---|---|");

for (const check of checks) {
  reportLines.push(
    `| ${check.area} | ${check.status} | ${check.severity} | ${check.file ? "`" + check.file + "`" : ""} | ${check.message.replace(/\|/g, "/")} |`
  );
}

reportLines.push("");
reportLines.push("## Recommendation");
reportLines.push("");
reportLines.push("Do not patch UI blindly. If the remaining button comes from module actions metadata, either remove/hide the duplicate action at metadata level or route it through RuntimeChildCreateHrefBuilder.");

const reportPath = full("docs/audits/Q2-OP-H3-A-generic-runtime-payment-actions-audit.md");
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");

console.log("[REPORT]", path.relative(root, reportPath));
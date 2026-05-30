const fs = require("fs");
const path = require("path");

const root = process.cwd();

const scanRoots = [
  "src/components/erp",
  "src/runtime",
];

const includeExtensions = new Set([".tsx", ".ts"]);

const keywords = [
  "expand",
  "expanded",
  "collapsible",
  "collapse",
  "accordion",
  "children",
  "relatedRecords",
  "relatedRecordsBySection",
  "line",
  "lignes",
  "montant",
  "amount",
  "total",
  "subtotal",
  "facture",
  "encaissement",
  "intervention",
];

const strongKeywords = [
  "expanded",
  "collapsible",
  "relatedRecordsBySection",
  "montant",
  "montantTTC",
  "totalTTC",
  "lignesintervention",
  "factures",
  "encaissements",
];

const checks = [];

function add(area, status, severity, message, file = "") {
  checks.push({ area, status, severity, message, file });
}

function walk(dir, results = []) {
  const fullDir = path.join(root, dir);

  if (!fs.existsSync(fullDir)) {
    return results;
  }

  for (const entry of fs.readdirSync(fullDir, { withFileTypes: true })) {
    const full = path.join(fullDir, entry.name);

    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === "dist"
      ) {
        continue;
      }

      walk(path.relative(root, full), results);
      continue;
    }

    if (!includeExtensions.has(path.extname(entry.name))) {
      continue;
    }

    results.push(path.relative(root, full).replace(/\\/g, "/"));
  }

  return results;
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function scoreFile(content) {
  const lower = content.toLowerCase();

  let score = 0;
  const hits = [];

  for (const keyword of keywords) {
    if (lower.includes(keyword.toLowerCase())) {
      score += 1;
      hits.push(keyword);
    }
  }

  for (const keyword of strongKeywords) {
    if (lower.includes(keyword.toLowerCase())) {
      score += 4;
      hits.push(`strong:${keyword}`);
    }
  }

  return { score, hits };
}

const files = scanRoots.flatMap((scanRoot) => walk(scanRoot));

const candidates = [];

for (const file of files) {
  const content = read(file);
  const { score, hits } = scoreFile(content);

  if (score >= 6) {
    candidates.push({
      file,
      score,
      hits,
      hasUseState: content.includes("useState"),
      hasExpanded: content.toLowerCase().includes("expanded"),
      hasMontant: content.toLowerCase().includes("montant") || content.toLowerCase().includes("amount") || content.toLowerCase().includes("total"),
      hasRelated: content.includes("relatedRecordsBySection") || content.includes("relatedRecords") || content.includes("children"),
      exportsComponent: /export function|export const|export default function/.test(content),
    });
  }
}

candidates.sort((a, b) => b.score - a.score);

for (const candidate of candidates.slice(0, 30)) {
  const quality =
    candidate.hasExpanded && candidate.hasMontant && candidate.hasRelated
      ? "HIGH"
      : candidate.hasExpanded || candidate.hasRelated
        ? "MEDIUM"
        : "LOW";

  add(
    "candidate",
    "INFO",
    quality,
    `score=${candidate.score}; expanded=${candidate.hasExpanded}; related=${candidate.hasRelated}; amounts=${candidate.hasMontant}; exports=${candidate.exportsComponent}; hits=${candidate.hits.slice(0, 12).join(", ")}`,
    candidate.file
  );
}

const best = candidates.find((candidate) => {
  return candidate.hasExpanded && candidate.hasMontant && candidate.hasRelated;
});

if (best) {
  add(
    "recommendation",
    "OK",
    "HIGH",
    `Best reusable expand candidate detected: ${best.file}`,
    best.file
  );
} else {
  add(
    "recommendation",
    "WARN",
    "HIGH",
    "No perfect expand component found with expanded + related + amounts. Review top candidates before creating anything new."
  );
}

const knownExpected = [
  "src/components/erp/runtime/ERPRelatedRecordsPanel.tsx",
  "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/runtime/line-items",
];

for (const expected of knownExpected) {
  const exists = fs.existsSync(path.join(root, expected));
  add(
    "known-path",
    exists ? "OK" : "WARN",
    exists ? "MEDIUM" : "LOW",
    `${expected} ${exists ? "exists" : "not found"}`,
    expected
  );
}

const ok = checks.filter((c) => c.status === "OK").length;
const info = checks.filter((c) => c.status === "INFO").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

console.log("[Q2-OP-B9-A] Existing expand components audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[INFO]", info);
console.log("[WARN]", warn);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);

for (const check of checks) {
  if (check.status === "WARN" || check.status === "FAIL" || check.area === "recommendation") {
    console.log(`[${check.status}] [${check.severity}] [${check.area}] ${check.message}${check.file ? " :: " + check.file : ""}`);
  }
}

console.log("[TOP_CANDIDATES]");
for (const candidate of candidates.slice(0, 12)) {
  console.log(`- score=${candidate.score} file=${candidate.file}`);
}

const reportLines = [];
reportLines.push("# Q2-OP-B9-A Existing expand components audit");
reportLines.push("");
reportLines.push("Goal: reuse existing expandable/related/amount-aware ERP components for the Client Operational Sheet path.");
reportLines.push("");
reportLines.push(`- OK: ${ok}`);
reportLines.push(`- INFO: ${info}`);
reportLines.push(`- WARN: ${warn}`);
reportLines.push(`- FAIL: ${fail}`);
reportLines.push(`- HIGH FAIL: ${failHigh}`);
reportLines.push("");
reportLines.push("## Top candidates");
reportLines.push("");
reportLines.push("| Score | File | Expanded | Related | Amounts | Exports | Hits |");
reportLines.push("|---:|---|---:|---:|---:|---:|---|");

for (const candidate of candidates.slice(0, 30)) {
  reportLines.push(
    `| ${candidate.score} | \`${candidate.file}\` | ${candidate.hasExpanded} | ${candidate.hasRelated} | ${candidate.hasMontant} | ${candidate.exportsComponent} | ${candidate.hits.slice(0, 10).join(", ").replace(/\|/g, "/")} |`
  );
}

reportLines.push("");
reportLines.push("## Checks");
reportLines.push("");
reportLines.push("| Area | Status | Severity | File | Message |");
reportLines.push("|---|---:|---:|---|---|");

for (const check of checks) {
  reportLines.push(
    `| ${check.area} | ${check.status} | ${check.severity} | ${check.file ? `\`${check.file}\`` : ""} | ${check.message.replace(/\|/g, "/")} |`
  );
}

reportLines.push("");
reportLines.push("## Recommendation");
reportLines.push("");

if (best) {
  reportLines.push(`Reuse or adapt \`${best.file}\` for the central path Client -> Vehicle -> RDV -> Intervention -> Lines -> Invoice -> Payments.`);
} else {
  reportLines.push("Review the top candidates manually. Do not create a new expand component before confirming none can be reused.");
}

const reportPath = path.join(root, "docs/audits/Q2-OP-B9-A-existing-expand-components-audit.md");
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");

console.log("[REPORT]", path.relative(root, reportPath));
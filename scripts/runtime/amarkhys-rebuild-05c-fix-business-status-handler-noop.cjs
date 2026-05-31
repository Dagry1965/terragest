const fs = require("fs");
const path = require("path");

const root = process.cwd();

const formRel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const reportRel = "docs/audits/AMARKHYS-REBUILD-05C-FIX1-business-status-handler-noop.md";

const formPath = path.join(root, formRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(formPath)) {
  fail("Missing file: " + formRel);
}

const backupPath = formPath + ".bak-rebuild-05c-fix1-handler-noop";
fs.copyFileSync(formPath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(formPath, "utf8");
const before = content;

const startMarker = "  async function handleBusinessStatusAction() {";
const start = content.indexOf(startMarker);

if (start === -1) {
  fail("Cannot find handleBusinessStatusAction()");
}

function findMatchingBrace(source, openIndex) {
  let depth = 0;
  let quote = null;
  let escape = false;

  for (let i = openIndex; i < source.length; i++) {
    const ch = source[i];

    if (escape) {
      escape = false;
      continue;
    }

    if (ch === "\\") {
      escape = true;
      continue;
    }

    if (quote) {
      if (ch === quote) quote = null;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }

    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }

  return -1;
}

const openBrace = content.indexOf("{", start);
if (openBrace === -1) {
  fail("Cannot find handleBusinessStatusAction opening brace");
}

const closeBrace = findMatchingBrace(content, openBrace);
if (closeBrace === -1) {
  fail("Cannot find handleBusinessStatusAction closing brace");
}

const replacement = `  async function handleBusinessStatusAction() {
    // AMARKHYS-REBUILD-05C-FIX1
    // Form-level business/status actions are disabled.
    // Runtime actions must be executed from ERPRuntimePage / ERPRuntimeActionBar.
    return;
  }`;

content = content.slice(0, start) + replacement + content.slice(closeBrace + 1);

fs.writeFileSync(formPath, content, "utf8");

const checks = [
  {
    label: "handleBusinessStatusAction neutralisé",
    ok:
      content.includes("AMARKHYS-REBUILD-05C-FIX1") &&
      /async function handleBusinessStatusAction\(\)\s*\{[\s\S]*?return;[\s\S]*?\}/.test(content),
  },
  {
    label: "ancienne référence confirmMessage supprimée du handler",
    ok: !/window\.confirm\(action\.confirmMessage\)/.test(content),
  },
  {
    label: "ancienne mutation nextStatus supprimée du handler",
    ok: !/nextStatus/.test(content.slice(start, start + 700)),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-05C-FIX1 — Neutralisation handler businessStatusAction",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Cause",
  "",
  "Après neutralisation de getBusinessStatusAction(), TypeScript déduit que l'action est never dans handleBusinessStatusAction().",
  "",
  "## Correction",
  "",
  "handleBusinessStatusAction() devient un no-op. Les actions métier doivent passer par ERPRuntimePage / ERPRuntimeActionBar.",
  "",
  "## Checks",
  "",
  ...checks.map((c) => `- ${c.ok ? "OK" : "FAIL"} — ${c.label}`),
  "",
  "## Synthèse",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-REBUILD-05C-FIX1] Business status handler noop");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-05C-FIX1] DONE");
const fs = require("fs");
const path = require("path");

const root = process.cwd();

const auditRel = "scripts/runtime/amarkhys-rebuild-06c-ui-audit-interventionsauto.cjs";
const reportRel = "docs/audits/AMARKHYS-REBUILD-06C-FIX2-ui-audit-scope.md";

const auditPath = path.join(root, auditRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(auditPath)) {
  fail("Missing file: " + auditRel);
}

const backupPath = auditPath + ".bak-rebuild-06c-fix2-ui-audit-scope";
fs.copyFileSync(auditPath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(auditPath, "utf8");
const before = content;

if (!content.includes("function extractObjectBlock")) {
  const helper = `
function extractObjectBlock(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) return "";

  const start = source.lastIndexOf("{", markerIndex);
  if (start === -1) return "";

  let depth = 0;
  let quote = null;
  let escape = false;

  for (let i = start; i < source.length; i++) {
    const ch = source[i];

    if (escape) {
      escape = false;
      continue;
    }

    if (ch === "\\\\") {
      escape = true;
      continue;
    }

    if (quote) {
      if (ch === quote) quote = null;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "\`") {
      quote = ch;
      continue;
    }

    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }

  return "";
}

const lignesInterventionBlock = extractObjectBlock(moduleContent, 'moduleKey: "lignesinterventionauto"');
const facturesInterventionBlock = extractObjectBlock(moduleContent, 'moduleKey: "facturesauto"');

`;

  content = content.replace(
    "const moduleContent = read(modulePath);\nconst formContent = read(formPath);\n",
    "const moduleContent = read(modulePath);\nconst formContent = read(formPath);\n" + helper
  );
}

// 1. Statut verrouillé : accepter readonlyIf operator in OU notEquals.
content = content.replace(
  /label:\s*"statut verrouillé par readonlyIf",\s*ok:\s*\/key:\\s\*\\"statut\\"[\s\S]*?\.test\(moduleContent\),/m,
  `label: "statut verrouillé par readonlyIf",
    ok:
      /key:\\s*"statut"[\\s\\S]*?readonlyIf[\\s\\S]*?operator:\\s*"(in|notEquals)"/.test(moduleContent),`
);

// 2. Ajout ligne : tester uniquement le bloc lignesinterventionauto.
content = content.replace(
  /label:\s*"ajout ligne depuis intervention autorisé",\s*ok:\s*[\s\S]*?moduleContent\.includes\('createLabel: "Ajouter une ligne"'\)[\s\S]*?!\/moduleKey:\\s\*"lignesinterventionauto"\[\\s\\S\]\*\?allowCreate:\\s\*false\/\.test\(moduleContent\),/m,
  `label: "ajout ligne depuis intervention autorisé",
    ok:
      lignesInterventionBlock.includes('createLabel: "Ajouter une ligne"') &&
      !/allowCreate:\\s*false/.test(lignesInterventionBlock),`
);

// 3. Ajouter un check utile sur factures : création directe désactivée.
if (!content.includes("panneau factures sans création directe")) {
  content = content.replace(
    `{
    label: "ERPEnterpriseForm applique readonlyIf générique",`,
    `{
    label: "panneau factures sans création directe",
    ok:
      facturesInterventionBlock.includes('moduleKey: "facturesauto"') &&
      /allowCreate:\\s*false/.test(facturesInterventionBlock),
  },
  {
    label: "ERPEnterpriseForm applique readonlyIf générique",`
  );
}

fs.writeFileSync(auditPath, content, "utf8");

const checks = [
  {
    label: "helper extractObjectBlock ajouté",
    ok: content.includes("function extractObjectBlock"),
  },
  {
    label: "bloc lignesInterventionBlock utilisé",
    ok: content.includes("lignesInterventionBlock"),
  },
  {
    label: "bloc facturesInterventionBlock utilisé",
    ok: content.includes("facturesInterventionBlock"),
  },
  {
    label: "readonlyIf accepte in ou notEquals",
    ok: content.includes('operator:\\s*"(in|notEquals)"'),
  },
  {
    label: "check factures sans création directe ajouté",
    ok: content.includes("panneau factures sans création directe"),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-06C-FIX2 — Correction audit UI interventionsauto",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Cause",
  "",
  "- L'audit readonlyIf était trop strict : il attendait uniquement operator in.",
  "- L'audit ajout ligne était trop large : il lisait allowCreate false du bloc facturesauto.",
  "",
  "## Correction",
  "",
  "- Acceptation readonlyIf operator in ou notEquals.",
  "- Extraction du bloc lignesinterventionauto avant de tester allowCreate.",
  "- Extraction du bloc facturesauto et ajout d'un check allowCreate false.",
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

console.log("[AMARKHYS-REBUILD-06C-FIX2] Fix UI audit scope");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-06C-FIX2] DONE");
console.log("[NEXT] Rerun 06C audit, then build.");
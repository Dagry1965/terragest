const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts";
const formRel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const reportRel = "docs/audits/AMARKHYS-REBUILD-06C-ui-audit-interventionsauto.md";

const modulePath = path.join(root, moduleRel);
const formPath = path.join(root, formRel);
const reportPath = path.join(root, reportRel);

function read(file) {
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

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
      if (depth === 0) return source.slice(start, i + 1);
    }
  }

  return "";
}

const moduleContent = read(modulePath);
const formContent = read(formPath);

const statutBlock = extractObjectBlock(moduleContent, 'key: "statut"');
const mecanicienBlock = extractObjectBlock(moduleContent, 'key: "mecanicienId"');
const montantHTBlock = extractObjectBlock(moduleContent, 'key: "montantHT"');
const coutTotalBlock = extractObjectBlock(moduleContent, 'key: "coutTotal"');
const lignesInterventionBlock = extractObjectBlock(moduleContent, 'moduleKey: "lignesinterventionauto"');
const facturesInterventionBlock = extractObjectBlock(moduleContent, 'moduleKey: "facturesauto"');

const checks = [
  {
    label: "interventionsauto.module.ts existe",
    ok: fs.existsSync(modulePath),
  },
  {
    label: "champ statut présent",
    ok: statutBlock.includes('key: "statut"'),
  },
  {
    label: "statut verrouillé par readonlyIf",
    ok:
      statutBlock.includes("readonlyIf") &&
      /operator:\s*"(in|notEquals)"/.test(statutBlock),
  },
  {
    label: "mecanicienId présent",
    ok: mecanicienBlock.includes('key: "mecanicienId"'),
  },
  {
    label: "mecanicienId relation employes",
    ok: mecanicienBlock.includes('relation: { module: "employes" }'),
  },
  {
    label: "montantHT présent",
    ok: montantHTBlock.includes('key: "montantHT"'),
  },
  {
    label: "montantHT verrouillé dans readOnlyFields",
    ok: /readOnlyFields:\s*\[[\s\S]*?"montantHT"/.test(moduleContent),
  },
  {
    label: "montantTTC verrouillé dans readOnlyFields",
    ok: /readOnlyFields:\s*\[[\s\S]*?"montantTTC"/.test(moduleContent),
  },
  {
    label: "coutTotal conservé",
    ok: coutTotalBlock.includes('key: "coutTotal"'),
  },
  {
    label: "coutTotal verrouillé dans readOnlyFields",
    ok: /readOnlyFields:\s*\[[\s\S]*?"coutTotal"/.test(moduleContent),
  },
  {
    label: "clientId verrouillé dans readOnlyFields",
    ok: /readOnlyFields:\s*\[[\s\S]*?"clientId"/.test(moduleContent),
  },
  {
    label: "vehiculeId verrouillé dans readOnlyFields",
    ok: /readOnlyFields:\s*\[[\s\S]*?"vehiculeId"/.test(moduleContent),
  },
  {
    label: "rendezVousId verrouillé dans readOnlyFields",
    ok: /readOnlyFields:\s*\[[\s\S]*?"rendezVousId"/.test(moduleContent),
  },
  {
    label: "panneau lignes intervention déclaré",
    ok:
      lignesInterventionBlock.includes('moduleKey: "lignesinterventionauto"') &&
      lignesInterventionBlock.includes('foreignKey: "interventionId"'),
  },
  {
    label: "ajout ligne depuis intervention autorisé",
    ok:
      lignesInterventionBlock.includes('createLabel: "Ajouter une ligne"') &&
      !/allowCreate:\s*false/.test(lignesInterventionBlock),
  },
  {
    label: "panneau factures sans création directe",
    ok:
      facturesInterventionBlock.includes('moduleKey: "facturesauto"') &&
      /allowCreate:\s*false/.test(facturesInterventionBlock),
  },
  {
    label: "ERPEnterpriseForm applique readonlyIf générique",
    ok:
      formContent.includes("evaluateERPConditionalRule") &&
      formContent.includes("readonlyIfFields") &&
      formContent.includes("...readonlyIfFields"),
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-06C — UI audit interventionsauto",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Synthèse",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  "",
  "## Checks metadata/UI",
  "",
  ...checks.map((c) => `- ${c.ok ? "OK" : "FAIL"} — ${c.label}`),
  "",
  "## Contrôle manuel attendu",
  "",
  "- /interventionsauto/[id]/edit : statut visible mais non modifiable.",
  "- /interventionsauto/[id]/edit : mecanicienId visible/utilisable.",
  "- /interventionsauto/[id]/edit : clientId, vehiculeId, rendezVousId verrouillés si hérités.",
  "- /interventionsauto/[id]/edit : montantHT, montantTTC, coutTotal non modifiables.",
  "- /interventionsauto/[id]/edit : panneau lignes visible et ajout ligne possible.",
  "- /interventionsauto/[id]/edit : panneau factures consultable mais sans création directe.",
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-REBUILD-06C] UI audit interventionsauto");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  console.log("[NEXT] Fix FAIL only.");
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-06C] DONE");

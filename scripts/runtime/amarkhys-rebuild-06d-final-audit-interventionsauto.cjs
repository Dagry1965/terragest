const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  interventions: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  actions: "src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts",
  employes: "src/runtime/modules/generated/employes/employes.module.ts",
  employesIndex: "src/runtime/modules/generated/employes/index.ts",
  coreModules: "src/runtime/modules/definitions/coreModules.ts",
  form: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  relatedPanel: "src/components/erp/runtime/ERPRelatedRecordsPanel.tsx",
  listPage: "src/app/(private)/interventionsauto/page.tsx",
  createPage: "src/app/(private)/interventionsauto/nouveau/page.tsx",
  detailPage: "src/app/(private)/interventionsauto/[id]/page.tsx",
  editPage: "src/app/(private)/interventionsauto/[id]/edit/page.tsx",
};

const reportRel = "docs/audits/AMARKHYS-REBUILD-06D-final-interventionsauto-audit.md";
const reportPath = path.join(root, reportRel);

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(rel) {
  const file = path.join(root, rel);
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

const interventions = read(files.interventions);
const actions = read(files.actions);
const employes = read(files.employes);
const coreModules = read(files.coreModules);
const form = read(files.form);
const relatedPanel = read(files.relatedPanel);

const statutBlock = extractObjectBlock(interventions, 'key: "statut"');
const mecanicienBlock = extractObjectBlock(interventions, 'key: "mecanicienId"');
const lignesBlock = extractObjectBlock(interventions, 'moduleKey: "lignesinterventionauto"');
const facturesBlock = extractObjectBlock(interventions, 'moduleKey: "facturesauto"');
const readOnlyMatch = interventions.match(/readOnlyFields:\s*\[[\s\S]*?\]/);
const readOnlyBlock = readOnlyMatch ? readOnlyMatch[0] : "";
const employesMetadataBlock = extractObjectBlock(employes, "metadata:");
const employesSchemaBlock = extractObjectBlock(employes, "schema:");

const checks = [
  {
    group: "Routes",
    label: "/interventionsauto existe",
    ok: exists(files.listPage),
  },
  {
    group: "Routes",
    label: "/interventionsauto/nouveau existe",
    ok: exists(files.createPage),
  },
  {
    group: "Routes",
    label: "/interventionsauto/[id] existe",
    ok: exists(files.detailPage),
  },
  {
    group: "Routes",
    label: "/interventionsauto/[id]/edit existe",
    ok: exists(files.editPage),
  },

  {
    group: "Statut",
    label: "champ statut présent",
    ok: statutBlock.includes('key: "statut"'),
  },
  {
    group: "Statut",
    label: "statut verrouillé via readonlyIf",
    ok:
      statutBlock.includes("readonlyIf") &&
      /operator:\s*"(in|notEquals)"/.test(statutBlock),
  },
  {
    group: "Statut",
    label: "ERPEnterpriseForm applique readonlyIf",
    ok:
      form.includes("readonlyIfFields") &&
      form.includes("evaluateERPConditionalRule") &&
      form.includes("...readonlyIfFields"),
  },

  {
    group: "Mécanicien",
    label: "mecanicienId présent",
    ok: mecanicienBlock.includes('key: "mecanicienId"'),
  },
  {
    group: "Mécanicien",
    label: "mecanicienId pointe vers employes",
    ok: mecanicienBlock.includes('relation: { module: "employes" }'),
  },
  {
    group: "Mécanicien",
    label: "mecanicienId dans form tabs/sections",
    ok: interventions.includes('"mecanicienId"'),
  },
  {
    group: "Mécanicien",
    label: "relationLabelFields mecanicienId présent",
    ok: /relationLabelFields:\s*\{[\s\S]*?mecanicienId/.test(interventions),
  },
  {
    group: "Mécanicien",
    label: "module employes existe",
    ok: exists(files.employes) && employes.includes("employesModule"),
  },
  {
    group: "Mécanicien",
    label: "module employes exporté",
    ok: exists(files.employesIndex) && read(files.employesIndex).includes("employesModule"),
  },
  {
    group: "Mécanicien",
    label: "module employes enregistré dans coreModules",
    ok: coreModules.includes("employesModule"),
  },
  {
    group: "Mécanicien",
    label: "employes metadata et schema conformes",
    ok:
      employes.includes('key: "employes"') &&
      employes.includes('label: "Employés"') &&
      employes.includes('collection: "employes"') &&
      employes.includes('key: "nom"') &&
      employes.includes('key: "prenom"') &&
      employes.includes('key: "fonction"'),
  },

  {
    group: "Champs modifiables",
    label: "dateIntervention non verrouillée",
    ok: !readOnlyBlock.includes('"dateIntervention"'),
  },
  {
    group: "Champs modifiables",
    label: "kilometrage non verrouillé",
    ok: !readOnlyBlock.includes('"kilometrage"'),
  },

  {
    group: "Champs verrouillés",
    label: "clientId verrouillé",
    ok: readOnlyBlock.includes('"clientId"'),
  },
  {
    group: "Champs verrouillés",
    label: "vehiculeId verrouillé",
    ok: readOnlyBlock.includes('"vehiculeId"'),
  },
  {
    group: "Champs verrouillés",
    label: "rendezVousId verrouillé",
    ok: readOnlyBlock.includes('"rendezVousId"'),
  },
  {
    group: "Champs verrouillés",
    label: "montantHT verrouillé",
    ok: readOnlyBlock.includes('"montantHT"'),
  },
  {
    group: "Champs verrouillés",
    label: "montantTTC verrouillé",
    ok: readOnlyBlock.includes('"montantTTC"'),
  },
  {
    group: "Champs verrouillés",
    label: "coutTotal verrouillé",
    ok: readOnlyBlock.includes('"coutTotal"'),
  },

  {
    group: "Children",
    label: "panneau lignes intervention déclaré",
    ok:
      lignesBlock.includes('moduleKey: "lignesinterventionauto"') &&
      lignesBlock.includes('foreignKey: "interventionId"'),
  },
  {
    group: "Children",
    label: "lignes intervention visibles en detail/edit",
    ok: /displayIn:\s*\["detail",\s*"edit"\]/.test(lignesBlock),
  },
  {
    group: "Children",
    label: "ajout ligne conservé",
    ok: lignesBlock.includes('createLabel: "Ajouter une ligne"'),
  },
  {
    group: "Children",
    label: "facture non gérée comme panneau libre en edit",
    ok:
      !facturesBlock ||
      (
        facturesBlock.includes('moduleKey: "facturesauto"') &&
        /displayIn:\s*\["detail"\]/.test(facturesBlock) &&
        /allowCreate:\s*false/.test(facturesBlock) &&
        /mode:\s*"readonly"/.test(facturesBlock)
      ),
  },

  {
    group: "Actions",
    label: "actions intervention présentes",
    ok: actions.includes("interventionsautoActions") && actions.trim().length > 40,
  },
  {
    group: "Générique",
    label: "ERPRelatedRecordsPanel gère allowCreate",
    ok: relatedPanel.includes("allowCreate"),
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const grouped = checks.reduce((acc, check) => {
  acc[check.group] ||= [];
  acc[check.group].push(check);
  return acc;
}, {});

const report = [];

report.push("# AMARKHYS-REBUILD-06D — Audit final interventionsauto");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
report.push("");
report.push("## Synthèse");
report.push("");
report.push(`- OK: ${okCount}`);
report.push(`- FAIL: ${failCount}`);
report.push("");
report.push("## Checks");
report.push("");

for (const [group, items] of Object.entries(grouped)) {
  report.push(`### ${group}`);
  report.push("");
  for (const item of items) {
    report.push(`- ${item.ok ? "OK" : "FAIL"} — ${item.label}`);
  }
  report.push("");
}

report.push("## Résultat UI validé manuellement");
report.push("");
report.push("- Mécanicien responsable visible.");
report.push("- Liste mécanicien non vide.");
report.push("- Mécanicien sélectionnable.");
report.push("- Sauvegarde intervention avec mécanicien OK.");
report.push("- Date intervention modifiable.");
report.push("- Kilométrage modifiable.");
report.push("- Montants calculés verrouillés.");
report.push("- Panneau lignes conservé.");
report.push("- Facture sortie du flux edit / gouvernée par action runtime.");
report.push("");

report.push("## Blocs clés");
report.push("");
report.push("### statut");
report.push("");
report.push(statutBlock || "- Non trouvé.");
report.push("");
report.push("### mecanicienId");
report.push("");
report.push(mecanicienBlock || "- Non trouvé.");
report.push("");
report.push("### readOnlyFields");
report.push("");
report.push(readOnlyBlock || "- Non trouvé.");
report.push("");
report.push("### lignesinterventionauto");
report.push("");
report.push(lignesBlock || "- Non trouvé.");
report.push("");
report.push("### facturesauto");
report.push("");
report.push(facturesBlock || "- Non trouvé ou supprimé.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-06D] Final interventionsauto audit");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  console.log("[NEXT] Open report and fix FAIL only.");
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-06D] DONE");
console.log("[NEXT] pnpm build, commit audit if needed.");
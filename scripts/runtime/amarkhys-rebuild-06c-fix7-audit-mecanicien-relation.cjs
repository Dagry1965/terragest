const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  interventions: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  employes: "src/runtime/modules/generated/employes/employes.module.ts",
  employesIndex: "src/runtime/modules/generated/employes/index.ts",
  coreModules: "src/runtime/modules/definitions/coreModules.ts",
  relationLoader: "src/components/erp/forms/enterprise/ERPFormField.tsx",
  relationRuntime: "src/runtime/relations/RuntimeRelationFilterEngine.ts",
};

const reportRel = "docs/audits/AMARKHYS-REBUILD-06C-FIX7-audit-mecanicien-relation.md";
const reportPath = path.join(root, reportRel);

function read(rel) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function hits(content, patterns) {
  const lines = content.split(/\r?\n/);
  const out = [];

  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      if (line.includes(pattern)) {
        out.push({
          pattern,
          line: index + 1,
          text: line.trim(),
        });
      }
    }
  });

  return out;
}

const interventions = read(files.interventions);
const employes = read(files.employes);
const coreModules = read(files.coreModules);
const relationLoader = read(files.relationLoader);
const relationRuntime = read(files.relationRuntime);

const patterns = [
  "mecanicienId",
  "relation:",
  "module:",
  "employes",
  "employesauto",
  "utilisateurs",
  "labelFields",
  "relationLabelFields",
  "nom",
  "prenom",
  "email",
  "telephone",
  "collection",
  "moduleKey",
];

const checks = [
  {
    label: "interventionsauto.module.ts existe",
    ok: exists(files.interventions),
  },
  {
    label: "mecanicienId pointe vers employes",
    ok: /key:\s*"mecanicienId"[\s\S]*?relation:\s*\{\s*module:\s*"employes"\s*\}/.test(interventions),
  },
  {
    label: "employes.module.ts existe",
    ok: exists(files.employes),
  },
  {
    label: "employes enregistré dans coreModules",
    ok: coreModules.includes("employes"),
  },
  {
    label: "employes possède nom/prenom/email ou libellé",
    ok:
      employes.includes('key: "nom"') ||
      employes.includes('key: "prenom"') ||
      employes.includes('key: "email"') ||
      employes.includes('key: "libelle"') ||
      employes.includes('key: "label"'),
  },
  {
    label: "interventionsauto possède relationLabelFields mecanicienId",
    ok: /relationLabelFields:\s*\{[\s\S]*?mecanicienId/.test(interventions),
  },
  {
    label: "ERPFormField charge les relations",
    ok:
      relationLoader.includes("relation") &&
      (relationLoader.includes("RuntimeDataBinding") || relationLoader.includes("load") || relationLoader.includes("options")),
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [];

report.push("# AMARKHYS-REBUILD-06C-FIX7 — Audit mecanicienId relation");
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
for (const check of checks) {
  report.push(`- ${check.ok ? "OK" : "FAIL"} — ${check.label}`);
}
report.push("");

function writeHits(title, rel, content) {
  report.push(`## ${title} — ${rel}`);
  report.push("");

  const found = hits(content, patterns);
  if (!found.length) {
    report.push("- Aucun hit.");
    report.push("");
    return;
  }

  for (const hit of found) {
    report.push(`- ${hit.pattern} — L${hit.line}: ${hit.text}`);
  }

  report.push("");
}

writeHits("interventionsauto", files.interventions, interventions);
writeHits("employes", files.employes, employes);
writeHits("coreModules", files.coreModules, coreModules);
writeHits("ERPFormField relation loader", files.relationLoader, relationLoader);
writeHits("RuntimeRelationFilterEngine", files.relationRuntime, relationRuntime);

report.push("## Lecture attendue");
report.push("");
report.push("- Si employes.module.ts n'existe pas ou n'est pas enregistré, la liste sera vide.");
report.push("- Si aucun employé n'existe en base, la liste sera vide malgré une relation correcte.");
report.push("- Si relationLabelFields.mecanicienId manque, le label peut être vide ou illisible.");
report.push("- Si le vrai module personnel est utilisateurs ou employesauto, mecanicienId doit pointer vers le bon module.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-06C-FIX7] Audit mecanicienId relation");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);
console.log("[NEXT] Extract FAILs and relation hits.");
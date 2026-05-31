const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  module: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  actions: "src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts",
  businessRules: "src/runtime/business-rules/runtimeBusinessRules.ts",
  mutation: "src/runtime/firebase/FirestoreRuntimeMutation.ts",
  statusGovernance: "src/runtime/status/RuntimeStatusGovernanceEngine.ts",
};

const reportRel = "docs/audits/AMARKHYS-REBUILD-06B-A-locate-interventionsauto-fails.md";
const reportPath = path.join(root, reportRel);

function read(rel) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

function blockAround(content, needle, before = 12, after = 35) {
  const lines = content.split(/\r?\n/);
  const blocks = [];

  lines.forEach((line, index) => {
    if (line.includes(needle)) {
      const start = Math.max(0, index - before);
      const end = Math.min(lines.length - 1, index + after);

      blocks.push({
        needle,
        line: index + 1,
        rows: lines.slice(start, end + 1).map((text, i) => ({
          line: start + i + 1,
          text,
        })),
      });
    }
  });

  return blocks;
}

function lineHits(content, patterns) {
  const lines = content.split(/\r?\n/);
  const hits = [];

  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      if (line.includes(pattern)) {
        hits.push({
          pattern,
          line: index + 1,
          text: line.trim().slice(0, 260),
        });
      }
    }
  });

  return hits;
}

const moduleContent = read(files.module);
const actionsContent = read(files.actions);
const businessRulesContent = read(files.businessRules);
const mutationContent = read(files.mutation);
const statusGovernanceContent = read(files.statusGovernance);

const patterns = [
  "statut",
  "readonlyIf",
  "mecanicienId",
  "technicien",
  "responsable",
  "montantHT",
  "montantTTC",
  "coutPieces",
  "coutMainOeuvre",
  "coutTotal",
  "lignesinterventionauto",
  "RuntimeStatusGovernance",
  "interventionsauto",
];

const report = [];

report.push("# AMARKHYS-REBUILD-06B-A — Locate interventionsauto FAILs");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
report.push("");
report.push("## Objectif");
report.push("");
report.push("Localiser précisément les 4 FAIL de 06A avant correction : statut non verrouillé, mecanicienId absent, montantHT absent, totaux non reconnus.");
report.push("");

function writeHits(title, rel, content) {
  report.push(`## ${title} — ${rel}`);
  report.push("");

  const hits = lineHits(content, patterns);

  if (!hits.length) {
    report.push("- Aucun hit.");
    report.push("");
    return;
  }

  for (const hit of hits) {
    report.push(`- ${hit.pattern} — L${hit.line}: ${hit.text}`);
  }

  report.push("");
}

function writeBlocks(title, content, needles) {
  report.push(`## ${title}`);
  report.push("");

  let any = false;

  for (const needle of needles) {
    const blocks = blockAround(content, needle);

    for (const block of blocks) {
      any = true;
      report.push(`### ${needle} — ligne ${block.line}`);
      report.push("");

      for (const row of block.rows) {
        report.push(`${String(row.line).padStart(5, " ")}: ${row.text}`);
      }

      report.push("");
    }
  }

  if (!any) {
    report.push("- Aucun bloc trouvé.");
    report.push("");
  }
}

writeHits("Hits module", files.module, moduleContent);
writeHits("Hits actions", files.actions, actionsContent);
writeHits("Hits business rules", files.businessRules, businessRulesContent);
writeHits("Hits mutation", files.mutation, mutationContent);
writeHits("Hits status governance", files.statusGovernance, statusGovernanceContent);

writeBlocks("Blocs champs critiques interventionsauto.module.ts", moduleContent, [
  'key: "statut"',
  'key: "coutPieces"',
  'key: "coutMainOeuvre"',
  'key: "coutTotal"',
  'key: "montantHT"',
  'key: "montantTTC"',
  'key: "mecanicienId"',
  'key: "responsable"',
  'key: "technicien"',
]);

writeBlocks("Blocs relations/enfants interventionsauto.module.ts", moduleContent, [
  "lignesinterventionauto",
  "children",
  "relations:",
  "lockedFields",
  "readOnlyFields",
]);

report.push("## Lecture attendue");
report.push("");
report.push("- Si coutTotal est l'ancien total HT, décider s'il faut le conserver comme legacy et ajouter montantHT calculé.");
report.push("- Ajouter mecanicienId comme responsable réel de l'intervention si absent.");
report.push("- Verrouiller statut avec readonlyIf, comme rendezvous.");
report.push("- Ne corriger que les 4 FAIL.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-06B-A] Locate interventionsauto FAILs");
console.log("[REPORT]", reportRel);
console.log("[NEXT] Extract critical blocks.");
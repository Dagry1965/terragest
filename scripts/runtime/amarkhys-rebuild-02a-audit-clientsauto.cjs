const fs = require("fs");
const path = require("path");

const root = process.cwd();

const candidates = [
  "src/runtime/modules/generated/clientsauto/clientsauto.module.ts",
  "src/runtime/modules/generated/clientsauto/clientsauto.actions.ts",
  "src/runtime/modules/generated/clientsauto/actions.ts",
  "src/runtime/modules/generated/clientsauto/index.ts",
  "src/runtime/modules/generated/clientsauto/clientsauto.schema.ts",
  "src/runtime/modules/generated/clientsauto/clientsauto.workflows.ts",
  "src/runtime/modules/generated/clientsauto/clientsauto.business-rules.ts",
  "src/runtime/modules/generated/clientsauto/clientsauto.rules.ts",
  "src/runtime/modules/generated/clientsauto/clientsauto.metadata.ts",
  "src/runtime/modules/generated/clientsauto/clientsauto.navigation.ts",
  "src/runtime/modules/generated/clientsauto/clientsauto.routes.ts",
];

const forbiddenPatterns = [
  {
    key: "ERPEnterpriseForm action/workflow coupling",
    pattern: /ERPEnterpriseForm|onWorkflow|workflowButton|workflowActions|statusActions|formActions|actions\s*:\s*\[/i,
  },
  {
    key: "local page action rendering",
    pattern: /button|Button|onClick|handle[A-Z][A-Za-z]+|router\.push|useRouter/i,
  },
  {
    key: "local status transition",
    pattern: /statut\s*=|status\s*=|setStatut|setStatus|transition|workflow/i,
  },
  {
    key: "direct Firestore usage",
    pattern: /firebase\/firestore|getDocs|addDoc|updateDoc|deleteDoc|collection\(|doc\(/i,
  },
  {
    key: "local business logic",
    pattern: /if\s*\(.+statut|switch\s*\(.+statut|canActivate|canArchive|canDeactivate/i,
  },
];

const actionKeywords = [
  "activer",
  "désactiver",
  "desactiver",
  "réactiver",
  "reactiver",
  "archiver",
  "ajouter véhicule",
  "ajouter vehicule",
  "fiche opérationnelle",
  "fiche operationnelle",
  "ouvrir fiche",
];

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function listFiles(dirRel) {
  const dir = path.join(root, dirRel);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).map((f) => path.join(dirRel, f));
}

function findAllClientFiles() {
  const dirs = [
    "src/runtime/modules/generated/clientsauto",
    "src/runtime/modules/generated",
    "src/runtime/actions",
    "src/runtime/workflows",
    "src/components/erp",
    "src/app",
  ];

  const found = [];

  function walk(absDir) {
    if (!fs.existsSync(absDir)) return;
    for (const item of fs.readdirSync(absDir)) {
      const abs = path.join(absDir, item);
      const stat = fs.statSync(abs);
      if (stat.isDirectory()) {
        if (
          item === "node_modules" ||
          item === ".next" ||
          item === ".git" ||
          item.includes(".bak")
        ) {
          continue;
        }
        walk(abs);
      } else {
        const rel = path.relative(root, abs).replace(/\\/g, "/");
        if (
          /clientsauto/i.test(rel) ||
          /client/i.test(item) ||
          /Client/i.test(item)
        ) {
          if (/\.(ts|tsx|js|jsx|cjs|md)$/.test(item)) {
            found.push(rel);
          }
        }
      }
    }
  }

  for (const dir of dirs) {
    walk(path.join(root, dir));
  }

  return Array.from(new Set(found)).sort();
}

function inspectFile(rel) {
  if (!exists(rel)) return null;

  const content = read(rel);
  const lines = content.split(/\r?\n/);

  const forbidden = [];
  for (const rule of forbiddenPatterns) {
    const matches = [];
    lines.forEach((line, idx) => {
      if (rule.pattern.test(line)) {
        matches.push({
          line: idx + 1,
          text: line.trim().slice(0, 220),
        });
      }
    });
    if (matches.length) {
      forbidden.push({
        key: rule.key,
        matches,
      });
    }
  }

  const actionHits = [];
  lines.forEach((line, idx) => {
    const lower = line.toLowerCase();
    for (const kw of actionKeywords) {
      if (lower.includes(kw)) {
        actionHits.push({
          keyword: kw,
          line: idx + 1,
          text: line.trim().slice(0, 220),
        });
      }
    }
  });

  const exports = [];
  lines.forEach((line, idx) => {
    if (/export\s+/.test(line)) {
      exports.push({
        line: idx + 1,
        text: line.trim().slice(0, 220),
      });
    }
  });

  const likelyActionsBlocks = [];
  lines.forEach((line, idx) => {
    if (/actions\s*:|const\s+.*actions|export\s+const\s+.*actions|runtimeOnly|href|actionKey|workflow/i.test(line)) {
      likelyActionsBlocks.push({
        line: idx + 1,
        text: line.trim().slice(0, 220),
      });
    }
  });

  return {
    rel,
    lineCount: lines.length,
    hasActionsProperty: /actions\s*:/.test(content),
    hasRuntimeOnly: /runtimeOnly/.test(content),
    hasWorkflow: /workflow/i.test(content),
    hasHref: /href\s*:/.test(content),
    actionHits,
    likelyActionsBlocks,
    forbidden,
    exports,
  };
}

const reportLines = [];
reportLines.push("# AMARKHYS-REBUILD-02A — Audit ciblé clientsauto");
reportLines.push("");
reportLines.push(`Date: ${new Date().toISOString()}`);
reportLines.push(`Root: ${root}`);
reportLines.push("");
reportLines.push("## 1. Fichiers candidats directs");
reportLines.push("");

for (const rel of candidates) {
  reportLines.push(`- ${exists(rel) ? "OK" : "MISSING"} ${rel}`);
}

reportLines.push("");
reportLines.push("## 2. Fichiers clients détectés");
reportLines.push("");

const clientFiles = findAllClientFiles();
for (const rel of clientFiles) {
  reportLines.push(`- ${rel}`);
}

reportLines.push("");
reportLines.push("## 3. Inspection détaillée");
reportLines.push("");

const toInspect = Array.from(new Set([
  ...candidates.filter(exists),
  ...clientFiles.filter((rel) => /clientsauto|ClientOperational|client operational|client.*hub|hub.*client/i.test(rel)),
])).sort();

let totalForbidden = 0;
let totalActionHits = 0;

for (const rel of toInspect) {
  const info = inspectFile(rel);
  if (!info) continue;

  totalForbidden += info.forbidden.reduce((sum, group) => sum + group.matches.length, 0);
  totalActionHits += info.actionHits.length;

  reportLines.push(`### ${rel}`);
  reportLines.push("");
  reportLines.push(`- lignes: ${info.lineCount}`);
  reportLines.push(`- actions property: ${info.hasActionsProperty ? "YES" : "NO"}`);
  reportLines.push(`- runtimeOnly: ${info.hasRuntimeOnly ? "YES" : "NO"}`);
  reportLines.push(`- workflow marker: ${info.hasWorkflow ? "YES" : "NO"}`);
  reportLines.push(`- href marker: ${info.hasHref ? "YES" : "NO"}`);
  reportLines.push("");

  if (info.exports.length) {
    reportLines.push("Exports:");
    for (const e of info.exports.slice(0, 20)) {
      reportLines.push(`- L${e.line}: ${e.text}`);
    }
    if (info.exports.length > 20) {
      reportLines.push(`- ... ${info.exports.length - 20} autres exports`);
    }
    reportLines.push("");
  }

  if (info.likelyActionsBlocks.length) {
    reportLines.push("Marqueurs actions/workflows/href:");
    for (const e of info.likelyActionsBlocks.slice(0, 40)) {
      reportLines.push(`- L${e.line}: ${e.text}`);
    }
    if (info.likelyActionsBlocks.length > 40) {
      reportLines.push(`- ... ${info.likelyActionsBlocks.length - 40} autres marqueurs`);
    }
    reportLines.push("");
  }

  if (info.actionHits.length) {
    reportLines.push("Mots-clés actions attendues détectés:");
    for (const e of info.actionHits.slice(0, 40)) {
      reportLines.push(`- ${e.keyword} — L${e.line}: ${e.text}`);
    }
    if (info.actionHits.length > 40) {
      reportLines.push(`- ... ${info.actionHits.length - 40} autres hits`);
    }
    reportLines.push("");
  }

  if (info.forbidden.length) {
    reportLines.push("Éléments potentiellement interdits / locaux:");
    for (const group of info.forbidden) {
      reportLines.push(`- ${group.key}`);
      for (const m of group.matches.slice(0, 20)) {
        reportLines.push(`  - L${m.line}: ${m.text}`);
      }
      if (group.matches.length > 20) {
        reportLines.push(`  - ... ${group.matches.length - 20} autres occurrences`);
      }
    }
    reportLines.push("");
  }

  reportLines.push("");
}

reportLines.push("## 4. Synthèse");
reportLines.push("");
reportLines.push(`- fichiers inspectés: ${toInspect.length}`);
reportLines.push(`- occurrences actions attendues: ${totalActionHits}`);
reportLines.push(`- occurrences interdites/locales candidates: ${totalForbidden}`);
reportLines.push("");

reportLines.push("## 5. Décision de reprise recommandée");
reportLines.push("");
reportLines.push("À ce stade, ne pas corriger encore au hasard.");
reportLines.push("La passe suivante doit :");
reportLines.push("1. confirmer le fichier officiel d’actions runtime clientsauto ;");
reportLines.push("2. brancher les actions dans la metadata/module runtime ;");
reportLines.push("3. garder les actions visibles via ERPRuntimePage / ERPRuntimeActionBar ;");
reportLines.push("4. ne rien ajouter dans ERPEnterpriseForm ;");
reportLines.push("5. relancer build + audit recadrage.");
reportLines.push("");

const reportDir = path.join(root, "docs/audits");
fs.mkdirSync(reportDir, { recursive: true });

const reportPath = path.join(reportDir, "AMARKHYS-REBUILD-02A-audit-clientsauto.md");
fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-02A] Audit clientsauto");
console.log("[ROOT]", root);
console.log("[REPORT]", path.relative(root, reportPath));
console.log("[FILES_INSPECTED]", toInspect.length);
console.log("[ACTION_HITS]", totalActionHits);
console.log("[FORBIDDEN_CANDIDATES]", totalForbidden);

if (exists("src/runtime/modules/generated/clientsauto/clientsauto.module.ts")) {
  console.log("[OK] clientsauto.module.ts found");
} else {
  console.log("[WARN] clientsauto.module.ts not found at expected path");
}

if (
  exists("src/runtime/modules/generated/clientsauto/clientsauto.actions.ts") ||
  exists("src/runtime/modules/generated/clientsauto/actions.ts")
) {
  console.log("[OK] clientsauto actions file found");
} else {
  console.log("[WARN] clientsauto actions file not found at expected path");
}

console.log("[NEXT] Open report and paste summary/output here.");
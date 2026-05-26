/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const AUDIT_ID = "Q22E-9L-B2";
const REPORT = path.join(ROOT, "docs", "audits", "Q22E-9L-B2-rdv-intervention-extraction-audit.md");

const TARGETS = [
  "validateRendezvousForIntervention",
  "buildInterventionFromRendezvous",
  "consumedByInterventionId",
  "typeIntervention",
  "rendezVousId",
  "dateIntervention",
];

const DIRS = ["src/runtime", "src/components", "src/app"];

function walk(dir) {
  const base = path.join(ROOT, dir);
  if (!fs.existsSync(base)) return [];
  const out = [];

  function visit(p) {
    if (p.includes("node_modules") || p.includes(".next") || p.includes(".git")) return;
    const st = fs.statSync(p);
    if (st.isDirectory()) return fs.readdirSync(p).forEach((x) => visit(path.join(p, x)));
    if (/\.(ts|tsx|js|jsx|cjs)$/.test(p)) out.push(p);
  }

  visit(base);
  return out;
}

function rel(p) {
  return p.split(path.sep).join("/").replace(ROOT.split(path.sep).join("/") + "/", "");
}

function lineOf(content, idx) {
  const lines = content.slice(0, idx).split(/\r?\n/);
  const n = lines.length;
  return { n, text: content.split(/\r?\n/)[n - 1]?.trim() || "" };
}

const findings = [];

for (const file of DIRS.flatMap(walk)) {
  const content = fs.readFileSync(file, "utf8");

  for (const target of TARGETS) {
    const re = new RegExp(target, "g");
    let m;
    while ((m = re.exec(content))) {
      const l = lineOf(content, m.index);
      findings.push({ target, file: rel(file), line: l.n, text: l.text });
    }
  }
}

const md = [
  `# ${AUDIT_ID} — RDV → intervention extraction audit`,
  "",
  "## Objectif",
  "",
  "Identifier tous les usages de la logique RDV → intervention avant extraction hors `RuntimeSchedulingEngine`.",
  "",
  "## Doctrine",
  "",
  "Le scheduling engine calcule des disponibilités, slots, conflits, buffers et capacités. Il ne construit pas d'intervention métier.",
  "",
  "## Résumé",
  "",
  `- Findings : ${findings.length}`,
  "",
  "## Findings",
  "",
  "| Cible | Fichier | Ligne | Extrait |",
  "|---|---|---:|---|",
  ...findings.map(f => `| ${f.target} | \`${f.file}\` | ${f.line} | \`${f.text.replace(/\|/g, "\\|")}\` |`),
  "",
  "## Décision attendue",
  "",
  "- Ce qui reste dans BusinessRule.",
  "- Ce qui devient mapping metadata.",
  "- Ce qui est supprimé du SchedulingEngine.",
].join("\n");

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, md, "utf8");

console.log(`[${AUDIT_ID}] DONE`);
console.log(`[FINDINGS] ${findings.length}`);
console.log(`[REPORT] ${rel(REPORT)}`);
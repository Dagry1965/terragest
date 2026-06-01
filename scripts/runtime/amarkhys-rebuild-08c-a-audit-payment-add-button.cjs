const fs = require("fs");
const path = require("path");

const root = process.cwd();

const candidates = [
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  "src/components/erp/runtime/ERPRelatedRecordsPanel.tsx",
  "src/components/erp/billing",
  "src/components/amarkhys",
  "src/components/erp",
  "src/runtime/modules/generated/facturesauto",
  "src/runtime/modules/generated/encaissementsauto",
];

const reportRel = "docs/audits/AMARKHYS-REBUILD-08C-A-audit-payment-add-button.md";
const reportPath = path.join(root, reportRel);

const patterns = [
  "Ajouter un paiement",
  "Enregistrer un paiement",
  "Paiements enregistrés",
  "Paiements enregistres",
  "encaissement",
  "encaissements",
  "encaissementsauto",
  "payment",
  "paiement",
  "allowCreate",
  "createLabel",
];

function walk(target) {
  const absolute = path.join(root, target);

  if (!fs.existsSync(absolute)) return [];

  const stat = fs.statSync(absolute);

  if (stat.isFile()) {
    return [absolute];
  }

  const out = [];

  for (const entry of fs.readdirSync(absolute)) {
    const file = path.join(absolute, entry);
    const fileStat = fs.statSync(file);

    if (fileStat.isDirectory()) {
      if (
        entry === "node_modules" ||
        entry === ".next" ||
        entry === ".git"
      ) {
        continue;
      }

      out.push(...walk(path.relative(root, file)));
      continue;
    }

    if (/\.(ts|tsx|js|jsx|cjs|md)$/.test(entry)) {
      out.push(file);
    }
  }

  return out;
}

const files = Array.from(new Set(candidates.flatMap(walk)));

const hits = [];

for (const file of files) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      if (line.includes(pattern)) {
        hits.push({
          file: rel,
          line: index + 1,
          pattern,
          text: line.trim().slice(0, 260),
        });
      }
    }
  });
}

const strongHits = hits.filter((hit) =>
  hit.pattern === "Ajouter un paiement" ||
  hit.pattern === "Paiements enregistrés" ||
  hit.pattern === "Enregistrer un paiement"
);

const checks = [
  {
    label: "bouton Ajouter un paiement localisé",
    ok: hits.some((hit) => hit.pattern === "Ajouter un paiement"),
  },
  {
    label: "bloc Paiements enregistrés localisé",
    ok: hits.some((hit) => hit.pattern === "Paiements enregistrés"),
  },
  {
    label: "action Enregistrer un paiement localisée",
    ok: hits.some((hit) => hit.pattern === "Enregistrer un paiement"),
  },
];

const okCount = checks.filter((check) => check.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-08C-A — Audit payment add button",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Objectif",
  "",
  "Localiser le bouton Ajouter un paiement du bloc Paiements enregistrés afin de le masquer sans casser l'action métier Enregistrer un paiement.",
  "",
  "## Règle cible",
  "",
  "- Garder le bouton Enregistrer un paiement dans le bloc d'encaissement facture.",
  "- Masquer Ajouter un paiement dans le bloc Paiements enregistrés.",
  "- Garder la liste des paiements et les actions Reçu / PDF / WhatsApp / SMS / Modifier.",
  "",
  "## Synthèse",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- ${check.ok ? "OK" : "FAIL"} — ${check.label}`),
  "",
  "## Strong hits",
  "",
  ...strongHits.map((hit) => `- ${hit.file}:${hit.line} — ${hit.pattern} — ${hit.text}`),
  "",
  "## All hits",
  "",
  ...hits.map((hit) => `- ${hit.file}:${hit.line} — ${hit.pattern} — ${hit.text}`),
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-REBUILD-08C-A] Audit payment add button");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);
console.log("[HITS]", hits.length);
console.log("[STRONG_HITS]", strongHits.length);

if (failCount > 0) {
  console.log("[NEXT] Extract hits and inspect exact component.");
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-08C-A] DONE");
console.log("[NEXT] Extract strong hits before fixing.");
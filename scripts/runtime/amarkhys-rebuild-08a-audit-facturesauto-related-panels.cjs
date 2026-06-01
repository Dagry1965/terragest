const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  factures: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  encaissements: "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
  echeances: "src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts",
  relatedPanel: "src/components/erp/runtime/ERPRelatedRecordsPanel.tsx",
  runtimePage: "src/components/erp/runtime/ERPRuntimePage.tsx",
  childGovernance: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
};

const reportRel = "docs/audits/AMARKHYS-REBUILD-08A-audit-facturesauto-related-panels.md";
const reportPath = path.join(root, reportRel);

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(rel) {
  const file = path.join(root, rel);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
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

function hits(title, rel, content, patterns) {
  const out = [];
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      if (line.includes(pattern)) {
        out.push(`- ${title} — ${pattern} — L${index + 1}: ${line.trim().slice(0, 260)}`);
      }
    }
  });

  return out.length ? out : [`- ${title} — aucun hit.`];
}

const factures = read(files.factures);
const encaissements = read(files.encaissements);
const echeances = read(files.echeances);
const relatedPanel = read(files.relatedPanel);
const runtimePage = read(files.runtimePage);
const interventions = read(files.childGovernance);

const facturesEncaissementBlock =
  extractObjectBlock(factures, "encaissementsauto") ||
  extractObjectBlock(factures, "encaissements") ||
  "";

const facturesEcheancesBlock =
  extractObjectBlock(factures, "echeancespaiementauto") ||
  extractObjectBlock(factures, "echeances") ||
  "";

const encaissementFactureField =
  extractObjectBlock(encaissements, 'key: "factureId"') ||
  extractObjectBlock(encaissements, 'key: "factureAutoId"') ||
  "";

const echeanceFactureField =
  extractObjectBlock(echeances, 'key: "factureId"') ||
  extractObjectBlock(echeances, 'key: "factureAutoId"') ||
  "";

const patterns = [
  "related",
  "children",
  "child",
  "childPanels",
  "relatedRecords",
  "relations",
  "encaissementsauto",
  "echeancespaiementauto",
  "factureId",
  "hide",
  "hidden",
  "allowCreate",
  "canCreate",
  "create",
  "Ajouter",
  "requiresParentContext",
  "allowedParents",
  "display",
  "condition",
  "visible",
];

const checks = [
  {
    group: "Modules",
    label: "facturesauto module existe",
    ok: exists(files.factures),
  },
  {
    group: "Modules",
    label: "encaissementsauto module existe",
    ok: exists(files.encaissements),
  },
  {
    group: "Modules",
    label: "echeancespaiementauto module existe",
    ok: exists(files.echeances),
  },
  {
    group: "Factures metadata",
    label: "facturesauto référence encaissementsauto",
    ok: factures.includes("encaissementsauto") || factures.includes("Encaissements"),
  },
  {
    group: "Factures metadata",
    label: "facturesauto référence echeancespaiementauto",
    ok: factures.includes("echeancespaiementauto") || factures.includes("Échéances") || factures.includes("Echéances"),
  },
  {
    group: "Child FK",
    label: "encaissementsauto porte factureId",
    ok: Boolean(encaissementFactureField),
  },
  {
    group: "Child FK",
    label: "echeancespaiementauto porte factureId",
    ok: Boolean(echeanceFactureField),
  },
  {
    group: "Gouvernance",
    label: "panneaux enfants ont une gouvernance existante",
    ok:
      factures.includes("childGovernance") ||
      factures.includes("relatedPanels") ||
      factures.includes("childPanels") ||
      factures.includes("relations") ||
      relatedPanel.includes("allowCreate") ||
      relatedPanel.includes("hidden") ||
      relatedPanel.includes("visible"),
  },
  {
    group: "Gouvernance",
    label: "RelatedRecordsPanel gère le bouton ajout",
    ok:
      relatedPanel.includes("Ajouter") ||
      relatedPanel.includes("add") ||
      relatedPanel.includes("create") ||
      relatedPanel.includes("allowCreate"),
  },
  {
    group: "Gouvernance",
    label: "interventionsauto contient déjà une gouvernance enfant réutilisable",
    ok:
      interventions.includes("child") ||
      interventions.includes("related") ||
      interventions.includes("allowCreate") ||
      interventions.includes("requiresParentContext"),
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

report.push("# AMARKHYS-REBUILD-08A — Audit facturesauto related panels / child governance");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
report.push("");
report.push("## Objectif");
report.push("");
report.push("Auditer les panneaux enfants affichés sous facturesauto : Encaissements et Échéances de paiement.");
report.push("");
report.push("## Règle métier cible");
report.push("");
report.push("- Garder le bloc métier Paiements enregistrés.");
report.push("- Masquer le panneau brut Encaissements sous la facture.");
report.push("- Garder Échéances de paiement seulement si échéancier actif / paiement en plusieurs fois.");
report.push("- Interdire l’ajout direct d’encaissement depuis le panneau relation brut.");
report.push("- Ne pas casser les actions métier de facture : paiement, reçu, PDF, WhatsApp.");
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

report.push("## Blocs metadata facturesauto");
report.push("");
report.push("### Encaissements block");
report.push("");
report.push(facturesEncaissementBlock || "- Non trouvé.");
report.push("");
report.push("### Échéances block");
report.push("");
report.push(facturesEcheancesBlock || "- Non trouvé.");
report.push("");

report.push("## Champs FK enfants");
report.push("");
report.push("### encaissementsauto.factureId");
report.push("");
report.push(encaissementFactureField || "- Non trouvé.");
report.push("");
report.push("### echeancespaiementauto.factureId");
report.push("");
report.push(echeanceFactureField || "- Non trouvé.");
report.push("");

report.push("## Hits");
report.push("");
report.push(...hits("facturesauto", files.factures, factures, patterns));
report.push("");
report.push(...hits("encaissementsauto", files.encaissements, encaissements, patterns));
report.push("");
report.push(...hits("echeancespaiementauto", files.echeances, echeances, patterns));
report.push("");
report.push(...hits("ERPRelatedRecordsPanel", files.relatedPanel, relatedPanel, patterns));
report.push("");
report.push(...hits("ERPRuntimePage", files.runtimePage, runtimePage, patterns));
report.push("");

report.push("## Lecture attendue");
report.push("");
report.push("- Si facturesauto déclare encaissementsauto comme related panel brut : metadata à corriger.");
report.push("- Si ERPRelatedRecordsPanel affiche systématiquement un bouton Ajouter : renforcer gouvernance générique allowCreate=false.");
report.push("- Si Échéances est toujours visible : ajouter visibilité conditionnelle selon échéancier actif.");
report.push("- Ne pas supprimer les modules enfants ; seulement gouverner leur affichage depuis le parent.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-08A] Audit facturesauto related panels");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);
console.log("[NEXT] Extract FAILs and metadata hits.");
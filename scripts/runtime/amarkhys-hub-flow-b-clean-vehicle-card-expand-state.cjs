const fs = require("fs");
const path = require("path");

const root = process.cwd();

const fileRel = "src/components/erp/hub/ERPClientOperationalSheet.tsx";
const reportRel = "docs/audits/AMARKHYS-HUB-FLOW-B-clean-vehicle-card-expand-state.md";

const filePath = path.join(root, fileRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  fail("Missing file: " + fileRel);
}

const backupPath = filePath + ".bak-hub-flow-b-clean-vehicle-card-expand-state";
fs.copyFileSync(filePath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(filePath, "utf8");
const before = content;

function removeLineContaining(source, needle) {
  const lines = source.split(/\r?\n/);
  return lines.filter((line) => !line.includes(needle)).join("\n");
}

function ensureUseStateExists(source) {
  if (source.includes("useState")) return source;

  if (source.includes("import { useMemo } from")) {
    return source.replace("import { useMemo } from", "import { useMemo, useState } from");
  }

  if (source.includes("import { useMemo, useEffect } from")) {
    return source.replace("import { useMemo, useEffect } from", "import { useMemo, useEffect, useState } from");
  }

  if (source.includes("from \"react\"")) {
    return source.replace(/import\s+\{([^}]+)\}\s+from\s+"react";/, (match, imports) => {
      if (imports.includes("useState")) return match;
      return `import {${imports}, useState } from "react";`;
    });
  }

  return source;
}

// 1. Garantir useState.
content = ensureUseStateExists(content);

// 2. Masquer les lignes véhicule Année / Carburant rendues en dur.
content = removeLineContaining(content, "<span className=\"font-medium text-slate-900\">Année :</span>");
content = removeLineContaining(content, "<span className=\"font-medium text-slate-900\">Carburant :</span>");

// 3. Supprimer les blocs gris vides évidents si présents.
// On reste prudent : uniquement classes très spécifiques avec bg-slate-50 sans contenu métier détectable.
content = content.replace(
  /\n\s*<div className="[^"]*bg-slate-50[^"]*">\s*<\/div>/g,
  ""
);

// 4. Ajouter les états expandables après selectedRendezvousId si absents.
if (!content.includes("expandedInterventionId")) {
  const marker = 'const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);';

  if (!content.includes(marker)) {
    fail("Cannot find selectedRendezvousId state marker");
  }

  content = content.replace(
    marker,
    `${marker}
  const [expandedInterventionId, setExpandedInterventionId] = useState<string | null>(null);
  const [expandedFactureId, setExpandedFactureId] = useState<string | null>(null);
  const [expandedEncaissementId, setExpandedEncaissementId] = useState<string | null>(null);`
  );
}

// 5. Ajouter helpers toggle si absents.
if (!content.includes("toggleExpandedIntervention")) {
  const marker = "const selectedRendezvous = useMemo(() => {";

  if (!content.includes(marker)) {
    fail("Cannot find selectedRendezvous useMemo marker");
  }

  const helper = `const toggleExpandedIntervention = (id: string) => {
    setExpandedInterventionId((current) => (current === id ? null : id));
  };

  const toggleExpandedFacture = (id: string) => {
    setExpandedFactureId((current) => (current === id ? null : id));
  };

  const toggleExpandedEncaissement = (id: string) => {
    setExpandedEncaissementId((current) => (current === id ? null : id));
  };

  `;

  content = content.replace(marker, helper + marker);
}

// 6. Garde-fous : ne pas toucher aux données runtime essentielles.
const requiredMarkers = [
  "relatedRecordsBySection",
  "selectedVehicle",
  "selectedRendezvousId",
  "rendezvous",
  "interventions",
  "lignes",
  "factures",
  "encaissements",
];

for (const marker of requiredMarkers) {
  if (!content.includes(marker)) {
    fail("Required marker disappeared: " + marker);
  }
}

fs.writeFileSync(filePath, content, "utf8");

const checks = [
  {
    label: "Année masquée dans carte véhicule",
    ok: !content.includes("<span className=\"font-medium text-slate-900\">Année :</span>"),
  },
  {
    label: "Carburant masqué dans carte véhicule",
    ok: !content.includes("<span className=\"font-medium text-slate-900\">Carburant :</span>"),
  },
  {
    label: "expandedInterventionId ajouté",
    ok: content.includes("expandedInterventionId") && content.includes("setExpandedInterventionId"),
  },
  {
    label: "expandedFactureId ajouté",
    ok: content.includes("expandedFactureId") && content.includes("setExpandedFactureId"),
  },
  {
    label: "expandedEncaissementId ajouté",
    ok: content.includes("expandedEncaissementId") && content.includes("setExpandedEncaissementId"),
  },
  {
    label: "toggleExpandedIntervention ajouté",
    ok: content.includes("toggleExpandedIntervention"),
  },
  {
    label: "toggleExpandedFacture ajouté",
    ok: content.includes("toggleExpandedFacture"),
  },
  {
    label: "toggleExpandedEncaissement ajouté",
    ok: content.includes("toggleExpandedEncaissement"),
  },
  {
    label: "selectedRendezvousId conservé",
    ok: content.includes("selectedRendezvousId"),
  },
  {
    label: "données hub conservées",
    ok:
      content.includes("relatedRecordsBySection") &&
      content.includes("interventions") &&
      content.includes("lignes") &&
      content.includes("factures") &&
      content.includes("encaissements"),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((check) => check.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-HUB-FLOW-B — Clean vehicle card and prepare expandable state",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Objectif",
  "",
  "- Nettoyer la carte véhicule.",
  "- Masquer Année et Carburant.",
  "- Préparer les états expandables intervention / facture / encaissement.",
  "- Ne pas encore refondre les blocs métier.",
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- ${check.ok ? "OK" : "FAIL"} — ${check.label}`),
  "",
  "## Synthèse",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-HUB-FLOW-B] Clean vehicle card and prepare expandable state");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-HUB-FLOW-B] DONE");
console.log("[NEXT] Run audit, build, UI check.");
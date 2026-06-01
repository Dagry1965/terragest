const fs = require("fs");
const path = require("path");

const root = process.cwd();

const reportRel = "docs/audits/AMARKHYS-HUB-FLOW-A-audit-client-vehicle-flow.md";
const reportPath = path.join(root, reportRel);

const candidates = [
  "src/components/erp/hub",
  "src/runtime/hub",
  "src/app/(private)/clientsauto/hub",
  "src/app/(private)/vehicules/hub",
  "src/components/amarkhys",
  "src/runtime/modules/generated/clientsauto",
  "src/runtime/modules/generated/vehicules",
  "src/runtime/modules/generated/rendezvous",
  "src/runtime/modules/generated/interventionsauto",
  "src/runtime/modules/generated/lignesinterventionauto",
  "src/runtime/modules/generated/facturesauto",
  "src/runtime/modules/generated/encaissementsauto",
];

const patterns = [
  "ERPClientOperationalSheet",
  "VehicleOperationalHub",
  "ClientOperationalHub",
  "selectedVehicle",
  "selectedVehicule",
  "selectedRendez",
  "selectedRdv",
  "selectedAppointment",
  "selectedIntervention",
  "expanded",
  "expandedIntervention",
  "expandedInvoice",
  "expandedPayment",
  "rendezvous",
  "rendezVous",
  "interventionsauto",
  "lignesinterventionauto",
  "facturesauto",
  "encaissementsauto",
  "vehiculeId",
  "rendezVousId",
  "interventionId",
  "factureId",
  "annee",
  "carburant",
  "typeCarburant",
  "kilometrage",
  "immatriculation",
  "model",
  "modele",
  "filter",
  "map(",
  "children",
  "relatedRecordsBySection",
  "line",
  "ligne",
  "paiement",
  "payment",
  "invoice",
  "facture",
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
    const full = path.join(absolute, entry);
    const s = fs.statSync(full);

    if (s.isDirectory()) {
      if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
      out.push(...walk(path.relative(root, full)));
      continue;
    }

    if (/\.(ts|tsx|js|jsx|cjs)$/.test(entry)) {
      out.push(full);
    }
  }

  return out;
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function hitLines(file, content, patterns) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  const lines = content.split(/\r?\n/);
  const hits = [];

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

  return hits;
}

function around(content, lineNumber, before = 8, after = 12) {
  const lines = content.split(/\r?\n/);
  const start = Math.max(0, lineNumber - before - 1);
  const end = Math.min(lines.length, lineNumber + after);
  return lines
    .slice(start, end)
    .map((line, i) => `${start + i + 1}: ${line}`)
    .join("\n");
}

const files = Array.from(new Set(candidates.flatMap(walk)));

const allHits = [];
const fileSummaries = [];

for (const file of files) {
  const content = read(file);
  const hits = hitLines(file, content, patterns);

  if (hits.length > 0) {
    fileSummaries.push({
      file: path.relative(root, file).replace(/\\/g, "/"),
      hits: hits.length,
      hasClientSheet: content.includes("ERPClientOperationalSheet"),
      hasSelectedVehicle: content.includes("selectedVehicle") || content.includes("selectedVehicule"),
      hasSelectedRdv: content.includes("selectedRendez") || content.includes("selectedRdv") || content.includes("selectedAppointment"),
      hasExpanded: content.includes("expanded"),
      hasInterventions: content.includes("interventionsauto"),
      hasLines: content.includes("lignesinterventionauto"),
      hasInvoices: content.includes("facturesauto"),
      hasPayments: content.includes("encaissementsauto"),
    });

    allHits.push(...hits);
  }
}

const strongHits = allHits.filter((hit) =>
  [
    "ERPClientOperationalSheet",
    "selectedVehicle",
    "selectedVehicule",
    "selectedRendez",
    "selectedRdv",
    "selectedAppointment",
    "expanded",
    "rendezvous",
    "rendezVous",
    "interventionsauto",
    "lignesinterventionauto",
    "facturesauto",
    "encaissementsauto",
    "relatedRecordsBySection",
    "annee",
    "carburant",
    "typeCarburant",
  ].includes(hit.pattern)
);

const likelyFiles = fileSummaries
  .filter((item) =>
    item.hasClientSheet ||
    item.hasSelectedVehicle ||
    item.hasSelectedRdv ||
    item.hasExpanded ||
    item.hasInterventions ||
    item.hasLines ||
    item.hasInvoices ||
    item.hasPayments
  )
  .sort((a, b) => b.hits - a.hits);

const checks = [
  {
    label: "composant hub client/véhicule localisé",
    ok: likelyFiles.some((item) => item.hasClientSheet || item.file.includes("hub")),
  },
  {
    label: "sélection véhicule détectée",
    ok: likelyFiles.some((item) => item.hasSelectedVehicle),
  },
  {
    label: "rendez-vous détectés",
    ok: allHits.some((hit) => hit.pattern === "rendezvous" || hit.pattern === "rendezVous"),
  },
  {
    label: "interventions détectées",
    ok: allHits.some((hit) => hit.pattern === "interventionsauto"),
  },
  {
    label: "lignes intervention détectées",
    ok: allHits.some((hit) => hit.pattern === "lignesinterventionauto"),
  },
  {
    label: "factures détectées",
    ok: allHits.some((hit) => hit.pattern === "facturesauto"),
  },
  {
    label: "encaissements détectés",
    ok: allHits.some((hit) => hit.pattern === "encaissementsauto"),
  },
  {
    label: "logique expandable existante ou absente à confirmer",
    ok: allHits.some((hit) => hit.pattern === "expanded"),
  },
  {
    label: "champs véhicule à masquer localisés",
    ok:
      allHits.some((hit) => hit.pattern === "annee") ||
      allHits.some((hit) => hit.pattern === "carburant") ||
      allHits.some((hit) => hit.pattern === "typeCarburant"),
  },
];

const okCount = checks.filter((check) => check.ok).length;
const failCount = checks.length - okCount;

const report = [];

report.push("# AMARKHYS-HUB-FLOW-A — Audit client/vehicle operational flow");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
report.push("");
report.push("## Objectif");
report.push("");
report.push("Auditer la fiche client opérationnelle avant refonte hiérarchique expandable.");
report.push("");
report.push("## Règle cible");
report.push("");
report.push("- Véhicule : carte propre, sans année/carburant/cadre gris vide.");
report.push("- Rendez-vous : liste sélectionnable, non expandable.");
report.push("- Interventions : filtrées par rendez-vous sélectionné, expandables.");
report.push("- Expansion intervention : synthèse, lignes d’intervention, totaux, actions.");
report.push("- Factures : expandables.");
report.push("- Encaissements : expandables.");
report.push("- Ne pas mélanger les niveaux métier.");
report.push("");
report.push("## Synthèse");
report.push("");
report.push(`- OK: ${okCount}`);
report.push(`- FAIL: ${failCount}`);
report.push(`- Files scanned: ${files.length}`);
report.push(`- Hits: ${allHits.length}`);
report.push(`- Strong hits: ${strongHits.length}`);
report.push("");
report.push("## Checks");
report.push("");
for (const check of checks) {
  report.push(`- ${check.ok ? "OK" : "FAIL"} — ${check.label}`);
}
report.push("");
report.push("## Fichiers probablement concernés");
report.push("");
for (const item of likelyFiles.slice(0, 30)) {
  report.push(`- ${item.file} — hits=${item.hits} — selectedVehicle=${item.hasSelectedVehicle} — selectedRdv=${item.hasSelectedRdv} — expanded=${item.hasExpanded} — interventions=${item.hasInterventions} — lines=${item.hasLines} — invoices=${item.hasInvoices} — payments=${item.hasPayments}`);
}
report.push("");
report.push("## Strong hits");
report.push("");
for (const hit of strongHits.slice(0, 300)) {
  report.push(`- ${hit.file}:${hit.line} — ${hit.pattern} — ${hit.text}`);
}
report.push("");
report.push("## Extraits clés");
report.push("");

for (const item of likelyFiles.slice(0, 8)) {
  const file = path.join(root, item.file);
  const content = read(file);
  const firstHit = strongHits.find((hit) => hit.file === item.file) || allHits.find((hit) => hit.file === item.file);

  if (!firstHit) continue;

  report.push(`### ${item.file}`);
  report.push("");
  report.push("```ts");
  report.push(around(content, firstHit.line, 10, 18));
  report.push("```");
  report.push("");
}

report.push("## Décision attendue après audit");
report.push("");
report.push("- Identifier le composant exact à modifier.");
report.push("- Ne pas créer un composant AMARKHYS isolé si le hub générique peut être renforcé.");
report.push("- Préférer une structure expandable générique : parent → selected child → expandable grandchildren.");
report.push("- Faire une correction progressive : véhicule clean, puis séparation RDV/interventions, puis expansion intervention, puis factures/encaissements.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-HUB-FLOW-A] Audit client/vehicle operational flow");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);
console.log("[FILES]", files.length);
console.log("[HITS]", allHits.length);
console.log("[STRONG_HITS]", strongHits.length);
console.log("[NEXT] Extract failures and key files.");
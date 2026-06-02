const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET = path.join(ROOT, "src/components/erp/shell/ErpSidebar.tsx");
const REPORT = path.join(ROOT, "docs/audits/AMARKHYS-HUB-SIDEBAR-CONTEXT-FIX.md");
const BACKUP = TARGET + ".bak-amarkhys-sidebar-context-fix";

function fail(message) {
  console.error("[FAIL] " + message);
  process.exit(1);
}

function ok(message) {
  console.log("[OK] " + message);
}

if (!fs.existsSync(TARGET)) {
  fail("Fichier introuvable: " + TARGET);
}

const before = fs.readFileSync(TARGET, "utf8");
fs.writeFileSync(BACKUP, before, "utf8");

let content = before;

const prefixesBlock = `const AMARKHYS_ROUTE_PREFIXES = [
  "/dashboard/amarkhys",
  "/clientsauto",
  "/vehicules",
  "/rendezvous",
  "/interventionsauto",
  "/lignesinterventionauto",
  "/facturesauto",
  "/encaissementsauto",
  "/echeancespaiementauto",
  "/rappelsauto",
  "/produitsauto",
  "/stocksauto",
  "/mouvementsstockauto",
  "/fournisseursauto",
  "/commandesstockauto",
  "/lignescommandestockauto",
  "/receptionsstockauto",
] as const;

function isAmarkhysPath(pathname: string): boolean {
  return AMARKHYS_ROUTE_PREFIXES.some((prefix) => {
    return pathname === prefix || pathname.startsWith(prefix + "/");
  });
}
`;

// Supprimer ancien bloc de préfixes si une tentative partielle existe.
content = content.replace(
  /const AMARKHYS_ROUTE_PREFIXES = \[[\s\S]*?\] as const;\s*/m,
  ""
);

// Remplacer la fonction existante isAmarkhysPath.
const fnRegex = /function isAmarkhysPath\s*\(\s*pathname:\s*string\s*\):\s*boolean\s*\{[\s\S]*?\n\}/m;

if (!fnRegex.test(content)) {
  fail("Fonction isAmarkhysPath introuvable.");
}

content = content.replace(fnRegex, prefixesBlock);

// Ajouter Encaissements dans la navigation visible AMARKHYS si absent.
if (!content.includes('key: "encaissementsauto"')) {
  const facturesBlock = `  {
    key: "facturesauto",
    label: "Factures",
    href: "/facturesauto",
  },`;

  const encaissementsBlock = `${facturesBlock}
  {
    key: "encaissementsauto",
    label: "Encaissements",
    href: "/encaissementsauto",
  },`;

  if (content.includes(facturesBlock)) {
    content = content.replace(facturesBlock, encaissementsBlock);
  } else {
    console.log("[INFO] Bloc facturesauto non trouvé pour insertion navigation visible. Détection route quand même corrigée.");
  }
}

const checks = [
  ["prefixes added", content.includes("const AMARKHYS_ROUTE_PREFIXES = [")],
  ["clientsauto route", content.includes('"/clientsauto"')],
  ["vehicules route", content.includes('"/vehicules"')],
  ["rendezvous route", content.includes('"/rendezvous"')],
  ["interventionsauto route", content.includes('"/interventionsauto"')],
  ["lignesinterventionauto route", content.includes('"/lignesinterventionauto"')],
  ["facturesauto route", content.includes('"/facturesauto"')],
  ["encaissementsauto route", content.includes('"/encaissementsauto"')],
  ["prefix detection", content.includes("AMARKHYS_ROUTE_PREFIXES.some")],
];

const failed = checks.filter(([, passed]) => !passed);

if (failed.length > 0) {
  fail("Checks failed: " + failed.map(([name]) => name).join(", "));
}

fs.writeFileSync(TARGET, content, "utf8");

fs.writeFileSync(
  REPORT,
  [
    "# AMARKHYS-HUB-SIDEBAR-CONTEXT-FIX",
    "",
    "## Objectif",
    "",
    "Stabiliser la sidebar AMARKHYS quand on navigue depuis la fiche client opérationnelle.",
    "",
    "## Correction",
    "",
    "- Centralisation des routes AMARKHYS dans AMARKHYS_ROUTE_PREFIXES.",
    "- Ajout /lignesinterventionauto.",
    "- Ajout /encaissementsauto.",
    "- Ajout /echeancespaiementauto.",
    "- Conservation des routes client, véhicule, RDV, intervention, facture, stock et commandes.",
    "",
    "## Validation attendue",
    "",
    "- La sidebar reste AMARKHYS sur les pages ouvertes depuis la fiche client opérationnelle.",
    "- Véhicule, RDV, intervention, ligne, facture, encaissement restent dans le contexte AMARKHYS.",
    "",
    "## Checks",
    "",
    ...checks.map(([name, passed]) => "- " + (passed ? "OK" : "FAIL") + " — " + name),
    "",
  ].join("\n"),
  "utf8"
);

ok("ErpSidebar patched");
ok("Report written");
console.log("[AMARKHYS-HUB-SIDEBAR-CONTEXT-FIX] DONE");
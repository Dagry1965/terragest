const fs = require("fs");
const path = require("path");

const root = process.cwd();
const reportPath = path.join(root, "docs", "audits", "Q2-OG-client-hub-product-review.md");

const checks = [];

function add(scope, status, severity, message) {
  checks.push({ scope, status, severity, message });
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function walk(dir, predicate, results = []) {
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, predicate, results);
      continue;
    }

    if (predicate(full)) results.push(full);
  }

  return results;
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

console.log("[Q2-OG] Client Hub product review audit");
console.log("[ROOT] " + root);

const requiredFiles = [
  "src/app/(private)/clientsauto/hub/page.tsx",
  "src/runtime/hub/RuntimeClientOperationalHubLoader.ts",
  "src/components/erp/hub/ERPRecordHubPage.tsx",
  "src/components/erp/hub/ERPRecordHubHeader.tsx",
  "src/components/erp/hub/ERPRecordHubKpiStrip.tsx",
  "src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx",
  "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",
  "src/runtime/hub/RuntimeHubTypes.ts",
  "src/runtime/hub/RuntimeHubRelationResolver.ts",
];

for (const file of requiredFiles) {
  if (exists(file)) {
    add("files", "OK", "HIGH", "Found " + file);
  } else {
    add("files", "FAIL", "HIGH", "Missing " + file);
  }
}

const route = exists("src/app/(private)/clientsauto/hub/page.tsx")
  ? read("src/app/(private)/clientsauto/hub/page.tsx")
  : "";

const loader = exists("src/runtime/hub/RuntimeClientOperationalHubLoader.ts")
  ? read("src/runtime/hub/RuntimeClientOperationalHubLoader.ts")
  : "";

const page = exists("src/components/erp/hub/ERPRecordHubPage.tsx")
  ? read("src/components/erp/hub/ERPRecordHubPage.tsx")
  : "";

const primary = exists("src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx")
  ? read("src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx")
  : "";

const details = exists("src/components/erp/hub/ERPRecordHubSelectedDetails.tsx")
  ? read("src/components/erp/hub/ERPRecordHubSelectedDetails.tsx")
  : "";

const productMarkers = [
  [route, "Fiche Client Opérationnelle", "Route exposes Client Operational Hub label"],
  [route, "selectedVehicleId", "Route supports selectedVehicleId"],
  [route, "selectionQueryParam", "Route config uses selectionQueryParam"],
  [route, "open-vehicle", "Route config has vehicle navigation action"],
  [route, "open-intervention", "Route config has intervention navigation action"],
  [route, "open-facture", "Route config has invoice navigation action"],
  [loader, "interventionsautoModule", "Loader uses interventions module"],
  [loader, "facturesautoModule", "Loader uses invoices module"],
  [loader, "relatedRecordsBySection.interventions", "Loader fills interventions section"],
  [loader, "relatedRecordsBySection.factures", "Loader fills invoices section"],
  [page, "useRouter", "Hub page synchronizes selection with URL"],
  [page, "max-w-[1600px]", "Hub uses wider layout"],
  [route, "Fiche véhicule", "Route config exposes vehicle navigation label"],
  [details, "Dossier sélectionné", "Selected details has contextual title"],
  [details, "hrefTemplate", "Selected details renders actions from metadata"],
];

for (const [content, marker, message] of productMarkers) {
  if (content.includes(marker)) {
    add("product-markers", "OK", "MEDIUM", message);
  } else {
    add("product-markers", "FAIL", "HIGH", "Missing marker: " + marker + " — " + message);
  }
}

const forbiddenUiPatterns = [
  "firebase/firestore",
  "getDocs(",
  "collection(",
];

for (const file of [
  "src/app/(private)/clientsauto/hub/page.tsx",
  "src/components/erp/hub/ERPRecordHubPage.tsx",
  "src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx",
  "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",
]) {
  if (!exists(file)) continue;

  const content = read(file);

  for (const pattern of forbiddenUiPatterns) {
    if (content.includes(pattern)) {
      add("ui-boundary", "FAIL", "HIGH", "Forbidden local Firestore marker " + pattern + " in " + file);
    }
  }
}

add("manual-review", "INFO", "LOW", "Open /clientsauto/hub");
add("manual-review", "INFO", "LOW", "Verify client header shows real client identity");
add("manual-review", "INFO", "LOW", "Verify vehicle cards/table are readable");
add("manual-review", "INFO", "LOW", "Click a vehicle and verify selectedVehicleId changes in URL");
add("manual-review", "INFO", "LOW", "Verify interventions and factures update for selected vehicle");
add("manual-review", "INFO", "LOW", "Verify buttons: Fiche véhicule, Fiche intervention, Facture complète");
add("manual-review", "INFO", "LOW", "Verify layout is comfortable on wide screen and not overloaded");

const backups = walk(root, (file) => path.basename(file).includes(".bak-q2og"));

if (backups.length > 0) {
  for (const backup of backups) {
    add("cleanup", "FAIL", "HIGH", "Q2-OG backup still present: " + rel(backup));
  }
} else {
  add("cleanup", "OK", "HIGH", "No Q2-OG backup detected");
}

const ok = checks.filter((check) => check.status === "OK");
const info = checks.filter((check) => check.status === "INFO");
const warn = checks.filter((check) => check.status === "WARN");
const fail = checks.filter((check) => check.status === "FAIL");
const highFail = checks.filter((check) => check.status === "FAIL" && check.severity === "HIGH");

const lines = [];

lines.push("# Q2-OG — Client Operational Hub Product Review");
lines.push("");
lines.push("- Date: " + new Date().toISOString());
lines.push("- Root: `" + root + "`");
lines.push("");
lines.push("## Objectif");
lines.push("");
lines.push("Valider visuellement et fonctionnellement le Client Operational Hub : `/clientsauto/hub`.");
lines.push("");
lines.push("Cette passe ne modifie pas le produit. Elle sert à décider si le hub client est démontrable ou s’il nécessite une correction ciblée.");
lines.push("");
lines.push("## Résumé technique");
lines.push("");
lines.push("- OK: " + ok.length);
lines.push("- INFO: " + info.length);
lines.push("- WARN: " + warn.length);
lines.push("- FAIL: " + fail.length);
lines.push("- HIGH FAIL: " + highFail.length);
lines.push("");
lines.push("## Checklist visuelle manuelle");
lines.push("");
lines.push("### Route");
lines.push("- [ ] Ouvrir `/clientsauto/hub`");
lines.push("- [ ] Ouvrir `/clientsauto/hub?clientId=<id-client>`");
lines.push("- [ ] Ouvrir `/clientsauto/hub?clientId=<id-client>&selectedVehicleId=<id-vehicule>`");
lines.push("");
lines.push("### En-tête client");
lines.push("- [ ] Nom / prénom ou raison sociale lisibles");
lines.push("- [ ] Type client visible");
lines.push("- [ ] Statut visible");
lines.push("- [ ] Informations client non cassées si champ absent");
lines.push("");
lines.push("### Véhicules");
lines.push("- [ ] Véhicules filtrés par client");
lines.push("- [ ] Particulier : affichage cartes si typeClient correspond");
lines.push("- [ ] Flotte / Entreprise : affichage tableau si typeClient correspond");
lines.push("- [ ] Sélection véhicule claire");
lines.push("- [ ] Bouton `Fiche véhicule` visible et fonctionnel");
lines.push("");
lines.push("### Détails contextuels");
lines.push("- [ ] Le panneau `Dossier sélectionné` affiche le véhicule sélectionné");
lines.push("- [ ] Les interventions liées au véhicule apparaissent");
lines.push("- [ ] Les factures liées au véhicule apparaissent");
lines.push("- [ ] Les boutons `Fiche intervention` et `Facture complète` apparaissent si données présentes");
lines.push("");
lines.push("### UX générale");
lines.push("- [ ] Page utilise correctement la largeur");
lines.push("- [ ] Page dense mais pas surchargée");
lines.push("- [ ] Lecture agréable");
lines.push("- [ ] Responsive acceptable");
lines.push("- [ ] Aucun bloc vide gênant");
lines.push("");
lines.push("## Checks techniques");
lines.push("");
lines.push("| Scope | Status | Severity | Message |");
lines.push("|---|---:|---:|---|");

for (const check of checks) {
  lines.push("| " + check.scope + " | " + check.status + " | " + check.severity + " | " + check.message.replaceAll("|", "\\|") + " |");
}

lines.push("");
lines.push("## Décision");
lines.push("");

if (highFail.length > 0) {
  lines.push("Q2-OG n’est pas validé techniquement. Corriger les HIGH FAIL avant revue visuelle.");
} else {
  lines.push("Q2-OG est prêt pour revue visuelle manuelle. Si la checklist est OK, le Client Operational Hub est démontrable.");
}

fs.writeFileSync(reportPath, lines.join("\n"), "utf8");

console.log("[REPORT] " + rel(reportPath));
console.log("[OK] " + ok.length);
console.log("[INFO] " + info.length);
console.log("[WARN] " + warn.length);
console.log("[FAIL] " + fail.length);
console.log("[FAIL_HIGH] " + highFail.length);

if (highFail.length > 0) {
  process.exit(1);
}

console.log("[Q2-OG] Product review audit completed without HIGH failure.");
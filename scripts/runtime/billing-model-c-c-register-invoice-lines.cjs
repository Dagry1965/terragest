const fs = require("fs");
const path = require("path");

const root = process.cwd();

const coreModulesPath = path.join(root, "src", "runtime", "modules", "definitions", "coreModules.ts");
const indexPath = path.join(root, "src", "runtime", "modules", "index.ts");
const facturesPath = path.join(root, "src", "runtime", "modules", "generated", "facturesauto", "facturesauto.module.ts");
const lignesPath = path.join(root, "src", "runtime", "modules", "generated", "lignesfactureauto", "lignesfactureauto.module.ts");
const reportPath = path.join(root, "docs", "audits", "BILLING-MODEL-C-C-register-invoice-lines.md");

const passName = "BILLING-MODEL-C-C";

function fail(message) {
  console.error(`[${passName}] FAIL: ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[${passName}] OK: ${message}`);
}

function backup(file) {
  const backupPath = `${file}.bak-billing-model-c-c`;
  if (!fs.existsSync(backupPath)) {
    fs.writeFileSync(backupPath, fs.readFileSync(file, "utf8"), "utf8");
    ok(`Backup created: ${backupPath}`);
  }
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

for (const required of [coreModulesPath, indexPath, facturesPath, lignesPath]) {
  if (!fs.existsSync(required)) {
    fail(`Required file not found: ${required}`);
  }
}

let core = read(coreModulesPath);
let index = read(indexPath);
let factures = read(facturesPath);

backup(coreModulesPath);
backup(indexPath);
backup(facturesPath);

let changedCore = false;
let changedIndex = false;
let changedFactures = false;

// 1) coreModules.ts import
if (!core.includes("lignesfactureautoModule")) {
  const importLine = `import { lignesfactureautoModule } from "../generated/lignesfactureauto/lignesfactureauto.module";\n`;

  const lastGeneratedImportMatch = [...core.matchAll(/^import\s+\{[^}]+Module\s+\}\s+from\s+["']\.\.\/generated\/[^"']+["'];\s*$/gm)].pop();

  if (lastGeneratedImportMatch) {
    const insertAt = lastGeneratedImportMatch.index + lastGeneratedImportMatch[0].length;
    core = core.slice(0, insertAt) + "\n" + importLine.trimEnd() + core.slice(insertAt);
  } else {
    core = importLine + core;
  }

  changedCore = true;
  ok("Added lignesfactureautoModule import to coreModules.ts");
}

// 2) coreModules.ts array registration
if (!/coreModules\s*[:=]/.test(core) && !/export\s+const\s+\w+Modules/.test(core)) {
  ok("Could not detect coreModules array name with broad regex; will try generic module array insertion.");
}

if (!core.includes("lignesfactureautoModule,")) {
  const arrayMarkers = [
    "encaissementsautoModule,",
    "facturesautoModule,",
  ];

  let inserted = false;

  for (const marker of arrayMarkers) {
    const indexOfMarker = core.indexOf(marker);
    if (indexOfMarker !== -1) {
      const insertAt = indexOfMarker + marker.length;
      core = core.slice(0, insertAt) + "\n  lignesfactureautoModule," + core.slice(insertAt);
      inserted = true;
      changedCore = true;
      ok(`Registered lignesfactureautoModule after ${marker}`);
      break;
    }
  }

  if (!inserted) {
    const closingArray = core.lastIndexOf("];");
    if (closingArray === -1) {
      fail("Could not find module array closing in coreModules.ts");
    }
    core = core.slice(0, closingArray) + "  lignesfactureautoModule,\n" + core.slice(closingArray);
    changedCore = true;
    ok("Registered lignesfactureautoModule before last array closing.");
  }
}

// 3) index.ts export
if (!index.includes("lignesfactureauto")) {
  const exportLine = `export { lignesfactureautoModule } from "./generated/lignesfactureauto/lignesfactureauto.module";\n`;
  index = index.trimEnd() + "\n" + exportLine;
  changedIndex = true;
  ok("Added lignesfactureautoModule export to index.ts");
}

// 4) facturesauto children panel
if (!factures.includes('moduleKey: "lignesfactureauto"')) {
  const childBlock = `      {
        key: "lignes-facture",
        moduleKey: "lignesfactureauto",
        foreignKey: "factureId",
        title: "Lignes facture",
        description: "Lignes financières rattachées à cette facture.",
        displayIn: [],
        lazy: true,
        position: "after",
        allowCreate: false,
        createLabel: "Ajouter une ligne facture",
        openLabel: "Ouvrir ligne facture",
        parentSnapshotFields: {
          factureId: "id",
          clientId: "clientId",
          vehiculeId: "vehiculeId",
          interventionId: "interventionId",
        },
        lockFields: ["factureId", "clientId", "vehiculeId", "interventionId"],
        relationLabels: {
          clientId: {
            moduleKey: "clientsauto",
            labelFields: ["prenom", "nom", "telephone"],
          },
          vehiculeId: {
            moduleKey: "vehicules",
            labelFields: ["marque", "modele", "immatriculation"],
          },
          interventionId: {
            moduleKey: "interventionsauto",
            labelFields: ["typeIntervention", "dateIntervention", "statut"],
          },
        },
      },
`;

  const encaissementsMarker = `      {
        key: "encaissements-facture",`;

  const markerIndex = factures.indexOf(encaissementsMarker);

  if (markerIndex === -1) {
    fail("Could not find encaissements-facture child marker in facturesauto.module.ts");
  }

  factures = factures.slice(0, markerIndex) + childBlock + factures.slice(markerIndex);
  changedFactures = true;
  ok("Added Lignes facture child panel before Encaissements.");
}

if (changedCore) write(coreModulesPath, core);
if (changedIndex) write(indexPath, index);
if (changedFactures) write(facturesPath, factures);

let report = "# BILLING-MODEL-C-C — Register invoice lines\n\n";
report += "## Résultat\n\n";
report += `- coreModules.ts modifié : ${changedCore ? "oui" : "non"}\n`;
report += `- index.ts modifié : ${changedIndex ? "oui" : "non"}\n`;
report += `- facturesauto.module.ts modifié : ${changedFactures ? "oui" : "non"}\n\n`;
report += "## Cible\n\n";
report += "- `lignesfactureautoModule` enregistré dans le runtime.\n";
report += "- `facturesauto` affiche un panneau enfant `Lignes facture` filtré strictement par `foreignKey: factureId`.\n";
report += "- Aucun fallback global n'est introduit.\n";

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
write(reportPath, report);

ok(`Report written: ${path.relative(root, reportPath)}`);
ok("Next: run npm run build.");

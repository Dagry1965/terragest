const fs = require("fs");
const path = require("path");

const root = process.cwd();

const coreModulesPath = path.join(root, "src", "runtime", "modules", "definitions", "coreModules.ts");
const indexPath = path.join(root, "src", "runtime", "modules", "index.ts");
const facturesPath = path.join(root, "src", "runtime", "modules", "generated", "facturesauto", "facturesauto.module.ts");
const lignesPath = path.join(root, "src", "runtime", "modules", "generated", "lignesfactureauto", "lignesfactureauto.module.ts");
const reportPath = path.join(root, "docs", "audits", "BILLING-MODEL-C-C-register-invoice-lines.md");

const passName = "BILLING-MODEL-C-C2";

function fail(message) {
  console.error(`[${passName}] FAIL: ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[${passName}] OK: ${message}`);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file) {
  const backupPath = `${file}.bak-billing-model-c-c2`;
  if (!fs.existsSync(backupPath)) {
    fs.writeFileSync(backupPath, read(file), "utf8");
    ok(`Backup created: ${backupPath}`);
  }
}

for (const file of [coreModulesPath, indexPath, facturesPath, lignesPath]) {
  if (!fs.existsSync(file)) {
    fail(`Required file not found: ${file}`);
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

if (!core.includes("lignesfactureautoModule")) {
  const importLine = `import { lignesfactureautoModule } from "../generated/lignesfactureauto/lignesfactureauto.module";`;

  const imports = [...core.matchAll(/^import\s+\{[^}]+Module\s+\}\s+from\s+["']\.\.\/generated\/[^"']+["'];\s*$/gm)];
  if (imports.length > 0) {
    const last = imports[imports.length - 1];
    const insertAt = last.index + last[0].length;
    core = core.slice(0, insertAt) + "\n" + importLine + core.slice(insertAt);
  } else {
    core = importLine + "\n" + core;
  }

  changedCore = true;
  ok("Added lignesfactureautoModule import to coreModules.ts");
}

if (!core.includes("lignesfactureautoModule,")) {
  const preferredMarkers = ["encaissementsautoModule,", "facturesautoModule,"];
  let inserted = false;

  for (const marker of preferredMarkers) {
    const markerIndex = core.indexOf(marker);
    if (markerIndex !== -1) {
      const insertAt = markerIndex + marker.length;
      core = core.slice(0, insertAt) + "\n  lignesfactureautoModule," + core.slice(insertAt);
      inserted = true;
      changedCore = true;
      ok(`Registered lignesfactureautoModule after ${marker}`);
      break;
    }
  }

  if (!inserted) {
    const lastArrayClose = core.lastIndexOf("];");
    if (lastArrayClose === -1) {
      fail("Could not locate module array in coreModules.ts");
    }
    core = core.slice(0, lastArrayClose) + "  lignesfactureautoModule,\n" + core.slice(lastArrayClose);
    changedCore = true;
    ok("Registered lignesfactureautoModule before final array close");
  }
}

if (!index.includes("lignesfactureautoModule")) {
  index =
    index.trimEnd() +
    `\nexport { lignesfactureautoModule } from "./generated/lignesfactureauto/lignesfactureauto.module";\n`;

  changedIndex = true;
  ok("Added lignesfactureautoModule export to index.ts");
}

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

  const encaissementsIndex = factures.indexOf('moduleKey: "encaissementsauto"');

  if (encaissementsIndex === -1) {
    fail('Could not find moduleKey: "encaissementsauto" in facturesauto.module.ts');
  }

  const childStart = factures.lastIndexOf("\n      {", encaissementsIndex);

  if (childStart === -1) {
    fail("Could not find start of encaissements child block.");
  }

  factures = factures.slice(0, childStart + 1) + childBlock + factures.slice(childStart + 1);
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
report += "## Garantie métier\n\n";
report += "- `lignesfactureauto` est rattaché à `facturesauto` via `foreignKey: factureId`.\n";
report += "- Le panneau enfant est ajouté avant `Encaissements`.\n";
report += "- Aucun fallback global n'est introduit.\n";

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
write(reportPath, report);

ok(`Report written: ${path.relative(root, reportPath)}`);
ok("Next: run npm run build.");

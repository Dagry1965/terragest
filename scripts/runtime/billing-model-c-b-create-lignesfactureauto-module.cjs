const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targetDir = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "lignesfactureauto"
);

const targetFile = path.join(targetDir, "lignesfactureauto.module.ts");

const referenceFile = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "encaissementsauto",
  "encaissementsauto.module.ts"
);

const facturesFile = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "facturesauto",
  "facturesauto.module.ts"
);

const reportPath = path.join(
  root,
  "docs",
  "audits",
  "BILLING-MODEL-C-B-create-lignesfactureauto-module.md"
);

const passName = "BILLING-MODEL-C-B";

function fail(message) {
  console.error(`[${passName}] FAIL: ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[${passName}] OK: ${message}`);
}

function info(message) {
  console.log(`[${passName}] ${message}`);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

if (!fs.existsSync(referenceFile)) {
  fail(`Reference module not found: ${referenceFile}`);
}

if (!fs.existsSync(facturesFile)) {
  fail(`Factures module not found: ${facturesFile}`);
}

if (fs.existsSync(targetFile)) {
  fail(`Target module already exists. Refusing to overwrite: ${targetFile}`);
}

const reference = read(referenceFile);

const importMatch = reference.match(/import\s+type\s+\{\s*ERPModule\s*\}\s+from\s+["']([^"']+)["'];/)
  || reference.match(/import\s+\{\s*ERPModule\s*\}\s+from\s+["']([^"']+)["'];/);

if (!importMatch) {
  fail("Could not detect ERPModule import path from encaissementsauto.module.ts");
}

const erpModuleImportPath = importMatch[1];

const moduleContent = `import type { ERPModule } from "${erpModuleImportPath}";

export const lignesfactureautoModule: ERPModule = {
  key: "lignesfactureauto",
  label: "Lignes facture",
  description: "Lignes financières facturées, sourcées depuis un parcours métier.",
  collection: "lignesfactureauto",
  icon: "ReceiptText",
  category: "Facturation",

  schema: {
    fields: [
      {
        key: "factureId",
        label: "Facture",
        type: "relation",
        required: true,
        module: "facturesauto",
      },
      {
        key: "designation",
        label: "Désignation",
        type: "text",
        required: true,
        list: { visible: true, order: 1 },
        grid: { cols: 6 },
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        required: false,
        grid: { cols: 12 },
      },
      {
        key: "quantite",
        label: "Quantité",
        type: "number",
        required: true,
        defaultValue: 1,
        list: { visible: true, order: 2 },
        grid: { cols: 3 },
      },
      {
        key: "prixUnitaireHT",
        label: "Prix unitaire HT",
        type: "number",
        required: true,
        defaultValue: 0,
        list: { visible: true, order: 3 },
        grid: { cols: 3 },
      },
      {
        key: "montantHT",
        label: "Montant HT",
        type: "number",
        required: false,
        defaultValue: 0,
        list: { visible: true, order: 4 },
        grid: { cols: 3 },
      },
      {
        key: "tauxTVA",
        label: "Taux TVA",
        type: "number",
        required: false,
        defaultValue: 18,
        grid: { cols: 3 },
      },
      {
        key: "montantTVA",
        label: "Montant TVA",
        type: "number",
        required: false,
        defaultValue: 0,
        grid: { cols: 3 },
      },
      {
        key: "montantTTC",
        label: "Montant TTC",
        type: "number",
        required: false,
        defaultValue: 0,
        list: { visible: true, order: 5 },
        grid: { cols: 3 },
      },
      {
        key: "statutLigne",
        label: "Statut ligne",
        type: "select",
        required: true,
        defaultValue: "brouillon",
        options: [
          { value: "brouillon", label: "Brouillon" },
          { value: "validee", label: "Validée" },
          { value: "annulee", label: "Annulée" },
        ],
        list: { visible: true, order: 6 },
        grid: { cols: 3 },
      },
      {
        key: "sourceType",
        label: "Type de source",
        type: "select",
        required: false,
        options: [
          { value: "atelier", label: "Atelier" },
          { value: "boutique", label: "Boutique" },
          { value: "commande", label: "Commande" },
          { value: "autre", label: "Autre" },
        ],
        grid: { cols: 3 },
      },
      {
        key: "sourceModule",
        label: "Module source",
        type: "text",
        required: false,
        grid: { cols: 3 },
      },
      {
        key: "sourceRecordId",
        label: "Enregistrement source",
        type: "text",
        required: false,
        grid: { cols: 3 },
      },
      {
        key: "sourceLineId",
        label: "Ligne source",
        type: "text",
        required: false,
        grid: { cols: 3 },
      },
      {
        key: "clientId",
        label: "Client",
        type: "relation",
        required: false,
        module: "clientsauto",
        grid: { cols: 4 },
      },
      {
        key: "vehiculeId",
        label: "Véhicule",
        type: "relation",
        required: false,
        module: "vehicules",
        grid: { cols: 4 },
      },
      {
        key: "interventionId",
        label: "Intervention",
        type: "relation",
        required: false,
        module: "interventionsauto",
        grid: { cols: 4 },
      },
      {
        key: "venteId",
        label: "Vente",
        type: "text",
        required: false,
        grid: { cols: 4 },
      },
      {
        key: "produitId",
        label: "Produit",
        type: "relation",
        required: false,
        module: "produitsauto",
        grid: { cols: 4 },
      },
    ],
  },

  form: {
    layout: "tabs",
    tabs: [
      {
        key: "general",
        label: "Ligne facture",
        sections: [
          {
            key: "identite",
            label: "Identification",
            fields: [
              "factureId",
              "designation",
              "description",
              "statutLigne",
            ],
          },
          {
            key: "montants",
            label: "Montants",
            fields: [
              "quantite",
              "prixUnitaireHT",
              "montantHT",
              "tauxTVA",
              "montantTVA",
              "montantTTC",
            ],
          },
          {
            key: "origine",
            label: "Origine métier",
            fields: [
              "sourceType",
              "sourceModule",
              "sourceRecordId",
              "sourceLineId",
              "clientId",
              "vehiculeId",
              "interventionId",
              "venteId",
              "produitId",
            ],
          },
        ],
      },
    ],
  },

  composition: {
    labelFields: ["designation", "montantTTC", "statutLigne"],

    contextBanner: {
      title: "Contexte ligne facture",
      subtitle: "Ligne financière rattachée à une facture",
      relationFields: ["factureId", "clientId", "vehiculeId", "interventionId"],
    },

    readOnlyFields: [
      "factureId",
      "clientId",
      "vehiculeId",
      "interventionId",
      "sourceModule",
      "sourceRecordId",
      "sourceLineId",
      "montantHT",
      "montantTVA",
      "montantTTC",
    ],

    lockedFields: [
      "factureId",
      "clientId",
      "vehiculeId",
      "interventionId",
      "sourceModule",
      "sourceRecordId",
      "sourceLineId",
      "montantHT",
      "montantTVA",
      "montantTTC",
    ],

    relations: [
      {
        field: "factureId",
        module: "facturesauto",
        label: "Facture",
      },
      {
        field: "clientId",
        module: "clientsauto",
        label: "Client",
      },
      {
        field: "vehiculeId",
        module: "vehicules",
        label: "Véhicule",
      },
      {
        field: "interventionId",
        module: "interventionsauto",
        label: "Intervention",
      },
      {
        field: "produitId",
        module: "produitsauto",
        label: "Produit",
      },
    ],

    requiresParentContext: true,
    allowedParents: [
      {
        module: "facturesauto",
        foreignKey: "factureId",
      },
    ],
  },
};
`;

fs.mkdirSync(targetDir, { recursive: true });
fs.writeFileSync(targetFile, moduleContent, "utf8");

let report = "";
report += "# BILLING-MODEL-C-B — Création lignesfactureauto\\n\\n";
report += "## Résultat\\n\\n";
report += "- Module créé : `src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts`\\n";
report += "- Parent obligatoire : `facturesauto` via `factureId`\\n";
report += "- Module conçu comme enfant financier générique de facture.\\n";
report += "- Aucun moteur de calcul n'est encore branché dans cette passe.\\n";
report += "- Aucun fallback d'affichage global n'est introduit.\\n\\n";
report += "## Champs clés\\n\\n";
report += "- `factureId`\\n";
report += "- `designation`\\n";
report += "- `quantite`\\n";
report += "- `prixUnitaireHT`\\n";
report += "- `montantHT`\\n";
report += "- `montantTVA`\\n";
report += "- `montantTTC`\\n";
report += "- `sourceType`\\n";
report += "- `sourceModule`\\n";
report += "- `sourceRecordId`\\n";
report += "- `sourceLineId`\\n";
report += "- `clientId`\\n";
report += "- `vehiculeId`\\n";
report += "- `interventionId`\\n";
report += "- `produitId`\\n";
report += "- `statutLigne`\\n\\n";
report += "## Prochaine passe\\n\\n";
report += "BILLING-MODEL-C-C : enregistrer `lignesfactureautoModule` dans le registry runtime et ajouter le panneau enfant dans `facturesauto` si nécessaire.\\n";

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

ok(`Created module: ${path.relative(root, targetFile)}`);
ok(`Created report: ${path.relative(root, reportPath)}`);
info("Next: run npm run build. If registry does not include the module yet, next pass will wire it.");

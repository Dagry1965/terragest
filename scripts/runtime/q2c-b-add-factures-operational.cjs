const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rel = "src/runtime/modules/generated/facturesauto/facturesauto.module.ts";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + file);
}

const original = fs.readFileSync(file, "utf8");
let content = original;

fs.writeFileSync(
  file + ".bak-q2c-b-add-factures-operational",
  original,
  "utf8"
);

if (content.includes("operational:")) {
  console.log("[INFO] facturesauto.operational existe déjà. Aucun ajout.");
  process.exit(0);
}

const marker = "\n  composition: {";
const index = content.indexOf(marker);

if (index < 0) {
  throw new Error("Point insertion introuvable: composition");
}

const block = `
  operational: {
    enabled: true,
    title: "Factures",
    subtitle: "Vue opérationnelle de la facturation atelier.",
    kpis: [
      {
        key: "total",
        label: "Total",
        count: true,
        tone: "blue",
        icon: "receipt",
        description: "Nombre total de factures affichées.",
      },
      {
        key: "en_attente",
        label: "En attente",
        field: "statutPaiement",
        equals: "en_attente",
        tone: "orange",
        icon: "clock",
      },
      {
        key: "partiel",
        label: "Partielles",
        field: "statutPaiement",
        equals: "partiel",
        tone: "purple",
        icon: "activity",
      },
      {
        key: "payees",
        label: "Payées",
        field: "statutPaiement",
        equals: "paye",
        tone: "green",
        icon: "check",
      },
      {
        key: "annulees",
        label: "Annulées",
        field: "statutFacture",
        equals: "annulee",
        tone: "gray",
        icon: "x",
      },
    ],
    filters: [
      {
        key: "statutPaiement",
        label: "Statut paiement",
        field: "statutPaiement",
        type: "select",
        options: [
          { label: "En attente", value: "en_attente" },
          { label: "Partiel", value: "partiel" },
          { label: "Payé", value: "paye" },
        ],
      },
      {
        key: "statutFacture",
        label: "Statut facture",
        field: "statutFacture",
        type: "select",
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Émise", value: "emise" },
          { label: "Annulée", value: "annulee" },
        ],
      },
      {
        key: "clientId",
        label: "Client",
        field: "clientId",
        type: "relation",
      },
    ],
    table: {
      title: "Liste des factures",
      description: "Factures issues du runtime ERP.",
      fields: [
        "numeroFacture",
        "clientId",
        "vehiculeId",
        "dateFacture",
        "montantTTC",
        "montantPaye",
        "resteAPayer",
        "statutPaiement",
      ],
      relationLabelFields: {
        clientId: ["nom", "prenom", "telephone"],
        vehiculeId: ["immatriculation", "modele"],
        interventionId: ["dateIntervention", "typeIntervention", "statut"],
      },
      enableSearch: true,
      enableSelection: true,
      enableDensityToggle: true,
    },
    rightPanel: {
      enabled: true,
      title: "Facturation aujourd'hui",
      type: "summary",
    },
  },

`;

content = content.slice(0, index) + block + content.slice(index);

const problems = [];

if (!content.includes("operational:")) {
  problems.push("operational absent");
}

if (!content.includes('title: "Factures"')) {
  problems.push("title factures absent");
}

if (!content.includes('"montantTTC"')) {
  problems.push("montantTTC absent de la table");
}

if (!content.includes('"resteAPayer"')) {
  problems.push("resteAPayer absent de la table");
}

if (!content.includes('clientId: ["nom", "prenom", "telephone"]')) {
  problems.push("relationLabelFields client absent");
}

if (problems.length > 0) {
  console.log("[FAIL]");
  for (const problem of problems) console.log(" - " + problem);
  process.exit(1);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q2-C-B facturesauto.operational ajouté.");
console.log("[WRITTEN]", rel);
console.log("");
console.log("Next:");
console.log("pnpm build");

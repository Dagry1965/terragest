const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rel = "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + file);
}

const original = fs.readFileSync(file, "utf8");
let content = original;

fs.writeFileSync(
  file + ".bak-q2b-b-add-interventions-operational",
  original,
  "utf8"
);

if (content.includes("operational:")) {
  console.log("[INFO] interventionsauto.operational existe déjà. Aucun ajout.");
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
    title: "Interventions",
    subtitle: "Vue opérationnelle des interventions atelier.",
    kpis: [
      {
        key: "total",
        label: "Total",
        count: true,
        tone: "blue",
        icon: "activity",
        description: "Nombre total d'interventions affichées.",
      },
      {
        key: "ouvertes",
        label: "Ouvertes",
        field: "statut",
        equals: "ouverte",
        tone: "blue",
        icon: "calendar",
      },
      {
        key: "en_cours",
        label: "En cours",
        field: "statut",
        equals: "en_cours",
        tone: "orange",
        icon: "clock",
      },
      {
        key: "terminees",
        label: "Terminées",
        field: "statut",
        equals: "terminee",
        tone: "green",
        icon: "check",
      },
      {
        key: "annulees",
        label: "Annulées",
        field: "statut",
        equals: "annulee",
        tone: "gray",
        icon: "x",
      },
    ],
    filters: [
      {
        key: "statut",
        label: "Statut",
        field: "statut",
        type: "select",
        options: [
          { label: "Ouverte", value: "ouverte" },
          { label: "Diagnostic", value: "diagnostic" },
          { label: "En cours", value: "en_cours" },
          { label: "Terminée", value: "terminee" },
          { label: "Facturée", value: "facturee" },
          { label: "Annulée", value: "annulee" },
        ],
      },
      {
        key: "typeIntervention",
        label: "Type intervention",
        field: "typeIntervention",
        type: "select",
        options: [
          { label: "Vidange", value: "vidange" },
          { label: "Diagnostic", value: "diagnostic" },
          { label: "Réparation", value: "reparation" },
          { label: "Pneumatiques", value: "pneumatiques" },
          { label: "Contrôle", value: "controle" },
          { label: "Autre", value: "autre" },
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
      title: "Liste des interventions",
      description: "Interventions issues du runtime ERP.",
      fields: [
        "clientId",
        "vehiculeId",
        "dateIntervention",
        "typeIntervention",
        "kilometrage",
        "coutTotal",
        "statut",
      ],
      relationLabelFields: {
        clientId: ["nom", "prenom", "telephone"],
        vehiculeId: ["immatriculation", "modele"],
        rendezVousId: ["dateRendezVous", "heureRendezVous", "typeService"],
      },
      enableSearch: true,
      enableSelection: true,
      enableDensityToggle: true,
    },
    rightPanel: {
      enabled: true,
      title: "Atelier aujourd'hui",
      type: "summary",
    },
  },

`;

content = content.slice(0, index) + block + content.slice(index);

const problems = [];

if (!content.includes("operational:")) {
  problems.push("operational absent");
}

if (!content.includes('title: "Interventions"')) {
  problems.push("title interventions absent");
}

if (!content.includes('"coutTotal"')) {
  problems.push("coutTotal absent de la table");
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

console.log("[DONE] Q2-B-B interventionsauto.operational ajouté.");
console.log("[WRITTEN]", rel);
console.log("");
console.log("Next:");
console.log("pnpm build");

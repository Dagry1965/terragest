const fs = require("fs");
const path = require("path");

const root = process.cwd();

function writeFile(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });

  if (fs.existsSync(file)) {
    const backup = `${file}.bak-q11f-b`;
    fs.writeFileSync(backup, fs.readFileSync(file, "utf8"), "utf8");
    console.log("BACKUP:", backup);
  }

  fs.writeFileSync(file, content, "utf8");
  console.log("WRITTEN:", file);
}

const moduleDir = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "mouvementsstockauto"
);

const moduleFile = path.join(moduleDir, "mouvementsstockauto.module.ts");
const indexFile = path.join(moduleDir, "index.ts");

const moduleContent = `import type { ERPModule } from "@/runtime/modules/ERPModule";

export const mouvementsstockautoModule: ERPModule = {
  metadata: {
    key: "mouvementsstockauto",
    label: "Mouvements stock",
    description: "Entrées, sorties et corrections de stock AMARKHYS",
    icon: "arrow-left-right",
    category: "amarkhys",

    features: {
      dashboard: true,
      analytics: true,
      workflows: true,
      automation: true,
      notifications: true,
      observability: true,
      audit: true,
      realtime: true,
    },
  },

  schema: {
    collection: "mouvementsstockauto",

    fields: [
      {
        key: "typeMouvement",
        label: "Type mouvement",
        type: "select",
        required: true,
        defaultValue: "sortie",
        options: [
          { label: "Entrée", value: "entree" },
          { label: "Sortie", value: "sortie" },
          { label: "Correction", value: "correction" },
          { label: "Annulation", value: "annulation" },
        ],
        list: { order: 1 },
        grid: { cols: 4 },
      },
      {
        key: "stockId",
        label: "Stock",
        type: "relation",
        relation: { module: "stocksauto" },
        required: true,
        searchable: true,
        list: { order: 2 },
        grid: { cols: 4 },
      },
      {
        key: "produitId",
        label: "Produit",
        type: "relation",
        relation: { module: "produitsauto" },
        required: true,
        searchable: true,
        list: { order: 3 },
        grid: { cols: 4 },
      },
      {
        key: "quantite",
        label: "Quantité",
        type: "number",
        required: true,
        list: { order: 4 },
        grid: { cols: 4 },
      },
      {
        key: "quantiteAvant",
        label: "Quantité avant",
        type: "number",
        grid: { cols: 4 },
      },
      {
        key: "quantiteApres",
        label: "Quantité après",
        type: "number",
        grid: { cols: 4 },
      },
      {
        key: "sourceModule",
        label: "Module source",
        type: "text",
        grid: { cols: 4 },
      },
      {
        key: "sourceId",
        label: "Source",
        type: "text",
        grid: { cols: 4 },
      },
      {
        key: "interventionId",
        label: "Intervention",
        type: "relation",
        relation: { module: "interventionsauto" },
        searchable: true,
        grid: { cols: 4 },
      },
      {
        key: "ligneInterventionId",
        label: "Ligne intervention",
        type: "relation",
        relation: { module: "lignesinterventionauto" },
        searchable: true,
        grid: { cols: 4 },
      },
      {
        key: "motif",
        label: "Motif",
        type: "text",
        grid: { cols: 8 },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "valide",
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Validé", value: "valide" },
          { label: "Annulé", value: "annule" },
        ],
        list: { order: 5 },
        grid: { cols: 4 },
      },
      {
        key: "dateMouvement",
        label: "Date mouvement",
        type: "date",
        list: { order: 6 },
        grid: { cols: 4 },
      },
      {
        key: "observations",
        label: "Observations",
        type: "textarea",
        grid: { cols: 12 },
      },
    ],
  },

  form: {
    layout: "tabs",

    tabs: [
      {
        key: "mouvement",
        label: "Mouvement",
        fields: [
          "typeMouvement",
          "stockId",
          "produitId",
          "quantite",
          "quantiteAvant",
          "quantiteApres",
          "dateMouvement",
          "statut",
        ],
        sections: [
          {
            key: "infos",
            title: "Informations mouvement",
            fields: [
              "typeMouvement",
              "stockId",
              "produitId",
              "quantite",
              "quantiteAvant",
              "quantiteApres",
              "dateMouvement",
              "statut",
            ],
          },
        ],
      },
      {
        key: "source",
        label: "Source",
        fields: [
          "sourceModule",
          "sourceId",
          "interventionId",
          "ligneInterventionId",
          "motif",
        ],
        sections: [
          {
            key: "source",
            title: "Origine du mouvement",
            fields: [
              "sourceModule",
              "sourceId",
              "interventionId",
              "ligneInterventionId",
              "motif",
            ],
          },
        ],
      },
      {
        key: "notes",
        label: "Notes",
        fields: [
          "observations",
        ],
        sections: [
          {
            key: "observations",
            title: "Observations",
            fields: [
              "observations",
            ],
          },
        ],
      },
    ],
  },

  workflows: [
    {
      key: "mouvement-stock",
      label: "Cycle mouvement stock",
      initialState: "valide",
      states: [
        { key: "brouillon", label: "Brouillon", color: "default" },
        { key: "valide", label: "Validé", color: "success" },
        { key: "annule", label: "Annulé", color: "danger" },
      ],
      transitions: [
        { from: "brouillon", to: "valide", action: "Valider" },
        { from: "valide", to: "annule", action: "Annuler" },
      ],
    },
  ],
};
`;

const indexContent = `export { mouvementsstockautoModule } from "./mouvementsstockauto.module";
`;

writeFile(moduleFile, moduleContent);
writeFile(indexFile, indexContent);

const coreFile = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "definitions",
  "coreModules.ts"
);

let coreContent = fs.readFileSync(coreFile, "utf8");
const coreBackup = `${coreFile}.bak-q11f-b`;
fs.writeFileSync(coreBackup, coreContent, "utf8");
console.log("BACKUP:", coreBackup);

if (!coreContent.includes("mouvementsstockautoModule")) {
  coreContent = coreContent.replace(
    `import { stocksautoModule } from "@/runtime/modules/generated/stocksauto";`,
    `import { stocksautoModule } from "@/runtime/modules/generated/stocksauto";
import { mouvementsstockautoModule } from "@/runtime/modules/generated/mouvementsstockauto";`
  );

  coreContent = coreContent.replace(
    `  stocksautoModule,
  produitsautoModule,`,
    `  stocksautoModule,
  mouvementsstockautoModule,
  produitsautoModule,`
  );

  coreContent = coreContent.replace(
    `  stocksautoModule,
  rappelsautoModule,`,
    `  stocksautoModule,
  mouvementsstockautoModule,
  rappelsautoModule,`
  );
}

fs.writeFileSync(coreFile, coreContent, "utf8");

console.log("OK: module mouvementsstockauto créé et enregistré.");
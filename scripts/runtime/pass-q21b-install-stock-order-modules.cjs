const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const modulesRoot = path.join(ROOT, "src/runtime/modules/generated");
const coreModulesPath = path.join(
  ROOT,
  "src/runtime/modules/definitions/coreModules.ts"
);

const suffix = "q21b-install-stock-order-modules";

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(relPath, content) {
  const fullPath = path.join(ROOT, relPath);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, content, "utf8");
  console.log(`[WRITTEN] ${relPath}`);
}

function backupFile(absPath) {
  const backupPath = `${absPath}.bak-${suffix}`;

  if (!fs.existsSync(absPath)) {
    console.error(`[ERROR] Missing file: ${absPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(absPath, backupPath);
    console.log(`[BACKUP] ${path.relative(ROOT, backupPath)}`);
  }
}

function moduleIndex(moduleKey) {
  return `export { ${moduleKey}Module } from "./${moduleKey}.module";
`;
}

function moduleFile(moduleKey, content) {
  const dir = path.join(modulesRoot, moduleKey);
  ensureDir(dir);

  writeFile(
    `src/runtime/modules/generated/${moduleKey}/index.ts`,
    moduleIndex(moduleKey)
  );

  writeFile(
    `src/runtime/modules/generated/${moduleKey}/${moduleKey}.module.ts`,
    content
  );
}

const fournisseursauto = `import type { ERPModule } from "@/runtime/modules/ERPModule";

export const fournisseursautoModule: ERPModule = {
  metadata: {
    key: "fournisseursauto",
    label: "Fournisseurs",
    description: "Fournisseurs pieces, consommables et services AMARKHYS",
    icon: "truck",
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
    collection: "fournisseursauto",
    fields: [
      {
        key: "nom",
        label: "Nom fournisseur",
        type: "text",
        required: true,
        searchable: true,
        list: { order: 1 },
        grid: { cols: 6 },
      },
      {
        key: "codeFournisseur",
        label: "Code fournisseur",
        type: "text",
        searchable: true,
        list: { order: 2 },
        grid: { cols: 3 },
      },
      {
        key: "telephone",
        label: "Telephone",
        type: "text",
        searchable: true,
        list: { order: 3 },
        grid: { cols: 3 },
      },
      {
        key: "email",
        label: "Email",
        type: "email",
        searchable: true,
        grid: { cols: 4 },
      },
      {
        key: "adresse",
        label: "Adresse",
        type: "text",
        grid: { cols: 8 },
      },
      {
        key: "ville",
        label: "Ville",
        type: "text",
        grid: { cols: 4 },
      },
      {
        key: "typeFournisseur",
        label: "Type fournisseur",
        type: "select",
        options: [
          { label: "Pieces", value: "pieces" },
          { label: "Consommables", value: "consommables" },
          { label: "Services", value: "services" },
          { label: "Mixte", value: "mixte" },
        ],
        list: { order: 4 },
        grid: { cols: 4 },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "actif",
        options: [
          { label: "Actif", value: "actif" },
          { label: "Suspendu", value: "suspendu" },
          { label: "Archive", value: "archive" },
        ],
        list: { order: 5 },
        grid: { cols: 4 },
      },
      {
        key: "notes",
        label: "Notes",
        type: "textarea",
        grid: { cols: 12 },
      },
    ],
  },

  form: {
    layout: "tabs",
    tabs: [
      {
        key: "identite",
        label: "Identite",
        fields: [
          "nom",
          "codeFournisseur",
          "telephone",
          "email",
          "adresse",
          "ville",
          "typeFournisseur",
          "statut",
          "notes",
        ],
        sections: [
          {
            key: "general",
            title: "Informations fournisseur",
            fields: [
              "nom",
              "codeFournisseur",
              "telephone",
              "email",
              "adresse",
              "ville",
              "typeFournisseur",
              "statut",
              "notes",
            ],
          },
        ],
      },
    ],
  },
};
`;

const commandesstockauto = `import type { ERPModule } from "@/runtime/modules/ERPModule";

export const commandesstockautoModule: ERPModule = {
  metadata: {
    key: "commandesstockauto",
    label: "Commandes stock",
    description: "Commandes fournisseurs pour pieces et consommables AMARKHYS",
    icon: "shopping-cart",
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
    collection: "commandesstockauto",
    fields: [
      {
        key: "numeroCommande",
        label: "Numero commande",
        type: "text",
        searchable: true,
        list: { order: 1 },
        grid: { cols: 4 },
      },
      {
        key: "fournisseurId",
        label: "Fournisseur",
        type: "relation",
        relation: { module: "fournisseursauto" },
        required: true,
        searchable: true,
        list: { order: 2 },
        grid: { cols: 4 },
      },
      {
        key: "dateCommande",
        label: "Date commande",
        type: "date",
        required: true,
        list: { order: 3 },
        grid: { cols: 4 },
      },
      {
        key: "dateLivraisonPrevue",
        label: "Date livraison prevue",
        type: "date",
        grid: { cols: 4 },
      },
      {
        key: "montantHT",
        label: "Montant HT",
        type: "number",
        defaultValue: 0,
        list: { order: 4 },
        grid: { cols: 4 },
      },
      {
        key: "montantTTC",
        label: "Montant TTC",
        type: "number",
        defaultValue: 0,
        list: { order: 5 },
        grid: { cols: 4 },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "brouillon",
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Envoyee", value: "envoyee" },
          { label: "Partiellement recue", value: "partiellement_recue" },
          { label: "Recue", value: "recue" },
          { label: "Annulee", value: "annulee" },
        ],
        list: { order: 6 },
        grid: { cols: 4 },
      },
      {
        key: "notes",
        label: "Notes",
        type: "textarea",
        grid: { cols: 12 },
      },
    ],
  },

  form: {
    layout: "tabs",
    tabs: [
      {
        key: "commande",
        label: "Commande",
        fields: [
          "numeroCommande",
          "fournisseurId",
          "dateCommande",
          "dateLivraisonPrevue",
          "montantHT",
          "montantTTC",
          "statut",
          "notes",
        ],
        sections: [
          {
            key: "general",
            title: "Commande fournisseur",
            fields: [
              "numeroCommande",
              "fournisseurId",
              "dateCommande",
              "dateLivraisonPrevue",
              "montantHT",
              "montantTTC",
              "statut",
              "notes",
            ],
          },
        ],
      },
    ],
  },

  composition: {
    labelFields: ["numeroCommande", "fournisseurId", "statut"],
    children: [
      {
        moduleKey: "lignescommandestockauto",
        foreignKey: "commandeId",
        title: "Lignes de commande",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        labelFields: ["produitId", "quantiteCommandee", "prixUnitaireHT", "statut"],
      },
      {
        moduleKey: "receptionsstockauto",
        foreignKey: "commandeId",
        title: "Receptions",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        labelFields: ["produitId", "quantiteRecue", "dateReception", "statut"],
      },
    ],
  },
};
`;

const lignescommandestockauto = `import type { ERPModule } from "@/runtime/modules/ERPModule";

export const lignescommandestockautoModule: ERPModule = {
  metadata: {
    key: "lignescommandestockauto",
    label: "Lignes commande stock",
    description: "Details produits des commandes fournisseurs AMARKHYS",
    icon: "list",
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
    collection: "lignescommandestockauto",
    fields: [
      {
        key: "commandeId",
        label: "Commande",
        type: "relation",
        relation: { module: "commandesstockauto" },
        required: true,
        searchable: true,
        list: { order: 1 },
        grid: { cols: 4 },
      },
      {
        key: "produitId",
        label: "Produit",
        type: "relation",
        relation: { module: "produitsauto" },
        required: true,
        searchable: true,
        list: { order: 2 },
        grid: { cols: 4 },
      },
      {
        key: "stockId",
        label: "Stock destination",
        type: "relation",
        relation: {
          module: "stocksauto",
          filterBy: {
            sourceField: "produitId",
            targetField: "produitId",
            includeEmptyTarget: false,
          },
        },
        searchable: true,
        list: { order: 3 },
        grid: { cols: 4 },
      },
      {
        key: "designation",
        label: "Designation",
        type: "text",
        searchable: true,
        grid: { cols: 6 },
      },
      {
        key: "quantiteCommandee",
        label: "Quantite commandee",
        type: "number",
        required: true,
        defaultValue: 1,
        list: { order: 4 },
        grid: { cols: 3 },
      },
      {
        key: "quantiteRecue",
        label: "Quantite recue",
        type: "number",
        defaultValue: 0,
        list: { order: 5 },
        grid: { cols: 3 },
      },
      {
        key: "prixUnitaireHT",
        label: "Prix unitaire HT",
        type: "number",
        defaultValue: 0,
        grid: { cols: 4 },
      },
      {
        key: "montantHT",
        label: "Montant HT",
        type: "number",
        defaultValue: 0,
        list: { order: 6 },
        grid: { cols: 4 },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "brouillon",
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Commandee", value: "commandee" },
          { label: "Partiellement recue", value: "partiellement_recue" },
          { label: "Recue", value: "recue" },
          { label: "Annulee", value: "annulee" },
        ],
        list: { order: 7 },
        grid: { cols: 4 },
      },
    ],
  },

  form: {
    layout: "tabs",
    tabs: [
      {
        key: "ligne",
        label: "Ligne",
        fields: [
          "commandeId",
          "produitId",
          "stockId",
          "designation",
          "quantiteCommandee",
          "quantiteRecue",
          "prixUnitaireHT",
          "montantHT",
          "statut",
        ],
        sections: [
          {
            key: "general",
            title: "Ligne de commande",
            fields: [
              "commandeId",
              "produitId",
              "stockId",
              "designation",
              "quantiteCommandee",
              "quantiteRecue",
              "prixUnitaireHT",
              "montantHT",
              "statut",
            ],
          },
        ],
      },
    ],
  },

  composition: {
    requiresParentContext: true,
    allowedParents: [
      {
        moduleKey: "commandesstockauto",
        foreignKey: "commandeId",
      },
    ],
    lockedFields: ["commandeId"],
    labelFields: ["produitId", "quantiteCommandee", "statut"],
  },
};
`;

const receptionsstockauto = `import type { ERPModule } from "@/runtime/modules/ERPModule";

export const receptionsstockautoModule: ERPModule = {
  metadata: {
    key: "receptionsstockauto",
    label: "Receptions stock",
    description: "Receptions fournisseurs et entrees stock AMARKHYS",
    icon: "inbox",
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
    collection: "receptionsstockauto",
    fields: [
      {
        key: "commandeId",
        label: "Commande",
        type: "relation",
        relation: { module: "commandesstockauto" },
        required: true,
        searchable: true,
        list: { order: 1 },
        grid: { cols: 4 },
      },
      {
        key: "ligneCommandeId",
        label: "Ligne commande",
        type: "relation",
        relation: {
          module: "lignescommandestockauto",
          filterBy: {
            sourceField: "commandeId",
            targetField: "commandeId",
            includeEmptyTarget: false,
          },
        },
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
        key: "stockId",
        label: "Stock destination",
        type: "relation",
        relation: {
          module: "stocksauto",
          filterBy: {
            sourceField: "produitId",
            targetField: "produitId",
            includeEmptyTarget: false,
          },
        },
        required: true,
        searchable: true,
        list: { order: 4 },
        grid: { cols: 4 },
      },
      {
        key: "quantiteRecue",
        label: "Quantite recue",
        type: "number",
        required: true,
        defaultValue: 1,
        list: { order: 5 },
        grid: { cols: 4 },
      },
      {
        key: "dateReception",
        label: "Date reception",
        type: "date",
        required: true,
        list: { order: 6 },
        grid: { cols: 4 },
      },
      {
        key: "mouvementStockId",
        label: "Mouvement stock",
        type: "relation",
        relation: { module: "mouvementsstockauto" },
        grid: { cols: 4 },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "brouillon",
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Validee", value: "validee" },
          { label: "Annulee", value: "annulee" },
        ],
        list: { order: 7 },
        grid: { cols: 4 },
      },
      {
        key: "notes",
        label: "Notes",
        type: "textarea",
        grid: { cols: 12 },
      },
    ],
  },

  form: {
    layout: "tabs",
    tabs: [
      {
        key: "reception",
        label: "Reception",
        fields: [
          "commandeId",
          "ligneCommandeId",
          "produitId",
          "stockId",
          "quantiteRecue",
          "dateReception",
          "mouvementStockId",
          "statut",
          "notes",
        ],
        sections: [
          {
            key: "general",
            title: "Reception stock",
            fields: [
              "commandeId",
              "ligneCommandeId",
              "produitId",
              "stockId",
              "quantiteRecue",
              "dateReception",
              "mouvementStockId",
              "statut",
              "notes",
            ],
          },
        ],
      },
    ],
  },

  composition: {
    requiresParentContext: true,
    allowedParents: [
      {
        moduleKey: "commandesstockauto",
        foreignKey: "commandeId",
      },
    ],
    lockedFields: ["commandeId"],
    labelFields: ["produitId", "quantiteRecue", "dateReception", "statut"],
  },
};
`;

function patchCoreModules() {
  backupFile(coreModulesPath);

  let content = fs.readFileSync(coreModulesPath, "utf8");

  const imports = [
    `import { fournisseursautoModule } from "@/runtime/modules/generated/fournisseursauto";`,
    `import { commandesstockautoModule } from "@/runtime/modules/generated/commandesstockauto";`,
    `import { lignescommandestockautoModule } from "@/runtime/modules/generated/lignescommandestockauto";`,
    `import { receptionsstockautoModule } from "@/runtime/modules/generated/receptionsstockauto";`,
  ];

  for (const importLine of imports) {
    if (!content.includes(importLine)) {
      content = `${importLine}\n${content}`;
    }
  }

  const moduleLines = [
    "  fournisseursautoModule,",
    "  commandesstockautoModule,",
    "  lignescommandestockautoModule,",
    "  receptionsstockautoModule,",
  ];

  const firstArrayMarker = "export const coreERPModules: ERPModule[] = [";
  const firstArrayIndex = content.indexOf(firstArrayMarker);

  if (firstArrayIndex === -1) {
    console.error("[ERROR] coreERPModules array not found.");
    process.exit(1);
  }

  const afterFirstMarker = firstArrayIndex + firstArrayMarker.length;

  for (const line of moduleLines.slice().reverse()) {
    if (!content.includes(line)) {
      content =
        content.slice(0, afterFirstMarker) +
        `\n${line}` +
        content.slice(afterFirstMarker);
    }
  }

  const preferredMarker = "].forEach((module) => {";
  const preferredIndex = content.indexOf(preferredMarker);

  if (preferredIndex === -1) {
    console.error("[ERROR] preferredERPModules block not found.");
    process.exit(1);
  }

  const beforePreferred = content.slice(0, preferredIndex);
  const lastArrayStart = beforePreferred.lastIndexOf("[");
  const insertAt = preferredIndex;

  for (const line of moduleLines.slice().reverse()) {
    const alreadyBeforePreferred =
      content.slice(lastArrayStart, preferredIndex).includes(line);

    if (!alreadyBeforePreferred) {
      content =
        content.slice(0, insertAt) +
        `${line}\n` +
        content.slice(insertAt);
    }
  }

  fs.writeFileSync(coreModulesPath, content, "utf8");
  console.log("[WRITTEN] src/runtime/modules/definitions/coreModules.ts");
}

moduleFile("fournisseursauto", fournisseursauto);
moduleFile("commandesstockauto", commandesstockauto);
moduleFile("lignescommandestockauto", lignescommandestockauto);
moduleFile("receptionsstockauto", receptionsstockauto);

patchCoreModules();

console.log("");
console.log("[Q21B_DONE] Stock order modules installed.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  verify routes/modules");
console.log("");
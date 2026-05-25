const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q21e-b-stock-relationship-composition-v2";

function file(pathname) {
  return path.join(ROOT, pathname);
}

function read(pathname) {
  return fs.readFileSync(file(pathname), "utf8");
}

function write(pathname, content) {
  fs.writeFileSync(file(pathname), content, "utf8");
  console.log(`[WRITTEN] ${pathname}`);
}

function backup(pathname) {
  const src = file(pathname);
  const dest = file(`${pathname}.bak-${TAG}`);

  if (!fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
    console.log(`[BACKUP] ${pathname}.bak-${TAG}`);
  }
}

function replaceComposition(content, moduleName, newComposition) {
  const marker = "\n  composition: {";
  const start = content.indexOf(marker);

  if (start === -1) {
    const workflowsIndex = content.search(/\n\s*workflows\s*:\s*\[/);

    if (workflowsIndex !== -1) {
      return (
        content.slice(0, workflowsIndex) +
        "\n" +
        newComposition +
        "\n" +
        content.slice(workflowsIndex)
      );
    }

    const endMatch = content.match(/\n};\s*$/);

    if (!endMatch || endMatch.index === undefined) {
      throw new Error(`[MISSING] ${moduleName} composition insertion point`);
    }

    return (
      content.slice(0, endMatch.index) +
      ",\n\n" +
      newComposition +
      content.slice(endMatch.index)
    );
  }

  let index = start + marker.length;
  let depth = 1;

  while (index < content.length) {
    const char = content[index];

    if (char === "{") {
      depth += 1;
    }

    if (char === "}") {
      depth -= 1;

      if (depth === 0) {
        let end = index + 1;

        while (content[end] && /\s/.test(content[end])) {
          end += 1;
        }

        if (content[end] === ",") {
          end += 1;
        }

        return (
          content.slice(0, start) +
          "\n" +
          newComposition +
          content.slice(end)
        );
      }
    }

    index += 1;
  }

  throw new Error(`[MISSING] ${moduleName} composition closing brace`);
}

const commandes =
  "src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts";

const lignes =
  "src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts";

const receptions =
  "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts";

const mouvements =
  "src/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module.ts";

[commandes, lignes, receptions, mouvements].forEach(backup);

const commandesComposition = `  composition: {
    // Q21E_B_STOCK_ORDER_RELATIONSHIP_COMPOSITION
    // Commande stock knows its lines and receptions.
    labelFields: ["numeroCommande", "fournisseurId", "statut"],

    children: [
      {
        key: "lignes-commandestock",
        moduleKey: "lignescommandestockauto",
        foreignKey: "commandeId",
        title: "Lignes de commande",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        labelFields: ["produitId", "quantiteCommandee", "prixUnitaireHT", "statut"],
        subtitleFields: ["designation", "montantHT", "montantTTC"],
        totalField: "montantTTC",
        relations: [
          {
            field: "produitId",
            moduleKey: "produitsauto",
            labelFields: ["reference", "nom", "designation", "marque"],
          },
        ],
      },
      {
        key: "receptions-stock",
        moduleKey: "receptionsstockauto",
        foreignKey: "commandeId",
        title: "Réceptions",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        labelFields: ["ligneCommandeId", "produitId", "quantiteRecue", "dateReception", "statut"],
        subtitleFields: ["stockId", "mouvementStockId"],
        relations: [
          {
            field: "ligneCommandeId",
            moduleKey: "lignescommandestockauto",
            labelFields: ["produitId", "quantiteCommandee", "statut"],
          },
          {
            field: "produitId",
            moduleKey: "produitsauto",
            labelFields: ["reference", "nom", "designation", "marque"],
          },
          {
            field: "stockId",
            moduleKey: "stocksauto",
            labelFields: ["produitId", "emplacement", "typeStock", "quantite", "statut"],
          },
          {
            field: "mouvementStockId",
            moduleKey: "mouvementsstockauto",
            labelFields: ["typeMouvement", "produitId", "quantite", "stockId"],
          },
        ],
      },
    ],
  },`;

const lignesComposition = `  composition: {
    // Q21D3A2_ORDER_LINE_COMPUTED_FIELDS
    // Metadata-driven computed fields.
    // The runtime engine calculates these values; the form must not recalculate locally.
    readOnlyFields: ["designation", "montantHT", "montantTTC"],

    computedFields: [
      {
        target: "montantHT",
        formula: "multiply",
        sources: ["quantiteCommandee", "prixUnitaireHT"],
        round: 2,
        defaultValue: 0,
      },
      {
        target: "montantTTC",
        formula: "add",
        sources: ["montantHT"],
        round: 2,
        defaultValue: 0,
      },
    ],

    requiresParentContext: true,
    allowedParents: [
      {
        moduleKey: "commandesstockauto",
        foreignKey: "commandeId",
      },
    ],
    lockedFields: ["commandeId"],
    labelFields: ["produitId", "quantiteCommandee", "statut"],

    // Q21E_B_ORDER_LINE_RECEPTIONS_CHILDREN
    // Ligne commande knows its receptions.
    children: [
      {
        key: "receptions-ligne-commande",
        moduleKey: "receptionsstockauto",
        foreignKey: "ligneCommandeId",
        title: "Réceptions de la ligne",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        labelFields: ["produitId", "quantiteRecue", "dateReception", "statut"],
        subtitleFields: ["stockId", "mouvementStockId"],
        relations: [
          {
            field: "produitId",
            moduleKey: "produitsauto",
            labelFields: ["reference", "nom", "designation", "marque"],
          },
          {
            field: "stockId",
            moduleKey: "stocksauto",
            labelFields: ["produitId", "emplacement", "typeStock", "quantite", "statut"],
          },
          {
            field: "mouvementStockId",
            moduleKey: "mouvementsstockauto",
            labelFields: ["typeMouvement", "produitId", "quantite", "stockId"],
          },
        ],
      },
    ],
  },`;

const receptionsComposition = `  composition: {
    // Q21E_B_RECEPTION_RELATIONSHIP_COMPOSITION
    // Réception knows its parent command and generated stock movements.
    requiresParentContext: true,
    allowedParents: [
      {
        moduleKey: "commandesstockauto",
        foreignKey: "commandeId",
      },
    ],
    lockedFields: ["commandeId"],
    labelFields: ["ligneCommandeId", "produitId", "stockId", "quantiteRecue", "dateReception", "statut"],

    children: [
      {
        key: "mouvements-stock-reception",
        moduleKey: "mouvementsstockauto",
        foreignKey: "sourceId",
        title: "Mouvements stock générés",
        description: "Mouvements stock créés automatiquement depuis cette réception.",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: false,
        labelFields: ["typeMouvement", "produitId", "quantite", "stockId"],
        subtitleFields: ["dateMouvement", "sourceModule"],
        relations: [
          {
            field: "produitId",
            moduleKey: "produitsauto",
            labelFields: ["reference", "nom", "designation", "marque"],
          },
          {
            field: "stockId",
            moduleKey: "stocksauto",
            labelFields: ["produitId", "emplacement", "typeStock", "quantite", "statut"],
          },
        ],
      },
    ],
  },`;

const mouvementsComposition = `  composition: {
    // Q21E_B_STOCK_MOVEMENT_LABEL_FIELDS
    // Stock movement labels are metadata-driven and relation-aware.
    labelFields: ["typeMouvement", "produitId", "quantite", "stockId", "dateMouvement"],
  },`;

let commandesContent = read(commandes);
let lignesContent = read(lignes);
let receptionsContent = read(receptions);
let mouvementsContent = read(mouvements);

commandesContent = replaceComposition(
  commandesContent,
  "commandesstockauto",
  commandesComposition
);

lignesContent = replaceComposition(
  lignesContent,
  "lignescommandestockauto",
  lignesComposition
);

receptionsContent = replaceComposition(
  receptionsContent,
  "receptionsstockauto",
  receptionsComposition
);

mouvementsContent = replaceComposition(
  mouvementsContent,
  "mouvementsstockauto",
  mouvementsComposition
);

write(commandes, commandesContent);
write(lignes, lignesContent);
write(receptions, receptionsContent);
write(mouvements, mouvementsContent);

console.log("");
console.log("[Q21E_B_DONE] Stock relationship composition metadata strengthened.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\scripts\\runtime\\audit-q21e-runtime-relationship-process-map.cjs");
console.log("  Get-Content .\\reports\\q21e-runtime-relationship-process-map.md -TotalCount 260");
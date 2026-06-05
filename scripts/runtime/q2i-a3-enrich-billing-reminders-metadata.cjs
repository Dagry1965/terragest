const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rappelsRel = "src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts";
const facturesRel = "src/runtime/modules/generated/facturesauto/facturesauto.module.ts";
const echeancesRel = "src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts";

function abs(rel) {
  return path.join(ROOT, rel);
}

function read(rel) {
  const file = abs(rel);
  if (!fs.existsSync(file)) {
    throw new Error("File not found: " + rel);
  }
  return fs.readFileSync(file, "utf8");
}

function writeWithBackup(rel, content, tag) {
  const file = abs(rel);
  const original = fs.readFileSync(file, "utf8");
  fs.writeFileSync(file + tag, original, "utf8");
  fs.writeFileSync(file, content, "utf8");
  console.log("[WRITTEN]", rel);
}

function findMatchingBracket(content, openIndex) {
  let depth = 0;

  for (let i = openIndex; i < content.length; i += 1) {
    const char = content[i];

    if (char === "[" || char === "{") depth += 1;
    if (char === "]" || char === "}") depth -= 1;

    if (depth === 0) return i;
  }

  return -1;
}

function insertBeforeArrayEnd(content, arrayName, itemText, afterIndex = 0) {
  const nameIndex = content.indexOf(arrayName, afterIndex);
  if (nameIndex < 0) {
    throw new Error("Array not found: " + arrayName);
  }

  const arrayStart = content.indexOf("[", nameIndex);
  if (arrayStart < 0) {
    throw new Error("Array start not found: " + arrayName);
  }

  let depth = 0;
  let arrayEnd = -1;

  for (let i = arrayStart; i < content.length; i += 1) {
    const char = content[i];

    if (char === "[") depth += 1;
    if (char === "]") depth -= 1;

    if (depth === 0) {
      arrayEnd = i;
      break;
    }
  }

  if (arrayEnd < 0) {
    throw new Error("Array end not found: " + arrayName);
  }

  return content.slice(0, arrayEnd) + itemText + content.slice(arrayEnd);
}

function insertFieldsBefore(content, beforeFieldKey, fieldsText) {
  const marker = `key: "${beforeFieldKey}"`;
  const markerIndex = content.indexOf(marker);

  if (markerIndex < 0) {
    throw new Error("Field marker not found: " + marker);
  }

  let objectStart = content.lastIndexOf("{", markerIndex);
  if (objectStart < 0) {
    throw new Error("Object start not found for " + marker);
  }

  return content.slice(0, objectStart) + fieldsText + content.slice(objectStart);
}

function addFieldsToFormGroup(content, groupKey, fieldsToAdd) {
  const groupIndex = content.indexOf(`key: "${groupKey}"`);
  if (groupIndex < 0) return content;

  const groupEnd = content.indexOf("},", groupIndex);
  if (groupEnd < 0) return content;

  let next = content;

  for (const field of fieldsToAdd) {
    const block = next.slice(groupIndex, groupEnd + 2);
    if (block.includes(`"${field}"`)) continue;

    const fieldsIndex = next.indexOf("fields:", groupIndex);
    if (fieldsIndex < 0 || fieldsIndex > groupEnd) continue;

    const arrayStart = next.indexOf("[", fieldsIndex);
    if (arrayStart < 0 || arrayStart > groupEnd) continue;

    let depth = 0;
    let arrayEnd = -1;

    for (let i = arrayStart; i < next.length; i += 1) {
      const char = next[i];

      if (char === "[") depth += 1;
      if (char === "]") depth -= 1;

      if (depth === 0) {
        arrayEnd = i;
        break;
      }
    }

    if (arrayEnd < 0) continue;

    next = next.slice(0, arrayEnd) + `            "${field}",\n` + next.slice(arrayEnd);
  }

  return next;
}

function addChildrenArrayToEcheancesComposition(content) {
  if (content.includes("moduleKey: \"rappelsauto\"")) {
    return content;
  }

  const compositionIndex = content.indexOf("composition:");
  if (compositionIndex < 0) {
    throw new Error("composition not found in echeances");
  }

  const contextBannerIndex = content.indexOf("contextBanner:", compositionIndex);
  if (contextBannerIndex < 0) {
    throw new Error("contextBanner not found in echeances composition");
  }

  const childBlock = `    children: [
      {
        key: "rappels-echeance",
        moduleKey: "rappelsauto",
        foreignKey: "echeanceId",
        title: "Relances de l'échéance",
        description: "Relances rattachées à cette échéance de paiement.",
        displayIn: [],
        lazy: true,
        position: "after",
        allowCreate: false,
        createLabel: "Ajouter une relance",
        openLabel: "Ouvrir relance",
        labelFields: ["typeRappel", "dateRappel", "canal", "statut"],
        subtitleFields: ["clientId", "vehiculeId", "message"],
        prefillFromParent: {
          factureId: "factureId",
          echeanceId: "id",
          clientId: "clientId",
          vehiculeId: "vehiculeId",
        },
        lockFields: ["factureId", "echeanceId", "clientId", "vehiculeId"],
      },
    ],

`;

  return content.slice(0, contextBannerIndex) + childBlock + content.slice(contextBannerIndex);
}

/**
 * 1) rappelsauto fields factureId/echeanceId
 */
{
  const original = read(rappelsRel);
  let next = original;

  const fieldsToInsert = [];

  if (!next.includes('key: "factureId"')) {
    fieldsToInsert.push(`        {
          key: "factureId",
          label: "Facture",
          type: "relation",
          relation: { module: "facturesauto" },
          searchable: true,
          list: { visible: false },
          grid: { cols: 6 },
        },
`);
  }

  if (!next.includes('key: "echeanceId"')) {
    fieldsToInsert.push(`        {
          key: "echeanceId",
          label: "Échéance",
          type: "relation",
          relation: { module: "echeancespaiementauto" },
          searchable: true,
          list: { visible: false },
          grid: { cols: 6 },
        },
`);
  }

  if (fieldsToInsert.length > 0) {
    next = insertFieldsBefore(next, "typeRappel", fieldsToInsert.join(""));
  }

  next = addFieldsToFormGroup(next, "cible", ["factureId", "echeanceId"]);

  if (next !== original) {
    writeWithBackup(rappelsRel, next, ".bak-q2i-a3-billing-reminder-links");
  } else {
    console.log("[SKIP]", rappelsRel);
  }
}

/**
 * 2) facturesauto child rappelsauto via factureId
 */
{
  const original = read(facturesRel);
  let next = original;

  if (!next.includes('moduleKey: "rappelsauto"')) {
    const compositionIndex = next.indexOf("composition:");
    if (compositionIndex < 0) throw new Error("composition not found in facturesauto");

    const childBlock = `        {
          key: "rappels-facture",
          moduleKey: "rappelsauto",
          foreignKey: "factureId",
          title: "Relances facture",
          description: "Relances rattachées à cette facture.",
          displayIn: [],
          lazy: true,
          position: "after",
          allowCreate: false,
          createLabel: "Ajouter une relance",
          openLabel: "Ouvrir relance",
          labelFields: ["typeRappel", "dateRappel", "canal", "statut"],
          subtitleFields: ["clientId", "vehiculeId", "message"],
          prefillFromParent: {
            factureId: "id",
            clientId: "clientId",
            vehiculeId: "vehiculeId",
          },
          lockFields: ["factureId", "clientId", "vehiculeId"],
        },
`;

    next = insertBeforeArrayEnd(next, "children:", childBlock, compositionIndex);
  }

  if (next !== original) {
    writeWithBackup(facturesRel, next, ".bak-q2i-a3-billing-reminder-child");
  } else {
    console.log("[SKIP]", facturesRel);
  }
}

/**
 * 3) echeancespaiementauto child rappelsauto via echeanceId
 */
{
  const original = read(echeancesRel);
  let next = original;

  next = addChildrenArrayToEcheancesComposition(next);

  if (next !== original) {
    writeWithBackup(echeancesRel, next, ".bak-q2i-a3-schedule-reminder-child");
  } else {
    console.log("[SKIP]", echeancesRel);
  }
}

console.log("");
console.log("[DONE] Q2-I-A3 rappels facture / échéance metadata enrichis.");
console.log("");
console.log("Next:");
console.log("node .\\scripts\\runtime\\q2i-a2-billing-schedule-reminder-tree-model-audit.cjs");
console.log("pnpm run build");

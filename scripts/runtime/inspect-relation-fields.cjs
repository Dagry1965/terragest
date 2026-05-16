const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const moduleFiles = [
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  "src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts",
  "src/runtime/modules/generated/stocksauto/stocksauto.module.ts",
  "src/runtime/modules/generated/vehicules/vehicules.module.ts",
  "src/runtime/modules/generated/clientsauto/clientsauto.module.ts",
  "src/runtime/modules/definitions/generated/terrains.module.ts",
  "src/runtime/modules/definitions/generated/exploitations.module.ts",
  "src/runtime/modules/definitions/generated/contrats.module.ts",
];

const expectedRelations = {
  "rendezvous.clientId": "clientsauto",
  "rendezvous.vehiculeId": "vehicules",

  "interventionsauto.clientId": "clientsauto",
  "interventionsauto.vehiculeId": "vehicules",
  "interventionsauto.rendezVousId": "rendezvous",

  "facturesauto.clientId": "clientsauto",
  "facturesauto.vehiculeId": "vehicules",
  "facturesauto.interventionId": "interventionsauto",

  "rappelsauto.clientId": "clientsauto",
  "rappelsauto.vehiculeId": "vehicules",

  "stocksauto.produitId": "produitsauto",

  "vehicules.clientId": "clientsauto",

  "terrains.proprietaireId": "utilisateurs",
  "terrains.contratId": "contrats",

  "exploitations.terrainId": "terrains",
  "exploitations.responsableId": "utilisateurs",
  "exploitations.contratId": "contrats",

  "contrats.terrainId": "terrains",
  "contrats.exploitationId": "exploitations",
};

const ignoreFields = new Set([
  "id",
  "_id",
  "uid",
  "recordId",
  "entityId",
  "relationId",
  "parentId",
  "jobId",
  "priceId",
  "tenantId",
  "workspaceId",
  "userId",
  "createdById",
  "updatedById",
]);

function guessModuleKey(file) {
  const normalized = file.replaceAll("\\", "/");

  const generatedMatch =
    normalized.match(/generated\/([^/]+)\/\1\.module\.ts$/);

  if (generatedMatch) {
    return generatedMatch[1];
  }

  const definitionMatch =
    normalized.match(/definitions\/generated\/([^/]+)\.module\.ts$/);

  if (definitionMatch) {
    return definitionMatch[1];
  }

  return path.basename(file).replace(".module.ts", "");
}

function findFieldBlock(content, fieldKey, fromIndex = 0) {
  const regex =
    new RegExp(`key\\s*:\\s*["']${fieldKey}["']`, "g");

  regex.lastIndex = fromIndex;

  const match = regex.exec(content);

  if (!match) {
    return null;
  }

  const keyIndex = match.index;
  const start = content.lastIndexOf("{", keyIndex);

  if (start === -1) {
    return null;
  }

  let depth = 0;
  let end = -1;

  for (let i = start; i < content.length; i++) {
    const char = content[i];

    if (char === "{") {
      depth++;
    } else if (char === "}") {
      depth--;

      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }

  if (end === -1) {
    return null;
  }

  return {
    key: fieldKey,
    start,
    end,
    block: content.slice(start, end),
    nextIndex: end,
  };
}

function extractAllFieldKeys(content) {
  const keys = [];
  const regex = /key\s*:\s*["']([^"']+)["']/g;

  let match;

  while ((match = regex.exec(content)) !== null) {
    const key = match[1];

    if (
      (key.endsWith("Id") || key.endsWith("ID")) &&
      !ignoreFields.has(key)
    ) {
      keys.push(key);
    }
  }

  return [...new Set(keys)];
}

function extractRelationModule(block) {
  const objectRelation =
    block.match(/relation\s*:\s*{\s*module\s*:\s*["']([^"']+)["']/s);

  if (objectRelation) {
    return objectRelation[1];
  }

  const stringRelation =
    block.match(/relation\s*:\s*["']([^"']+)["']/s);

  if (stringRelation) {
    return stringRelation[1];
  }

  return undefined;
}

function isRelationField(block) {
  return /type\s*:\s*["']relation["']/.test(block);
}

console.log("");
console.log("=== RELATION FIELD NORMALIZATION AUDIT V2 ===");
console.log("");

for (const relativeFile of moduleFiles) {
  const file = path.join(ROOT, relativeFile);

  if (!fs.existsSync(file)) {
    console.log("MISSING FILE:", relativeFile);
    continue;
  }

  const moduleKey = guessModuleKey(relativeFile);
  const content = fs.readFileSync(file, "utf8");
  const fieldKeys = extractAllFieldKeys(content);

  for (const fieldKey of fieldKeys) {
    const expectedKey = `${moduleKey}.${fieldKey}`;
    const expectedModule = expectedRelations[expectedKey];

    if (!expectedModule) {
      console.log(`CHECK   ${expectedKey} → not mapped yet`);
      continue;
    }

    const field = findFieldBlock(content, fieldKey);

    if (!field) {
      console.log(`MISSING BLOCK ${expectedKey}`);
      continue;
    }

    const actualModule = extractRelationModule(field.block);
    const relation = isRelationField(field.block);

    if (!relation) {
      console.log(`MISSING ${expectedKey} → expected relation ${expectedModule}`);
      continue;
    }

    if (actualModule !== expectedModule) {
      console.log(
        `WRONG   ${expectedKey} → expected ${expectedModule}, actual ${actualModule ?? "none"}`
      );
      continue;
    }

    console.log(`OK      ${expectedKey} → ${actualModule}`);
  }
}

console.log("");
console.log("Done.");
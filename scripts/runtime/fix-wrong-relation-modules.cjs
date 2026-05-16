const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const fixes = [
  {
    file: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
    field: "vehiculeId",
    module: "vehicules",
  },
  {
    file: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
    field: "vehiculeId",
    module: "vehicules",
  },
  {
    file: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
    field: "rendezVousId",
    module: "rendezvous",
  },
  {
    file: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
    field: "vehiculeId",
    module: "vehicules",
  },
  {
    file: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
    field: "interventionId",
    module: "interventionsauto",
  },
  {
    file: "src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts",
    field: "vehiculeId",
    module: "vehicules",
  },

  // À appliquer seulement si le champ existe réellement.
  {
    file: "src/runtime/modules/generated/vehicules/vehicules.module.ts",
    field: "clientId",
    module: "clientsauto",
    optional: true,
  },

  {
    file: "src/runtime/modules/definitions/generated/terrains.module.ts",
    field: "contratId",
    module: "contrats",
  },
  {
    file: "src/runtime/modules/definitions/generated/exploitations.module.ts",
    field: "responsableId",
    module: "utilisateurs",
  },
  {
    file: "src/runtime/modules/definitions/generated/exploitations.module.ts",
    field: "contratId",
    module: "contrats",
  },
];

function findFieldBlock(content, fieldKey) {
  const keyPattern =
    new RegExp(`key\\s*:\\s*["']${fieldKey}["']`);

  const keyMatch =
    keyPattern.exec(content);

  if (!keyMatch) {
    return null;
  }

  const keyIndex =
    keyMatch.index;

  let start =
    content.lastIndexOf("{", keyIndex);

  if (start === -1) {
    return null;
  }

  let depth = 0;
  let end = -1;

  for (let i = start; i < content.length; i++) {
    const char = content[i];

    if (char === "{") {
      depth++;
    }

    if (char === "}") {
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
    start,
    end,
    block: content.slice(start, end),
  };
}

function patchFieldRelation(content, fieldKey, targetModule) {
  const found =
    findFieldBlock(content, fieldKey);

  if (!found) {
    return {
      content,
      changed: false,
      missing: true,
    };
  }

  let block =
    found.block;

  const originalBlock =
    block;

  if (!/type\s*:\s*["']relation["']/.test(block)) {
    block = block.replace(
      /type\s*:\s*["'][^"']+["']/,
      `type: "relation"`
    );
  }

  if (/relation\s*:\s*{\s*module\s*:\s*["'][^"']+["']/s.test(block)) {
    block = block.replace(
      /relation\s*:\s*{\s*module\s*:\s*["'][^"']+["']/s,
      `relation: { module: "${targetModule}"`
    );
  } else if (/relation\s*:\s*["'][^"']+["']/s.test(block)) {
    block = block.replace(
      /relation\s*:\s*["'][^"']+["']/s,
      `relation: { module: "${targetModule}" }`
    );
  } else {
    block = block.replace(
      /type\s*:\s*["']relation["']\s*,?/,
      `type: "relation",
    relation: { module: "${targetModule}" },`
    );
  }

  if (block === originalBlock) {
    return {
      content,
      changed: false,
      missing: false,
    };
  }

  return {
    content:
      content.slice(0, found.start) +
      block +
      content.slice(found.end),
    changed: true,
    missing: false,
  };
}

const touched = new Set();
const skipped = [];

for (const fix of fixes) {
  const filePath =
    path.join(ROOT, fix.file);

  if (!fs.existsSync(filePath)) {
    skipped.push(`MISSING FILE ${fix.file}`);
    continue;
  }

  const original =
    fs.readFileSync(filePath, "utf8");

  const result =
    patchFieldRelation(
      original,
      fix.field,
      fix.module
    );

  if (result.missing) {
    const message =
      `MISSING FIELD ${fix.file} :: ${fix.field}`;

    if (fix.optional) {
      skipped.push(message);
      console.log("SKIP", message);
      continue;
    }

    skipped.push(message);
    console.log("WARN", message);
    continue;
  }

  if (result.changed) {
    fs.writeFileSync(filePath, result.content, "utf8");
    touched.add(fix.file);
    console.log(`OK ${fix.file} :: ${fix.field} -> ${fix.module}`);
  } else {
    console.log(`NO CHANGE ${fix.file} :: ${fix.field}`);
  }
}

console.log("");
console.log("Fichiers modifiés :");
for (const file of touched) {
  console.log("-", file);
}

console.log("");
console.log("Skipped / warnings :");
for (const item of skipped) {
  console.log("-", item);
}
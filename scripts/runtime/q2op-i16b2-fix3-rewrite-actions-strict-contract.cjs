const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targets = [
  {
    key: "receptionsstockauto",
    file: "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts",
    actionsBlock: `  actions: [
    {
      key: "valider-reception",
      label: "Valider reception",
      type: "primary",
      runtimeOnly: true,
    },
  ],`,
  },
  {
    key: "commandesstockauto",
    file: "src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts",
    actionsBlock: `  actions: [
    {
      key: "envoyer-commande",
      label: "Envoyer commande",
      type: "primary",
      runtimeOnly: true,
    },
    {
      key: "annuler-commande",
      label: "Annuler commande",
      type: "danger",
      runtimeOnly: true,
    },
  ],`,
  },
];

function full(relativePath) {
  return path.join(root, relativePath);
}

function backup(relativePath, suffix) {
  const file = full(relativePath);

  if (!fs.existsSync(file)) {
    console.error("[MISSING]", relativePath);
    process.exit(1);
  }

  const bak = `${file}.${suffix}`;

  if (!fs.existsSync(bak)) {
    fs.copyFileSync(file, bak);
    console.log("[BACKUP]", path.relative(root, bak));
  }
}

function findBalancedArrayEnd(source, arrayOpenIndex) {
  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = arrayOpenIndex; i < source.length; i++) {
    const c = source[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (c === "\\") {
      escaped = true;
      continue;
    }

    if (inString) {
      if (c === quote) {
        inString = false;
        quote = "";
      }
      continue;
    }

    if (c === '"' || c === "'" || c === "`") {
      inString = true;
      quote = c;
      continue;
    }

    if (c === "[") depth++;
    if (c === "]") depth--;

    if (depth === 0 && i > arrayOpenIndex) {
      return i;
    }
  }

  return -1;
}

function findBalancedObjectEnd(source, objectOpenIndex) {
  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = objectOpenIndex; i < source.length; i++) {
    const c = source[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (c === "\\") {
      escaped = true;
      continue;
    }

    if (inString) {
      if (c === quote) {
        inString = false;
        quote = "";
      }
      continue;
    }

    if (c === '"' || c === "'" || c === "`") {
      inString = true;
      quote = c;
      continue;
    }

    if (c === "{") depth++;
    if (c === "}") depth--;

    if (depth === 0 && i > objectOpenIndex) {
      return i;
    }
  }

  return -1;
}

function removeAnyActionsBlocks(source) {
  let current = source;

  while (current.includes("actions: [")) {
    const actionIndex = current.indexOf("actions: [");
    const lineStart = current.lastIndexOf("\n", actionIndex);
    const start = lineStart === -1 ? actionIndex : lineStart + 1;
    const arrayOpen = current.indexOf("[", actionIndex);
    const arrayClose = findBalancedArrayEnd(current, arrayOpen);

    if (arrayClose === -1) {
      console.error("[PATCH_FAILED] Could not find actions array end.");
      process.exit(1);
    }

    let end = arrayClose + 1;
    const tail = current.slice(end, end + 30);
    const suffix = tail.match(/^\s*,?/);
    if (suffix) {
      end += suffix[0].length;
    }

    current = current.slice(0, start) + current.slice(end);
  }

  return current;
}

function insertActionsAfterMetadata(source, actionsBlock, key) {
  const metadataIndex = source.indexOf("metadata:");
  if (metadataIndex === -1) {
    console.error("[PATCH_FAILED]", key, "metadata not found.");
    process.exit(1);
  }

  const metadataOpen = source.indexOf("{", metadataIndex);
  const metadataClose = findBalancedObjectEnd(source, metadataOpen);

  if (metadataOpen === -1 || metadataClose === -1) {
    console.error("[PATCH_FAILED]", key, "metadata boundaries not found.");
    process.exit(1);
  }

  let insertAt = metadataClose + 1;
  const afterMetadata = source.slice(insertAt, insertAt + 20);
  const comma = afterMetadata.match(/^\s*,/);

  if (comma) {
    insertAt += comma[0].length;
  } else {
    source = source.slice(0, insertAt) + "," + source.slice(insertAt);
    insertAt += 1;
  }

  return source.slice(0, insertAt) + "\n\n" + actionsBlock + source.slice(insertAt);
}

for (const target of targets) {
  backup(target.file, "bak-q2op-i16b2-fix3-strict-actions");

  let source = fs.readFileSync(full(target.file), "utf8");

  source = removeAnyActionsBlocks(source);
  source = insertActionsAfterMetadata(source, target.actionsBlock, target.key);

  const forbidden = [
    "description:",
    "visibleWhen:",
  ];

  for (const marker of forbidden) {
    if (source.includes(marker)) {
      console.error("[PATCH_FAILED]", target.key, "forbidden marker remains:", marker);
      process.exit(1);
    }
  }

  const required = [
    "actions: [",
    "runtimeOnly: true",
    "key:",
    "label:",
    "type:",
  ];

  for (const marker of required) {
    if (!source.includes(marker)) {
      console.error("[PATCH_FAILED]", target.key, "required marker missing:", marker);
      process.exit(1);
    }
  }

  if (target.key === "receptionsstockauto" && !source.includes("valider-reception")) {
    console.error("[PATCH_FAILED] valider-reception missing.");
    process.exit(1);
  }

  if (
    target.key === "commandesstockauto" &&
    (!source.includes("envoyer-commande") || !source.includes("annuler-commande"))
  ) {
    console.error("[PATCH_FAILED] commande action keys missing.");
    process.exit(1);
  }

  fs.writeFileSync(full(target.file), source, "utf8");
  console.log("[WRITTEN]", target.file);
}

console.log("[Q2-OP-I16-B2-FIX3] Actions rewritten with strict ERPModuleAction contract.");
console.log("Next:");
console.log("  Select-String -Path .\\src\\runtime\\modules\\generated\\commandesstockauto\\commandesstockauto.module.ts -Pattern \"actions:|description:|visibleWhen:|envoyer-commande|annuler-commande\" -Context 2,8");
console.log("  pnpm build");
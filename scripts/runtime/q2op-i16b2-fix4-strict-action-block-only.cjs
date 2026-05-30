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
    requiredKeys: ["valider-reception"],
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
    requiredKeys: ["envoyer-commande", "annuler-commande"],
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

function findBalancedEnd(source, openIndex, openChar, closeChar) {
  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = openIndex; i < source.length; i++) {
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

    if (c === openChar) depth++;
    if (c === closeChar) depth--;

    if (depth === 0 && i > openIndex) {
      return i;
    }
  }

  return -1;
}

function removeExistingActionsBlocks(source) {
  let current = source;

  while (current.includes("actions: [")) {
    const actionIndex = current.indexOf("actions: [");
    const lineStart = current.lastIndexOf("\n", actionIndex);
    const start = lineStart === -1 ? actionIndex : lineStart + 1;

    const arrayOpen = current.indexOf("[", actionIndex);
    const arrayClose = findBalancedEnd(current, arrayOpen, "[", "]");

    if (arrayClose === -1) {
      console.error("[PATCH_FAILED] Could not find actions array end.");
      process.exit(1);
    }

    let end = arrayClose + 1;
    const tail = current.slice(end, end + 40);
    const suffix = tail.match(/^\s*,?/);

    if (suffix) {
      end += suffix[0].length;
    }

    current = current.slice(0, start) + current.slice(end);
  }

  return current;
}

function insertAfterMetadata(source, actionsBlock, key) {
  const metadataIndex = source.indexOf("metadata:");
  if (metadataIndex === -1) {
    console.error("[PATCH_FAILED]", key, "metadata not found.");
    process.exit(1);
  }

  const metadataOpen = source.indexOf("{", metadataIndex);
  const metadataClose = findBalancedEnd(source, metadataOpen, "{", "}");

  if (metadataOpen === -1 || metadataClose === -1) {
    console.error("[PATCH_FAILED]", key, "metadata boundaries not found.");
    process.exit(1);
  }

  let insertAt = metadataClose + 1;
  const afterMetadata = source.slice(insertAt, insertAt + 40);
  const comma = afterMetadata.match(/^\s*,/);

  if (comma) {
    insertAt += comma[0].length;
  } else {
    source = source.slice(0, insertAt) + "," + source.slice(insertAt);
    insertAt += 1;
  }

  return source.slice(0, insertAt) + "\n\n" + actionsBlock + source.slice(insertAt);
}

function extractFirstActionsBlock(source) {
  const actionIndex = source.indexOf("actions: [");
  if (actionIndex === -1) {
    return "";
  }

  const arrayOpen = source.indexOf("[", actionIndex);
  const arrayClose = findBalancedEnd(source, arrayOpen, "[", "]");

  if (arrayClose === -1) {
    return "";
  }

  return source.slice(actionIndex, arrayClose + 1);
}

for (const target of targets) {
  backup(target.file, "bak-q2op-i16b2-fix4-strict-actions");

  let source = fs.readFileSync(full(target.file), "utf8");

  source = removeExistingActionsBlocks(source);
  source = insertAfterMetadata(source, target.actionsBlock, target.key);

  const actionsBlock = extractFirstActionsBlock(source);

  if (!actionsBlock) {
    console.error("[PATCH_FAILED]", target.key, "actions block missing after rewrite.");
    process.exit(1);
  }

  for (const key of target.requiredKeys) {
    if (!actionsBlock.includes(key)) {
      console.error("[PATCH_FAILED]", target.key, "missing key in actions block:", key);
      process.exit(1);
    }
  }

  for (const marker of ["description:", "visibleWhen:"]) {
    if (actionsBlock.includes(marker)) {
      console.error("[PATCH_FAILED]", target.key, "forbidden marker remains inside actions block:", marker);
      process.exit(1);
    }
  }

  if (!actionsBlock.includes("runtimeOnly: true")) {
    console.error("[PATCH_FAILED]", target.key, "runtimeOnly missing in actions block.");
    process.exit(1);
  }

  fs.writeFileSync(full(target.file), source, "utf8");
  console.log("[WRITTEN]", target.file);
}

console.log("[Q2-OP-I16-B2-FIX4] Strict root action blocks rewritten safely.");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\scripts\\runtime\\q2op-i16b1-audit-stock-order-reception-actions.cjs");
console.log("  node .\\scripts\\runtime\\q2op-i16a-audit-priority-workflows-from-action-bar.cjs");
console.log("  git status --short");
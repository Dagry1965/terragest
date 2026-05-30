const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targets = [
  {
    key: "receptionsstockauto",
    file: "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts",
    actionKeys: ["valider-reception"],
    rootActionsBlock: `  actions: [
    {
      key: "valider-reception",
      label: "Valider reception",
      type: "primary",
      runtimeOnly: true,
      description:
        "Valide la reception, cree le mouvement de stock d'entree et met a jour le stock destination.",
      visibleWhen: {
        field: "statut",
        equals: "brouillon",
      },
    },
  ],`,
  },
  {
    key: "commandesstockauto",
    file: "src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts",
    actionKeys: ["envoyer-commande", "annuler-commande"],
    rootActionsBlock: `  actions: [
    {
      key: "envoyer-commande",
      label: "Envoyer commande",
      type: "primary",
      runtimeOnly: true,
      description:
        "Marque la commande comme envoyee au fournisseur sans impacter le stock.",
      visibleWhen: {
        field: "statut",
        equals: "brouillon",
      },
    },
    {
      key: "annuler-commande",
      label: "Annuler commande",
      type: "danger",
      runtimeOnly: true,
      description:
        "Annule la commande stock tout en conservant l'historique.",
      visibleWhen: {
        field: "statut",
        equals: "brouillon",
      },
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

function findBalancedObjectEnd(source, openBraceIndex) {
  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = openBraceIndex; i < source.length; i++) {
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

    if (depth === 0 && i > openBraceIndex) {
      return i;
    }
  }

  return -1;
}

function removeMisplacedMetadataActions(source, target) {
  const metadataIndex = source.indexOf("metadata:");
  if (metadataIndex === -1) {
    console.error("[PATCH_FAILED]", target.key, "metadata block not found.");
    process.exit(1);
  }

  const metadataOpen = source.indexOf("{", metadataIndex);
  const metadataClose = findBalancedObjectEnd(source, metadataOpen);

  if (metadataOpen === -1 || metadataClose === -1) {
    console.error("[PATCH_FAILED]", target.key, "metadata boundaries not found.");
    process.exit(1);
  }

  const beforeMetadata = source.slice(0, metadataOpen + 1);
  let metadataBody = source.slice(metadataOpen + 1, metadataClose);
  const afterMetadata = source.slice(metadataClose);

  // Remove an actions block that was wrongly inserted inside metadata.
  const actionIndex = metadataBody.indexOf("actions: [");

  if (actionIndex === -1) {
    return source;
  }

  let arrayOpen = metadataBody.indexOf("[", actionIndex);
  let depth = 0;
  let end = -1;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = arrayOpen; i < metadataBody.length; i++) {
    const c = metadataBody[i];

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

    if (depth === 0 && i > arrayOpen) {
      end = i + 1;
      break;
    }
  }

  if (end === -1) {
    console.error("[PATCH_FAILED]", target.key, "metadata actions array end not found.");
    process.exit(1);
  }

  // Consume possible trailing comma and whitespace.
  let finalEnd = end;
  const tail = metadataBody.slice(end, end + 20);
  const commaMatch = tail.match(/^\s*,?/);
  if (commaMatch) {
    finalEnd += commaMatch[0].length;
  }

  metadataBody =
    metadataBody.slice(0, actionIndex) +
    metadataBody.slice(finalEnd);

  console.log("[REMOVED]", target.key, "misplaced metadata.actions");

  return beforeMetadata + metadataBody + afterMetadata;
}

function hasRootActions(source, target) {
  for (const key of target.actionKeys) {
    if (!source.includes(key)) {
      return false;
    }
  }

  const metadataIndex = source.indexOf("metadata:");
  const firstActionIndex = source.indexOf("actions: [");

  if (firstActionIndex === -1) {
    return false;
  }

  const metadataOpen = source.indexOf("{", metadataIndex);
  const metadataClose = findBalancedObjectEnd(source, metadataOpen);

  return firstActionIndex > metadataClose;
}

function insertRootActions(source, target) {
  if (hasRootActions(source, target)) {
    console.log("[SKIP]", target.key, "root actions already present");
    return source;
  }

  const metadataIndex = source.indexOf("metadata:");
  const metadataOpen = source.indexOf("{", metadataIndex);
  const metadataClose = findBalancedObjectEnd(source, metadataOpen);

  if (metadataOpen === -1 || metadataClose === -1) {
    console.error("[PATCH_FAILED]", target.key, "metadata block not found for root insert.");
    process.exit(1);
  }

  // Insert after metadata block, after trailing comma if present.
  let insertAt = metadataClose + 1;

  const afterMetadata = source.slice(insertAt, insertAt + 20);
  const commaMatch = afterMetadata.match(/^\s*,/);

  if (commaMatch) {
    insertAt += commaMatch[0].length;
  } else {
    // Ensure metadata has a comma before adding sibling property.
    source = source.slice(0, insertAt) + "," + source.slice(insertAt);
    insertAt += 1;
  }

  return (
    source.slice(0, insertAt) +
    "\n\n" +
    target.rootActionsBlock +
    source.slice(insertAt)
  );
}

for (const target of targets) {
  backup(target.file, "bak-q2op-i16b2-fix-actions-root-level");

  let source = fs.readFileSync(full(target.file), "utf8");

  source = removeMisplacedMetadataActions(source, target);
  source = insertRootActions(source, target);

  for (const key of target.actionKeys) {
    if (!source.includes(key)) {
      console.error("[PATCH_FAILED]", target.key, "missing action key:", key);
      process.exit(1);
    }
  }

  if (!source.includes("runtimeOnly: true")) {
    console.error("[PATCH_FAILED]", target.key, "missing runtimeOnly marker.");
    process.exit(1);
  }

  // Validate actions is no longer inside metadata.
  const metadataIndex = source.indexOf("metadata:");
  const metadataOpen = source.indexOf("{", metadataIndex);
  const metadataClose = findBalancedObjectEnd(source, metadataOpen);
  const metadataBlock = source.slice(metadataOpen, metadataClose + 1);

  if (metadataBlock.includes("actions: [")) {
    console.error("[PATCH_FAILED]", target.key, "actions still inside metadata.");
    process.exit(1);
  }

  fs.writeFileSync(full(target.file), source, "utf8");
  console.log("[WRITTEN]", target.file);
}

console.log("[Q2-OP-I16-B2-FIX] Actions moved to ERPModule root level.");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\scripts\\runtime\\q2op-i16b1-audit-stock-order-reception-actions.cjs");
console.log("  git status --short");
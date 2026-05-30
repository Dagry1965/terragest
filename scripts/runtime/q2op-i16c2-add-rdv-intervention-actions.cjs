const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targets = [
  {
    key: "rendezvous",
    file: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
    requiredKeys: ["reporter-rdv"],
    actionsToEnsure: [
      {
        key: "reporter-rdv",
        label: "Reporter RDV",
        type: "secondary",
        runtimeOnly: true,
      },
    ],
  },
  {
    key: "interventionsauto",
    file: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
    requiredKeys: ["demarrer-intervention"],
    actionsToEnsure: [
      {
        key: "demarrer-intervention",
        label: "Demarrer intervention",
        type: "primary",
        runtimeOnly: true,
      },
    ],
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

function actionObjectToText(action) {
  return `    {
      key: "${action.key}",
      label: "${action.label}",
      type: "${action.type}",
      runtimeOnly: true,
    }`;
}

function extractRootActionsBlock(source) {
  const actionIndex = source.indexOf("actions: [");

  if (actionIndex === -1) {
    return null;
  }

  const arrayOpen = source.indexOf("[", actionIndex);
  const arrayClose = findBalancedEnd(source, arrayOpen, "[", "]");

  if (arrayOpen === -1 || arrayClose === -1) {
    return null;
  }

  return {
    actionIndex,
    arrayOpen,
    arrayClose,
    block: source.slice(actionIndex, arrayClose + 1),
  };
}

function insertActionsAfterMetadata(source, actionsText, key) {
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

  return source.slice(0, insertAt) + "\n\n" + actionsText + source.slice(insertAt);
}

function ensureActions(source, target) {
  const existing = extractRootActionsBlock(source);

  const missingActions = target.actionsToEnsure.filter(
    (action) => !source.includes(`key: "${action.key}"`)
  );

  if (missingActions.length === 0) {
    console.log("[SKIP]", target.key, "actions already present");
    return source;
  }

  const actionTexts = missingActions.map(actionObjectToText);

  if (!existing) {
    const actionsBlock =
`  actions: [
${actionTexts.join(",\n")}
  ],`;

    return insertActionsAfterMetadata(source, actionsBlock, target.key);
  }

  const beforeArrayClose = source.slice(0, existing.arrayClose);
  const afterArrayClose = source.slice(existing.arrayClose);

  const insertion =
    existing.block.trim() === "actions: []"
      ? "\n" + actionTexts.join(",\n") + "\n  "
      : ",\n" + actionTexts.join(",\n");

  return beforeArrayClose + insertion + afterArrayClose;
}

function extractFirstActionsBlock(source) {
  const existing = extractRootActionsBlock(source);
  return existing?.block ?? "";
}

for (const target of targets) {
  backup(target.file, "bak-q2op-i16c2-add-actions");

  let source = fs.readFileSync(full(target.file), "utf8");

  source = ensureActions(source, target);

  const actionsBlock = extractFirstActionsBlock(source);

  if (!actionsBlock) {
    console.error("[PATCH_FAILED]", target.key, "actions block missing after patch.");
    process.exit(1);
  }

  for (const key of target.requiredKeys) {
    if (!actionsBlock.includes(key)) {
      console.error("[PATCH_FAILED]", target.key, "missing action key:", key);
      process.exit(1);
    }
  }

  for (const marker of ["description:", "visibleWhen:"]) {
    if (actionsBlock.includes(marker)) {
      console.error("[PATCH_FAILED]", target.key, "unsupported marker inside actions block:", marker);
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

console.log("[Q2-OP-I16-C2] Rendezvous/interventions runtime actions added.");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\scripts\\runtime\\q2op-i16c1-audit-rdv-intervention-actions.cjs");
console.log("  node .\\scripts\\runtime\\q2op-i16a-audit-priority-workflows-from-action-bar.cjs");
console.log("  git status --short");
const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targets = [
  {
    key: "rendezvous",
    file: "src/runtime/modules/generated/rendezvous/rendezvous.actions.ts",
    actionKey: "reporter-rdv",
    actionText: `  {
    key: "reporter-rdv",
    label: "Reporter RDV",
    type: "secondary",
    runtimeOnly: true,
  }`,
  },
  {
    key: "interventionsauto",
    file: "src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts",
    actionKey: "demarrer-intervention",
    actionText: `  {
    key: "demarrer-intervention",
    label: "Demarrer intervention",
    type: "primary",
    runtimeOnly: true,
  }`,
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

function patchActionsFile(source, target) {
  if (source.includes(`key: "${target.actionKey}"`)) {
    console.log("[SKIP]", target.key, "action already present:", target.actionKey);
    return source;
  }

  const exportIndex = source.indexOf("export const");

  if (exportIndex === -1) {
    console.error("[PATCH_FAILED]", target.key, "export const not found.");
    process.exit(1);
  }

  const arrayOpen = source.indexOf("[", exportIndex);

  if (arrayOpen === -1) {
    console.error("[PATCH_FAILED]", target.key, "actions array open not found.");
    process.exit(1);
  }

  const arrayClose = findBalancedEnd(source, arrayOpen, "[", "]");

  if (arrayClose === -1) {
    console.error("[PATCH_FAILED]", target.key, "actions array close not found.");
    process.exit(1);
  }

  const existingContent = source.slice(arrayOpen + 1, arrayClose).trim();

  const insertion =
    existingContent.length === 0
      ? "\n" + target.actionText + "\n"
      : ",\n" + target.actionText + "\n";

  return source.slice(0, arrayClose) + insertion + source.slice(arrayClose);
}

for (const target of targets) {
  backup(target.file, "bak-q2op-i16c4-add-action");

  let source = fs.readFileSync(full(target.file), "utf8");

  source = patchActionsFile(source, target);

  const actionIndex = source.indexOf(`key: "${target.actionKey}"`);
  const actionSnippet =
    actionIndex >= 0
      ? source.slice(actionIndex, actionIndex + 260)
      : "";

  if (!actionSnippet.includes("runtimeOnly: true")) {
    console.error("[PATCH_FAILED]", target.key, "runtimeOnly missing near action:", target.actionKey);
    process.exit(1);
  }

  for (const marker of ["description:", "visibleWhen:"]) {
    if (actionSnippet.includes(marker)) {
      console.error("[PATCH_FAILED]", target.key, "unsupported marker near new action:", marker);
      process.exit(1);
    }
  }

  fs.writeFileSync(full(target.file), source, "utf8");
  console.log("[WRITTEN]", target.file);
}

console.log("[Q2-OP-I16-C4] Rendezvous/interventions actions added to action files.");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\scripts\\runtime\\q2op-i16c3-audit-rdv-intervention-action-files.cjs");
console.log("  node .\\scripts\\runtime\\q2op-i16c1-audit-rdv-intervention-actions.cjs");
console.log("  node .\\scripts\\runtime\\q2op-i16a-audit-priority-workflows-from-action-bar.cjs");
console.log("  git status --short");
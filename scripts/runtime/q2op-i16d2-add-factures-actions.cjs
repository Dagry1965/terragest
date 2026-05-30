const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = {
  key: "facturesauto",
  file: "src/runtime/modules/generated/facturesauto/facturesauto.actions.ts",
  identifier: "facturesautoActions",
  actions: [
    {
      key: "envoyer-facture",
      label: "Envoyer facture",
      type: "primary",
      runtimeOnly: true,
    },
    {
      key: "annuler-facture",
      label: "Annuler facture",
      type: "danger",
      runtimeOnly: true,
    },
  ],
};

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

function actionToText(action) {
  return `  {
    key: "${action.key}",
    label: "${action.label}",
    type: "${action.type}",
    runtimeOnly: true,
  }`;
}

function getExportArrayBounds(source) {
  const exportMarker = `export const ${target.identifier}`;
  const exportIndex = source.indexOf(exportMarker);

  if (exportIndex === -1) {
    console.error("[PATCH_FAILED] export marker not found:", exportMarker);
    process.exit(1);
  }

  const assignmentIndex = source.indexOf("= [", exportIndex);

  if (assignmentIndex === -1) {
    console.error("[PATCH_FAILED] value array assignment '= [' not found.");
    process.exit(1);
  }

  const arrayOpen = source.indexOf("[", assignmentIndex);
  const arrayClose = findBalancedEnd(source, arrayOpen, "[", "]");

  if (arrayOpen === -1 || arrayClose === -1) {
    console.error("[PATCH_FAILED] actions value array bounds not found.");
    process.exit(1);
  }

  return {
    arrayOpen,
    arrayClose,
  };
}

function ensureActions(source) {
  let current = source;

  for (const action of target.actions) {
    const bounds = getExportArrayBounds(current);
    const arrayText = current.slice(bounds.arrayOpen, bounds.arrayClose + 1);

    if (arrayText.includes(`key: "${action.key}"`)) {
      console.log("[SKIP] action already present:", action.key);
      continue;
    }

    const inside = current.slice(bounds.arrayOpen + 1, bounds.arrayClose).trim();

    const insertion =
      inside.length === 0
        ? "\n" + actionToText(action) + "\n"
        : ",\n" + actionToText(action) + "\n";

    current =
      current.slice(0, bounds.arrayClose) +
      insertion +
      current.slice(bounds.arrayClose);

    console.log("[PATCHED] action added:", action.key);
  }

  return current;
}

backup(target.file, "bak-q2op-i16d2-add-factures-actions");

let source = fs.readFileSync(full(target.file), "utf8");

source = ensureActions(source);

const bounds = getExportArrayBounds(source);
const arrayText = source.slice(bounds.arrayOpen, bounds.arrayClose + 1);

for (const action of target.actions) {
  if (!arrayText.includes(`key: "${action.key}"`)) {
    console.error("[PATCH_FAILED] missing action key:", action.key);
    process.exit(1);
  }
}

if (!arrayText.includes("runtimeOnly: true")) {
  console.error("[PATCH_FAILED] runtimeOnly missing.");
  process.exit(1);
}

for (const marker of ["description:", "visibleWhen:"]) {
  if (arrayText.includes(marker)) {
    console.error("[PATCH_FAILED] unsupported marker in actions array:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(full(target.file), source, "utf8");

console.log("[WRITTEN]", target.file);
console.log("[Q2-OP-I16-D2] Factures runtime actions added.");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\scripts\\runtime\\q2op-i16d1-audit-factures-actions.cjs");
console.log("  node .\\scripts\\runtime\\q2op-i16a-audit-priority-workflows-from-action-bar.cjs");
console.log("  git status --short");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/modules/generated/facturesauto/facturesauto.actions.ts";
const fullPath = path.join(root, file);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", file);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-i16d2-fix2-filter-boolean`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

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

const exportMarker = "export const facturesautoActions";
const exportIndex = source.indexOf(exportMarker);

if (exportIndex === -1) {
  console.error("[PATCH_FAILED] export const facturesautoActions not found.");
  process.exit(1);
}

const assignmentIndex = source.indexOf("= [", exportIndex);

if (assignmentIndex === -1) {
  console.error("[PATCH_FAILED] '= [' not found for facturesautoActions.");
  process.exit(1);
}

const arrayOpen = source.indexOf("[", assignmentIndex);
const arrayClose = findBalancedEnd(source, arrayOpen, "[", "]");

if (arrayOpen === -1 || arrayClose === -1) {
  console.error("[PATCH_FAILED] array bounds not found.");
  process.exit(1);
}

// Normalize declaration prefix.
const beforeExport = source.slice(0, exportIndex);
const arrayBody = source.slice(arrayOpen, arrayClose + 1);
let afterArray = source.slice(arrayClose + 1);

// Remove any existing semicolon right after the array.
afterArray = afterArray.replace(/^\s*;?/, "");

// Ensure strict filtered type.
source =
  beforeExport +
  "export const facturesautoActions = " +
  arrayBody +
  ".filter(Boolean) as ERPModuleAction[];" +
  afterArray;

const forbiddenDeclaration =
  "export const facturesautoActions: ERPModuleAction[]";

if (source.includes(forbiddenDeclaration)) {
  console.error("[PATCH_FAILED] old strict array annotation remains.");
  process.exit(1);
}

const required = [
  "export const facturesautoActions = [",
  ".filter(Boolean) as ERPModuleAction[];",
  'key: "envoyer-facture"',
  'key: "annuler-facture"',
  "runtimeOnly: true",
];

for (const marker of required) {
  if (!source.includes(marker)) {
    console.error("[PATCH_FAILED] required marker missing:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", file);
console.log("[Q2-OP-I16-D2-FIX2] facturesautoActions now filters undefined entries before ERPModuleAction cast.");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\scripts\\runtime\\q2op-i16d1-audit-factures-actions.cjs");
console.log("  node .\\scripts\\runtime\\q2op-i16a-audit-priority-workflows-from-action-bar.cjs");
console.log("  git status --short");
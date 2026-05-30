const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targets = [
  {
    key: "interventionsauto",
    moduleFile: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
    identifier: "actions: interventionsautoActions",
  },
  {
    key: "rendezvous",
    moduleFile: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
    identifier: "actions: rendezvousActions",
  },
];

function full(relativePath) {
  return path.join(root, relativePath);
}

function backup(relativePath, suffix) {
  const file = full(relativePath);

  if (!fs.existsSync(file)) {
    return;
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

function removeLastInlineActionsBeforeIdentifier(source, identifier, key) {
  const identifierIndex = source.indexOf(identifier);

  if (identifierIndex === -1) {
    console.log("[SKIP]", key, "identifier not found:", identifier);
    return source;
  }

  const beforeIdentifier = source.slice(0, identifierIndex);
  const actionIndex = beforeIdentifier.lastIndexOf("actions: [");

  if (actionIndex === -1) {
    console.log("[SKIP]", key, "no inline actions before identifier");
    return source;
  }

  const lineStart = source.lastIndexOf("\n", actionIndex);
  const start = lineStart === -1 ? actionIndex : lineStart + 1;

  const arrayOpen = source.indexOf("[", actionIndex);
  const arrayClose = findBalancedEnd(source, arrayOpen, "[", "]");

  if (arrayOpen === -1 || arrayClose === -1) {
    console.error("[PATCH_FAILED]", key, "inline actions array boundaries not found.");
    process.exit(1);
  }

  if (arrayClose > identifierIndex) {
    console.error("[PATCH_FAILED]", key, "inline actions array crosses identifier. Refusing patch.");
    process.exit(1);
  }

  let end = arrayClose + 1;

  const tail = source.slice(end, end + 40);
  const suffix = tail.match(/^\s*,?/);

  if (suffix) {
    end += suffix[0].length;
  }

  const removedBlock = source.slice(start, end);

  if (!removedBlock.includes("actions: [")) {
    console.error("[PATCH_FAILED]", key, "removed block does not contain actions array.");
    process.exit(1);
  }

  console.log("[REMOVED]", key, "inline actions block before", identifier);

  return source.slice(0, start) + source.slice(end);
}

for (const target of targets) {
  const file = full(target.moduleFile);

  if (!fs.existsSync(file)) {
    console.log("[SKIP]", target.key, "module file missing");
    continue;
  }

  backup(target.moduleFile, "bak-q2op-i16c2-fix3-remove-actions-before-identifier");

  let source = fs.readFileSync(file, "utf8");

  source = removeLastInlineActionsBeforeIdentifier(
    source,
    target.identifier,
    target.key
  );

  const identifierCount =
    source.split(target.identifier).length - 1;

  if (identifierCount > 1) {
    console.error("[PATCH_FAILED]", target.key, "identifier appears multiple times:", identifierCount);
    process.exit(1);
  }

  if (source.includes("actions: [") && source.includes(target.identifier)) {
    const identifierIndex = source.indexOf(target.identifier);
    const inlineBeforeIdentifier =
      source.slice(0, identifierIndex).includes("actions: [");

    if (inlineBeforeIdentifier) {
      console.error("[PATCH_FAILED]", target.key, "inline actions still exists before identifier.");
      process.exit(1);
    }
  }

  fs.writeFileSync(file, source, "utf8");
  console.log("[WRITTEN]", target.moduleFile);
}

console.log("[Q2-OP-I16-C2-FIX3] Duplicate inline actions before identifier removed.");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\scripts\\runtime\\q2op-i16c1-audit-rdv-intervention-actions.cjs");
console.log("  node .\\scripts\\runtime\\q2op-i16a-audit-priority-workflows-from-action-bar.cjs");
console.log("  git status --short");
const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targets = [
  {
    key: "rendezvous",
    file: "src/runtime/modules/generated/rendezvous/rendezvous.actions.ts",
    identifier: "rendezvousActions",
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
    identifier: "interventionsautoActions",
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

function repairCorruptedTypeArrayInsertion(source, target) {
  const corruptMarker =
    `export const ${target.identifier}: ERPModuleAction[`;

  const corruptIndex = source.indexOf(corruptMarker);

  if (corruptIndex === -1) {
    return source;
  }

  const assignmentMarker = "] = [";
  const assignmentIndex =
    source.indexOf(assignmentMarker, corruptIndex);

  if (assignmentIndex === -1) {
    return source;
  }

  const corruptedInsideType =
    source
      .slice(corruptIndex + corruptMarker.length, assignmentIndex)
      .trim();

  if (!corruptedInsideType.includes(`key: "${target.actionKey}"`)) {
    return source;
  }

  const before =
    source.slice(0, corruptIndex) +
    `export const ${target.identifier}: ERPModuleAction[] = [`;

  const after =
    source.slice(assignmentIndex + assignmentMarker.length);

  const normalizedAction =
    corruptedInsideType
      .replace(/^\s*/, "")
      .replace(/\s*$/, "");

  console.log("[REPAIRED]", target.key, "action moved from type annotation into value array");

  return before + "\n" + normalizedAction + "," + after;
}

function getExportArrayBounds(source, target) {
  const exportMarker =
    `export const ${target.identifier}`;

  const exportIndex =
    source.indexOf(exportMarker);

  if (exportIndex === -1) {
    console.error("[PATCH_FAILED]", target.key, "export marker not found:", exportMarker);
    process.exit(1);
  }

  const assignmentIndex =
    source.indexOf("= [", exportIndex);

  if (assignmentIndex === -1) {
    console.error("[PATCH_FAILED]", target.key, "value array assignment '= [' not found.");
    process.exit(1);
  }

  const arrayOpen =
    source.indexOf("[", assignmentIndex);

  const arrayClose =
    findBalancedEnd(source, arrayOpen, "[", "]");

  if (arrayOpen === -1 || arrayClose === -1) {
    console.error("[PATCH_FAILED]", target.key, "value array bounds not found.");
    process.exit(1);
  }

  return {
    exportIndex,
    arrayOpen,
    arrayClose,
  };
}

function ensureActionInsideValueArray(source, target) {
  const bounds = getExportArrayBounds(source, target);

  const arrayText =
    source.slice(bounds.arrayOpen, bounds.arrayClose + 1);

  if (arrayText.includes(`key: "${target.actionKey}"`)) {
    console.log("[OK]", target.key, "action present in value array:", target.actionKey);
    return source;
  }

  const inside =
    source.slice(bounds.arrayOpen + 1, bounds.arrayClose).trim();

  const insertion =
    inside.length === 0
      ? "\n" + target.actionText + "\n"
      : ",\n" + target.actionText + "\n";

  console.log("[PATCHED]", target.key, "action added to value array:", target.actionKey);

  return (
    source.slice(0, bounds.arrayClose) +
    insertion +
    source.slice(bounds.arrayClose)
  );
}

for (const target of targets) {
  backup(target.file, "bak-q2op-i16c4-fix-actions-array-insertion");

  let source =
    fs.readFileSync(full(target.file), "utf8");

  source =
    repairCorruptedTypeArrayInsertion(source, target);

  source =
    ensureActionInsideValueArray(source, target);

  const forbiddenPatterns = [
    `ERPModuleAction[
  {`,
    `ERPModuleAction[
    {`,
  ];

  for (const marker of forbiddenPatterns) {
    if (source.includes(marker)) {
      console.error("[PATCH_FAILED]", target.key, "corrupted type annotation remains.");
      process.exit(1);
    }
  }

  const bounds =
    getExportArrayBounds(source, target);

  const arrayText =
    source.slice(bounds.arrayOpen, bounds.arrayClose + 1);

  if (!arrayText.includes(`key: "${target.actionKey}"`)) {
    console.error("[PATCH_FAILED]", target.key, "action key missing from value array:", target.actionKey);
    process.exit(1);
  }

  if (!arrayText.includes("runtimeOnly: true")) {
    console.error("[PATCH_FAILED]", target.key, "runtimeOnly missing from value array.");
    process.exit(1);
  }

  for (const marker of ["description:", "visibleWhen:"]) {
    if (arrayText.includes(marker)) {
      console.error("[PATCH_FAILED]", target.key, "unsupported marker in actions value array:", marker);
      process.exit(1);
    }
  }

  fs.writeFileSync(full(target.file), source, "utf8");
  console.log("[WRITTEN]", target.file);
}

console.log("[Q2-OP-I16-C4-FIX] Action files repaired.");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\scripts\\runtime\\q2op-i16c3-audit-rdv-intervention-action-files.cjs");
console.log("  node .\\scripts\\runtime\\q2op-i16a-audit-priority-workflows-from-action-bar.cjs");
console.log("  git status --short");
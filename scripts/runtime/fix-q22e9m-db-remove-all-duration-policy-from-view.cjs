/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9M-D-B-FIX4";

const TARGET = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "scheduling",
  "ERPSchedulingPlanningView.tsx"
);

const BACKUP = `${TARGET}.bak-q22e9m-db-fix4-remove-all-duration-policy`;

function rel(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function read(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`[${PASS_ID}] Fichier introuvable: ${rel(file)}`);
  }

  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file) {
  if (!fs.existsSync(BACKUP)) {
    fs.copyFileSync(file, BACKUP);
    console.log(`[BACKUP] ${rel(BACKUP)}`);
  } else {
    console.log(`[BACKUP_EXISTS] ${rel(BACKUP)}`);
  }
}

function findMatchingBrace(content, openBraceIndex) {
  let depth = 0;

  for (let i = openBraceIndex; i < content.length; i += 1) {
    const char = content[i];

    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;

    if (depth === 0) return i;
  }

  return -1;
}

function removeIfBlockContaining(content, needle, safetyNeedle) {
  const needleIndex = content.indexOf(needle);

  if (needleIndex === -1) {
    console.log(`[SKIP] ${needle} absent`);
    return content;
  }

  const ifStart = content.lastIndexOf("if", needleIndex);

  if (ifStart === -1) {
    throw new Error(`[${PASS_ID}] Impossible de trouver le if autour de ${needle}`);
  }

  const openBraceIndex = content.indexOf("{", ifStart);

  if (openBraceIndex === -1) {
    throw new Error(`[${PASS_ID}] Accolade ouvrante introuvable autour de ${needle}`);
  }

  const closeBraceIndex = findMatchingBrace(content, openBraceIndex);

  if (closeBraceIndex === -1) {
    throw new Error(`[${PASS_ID}] Accolade fermante introuvable autour de ${needle}`);
  }

  const block = content.slice(ifStart, closeBraceIndex + 1);

  if (!block.includes(needle) || !block.includes(safetyNeedle)) {
    throw new Error(
      `[${PASS_ID}] Sécurité: le bloc trouvé ne contient pas ${needle} + ${safetyNeedle}`
    );
  }

  console.log(`[REMOVED] bloc if contenant ${needle}`);

  return (
    content.slice(0, ifStart).replace(/\n\s*$/, "\n") +
    content.slice(closeBraceIndex + 1).replace(/^\s*\n/, "\n")
  );
}

function removeVisibleDurationDeclaration(content) {
  let next = content;

  next = next.replace(
    /\s*const visibleDurationMinutes\s*=\s*Number\(\s*schedulingConfig\.[\s\S]*?\)\s*\|\|\s*undefined;\s*/m,
    "\n"
  );

  next = next.replace(
    /\s*const visibleDurationMinutes\s*=\s*[\s\S]*?;\s*/m,
    (match) => {
      if (
        match.includes("schedulingConfig.durationMinutes") ||
        match.includes("schedulingConfig.slotDurationMinutes") ||
        match.includes("schedulingConfig.defaultDurationMinutes")
      ) {
        console.log("[REMOVED] visibleDurationMinutes declaration");
        return "\n";
      }

      return match;
    }
  );

  return next;
}

function removeRuntimeDurationOption(content) {
  let next = content;

  next = next.replace(
    /\s*durationMinutes:\s*visibleDurationMinutes,\r?\n/g,
    "\n"
  );

  next = next.replace(
    /\s*bufferMinutes:\s*schedulingConfig\.bufferMinutes,\r?\n/g,
    "\n"
  );

  return next;
}

function removeVisibleDurationHelper(content) {
  const helperIndex = content.indexOf("function getVisibleSchedulingDurationMinutes(");

  if (helperIndex === -1) {
    console.log("[SKIP] getVisibleSchedulingDurationMinutes déjà absent");
    return content;
  }

  const nextFunctionIndex = content.indexOf("\nfunction ", helperIndex + 1);
  const nextConstIndex = content.indexOf("\nconst ", helperIndex + 1);

  const candidates = [nextFunctionIndex, nextConstIndex]
    .filter((index) => index !== -1)
    .sort((a, b) => a - b);

  const endIndex = candidates.length > 0 ? candidates[0] : content.length;

  console.log("[REMOVED] helper getVisibleSchedulingDurationMinutes");

  return (
    content.slice(0, helperIndex).replace(/\n\s*$/, "\n") +
    content.slice(endIndex).replace(/^\s*\n/, "\n")
  );
}

function main() {
  console.log(`[${PASS_ID}] Suppression complète duration/buffer policy de la vue planning...`);

  let content = read(TARGET);
  backup(TARGET);

  content = removeIfBlockContaining(
    content,
    "schedulingConfig.durationField",
    "searchParams.set"
  );

  content = removeVisibleDurationDeclaration(content);
  content = removeRuntimeDurationOption(content);
  content = removeVisibleDurationHelper(content);

  const forbidden = [
    "getVisibleSchedulingDurationMinutes(",
    "RuntimeSchedulingEngine.defaultDurationMinutes",
    "schedulingConfig.defaultDurationMinutes",
    "schedulingConfig.durationMinutes",
    "schedulingConfig.slotDurationMinutes",
    "bufferMinutes: schedulingConfig.bufferMinutes",
  ];

  const remaining = forbidden.filter((needle) => content.includes(needle));

  if (remaining.length > 0) {
    throw new Error(
      `[${PASS_ID}] Références interdites restantes: ${remaining.join(", ")}`
    );
  }

  write(TARGET, content);

  console.log(`[WRITTEN] ${rel(TARGET)}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  node .\\\\scripts\\\\runtime\\\\audit-q22e9m-d-planning-view-policy-leak.cjs");
}

main();
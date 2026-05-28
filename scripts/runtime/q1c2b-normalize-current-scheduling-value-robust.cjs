const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const file = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPFormField.tsx"
);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + file);
}

const original = fs.readFileSync(file, "utf8");
let content = original;

const backup = file + ".bak-q1c2b-normalize-current-scheduling-value-robust";
fs.writeFileSync(backup, original, "utf8");

/**
 * Q1-C2B
 * Normalise les valeurs du champ planning.
 * Exemple :
 * "08:00 - 09:00 · Disponible" -> "08:00"
 * "08h00 - 09h00" -> "08:00"
 */

if (!content.includes("function normalizeRuntimeSchedulingTimeValue")) {
  const helper = `
function normalizeRuntimeSchedulingTimeValue(value: unknown): string {
  const text = String(value ?? "").trim();

  if (!text) {
    return "";
  }

  const firstTime = text.match(/\\b([01]?\\d|2[0-3])[:hH]([0-5]\\d)\\b/);

  if (!firstTime) {
    return text;
  }

  return firstTime[1].padStart(2, "0") + ":" + firstTime[2];
}

`;

  const markers = [
    "export function ERPFormField",
    "function ERPFormField",
    "const gridClassMap",
  ];

  let insertIndex = -1;

  for (const marker of markers) {
    insertIndex = content.indexOf(marker);
    if (insertIndex >= 0) break;
  }

  if (insertIndex < 0) {
    throw new Error("Point insertion helper introuvable: ERPFormField/gridClassMap");
  }

  content = content.slice(0, insertIndex) + helper + content.slice(insertIndex);
}

content = content.replace(
  /const currentSchedulingValue =\s*String\(currentValue \?\? ""\)\.trim\(\);/,
  `const currentSchedulingValue =
      normalizeRuntimeSchedulingTimeValue(currentValue);`
);

/**
 * On cible seulement le select scheduling : celui juste avant disabledReason/options slots.
 */
content = content.replace(
  /onChange=\{\(event\) => onChange\?\.\(field\.key, event\.target\.value\)\}\s+className=\{\`\$\{className\} \$\{\s*isProtected \|\| !hasDate \|\| !hasRequiredResource/,
  `onChange={(event) =>
                onChange?.(
                  field.key,
                  normalizeRuntimeSchedulingTimeValue(event.target.value)
                )
              }
              className={\`\${className} \${isProtected || !hasDate || !hasRequiredResource`
);

const problems = [];

if (!content.includes("function normalizeRuntimeSchedulingTimeValue")) {
  problems.push("helper normalizeRuntimeSchedulingTimeValue absent");
}

if (content.includes('const currentSchedulingValue =\n        String(currentValue ?? "").trim();')) {
  problems.push("currentSchedulingValue encore brut");
}

if (!content.includes("normalizeRuntimeSchedulingTimeValue(event.target.value)")) {
  problems.push("onChange scheduling non normalisé");
}

if (problems.length > 0) {
  console.log("[FAIL] Correction incomplète:");
  for (const problem of problems) {
    console.log(" - " + problem);
  }
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(1);
}

if (content === original) {
  console.log("[INFO] Aucun changement, correction probablement déjà appliquée.");
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(0);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q1-C2B heure RDV normalisée dans le champ planning.");
console.log("[BACKUP]", path.relative(ROOT, backup));
console.log("[WRITTEN]", path.relative(ROOT, file));
console.log("");
console.log("Next:");
console.log("pnpm build");

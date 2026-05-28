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

const backup = file + ".bak-q1c3-simplify-scheduling-option-labels";
fs.writeFileSync(backup, original, "utf8");

/**
 * Q1-C3
 * Simplifier l'affichage du select planning.
 *
 * Valeur sauvegardée : slot.start -> 09:15
 * Libellé affiché : slot.start -> 09:15
 * Indisponible : slot.start + raison -> 09:15 · occupé
 */

// 1. Le faux "Créneau actuel" ne doit plus polluer l'affichage fermé.
content = content.replace(
  /label:\s*currentSchedulingValue \+ ".*?Cr.*?neau actuel"/g,
  `label: currentSchedulingValue`
);

// 2. Remplacer l'affichage disponible très long par l'heure simple.
content = content.replace(
  /\{slot\.available\s*\?\s*slot\.remainingCapacity !== undefined &&\s*slot\.capacity !== undefined &&\s*slot\.capacity > 1\s*\?\s*slot\.label \+ ".*?" \+ slot\.remainingCapacity \+ " place\(s\) restante\(s\)"\s*:\s*slot\.label \+ ".*?Disponible"\s*:\s*slot\.reason \?\? ".*?complet"\}/s,
  `{slot.available
                    ? slot.start
                    : slot.start + " · " + (slot.reason ?? "occupé")}`
);

// 3. Fallback si l'encodage ou le format diffère.
content = content.replace(
  /slot\.label \+ ".*?Disponible"/g,
  `slot.start`
);

content = content.replace(
  /slot\.label \+ ".*?" \+ slot\.remainingCapacity \+ " place\(s\) restante\(s\)"/g,
  `slot.start`
);

content = content.replace(
  /slot\.reason \?\? ".*?complet"/g,
  `slot.start + " · " + (slot.reason ?? "occupé")`
);

if (!content.includes("value={slot.start}")) {
  console.log("[FAIL] value={slot.start} absent, select scheduling suspect.");
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(1);
}

if (content === original) {
  console.log("[INFO] Aucun changement applique. Le format etait peut-etre deja simplifie.");
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(0);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q1-C3 libelles du select planning simplifies.");
console.log("[BACKUP]", path.relative(ROOT, backup));
console.log("[WRITTEN]", path.relative(ROOT, file));
console.log("");
console.log("Next:");
console.log("pnpm build");

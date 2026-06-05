const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/operational/ERPOperationalExpandedChildren.tsx";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");
fs.writeFileSync(file + ".bak-q2i-eb-b3b-missing-inner-close-regex", original, "utf8");

let next = original;

const afterChildrenStart = next.indexOf('{shouldRenderTree && treePlacement === "afterChildren" ? (');

if (afterChildrenStart === -1) {
  throw new Error("afterChildren block not found.");
}

const before = next.slice(0, afterChildrenStart);
const after = next.slice(afterChildrenStart);

// Si juste avant afterChildren on n'a qu'un seul </div>, on ajoute le </div> manquant.
// On vise la fin du bloc avant afterChildren, sans toucher au reste.
const fixedBefore = before.replace(
  /(\s*)<\/div>\s*$/,
  "$1</div>\n$1</div>\n\n"
);

if (fixedBefore === before) {
  throw new Error("Could not add missing inner </div> before afterChildren.");
}

next = fixedBefore + after;

const openDivCount = (next.match(/<div\b/g) || []).length;
const closeDivCount = (next.match(/<\/div>/g) || []).length;

console.log("[DIVS] open =", openDivCount, "close =", closeDivCount);

if (closeDivCount < openDivCount) {
  throw new Error("Still fewer closing divs than opening divs after patch.");
}

if (!/treePlacement === "beforeChildren"/.test(next)) {
  throw new Error("beforeChildren placement missing after patch.");
}

if (!/treePlacement === "afterChildren"/.test(next)) {
  throw new Error("afterChildren placement missing after patch.");
}

if (/title="Arbre operationnel"|emptyLabel="Aucun arbre operationnel disponible\."|defaultExpandedDepth=\{2\}/.test(next)) {
  throw new Error("Fixed tree props still present after patch.");
}

if (/AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(next)) {
  throw new Error("Hardcoded AMARKHYS context detected.");
}

fs.writeFileSync(file, next, "utf8");

console.log("[DONE] Q2-I-E-B3B missing inner JSX close fixed.");
console.log("[WRITTEN]", rel);

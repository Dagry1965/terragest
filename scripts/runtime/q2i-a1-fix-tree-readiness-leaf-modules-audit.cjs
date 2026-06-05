const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rel = "scripts/runtime/q2i-a-operational-tree-runtime-readiness-audit.cjs";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");
fs.writeFileSync(file + ".bak-q2i-a1-leaf-modules-false-fails", original, "utf8");

let content = original;

content = content.replace(
`  checkAnyContains(rel, composition, ["relations:", "children:"], \`\${moduleKey} déclare relations ou children\`);

  if (composition.includes("children:")) {`,
`  const hasRelationsOrChildren =
    composition.includes("relations:") || composition.includes("children:");

  if (!hasRelationsOrChildren) {
    addFinding(
      "INFO",
      rel,
      \`\${moduleKey} n’a pas de relations/children directs ; traité comme module feuille possible dans l’arbre.\`
    );
  } else {
    checks.push({
      level: "OK",
      file: rel,
      message: \`\${moduleKey} déclare relations ou children\`,
      pattern: "relations: OR children:",
    });
  }

  if (composition.includes("children:")) {`
);

if (content === original) {
  throw new Error("Pattern de remplacement introuvable dans " + rel);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q2-I-A1 faux FAIL modules feuilles corrigés.");
console.log("[WRITTEN]", rel);
console.log("");
console.log("Next:");
console.log("node .\\scripts\\runtime\\q2i-a-operational-tree-runtime-readiness-audit.cjs");
console.log("pnpm run build");

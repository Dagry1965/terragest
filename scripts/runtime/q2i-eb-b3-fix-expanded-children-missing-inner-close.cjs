const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/operational/ERPOperationalExpandedChildren.tsx";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");
fs.writeFileSync(file + ".bak-q2i-eb-b3-missing-inner-close", original, "utf8");

let next = original;

const badBlock = `      </div>
      {shouldRenderTree && treePlacement === "afterChildren" ? (`;

const goodBlock = `      </div>
      </div>

      {shouldRenderTree && treePlacement === "afterChildren" ? (`;

if (!next.includes(badBlock)) {
  throw new Error("Expected missing inner close pattern not found.");
}

next = next.replace(badBlock, goodBlock);

if (!next.includes('treePlacement === "beforeChildren"')) {
  throw new Error("beforeChildren placement missing after patch.");
}

if (!next.includes('treePlacement === "afterChildren"')) {
  throw new Error("afterChildren placement missing after patch.");
}

if (/title="Arbre operationnel"|emptyLabel="Aucun arbre operationnel disponible\\."|defaultExpandedDepth=\\{2\\}/.test(next)) {
  throw new Error("Fixed tree props still present after patch.");
}

if (/AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(next)) {
  throw new Error("Hardcoded AMARKHYS context detected.");
}

fs.writeFileSync(file, next, "utf8");

console.log("[DONE] Q2-I-E-B3 missing inner JSX close fixed.");
console.log("[WRITTEN]", rel);

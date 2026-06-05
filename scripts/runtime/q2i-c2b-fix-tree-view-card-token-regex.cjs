const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/operational/ERPOperationalTreeView.tsx";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");
fs.writeFileSync(file + ".bak-q2i-c2b-fix-operational-ui-card-token-regex", original, "utf8");

let next = original;

const beforeCount = (next.match(/operationalUiTokens\.card/g) || []).length;

next = next.replace(
  /className={operationalUiTokens\.card}/g,
  'className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"'
);

const afterCount = (next.match(/operationalUiTokens\.card/g) || []).length;

if (beforeCount === 0) {
  console.log("[INFO] Aucun operationalUiTokens.card trouvé.");
} else {
  console.log("[REPLACED]", beforeCount - afterCount, "occurrence(s)");
}

if (afterCount > 0) {
  throw new Error("Il reste encore operationalUiTokens.card dans " + rel);
}

fs.writeFileSync(file, next, "utf8");

console.log("[DONE] Q2-I-C2B operationalUiTokens.card supprimé.");
console.log("[WRITTEN]", rel);

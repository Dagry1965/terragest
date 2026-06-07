const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/actions/RuntimeActionEngine.ts";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

const startMarker = `            result.reason === "line-linked-to-invoice"`;
const endMarker = `          result,`;

const start = content.indexOf(startMarker);
const end = content.indexOf(endMarker, start);

if (start === -1 || end === -1) {
  throw new Error("[FIX] Could not locate remove-line message block in RuntimeActionEngine.ts");
}

const replacement = `            result.reason === "line-linked-to-invoice"
              ? "Cette ligne est déjà liée à une opération métier."
              : result.reason === "already-removed"
                ? "Cette ligne a déjà été retirée."
                : result.reason === "stock-not-found"
                  ? "Stock introuvable pour réintégrer la quantité."
                  : result.reason === "missing-stock-product-or-quantity"
                    ? "Impossible de réintégrer le stock : produit, stock ou quantité manquant."
                    : "Retrait de la ligne impossible.",
`;

content =
  content.slice(0, start) +
  replacement +
  content.slice(end);

if (content !== before) {
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("[UPDATED]", file);
} else {
  console.log("[UNCHANGED]", file);
}

console.log("[FIX] RuntimeActionEngine remove-line message block repaired");
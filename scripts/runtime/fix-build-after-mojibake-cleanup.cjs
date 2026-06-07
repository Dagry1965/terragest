const fs = require("fs");
const path = require("path");

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function write(file, content) {
  fs.writeFileSync(path.join(root, file), content, "utf8");
}

let changed = 0;

// 1) Fix lignesinterventionauto.module.ts broken labels / helper text
{
  const file = "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts";
  let content = read(file);
  const before = content;

  const lines = content.split(/\r?\n/);

  const fixed = lines.map((line) => {
    if (
      line.includes("description:") &&
      line.includes("Pièces, services et main") &&
      line.includes("uvre consommés sur une intervention AMARKHYS")
    ) {
      return `    description: "Pièces, services et main d'oeuvre consommés sur une intervention AMARKHYS",`;
    }

    if (
      line.includes("helperText:") &&
      line.includes("Produit filtré selon le type") &&
      line.includes("article sélectionné")
    ) {
      return `        helperText: "Produit filtré selon le type d'article sélectionné.",`;
    }

    if (
      line.includes(`{ label: "Main`) &&
      line.includes(`uvre"`) &&
      line.includes(`value: "main_oeuvre"`)
    ) {
      return `          { label: "Main d'oeuvre", value: "main_oeuvre" },`;
    }

    return line;
  });

  content = fixed.join("\n");

  // Extra safety for remaining broken fragments in this file.
  content = content
    .replace(/d"[^"]*article/g, "d'article")
    .replace(/d"[^"]*oeuvre/g, "d'oeuvre")
    .replace(/d"[^"]*uvre/g, "d'oeuvre");

  if (content !== before) {
    write(file, content);
    changed++;
    console.log("[UPDATED]", file);
  } else {
    console.log("[UNCHANGED]", file);
  }
}

// 2) Fix RuntimeActionEngine.ts broken ternary messages
{
  const file = "src/runtime/actions/RuntimeActionEngine.ts";
  let content = read(file);
  const before = content;

  const startMarker = `            result.reason === "line-linked-to-invoice"`;
  const endMarker = `                  : result.reason === "missing-stock-product-or-quantity"`;

  const start = content.indexOf(startMarker);
  const end = content.indexOf(endMarker, start);

  if (start === -1 || end === -1) {
    throw new Error("[FIX] Could not locate RuntimeActionEngine broken message block");
  }

  const replacement = `            result.reason === "line-linked-to-invoice"
              ? "Cette ligne est déjà liée à une opération métier."
              : result.reason === "already-removed"
                ? "Cette ligne a déjà été retirée."
                : result.reason === "stock-not-found"
                  ? "Stock introuvable pour réintégrer la quantité."
`;

  content =
    content.slice(0, start) +
    replacement +
    content.slice(end);

  if (content !== before) {
    write(file, content);
    changed++;
    console.log("[UPDATED]", file);
  } else {
    console.log("[UNCHANGED]", file);
  }
}

console.log("[FIX-BUILD-AFTER-MOJIBAKE] changed files:", changed);
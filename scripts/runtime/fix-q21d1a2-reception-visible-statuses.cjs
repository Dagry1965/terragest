const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21d1a2-reception-visible-statuses`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21d1a2-reception-visible-statuses`);
}

let content = fs.readFileSync(file, "utf8");

// Remove Annulee from the visible statut select.
// Annulation will later be handled by a controlled runtime action
// with reverse stock movement, not by manual select.
content = content.replace(
  /\s*\{\s*label:\s*"Annulee",\s*value:\s*"annulee"\s*\},?/g,
  ""
);

// Add explicit note near statut field if not already present.
if (!content.includes("Q21D_RECEPTION_STATUS_RULE")) {
  content = content.replace(
    `        list: { order: 7 },
        grid: { cols: 4 },
      },`,
    `        list: { order: 7 },
        grid: { cols: 4 },
        // Q21D_RECEPTION_STATUS_RULE
        // Statuts visibles volontairement limites :
        // brouillon = preparation sans impact stock
        // validee = entree stock traitee par runtime
        // annulation = future action controlee avec mouvement inverse
      },`
  );
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Reception visible statuses limited to brouillon / validee.");
console.log("Next: pnpm build");
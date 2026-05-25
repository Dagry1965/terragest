const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21d2a1-clean-stock-order-line-module`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21d2a1-clean-stock-order-line-module`);
}

let content = fs.readFileSync(file, "utf8");

// 1) Hide stockId from list/schema visibility but keep temporarily for compatibility.
// Stock destination belongs to reception, not to order line.
content = content.replace(
  /(\s*key:\s*"stockId"[\s\S]*?searchable:\s*true,\s*)list:\s*\{\s*order:\s*3\s*\},/,
  `$1list: { visible: false },`
);

// 2) Hide quantiteRecue from list/schema visibility but keep temporarily for compatibility.
// Received quantity belongs to receptions, not order line manual input.
content = content.replace(
  /(\s*key:\s*"quantiteRecue"[\s\S]*?defaultValue:\s*0,\s*)list:\s*\{\s*order:\s*5\s*\},/,
  `$1list: { visible: false },`
);

// 3) Add montantTTC field after montantHT if missing.
if (!content.includes(`key: "montantTTC"`)) {
  content = content.replace(
    `      {
        key: "montantHT",
        label: "Montant HT",
        type: "number",
        defaultValue: 0,
        list: { order: 6 },
        grid: { cols: 4 },
      },`,
    `      {
        key: "montantHT",
        label: "Montant HT",
        type: "number",
        defaultValue: 0,
        list: { order: 6 },
        grid: { cols: 4 },
      },
      {
        key: "montantTTC",
        label: "Montant TTC",
        type: "number",
        defaultValue: 0,
        list: { order: 7 },
        grid: { cols: 4 },
      },`
  );
}

// 4) Restrict visible line statuses.
content = content.replace(
  /options:\s*\[\s*\{\s*label:\s*"Brouillon",\s*value:\s*"brouillon"\s*\},\s*\{\s*label:\s*"Commandee",\s*value:\s*"commandee"\s*\},\s*\{\s*label:\s*"Partiellement recue",\s*value:\s*"partiellement_recue"\s*\},\s*\{\s*label:\s*"Recue",\s*value:\s*"recue"\s*\},\s*\{\s*label:\s*"Annulee",\s*value:\s*"annulee"\s*\},\s*\]/,
  `options: [
   { label: "Brouillon", value: "brouillon" },
   { label: "Validee", value: "validee" },
 ]`
);

// 5) Add business comment on statut field if missing.
if (!content.includes("Q21D_ORDER_LINE_STATUS_RULE")) {
  content = content.replace(
    ` list: { order: 7 },
 grid: { cols: 4 },
},`,
    ` list: { order: 8 },
 grid: { cols: 4 },
 // Q21D_ORDER_LINE_STATUS_RULE
 // Statuts utilisateur limites :
 // brouillon = ligne en preparation
 // validee = ligne confirmee dans la commande
 // Les etats de reception sont calcules par le systeme.
},`
  );
}

// 6) Remove stockId and quantiteRecue from visible form fields.
content = content.replaceAll(`   "stockId",\n`, "");
content = content.replaceAll(`       "stockId",\n`, "");
content = content.replaceAll(`   "quantiteRecue",\n`, "");
content = content.replaceAll(`       "quantiteRecue",\n`, "");

// 7) Add montantTTC to form fields after montantHT if missing.
if (!content.match(/"montantHT",\s*\n\s*"montantTTC"/)) {
  content = content.replaceAll(`   "montantHT",\n`, `   "montantHT",\n   "montantTTC",\n`);
  content = content.replaceAll(`       "montantHT",\n`, `       "montantHT",\n       "montantTTC",\n`);
}

// 8) Add composition readOnlyFields for derived fields.
content = content.replace(
  `lockedFields: ["commandeId"],
labelFields: ["produitId", "quantiteCommandee", "statut"],`,
  `lockedFields: ["commandeId"],
readOnlyFields: ["designation", "montantHT", "montantTTC"],
labelFields: ["produitId", "quantiteCommandee", "statut"],`
);

fs.writeFileSync(file, content, "utf8");

console.log("[Q21D2A1_DONE] Stock order line module cleaned.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  Test /lignescommandestockauto/nouveau");
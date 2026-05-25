const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module.ts";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21d3a4-clean-form-fields`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21d3a4-clean-form-fields`);
}

let content = fs.readFileSync(file, "utf8");

// Remove duplicated adjacent montantTTC entries in form field arrays.
content = content.replace(/"montantTTC",\s*\r?\n\s*"montantTTC",/g, `"montantTTC",`);

// For now, TTC should equal HT until TVA is supplied by AutoFill/fiscal rules.
// This keeps the computation predictable while RuntimeAutoFillEngine is not installed.
content = content.replace(
  /target:\s*"montantTTC",\s*\r?\n\s*formula:\s*"taxIncluded",\s*\r?\n\s*sources:\s*\["montantHT",\s*"tauxTVA"\],\s*\r?\n\s*round:\s*2,\s*\r?\n\s*defaultValue:\s*18,/,
  `target: "montantTTC",
        formula: "add",
        sources: ["montantHT"],
        round: 2,
        defaultValue: 0,`
);

fs.writeFileSync(file, content, "utf8");

console.log("[Q21D3A4_DONE] Order line form fields cleaned and TTC temporarily aligned with HT.");
console.log("Next:");
console.log("  pnpm build");
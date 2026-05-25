const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21d1c-add-validate-reception-action`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21d1c-add-validate-reception-action`);
}

let content = fs.readFileSync(file, "utf8");

if (content.includes("Q21D1C_VALIDATE_RECEPTION_ACTION")) {
  console.log("[SKIP] Validate reception action already installed.");
  process.exit(0);
}

const marker = `    if (moduleKey === "clientsauto" && currentStatus !== "archive") {`;

const block = `    if (moduleKey === "receptionsstockauto" && currentStatus === "brouillon") {
      return {
        // Q21D1C_VALIDATE_RECEPTION_ACTION
        label: "Valider reception",
        nextStatus: "validee",
        confirmMessage:
          "Valider cette reception ? Une entree stock sera creee automatiquement et les champs critiques seront verrouilles.",
      };
    }

`;

if (!content.includes(marker)) {
  console.error("[ERROR] Cannot locate business status action insertion marker.");
  process.exit(1);
}

content = content.replace(marker, block + marker);

// Add receptionsstockauto to sensitive modules so delete button is hidden.
// A reception with stock impact must not be deleted brutally.
content = content.replace(
  `      "lignesinterventionauto",
    ].includes(module.metadata.key);`,
  `      "lignesinterventionauto",
      "receptionsstockauto",
    ].includes(module.metadata.key);`
);

fs.writeFileSync(file, content, "utf8");

console.log("[Q21D1C_DONE] Validate reception business action added.");
console.log("Next: pnpm build");
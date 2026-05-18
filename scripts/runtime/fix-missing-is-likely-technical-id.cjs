const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src/components/erp/forms/enterprise/ERPFormField.tsx"
);

let content = fs.readFileSync(target, "utf8");

if (!content.includes("function isLikelyTechnicalId(")) {
  const marker = `function compactLockedRelationLabel(
  label: string
): string {`;

  if (!content.includes(marker)) {
    console.error("FAILED: compactLockedRelationLabel marker not found.");
    process.exit(1);
  }

  content = content.replace(
    marker,
`function isLikelyTechnicalId(value: unknown): boolean {
  const text =
    String(value ?? "").trim();

  if (!text) {
    return false;
  }

  if (/^[A-Za-z0-9_-]{16,}$/.test(text)) {
    return true;
  }

  if (/^[0-9a-f]{20,}$/i.test(text)) {
    return true;
  }

  return false;
}

${marker}`
  );
}

content = content.replaceAll("Relation mÃ©tier sÃ©lectionnÃ©e", "Relation métier sélectionnée");
content = content.replaceAll("Aucune relation renseignÃ©e", "Aucune relation renseignée");
content = content.replaceAll("Relation mÃ©tier verrouillÃ©e", "Relation métier verrouillée");
content = content.replaceAll("SÃ©lectionner", "Sélectionner");
content = content.replaceAll("â€¢", "•");
content = content.replaceAll("dâ€™origine", "d’origine");
content = content.replaceAll("Ãªtre", "être");

fs.writeFileSync(target, content, "utf8");

console.log("OK: isLikelyTechnicalId inserted in ERPFormField.tsx.");
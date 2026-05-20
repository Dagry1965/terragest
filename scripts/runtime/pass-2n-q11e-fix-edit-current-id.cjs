const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

let content = fs.readFileSync(file, "utf8");

const backup = `${file}.bak-q11e-fix-edit-current-id`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

// Ajoute usePathname dans l'import next/navigation
content = content.replace(
  /import\s*\{([^}]+)\}\s*from\s*"next\/navigation";/,
  (match, imports) => {
    if (imports.includes("usePathname")) {
      return match;
    }

    return `import {${imports}, usePathname } from "next/navigation";`;
  }
);

// Si aucun import next/navigation n'existe, on l'ajoute après "use client"
if (!content.includes(`from "next/navigation"`)) {
  content = content.replace(
    /("use client";\s*)/,
    `$1\nimport { usePathname } from "next/navigation";\n`
  );
}

// Remplace le bloc currentRecordId basé sur initialValues
const oldBlockRegex =
/\s*const currentRecordId = String\(\s*\(\(initialValues as any\)\?\.id \?\?\s*\(initialValues as any\)\?\._id \?\?\s*""\) as string\s*\);\s*/m;

const newBlock = `
  const pathname = usePathname();

  const currentRecordId = String(
    pathname.match(/\\/interventionsauto\\/([^/]+)\\/edit/)?.[1] ?? ""
  );
`;

if (!oldBlockRegex.test(content)) {
  throw new Error("Bloc currentRecordId basé sur initialValues introuvable.");
}

content = content.replace(oldBlockRegex, newBlock);

fs.writeFileSync(file, content, "utf8");

console.log("OK: currentRecordId récupéré depuis l'URL edit intervention.");
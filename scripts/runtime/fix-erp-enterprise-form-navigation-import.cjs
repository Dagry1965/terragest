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

const backup = `${file}.bak-fix-navigation-import`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

// Remplace tout import cassé ou multi-ligne de next/navigation par un import propre
content = content.replace(
  /import\s*\{[\s\S]*?\}\s*from\s*"next\/navigation";/,
  `import { useRouter, useSearchParams, usePathname } from "next/navigation";`
);

fs.writeFileSync(file, content, "utf8");

console.log("OK: import next/navigation corrigé proprement.");
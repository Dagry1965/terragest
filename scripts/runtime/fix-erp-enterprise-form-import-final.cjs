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

const backup = `${file}.bak-final-import-fix`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

// Corrige tous les imports next/navigation cassés, multi-lignes ou propres.
content = content.replace(
  /import\s*\{[\s\S]*?\}\s*from\s*"next\/navigation";/,
  `import { useRouter, useSearchParams, usePathname } from "next/navigation";`
);

// Sécurité : supprime une éventuelle virgule orpheline restante.
content = content.replace(
  /import\s+\{\s*useRouter,\s*useSearchParams,\s*,\s*usePathname\s*\}\s*from\s*"next\/navigation";/,
  `import { useRouter, useSearchParams, usePathname } from "next/navigation";`
);

fs.writeFileSync(file, content, "utf8");

console.log("OK: import next/navigation réparé.");
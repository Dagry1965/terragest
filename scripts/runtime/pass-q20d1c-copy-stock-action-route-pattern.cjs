const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(...parts) {
  return path.join(root, ...parts);
}

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, filePath)}`);
}

function backup(filePath, suffix) {
  if (!fs.existsSync(filePath)) return;

  const backupPath = `${filePath}.bak-${suffix}`;
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
  }
}

const sourceModule = "stocksauto";
const targetModule = "mouvementsstockauto";

const actionRoutes = [
  "analytics",
  "audit",
  "dashboard",
  "export",
  "import",
  "relations",
  "workflows",
];

for (const route of actionRoutes) {
  const sourcePath = p(
    "src",
    "app",
    "(private)",
    sourceModule,
    route,
    "page.tsx"
  );

  const targetPath = p(
    "src",
    "app",
    "(private)",
    targetModule,
    route,
    "page.tsx"
  );

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Route source introuvable: ${sourcePath}`);
  }

  backup(targetPath, "q20d1c-copy-stock-pattern");

  let content = read(sourcePath);

  content = content
    .replaceAll("stocksauto", "mouvementsstockauto")
    .replaceAll("Stocksauto", "Mouvementsstockauto")
    .replaceAll("StocksAuto", "MouvementsStockAuto")
    .replaceAll("stocks auto", "mouvements stock")
    .replaceAll("Stocks auto", "Mouvements stock")
    .replaceAll("Stocks", "Mouvements stock")
    .replaceAll("stocks", "mouvements stock");

  write(targetPath, content);
}

console.log("");
console.log("[Q20D1C_DONE] Routes action mouvementsstockauto alignées sur le pattern stocksauto existant.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
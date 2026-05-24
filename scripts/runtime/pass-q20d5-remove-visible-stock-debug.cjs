const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function backup(file, suffix) {
  const backupPath = `${file}.bak-${suffix}`;

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(file, backupPath);
    console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
  }
}

if (!fs.existsSync(target)) {
  throw new Error(`Fichier introuvable: ${target}`);
}

backup(target, "q20d5-remove-visible-stock-debug");

let content = read(target);

const start = content.indexOf(`          // Q20D4_VISIBLE_STOCK_DEBUG`);
const endMarker = `          }`;
let replaced = false;

if (start !== -1) {
  const afterStart = content.slice(start);
  const markerAfterBlock = `        } catch (error) {`;
  const end = content.indexOf(markerAfterBlock, start);

  if (end === -1) {
    throw new Error("Fin du bloc Q20D4 introuvable.");
  }

  const replacement = `          if (stockResult.processed) {
            console.info(
              "[Q20D3_STOCK_PROCESSED_AFTER_LINE_SAVE]",
              stockResult
            );
          } else if (
            stockResult.reason &&
            stockResult.reason !== "not-piece-line" &&
            stockResult.reason !== "line-not-validated" &&
            stockResult.reason !== "already-processed"
          ) {
            console.warn(
              "[Q20D3_STOCK_SKIPPED_AFTER_LINE_SAVE]",
              stockResult
            );
          }
`;

  content =
    content.slice(0, start) +
    replacement +
    content.slice(end);

  replaced = true;
}

if (!replaced) {
  console.log("[SKIP] Bloc Q20D4 visible debug non trouvé. Rien à remplacer.");
}

write(target, content);

console.log("");
console.log("[Q20D5_DONE] Debug visible bloquant supprimé.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
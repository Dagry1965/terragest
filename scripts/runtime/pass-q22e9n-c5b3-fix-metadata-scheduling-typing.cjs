const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET = "src/runtime/guards/processRuntimeBeforeMutationGuards.ts";
const targetPath = path.join(ROOT, TARGET);

if (!fs.existsSync(targetPath)) {
  throw new Error(`Fichier introuvable: ${TARGET}`);
}

const backupPath = `${targetPath}.bak-q22e9n-c5b3-fix-metadata-scheduling-typing`;
fs.copyFileSync(targetPath, backupPath);

let content = fs.readFileSync(targetPath, "utf8");

const oldBlock = `function isSchedulableModule(module: ERPModule): boolean {
  const scheduling = module.metadata.scheduling as
    | { enabled?: boolean }
    | undefined;

  return scheduling?.enabled === true;
}`;

const newBlock = `function isSchedulableModule(module: ERPModule): boolean {
  const metadata = module.metadata as ERPModule["metadata"] &
    Record<string, unknown>;

  const scheduling = metadata.scheduling as
    | { enabled?: boolean }
    | undefined;

  return scheduling?.enabled === true;
}`;

if (!content.includes(oldBlock)) {
  throw new Error("Bloc isSchedulableModule attendu introuvable.");
}

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(targetPath, content, "utf8");

console.log("");
console.log("[Q22E-9N-C5-B3] DONE");
console.log(`[BACKUP] ${path.relative(ROOT, backupPath).replace(/\\/g, "/")}`);
console.log(`[UPDATED] ${TARGET}`);
console.log("");
console.log("Next:");
console.log("pnpm build");
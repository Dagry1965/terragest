const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "runtime",
  "firestore",
  "FirestoreRuntimeMutation.ts"
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

backup(target, "q20d2b-debug-post-mutation-entry");

let content = read(target);

if (content.includes("[Q20D2_POST_MUTATION_ENTRY]")) {
  console.log("[SKIP] Debug entry déjà présent.");
  process.exit(0);
}

const marker = `async function processRuntimePostMutationSideEffects(
  module: ERPModule,
  record: Record<string, unknown>
): Promise<void> {`;

if (!content.includes(marker)) {
  throw new Error("Fonction processRuntimePostMutationSideEffects introuvable.");
}

const replacement = `async function processRuntimePostMutationSideEffects(
  module: ERPModule,
  record: Record<string, unknown>
): Promise<void> {
  console.info("[Q20D2_POST_MUTATION_ENTRY]", {
    moduleKey: module.metadata.key,
    id: String(record.id ?? record._id ?? ""),
    statut: record.statut,
    typeLigne: record.typeLigne,
    typeArticle: record.typeArticle,
    produitId: record.produitId,
    stockId: record.stockId,
    quantite: record.quantite,
  });`;

content = content.replace(marker, replacement);

write(target, content);

console.log("");
console.log("[Q20D2B_DEBUG_ENTRY_INSTALLED]");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm dev");
console.log("  sauvegarder la ligne");
console.log("  chercher [Q20D2_POST_MUTATION_ENTRY]");
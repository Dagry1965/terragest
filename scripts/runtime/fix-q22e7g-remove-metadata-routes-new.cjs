const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targetPath = path.join(
  root,
  "src",
  "components",
  "erp",
  "scheduling",
  "ERPSchedulingPlanningView.tsx"
);

const backupPath = `${targetPath}.bak-q22e7g-fix-metadata-routes-new`;

function fail(message) {
  console.error(`\n[ERROR] ${message}`);
  process.exit(1);
}

if (!fs.existsSync(targetPath)) {
  fail(`File not found: ${targetPath}`);
}

if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(targetPath, backupPath);
  console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
} else {
  console.log(`[BACKUP_EXISTS] ${path.relative(root, backupPath)}`);
}

let content = fs.readFileSync(targetPath, "utf8");

const before = content;

content = content.replace(
  `    module.metadata?.routes?.create ||
    (module as { routes?: { create?: string; new?: string } }).routes?.create ||
    module.metadata?.routes?.new ||
    (module as { routes?: { create?: string; new?: string } }).routes?.new ||
    \`/\${moduleKey}/nouveau\``,
  `    module.metadata?.routes?.create ||
    (module as { routes?: { create?: string; new?: string } }).routes?.create ||
    (module as { routes?: { create?: string; new?: string } }).routes?.new ||
    \`/\${moduleKey}/nouveau\``
);

if (content === before) {
  fail("Aucun remplacement effectué. Le bloc getCreateHref a peut-être changé.");
}

fs.writeFileSync(targetPath, content, "utf8");

console.log(`
[Q22E7G_FIX_DONE] metadata.routes.new supprimé.

Correction:
  - module.metadata.routes.create conservé
  - module.routes.create legacy conservé
  - module.routes.new legacy conservé via cast
  - fallback générique /{moduleKey}/nouveau conservé

Next:
  pnpm build
`);
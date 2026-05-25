const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targetPath = path.join(
  root,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPRuntimePage.tsx"
);

const backupPath = `${targetPath}.bak-q22e4c-auto-scheduling-planning-action`;

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
const original = content;

if (
  content.includes("Q22E4C_AUTO_SCHEDULING_PLANNING_ACTION") &&
  content.includes("schedulingPlanningAction")
) {
  console.log("\n[SKIP] Q22E-4C semble déjà appliqué.");
  process.exit(0);
}

const oldBlock = `  const listNavigationActions =
    // Q22E4B_LIST_NAVIGATION_ACTIONS
    // Generic runtime: list pages may expose module actions with href.
    type === "list"
      ? (module?.actions ?? []).filter((action) =>
          Boolean(action.href)
        )
      : [];`;

const newBlock = `  const moduleHrefActions =
    // Q22E4B_LIST_NAVIGATION_ACTIONS
    // Generic runtime: list pages may expose module actions with href.
    type === "list"
      ? (module?.actions ?? []).filter((action) =>
          Boolean(action.href)
        )
      : [];

  const hasPlanningAction =
    moduleHrefActions.some((action) =>
      String(action.href ?? "").includes("/planning")
    );

  const schedulingPlanningAction =
    // Q22E4C_AUTO_SCHEDULING_PLANNING_ACTION
    // Any module declaring scheduling.enabled gets a generic Planning entry.
    // The first consumer is rendezvous, but this remains runtime-driven.
    type === "list" &&
    module?.scheduling?.enabled &&
    !hasPlanningAction
      ? [
          {
            key: "runtime-planning",
            label: "Planning",
            href: \`/\${module.metadata.key}/planning\`,
            type: "secondary" as const,
          },
        ]
      : [];

  const listNavigationActions = [
    ...schedulingPlanningAction,
    ...moduleHrefActions,
  ];`;

if (!content.includes(oldBlock)) {
  fail("Bloc listNavigationActions introuvable. Le fichier a peut-être changé.");
}

content = content.replace(oldBlock, newBlock);

if (content === original) {
  fail("No changes applied.");
}

fs.writeFileSync(targetPath, content, "utf8");

console.log(`
[Q22E4C_DONE] Action Planning automatique ajoutée aux modules scheduling.

Scope:
  - ERPRuntimePage générique
  - mode list uniquement
  - module.scheduling.enabled => bouton Planning
  - évite doublon si une action href /planning existe déjà
  - aucun hardcode rendezvous / AMARKHYS / garage

Next:
  pnpm build
  tester /rendezvous
  vérifier bouton Planning à côté de Nouveau rendez-vous
`);
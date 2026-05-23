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

const moduleKey = "mouvementsstockauto";
const moduleImportName = "mouvementsstockautoModule";

const actionPages = [
  {
    route: "analytics",
    fn: "MouvementsStockAutoAnalyticsPage",
    actionKey: "analytics",
    title: "Analytics mouvements stock",
    description: "Analyse des flux de stock AMARKHYS.",
  },
  {
    route: "audit",
    fn: "MouvementsStockAutoAuditPage",
    actionKey: "audit",
    title: "Audit mouvements stock",
    description: "Historique et traçabilité des mouvements de stock.",
  },
  {
    route: "dashboard",
    fn: "MouvementsStockAutoDashboardPage",
    actionKey: "dashboard",
    title: "Dashboard mouvements stock",
    description: "Suivi des entrées, sorties, corrections et annulations de stock.",
  },
  {
    route: "export",
    fn: "MouvementsStockAutoExportPage",
    actionKey: "export",
    title: "Export mouvements stock",
    description: "Exporter les mouvements de stock.",
  },
  {
    route: "import",
    fn: "MouvementsStockAutoImportPage",
    actionKey: "import",
    title: "Import mouvements stock",
    description: "Importer des mouvements de stock.",
  },
  {
    route: "relations",
    fn: "MouvementsStockAutoRelationsPage",
    actionKey: "relations",
    title: "Relations mouvements stock",
    description: "Relations entre stock, produit, intervention et ligne intervention.",
  },
  {
    route: "workflows",
    fn: "MouvementsStockAutoWorkflowsPage",
    actionKey: "workflows",
    title: "Workflows mouvements stock",
    description: "Cycle de validation et annulation des mouvements de stock.",
  },
];

for (const page of actionPages) {
  const filePath = p(
    "src",
    "app",
    "(private)",
    moduleKey,
    page.route,
    "page.tsx"
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`Page introuvable: ${filePath}`);
  }

  backup(filePath, "q20d1b-fix-action-routes");

  const content = `import { ERPModuleActionPageTemplate } from "@/components/erp/templates/ERPModuleActionPageTemplate";
import { ${moduleImportName} } from "@/runtime/modules/generated/${moduleKey}";

export default function ${page.fn}() {
  return (
    <ERPModuleActionPageTemplate
      module={${moduleImportName}}
      actionKey="${page.actionKey}"
      title="${page.title}"
      description="${page.description}"
    />
  );
}
`;

  write(filePath, content);
}

console.log("");
console.log("[Q20D1B_DONE] Routes action mouvementsstockauto corrigées avec module={mouvementsstockautoModule}.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
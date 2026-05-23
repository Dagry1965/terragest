const fs = require("fs");
const path = require("path");

const root = process.cwd();

function dir(...parts) {
  return path.join(root, ...parts);
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, filePath)}`);
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function backup(filePath, suffix) {
  if (!exists(filePath)) return;

  const backupPath = `${filePath}.bak-${suffix}`;
  if (!exists(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
  }
}

const moduleKey = "mouvementsstockauto";
const routeRoot = dir("src", "app", "(private)", moduleKey);

const moduleFile = dir(
  "src",
  "runtime",
  "modules",
  "generated",
  moduleKey,
  `${moduleKey}.module.ts`
);

if (!exists(moduleFile)) {
  throw new Error(`Module runtime introuvable: ${moduleFile}`);
}

const pages = [
  {
    file: "page.tsx",
    content: `import { GenericListPage } from "@/components/erp/generic/GenericListPage";

export default function MouvementsStockAutoPage() {
  return <GenericListPage moduleKey="mouvementsstockauto" />;
}
`,
  },
  {
    file: path.join("nouveau", "page.tsx"),
    content: `import { GenericCreatePage } from "@/components/erp/generic/GenericCreatePage";

export default function NouveauMouvementStockAutoPage() {
  return <GenericCreatePage moduleKey="mouvementsstockauto" />;
}
`,
  },
  {
    file: path.join("[id]", "page.tsx"),
    content: `import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";

interface MouvementsStockAutoDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MouvementsStockAutoDetailPage({
  params,
}: MouvementsStockAutoDetailPageProps) {
  const { id } = await params;

  return <GenericDetailPage moduleKey="mouvementsstockauto" id={id} />;
}
`,
  },
  {
    file: path.join("[id]", "edit", "page.tsx"),
    content: `import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

interface MouvementsStockAutoEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MouvementsStockAutoEditPage({
  params,
}: MouvementsStockAutoEditPageProps) {
  const { id } = await params;

  return <GenericEditPage moduleKey="mouvementsstockauto" id={id} />;
}
`,
  },
  {
    file: path.join("dashboard", "page.tsx"),
    content: `import { ERPModuleActionPageTemplate } from "@/components/erp/templates/ERPModuleActionPageTemplate";

export default function MouvementsStockAutoDashboardPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="mouvementsstockauto"
      actionKey="dashboard"
      title="Dashboard mouvements stock"
      description="Suivi des entrées, sorties, corrections et annulations de stock."
    />
  );
}
`,
  },
  {
    file: path.join("analytics", "page.tsx"),
    content: `import { ERPModuleActionPageTemplate } from "@/components/erp/templates/ERPModuleActionPageTemplate";

export default function MouvementsStockAutoAnalyticsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="mouvementsstockauto"
      actionKey="analytics"
      title="Analytics mouvements stock"
      description="Analyse des flux de stock AMARKHYS."
    />
  );
}
`,
  },
  {
    file: path.join("audit", "page.tsx"),
    content: `import { ERPModuleActionPageTemplate } from "@/components/erp/templates/ERPModuleActionPageTemplate";

export default function MouvementsStockAutoAuditPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="mouvementsstockauto"
      actionKey="audit"
      title="Audit mouvements stock"
      description="Historique et traçabilité des mouvements de stock."
    />
  );
}
`,
  },
  {
    file: path.join("export", "page.tsx"),
    content: `import { ERPModuleActionPageTemplate } from "@/components/erp/templates/ERPModuleActionPageTemplate";

export default function MouvementsStockAutoExportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="mouvementsstockauto"
      actionKey="export"
      title="Export mouvements stock"
      description="Exporter les mouvements de stock."
    />
  );
}
`,
  },
  {
    file: path.join("import", "page.tsx"),
    content: `import { ERPModuleActionPageTemplate } from "@/components/erp/templates/ERPModuleActionPageTemplate";

export default function MouvementsStockAutoImportPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="mouvementsstockauto"
      actionKey="import"
      title="Import mouvements stock"
      description="Importer des mouvements de stock."
    />
  );
}
`,
  },
  {
    file: path.join("relations", "page.tsx"),
    content: `import { ERPModuleActionPageTemplate } from "@/components/erp/templates/ERPModuleActionPageTemplate";

export default function MouvementsStockAutoRelationsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="mouvementsstockauto"
      actionKey="relations"
      title="Relations mouvements stock"
      description="Relations entre stock, produit, intervention et ligne intervention."
    />
  );
}
`,
  },
  {
    file: path.join("workflows", "page.tsx"),
    content: `import { ERPModuleActionPageTemplate } from "@/components/erp/templates/ERPModuleActionPageTemplate";

export default function MouvementsStockAutoWorkflowsPage() {
  return (
    <ERPModuleActionPageTemplate
      moduleKey="mouvementsstockauto"
      actionKey="workflows"
      title="Workflows mouvements stock"
      description="Cycle de validation et annulation des mouvements de stock."
    />
  );
}
`,
  },
];

for (const page of pages) {
  const target = path.join(routeRoot, page.file);
  backup(target, "q20d1-mouvementsstockauto-routes");
  write(target, page.content);
}

console.log("");
console.log("[Q20D1_DONE] Routes mouvementsstockauto installées.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("");
console.log("Tests:");
console.log("  /mouvementsstockauto");
console.log("  /mouvementsstockauto/nouveau");
console.log("  /mouvementsstockauto/dashboard");
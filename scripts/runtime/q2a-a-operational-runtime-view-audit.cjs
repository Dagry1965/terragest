const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  "src/components/erp/runtime/ERPRuntimeTable.tsx",
  "src/components/erp/runtime/ERPRuntimeDetails.tsx",
  "src/components/erp/runtime/ERPRelatedRecordsPanel.tsx",
  "src/components/erp/context/ERPContextBanner.tsx",

  "src/components/erp/ui/index.ts",
  "src/components/erp/ui/ERPPage.tsx",
  "src/components/erp/ui/ERPCard.tsx",
  "src/components/erp/ui/ERPBadge.tsx",
  "src/components/erp/ui/ERPButton.tsx",

  "src/components/erp/shell/ErpSidebar.tsx",
  "src/components/erp/shell/ERPTopbar.tsx",
  "src/components/erp/cockpit/AmarkhysOperationalCockpit.tsx",

  "src/runtime/modules/ERPModule.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.actions.ts",

  "src/runtime/actions/RuntimeActionEngine.ts",
  "src/runtime/data-binding/RuntimeDataBinding.ts",
  "src/runtime/scheduling/RuntimeSchedulingEngine.ts",
  "src/runtime/scheduling/settings/RuntimeSchedulingSettingsRepository.ts",
];

const patterns = [
  "export function",
  "interface",
  "type ",
  "runtimeActions",
  "RuntimeActionEngine",
  "RuntimeDataBinding",
  "list",
  "detail",
  "table",
  "columns",
  "fields",
  "schema.fields",
  "list.visible",
  "Badge",
  "ERPBadge",
  "ERPCard",
  "ERPPage",
  "metadata",
  "actions",
  "workflow",
  "scheduling",
  "planning",
  "rendezvous",
  "filter",
  "search",
  "pagination",
  "export",
  "composition",
  "children",
];

function printContext(content, pattern, context = 5) {
  const lines = content.split(/\r?\n/);
  const hits = [];

  lines.forEach((line, index) => {
    if (line.toLowerCase().includes(pattern.toLowerCase())) {
      hits.push(index);
    }
  });

  return hits.slice(0, 5).map((hit) => {
    const start = Math.max(0, hit - context);
    const end = Math.min(lines.length, hit + context + 1);

    return lines
      .slice(start, end)
      .map((line, idx) => String(start + idx + 1).padStart(4, "0") + ": " + line)
      .join("\n");
  });
}

console.log("");
console.log("[Q2-A-A-OPERATIONAL-RUNTIME-VIEW-AUDIT]");
console.log("");

for (const rel of files) {
  const file = path.join(ROOT, rel);

  if (!fs.existsSync(file)) {
    console.log("[MISSING]", rel);
    continue;
  }

  const content = fs.readFileSync(file, "utf8");

  const found = patterns.filter((pattern) =>
    content.toLowerCase().includes(pattern.toLowerCase())
  );

  if (found.length === 0) {
    continue;
  }

  console.log("");
  console.log("============================================================");
  console.log("FILE:", rel);
  console.log("MATCHES:", found.join(", "));
  console.log("============================================================");

  for (const pattern of found) {
    console.log("");
    console.log("---- PATTERN:", pattern, "----");

    const blocks = printContext(content, pattern, 5);

    for (const block of blocks.slice(0, 3)) {
      console.log(block);
      console.log("");
    }
  }
}

const outDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(outDir, { recursive: true });

const report = [
  "# Q2-A-A — Operational Runtime View Audit",
  "",
  "Audit console généré pour préparer ERPOperationalModulePage.",
  "",
  "Objectif:",
  "- créer une vue opérationnelle ERP générique",
  "- brancher rendezvous comme premier module consommateur",
  "- éviter toute page RDV codée en dur",
  "- conserver RuntimeDataBinding / RuntimeActionEngine / RuntimeSchedulingEngine",
  "",
].join("\n");

fs.writeFileSync(
  path.join(outDir, "Q2-A-A-operational-runtime-view-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT]", "docs/audits/Q2-A-A-operational-runtime-view-audit.md");
console.log("");
console.log("[NEXT]");
console.log("Copie-colle surtout les sections ERPRuntimePage, ERPRuntimeTable, ERPModule.ts et rendezvous.module.ts.");

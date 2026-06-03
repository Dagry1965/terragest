const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const checks = [];

function read(relPath) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  return fs.readFileSync(fullPath, "utf8");
}

function exists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function addCheck(scope, label, ok, details = "") {
  checks.push({
    scope,
    label,
    ok: Boolean(ok),
    details,
  });
}

const files = {
  b2Audit: "docs/audits/AMARKHYS-PRODUCT-KPI-B2.md",
  kpiEngine: "src/runtime/kpi/RuntimeProductKpiEngine.ts",
  sheet: "src/components/erp/hub/ERPProductStockOperationalSheet.tsx",
  b2Script: "scripts/runtime/amarkhys-product-kpi-b2-wire-sheet.cjs",
};

const b2Audit = read(files.b2Audit);
const kpiEngine = read(files.kpiEngine);
const sheet = read(files.sheet);
const b2Script = read(files.b2Script);

addCheck("files", files.b2Audit, Boolean(b2Audit), "Audit B2 document must exist.");
addCheck("files", files.kpiEngine, Boolean(kpiEngine), "RuntimeProductKpiEngine must exist.");
addCheck("files", files.sheet, Boolean(sheet), "ERPProductStockOperationalSheet must exist.");
addCheck("files", files.b2Script, Boolean(b2Script), "B2 wiring script must exist.");

if (b2Audit) {
  addCheck(
    "documentation",
    "B2 audit mentions RuntimeProductKpiEngine",
    b2Audit.includes("RuntimeProductKpiEngine"),
    "Documentation should state that KPI computation is delegated to the runtime engine."
  );

  addCheck(
    "documentation",
    "B2 audit mentions product operational summary",
    b2Audit.includes("Synthèse") ||
      b2Audit.includes("synthèse") ||
      b2Audit.includes("operational summary") ||
      b2Audit.includes("productOperationalSummary"),
    "Documentation should mention the visible operational summary."
  );

  addCheck(
    "documentation",
    "B2 audit mentions no visual regression",
    b2Audit.includes("inchang") ||
      b2Audit.includes("visuel") ||
      b2Audit.includes("rendu"),
    "Documentation should mention that visual rendering was preserved."
  );

  addCheck(
    "documentation",
    "B2 audit mentions validation/build",
    b2Audit.includes("build") ||
      b2Audit.includes("Build") ||
      b2Audit.includes("pnpm build"),
    "Documentation should include the build validation."
  );
}

if (kpiEngine) {
  [
    "orderedQuantity",
    "deliveredQuantity",
    "remainingQuantity",
    "stockQuantity",
    "alertThreshold",
    "stockState",
    "workshopQuantity",
    "lastExitDate",
    "performanceScore",
    "performance",
  ].forEach((marker) => {
    addCheck(
      "runtime-kpi",
      `RuntimeProductKpiEngine exposes ${marker}`,
      kpiEngine.includes(marker),
      `Expected KPI marker: ${marker}`
    );
  });

  addCheck(
    "runtime-kpi",
    "RuntimeProductKpiEngine has compute entry point",
    kpiEngine.includes("compute("),
    "The engine must expose a compute method."
  );
}

if (sheet) {
  addCheck(
    "sheet",
    "Sheet imports RuntimeProductKpiEngine",
    sheet.includes("RuntimeProductKpiEngine"),
    "The operational sheet must consume the runtime KPI engine."
  );

  addCheck(
    "sheet",
    "productOperationalSummary delegates to RuntimeProductKpiEngine.compute",
    sheet.includes("function productOperationalSummary") &&
      sheet.includes("RuntimeProductKpiEngine.compute"),
    "The product summary must delegate computation to the runtime engine."
  );

  addCheck(
    "sheet",
    "Sheet keeps ProductOperationalSummary visual component",
    sheet.includes("function ProductOperationalSummary"),
    "The visual summary component must remain present."
  );

  addCheck(
    "sheet",
    "Sheet keeps Approvisionnement card",
    sheet.includes('title="Approvisionnement"'),
    "The Approvisionnement card should remain visible."
  );

  addCheck(
    "sheet",
    "Sheet keeps Stock card",
    sheet.includes('title="Stock"'),
    "The Stock card should remain visible."
  );

  addCheck(
    "sheet",
    "Sheet keeps Atelier card",
    sheet.includes('title="Atelier"'),
    "The Atelier card should remain visible."
  );

  addCheck(
    "sheet",
    "Sheet keeps Performance card",
    sheet.includes('title="Performance"'),
    "The Performance card should remain visible."
  );
}

const ok = checks.filter((c) => c.ok).length;
const fail = checks.filter((c) => !c.ok).length;

const reportLines = [];
reportLines.push("# AMARKHYS-PRODUCT-KPI-C1 — Audit documentaire produit / stock / KPI");
reportLines.push("");
reportLines.push("## Objectif");
reportLines.push("");
reportLines.push(
  "Verifier que la documentation et les points de branchement refletent correctement l'etat reel apres AMARKHYS-PRODUCT-KPI-B2."
);
reportLines.push("");
reportLines.push("## Perimetre");
reportLines.push("");
reportLines.push("- Documentation produit / stock / KPI");
reportLines.push("- RuntimeProductKpiEngine");
reportLines.push("- ERPProductStockOperationalSheet");
reportLines.push("- Aucun changement fonctionnel attendu");
reportLines.push("");
reportLines.push("## Resultats");
reportLines.push("");
reportLines.push(`- OK: ${ok}`);
reportLines.push(`- FAIL: ${fail}`);
reportLines.push("");
reportLines.push("| Scope | Check | Result | Details |");
reportLines.push("| --- | --- | --- | --- |");

for (const check of checks) {
  reportLines.push(
    `| ${check.scope} | ${check.label} | ${check.ok ? "OK" : "FAIL"} | ${check.details.replace(/\|/g, "/")} |`
  );
}

reportLines.push("");
reportLines.push("## Conclusion");
reportLines.push("");

if (fail === 0) {
  reportLines.push(
    "Audit documentaire OK. La documentation et le branchement KPI produit sont coherents avec l'etat valide de AMARKHYS-PRODUCT-KPI-B2."
  );
} else {
  reportLines.push(
    "Audit documentaire incomplet. Corriger uniquement la documentation ou les traces d'audit manquantes, sans modifier le comportement runtime."
  );
}

const reportPath = path.join(
  ROOT,
  "docs/audits/AMARKHYS-PRODUCT-KPI-C1-documentation-audit.md"
);

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");

console.log("[AMARKHYS-PRODUCT-KPI-C1] Documentation audit");
console.log(`[OK] ${ok}`);
console.log(`[FAIL] ${fail}`);
console.log(`[REPORT] ${path.relative(ROOT, reportPath)}`);

if (fail > 0) {
  process.exitCode = 1;
}
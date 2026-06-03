const fs = require("fs");
const path = require("path");

const root = process.cwd();

const sheetPath = path.join(root, "src/components/erp/hub/ERPProductStockOperationalSheet.tsx");
const reportPath = path.join(root, "docs/audits/AMARKHYS-PRODUCT-HUB-OPERATIONAL-SUMMARY-A.md");

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function fail(message) {
  throw new Error(message);
}

let content = read(sheetPath);

fs.writeFileSync(sheetPath + ".bak-operational-summary-a", content, "utf8");

/**
 * 1. Ajouter helpers synthèse si absents.
 */
if (!content.includes("function productOperationalSummary(")) {
  const anchor = "function ProductFlowDiagram() {";

  if (!content.includes(anchor)) {
    fail("Ancre ProductFlowDiagram introuvable.");
  }

  const helpers = `
function productOperationalSummary({
  rootRecord,
  stocks,
  mouvements,
}: {
  rootRecord: ERPRecordHubRecord | null;
  stocks: ERPRecordHubRecord[];
  mouvements: ERPRecordHubRecord[];
}) {
  const orderLines = orderLineDeliveryItems(rootRecord);

  const orderedQuantity = orderLines.reduce((sum, line) => {
    return sum + orderLineDeliveryNumberValue(line, "quantityOrdered");
  }, 0);

  const deliveredQuantity = orderLines.reduce((sum, line) => {
    return sum + orderLineDeliveryNumberValue(line, "quantityDelivered");
  }, 0);

  const remainingQuantity = Math.max(0, orderedQuantity - deliveredQuantity);

  const stockQuantity = stocks.reduce((sum, stock) => {
    return sum + numberValue(
      stock,
      ["stockQuantity", "quantite", "quantité", "currentStock", "stockActuel", "quantiteDisponible"],
      0
    );
  }, 0);

  const alertThreshold = numberValue(
    rootRecord ?? {},
    ["seuilAlerte", "stockMinimum", "minimumStock", "seuilStock"],
    0
  );

  const exitMovements = mouvements.filter((movement) => {
    const type = text(movement, ["typeMouvement", "type", "sens"], "").toLowerCase();
    const source = text(movement, ["sourceModule", "source", "module"], "").toLowerCase();

    return (
      type.includes("sortie") ||
      source.includes("intervention") ||
      source.includes("vente")
    );
  });

  const workshopQuantity = exitMovements.reduce((sum, movement) => {
    return sum + Math.abs(numberValue(movement, ["quantite", "quantity"], 0));
  }, 0);

  const lastExitDate = exitMovements
    .map((movement) => text(movement, ["dateMouvement", "createdAt", "updatedAt"], ""))
    .filter(Boolean)
    .sort((a, b) => {
      const da = new Date(a).getTime();
      const db = new Date(b).getTime();

      return (Number.isFinite(db) ? db : 0) - (Number.isFinite(da) ? da : 0);
    })[0];

  const stockState =
    alertThreshold > 0 && stockQuantity <= alertThreshold
      ? "Stock faible"
      : stockQuantity <= 0
        ? "Rupture"
        : "OK";

  const performanceScore = orderedQuantity + deliveredQuantity + workshopQuantity;

  const performance =
    performanceScore >= 500
      ? "Produit phare"
      : performanceScore >= 50
        ? "Produit courant"
        : "Produit dormant";

  return {
    orderedQuantity,
    deliveredQuantity,
    remainingQuantity,
    stockQuantity,
    alertThreshold,
    stockState,
    workshopQuantity,
    lastExitDate,
    performance,
  };
}

function OperationalSummaryCard({
  title,
  icon,
  primary,
  secondary,
  tone = "slate",
}: {
  title: string;
  icon: string;
  primary: string;
  secondary: string;
  tone?: "emerald" | "blue" | "orange" | "slate";
}) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-50 text-emerald-800 ring-emerald-100"
      : tone === "blue"
        ? "bg-blue-50 text-blue-800 ring-blue-100"
        : tone === "orange"
          ? "bg-orange-50 text-orange-800 ring-orange-100"
          : "bg-slate-50 text-slate-800 ring-slate-100";

  return (
    <div className={"rounded-[1.5rem] p-5 ring-1 " + toneClass}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.16em] opacity-70">
          {title}
        </p>
        <span className="text-2xl">{icon}</span>
      </div>

      <p className="text-2xl font-black tracking-tight">{primary}</p>
      <p className="mt-2 text-xs font-bold opacity-75">{secondary}</p>
    </div>
  );
}

function ProductOperationalSummary({
  rootRecord,
  stocks,
  mouvements,
}: {
  rootRecord: ERPRecordHubRecord | null;
  stocks: ERPRecordHubRecord[];
  mouvements: ERPRecordHubRecord[];
}) {
  const summary = productOperationalSummary({ rootRecord, stocks, mouvements });

  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-7">
      <SectionTitle
        title="Synthèse opérationnelle du produit"
        subtitle="Lecture métier immédiate : approvisionnement, stock, utilisation atelier et potentiel produit."
      />

      <div className="grid gap-4 xl:grid-cols-4">
        <OperationalSummaryCard
          title="Approvisionnement"
          icon="🚚"
          primary={orderLineQuantityLabel(summary.deliveredQuantity) + " livrées"}
          secondary={
            "Commandé " +
            orderLineQuantityLabel(summary.orderedQuantity) +
            " · Reste " +
            orderLineQuantityLabel(summary.remainingQuantity)
          }
          tone={summary.remainingQuantity > 0 ? "orange" : "emerald"}
        />

        <OperationalSummaryCard
          title="Stock"
          icon="📦"
          primary={orderLineQuantityLabel(summary.stockQuantity)}
          secondary={
            summary.alertThreshold > 0
              ? "Seuil " + orderLineQuantityLabel(summary.alertThreshold) + " · " + summary.stockState
              : summary.stockState
          }
          tone={summary.stockState === "OK" ? "emerald" : "orange"}
        />

        <OperationalSummaryCard
          title="Atelier"
          icon="🔧"
          primary={orderLineQuantityLabel(summary.workshopQuantity)}
          secondary={
            summary.lastExitDate
              ? "Dernière sortie " + formatDate(summary.lastExitDate)
              : "Aucune sortie atelier récente"
          }
          tone="blue"
        />

        <OperationalSummaryCard
          title="Performance"
          icon="⭐"
          primary={summary.performance}
          secondary="Basé sur commandes, livraisons et sorties"
          tone={
            summary.performance === "Produit phare"
              ? "emerald"
              : summary.performance === "Produit courant"
                ? "blue"
                : "slate"
          }
        />
      </div>
    </section>
  );
}

`;

  content = content.replace(anchor, helpers + anchor);
}

/**
 * 2. Remplacer ProductFlowDiagram par ProductOperationalSummary.
 */
if (!content.includes("<ProductOperationalSummary rootRecord={rootRecord} stocks={primaryRecords} mouvements={movements} />")) {
  const oldRender = "            <ProductFlowDiagram />";

  if (!content.includes(oldRender)) {
    fail("Rendu ProductFlowDiagram introuvable.");
  }

  content = content.replace(
    oldRender,
    "            <ProductOperationalSummary rootRecord={rootRecord} stocks={primaryRecords} mouvements={movements} />"
  );
}

/**
 * 3. Vérifications.
 */
const checks = [
  ["ProductOperationalSummary component", content.includes("function ProductOperationalSummary(")],
  ["ProductFlowDiagram not rendered", !content.includes("            <ProductFlowDiagram />")],
  ["ProductOperationalSummary rendered", content.includes("<ProductOperationalSummary rootRecord={rootRecord} stocks={primaryRecords} mouvements={movements} />")],
  ["Synthèse title", content.includes("Synthèse opérationnelle du produit")],
  ["Approvisionnement card", content.includes("Approvisionnement")],
  ["Performance card", content.includes("Produit phare")],
];

console.table(checks.map(([label, ok]) => ({ label, ok })));

const failed = checks.filter(([, ok]) => !ok);

if (failed.length > 0) {
  fail("Vérifications échouées.");
}

write(sheetPath, content);

write(
  reportPath,
  [
    "# AMARKHYS-PRODUCT-HUB-OPERATIONAL-SUMMARY-A",
    "",
    "## Objectif",
    "",
    "Supprimer le bloc théorique Parcours produit / flux stock et le remplacer par une synthèse opérationnelle métier.",
    "",
    "## Nouveau bloc",
    "",
    "- Approvisionnement : commandé / livré / reste à livrer",
    "- Stock : stock actuel / seuil / état",
    "- Atelier : sorties atelier / dernière sortie",
    "- Performance : produit phare / courant / dormant",
    "",
    "## Décision métier",
    "",
    "La fiche produit doit montrer une lecture exploitable plutôt qu’un flux théorique.",
    "",
    "## Hors périmètre",
    "",
    "- Aucun changement loader.",
    "- Aucun changement moteur stock.",
    "- Aucun changement mutation stock.",
    "- Aucun changement route/navigation.",
    "",
  ].join("\\n")
);

console.log("[OK] AMARKHYS-PRODUCT-HUB-OPERATIONAL-SUMMARY-A applied");
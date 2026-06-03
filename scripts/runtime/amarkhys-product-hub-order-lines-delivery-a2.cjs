const fs = require("fs");
const path = require("path");

const root = process.cwd();

const loaderPath = path.join(root, "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts");
const sheetPath = path.join(root, "src/components/erp/hub/ERPProductStockOperationalSheet.tsx");
const reportPath = path.join(root, "docs/audits/AMARKHYS-PRODUCT-HUB-ORDER-LINES-DELIVERY-A2.md");

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function fail(message) {
  throw new Error(message);
}

let loader = read(loaderPath);
let sheet = read(sheetPath);

fs.writeFileSync(loaderPath + ".bak-order-lines-delivery-a2", loader, "utf8");
fs.writeFileSync(sheetPath + ".bak-order-lines-delivery-a2", sheet, "utf8");

/**
 * 1. Loader : builder ligne commande -> livraisons.
 */
if (!loader.includes("function buildProductOrderLineDeliveryCascade(")) {
  const anchor = "function enrichRootRecord(";

  if (!loader.includes(anchor)) {
    fail("Ancre enrichRootRecord introuvable dans le loader.");
  }

  const helper = `
function orderLineDeliveryNumber(value: unknown): number {
  const amount = Number(value ?? 0);

  return Number.isFinite(amount) ? amount : 0;
}

function orderLineDeliveryString(value: unknown, fallback = ""): string {
  const raw = String(value ?? "").trim();

  return raw || fallback;
}

function orderLineDeliveryStatus(ordered: number, delivered: number): string {
  if (delivered <= 0) {
    return "en_attente";
  }

  if (delivered < ordered) {
    return "partiellement_livree";
  }

  return "totalement_livree";
}

function buildProductOrderLineDeliveryCascade(
  productOrders: ERPRecordHubRecord[],
  productOrderLines: ERPRecordHubRecord[],
  productReceptions: ERPRecordHubRecord[]
): ERPRecordHubRecord[] {
  return productOrderLines
    .map((line) => {
      const lineId = getHubRecordId(line);
      const orderIds = hubRelationIds(line.commandeId);

      const order =
        productOrders.find((candidate) => orderIds.includes(getHubRecordId(candidate))) ?? null;

      const receptions = productReceptions
        .filter((reception) => hubRelationMatches(reception.ligneCommandeId, lineId))
        .sort((a, b) => {
          const da = new Date(String(a.dateReception ?? a.dateLivraison ?? a.createdAt ?? "")).getTime();
          const db = new Date(String(b.dateReception ?? b.dateLivraison ?? b.createdAt ?? "")).getTime();

          return (Number.isFinite(db) ? db : 0) - (Number.isFinite(da) ? da : 0);
        })
        .map((reception) => {
          const deliveredQuantity = orderLineDeliveryNumber(
            reception.quantiteRecue ?? reception.quantitéReçue ?? reception.quantite ?? reception.quantity
          );

          return {
            id: getHubRecordId(reception),
            dateLivraison: reception.dateReception ?? reception.dateLivraison ?? reception.createdAt ?? "",
            quantityDelivered: deliveredQuantity,
            record: reception,
          };
        });

      const quantityOrdered = orderLineDeliveryNumber(
        line.quantiteCommandee ?? line.productLineQuantity ?? line.quantite ?? line.quantity
      );

      const quantityDelivered = receptions.reduce((sum, reception) => {
        return sum + orderLineDeliveryNumber(reception.quantityDelivered);
      }, 0);

      const amount = orderLineDeliveryNumber(
        line.montantTTC ??
          line.montantHT ??
          line.productLineAmountTTC ??
          line.productLineAmountHT ??
          line.amountTTC ??
          line.amountHT
      );

      return {
        id: lineId,
        title: orderLineDeliveryString(
          line.designation ?? line.displayLabel ?? line.label,
          "Ligne de commande"
        ),
        dateCommande: order?.dateCommande ?? order?.createdAt ?? line.createdAt ?? "",
        orderTitle: orderLineDeliveryString(
          order?.numeroCommande ?? order?.numero ?? order?.code ?? order?.displayLabel,
          "Commande fournisseur"
        ),
        supplierLabel: orderLineDeliveryString(
          order?.fournisseurLabel ?? order?.fournisseurNom ?? order?.fournisseur ?? "",
          "Fournisseur non renseigné"
        ),
        quantityOrdered,
        quantityDelivered,
        remainingQuantity: Math.max(0, quantityOrdered - quantityDelivered),
        amount,
        deliveryStatus: orderLineDeliveryStatus(quantityOrdered, quantityDelivered),
        receptions,
        record: line,
      };
    })
    .sort((a, b) => {
      const da = new Date(String(a.dateCommande ?? "")).getTime();
      const db = new Date(String(b.dateCommande ?? "")).getTime();

      return (Number.isFinite(db) ? db : 0) - (Number.isFinite(da) ? da : 0);
    });
}

`;

  loader = loader.replace(anchor, helper + anchor);
}

/**
 * 2. Loader : calculer productOrderLineDeliveryCascade avant enrichedRootRecord.
 */
if (!loader.includes("const productOrderLineDeliveryCascade = buildProductOrderLineDeliveryCascade(")) {
  const anchor = "    const enrichedRootRecord = enrichRootRecord(";

  if (!loader.includes(anchor)) {
    fail("Ancre enrichedRootRecord introuvable.");
  }

  loader = loader.replace(
    anchor,
    `    const productOrderLineDeliveryCascade = buildProductOrderLineDeliveryCascade(
      productOrders,
      productOrderLines,
      productReceptions
    );

${anchor}`
  );
}

/**
 * 3. Loader : exposer la cascade dans rootRecord sans modifier l'appel enrichRootRecord.
 */
if (!loader.includes("productOrderLineDeliveryCascade,")) {
  const oldReturn = "      rootRecord: enrichedRootRecord,";
  const newReturn = `      rootRecord: {
        ...enrichedRootRecord,
        productOrderLineDeliveryCascade,
      },`;

  if (!loader.includes(oldReturn)) {
    fail("Ligne rootRecord: enrichedRootRecord introuvable.");
  }

  loader = loader.replace(oldReturn, newReturn);
}

/**
 * 4. Sheet : helpers + panneau.
 */
if (!sheet.includes("function orderLineDeliveryItems(")) {
  const anchor = "function ProductFlowDiagram() {";

  if (!sheet.includes(anchor)) {
    fail("Ancre ProductFlowDiagram introuvable dans la fiche.");
  }

  const helpers = `
type OrderLineDeliveryItem = Record<string, unknown>;

function orderLineDeliveryItems(rootRecord: ERPRecordHubRecord | null): OrderLineDeliveryItem[] {
  if (!rootRecord) {
    return [];
  }

  const value = (rootRecord as Record<string, unknown>).productOrderLineDeliveryCascade;

  return Array.isArray(value) ? (value as OrderLineDeliveryItem[]) : [];
}

function orderLineDeliveryText(record: OrderLineDeliveryItem, key: string, fallback = "-"): string {
  const raw = String(record[key] ?? "").trim();

  return raw || fallback;
}

function orderLineDeliveryNumberValue(record: OrderLineDeliveryItem, key: string): number {
  const value = Number(record[key] ?? 0);

  return Number.isFinite(value) ? value : 0;
}

function orderLineDeliveryArray(record: OrderLineDeliveryItem, key: string): OrderLineDeliveryItem[] {
  const value = record[key];

  return Array.isArray(value) ? (value as OrderLineDeliveryItem[]) : [];
}

function orderLineQuantityLabel(value: number): string {
  if (!Number.isFinite(value) || value <= 0) {
    return "0 unité";
  }

  return formatNumber(value) + " unité" + (value > 1 ? "s" : "");
}

function orderLineDeliveryStatusLabel(status: string): string {
  if (status === "en_attente") {
    return "En attente";
  }

  if (status === "partiellement_livree") {
    return "Partiellement livrée";
  }

  if (status === "totalement_livree") {
    return "Totalement livrée";
  }

  return humanStatusLabel(status);
}

function orderLineDeliveryStatusClass(status: string): string {
  if (status === "en_attente") {
    return "rounded-full bg-orange-50 px-3 py-1.5 text-[11px] font-black text-orange-700 ring-1 ring-orange-100";
  }

  if (status === "partiellement_livree") {
    return "rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-black text-blue-700 ring-1 ring-blue-100";
  }

  if (status === "totalement_livree") {
    return "rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-black text-emerald-700 ring-1 ring-emerald-100";
  }

  return statusPillClass(status);
}

function OrderLinesDeliveryPanel({ items }: { items: OrderLineDeliveryItem[] }) {
  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-7">
      <SectionTitle
        title="Lignes de commande du produit"
        subtitle="Lignes où ce produit apparaît, avec leurs livraisons associées."
      />

      {items.length === 0 ? (
        <EmptyPanel icon="📄" text="Aucune ligne de commande liée à ce produit." />
      ) : (
        <div className="space-y-3">
          <div className="grid items-center gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-white xl:grid-cols-[44px_1fr_1fr_1fr_1fr]">
            <span />
            <span>Date ligne commande</span>
            <span>Quantité commandée</span>
            <span>Montant</span>
            <span>Statut livraison</span>
          </div>

          {items.map((line) => {
            const lineId = orderLineDeliveryText(line, "id", orderLineDeliveryText(line, "title", "ligne"));
            const receptions = orderLineDeliveryArray(line, "receptions");
            const status = orderLineDeliveryText(line, "deliveryStatus", "en_attente");

            return (
              <details
                key={lineId}
                className="group rounded-[1.35rem] border border-slate-200 bg-white p-3 shadow-sm open:ring-1 open:ring-emerald-100"
              >
                <summary className="cursor-pointer list-none">
                  <div className="grid items-center gap-3 xl:grid-cols-[44px_1fr_1fr_1fr_1fr]">
                    <div className="flex items-center justify-center">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-base font-black text-emerald-700 ring-1 ring-emerald-200 group-open:hidden">
                        +
                      </span>
                      <span className="hidden h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-base font-black text-white group-open:inline-flex">
                        −
                      </span>
                    </div>

                    <div>
                      <p className="truncate text-xs font-black text-slate-900">
                        {formatDate(orderLineDeliveryText(line, "dateCommande", ""))}
                      </p>
                      <p className="mt-1 truncate text-[11px] font-bold text-slate-500">
                        {orderLineDeliveryText(line, "orderTitle", "Commande fournisseur")}
                      </p>
                    </div>

                    <p className="truncate text-xs font-black text-slate-900">
                      {orderLineQuantityLabel(orderLineDeliveryNumberValue(line, "quantityOrdered"))}
                    </p>

                    <p className="truncate text-xs font-black text-slate-900">
                      {money(orderLineDeliveryNumberValue(line, "amount"))}
                    </p>

                    <div className="flex items-center justify-start">
                      <span className={orderLineDeliveryStatusClass(status)}>
                        {orderLineDeliveryStatusLabel(status)}
                      </span>
                    </div>
                  </div>
                </summary>

                <div className="mt-4 space-y-3 border-t border-slate-200 pt-4">
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                      Ligne de commande
                    </p>
                    <p className="mt-1 text-sm font-black text-slate-900">
                      {orderLineDeliveryText(line, "title", "Ligne de commande")}
                    </p>
                    <p className="mt-1 text-xs font-bold text-slate-500">
                      Fournisseur : {orderLineDeliveryText(line, "supplierLabel", "Fournisseur non renseigné")}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
                    <div className="mb-3 grid items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500 xl:grid-cols-[1fr_1fr]">
                      <span>Date livraison</span>
                      <span>Quantité livrée</span>
                    </div>

                    {receptions.length === 0 ? (
                      <p className="rounded-2xl bg-orange-50 px-4 py-3 text-xs font-bold text-orange-700 ring-1 ring-orange-100">
                        Aucune livraison rattachée à cette ligne.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {receptions.map((reception) => {
                          const receptionId = orderLineDeliveryText(
                            reception,
                            "id",
                            orderLineDeliveryText(reception, "dateLivraison", "livraison")
                          );

                          return (
                            <div
                              key={receptionId}
                              className="grid items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-xs ring-1 ring-emerald-100 xl:grid-cols-[1fr_1fr]"
                            >
                              <p className="font-black text-emerald-900">
                                {formatDate(orderLineDeliveryText(reception, "dateLivraison", ""))}
                              </p>
                              <p className="font-black text-emerald-700">
                                {orderLineQuantityLabel(orderLineDeliveryNumberValue(reception, "quantityDelivered"))}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      )}
    </section>
  );
}

`;

  sheet = sheet.replace(anchor, helpers + anchor);
}

/**
 * 5. Sheet : insérer le panneau après ProductFlowDiagram.
 */
if (!sheet.includes("<OrderLinesDeliveryPanel items={orderLineDeliveryItems(rootRecord)} />")) {
  const oldRender = "            <ProductFlowDiagram />";

  if (!sheet.includes(oldRender)) {
    fail("Rendu ProductFlowDiagram introuvable.");
  }

  sheet = sheet.replace(
    oldRender,
    `            <ProductFlowDiagram />

            <OrderLinesDeliveryPanel items={orderLineDeliveryItems(rootRecord)} />`
  );
}

/**
 * 6. Vérifications.
 */
const checks = [
  ["loader buildProductOrderLineDeliveryCascade", loader.includes("function buildProductOrderLineDeliveryCascade(")],
  ["loader productOrderLineDeliveryCascade const", loader.includes("const productOrderLineDeliveryCascade = buildProductOrderLineDeliveryCascade(")],
  ["loader exposes productOrderLineDeliveryCascade", loader.includes("productOrderLineDeliveryCascade,")],
  ["sheet OrderLinesDeliveryPanel", sheet.includes("function OrderLinesDeliveryPanel")],
  ["sheet renders OrderLinesDeliveryPanel", sheet.includes("<OrderLinesDeliveryPanel items={orderLineDeliveryItems(rootRecord)} />")],
  ["no reception amount label", !sheet.includes("Montant livré")],
  ["no reception status label", !sheet.includes("Statut réception")],
];

console.table(checks.map(([label, ok]) => ({ label, ok })));

const failed = checks.filter(([, ok]) => !ok);

if (failed.length > 0) {
  fail("Vérifications échouées.");
}

write(loaderPath, loader);
write(sheetPath, sheet);

write(
  reportPath,
  [
    "# AMARKHYS-PRODUCT-HUB-ORDER-LINES-DELIVERY-A2",
    "",
    "## Objectif",
    "",
    "Lister les lignes de commande où le produit apparaît et expander leurs livraisons.",
    "",
    "## Ligne synthétique",
    "",
    "- +",
    "- Date ligne commande",
    "- Quantité commandée",
    "- Montant",
    "- Statut livraison calculé",
    "",
    "## Expansion",
    "",
    "- Date livraison",
    "- Quantité livrée",
    "",
    "## Décision métier",
    "",
    "- Le montant vient de la ligne de commande.",
    "- Le statut de livraison est calculé au niveau ligne de commande.",
    "- La réception n’affiche pas de montant ni de statut, car ces champs ne sont pas portés par la réception.",
    "",
    "## Hors périmètre",
    "",
    "- Aucun changement moteur stock.",
    "- Aucun changement mutation stock.",
    "- Aucun changement route/navigation.",
    "",
  ].join("\\n")
);

console.log("[OK] AMARKHYS-PRODUCT-HUB-ORDER-LINES-DELIVERY-A2 applied");
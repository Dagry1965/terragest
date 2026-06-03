const fs = require("fs");
const path = require("path");

const root = process.cwd();

const loaderPath = path.join(root, "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts");
const sheetPath = path.join(root, "src/components/erp/hub/ERPProductStockOperationalSheet.tsx");
const reportPath = path.join(root, "docs/audits/AMARKHYS-PRODUCT-HUB-SUPPLIER-SUPPLY-LAYER-B.md");

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file, suffix) {
  fs.writeFileSync(file + suffix, read(file), "utf8");
}

function fail(message) {
  throw new Error(message);
}

let loader = read(loaderPath);
let sheet = read(sheetPath);

backup(loaderPath, ".bak-supplier-supply-layer-b");
backup(sheetPath, ".bak-supplier-supply-layer-b");

/**
 * 1. Loader: import fournisseursautoModule
 */
const importReceptions =
  'import { receptionsstockautoModule } from "@/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module";';

const importFournisseurs =
  'import { fournisseursautoModule } from "@/runtime/modules/generated/fournisseursauto/fournisseursauto.module";';

if (!loader.includes(importFournisseurs)) {
  if (!loader.includes(importReceptions)) {
    fail("Import receptionsstockautoModule introuvable.");
  }

  loader = loader.replace(importReceptions, importReceptions + "\n" + importFournisseurs);
}

/**
 * 2. Loader: ajouter helpers fournisseurs
 */
if (!loader.includes("function supplierBusinessLabel(")) {
  const helperAnchor = "function enrichOrderWithProductLine(";

  if (!loader.includes(helperAnchor)) {
    fail("Ancre enrichOrderWithProductLine introuvable.");
  }

  const helpers = `
function supplierBusinessLabel(supplier: ERPRecordHubRecord | null | undefined): string {
  if (!supplier) {
    return "";
  }

  return String(
    supplier.nom ??
      supplier.raisonSociale ??
      supplier.displayLabel ??
      supplier.label ??
      supplier.codeFournisseur ??
      ""
  ).trim();
}

function enrichOrderWithSupplier(
  order: ERPRecordHubRecord,
  suppliers: ERPRecordHubRecord[]
): ERPRecordHubRecord {
  const supplierIds = hubRelationIds(order.fournisseurId);
  const supplier =
    suppliers.find((item) => supplierIds.includes(getHubRecordId(item))) ?? null;

  if (!supplier) {
    return order;
  }

  const label = supplierBusinessLabel(supplier);

  return {
    ...order,
    fournisseurLabel: label,
    fournisseurNom: String(supplier.nom ?? label ?? ""),
    fournisseurCode: String(supplier.codeFournisseur ?? ""),
    fournisseurTelephone: String(supplier.telephone ?? ""),
    fournisseurEmail: String(supplier.email ?? ""),
    fournisseurVille: String(supplier.ville ?? ""),
  };
}

`;
  loader = loader.replace(helperAnchor, helpers + helperAnchor);
}

/**
 * 3. Loader: charger fournisseurs dans Promise.all
 */
const oldPromise =
`    const [mouvements, commandes, lignesCommande, receptions] = await Promise.all([
      safeList(mouvementsstockautoModule),
      safeList(commandesstockautoModule),
      safeList(lignescommandestockautoModule),
      safeList(receptionsstockautoModule),
    ]);`;

const newPromise =
`    const [mouvements, commandes, lignesCommande, receptions, fournisseurs] = await Promise.all([
      safeList(mouvementsstockautoModule),
      safeList(commandesstockautoModule),
      safeList(lignescommandestockautoModule),
      safeList(receptionsstockautoModule),
      safeList(fournisseursautoModule),
    ]);`;

if (loader.includes(oldPromise)) {
  loader = loader.replace(oldPromise, newPromise);
} else if (!loader.includes("const [mouvements, commandes, lignesCommande, receptions, fournisseurs] = await Promise.all")) {
  fail("Promise.all supply chain introuvable.");
}

/**
 * 4. Loader: enrichir les commandes avec fournisseur
 */
const oldOrderReturn = "        return enrichOrderWithProductLine(order, matchingLine);";
const newOrderReturn = "        return enrichOrderWithSupplier(enrichOrderWithProductLine(order, matchingLine), fournisseurs);";

if (loader.includes(oldOrderReturn)) {
  loader = loader.replace(oldOrderReturn, newOrderReturn);
}

const oldDirectOrders = '      ...productOrdersDirect.map((record) => enrichRelatedRecord(record, "Commande")),';
const newDirectOrders = '      ...productOrdersDirect.map((record) => enrichOrderWithSupplier(enrichRelatedRecord(record, "Commande"), fournisseurs)),';

if (loader.includes(oldDirectOrders)) {
  loader = loader.replace(oldDirectOrders, newDirectOrders);
}

/**
 * 5. Sheet: ajouter helpers approvisionnement
 */
if (!sheet.includes("function latestOrderLabel(")) {
  const anchor = "function receptionSubtitle(record: ERPRecordHubRecord): string {";

  if (!sheet.includes(anchor)) {
    fail("Ancre receptionSubtitle introuvable.");
  }

  const helpers = `
function latestOrderLabel(records: ERPRecordHubRecord[]): string {
  const first = records[0];

  if (!first) {
    return "Aucune commande";
  }

  return text(first, ["numeroCommande", "numero", "code", "displayLabel"], "Commande");
}

function latestReceptionLabel(records: ERPRecordHubRecord[]): string {
  const first = records[0];

  if (!first) {
    return "Aucune réception";
  }

  return receptionSubtitle(first);
}

function mainSupplierLabel(records: ERPRecordHubRecord[]): string {
  const first = records.find((record) => supplierLabel(record) !== "Fournisseur non renseigné");

  if (!first) {
    return "Fournisseur non renseigné";
  }

  return supplierLabel(first);
}

function totalOrderedQuantity(records: ERPRecordHubRecord[]): string {
  const total = records.reduce((sum, record) => {
    return sum + numberValue(record, ["quantiteCommandee", "productLineQuantity", "quantite"], 0);
  }, 0);

  if (total <= 0) {
    return "Quantité non renseignée";
  }

  return formatNumber(total) + " unité" + (total > 1 ? "s" : "");
}

function totalReceivedQuantity(records: ERPRecordHubRecord[]): string {
  const total = records.reduce((sum, record) => {
    return sum + numberValue(record, ["quantiteRecue", "quantitéReçue", "quantite", "quantity"], 0);
  }, 0);

  if (total <= 0) {
    return "Aucune réception";
  }

  return formatNumber(total) + " unité" + (total > 1 ? "s" : "");
}

`;
  sheet = sheet.replace(anchor, helpers + anchor);
}

/**
 * 6. Sheet: ajouter bloc Approvisionnement dans aside, avant Dossier sélectionné
 */
const asideAnchor =
`          <aside className="space-y-5">
            <section className="rounded-[1.9rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <SectionTitle title="Dossier sélectionné" />`;

const supplyBlock =
`          <aside className="space-y-5">
            <section className="rounded-[1.9rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <SectionTitle
                title="Approvisionnement"
                subtitle="Lecture fournisseur et réassort du produit."
              />

              <div className="grid gap-3">
                {[
                  ["Fournisseur principal", mainSupplierLabel(commandes)],
                  ["Dernière commande", latestOrderLabel(commandes)],
                  ["Dernière réception", latestReceptionLabel(receptions)],
                  ["Quantité commandée", totalOrderedQuantity(commandes)],
                  ["Quantité reçue", totalReceivedQuantity(receptions)],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100"
                  >
                    <p className="text-xs font-black text-slate-500">{label}</p>
                    <p className="max-w-[160px] truncate text-right text-xs font-black text-slate-900">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.9rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <SectionTitle title="Dossier sélectionné" />`;

if (!sheet.includes('title="Approvisionnement"')) {
  if (!sheet.includes(asideAnchor)) {
    fail("Ancre aside Dossier sélectionné introuvable.");
  }

  sheet = sheet.replace(asideAnchor, supplyBlock);
}

/**
 * 7. Vérifications
 */
const checks = [
  ["loader import fournisseursautoModule", loader.includes("fournisseursautoModule")],
  ["loader charge fournisseurs", loader.includes("receptions, fournisseurs] = await Promise.all")],
  ["loader enrichit fournisseur", loader.includes("enrichOrderWithSupplier")],
  ["sheet helper mainSupplierLabel", sheet.includes("function mainSupplierLabel")],
  ["sheet bloc Approvisionnement", sheet.includes('title="Approvisionnement"')],
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
    "# AMARKHYS-PRODUCT-HUB-SUPPLIER-SUPPLY-LAYER-B",
    "",
    "## Objectif",
    "",
    "Ajouter la lecture Fournisseurs / Approvisionnement dans la fiche produit opérationnelle.",
    "",
    "## Correction",
    "",
    "- Chargement de fournisseursauto dans RuntimeProductStockOperationalHubLoader.",
    "- Résolution fournisseurId des commandes vers fournisseurLabel / fournisseurNom / fournisseurCode / téléphone.",
    "- Ajout d’un bloc Approvisionnement dans l’aside de la fiche produit.",
    "- Affichage fournisseur principal, dernière commande, dernière réception, quantité commandée, quantité reçue.",
    "",
    "## Hors périmètre",
    "",
    "- Aucun changement moteur stock.",
    "- Aucun changement mutation stock.",
    "- Aucun changement du layout principal validé.",
    "",
  ].join("\n")
);

console.log("[OK] AMARKHYS-PRODUCT-HUB-SUPPLIER-SUPPLY-LAYER-B applied");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(root, "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts");
const report = path.join(root, "docs/audits/AMARKHYS-PRODUCT-HUB-SUPPLY-CHAIN-RELATIONS-E.md");
const backup = target + ".bak-supply-chain-relations-e";

if (!fs.existsSync(target)) {
  throw new Error("Loader introuvable: " + target);
}

let content = fs.readFileSync(target, "utf8");
fs.writeFileSync(backup, content, "utf8");

function fail(message) {
  throw new Error(message);
}

function insertImport() {
  const importCommandes =
    'import { commandesstockautoModule } from "@/runtime/modules/generated/commandesstockauto/commandesstockauto.module";';
  const importLignes =
    'import { lignescommandestockautoModule } from "@/runtime/modules/generated/lignescommandestockauto/lignescommandestockauto.module";';

  if (content.includes(importLignes)) {
    return;
  }

  if (!content.includes(importCommandes)) {
    fail("Import commandesstockautoModule introuvable.");
  }

  content = content.replace(importCommandes, importCommandes + "\n" + importLignes);
}

function findFunctionEnd(lines, startIndex) {
  let depth = 0;
  let started = false;

  for (let i = startIndex; i < lines.length; i += 1) {
    const line = lines[i];

    for (const char of line) {
      if (char === "{") {
        depth += 1;
        started = true;
      }

      if (char === "}") {
        depth -= 1;

        if (started && depth === 0) {
          return i;
        }
      }
    }
  }

  return -1;
}

function insertHelpers() {
  if (content.includes("function hubRelationIds(")) {
    return;
  }

  const lines = content.split(/\r?\n/);
  const safeListStart = lines.findIndex((line) =>
    line.includes("async function safeList(module: ERPModule)")
  );

  if (safeListStart < 0) {
    fail("safeList introuvable.");
  }

  const safeListEnd = findFunctionEnd(lines, safeListStart);

  if (safeListEnd < 0) {
    fail("Fin safeList introuvable.");
  }

  const helpers = `
function hubRelationIds(value: unknown): string[] {
  if (value === null || value === undefined) {
    return [];
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    const raw = String(value).trim();

    if (!raw) {
      return [];
    }

    return Array.from(new Set([raw, ...raw.split(/[;,]/g).map((item) => item.trim()).filter(Boolean)]));
  }

  if (Array.isArray(value)) {
    return Array.from(new Set(value.flatMap((item) => hubRelationIds(item))));
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    return Array.from(
      new Set(
        ["id", "_id", "value", "key", "recordId", "refId", "uid", "docId"].flatMap((key) =>
          hubRelationIds(record[key])
        )
      )
    );
  }

  return [];
}

function hubRelationMatches(value: unknown, expectedId: string): boolean {
  const expected = String(expectedId ?? "").trim();

  if (!expected) {
    return false;
  }

  return hubRelationIds(value).some((id) => id === expected);
}

function hubRelationMatchesAny(value: unknown, expectedIds: Set<string>): boolean {
  if (expectedIds.size === 0) {
    return false;
  }

  return hubRelationIds(value).some((id) => expectedIds.has(id));
}

function getHubRecordId(record: ERPRecordHubRecord | null | undefined): string {
  if (!record) {
    return "";
  }

  return hubRelationIds(record.id ?? record._id)[0] ?? "";
}

function uniqueHubRecords(records: ERPRecordHubRecord[]): ERPRecordHubRecord[] {
  const seen = new Set<string>();

  return records.filter((record) => {
    const id = getHubRecordId(record);

    if (!id) {
      return true;
    }

    if (seen.has(id)) {
      return false;
    }

    seen.add(id);
    return true;
  });
}

function enrichOrderWithProductLine(
  order: ERPRecordHubRecord,
  line: ERPRecordHubRecord | null
): ERPRecordHubRecord {
  if (!line) {
    return enrichRelatedRecord(order, "Commande");
  }

  return enrichRelatedRecord(
    {
      ...order,
      produitId: line.produitId ?? order.produitId,
      productLineId: getHubRecordId(line),
      quantiteCommandee: line.quantiteCommandee ?? line.quantite,
      productLineQuantity: line.quantiteCommandee ?? line.quantite,
      productLineStatus: line.statut ?? line.status,
      productLineAmountHT: line.montantHT,
      productLineAmountTTC: line.montantTTC,
    },
    "Commande"
  );
}

function enrichReceptionWithProductLine(
  reception: ERPRecordHubRecord,
  line: ERPRecordHubRecord | null
): ERPRecordHubRecord {
  if (!line) {
    return enrichRelatedRecord(reception, "Réception");
  }

  return enrichRelatedRecord(
    {
      ...reception,
      produitId: reception.produitId ?? line.produitId,
      commandeId: reception.commandeId ?? line.commandeId,
      productLineId: getHubRecordId(line),
      quantiteCommandee: line.quantiteCommandee ?? line.quantite,
      productLineQuantity: line.quantiteCommandee ?? line.quantite,
      productLineStatus: line.statut ?? line.status,
    },
    "Réception"
  );
}
`.split("\n");

  lines.splice(safeListEnd + 1, 0, "", ...helpers, "");
  content = lines.join("\n");
}

function replacePromiseAndBusinessBlock() {
  const lines = content.split(/\r?\n/);

  const promiseStart = lines.findIndex((line) =>
    line.includes("const [mouvements, commandes, receptions] = await Promise.all([")
  );

  if (promiseStart < 0) {
    fail("Ancien Promise.all introuvable.");
  }

  const promiseEnd = lines.findIndex((line, index) =>
    index > promiseStart && line.trim() === "]);"
  );

  if (promiseEnd < 0) {
    fail("Fin Promise.all introuvable.");
  }

  const newPromise = [
    "    const [mouvements, commandes, lignesCommande, receptions] = await Promise.all([",
    "      safeList(mouvementsstockautoModule),",
    "      safeList(commandesstockautoModule),",
    "      safeList(lignescommandestockautoModule),",
    "      safeList(receptionsstockautoModule),",
    "    ]);",
  ];

  lines.splice(promiseStart, promiseEnd - promiseStart + 1, ...newPromise);

  const start = lines.findIndex((line) =>
    line.includes("const productMovements = filterByAnyProductKey(mouvements, productId);")
  );

  if (start < 0) {
    fail("Début bloc productMovements introuvable.");
  }

  const end = lines.findIndex((line, index) =>
    index > start && line.includes("const enrichedRootRecord = enrichRootRecord(")
  );

  if (end < 0) {
    fail("Fin bloc productMovements introuvable.");
  }

  const newBlock = `
    const productMovements = filterByAnyProductKey(mouvements, productId);

    const productOrderLines = lignesCommande.filter((line) =>
      hubRelationMatches(line.produitId ?? line.productId ?? line.articleId, productId)
    );

    const productOrderLineIds = new Set(
      productOrderLines.map((line) => getHubRecordId(line)).filter(Boolean)
    );

    const productOrderIds = new Set(
      productOrderLines.flatMap((line) => hubRelationIds(line.commandeId)).filter(Boolean)
    );

    const productOrdersDirect = filterByAnyProductKey(commandes, productId);

    const productOrdersFromLines = commandes
      .filter((order) => productOrderIds.has(getHubRecordId(order)))
      .map((order) => {
        const orderId = getHubRecordId(order);
        const matchingLine =
          productOrderLines.find((line) => hubRelationMatches(line.commandeId, orderId)) ?? null;

        return enrichOrderWithProductLine(order, matchingLine);
      });

    const productOrders = uniqueHubRecords([
      ...productOrdersFromLines,
      ...productOrdersDirect.map((record) => enrichRelatedRecord(record, "Commande")),
    ]);

    const productReceptionsDirect = filterByAnyProductKey(receptions, productId);

    const productReceptionsFromLines = receptions
      .filter((reception) =>
        hubRelationMatchesAny(reception.ligneCommandeId, productOrderLineIds) ||
        hubRelationMatchesAny(reception.commandeId, productOrderIds)
      )
      .map((reception) => {
        const matchingLine =
          productOrderLines.find((line) =>
            hubRelationMatches(reception.ligneCommandeId, getHubRecordId(line))
          ) ?? null;

        return enrichReceptionWithProductLine(reception, matchingLine);
      });

    const productReceptionsByStock = selectedStockId
      ? filterByAnyStockKey(receptions, selectedStockId).map((record) =>
          enrichRelatedRecord(record, "Réception")
        )
      : [];

    const productReceptions = uniqueHubRecords([
      ...productReceptionsFromLines,
      ...productReceptionsDirect.map((record) => enrichRelatedRecord(record, "Réception")),
      ...productReceptionsByStock,
    ]);

    relatedRecordsBySection.mouvements = (
      selectedStockId
        ? filterByAnyStockKey(mouvements, selectedStockId)
        : productMovements
    ).map((record) => enrichRelatedRecord(record, "Mouvement"));

    relatedRecordsBySection.commandes = productOrders;

    relatedRecordsBySection.receptions = productReceptions;
`.trimEnd().split("\n");

  lines.splice(start, end - start, ...newBlock);
  content = lines.join("\n");
}

function verify() {
  const checks = [
    ["import lignescommandestockautoModule", content.includes("lignescommandestockautoModule")],
    ["Promise.all charge lignesCommande", content.includes("const [mouvements, commandes, lignesCommande, receptions] = await Promise.all")],
    ["productOrderLines présent", content.includes("const productOrderLines = lignesCommande.filter")],
    ["ancienne productOrders directe supprimée", !content.includes("const productOrders = filterByAnyProductKey(commandes, productId);")],
    ["ancienne productReceptions directe supprimée", !content.includes("const productReceptions = filterByAnyProductKey(receptions, productId);")],
    ["commandes enrichies affectées", content.includes("relatedRecordsBySection.commandes = productOrders;")],
    ["réceptions enrichies affectées", content.includes("relatedRecordsBySection.receptions = productReceptions;")],
    ["enrichRootRecord reçoit productOrders", content.includes("      productOrders,")],
    ["enrichRootRecord reçoit productReceptions", content.includes("      productReceptions")],
  ];

  console.table(checks.map(([label, ok]) => ({ label, ok })));

  const failed = checks.filter(([, ok]) => !ok);

  if (failed.length > 0) {
    fail("Vérifications échouées.");
  }
}

insertImport();
insertHelpers();
replacePromiseAndBusinessBlock();
verify();

fs.writeFileSync(target, content, "utf8");

fs.mkdirSync(path.dirname(report), { recursive: true });

fs.writeFileSync(
  report,
  [
    "# AMARKHYS-PRODUCT-HUB-SUPPLY-CHAIN-RELATIONS-E",
    "",
    "## Objectif",
    "",
    "Corriger le loader produit pour alimenter commandes/réceptions via les lignes de commande.",
    "",
    "## Correction",
    "",
    "- Ajout import lignescommandestockautoModule.",
    "- Chargement de lignescommandestockauto dans le Promise.all.",
    "- Résolution des commandes via lignescommandestockauto.produitId -> commandeId.",
    "- Résolution des réceptions via ligneCommandeId / commandeId / produitId / stockId.",
    "- Enrichissement des commandes et réceptions avec les informations de ligne produit.",
    "- Correction appliquée par script Node.js ligne par ligne.",
    "",
    "## Hors périmètre",
    "",
    "- Aucun changement de design.",
    "- Aucun changement moteur stock.",
    "- Aucun changement mutation stock.",
    "",
  ].join("\n"),
  "utf8"
);

console.log("[OK] AMARKHYS-PRODUCT-HUB-SUPPLY-CHAIN-RELATIONS-E applied");
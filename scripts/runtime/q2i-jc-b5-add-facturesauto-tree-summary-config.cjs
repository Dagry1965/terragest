const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/modules/generated/facturesauto/facturesauto.module.ts";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");
fs.writeFileSync(file + ".bak-q2i-jc-b5-facturesauto-summary", original, "utf8");

let next = original;

if (next.includes("summary: {")) {
  console.log("[SKIP] facturesauto operational.tree.summary already exists");
} else {
  const anchor = `    rightPanel: {`;

  const insert = `    tree: {
      summary: {
        rootOnly: true,
        badges: [
          {
            field: "typeFacture",
            valueMap: {
              atelier: "FACTURE ATELIER",
              boutique: "FACTURE BOUTIQUE",
              mixte: "FACTURE MIXTE",
              autre: "FACTURE",
            },
            tone: "info",
          },
          {
            field: "statutFacture",
            valueMap: {
              brouillon: "BROUILLON",
              emise: "ÉMISE",
              annulee: "ANNULÉE",
            },
            toneMap: {
              brouillon: "warning",
              emise: "success",
              annulee: "danger",
            },
          },
          {
            field: "statutPaiement",
            valueMap: {
              en_attente: "PAIEMENT EN ATTENTE",
              partiel: "PAIEMENT PARTIEL",
              paye: "PAYÉE",
            },
            toneMap: {
              en_attente: "warning",
              partiel: "warning",
              paye: "success",
            },
          },
        ],
        metrics: [
          { label: "HT", field: "montantHT", format: "currency" },
          { label: "TVA", field: "tva", format: "currency" },
          { label: "TTC", field: "montantTTC", format: "currency" },
          { label: "Payé", field: "montantPaye", format: "currency" },
          { label: "Reste", field: "resteAPayer", format: "currency" },
        ],
      },
    },

`;

  if (!next.includes(anchor)) {
    throw new Error("Anchor not found: operational.rightPanel");
  }

  next = next.replace(anchor, insert + anchor);
  console.log("[ADDED] facturesauto operational.tree.summary config");
}

fs.writeFileSync(file, next, "utf8");

console.log("[DONE] Q2-I-J-C-B5 facturesauto summary config added.");
console.log("[WRITTEN]", rel);

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  resolver: "src/runtime/operational/RuntimeOperationalTreeResolver.ts",
  factures: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
};

function filePath(rel) {
  return path.join(ROOT, rel);
}

function read(rel) {
  const file = filePath(rel);
  if (!fs.existsSync(file)) {
    throw new Error("File not found: " + rel);
  }
  return fs.readFileSync(file, "utf8");
}

function write(rel, content) {
  fs.writeFileSync(filePath(rel), content, "utf8");
}

function backup(rel, suffix) {
  fs.writeFileSync(filePath(rel) + suffix, read(rel), "utf8");
}

let resolver = read(files.resolver);
backup(files.resolver, ".bak-q2i-jc-b3-wire-summary-build-node");

if (!resolver.includes("function buildRuntimeOperationalTreeSummary(")) {
  throw new Error("buildRuntimeOperationalTreeSummary helper is missing. Run B2 helper patch first.");
}

if (!resolver.includes("summary: buildRuntimeOperationalTreeSummary")) {
  const anchor = `    source,
    children: params.children ?? [],`;

  const replacement = `    source,
    summary: buildRuntimeOperationalTreeSummary({
      module: params.module,
      record: params.record,
      depth: params.depth,
    }),
    children: params.children ?? [],`;

  if (!resolver.includes(anchor)) {
    throw new Error("buildNode source/children anchor not found.");
  }

  resolver = resolver.replace(anchor, replacement);
  console.log("[ADDED] buildNode summary mapping");
} else {
  console.log("[SKIP] buildNode summary mapping already exists");
}

write(files.resolver, resolver);

let factures = read(files.factures);
backup(files.factures, ".bak-q2i-jc-b3-invoice-summary-config");

if (!factures.includes("summary: {")) {
  const treeAnchor = "tree: {";

  if (!factures.includes(treeAnchor)) {
    throw new Error("facturesauto operational.tree anchor not found.");
  }

  const summaryConfig = `tree: {
      summary: {
        rootOnly: true,
        badges: [
          {
            field: "typeFacture",
            valueMap: {
              atelier: "FACTURE ATELIER",
              boutique: "FACTURE BOUTIQUE",
              mixte: "FACTURE MIXTE",
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
      },`;

  factures = factures.replace(treeAnchor, summaryConfig);
  console.log("[ADDED] facturesauto operational.tree.summary config");
} else {
  console.log("[SKIP] facturesauto summary config already exists");
}

write(files.factures, factures);

console.log("[DONE] Q2-I-J-C-B3 summary wired in buildNode and factures metadata.");
console.log("[WRITTEN]", files.resolver);
console.log("[WRITTEN]", files.factures);

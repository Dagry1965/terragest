const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/business-rules/runtimeBusinessRules.ts";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

const oldBlock = `      const encaissementsValides =
        encaissements.filter(
          (encaissement: any) =>
            String(encaissement.factureId) ===
              String(payload.factureId) &&
            encaissement.statut ===
              "valide"
        );`;

const newBlock = `      const encaissementsValides =
        encaissements.filter(
          (encaissement: any) =>
            String(encaissement.factureId) ===
              String(payload.factureId) &&
            String(encaissement.tenantId ?? "") ===
              String(facture.tenantId ?? "") &&
            String(encaissement.workspace ?? "") ===
              String(facture.workspace ?? "") &&
            encaissement.statut ===
              "valide" &&
            !encaissement.deletedAt &&
            !encaissement.removedAt
        );`;

const occurrences = content.split(oldBlock).length - 1;

if (occurrences < 2) {
  throw new Error(
    `[Q2-L-C-B1E] Expected at least 2 payment recompute blocks, found ${occurrences}`
  );
}

content = content.replaceAll(oldBlock, newBlock);

if (content !== before) {
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("[UPDATED]", file);
  console.log("[REPLACED BLOCKS]", occurrences);
} else {
  console.log("[UNCHANGED]", file);
}

console.log("[Q2-L-C-B1E] Done");
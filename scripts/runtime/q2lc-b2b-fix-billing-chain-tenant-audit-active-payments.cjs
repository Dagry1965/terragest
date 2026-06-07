const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "scripts/runtime/q2lc-b2a-audit-billing-chain-tenant-scope.cjs";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

if (!content.includes("function isActivePayment")) {
  content = content.replace(
`function pick(record) {
  if (!record) return null;`,
`function isActivePayment(record) {
  return (
    record &&
    !record.deletedAt &&
    !record.removedAt &&
    String(record.statut ?? "") !== "annule" &&
    String(record.statut ?? "") !== "annulee" &&
    String(record.statut ?? "") !== "annulée"
  );
}

function pick(record) {
  if (!record) return null;`
  );
}

content = content.replace(
`    encaissementsAllMatch:
      encaissements.every((item) =>
        item.tenantId === facture?.tenantId &&
        item.workspace === facture?.workspace
      ),`,
`    activeEncaissementsCount:
      encaissements.filter(isActivePayment).length,
    encaissementsAllMatch:
      encaissements
        .filter(isActivePayment)
        .every((item) =>
          item.tenantId === facture?.tenantId &&
          item.workspace === facture?.workspace
        ),`
);

if (content !== before) {
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("[UPDATED]", file);
} else {
  console.log("[UNCHANGED]", file);
}

console.log("[Q2-L-C-B2B] Done");
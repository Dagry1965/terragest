const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "runtime",
  "actions",
  "RuntimeActionEngine.ts"
);

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function backup(file, suffix) {
  const backupPath = `${file}.bak-${suffix}`;

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(file, backupPath);
    console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
  }
}

if (!fs.existsSync(target)) {
  throw new Error(`Fichier introuvable: ${target}`);
}

backup(target, "q20h5c-b2-wire-remove-line-action");

let content = read(target);

if (content.includes("Q20H5C_B2_REMOVE_LINE_ACTION")) {
  console.log("[SKIP] Q20H5C-B2 déjà appliqué.");
  process.exit(0);
}

const marker = `    if (
      workflow &&
      record
    ) {`;

if (!content.includes(marker)) {
  throw new Error("Point d'insertion RuntimeActionEngine.execute introuvable.");
}

const injection = `    // Q20H5C_B2_REMOVE_LINE_ACTION
    // Action métier non-transitionnelle : retirer proprement une ligne
    // sans réintroduire un statut utilisateur "annulée".
    if (
      module?.metadata?.key === "lignesinterventionauto" &&
      action.key === "retirer-ligne" &&
      record
    ) {
      const { RuntimeLineRemovalService } =
        await import("@/runtime/line-items");

      const lineId =
        String(
          (record as any)?.id ??
          (record as any)?._id ??
          ""
        );

      if (!lineId) {
        return {
          success: false,
          message: "Ligne intervention introuvable.",
          action,
          record,
        };
      }

      const result =
        await RuntimeLineRemovalService.removeInterventionLine({
          lineId,
          reason: "Ligne retirée depuis l'action métier.",
        });

      if (!result.removed) {
        return {
          success: false,
          message:
            result.reason === "line-linked-to-invoice"
              ? "Cette ligne est déjà liée à une facture. Elle ne peut pas être retirée directement."
              : result.reason === "already-removed"
                ? "Cette ligne a déjà été retirée."
                : result.reason === "stock-not-found"
                  ? "Stock introuvable pour réintégrer la quantité."
                  : result.reason === "missing-stock-product-or-quantity"
                    ? "Impossible de réintégrer le stock : produit, stock ou quantité manquant."
                    : "Retrait de la ligne impossible.",
          result,
          action,
          record,
        };
      }

      return {
        success: true,
        message: "Ligne retirée avec succès.",
        result,
        action,
        record,
      };
    }

`;

content = content.replace(marker, injection + marker);

write(target, content);

console.log("");
console.log("[Q20H5C_B2_DONE] Action retirer-ligne branchée au RuntimeLineRemovalService.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
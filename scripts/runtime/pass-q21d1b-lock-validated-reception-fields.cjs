const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21d1b-lock-validated-reception-fields`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21d1b-lock-validated-reception-fields`);
}

let content = fs.readFileSync(file, "utf8");

if (!content.includes("Q21D1B_VALIDATED_RECEPTION_READONLY_FIELDS")) {
  content = content.replace(
    `  const readOnlyFields =
    isRemovedRecord
      ? module.schema.fields.map((field) => field.key)
      : mode === "create"
        ? []
        : Array.from(
            new Set([
              ...compositionReadOnlyFields,
            ])
          );`,
    `  const validatedReceptionReadOnlyFields =
    // Q21D1B_VALIDATED_RECEPTION_READONLY_FIELDS
    // A validated reception is a stock proof.
    // Its critical fields must not be edited freely after stock impact.
    module.metadata.key === "receptionsstockauto" &&
    mode === "edit" &&
    (
      String(initialData?.statut ?? "") === "validee" ||
      Boolean(initialData?.mouvementStockId)
    )
      ? [
          "commandeId",
          "ligneCommandeId",
          "produitId",
          "stockId",
          "quantiteRecue",
          "dateReception",
          "statut",
        ]
      : [];

  const readOnlyFields =
    isRemovedRecord
      ? module.schema.fields.map((field) => field.key)
      : mode === "create"
        ? []
        : Array.from(
            new Set([
              ...compositionReadOnlyFields,
              ...validatedReceptionReadOnlyFields,
            ])
          );`
  );
}

fs.writeFileSync(file, content, "utf8");

console.log("[Q21D1B_DONE] Validated reception critical fields are read-only.");
console.log("Next: pnpm build");
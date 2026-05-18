const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");
const before = content;

/**
 * 1) Importer facturesautoModule.
 */
if (!content.includes("@/runtime/modules/generated/facturesauto")) {
  const firstInterfaceIndex = content.indexOf("interface ");

  if (firstInterfaceIndex === -1) {
    console.error("Could not find import insertion point.");
    process.exit(1);
  }

  const importBlock = `import {
  facturesautoModule,
} from "@/runtime/modules/generated/facturesauto";

`;

  content =
    content.slice(0, firstInterfaceIndex) +
    importBlock +
    content.slice(firstInterfaceIndex);
}

/**
 * 2) Ajouter helper avant handleSubmit.
 */
if (!content.includes("async function validateCancelledInvoiceFinancialGuard")) {
  const marker = `  async function handleSubmit(
      event: React.FormEvent<HTMLFormElement>
    ) {`;

  if (!content.includes(marker)) {
    console.error("handleSubmit marker not found.");
    process.exit(1);
  }

  const helper = `  async function validateCancelledInvoiceFinancialGuard(
    payload: Record<string, unknown>
  ): Promise<RuntimeValidationError[]> {
    const moduleKey =
      module.metadata.key;

    const guardedModules = [
      "encaissementsauto",
      "echeancespaiementauto",
    ];

    if (!guardedModules.includes(moduleKey)) {
      return [];
    }

    const factureId =
      String(payload.factureId ?? "").trim();

    if (!factureId) {
      return [];
    }

    const facture =
      await RuntimeDataBinding.detail(
        facturesautoModule,
        factureId
      );

    const statutFacture =
      String(
        (facture as Record<string, unknown> | null)?.statutFacture ?? ""
      );

    if (statutFacture !== "annulee") {
      return [];
    }

    return [
      {
        field: "factureId",
        message:
          "Cette facture est annulée. Aucune opération financière nouvelle n’est autorisée.",
      },
    ];
  }

`;

  content = content.replace(marker, helper + marker);
}

/**
 * 3) Brancher la validation après uniqueConstraintErrors.
 */
if (!content.includes("cancelledInvoiceFinancialErrors")) {
  const marker = `    const allValidationErrors = [
      ...validationErrors,
      ...uniqueConstraintErrors,
    ];`;

  if (!content.includes(marker)) {
    console.error("allValidationErrors marker not found.");
    process.exit(1);
  }

  const replacement = `    const cancelledInvoiceFinancialErrors =
      await validateCancelledInvoiceFinancialGuard(
        preparedPayload
      );

    const allValidationErrors = [
      ...validationErrors,
      ...uniqueConstraintErrors,
      ...cancelledInvoiceFinancialErrors,
    ];`;

  content = content.replace(marker, replacement);
}

/**
 * 4) Corriger quelques textes visibles si présents.
 */
content = content
  .replaceAll("Les rÃ¨gles mÃ©tier ERP bloquent cet enregistrement.", "Les règles métier ERP bloquent cet enregistrement.")
  .replaceAll("VÃ©hicule", "Véhicule")
  .replaceAll("Montant encaissÃ©", "Montant encaissé")
  .replaceAll("EspÃ¨ces", "Espèces")
  .replaceAll("ChÃ¨que", "Chèque")
  .replaceAll("RÃ©fÃ©rence", "Référence")
  .replaceAll("Ã‰chÃ©ances", "Échéances")
  .replaceAll("Ã©chÃ©ances", "échéances")
  .replaceAll("Montant prÃ©vu", "Montant prévu")
  .replaceAll("Montant payÃ©", "Montant payé")
  .replaceAll("Date Ã©chÃ©ance", "Date échéance")
  .replaceAll("Ã€ venir", "À venir")
  .replaceAll("Partiellement payÃ©e", "Partiellement payée")
  .replaceAll("PayÃ©e", "Payée")
  .replaceAll("AnnulÃ©e", "Annulée")
  .replaceAll("TÃ©lÃ©phone", "Téléphone");

if (content === before) {
  console.log("NO CHANGE");
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED ERPEnterpriseForm cancelled invoice linked financial guard");
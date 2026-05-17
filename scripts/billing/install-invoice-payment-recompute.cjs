const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function file(relativePath) {
  return path.join(ROOT, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(file(relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(file(relativePath), content, "utf8");
  console.log("UPDATED", relativePath);
}

function fixEncoding(content) {
  return content
    .split("NumÃ©ro").join("Numéro")
    .split("PayÃ©").join("Payé")
    .split("VÃ©hicule").join("Véhicule")
    .split("EspÃ¨ces").join("Espèces")
    .split("Relations mÃ©tier").join("Relations métier")
    .split("encaissÃ©").join("encaissé")
    .split("ChÃ¨que").join("Chèque")
    .split("RÃ©fÃ©rence").join("Référence")
    .split("ValidÃ©").join("Validé")
    .split("RejetÃ©").join("Rejeté")
    .split("AnnulÃ©").join("Annulé")
    .split("mÃ©tier").join("métier")
    .split("Ã©").join("é")
    .split("Ã¨").join("è")
    .split("Ã ").join("à")
    .split("Ãª").join("ê");
}

function insertFieldAfterKey(content, anchorKey, newFieldKey, fieldBlock) {
  if (content.includes(`key: "${newFieldKey}"`)) {
    return content;
  }

  const lines = content.split(/\r?\n/);
  const start = lines.findIndex((line) =>
    line.includes(`key: "${anchorKey}"`)
  );

  if (start === -1) {
    throw new Error(`Champ introuvable : ${anchorKey}`);
  }

  let end = -1;

  for (let i = start; i < lines.length; i++) {
    if (lines[i].trim() === "}," || lines[i].trim() === "}") {
      end = i;
      break;
    }
  }

  if (end === -1) {
    throw new Error(`Fin du champ introuvable : ${anchorKey}`);
  }

  lines.splice(end + 1, 0, fieldBlock);

  return lines.join("\n");
}

function ensureInArray(content, existingItem, newItem) {
  if (content.includes(`"${newItem}"`)) {
    return content;
  }

  return content.replace(
    `"${existingItem}"`,
    `"${existingItem}",
          "${newItem}"`
  );
}

function patchFacturesModule() {
  const relativePath =
    "src/runtime/modules/generated/facturesauto/facturesauto.module.ts";

  let content = read(relativePath);
  content = fixEncoding(content);

  content = insertFieldAfterKey(
    content,
    "montantTTC",
    "montantPaye",
`      {
        key: "montantPaye",
        label: "Montant payé",
        type: "number",
        defaultValue: 0,
        list: { order: 7 },
        grid: { cols: 4 }
      },`
  );

  content = insertFieldAfterKey(
    content,
    "montantPaye",
    "resteAPayer",
`      {
        key: "resteAPayer",
        label: "Reste à payer",
        type: "number",
        defaultValue: 0,
        list: { order: 8 },
        grid: { cols: 4 }
      },`
  );

  content = ensureInArray(content, "montantTTC", "montantPaye");
  content = ensureInArray(content, "montantPaye", "resteAPayer");

  write(relativePath, content);
}

function patchEncaissementsModule() {
  const relativePath =
    "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts";

  let content = read(relativePath);
  content = fixEncoding(content);

  write(relativePath, content);
}

function patchBusinessRules() {
  const relativePath =
    "src/runtime/business-rules/runtimeBusinessRules.ts";

  let content = read(relativePath);

  if (content.includes("amarkhys-encaissement-recompute-facture")) {
    console.log("Business rules already patched.");
    return;
  }

  const rule = `

// =====================================================
// AMARKHYS
// ENCAISSEMENT -> RECALCUL FACTURE
// =====================================================

{
  id:
    "amarkhys-encaissement-recompute-facture",

  module:
    "encaissementsauto",

  event:
    "encaissementsauto.created",

  condition:
    (payload) =>
      Boolean(
        payload.factureId
      ),

  action:
    async (payload) => {
      const facturesModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "facturesauto"
        );

      const encaissementsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "encaissementsauto"
        );

      if (
        !facturesModule ||
        !encaissementsModule
      ) {
        return;
      }

      const facture =
        await RuntimeDataBinding.detail(
          facturesModule,
          String(payload.factureId)
        );

      if (!facture) {
        return;
      }

      const encaissements =
        await RuntimeDataBinding.list(
          encaissementsModule
        );

      const encaissementsValides =
        encaissements.filter(
          (encaissement: any) =>
            String(encaissement.factureId) ===
              String(payload.factureId) &&
            encaissement.statut ===
              "valide"
        );

      const montantPaye =
        encaissementsValides.reduce(
          (total: number, encaissement: any) =>
            total +
            Number(
              encaissement.montant ?? 0
            ),
          0
        );

      const montantTTC =
        Number(
          facture.montantTTC ??
          facture.totalTTC ??
          facture.montantTotal ??
          facture.total ??
          0
        );

      const resteAPayer =
        Math.max(
          montantTTC - montantPaye,
          0
        );

      const statutPaiement =
        montantPaye <= 0
          ? "en_attente"
          : montantPaye < montantTTC
            ? "partiel"
            : "paye";

      await RuntimeDataBinding.update(
        facturesModule,
        String(payload.factureId),
        {
          montantPaye,
          resteAPayer,
          statutPaiement,
          dernierEncaissementAt:
            new Date().toISOString(),
        }
      );

      await RuntimeNotificationEngine
        .notify({
          type:
            "amarkhys.facture.recomputed",

          module:
            "facturesauto",

          title:
            "Facture recalculée",

          message:
            \`Paiement reçu : \${montantPaye}. Reste à payer : \${resteAPayer}.\`,

          severity:
            statutPaiement === "paye"
              ? "success"
              : "info",
        });
    }
},

// =====================================================
// AMARKHYS
// ENCAISSEMENT MIS A JOUR -> RECALCUL FACTURE
// =====================================================

{
  id:
    "amarkhys-encaissement-updated-recompute-facture",

  module:
    "encaissementsauto",

  event:
    "encaissementsauto.updated",

  condition:
    (payload) =>
      Boolean(
        payload.factureId
      ),

  action:
    async (payload) => {
      const facturesModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "facturesauto"
        );

      const encaissementsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "encaissementsauto"
        );

      if (
        !facturesModule ||
        !encaissementsModule
      ) {
        return;
      }

      const facture =
        await RuntimeDataBinding.detail(
          facturesModule,
          String(payload.factureId)
        );

      if (!facture) {
        return;
      }

      const encaissements =
        await RuntimeDataBinding.list(
          encaissementsModule
        );

      const encaissementsValides =
        encaissements.filter(
          (encaissement: any) =>
            String(encaissement.factureId) ===
              String(payload.factureId) &&
            encaissement.statut ===
              "valide"
        );

      const montantPaye =
        encaissementsValides.reduce(
          (total: number, encaissement: any) =>
            total +
            Number(
              encaissement.montant ?? 0
            ),
          0
        );

      const montantTTC =
        Number(
          facture.montantTTC ??
          facture.totalTTC ??
          facture.montantTotal ??
          facture.total ??
          0
        );

      const resteAPayer =
        Math.max(
          montantTTC - montantPaye,
          0
        );

      const statutPaiement =
        montantPaye <= 0
          ? "en_attente"
          : montantPaye < montantTTC
            ? "partiel"
            : "paye";

      await RuntimeDataBinding.update(
        facturesModule,
        String(payload.factureId),
        {
          montantPaye,
          resteAPayer,
          statutPaiement,
          dernierEncaissementAt:
            new Date().toISOString(),
        }
      );

      await RuntimeNotificationEngine
        .notify({
          type:
            "amarkhys.facture.recomputed",

          module:
            "facturesauto",

          title:
            "Facture recalculée",

          message:
            \`Encaissement mis à jour. Payé : \${montantPaye}. Reste : \${resteAPayer}.\`,

          severity:
            statutPaiement === "paye"
              ? "success"
              : "info",
        });
    }
},
`;

  content = content.replace(
    "\n];",
    rule + "\n];"
  );

  write(relativePath, content);
}

patchFacturesModule();
patchEncaissementsModule();
patchBusinessRules();

console.log("");
console.log("Invoice payment recompute installed.");
console.log("Done.");
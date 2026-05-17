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
    .split("Ã©").join("é")
    .split("Ã¨").join("è")
    .split("Ã ").join("à")
    .split("Ã€").join("À")
    .split("Ã‰").join("É")
    .split("Ã´").join("ô")
    .split("Ãª").join("ê")
    .split("Ã§").join("ç")
    .split("â†’").join("→")
    .split("â€¢").join("•");
}

function patchBusinessRules() {
  const relativePath =
    "src/runtime/business-rules/runtimeBusinessRules.ts";

  let content =
    read(relativePath);

  content =
    fixEncoding(content);

  if (content.includes("amarkhys-echeance-overdue-reminder")) {
    write(relativePath, content);
    return;
  }

  const rule = `

// =====================================================
// AMARKHYS
// ECHEANCE EN RETARD -> RAPPEL FACTURE IMPAYEE
// =====================================================

{
  id:
    "amarkhys-echeance-overdue-reminder",

  module:
    "echeancespaiementauto",

  event:
    "echeancespaiementauto.created",

  condition:
    (payload) => {
      if (
        !payload.factureId ||
        !payload.dateEcheance
      ) {
        return false;
      }

      if (
        payload.statut === "payee" ||
        payload.statut === "annulee"
      ) {
        return false;
      }

      const today =
        new Date();

      today.setHours(
        0,
        0,
        0,
        0
      );

      const dateEcheance =
        new Date(
          String(payload.dateEcheance)
        );

      dateEcheance.setHours(
        0,
        0,
        0,
        0
      );

      return dateEcheance.getTime() <= today.getTime();
    },

  action:
    async (payload) => {
      const rappelsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "rappelsauto"
        );

      const echeancesModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "echeancespaiementauto"
        );

      if (
        !rappelsModule ||
        !echeancesModule
      ) {
        return;
      }

      const montantPrevu =
        Number(
          payload.montantPrevu ?? 0
        );

      const montantPaye =
        Number(
          payload.montantPaye ?? 0
        );

      const reste =
        Math.max(
          montantPrevu - montantPaye,
          0
        );

      await RuntimeDataBinding.create(
        rappelsModule,
        {
          clientId:
            payload.clientId,

          vehiculeId:
            payload.vehiculeId,

          typeRappel:
            "facture_impayee",

          dateRappel:
            new Date()
              .toISOString()
              .split("T")[0],

          canal:
            payload.canalRelance ??
            "whatsapp",

          statut:
            "planifie",

          message:
            \`Échéance de paiement en retard. Facture : \${payload.factureId}. Reste attendu : \${reste} FCFA.\`,
        }
      );

      if (payload.id) {
        await RuntimeDataBinding.update(
          echeancesModule,
          String(payload.id),
          {
            statut:
              "en_retard",

            dernierRappelAt:
              new Date()
                .toISOString()
                .split("T")[0],
          }
        );
      }

      await RuntimeNotificationEngine.notify({
        type:
          "amarkhys.echeance.overdue",

        module:
          "echeancespaiementauto",

        title:
          "Échéance en retard",

        message:
          \`Une relance a été créée pour une échéance de \${reste} FCFA.\`,

        severity:
          "warning",
      });
    }
},

// =====================================================
// AMARKHYS
// ECHEANCE MISE A JOUR -> RAPPEL SI RETARD
// =====================================================

{
  id:
    "amarkhys-echeance-updated-overdue-reminder",

  module:
    "echeancespaiementauto",

  event:
    "echeancespaiementauto.updated",

  condition:
    (payload) => {
      if (
        !payload.factureId ||
        !payload.dateEcheance
      ) {
        return false;
      }

      if (
        payload.statut === "payee" ||
        payload.statut === "annulee" ||
        payload.statut === "en_retard"
      ) {
        return false;
      }

      const today =
        new Date();

      today.setHours(
        0,
        0,
        0,
        0
      );

      const dateEcheance =
        new Date(
          String(payload.dateEcheance)
        );

      dateEcheance.setHours(
        0,
        0,
        0,
        0
      );

      return dateEcheance.getTime() <= today.getTime();
    },

  action:
    async (payload) => {
      const rappelsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "rappelsauto"
        );

      const echeancesModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "echeancespaiementauto"
        );

      if (
        !rappelsModule ||
        !echeancesModule
      ) {
        return;
      }

      const montantPrevu =
        Number(
          payload.montantPrevu ?? 0
        );

      const montantPaye =
        Number(
          payload.montantPaye ?? 0
        );

      const reste =
        Math.max(
          montantPrevu - montantPaye,
          0
        );

      await RuntimeDataBinding.create(
        rappelsModule,
        {
          clientId:
            payload.clientId,

          vehiculeId:
            payload.vehiculeId,

          typeRappel:
            "facture_impayee",

          dateRappel:
            new Date()
              .toISOString()
              .split("T")[0],

          canal:
            payload.canalRelance ??
            "whatsapp",

          statut:
            "planifie",

          message:
            \`Échéance de paiement en retard. Facture : \${payload.factureId}. Reste attendu : \${reste} FCFA.\`,
        }
      );

      if (payload.id) {
        await RuntimeDataBinding.update(
          echeancesModule,
          String(payload.id),
          {
            statut:
              "en_retard",

            dernierRappelAt:
              new Date()
                .toISOString()
                .split("T")[0],
          }
        );
      }

      await RuntimeNotificationEngine.notify({
        type:
          "amarkhys.echeance.overdue",

        module:
          "echeancespaiementauto",

        title:
          "Échéance en retard",

        message:
          \`Une relance a été créée pour une échéance de \${reste} FCFA.\`,

        severity:
          "warning",
      });
    }
},
`;

  content =
    content.replace(
      "\n];",
      rule + "\n];"
    );

  write(relativePath, content);
}

function patchRappelsModuleEncoding() {
  const relativePath =
    "src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts";

  if (!fs.existsSync(file(relativePath))) {
    return;
  }

  write(
    relativePath,
    fixEncoding(read(relativePath))
  );
}

function patchEcheancesModuleEncoding() {
  const relativePath =
    "src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts";

  if (!fs.existsSync(file(relativePath))) {
    return;
  }

  write(
    relativePath,
    fixEncoding(read(relativePath))
  );
}

patchBusinessRules();
patchRappelsModuleEncoding();
patchEcheancesModuleEncoding();

console.log("");
console.log("Overdue payment schedule reminders installed.");
console.log("Done.");
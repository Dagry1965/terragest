import {
  registerModuleHooks,
} from "@/core/hooks/erp-hooks";

registerModuleHooks(
  "materiels",
  {
    afterUpdate: [
      async (context) => {
        const etat =
          context.data?.etat;

        if (etat === "panne") {
          console.log(
            "HOOK ERP : matériel en panne"
          );

          console.log(
            "SUPERVISION CRITICAL EVENT"
          );

          console.log(
            "WORKFLOW MAINTENANCE START"
          );
        }
      },
    ],
  }
);

registerModuleHooks(
  "stocks",
  {
    afterCreate: [
      async (context) => {
        const quantite =
          context.data?.quantite;

        if (
          typeof quantite === "number" &&
          quantite < 10
        ) {
          console.log(
            "HOOK ERP : stock faible"
          );

          console.log(
            "WORKFLOW REAPPROVISIONNEMENT"
          );
        }
      },
    ],
  }
);

registerModuleHooks(
  "contrats",
  {
    beforeUpdate: [
      async (context) => {
        console.log(
          "HOOK ERP : vérification expiration contrat"
        );
      },
    ],
  }
);

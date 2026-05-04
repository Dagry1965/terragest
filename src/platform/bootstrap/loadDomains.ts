// src/platform/bootstrap/loadDomains.ts

export async function loadDomains() {

  console.log(
    "[DOMAIN LOADER] loading domains"
  );

  const domainModules = [

    () =>
      import(
        "@/domains/paiement/rules/registerPaiementRules"
      ),

    () =>
      import(
        "@/domains/paiement/workflows/PaiementWorkflow"
      )
  ];

  for (const load of domainModules) {

    const module =
      await load();

    for (
      const exported of
      Object.values(module)
    ) {

      if (
        typeof exported
        === "function"
      ) {

        try {

          exported();

        } catch (error) {

          console.error(
            "[DOMAIN LOADER ERROR]",
            error
          );
        }
      }
    }
  }

  console.log(
    "[DOMAIN LOADER] completed"
  );
}

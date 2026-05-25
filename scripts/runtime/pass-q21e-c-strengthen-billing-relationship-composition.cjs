const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q21e-c-billing-relationship-composition";

function file(pathname) {
  return path.join(ROOT, pathname);
}

function read(pathname) {
  return fs.readFileSync(file(pathname), "utf8");
}

function write(pathname, content) {
  fs.writeFileSync(file(pathname), content, "utf8");
  console.log(`[WRITTEN] ${pathname}`);
}

function backup(pathname) {
  const src = file(pathname);
  const dest = file(`${pathname}.bak-${TAG}`);

  if (!fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
    console.log(`[BACKUP] ${pathname}.bak-${TAG}`);
  }
}

function findCompositionBounds(content) {
  const marker = "\n  composition: {";
  const start = content.indexOf(marker);

  if (start === -1) {
    return null;
  }

  let index = start + marker.length;
  let depth = 1;

  while (index < content.length) {
    const char = content[index];

    if (char === "{") depth += 1;

    if (char === "}") {
      depth -= 1;

      if (depth === 0) {
        let end = index + 1;

        while (content[end] && /\s/.test(content[end])) {
          end += 1;
        }

        if (content[end] === ",") {
          end += 1;
        }

        return { start, end };
      }
    }

    index += 1;
  }

  throw new Error("[MISSING] composition closing brace");
}

function replaceComposition(content, moduleName, newComposition) {
  const bounds = findCompositionBounds(content);

  if (!bounds) {
    const workflowsIndex = content.search(/\n\s*workflows\s*:\s*\[/);

    if (workflowsIndex !== -1) {
      return (
        content.slice(0, workflowsIndex) +
        "\n" +
        newComposition +
        "\n" +
        content.slice(workflowsIndex)
      );
    }

    const endMatch = content.match(/\n};\s*$/);

    if (!endMatch || endMatch.index === undefined) {
      throw new Error(`[MISSING] ${moduleName} composition insertion point`);
    }

    return (
      content.slice(0, endMatch.index) +
      ",\n\n" +
      newComposition +
      content.slice(endMatch.index)
    );
  }

  return (
    content.slice(0, bounds.start) +
    "\n" +
    newComposition +
    content.slice(bounds.end)
  );
}

const factures =
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts";

const encaissements =
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts";

const echeances =
  "src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts";

[factures, encaissements, echeances].forEach(backup);

const facturesComposition = `  composition: {
    // Q21E_C_BILLING_RELATIONSHIP_COMPOSITION
    // Facture knows its payments and payment schedules.
    labelFields: ["numeroFacture", "clientId", "montantTTC", "resteAPayer", "statutPaiement"],

    contextBanner: {
      title: "Contexte facture",
      items: [
        {
          relationField: "clientId",
          moduleKey: "clientsauto",
          labelFields: [
            "prenom",
            "nom",
            "telephone",
          ],
          tone: "client",
        },
        {
          relationField: "vehiculeId",
          moduleKey: "vehicules",
          labelFields: [
            "marque",
            "modele",
            "immatriculation",
          ],
          tone: "vehicle",
        },
        {
          relationField: "interventionId",
          moduleKey: "interventionsauto",
          labelFields: [
            "typeIntervention",
            "dateIntervention",
            "statut",
          ],
          tone: "workshop",
        },
      ],
    },

    lockedFields: [
      "numeroFacture",
      "clientId",
      "vehiculeId",
      "interventionId",
    ],

    readOnlyFields: [
      "statutPaiement",
      "montantTTC",
      "montantPaye",
      "resteAPayer",
      "dernierEnvoiFactureAt",
      "canalDernierEnvoiFacture",
      "destinataireDernierEnvoiFacture",
      "nombreEnvoisFacture",
    ],

    children: [
      {
        key: "encaissements-facture",
        moduleKey: "encaissementsauto",
        foreignKey: "factureId",
        title: "Encaissements",
        description: "Paiements enregistrés pour cette facture.",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        createLabel: "Ajouter un encaissement",
        labelFields: ["numeroRecu", "montant", "datePaiement", "statut"],
        subtitleFields: ["clientId", "vehiculeId", "modePaiement", "referenceTransaction"],
        totalField: "montant",
        prefillFromParent: {
          clientId: "clientId",
          vehiculeId: "vehiculeId",
        },
        lockFields: ["factureId", "clientId", "vehiculeId"],
        relations: [
          {
            field: "clientId",
            moduleKey: "clientsauto",
            labelFields: ["prenom", "nom", "telephone"],
          },
          {
            field: "vehiculeId",
            moduleKey: "vehicules",
            labelFields: ["marque", "modele", "immatriculation"],
          },
        ],
      },
      {
        key: "echeances-facture",
        moduleKey: "echeancespaiementauto",
        foreignKey: "factureId",
        title: "Échéances de paiement",
        description: "Plan de paiement et relances liées à cette facture.",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        createLabel: "Ajouter une échéance",
        labelFields: ["montantPrevu", "montantPaye", "dateEcheance", "statut"],
        subtitleFields: ["clientId", "vehiculeId", "canalRelance"],
        totalField: "montantPrevu",
        prefillFromParent: {
          clientId: "clientId",
          vehiculeId: "vehiculeId",
        },
        lockFields: ["factureId", "clientId", "vehiculeId"],
        relations: [
          {
            field: "clientId",
            moduleKey: "clientsauto",
            labelFields: ["prenom", "nom", "telephone"],
          },
          {
            field: "vehiculeId",
            moduleKey: "vehicules",
            labelFields: ["marque", "modele", "immatriculation"],
          },
        ],
      },
    ],
  },`;

const encaissementsComposition = `  composition: {
    // Q21E_C_PAYMENT_RELATIONSHIP_COMPOSITION
    // Encaissement belongs to a facture and inherits invoice context.
    requiresParentContext: true,
    allowedParents: [
      {
        moduleKey: "facturesauto",
        foreignKey: "factureId",
      },
    ],
    lockedFields: ["factureId", "clientId", "vehiculeId"],
    labelFields: ["factureId", "numeroRecu", "montant", "datePaiement", "statut"],

    contextBanner: {
      title: "Contexte encaissement",
      items: [
        {
          relationField: "factureId",
          moduleKey: "facturesauto",
          labelFields: [
            "numeroFacture",
            "statutPaiement",
            "resteAPayer",
          ],
          tone: "invoice",
        },
        {
          relationField: "clientId",
          moduleKey: "clientsauto",
          labelFields: [
            "prenom",
            "nom",
            "telephone",
          ],
          tone: "client",
        },
        {
          relationField: "vehiculeId",
          moduleKey: "vehicules",
          labelFields: [
            "marque",
            "modele",
            "immatriculation",
          ],
          tone: "vehicle",
        },
      ],
    },

    readOnlyFields: [
      "numeroRecu",
      "statutEnvoiRecu",
      "dernierEnvoiRecuAt",
      "canalDernierEnvoiRecu",
      "destinataireDernierEnvoiRecu",
      "nombreEnvoisRecu",
    ],
  },`;

const echeancesComposition = `  composition: {
    // Q21E_C_PAYMENT_SCHEDULE_RELATIONSHIP_COMPOSITION
    // Échéance belongs to a facture and inherits invoice context.
    requiresParentContext: true,
    allowedParents: [
      {
        moduleKey: "facturesauto",
        foreignKey: "factureId",
      },
    ],
    lockedFields: ["factureId", "clientId", "vehiculeId"],
    labelFields: ["factureId", "montantPrevu", "montantPaye", "dateEcheance", "statut"],

    contextBanner: {
      title: "Contexte échéance",
      items: [
        {
          relationField: "factureId",
          moduleKey: "facturesauto",
          labelFields: [
            "numeroFacture",
            "statutPaiement",
            "resteAPayer",
          ],
          tone: "invoice",
        },
        {
          relationField: "clientId",
          moduleKey: "clientsauto",
          labelFields: [
            "prenom",
            "nom",
            "telephone",
          ],
          tone: "client",
        },
        {
          relationField: "vehiculeId",
          moduleKey: "vehicules",
          labelFields: [
            "marque",
            "modele",
            "immatriculation",
          ],
          tone: "vehicle",
        },
      ],
    },
  },`;

let facturesContent = read(factures);
let encaissementsContent = read(encaissements);
let echeancesContent = read(echeances);

facturesContent = replaceComposition(
  facturesContent,
  "facturesauto",
  facturesComposition
);

encaissementsContent = replaceComposition(
  encaissementsContent,
  "encaissementsauto",
  encaissementsComposition
);

echeancesContent = replaceComposition(
  echeancesContent,
  "echeancespaiementauto",
  echeancesComposition
);

write(factures, facturesContent);
write(encaissements, encaissementsContent);
write(echeances, echeancesContent);

console.log("");
console.log("[Q21E_C_DONE] Billing relationship composition metadata strengthened.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\scripts\\runtime\\audit-q21e-runtime-relationship-process-map.cjs");
console.log("");
console.log("Functional checks:");
console.log("  - facture detail/edit: encaissements panel");
console.log("  - facture detail/edit: echeances panel");
console.log("  - create encaissement from facture: parent context locked");
console.log("  - create echeance from facture: parent context locked");
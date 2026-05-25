const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q21e-d-customer-vehicle-workshop-composition";

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

function findPropertyObjectBounds(content, propertyName) {
  const marker = `\n  ${propertyName}: {`;
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

  throw new Error(`[MISSING] ${propertyName} closing brace`);
}

function replaceOrInsertComposition(content, moduleName, compositionBlock) {
  const bounds = findPropertyObjectBounds(content, "composition");

  if (bounds) {
    return (
      content.slice(0, bounds.start) +
      "\n" +
      compositionBlock +
      content.slice(bounds.end)
    );
  }

  const workflowsIndex = content.search(/\n\s*workflows\s*:\s*\[/);

  if (workflowsIndex !== -1) {
    return (
      content.slice(0, workflowsIndex) +
      "\n" +
      compositionBlock +
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
    compositionBlock +
    content.slice(endMatch.index)
  );
}

function findChildrenArrayBoundsInComposition(content) {
  const composition = findPropertyObjectBounds(content, "composition");

  if (!composition) {
    return null;
  }

  const compositionText = content.slice(composition.start, composition.end);
  const childrenMatch = compositionText.match(/\n\s*children\s*:\s*\[/);

  if (!childrenMatch || childrenMatch.index === undefined) {
    return null;
  }

  const start = composition.start + childrenMatch.index;
  const bracketStart = content.indexOf("[", start);

  let index = bracketStart + 1;
  let depth = 1;

  while (index < content.length) {
    const char = content[index];

    if (char === "[") depth += 1;

    if (char === "]") {
      depth -= 1;

      if (depth === 0) {
        return {
          start,
          bracketStart,
          bracketEnd: index,
          end: index + 1,
        };
      }
    }

    index += 1;
  }

  throw new Error("[MISSING] children closing bracket");
}

function insertChildrenIntoExistingArray(content, moduleName, childrenBlock, marker) {
  if (content.includes(marker)) {
    console.log(`[SKIP] ${moduleName} already contains ${marker}`);
    return content;
  }

  const bounds = findChildrenArrayBoundsInComposition(content);

  if (!bounds) {
    throw new Error(`[MISSING] ${moduleName} composition.children`);
  }

  return (
    content.slice(0, bounds.bracketEnd) +
    childrenBlock +
    content.slice(bounds.bracketEnd)
  );
}

const clients =
  "src/runtime/modules/generated/clientsauto/clientsauto.module.ts";

const vehicules =
  "src/runtime/modules/generated/vehicules/vehicules.module.ts";

const rendezvous =
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts";

const interventions =
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts";

[clients, vehicules, rendezvous, interventions].forEach(backup);

/**
 * 1) clientsauto:
 * préserver l'enfant véhicules existant et ajouter RDV / interventions / factures / encaissements.
 */
let clientsContent = read(clients);

clientsContent = insertChildrenIntoExistingArray(
  clientsContent,
  "clientsauto",
`,
      // Q21E_D_CLIENT_RELATIONSHIP_CHILDREN
      {
        key: "rendezvous-client",
        moduleKey: "rendezvous",
        foreignKey: "clientId",
        title: "Rendez-vous du client",
        createLabel: "Ajouter un rendez-vous",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        prefillFromParent: {
          clientId: "id",
        },
        lockFields: ["clientId"],
        labelFields: ["dateRendezVous", "heureRendezVous", "typeService", "statut"],
        subtitleFields: ["vehiculeId", "motif"],
        relations: [
          {
            field: "vehiculeId",
            moduleKey: "vehicules",
            labelFields: ["marque", "modele", "immatriculation"],
          },
        ],
      },
      {
        key: "interventions-client",
        moduleKey: "interventionsauto",
        foreignKey: "clientId",
        title: "Interventions du client",
        createLabel: "Ajouter une intervention",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        prefillFromParent: {
          clientId: "id",
        },
        lockFields: ["clientId"],
        labelFields: ["dateIntervention", "typeIntervention", "statut"],
        subtitleFields: ["vehiculeId", "rendezVousId"],
        totalField: "coutTotal",
        relations: [
          {
            field: "vehiculeId",
            moduleKey: "vehicules",
            labelFields: ["marque", "modele", "immatriculation"],
          },
          {
            field: "rendezVousId",
            moduleKey: "rendezvous",
            labelFields: ["dateRendezVous", "heureRendezVous", "typeService", "statut"],
          },
        ],
      },
      {
        key: "factures-client",
        moduleKey: "facturesauto",
        foreignKey: "clientId",
        title: "Factures du client",
        createLabel: "Ajouter une facture",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        prefillFromParent: {
          clientId: "id",
        },
        lockFields: ["clientId"],
        labelFields: ["numeroFacture", "montantTTC", "resteAPayer", "statutPaiement"],
        subtitleFields: ["vehiculeId", "interventionId", "dateFacture"],
        totalField: "montantTTC",
        relations: [
          {
            field: "vehiculeId",
            moduleKey: "vehicules",
            labelFields: ["marque", "modele", "immatriculation"],
          },
          {
            field: "interventionId",
            moduleKey: "interventionsauto",
            labelFields: ["dateIntervention", "typeIntervention", "statut"],
          },
        ],
      },
      {
        key: "encaissements-client",
        moduleKey: "encaissementsauto",
        foreignKey: "clientId",
        title: "Encaissements du client",
        createLabel: "Ajouter un encaissement",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        prefillFromParent: {
          clientId: "id",
        },
        lockFields: ["clientId"],
        labelFields: ["numeroRecu", "montant", "datePaiement", "statut"],
        subtitleFields: ["factureId", "vehiculeId", "modePaiement"],
        totalField: "montant",
        relations: [
          {
            field: "factureId",
            moduleKey: "facturesauto",
            labelFields: ["numeroFacture", "montantTTC", "resteAPayer", "statutPaiement"],
          },
          {
            field: "vehiculeId",
            moduleKey: "vehicules",
            labelFields: ["marque", "modele", "immatriculation"],
          },
        ],
      }`,
  "Q21E_D_CLIENT_RELATIONSHIP_CHILDREN"
);

write(clients, clientsContent);

/**
 * 2) vehicules:
 * préserver RDV/interventions existants et ajouter factures véhicule.
 */
let vehiculesContent = read(vehicules);

vehiculesContent = insertChildrenIntoExistingArray(
  vehiculesContent,
  "vehicules",
`,
      // Q21E_D_VEHICLE_BILLING_CHILDREN
      {
        key: "factures-vehicule",
        moduleKey: "facturesauto",
        foreignKey: "vehiculeId",
        title: "Factures du véhicule",
        createLabel: "Ajouter une facture",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        prefillFromParent: {
          vehiculeId: "id",
          clientId: "clientId",
        },
        lockFields: ["clientId", "vehiculeId"],
        labelFields: ["numeroFacture", "montantTTC", "resteAPayer", "statutPaiement"],
        subtitleFields: ["clientId", "interventionId", "dateFacture"],
        totalField: "montantTTC",
        relations: [
          {
            field: "clientId",
            moduleKey: "clientsauto",
            labelFields: ["prenom", "nom", "telephone"],
          },
          {
            field: "interventionId",
            moduleKey: "interventionsauto",
            labelFields: ["dateIntervention", "typeIntervention", "statut"],
          },
        ],
      }`,
  "Q21E_D_VEHICLE_BILLING_CHILDREN"
);

write(vehicules, vehiculesContent);

/**
 * 3) rendezvous:
 * ajouter une vraie composition metadata-driven.
 * Le RDV connaît son intervention générée.
 */
let rendezvousContent = read(rendezvous);

const rendezvousComposition = `  composition: {
    // Q21E_D_APPOINTMENT_RELATIONSHIP_COMPOSITION
    // Rendez-vous knows its client, vehicle and generated intervention.
    labelFields: ["clientId", "vehiculeId", "dateRendezVous", "heureRendezVous", "typeService", "statut"],

    contextBanner: {
      title: "Contexte rendez-vous",
      items: [
        {
          relationField: "clientId",
          moduleKey: "clientsauto",
          labelFields: ["prenom", "nom", "telephone"],
          tone: "client",
        },
        {
          relationField: "vehiculeId",
          moduleKey: "vehicules",
          labelFields: ["marque", "modele", "immatriculation"],
          tone: "vehicle",
        },
      ],
    },

    children: [
      {
        key: "interventions-rendezvous",
        moduleKey: "interventionsauto",
        foreignKey: "rendezVousId",
        title: "Intervention générée",
        description: "Intervention créée ou liée à ce rendez-vous.",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        createLabel: "Créer une intervention",
        prefillFromParent: {
          rendezVousId: "id",
          clientId: "clientId",
          vehiculeId: "vehiculeId",
        },
        lockFields: ["rendezVousId", "clientId", "vehiculeId"],
        labelFields: ["dateIntervention", "typeIntervention", "statut"],
        subtitleFields: ["clientId", "vehiculeId", "coutTotal"],
        totalField: "coutTotal",
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

rendezvousContent = replaceOrInsertComposition(
  rendezvousContent,
  "rendezvous",
  rendezvousComposition
);

write(rendezvous, rendezvousContent);

/**
 * 4) interventionsauto:
 * préserver composition existante et ajouter factures liées à l'intervention.
 */
let interventionsContent = read(interventions);

interventionsContent = insertChildrenIntoExistingArray(
  interventionsContent,
  "interventionsauto",
`,
      // Q21E_D_INTERVENTION_BILLING_CHILDREN
      {
        key: "factures-intervention",
        moduleKey: "facturesauto",
        foreignKey: "interventionId",
        title: "Factures de l'intervention",
        createLabel: "Ajouter une facture",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        prefillFromParent: {
          interventionId: "id",
          clientId: "clientId",
          vehiculeId: "vehiculeId",
        },
        lockFields: ["interventionId", "clientId", "vehiculeId"],
        labelFields: ["numeroFacture", "montantTTC", "resteAPayer", "statutPaiement"],
        subtitleFields: ["clientId", "vehiculeId", "dateFacture"],
        totalField: "montantTTC",
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
      }`,
  "Q21E_D_INTERVENTION_BILLING_CHILDREN"
);

write(interventions, interventionsContent);

console.log("");
console.log("[Q21E_D_DONE] Customer / vehicle / appointment / intervention relationship composition strengthened.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\scripts\\runtime\\audit-q21e-runtime-relationship-process-map.cjs");
console.log("");
console.log("Functional checks:");
console.log("  - client detail/edit: vehicles, appointments, interventions, invoices, payments");
console.log("  - vehicle detail/edit: appointments, interventions, invoices");
console.log("  - rendezvous detail/edit: generated intervention");
console.log("  - intervention detail/edit: lines and invoices");
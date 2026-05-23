const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function backup(rel, suffix) {
  const source = p(rel);
  const target = source + suffix;

  if (fs.existsSync(source) && !fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[BACKUP]", rel + suffix);
  }
}

function write(rel, content) {
  fs.writeFileSync(p(rel), content, "utf8");
  console.log("[WRITTEN]", rel);
}

function addContextBanner(rel, banner) {
  const full = p(rel);

  if (!fs.existsSync(full)) {
    console.log("[SKIP missing]", rel);
    return;
  }

  backup(rel, ".bak-q20f-b-context-banner");

  let content = fs.readFileSync(full, "utf8");

  if (content.includes("contextBanner:")) {
    console.log("[SKIP already has contextBanner]", rel);
    return;
  }

  const marker = "  composition: {";

  if (!content.includes(marker)) {
    console.log("[SKIP no composition]", rel);
    return;
  }

  content = content.replace(
    marker,
    marker + "\n" + banner + "\n"
  );

  write(rel, content);
}

addContextBanner(
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  `    contextBanner: {
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
    },`
);

addContextBanner(
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
  `    contextBanner: {
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
    },`
);

addContextBanner(
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  `    contextBanner: {
      title: "Contexte intervention",
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
          relationField: "rendezVousId",
          moduleKey: "rendezvous",
          labelFields: [
            "dateRendezVous",
            "heureRendezVous",
            "typeService",
            "statut",
          ],
          tone: "workshop",
        },
      ],
    },`
);

addContextBanner(
  "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  `    contextBanner: {
      title: "Contexte ligne intervention",
      items: [
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
        {
          relationField: "produitId",
          moduleKey: "produitsauto",
          labelFields: [
            "reference",
            "nom",
            "categorie",
          ],
          tone: "product",
        },
        {
          relationField: "stockId",
          moduleKey: "stocksauto",
          labelFields: [
            "produitNom",
            "quantite",
            "seuilMinimum",
          ],
          tone: "stock",
        },
      ],
    },`
);

addContextBanner(
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  `    contextBanner: {
      title: "Contexte rendez-vous",
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
      ],
    },`
);

addContextBanner(
  "src/runtime/modules/generated/vehicules/vehicules.module.ts",
  `    contextBanner: {
      title: "Contexte véhicule",
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
      ],
    },`
);

console.log("");
console.log("[Q20F_B_DONE] AMARKHYS contextBanner metadata added.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
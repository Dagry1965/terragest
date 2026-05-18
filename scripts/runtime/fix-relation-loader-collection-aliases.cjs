const fs = require("fs");
const path = require("path");

const root = process.cwd();

function writeFile(filePath, content) {
  const absolutePath = path.join(root, filePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content, "utf8");
  console.log("WRITTEN", filePath);
}

writeFile(
  "src/runtime/modules/lifecycle/ERPRelationDataLoader.ts",
`import type {
  ERPModule,
} from "@/runtime/modules/ERPModule";

import { RuntimeDataBinding } from "@/runtime/data-binding";
import { resolveDashboardModule } from "@/runtime/dashboard/generic/ERPDashboardModuleResolver";

import { allERPModules } from "../definitions/coreModules";

const relationCollectionAliases: Record<string, string[]> = {
  clientsauto: [
    "clientsauto",
    "clients",
    "utilisateurs",
  ],
  vehicules: [
    "vehicules",
    "vehiculesauto",
  ],
  facturesauto: [
    "facturesauto",
    "factures",
  ],
  interventionsauto: [
    "interventionsauto",
    "interventions",
  ],
  rendezvous: [
    "rendezvous",
    "rdv",
  ],
  echeancespaiementauto: [
    "echeancespaiementauto",
    "echeances",
  ],
  encaissementsauto: [
    "encaissementsauto",
    "paiements",
  ],
};

function cloneModuleWithCollection(
  module: ERPModule,
  collection: string
): ERPModule {
  return {
    ...module,
    schema: {
      ...module.schema,
      collection,
    },
  };
}

export class ERPRelationDataLoader {
  static resolveModule(moduleKey: string) {
    return (
      resolveDashboardModule(moduleKey) ??
      allERPModules.find(
        (item) => item.metadata.key === moduleKey
      ) ??
      null
    );
  }

  static resolveModuleCandidates(moduleKey: string): ERPModule[] {
    const module =
      ERPRelationDataLoader.resolveModule(moduleKey);

    if (!module) {
      return [];
    }

    const aliases =
      relationCollectionAliases[moduleKey] ??
      [module.schema.collection];

    const collections =
      Array.from(
        new Set([
          module.schema.collection,
          ...aliases,
        ].filter(Boolean))
      );

    return collections.map((collection) =>
      cloneModuleWithCollection(module, collection)
    );
  }

  static async load(moduleKey: string) {
    const modules =
      ERPRelationDataLoader.resolveModuleCandidates(moduleKey);

    if (modules.length === 0) {
      return [];
    }

    const merged = new Map<
      string,
      {
        id: string;
        label: string;
        record: Record<string, unknown>;
      }
    >();

    for (const module of modules) {
      try {
        const records =
          await RuntimeDataBinding.list(module);

        for (const record of records) {
          const id =
            String(record.id ?? "").trim();

          if (!id || merged.has(id)) {
            continue;
          }

          merged.set(id, {
            id,
            label: ERPRelationDataLoader.getLabel(
              record as Record<string, unknown>
            ),
            record: record as Record<string, unknown>,
          });
        }
      } catch {
        // Ignore missing or unauthorized alias collections.
      }
    }

    return Array.from(merged.values());
  }

  static async resolveLabel(
    moduleKey: string,
    id: string
  ): Promise<string> {
    const relationId =
      String(id ?? "").trim();

    if (!moduleKey || !relationId) {
      return "";
    }

    const modules =
      ERPRelationDataLoader.resolveModuleCandidates(moduleKey);

    if (modules.length === 0) {
      return "";
    }

    for (const module of modules) {
      try {
        const record =
          await RuntimeDataBinding.detail(
            module,
            relationId
          );

        if (!record) {
          continue;
        }

        const label =
          ERPRelationDataLoader.getLabel(
            record as Record<string, unknown>
          );

        if (label && label !== relationId) {
          return label;
        }
      } catch {
        // Try next alias collection.
      }
    }

    for (const module of modules) {
      try {
        const records =
          await RuntimeDataBinding.list(module);

        const record =
          records.find((item) =>
            String(item.id ?? item._id ?? "") === relationId
          );

        if (!record) {
          continue;
        }

        const label =
          ERPRelationDataLoader.getLabel(
            record as Record<string, unknown>
          );

        if (label && label !== relationId) {
          return label;
        }
      } catch {
        // Try next alias collection.
      }
    }

    return relationId;
  }

  static getLabel(
    record: Record<string, unknown>
  ): string {
    const value = (key: string) =>
      String(record[key] ?? "").trim();

    const compact = (...parts: string[]) =>
      parts
        .filter((part) => Boolean(part && part.trim()))
        .join(" · ")
        .trim();

    const money = (key: string) => {
      const raw =
        record[key];

      if (
        raw === null ||
        raw === undefined ||
        raw === ""
      ) {
        return "";
      }

      const amount =
        Number(raw);

      if (Number.isNaN(amount)) {
        return String(raw);
      }

      return amount.toLocaleString("fr-FR") + " FCFA";
    };

    const id = value("id");

    const numeroFacture =
      value("numeroFacture");

    const referenceTransaction =
      value("referenceTransaction");

    const referencePaiement =
      value("referencePaiement");

    const reference =
      value("reference");

    const numero =
      value("numero");

    const montant =
      money("montant");

    const montantTTC =
      money("montantTTC");

    const resteAPayer =
      money("resteAPayer");

    const factureNumber =
      numeroFacture ||
      referenceTransaction ||
      referencePaiement ||
      reference ||
      numero;

    if (factureNumber) {
      const amount =
        montant ||
        montantTTC ||
        resteAPayer;

      return compact(
        factureNumber,
        amount
      );
    }

    const marque =
      value("marque");

    const modele =
      value("modele");

    const vehicule =
      value("vehicule");

    const immatriculation =
      value("immatriculation");

    const vehiculeLabel =
      compact(
        compact(marque || vehicule, modele),
        immatriculation
      );

    if (vehiculeLabel) {
      return vehiculeLabel;
    }

    const nom =
      value("nom");

    const prenom =
      value("prenom");

    const raisonSociale =
      value("raisonSociale");

    const displayName =
      value("displayName");

    const codeClient =
      value("codeClient");

    const personneLabel =
      compact(
        compact(prenom, nom),
        codeClient
      );

    if (personneLabel) {
      return personneLabel;
    }

    if (raisonSociale) {
      return compact(raisonSociale, codeClient);
    }

    if (displayName) {
      return displayName;
    }

    const typeIntervention =
      value("typeIntervention");

    const dateIntervention =
      value("dateIntervention");

    if (typeIntervention) {
      return compact(typeIntervention, dateIntervention);
    }

    const motif =
      value("motif");

    const dateRendezVous =
      value("dateRendezVous");

    if (motif) {
      return compact(motif, dateRendezVous);
    }

    const name =
      value("name");

    const label =
      value("label");

    const titre =
      value("titre");

    const libelle =
      value("libelle");

    if (name) {
      return name;
    }

    if (label) {
      return label;
    }

    if (libelle) {
      return libelle;
    }

    if (titre) {
      return titre;
    }

    const code =
      value("code");

    const typeContrat =
      value("typeContrat");

    const referenceLabel =
      compact(
        typeContrat,
        reference || numero
      );

    if (referenceLabel) {
      return referenceLabel;
    }

    if (code) {
      return code;
    }

    const commune =
      value("commune");

    const adresse =
      value("adresse");

    const typeExploitation =
      value("typeExploitation");

    const localisationLabel =
      compact(
        commune,
        adresse
      );

    if (localisationLabel) {
      return localisationLabel;
    }

    if (typeExploitation) {
      return typeExploitation;
    }

    const designation =
      value("designation");

    const produit =
      value("produit");

    if (designation) {
      return designation;
    }

    if (produit) {
      return produit;
    }

    const telephone =
      value("telephone");

    const phone =
      value("phone");

    const email =
      value("email");

    if (telephone) {
      return telephone;
    }

    if (phone) {
      return phone;
    }

    if (email) {
      return email;
    }

    return id;
  }
}
`
);

console.log("OK: relation loader now supports AMARKHYS collection aliases.");
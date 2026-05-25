import type {
  ERPModule,
} from "@/runtime/modules/ERPModule";

import { RuntimeDataBinding } from "@/runtime/data-binding";
import { resolveDashboardModule } from "@/runtime/dashboard/generic/ERPDashboardModuleResolver";

import { allERPModules } from "../definitions/coreModules";

const relationCollectionAliases: Record<string, string[]> = {
  clientsauto: [
    "clientsauto",
  ],
  vehicules: [
    "vehicules",
    "vehiculesauto",
  ],
  produitsauto: [
    "produitsauto",
    "produits",
  ],
  stocksauto: [
    "stocksauto",
    "stocks",
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
              record as Record<string, unknown>,
              module.metadata.key
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
            record as Record<string, unknown>,
            module.metadata.key
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
            record as Record<string, unknown>,
            module.metadata.key
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
    record: Record<string, unknown>,
    moduleKey = ""
  ): string {
    const value = (key: string) =>
      String(record[key] ?? "").trim();

    const compact = (...parts: string[]) =>
      parts
        .filter((part) => Boolean(part && part.trim()))
        .join(" · ")
        .trim();

    const isTechnicalIdValue = (input: string) => {
      const text = String(input ?? "").trim();

      if (!text) {
        return false;
      }

      return /^[A-Za-z0-9_-]{16,}$/.test(text);
    };
const statusLabel = (input: string) => {
      const text = String(input ?? "").trim();

      const labels: Record<string, string> = {
        actif: "Actif",
        active: "Actif",
        prospect: "Prospect",
        inactif: "Inactif",
        inactive: "Inactif",
        archive: "Archivé",
        disponible: "Disponible",
        stock_faible: "Stock faible",
        rupture: "Rupture",
        ouvert: "Ouverte",
        ouverte: "Ouverte",
        diagnostic: "Diagnostic",
        en_cours: "En cours",
        terminee: "Terminée",
        terminée: "Terminée",
        facturee: "Facturée",
        facturée: "Facturée",
        brouillon: "Brouillon",
        validee: "Validée",
        validée: "Validée",
        annulee: "Annulée",
        annulée: "Annulée",
        piece: "Pièce",
        main_oeuvre: "Main d’œuvre",
        service: "Service",
        remise: "Remise",
        entree: "Entrée",
        sortie: "Sortie",
        correction: "Correction",
        atelier: "Atelier",
        magasin: "Magasin",
        depot: "Dépôt",
        reserve: "Réserve",
      };

      return labels[text] ?? text;
    };

    const dateLabel = (input: string) => {
      const text = String(input ?? "").trim();

      if (!text) {
        return "";
      }

      const date = new Date(text);

      if (Number.isNaN(date.getTime())) {
        return text;
      }

      return date.toLocaleDateString("fr-FR");
    };

    const numberLabel = (input: string) => {
      const text = String(input ?? "").trim();

      if (!text) {
        return "";
      }

      const number = Number(text);

      if (!Number.isFinite(number)) {
        return text;
      }

      return number.toLocaleString("fr-FR");
    };

    const normalizeTimeLabel = (input: string) => {
      const text = String(input ?? "").trim();

      if (!text) {
        return "";
      }

      const isoTime =
        text.match(/T(\d{1,2}):(\d{2})/);

      if (isoTime) {
        return isoTime[1].padStart(2, "0") + "h" + isoTime[2];
      }

      const colonTime =
        text.match(/^(\d{1,2}):(\d{2})/);

      if (colonTime) {
        return colonTime[1].padStart(2, "0") + "h" + colonTime[2];
      }

      const frenchTime =
        text.match(/^(\d{1,2})\s*h\s*(\d{0,2})$/i);

      if (frenchTime) {
        return (
          frenchTime[1].padStart(2, "0") +
          "h" +
          String(frenchTime[2] || "00").padStart(2, "0")
        );
      }

      const compactTime =
        text.match(/^(\d{1,2})(\d{2})$/);

      if (compactTime) {
        return compactTime[1].padStart(2, "0") + "h" + compactTime[2];
      }

      const date = new Date(text);

      if (!Number.isNaN(date.getTime())) {
        return (
          String(date.getHours()).padStart(2, "0") +
          "h" +
          String(date.getMinutes()).padStart(2, "0")
        );
      }

      return text;
    };

    const addMinutesToTimeLabel = (
      input: string,
      minutesToAdd: number
    ) => {
      const time =
        normalizeTimeLabel(input);

      const match =
        time.match(/^(\d{1,2})h(\d{2})$/);

      if (!match || !Number.isFinite(minutesToAdd)) {
        return "";
      }

      const date =
        new Date(2000, 0, 1, Number(match[1]), Number(match[2]), 0, 0);

      date.setMinutes(date.getMinutes() + minutesToAdd);

      return (
        String(date.getHours()).padStart(2, "0") +
        "h" +
        String(date.getMinutes()).padStart(2, "0")
      );
    };

    const rendezvousSlotLabel = () => {
      // Generic business-time label.
      // Never use startAt/endAt ISO for visible RDV labels because ISO is UTC-based.
      // Visible labels must come from local business fields:
      // heureRendezVous + durationMinutes.
      const start =
        normalizeTimeLabel(
          value("heureRendezVous") ||
          value("heureRdv") ||
          value("heure")
        );

      const duration =
        Number(
          value("durationMinutes") ||
          60
        );

      const end =
        addMinutesToTimeLabel(
          start,
          duration
        );

      if (start && end) {
        return start + " → " + end;
      }

      return start;


    // Q21X_C1_GENERIC_LABEL_FIELDS
    // Relation labels must be metadata-driven first.
    // Module-specific fallbacks remain temporary compatibility only.
    const getModuleDefinition = () =>
      allERPModules.find(
        (item) =>
          item.metadata.key === moduleKey ||
          item.schema?.collection === moduleKey
      );

    const fieldLabelValue = (fieldKey: string) => {
      const raw = record[fieldKey];

      if (raw === null || raw === undefined || raw === "") {
        return "";
      }

      const text = String(raw).trim();

      if (!text) {
        return "";
      }

      if (
        fieldKey.toLowerCase().includes("statut") ||
        fieldKey.toLowerCase().includes("status")
      ) {
        return statusLabel(text) || text;
      }

      if (
        fieldKey.toLowerCase().includes("montant") ||
        fieldKey.toLowerCase().includes("prix")
      ) {
        const amount = Number(raw);
        return Number.isFinite(amount)
          ? amount.toLocaleString("fr-FR") + " FCFA"
          : text;
      }

      return text;
    };

    const buildLabelFromMetadata = () => {
      const moduleDefinition = getModuleDefinition();

      const labelFields =
        (moduleDefinition?.composition as { labelFields?: string[] } | undefined)
          ?.labelFields ?? [];

      const metadataLabel = compact(
        ...labelFields.map((fieldKey) => fieldLabelValue(fieldKey))
      );

      if (metadataLabel) {
        return metadataLabel;
      }

      return "";
    };

    const metadataDrivenLabel = buildLabelFromMetadata();

    if (metadataDrivenLabel) {
      return metadataDrivenLabel;
    }

    
    };const money = (key: string) => {
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

    // GLOBAL_RELATION_LABEL_POLICY
    // Tous les champs relationnels runtime passent ici.
    // Objectif : afficher un libellé métier, jamais un ID technique si une donnée métier existe.
    const normalizedModuleKey = String(moduleKey ?? "").trim();

    if (normalizedModuleKey === "clientsauto") {
      const clientLabel = compact(
        compact(value("prenom"), value("nom")),
        value("codeClient") || value("telephone") || value("email")
      );

      if (clientLabel) {
        return clientLabel;
      }
    }

    if (
      normalizedModuleKey === "vehicules" ||
      normalizedModuleKey === "vehiculesauto"
    ) {
      const vehicleLabel = compact(
        compact(value("marque") || value("vehicule"), value("modele")),
        value("immatriculation")
      );

      if (vehicleLabel) {
        return vehicleLabel;
      }
    }

    if (normalizedModuleKey === "rendezvous") {
      const dateValue =
        value("dateRendezVous") ||
        value("dateRdv") ||
        value("date") ||
        value("dateIntervention");

      const rdvLabel = compact(
        "Rendez-vous",
        dateValue ? dateLabel(dateValue) : "",
        rendezvousSlotLabel()
      );

      if (rdvLabel) {
        return rdvLabel;
      }
    }

    if (normalizedModuleKey === "interventionsauto") {
      const interventionLabel = compact(
        statusLabel(value("typeIntervention")) || value("designation") || "Intervention",
        value("dateIntervention") ? dateLabel(value("dateIntervention")) : "",
        statusLabel(value("statut"))
      );

      if (interventionLabel) {
        return interventionLabel;
      }
    }

    if (normalizedModuleKey === "produitsauto") {
      const productLabel = compact(
        value("nom") || value("designation") || value("produit"),
        value("marque"),
        value("reference") ? "Réf. " + value("reference") : ""
      );

      if (productLabel) {
        return productLabel;
      }
    }

    // Q16C1E_PRODUITSAUTO_LABEL
    // Libellé métier pour produitsauto, utilisé notamment par parentProductId.
    // Exemple attendu : HUI-5W40 · Huile moteur 5W40
    if (normalizedModuleKey === "produitsauto") {
      const productLabel = compact(
        value("reference"),
        value("nom") ||
          value("designation") ||
          value("libelle") ||
          value("produit"),
        value("marque")
      );

      if (productLabel) {
        return productLabel;
      }
    }

    if (normalizedModuleKey === "stocksauto") {
      const stockLabel = compact(
        value("emplacement") || "Stock",
        statusLabel(value("typeStock")),
        value("quantite") ? numberLabel(value("quantite")) + " unité(s)" : ""
      );

      if (stockLabel) {
        return stockLabel;
      }
    }

    if (normalizedModuleKey === "facturesauto") {
      const invoiceLabel = compact(
        value("numeroFacture") || value("reference") || value("numero") || "Facture",
        money("montantTTC") || money("montant") || money("resteAPayer"),
        statusLabel(value("statutPaiement") || value("statut"))
      );

      if (invoiceLabel) {
        return invoiceLabel;
      }
    }

    if (normalizedModuleKey === "lignesinterventionauto") {
      const lineLabel = compact(
        value("designation") || statusLabel(value("typeLigne")) || "Ligne",
        money("montantTotal"),
        statusLabel(value("statut"))
      );

      if (lineLabel) {
        return lineLabel;
      }
    }

    if (normalizedModuleKey === "mouvementsstockauto") {
      const movementLabel = compact(
        statusLabel(value("typeMouvement")) || "Mouvement stock",
        value("quantite") ? numberLabel(value("quantite")) + " unité(s)" : "",
        value("dateMouvement") ? dateLabel(value("dateMouvement")) : ""
      );

      if (movementLabel) {
        return movementLabel;
      }
    }

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

    const productPrimaryLabel =
      value("nom") ||
      value("designation") ||
      value("produit");

    const productBrand =
      value("marque");

    if (productPrimaryLabel && (reference || productBrand)) {
      return compact(
        productPrimaryLabel,
        productBrand,
        reference ? "Réf. " + reference : ""
      );
    }

    const stockLocation =
      value("emplacement");

    const stockType =
      value("typeStock");

    const stockQuantity =
      value("quantite");

    if (stockLocation || stockType) {
      return compact(
        stockLocation,
        stockType,
        stockQuantity ? stockQuantity + " unité(s)" : ""
      );
    }

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

    if (id && !isTechnicalIdValue(id)) {
      return id;
    }

    if (id) {
      return "Enregistrement " + id.slice(0, 8);
    }

    return "Enregistrement";
  }
}

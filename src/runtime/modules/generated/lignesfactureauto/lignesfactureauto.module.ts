import type { ERPModule } from "@/runtime/modules/ERPModule";

export const lignesfactureautoModule: ERPModule = {
  metadata: {
    key: "lignesfactureauto",
    label: "Lignes facture",
    description:
      "Lignes financières facturées, sourcées depuis un parcours métier.",
    icon: "receipt-text",
    category: "amarkhys",

    features: {
      dashboard: true,
      analytics: true,
      workflows: true,
      automation: true,
      notifications: true,
      observability: true,
      audit: true,
      realtime: true,
    },
  },

  schema: {
    collection: "lignesfactureauto",

    fields: [
      {
        key: "factureId",
        label: "Facture",
        type: "relation",
        relation: {
          module: "facturesauto",
        },
        required: true,
        searchable: true,
        list: { visible: true, order: 1 },
        grid: { cols: 6 },
      },
      {
        key: "designation",
        label: "Désignation",
        type: "text",
        required: true,
        searchable: true,
        list: { visible: true, order: 2 },
        grid: { cols: 6 },
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        required: false,
        grid: { cols: 12 },
      },
      {
        key: "quantite",
        label: "Quantité",
        type: "number",
        required: true,
        defaultValue: 1,
        list: { visible: true, order: 3 },
        grid: { cols: 3 },
      },
      {
        key: "prixUnitaireHT",
        label: "Prix unitaire HT",
        type: "number",
        required: true,
        defaultValue: 0,
        list: { visible: true, order: 4 },
        grid: { cols: 3 },
      },
      {
        key: "montantHT",
        label: "Montant HT",
        type: "number",
        required: false,
        defaultValue: 0,
        list: { visible: true, order: 5 },
        grid: { cols: 3 },
      },
      {
        key: "tauxTVA",
        label: "Taux TVA",
        type: "number",
        required: false,
        defaultValue: 18,
        grid: { cols: 3 },
      },
      {
        key: "montantTVA",
        label: "Montant TVA",
        type: "number",
        required: false,
        defaultValue: 0,
        grid: { cols: 3 },
      },
      {
        key: "montantTTC",
        label: "Montant TTC",
        type: "number",
        required: false,
        defaultValue: 0,
        list: { visible: true, order: 6 },
        grid: { cols: 3 },
      },
      {
        key: "statutLigne",
        label: "Statut ligne",
        type: "select",
        required: true,
        defaultValue: "brouillon",
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Validée", value: "validee" },
          { label: "Annulée", value: "annulee" },
        ],
        list: { visible: true, order: 7 },
        grid: { cols: 3 },
      },
      {
        key: "sourceType",
        label: "Type de source",
        type: "select",
        required: false,
        options: [
          { label: "Atelier", value: "atelier" },
          { label: "Boutique", value: "boutique" },
          { label: "Commande", value: "commande" },
          { label: "Autre", value: "autre" },
        ],
        grid: { cols: 3 },
      },
      {
        key: "sourceModule",
        label: "Module source",
        type: "text",
        required: false,
        grid: { cols: 3 },
      },
      {
        key: "sourceRecordId",
        label: "Enregistrement source",
        type: "text",
        required: false,
        grid: { cols: 3 },
      },
      {
        key: "sourceLineId",
        label: "Ligne source",
        type: "text",
        required: false,
        grid: { cols: 3 },
      },
      {
        key: "clientId",
        label: "Client",
        type: "relation",
        relation: {
          module: "clientsauto",
        },
        searchable: true,
        grid: { cols: 4 },
      },
      {
        key: "vehiculeId",
        label: "Véhicule",
        type: "relation",
        relation: {
          module: "vehicules",
        },
        searchable: true,
        grid: { cols: 4 },
      },
      {
        key: "interventionId",
        label: "Intervention",
        type: "relation",
        relation: {
          module: "interventionsauto",
        },
        searchable: true,
        grid: { cols: 4 },
      },
      {
        key: "venteId",
        label: "Vente",
        type: "text",
        required: false,
        grid: { cols: 4 },
      },
      {
        key: "produitId",
        label: "Produit",
        type: "relation",
        relation: {
          module: "produitsauto",
        },
        searchable: true,
        grid: { cols: 4 },
      },
    ],
  },

  form: {
    layout: "tabs",
    tabs: [
      {
        key: "general",
        label: "Ligne facture",
        fields: [
          "factureId",
          "designation",
          "description",
          "statutLigne",
          "quantite",
          "prixUnitaireHT",
          "montantHT",
          "tauxTVA",
          "montantTVA",
          "montantTTC",
          "sourceType",
          "sourceModule",
          "sourceRecordId",
          "sourceLineId",
          "clientId",
          "vehiculeId",
          "interventionId",
          "venteId",
          "produitId",
        ],
        sections: [
          {
            key: "identite",
            title: "Identification",
            fields: [
              "factureId",
              "designation",
              "description",
              "statutLigne",
            ],
          },
          {
            key: "montants",
            title: "Montants",
            fields: [
              "quantite",
              "prixUnitaireHT",
              "montantHT",
              "tauxTVA",
              "montantTVA",
              "montantTTC",
            ],
          },
          {
            key: "origine",
            title: "Origine métier",
            fields: [
              "sourceType",
              "sourceModule",
              "sourceRecordId",
              "sourceLineId",
              "clientId",
              "vehiculeId",
              "interventionId",
              "venteId",
              "produitId",
            ],
          },
        ],
      },
    ],
  },

  composition: {
    labelFields: ["designation", "montantTTC", "statutLigne"],

    readOnlyFields: [
      "factureId",
      "clientId",
      "vehiculeId",
      "interventionId",
      "sourceModule",
      "sourceRecordId",
      "sourceLineId",
      "montantHT",
      "montantTVA",
      "montantTTC",
    ],

    lockedFields: [
      "factureId",
      "clientId",
      "vehiculeId",
      "interventionId",
      "sourceModule",
      "sourceRecordId",
      "sourceLineId",
      "montantHT",
      "montantTVA",
      "montantTTC",
    ],

    requiresParentContext: true,

    allowedParents: [
      {
        moduleKey: "facturesauto",
        foreignKey: "factureId",
      },
    ],

    relations: [
      {
        field: "factureId",
        moduleKey: "facturesauto",
        labelFields: ["numeroFacture", "dateFacture", "montantTTC"],
      },
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
      {
        field: "interventionId",
        moduleKey: "interventionsauto",
        labelFields: ["typeIntervention", "dateIntervention", "statut"],
      },
      {
        field: "produitId",
        moduleKey: "produitsauto",
        labelFields: ["code", "nom", "designation"],
      },
    ],
  },
};


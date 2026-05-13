import type { ERPModule } from "../../ERPModule";

export const terrainsModule: ERPModule = {
  metadata: {
    key: "terrains",
    label: "Terrains",
    description: "Référentiel des terrains, propriétaires, contrats fonciers et vocations.",
    icon: "map",
    category: "Métier",
    routes: {
      list: "/terrains",
      create: "/terrains/nouveau",
      details: "/terrains/[id]",
      edit: "/terrains/[id]/edit",
    },
  },

  schema: {
    collection: "terrains",
    fields: [
      {
        key: "nom",
        label: "Nom du terrain",
        type: "text",
        required: true,
        grid: { cols: 6 },
        ui: {
          placeholder: "Nom officiel du terrain",
          help: "Nom utilisé dans les documents fonciers.",
        },
      },

      {
        key: "proprietaireId",
        label: "Propriétaire",
        type: "relation",
        relation: { module: "utilisateurs" },
        required: true,
        grid: { cols: 6 },
        ui: {
          placeholder: "Sélectionner un propriétaire",
          help: "Le terrain doit toujours avoir un propriétaire.",
        },
      },

      {
        key: "localisation",
        label: "Localisation",
        type: "text",
        grid: { cols: 6 },
        ui: {
          placeholder: "Adresse ou zone géographique",
        },
      },

      {
        key: "statut",
        label: "Statut",
        type: "select",
        required: true,
        grid: { cols: 6 },
        ui: {
          placeholder: "Sélectionner un statut",
        },
        options: [
          { label: "Actif", value: "actif" },
          { label: "Inactif", value: "inactif" },
          { label: "En attente", value: "en_attente" },
        ],
      },

      // --- Surfaces ---
      {
        key: "surfaceTotale",
        label: "Surface totale",
        type: "number",
        grid: { cols: 6 },
        ui: {
          placeholder: "Surface totale en m²",
        },
      },
      {
        key: "surfaceDisponible",
        label: "Surface disponible",
        type: "number",
        grid: { cols: 6 },
        ui: {
          placeholder: "Surface disponible en m²",
          help: "Calculée automatiquement si un workflow est activé.",
        },
      },

      {
        key: "surfaceAgricole",
        label: "Surface agricole",
        type: "number",
        grid: { cols: 6 },
      },
      {
        key: "surfaceHabitation",
        label: "Surface habitation",
        type: "number",
        grid: { cols: 6 },
      },

      {
        key: "vocationTerrain",
        label: "Vocation du terrain",
        type: "select",
        grid: { cols: 6 },
        ui: {
          placeholder: "Sélectionner une vocation",
        },
        options: [
          { label: "Agricole", value: "agricole" },
          { label: "Élevage", value: "elevage" },
          { label: "Piscicole", value: "piscicole" },
          { label: "Immobilier", value: "immobilier" },
          { label: "Mixte", value: "mixte" },
        ],
      },

      // --- Contrat foncier ---
      {
        key: "typeContratFoncier",
        label: "Type de contrat foncier",
        type: "select",
        grid: { cols: 6 },
        ui: {
          placeholder: "Sélectionner un type de contrat",
        },
        options: [
          { label: "Achat", value: "achat" },
          { label: "Location", value: "location" },
          { label: "Bail emphytéotique", value: "bail_emphyteotique" },
          { label: "Mise à disposition", value: "mise_a_disposition" },
        ],
      },

      {
        key: "dateDebutContrat",
        label: "Date de début du contrat",
        type: "date",
        grid: { cols: 6 },
      },

      {
        key: "dateAcquisition",
        label: "Date d'acquisition",
        type: "date",
        grid: { cols: 6 },
      },

      {
        key: "prixAcquisition",
        label: "Prix d'acquisition",
        type: "number",
        grid: { cols: 6 },
      },

      {
        key: "referenceContrat",
        label: "Référence du contrat",
        type: "text",
        grid: { cols: 6 },
      },

      {
        key: "documentContrat",
        label: "Document du contrat",
        type: "file",
        grid: { cols: 12 },
      },
    ],
  },

  form: {
    layout: "tabs",
    tabs: [
      {
        key: "identite",
        label: "Identité",
        fields: ["nom", "proprietaireId", "localisation", "statut"],
      },
      {
        key: "surfaces",
        label: "Surfaces",
        fields: [
          "surfaceTotale",
          "surfaceDisponible",
          "surfaceAgricole",
          "surfaceHabitation",
          "vocationTerrain",
        ],
      },
      {
        key: "contrat",
        label: "Contrat foncier",
        fields: [
          "typeContratFoncier",
          "dateDebutContrat",
          "dateAcquisition",
          "prixAcquisition",
          "referenceContrat",
          "documentContrat",
        ],
      },
    ],
  },
};

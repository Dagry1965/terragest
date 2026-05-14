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

      // --- AGRICOLE ---
      {
        key: "typeCulture",
        label: "Type de culture",
        type: "text",
        grid: { cols: 6 },
        visibility: {
          field: "vocationTerrain",
          equals: "agricole",
        },
        ui: {
          placeholder: "Ex: manioc, maïs, riz",
        },
      },
      {
        key: "rendementPrevisionnel",
        label: "Rendement prévisionnel",
        type: "number",
        grid: { cols: 6 },
        visibility: {
          field: "vocationTerrain",
          equals: "agricole",
        },
      },

      // --- IMMOBILIER ---
      {
        key: "typeBienImmobilier",
        label: "Type de bien immobilier",
        type: "select",
        options: [
          { label: "Maison", value: "maison" },
          { label: "Appartement", value: "appartement" },
          { label: "Terrain à bâtir", value: "terrain_a_batir" },
        ],
        grid: { cols: 6 },
        visibility: {
          field: "vocationTerrain",
          equals: "immobilier",
        },
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
        key: "general",
        label: "Général",

        fields: ["nom", "statut"],

        sections: [
          {
            key: "identite",
            title: "Identité du terrain",
            description: "Informations principales du terrain.",
            fields: ["nom"],
          },
          {
            key: "etat",
            title: "État du terrain",
            description: "Statut opérationnel du terrain.",
            fields: ["statut"],
          },

          // --- SECTION SURFACES & VOCATION ---
          {
            key: "surfaces_vocation",
            title: "Surfaces & Vocation",
            description: "Définition des surfaces et de la vocation du terrain.",
            fields: [
	    "nom",
             "statut",
              "surfaceTotale",
              "surfaceDisponible",
              "surfaceAgricole",
              "surfaceHabitation",
              "vocationTerrain",
              "typeCulture",
              "rendementPrevisionnel",
              "typeBienImmobilier",
            ],
          },
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

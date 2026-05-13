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
      },
      {
        key: "proprietaireId",
        label: "Propriétaire",
        type: "relation",
        relation: {
          module: "utilisateurs",
        },
        required: true,
      },
      {
        key: "localisation",
        label: "Localisation",
        type: "text",
      },
      {
        key: "surfaceTotale",
        label: "Surface totale",
        type: "number",
      },
      {
        key: "surfaceDisponible",
        label: "Surface disponible",
        type: "number",
      },
      {
        key: "surfaceAgricole",
        label: "Surface agricole",
        type: "number",
      },
      {
        key: "surfaceHabitation",
        label: "Surface habitation",
        type: "number",
      },
      {
        key: "vocationTerrain",
        label: "Vocation du terrain",
        type: "select",
        options: [
          { label: "Agricole", value: "agricole" },
          { label: "Élevage", value: "elevage" },
          { label: "Piscicole", value: "piscicole" },
          { label: "Immobilier", value: "immobilier" },
          { label: "Mixte", value: "mixte" },
        ],
      },
      {
        key: "typeContratFoncier",
        label: "Type de contrat foncier",
        type: "select",
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
      },
      {
        key: "dateAcquisition",
        label: "Date d'acquisition",
        type: "date",
      },
      {
        key: "prixAcquisition",
        label: "Prix d'acquisition",
        type: "number",
      },
      {
        key: "referenceContrat",
        label: "Référence du contrat",
        type: "text",
      },
      {
        key: "documentContrat",
        label: "Document du contrat",
        type: "file",
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        options: [
          { label: "Actif", value: "actif" },
          { label: "Inactif", value: "inactif" },
          { label: "En attente", value: "en_attente" },
        ],
        required: true,
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
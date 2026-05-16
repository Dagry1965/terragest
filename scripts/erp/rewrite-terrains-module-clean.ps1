$ErrorActionPreference = "Stop"

$path = "C:\Users\Admin\terragest\src\runtime\modules\definitions\generated\terrains.module.ts"

$content = @'
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

        list: {
          visible: true,
          order: 1,
        },

        ui: {
          placeholder: "Nom officiel du terrain",
          help: "Nom utilisé dans les documents fonciers.",
        },
      },

      {
        key: "proprietaireId",
        label: "Propriétaire",
        type: "relation",

        relation: {
          module: "utilisateurs",
        },

        required: true,

        searchable: true,

        grid: { cols: 6 },

        list: {
          visible: true,
          order: 2,
        },

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

        list: {
          visible: true,
          order: 3,
        },

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

        list: {
          visible: true,
          order: 4,
        },

        options: [
          {
            label: "Actif",
            value: "actif",
          },
          {
            label: "Inactif",
            value: "inactif",
          },
          {
            label: "En attente",
            value: "en_attente",
          },
        ],
      },

      {
        key: "surfaceTotale",
        label: "Surface totale",
        type: "number",

        grid: { cols: 6 },

        list: {
          visible: true,
          order: 5,
        },
      },

      {
        key: "surfaceDisponible",
        label: "Surface disponible",
        type: "number",

        grid: { cols: 6 },

        list: {
          visible: false,
          order: 99,
        },
      },

      {
        key: "surfaceAgricole",
        label: "Surface agricole",
        type: "number",

        grid: { cols: 6 },

        list: {
          visible: false,
          order: 99,
        },
      },

      {
        key: "surfaceHabitation",
        label: "Surface habitation",
        type: "number",

        grid: { cols: 6 },

        list: {
          visible: false,
          order: 99,
        },
      },

      {
        key: "vocationTerrain",
        label: "Vocation du terrain",
        type: "select",

        grid: { cols: 6 },

        list: {
          visible: true,
          order: 6,
        },

        options: [
          {
            label: "Agricole",
            value: "agricole",
          },
          {
            label: "Élevage",
            value: "elevage",
          },
          {
            label: "Piscicole",
            value: "piscicole",
          },
          {
            label: "Immobilier",
            value: "immobilier",
          },
          {
            label: "Mixte",
            value: "mixte",
          },
        ],
      },

      {
        key: "typeCulture",
        label: "Type de culture",
        type: "text",

        grid: { cols: 6 },

        visibility: {
          field: "vocationTerrain",
          equals: "agricole",
        },

        list: {
          visible: false,
          order: 99,
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

        list: {
          visible: false,
          order: 99,
        },
      },

      {
        key: "typeBienImmobilier",
        label: "Type de bien immobilier",
        type: "select",

        grid: { cols: 6 },

        visibility: {
          field: "vocationTerrain",
          equals: "immobilier",
        },

        list: {
          visible: false,
          order: 99,
        },

        options: [
          {
            label: "Maison",
            value: "maison",
          },
          {
            label: "Appartement",
            value: "appartement",
          },
          {
            label: "Terrain à bâtir",
            value: "terrain_a_batir",
          },
        ],
      },

      {
        key: "typeContratFoncier",
        label: "Type de contrat foncier",
        type: "select",

        grid: { cols: 6 },

        list: {
          visible: false,
          order: 99,
        },

        options: [
          {
            label: "Achat",
            value: "achat",
          },
          {
            label: "Location",
            value: "location",
          },
          {
            label: "Bail emphytéotique",
            value: "bail_emphyteotique",
          },
          {
            label: "Mise à disposition",
            value: "mise_a_disposition",
          },
        ],
      },

      {
        key: "dateDebutContrat",
        label: "Date de début du contrat",
        type: "date",

        grid: { cols: 6 },

        list: {
          visible: false,
          order: 99,
        },
      },

      {
        key: "dateAcquisition",
        label: "Date d'acquisition",
        type: "date",

        grid: { cols: 6 },

        list: {
          visible: false,
          order: 99,
        },
      },

      {
        key: "prixAcquisition",
        label: "Prix d'acquisition",
        type: "number",

        grid: { cols: 6 },

        list: {
          visible: false,
          order: 99,
        },
      },

      {
        key: "referenceContrat",
        label: "Référence du contrat",
        type: "text",

        grid: { cols: 6 },

        list: {
          visible: false,
          order: 99,
        },
      },

      {
        key: "documentContrat",
        label: "Document du contrat",
        type: "file",

        grid: { cols: 12 },

        list: {
          visible: false,
          order: 100,
        },
      },
    ],
  },

  form: {
    layout: "tabs",

    tabs: [

      {
        key: "general",
        label: "Général",

        sections: [

          {
            key: "identite",
            title: "Identité du terrain",
            description: "Informations principales du terrain.",

            fields: [
              "nom",
              "proprietaireId",
              "localisation",
              "statut",
            ],
          },

          {
            key: "surfaces",
            title: "Surfaces & vocation",
            description: "Définition des surfaces et de la vocation.",

            fields: [
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

        sections: [
          {
            key: "contrat_foncier",
            title: "Informations contractuelles",

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
    ],
  },
};
'@

[System.IO.File]::WriteAllText(
  $path,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host ""
Write-Host "OK - terrains.module.ts réécrit proprement"
Write-Host ""
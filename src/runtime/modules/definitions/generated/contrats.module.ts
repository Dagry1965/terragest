import type { ERPModule } from "../../ERPModule";

export const contratsModule: ERPModule = {
  metadata: {
    key: "contrats",
    label: "Contrats",
    description: "Gestion des contrats liés aux terrains et aux exploitations.",
    icon: "file-text",
    category: "Métier",
    routes: {
      list: "/contrats",
      create: "/contrats/nouveau",
      details: "/contrats/[id]",
      edit: "/contrats/[id]/edit",
    },
  },

  schema: {
    collection: "contrats",

    fields: [
      {
        key: "code",
        label: "Code contrat",
        type: "text",
        list: {
          visible: true,
          order: 1,
        },
      },

      {
        key: "nom",
        label: "Nom",
        type: "text",
        required: true,
        list: {
          visible: true,
          order: 2,
        },
      },

      {
        key: "typeContrat",
        label: "Type contrat",
        type: "select",
        required: true,
        options: [
          { label: "Terrain", value: "terrain" },
          { label: "Exploitation", value: "exploitation" },
        ],
        list: {
          visible: true,
          order: 3,
        },
      },

      {
        key: "objetContrat",
        label: "Objet contrat",
        type: "select",
        required: true,
        options: [
          { label: "Acquisition", value: "acquisition" },
          { label: "Location", value: "location" },
          { label: "Concession", value: "concession" },
          { label: "Partenariat", value: "partenariat" },
          { label: "Mise à disposition", value: "mise_disposition" },
          { label: "Autre", value: "autre" },
        ],
        list: {
          visible: true,
          order: 4,
        },
      },

      {
        key: "terrainId",
        label: "Terrain",
        type: "relation",
        relation: {
          module: "terrains",
          collection: "terrains",
          labelField: "nom",
        },
        searchable: true,
        list: {
          visible: true,
          order: 5,
        },
      },

      {
        key: "exploitationId",
        label: "Exploitation",
        type: "relation",
        relation: {
          module: "exploitations",
          collection: "exploitations",
          labelField: "nom",
        },
        searchable: true,
        list: {
          visible: true,
          order: 6,
        },
      },

      {
        key: "dateDebut",
        label: "Date début",
        type: "date",
        required: true,
        list: {
          visible: true,
          order: 7,
        },
      },

      {
        key: "dateFin",
        label: "Date fin",
        type: "date",
        list: {
          visible: false,
          order: 8,
        },
      },

      {
        key: "montant",
        label: "Montant",
        type: "number",
        list: {
          visible: true,
          order: 9,
        },
      },

      {
        key: "documentContrat",
        label: "Document contrat",
        type: "text",
        list: {
          visible: false,
          order: 10,
        },
      },

      {
        key: "description",
        label: "Description",
        type: "textarea",
        list: {
          visible: false,
          order: 11,
        },
      },

      {
        key: "statut",
        label: "Statut",
        type: "select",
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Actif", value: "actif" },
          { label: "Suspendu", value: "suspendu" },
          { label: "Terminé", value: "termine" },
          { label: "Archivé", value: "archive" },
        ],
        list: {
          visible: true,
          order: 12,
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
        fields: [
          "code",
          "nom",
          "typeContrat",
          "objetContrat",
          "statut",
        ],
        sections: [
          {
            key: "infos",
            title: "Informations contrat",
            fields: [
              "code",
              "nom",
              "typeContrat",
              "objetContrat",
              "statut",
            ],
          },
        ],
      },

      {
        key: "relations",
        label: "Relations",
        fields: [
          "terrainId",
          "exploitationId",
        ],
        sections: [
          {
            key: "relations_section",
            title: "Rattachement",
            fields: [
              "terrainId",
              "exploitationId",
            ],
          },
        ],
      },

      {
        key: "dates",
        label: "Dates & montant",
        fields: [
          "dateDebut",
          "dateFin",
          "montant",
          "documentContrat",
        ],
        sections: [
          {
            key: "dates_montant",
            title: "Dates, montant et document",
            fields: [
              "dateDebut",
              "dateFin",
              "montant",
              "documentContrat",
            ],
          },
        ],
      },

      {
        key: "description",
        label: "Description",
        fields: [
          "description",
        ],
        sections: [
          {
            key: "description_section",
            title: "Description",
            fields: [
              "description",
            ],
          },
        ],
      },
    ],
  },
};
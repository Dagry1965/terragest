import type { ERPModule } from "@/runtime/modules/ERPModule";

export const __camelModule__Module: ERPModule = {
  metadata: {
    key: "__module__",
    label: "__LabelModule__",
    description: "__LabelModule__ module",
    icon: "database",
    category: "business",

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
    collection: "__module__",

    fields: [
      {
        key: "nom",
        label: "Nom",
        type: "text",
        required: true,
        searchable: true,
        grid: {
          cols: 6,
        },
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        grid: {
          cols: 12,
        },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        options: [
          {
            label: "Actif",
            value: "actif",
          },
          {
            label: "Inactif",
            value: "inactif",
          },
        ],
        defaultValue: "actif",
        grid: {
          cols: 6,
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
      "nom",
      "description",
      "statut",
    ],

    sections: [
          {
            key: "informations",
            title: "Informations",
            fields: ["nom", "description", "statut"],
          },
        ],
      },
    ],
  },

  workflows: [
    {
      key: "default",
      label: "Workflow principal",

      states: [
        {
          key: "draft",
          label: "Brouillon",
          color: "default",
        },
        {
          key: "active",
          label: "Actif",
          color: "success",
        },
        {
          key: "archived",
          label: "Archivé",
          color: "warning",
        },
      ],

      transitions: [
        {
          from: "draft",
          to: "active",
          action: "Valider",
        },
        {
          from: "active",
          to: "archived",
          action: "Archiver",
        },
      ],
    },
  ],
};
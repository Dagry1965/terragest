import type { ERPModule } from "@/runtime/modules";

export const campagnesModuleV2: ERPModule = {
  metadata: {
    key: "campagnes",
    label: "Campagnes",
    description: "Module métier Campagnes généré par le standard ERP Business Module V2.",
    icon: "calendar",
    category: "Production",

    features: {
      audit: true,
      realtime: true,
      analytics: true,
      workflows: true,
      automation: true,
      notifications: true,
    },
  },

  schema: {
    collection: "campagnes",

    fields: [
      {
        key: "nom",
        label: "Nom",
        type: "text",
        required: true,
      },

      {
        key: "description",
        label: "Description",
        type: "textarea",
      },

      {
        key: "statut",
        label: "Statut",
        type: "select",

        options: [
          { label: "Actif", value: "actif" },
          { label: "Inactif", value: "inactif" },
          { label: "Archive", value: "archive" },
        ],
      },
    ],
  },
};
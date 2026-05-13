import type { ERPModule } from "@/runtime/modules";

export const actifsModuleV2: ERPModule = {
  metadata: {
    key: "actifs",
    label: "Actifs",
    description: "Module mÃ©tier Actifs gÃ©nÃ©rÃ© par le standard ERP Business Module V2.",
    icon: "building",
    category: "Patrimoine",
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
    collection: "actifs",
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
import type { ERPModule } from "@/runtime/modules";

export const mouvementsModuleV2: ERPModule = {
  metadata: {
    key: "mouvements",
    label: "Mouvements",
    description: "Module mÃ©tier Mouvements gÃ©nÃ©rÃ© par le standard ERP Business Module V2.",
    icon: "arrow-left-right",
    category: "Stocks",
features: {
  audit: true,
  realtime: true,
  analytics: true,
  workflows: true,
  automation: true,
  notifications: true,
},

dashboard: true,


  },

  schema: {
    collection: "mouvements",
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
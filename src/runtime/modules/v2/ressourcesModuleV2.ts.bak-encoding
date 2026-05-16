import type { ERPModule } from "@/runtime/modules";

export const ressourcesModuleV2: ERPModule = {
  metadata: {
    key: "ressources",
    label: "Ressources",
    description: "Module mÃ©tier Ressources gÃ©nÃ©rÃ© par le standard ERP Business Module V2.",
    icon: "package",
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
    collection: "ressources",
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
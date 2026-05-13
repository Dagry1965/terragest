import type { ERPModule } from "../../ERPModule";

export const contratsModule: ERPModule = {
  metadata: {
    key: "contrats",
    label: "Contrats",
    description: "Module ERP gÃƒÂ©nÃƒÂ©rÃƒÂ© pour Contrats.",
    icon: "database",
    category: "MÃƒÂ©tier",
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
        key: "nom",
        label: "Nom",
        type: "text",
        required: true,
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        options: [
          { label: "Actif", value: "actif" },
          { label: "Inactif", value: "inactif" },
        ],
        required: true,
      },
    ],
  },
};

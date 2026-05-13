import type { ERPModule } from "../../ERPModule";

export const {{CamelName}}Module: ERPModule = {
  metadata: {
    key: "{{ModuleKey}}",
    label: "{{Label}}",
    description: "{{Description}}",
    icon: "{{Icon}}",
    category: "{{Category}}",
    routes: {
      list: "/{{ModuleKey}}",
      create: "/{{ModuleKey}}/nouveau",
      details: "/{{ModuleKey}}/[id]",
      edit: "/{{ModuleKey}}/[id]/edit",
    },
  },

  schema: {
    collection: "{{Collection}}",
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

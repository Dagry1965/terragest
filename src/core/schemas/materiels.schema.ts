import { ERPModuleSchema } from "./types";

export const materielsSchema: ERPModuleSchema = {
  module: "materiels",

  title: "MatÃ©riels",

  description:
    "Gestion des matÃ©riels, Ã©tats et maintenance.",

  fields: [
    {
      key: "nom",
      label: "Nom",
      type: "text",
      required: true,
      searchable: true,
      sortable: true,
      list: true,
    },

    {
      key: "categorie",
      label: "CatÃ©gorie",
      type: "text",
      searchable: true,
      list: true,
    },

    {
      key: "etat",
      label: "Ã‰tat",
      type: "status",
      sortable: true,
      list: true,
    },

    {
      key: "cout",
      label: "CoÃ»t",
      type: "currency",
      sortable: true,
      list: true,
    },
  ],

  statuses: [
    {
      value: "operationnel",
      label: "OpÃ©rationnel",
      color: "green",
    },

    {
      value: "maintenance",
      label: "Maintenance",
      color: "yellow",
    },

    {
      value: "panne",
      label: "En panne",
      color: "red",
    },
  ],

  features: {
    audit: true,
    workflow: true,
    supervision: true,
  },
};

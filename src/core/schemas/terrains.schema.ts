import { ERPModuleSchema } from "./types";

export const terrainsSchema: ERPModuleSchema = {
  module: "terrains",

  title: "Terrains",

  description:
    "Gestion des terrains et parcelles.",

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
      key: "localisation",
      label: "Localisation",
      type: "text",
      searchable: true,
      list: true,
    },

    {
      key: "surface",
      label: "Surface",
      type: "number",
      sortable: true,
      list: true,
    },

    {
      key: "status",
      label: "Statut",
      type: "status",
      sortable: true,
      list: true,
    },
  ],

  statuses: [
    {
      value: "disponible",
      label: "Disponible",
      color: "green",
    },

    {
      value: "occupe",
      label: "OccupÃ©",
      color: "blue",
    },

    {
      value: "maintenance",
      label: "Maintenance",
      color: "yellow",
    },
  ],

  features: {
    audit: true,
    workflow: true,
  },
};

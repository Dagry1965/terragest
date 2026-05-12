import type {
  ERPBusinessSchema,
} from "./ERPBusinessSchema";

export const TerrainsBusinessSchema:
  ERPBusinessSchema = {

  module: "terrains",

  label: "Terrains",

  fields: [

    {
      key: "nom",
      label: "Nom",
      type: "text",
      required: true,
    },

    {
      key: "surface",
      label: "Surface",
      type: "number",
      required: true,
    },

    {
      key: "culture",
      label: "Culture",
      type: "text",
    },

    {
      key: "localisation",
      label: "Localisation",
      type: "text",
    },

    {
      key: "actif",
      label: "Actif",
      type: "boolean",
    },
  ],
};
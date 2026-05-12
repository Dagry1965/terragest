import type {
  ERPBusinessSchema,
} from "./ERPBusinessSchema";

export const ProduitsBusinessSchema:
  ERPBusinessSchema = {

  module: "produits",

  label: "Produits",

  fields: [

    {
      key: "reference",
      label: "Référence",
      type: "text",
      required: true,
    },

    {
      key: "designation",
      label: "Désignation",
      type: "text",
      required: true,
    },

    {
      key: "categorie",
      label: "Catégorie",
      type: "select",
      required: true,
    },

    {
      key: "prix",
      label: "Prix",
      type: "number",
    },

    {
      key: "actif",
      label: "Actif",
      type: "boolean",
    },
  ],
};
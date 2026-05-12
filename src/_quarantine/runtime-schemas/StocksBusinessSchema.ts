import type {
  ERPBusinessSchema,
} from "./ERPBusinessSchema";

export const StocksBusinessSchema:
  ERPBusinessSchema = {

  module: "stocks",

  label: "Stocks",

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
      key: "quantite",
      label: "Quantité",
      type: "number",
      required: true,
    },

    {
      key: "unite",
      label: "Unité",
      type: "select",
      required: true,
    },

    {
      key: "actif",
      label: "Actif",
      type: "boolean",
    },
  ],
};
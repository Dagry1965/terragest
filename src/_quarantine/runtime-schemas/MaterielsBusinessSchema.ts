import type {
  ERPBusinessSchema,
} from "./ERPBusinessSchema";

export const MaterielsBusinessSchema:
  ERPBusinessSchema = {

  module: "materiels",

  label: "Matériels",

  fields: [
    {
      key: "nom",
      label: "Nom",
      type: "text",
      required: true,
    },
    {
      key: "type",
      label: "Type",
      type: "select",
      required: true,
    },
    {
      key: "etat",
      label: "État",
      type: "select",
      required: true,
    },
    {
      key: "dateAchat",
      label: "Date d'achat",
      type: "date",
    },
    {
      key: "actif",
      label: "Actif",
      type: "boolean",
    },
  ],
};
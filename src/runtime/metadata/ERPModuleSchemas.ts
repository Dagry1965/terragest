import {
  erpMetadataRegistry,
} from "./ERPMetadataRegistry";

erpMetadataRegistry.registerModule({

  key: "terrains",

  label: "Terrains",

  route: "/terrains",

  icon: "map",

  fields: [

    {
      key: "nom",
      label: "Nom",
      type: "text",
    },

    {
      key: "surface",
      label: "Surface",
      type: "number",
    },

    {
      key: "culture",
      label: "Culture",
      type: "text",
    },
  ],
});

erpMetadataRegistry.registerModule({

  key: "materiels",

  label: "Matériels",

  route: "/materiels",

  icon: "tractor",

  fields: [

    {
      key: "nom",
      label: "Nom",
      type: "text",
    },

    {
      key: "etat",
      label: "État",
      type: "select",
    },

    {
      key: "dateAchat",
      label: "Date achat",
      type: "date",
    },
  ],
});
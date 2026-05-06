import {
  DynamicField,
}
from "@/runtime/forms/DynamicField";

import {
  DynamicFormDefinition,
}
from "@/runtime/forms/DynamicFormDefinition";

export const stocksForm:
  DynamicFormDefinition = {

  module: "stocks",

  build(): DynamicField[] {

    return [

      {
        name: "produit",
        label: "Produit",
        type: "select",
        required: true,
      },

      {
        name: "quantite",
        label: "Quantité",
        type: "number",
        required: true,
      },

      {
        name: "seuilAlerte",
        label: "Seuil alerte",
        type: "number",
      },
    ];
  },
};

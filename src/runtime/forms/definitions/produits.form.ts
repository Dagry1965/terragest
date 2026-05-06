import {
  DynamicField,
}
from "@/runtime/forms/DynamicField";

import {
  DynamicFormDefinition,
}
from "@/runtime/forms/DynamicFormDefinition";

export const produitsForm:
  DynamicFormDefinition = {

  module: "produits",

  build(): DynamicField[] {

    return [

      {
        name: "nom",
        label: "Nom produit",
        type: "text",
        required: true,
      },

      {
        name: "categorie",
        label: "Catégorie",
        type: "select",
        required: true,
      },

      {
        name: "unite",
        label: "Unité",
        type: "select",
      },
    ];
  },
};

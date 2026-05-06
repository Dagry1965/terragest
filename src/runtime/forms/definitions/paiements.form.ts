import {
  DynamicField,
}
from "@/runtime/forms/DynamicField";

import {
  DynamicFormDefinition,
}
from "@/runtime/forms/DynamicFormDefinition";

export const paiementsForm:
  DynamicFormDefinition = {

  module: "paiements",

  build(): DynamicField[] {

    return [

      {
        name: "montant",
        label: "Montant",
        type: "number",
        required: true,
      },

      {
        name: "modePaiement",
        label: "Mode paiement",
        type: "select",
      },

      {
        name: "reference",
        label: "Référence",
        type: "text",
      },
    ];
  },
};

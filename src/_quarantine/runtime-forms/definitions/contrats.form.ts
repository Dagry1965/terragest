import {
  DynamicField,
}
from "@/runtime/forms/DynamicField";

import {
  DynamicFormDefinition,
}
from "@/runtime/forms/DynamicFormDefinition";

export const contratsForm:
  DynamicFormDefinition = {

  module: "contrats",

  build(): DynamicField[] {

    return [

      {
        name: "reference",
        label: "Référence",
        type: "text",
      },

      {
        name: "prestataire",
        label: "Prestataire",
        type: "text",
      },

      {
        name: "dateDebut",
        label: "Date début",
        type: "text",
      },

      {
        name: "dateFin",
        label: "Date fin",
        type: "text",
      },
    ];
  },
};

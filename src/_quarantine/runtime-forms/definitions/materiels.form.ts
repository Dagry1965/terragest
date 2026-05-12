import {
  DynamicField,
  DynamicFormContext,
}
from "@/runtime/forms/DynamicField";

import {
  DynamicFormDefinition,
}
from "@/runtime/forms/DynamicFormDefinition";

export const materielsForm:
  DynamicFormDefinition = {

  module: "materiels",

  build(
    context: DynamicFormContext
  ): DynamicField[] {

    const fields: DynamicField[] = [

      {
        name: "nom",
        label: "Nom",
        type: "text",
        required: true,
      },

      {
        name: "type",
        label: "Type",
        type: "select",
        required: true,
      },
    ];

    if (
      context.materielType ===
      "tracteur"
    ) {

      fields.push({
        name:
          "puissanceMoteur",

        label:
          "Puissance moteur",

        type:
          "number",
      });
    }

    return fields;
  },
};

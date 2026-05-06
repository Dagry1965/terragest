import {
  DynamicField,
  DynamicFormContext,
}
from "@/runtime/forms/DynamicField";

import {
  DynamicFormDefinition,
}
from "@/runtime/forms/DynamicFormDefinition";

export const interventionsForm:
  DynamicFormDefinition = {

  module: "interventions",

  build(
    context: DynamicFormContext
  ): DynamicField[] {

    const fields: DynamicField[] = [

      {
        name: "materiel",
        label: "Matériel",
        type: "select",
      },

      {
        name: "technicien",
        label: "Technicien",
        type: "select",
      },

      {
        name: "description",
        label: "Description",
        type: "textarea",
      },
    ];

    if (
      context.criticite ===
      "critical"
    ) {

      fields.push({
        name: "urgence",
        label: "Urgence",
        type: "select",
        required: true,
      });
    }

    return fields;
  },
};

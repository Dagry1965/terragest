import {
  DynamicField,
  DynamicFormContext,
}
from "@/runtime/forms/DynamicField";

import {
  DynamicFormDefinition,
}
from "@/runtime/forms/DynamicFormDefinition";

export const maintenanceForm:
  DynamicFormDefinition = {

  module: "maintenance",

  build(
    context: DynamicFormContext
  ): DynamicField[] {

    const fields: DynamicField[] = [

      {
        name: "materiel",
        label: "Matériel",
        type: "select",
        required: true,
      },

      {
        name: "criticite",
        label: "Criticité",
        type: "select",
        required: true,
      },

      {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
      },
    ];

    if (
      context.criticite ===
      "critical"
    ) {

      fields.push({
        name:
          "impactProduction",

        label:
          "Impact production",

        type:
          "textarea",

        required: true,
      });
    }

    return fields;
  },
};

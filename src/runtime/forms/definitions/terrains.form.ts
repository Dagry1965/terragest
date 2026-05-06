import {
  DynamicField,
  DynamicFormContext,
}
from "@/runtime/forms/DynamicField";

import {
  DynamicFormDefinition,
}
from "@/runtime/forms/DynamicFormDefinition";

export const terrainsForm:
  DynamicFormDefinition = {

  module: "terrains",

  build(
    context: DynamicFormContext
  ): DynamicField[] {

    const fields: DynamicField[] = [
      {
        name: "nom",
        label: "Nom du terrain",
        type: "text",
        required: true,
      },
      {
        name: "type",
        label: "Type de terrain",
        type: "select",
        required: true,
      },
      {
        name: "surface",
        label: "Surface",
        type: "number",
        required: true,
      },
      {
        name: "localisation",
        label: "Localisation",
        type: "text",
      },
    ];

    if (context.exploitationType === "agricole") {
      fields.push({
        name: "culturePrincipale",
        label: "Culture principale",
        type: "text",
      });
    }

    return fields;
  },
};

import {
  DynamicField,
  DynamicFormContext,
}
from "@/runtime/forms/DynamicField";

export class DynamicFormEngine {

  static buildMaintenanceForm(
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
        options: [
          {
            label: "Faible",
            value: "low",
          },
          {
            label: "Moyenne",
            value: "medium",
          },
          {
            label: "Haute",
            value: "high",
          },
          {
            label: "Critique",
            value: "critical",
          },
        ],
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
        name: "impactProduction",
        label:
          "Impact production",
        type: "textarea",
        required: true,
      });
    }

    if (
      context.role ===
      "superviseur"
    ) {

      fields.push({
        name: "validation",
        label:
          "Validation superviseur",
        type: "textarea",
      });
    }

    if (
      context.materielType ===
      "tracteur"
    ) {

      fields.push({
        name: "puissanceMoteur",
        label:
          "Puissance moteur",
        type: "number",
      });
    }

    return fields;
  }
}

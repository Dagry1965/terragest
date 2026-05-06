import type {
  WorkflowDefinition
}
from "@/runtime/workflows/types/WorkflowDefinition";

export const
CreateMaterielWorkflow:
  WorkflowDefinition = {

  id:
    "CREATE_MATERIEL_WORKFLOW",

  name:
    "Create Materiel Workflow",

  steps: [

    {
      id:
        "VALIDATE_MATERIEL",

      name:
        "Validate Materiel",

      async execute(
        payload
      ) {

        console.log(
          "[Workflow] Validate Materiel",
          payload
        );
      },
    },

    {
      id:
        "REGISTER_RUNTIME_EVENT",

      name:
        "Register Runtime Event",

      async execute(
        payload
      ) {

        console.log(
          "[Workflow] Register Runtime Event",
          payload
        );
      },
    },

    {
      id:
        "SUPERVISION",

      name:
        "Supervision",

      async execute(
        payload
      ) {

        console.log(
          "[Workflow] Supervision",
          payload
        );
      },
    },

    {
      id:
        "NOTIFICATION",

      name:
        "Notification",

      async execute(
        payload
      ) {

        console.log(
          "[Workflow] Notification",
          payload
        );
      },
    },
  ],
};
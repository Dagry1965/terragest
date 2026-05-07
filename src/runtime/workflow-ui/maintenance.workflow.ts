import {
  WorkflowState,
  WorkflowTransition,
}
from "@/runtime/workflow-ui/Workflow.types";

export const maintenanceWorkflow = {

  module:
    "maintenance",

  states: <WorkflowState[]> [

    {
      id:
        "ouverte",

      label:
        "Ouverte",

      color:
        "yellow",
    },

    {
      id:
        "diagnostic",

      label:
        "Diagnostic",

      color:
        "blue",
    },

    {
      id:
        "intervention",

      label:
        "Intervention",

      color:
        "orange",
    },

    {
      id:
        "cloturee",

      label:
        "Clôturée",

      color:
        "green",

      final:
        true,
    },
  ],

  transitions:
    <WorkflowTransition[]> [

    {
      from:
        "ouverte",

      to:
        "diagnostic",

      action:
        "Diagnostiquer",

      roles: [
        "technicien",
        "superviseur",
      ],
    },

    {
      from:
        "diagnostic",

      to:
        "intervention",

      action:
        "Planifier intervention",

      roles: [
        "superviseur",
      ],
    },

    {
      from:
        "intervention",

      to:
        "cloturee",

      action:
        "Clôturer",

      roles: [
        "superviseur",
      ],
    },
  ],
};

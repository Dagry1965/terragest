// src/domains/paiement/workflows/PaiementWorkflow.ts

import { WorkflowRegistry }
from "@/platform/workflows/registry/WorkflowRegistry";

import { WorkflowState }
from "@/platform/workflows/states/WorkflowState";

export function registerPaiementWorkflow() {

  WorkflowRegistry.register(

    "paiement",

    [

      {

        from:
          WorkflowState.DRAFT,

        to:
          WorkflowState.VALIDATED
      },

      {

        from:
          WorkflowState.VALIDATED,

        to:
          WorkflowState.APPROVED
      },

      {

        from:
          WorkflowState.APPROVED,

        to:
          WorkflowState.COMPLETED
      }
    ]
  );
}
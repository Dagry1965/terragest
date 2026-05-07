"use client";

import { ERPWorkflowStep }
from "@/components/erp/workflow/ERPWorkflowStep";

export function ERPWorkflowBoard() {

  return (

    <div className="space-y-4">

      <ERPWorkflowStep
        title="Détection incident"
        status="done"
        description="Anomalie détectée par le runtime ERP."
      />

      <ERPWorkflowStep
        title="Création intervention"
        status="done"
        description="Workflow intervention déclenché."
      />

      <ERPWorkflowStep
        title="Validation superviseur"
        status="active"
        description="Validation métier requise."
      />

      <ERPWorkflowStep
        title="Assignation technicien"
        status="pending"
        description="Assignation en attente."
      />

      <ERPWorkflowStep
        title="Clôture workflow"
        status="pending"
        description="Workflow non terminé."
      />

    </div>

  );
}
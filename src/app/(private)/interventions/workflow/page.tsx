"use client";

import { ERPPage }
from "@/components/erp/page/ERPPage";

import { ERPWidgetCard }
from "@/components/erp/page/ERPWidgetCard";

import { ERPWorkflowStep }
from "@/components/erp/workflow/ERPWorkflowStep";

export default function InterventionWorkflowPage() {

  return (

    <ERPPage
      title="Workflow intervention"
      subtitle="Orchestration opérationnelle des interventions terrain."
    >

      <ERPWidgetCard title="Progression workflow">

        <div className="space-y-4">

          <ERPWorkflowStep
            title="Incident détecté"
            status="done"
            description="Le runtime ERP a enregistré une anomalie."
          />

          <ERPWorkflowStep
            title="Intervention créée"
            status="done"
            description="Le workflow intervention a été déclenché."
          />

          <ERPWorkflowStep
            title="Validation superviseur"
            status="active"
            description="En attente de validation opérationnelle."
          />

          <ERPWorkflowStep
            title="Assignation technicien"
            status="pending"
            description="Technicien non encore assigné."
          />

          <ERPWorkflowStep
            title="Clôture intervention"
            status="pending"
            description="Intervention non terminée."
          />

        </div>

      </ERPWidgetCard>

    </ERPPage>
  );
}

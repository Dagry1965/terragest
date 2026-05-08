"use client";

import { WorkflowCard } from "@/features/workflow-engine/components/WorkflowCard";

const workflows = [

  {
    id: "purchase",

    nom: "Purchase Workflow",

    description:
      "Automatisation achat stock faible",

    steps: [
      {},
      {},
      {},
    ],
  },

  {
    id: "maintenance",

    nom: "Maintenance Workflow",

    description:
      "Gestion maintenance IoT",

    steps: [
      {},
      {},
    ],
  },

  {
    id: "alert",

    nom: "Security Alert Workflow",

    description:
      "Gestion alertes critiques",

    steps: [
      {},
      {},
      {},
      {},
    ],
  },
];

export const WorkflowTableau de bord = () => {

  return (

    <div className="
      p-10
      space-y-10
    ">

      <div>

        <h1 className="
          text-5xl
          font-bold
        ">
          Workflow Orchestration
        </h1>

        <p className="
          text-gray-500
          mt-4
        ">
          BPM & process automation
        </p>

      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">

        {workflows.map(
          (workflow) => (

            <WorkflowCard
              key={workflow.id}
              workflow={workflow}
            />

          )
        )}

      </div>

    </div>
  );
}

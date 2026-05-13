// src/app/(private)/operations/page.tsx

import { ERPAppShell }
from "@/components/erp/layout/ERPAppShell";

import { OperationsMetrics }
from "@/components/operations/OperationsMetrics";

import { OperationsTimeline }
from "@/components/operations/OperationsTimeline";

import { MaterielsStore }
from "@/domains/materiels/store/MaterielsStore";

import { InterventionsStore }
from "@/domains/interventions/store/InterventionsStore";

export default function OperationsPage() {

  const materiels =
    MaterielsStore.all();

  const interventions =
    InterventionsStore.all();

  const materielsEnPanne =
    materiels.filter(
      item =>
        item.statut
        === "EN_PANNE"
    ).length;

  const interventionsOuvertes =
    interventions.filter(
      item =>
        item.workflow
        === "OPEN"
    ).length;

  const entries = [

    ...materiels.map(item => ({

      id:
        item.id,

      label:
        `${item.nom} → ${item.statut}`
    })),

    ...interventions.map(item => ({

      id:
        item.id,

      label:
        `Intervention ${item.workflow}`
    }))
  ];

  return (

    <ERPAppShell>

      <div
        className="
          flex
          flex-col
          gap-6
        "
      >

        <div>

          <h1
            className="
              text-3xl
              font-bold
              mb-2
            "
          >
            Operations Center
          </h1>

          <p
            className="
              text-zinc-500
            "
          >
            Supervision runtime ERP
          </p>
        </div>

        <OperationsMetrics

          materielsEnPanne={
            materielsEnPanne
          }

          interventionsOuvertes={
            interventionsOuvertes
          }

          workflowsActifs={
            entries.length
          }
        />

        <OperationsTimeline
          entries={entries}
        />

      </div>

    </ERPAppShell>
  );
}

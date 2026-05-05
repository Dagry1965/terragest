# =========================================================
# TERRAGEST - OPERATIONS DASHBOARD
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " OPERATIONS DASHBOARD"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\app\(private)\operations",

  ".\src\components\operations"
)

foreach ($directory in $directories) {

  if (!(Test-Path $directory)) {

    New-Item `
      -ItemType Directory `
      -Path $directory `
      | Out-Null

    Write-Host "[CREATED] $directory"
  }
}

# =========================================================
# OPERATIONS METRICS
# =========================================================

$metrics = @'
// src/components/operations/OperationsMetrics.tsx

interface OperationsMetricsProps {

  materielsEnPanne: number;

  interventionsOuvertes: number;

  workflowsActifs: number;
}

export function OperationsMetrics({

  materielsEnPanne,

  interventionsOuvertes,

  workflowsActifs
}: OperationsMetricsProps) {

  const cards = [

    {

      label:
        "Matériels en panne",

      value:
        materielsEnPanne
    },

    {

      label:
        "Interventions ouvertes",

      value:
        interventionsOuvertes
    },

    {

      label:
        "Workflows actifs",

      value:
        workflowsActifs
    }
  ];

  return (

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      "
    >

      {cards.map(card => (

        <div

          key={card.label}

          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >

          <div
            className="
              text-zinc-500
              mb-2
            "
          >
            {card.label}
          </div>

          <div
            className="
              text-4xl
              font-bold
            "
          >
            {card.value}
          </div>

        </div>
      ))}
    </div>
  );
}
'@

Set-Content `
  ".\src\components\operations\OperationsMetrics.tsx" `
  $metrics

Write-Host ""
Write-Host "[CREATED] OperationsMetrics.tsx"

# =========================================================
# OPERATIONS TIMELINE
# =========================================================

$timeline = @'
// src/components/operations/OperationsTimeline.tsx

interface OperationsTimelineEntry {

  id: string;

  label: string;
}

interface OperationsTimelineProps {

  entries:
    OperationsTimelineEntry[];
}

export function OperationsTimeline({

  entries
}: OperationsTimelineProps) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
      "
    >

      <h2
        className="
          text-2xl
          font-bold
          mb-6
        "
      >
        Activité runtime
      </h2>

      <div
        className="
          flex
          flex-col
          gap-4
        "
      >

        {entries.map(entry => (

          <div

            key={entry.id}

            className="
              border-l-2
              border-zinc-300
              pl-4
            "
          >
            {entry.label}
          </div>
        ))}

      </div>

    </div>
  );
}
'@

Set-Content `
  ".\src\components\operations\OperationsTimeline.tsx" `
  $timeline

Write-Host "[CREATED] OperationsTimeline.tsx"

# =========================================================
# OPERATIONS PAGE
# =========================================================

$operationsPage = @'
// src/app/(private)/operations/page.tsx

import { ERPLayout }
from "@/components/layout/ERPLayout";

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

    <ERPLayout>

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

    </ERPLayout>
  );
}
'@

Set-Content `
  ".\src\app\(private)\operations\page.tsx" `
  $operationsPage

Write-Host "[CREATED] Operations page"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " OPERATIONS DASHBOARD READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-operations-dashboard.ps1"
Write-Host "pnpm build"
Write-Host ""
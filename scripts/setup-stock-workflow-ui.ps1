# =========================================================
# TERRAGEST - STOCK WORKFLOW UI
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " STOCK WORKFLOW UI"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\components\workflow",

  ".\src\components\timeline"
)

foreach ($directory in $directories) {

  if (!(Test-Path $directory)) {

    New-Item `
      -ItemType Directory `
      -Path $directory `
      | Out-Null

    Write-Host "[CREATED] $directory"

  } else {

    Write-Host "[EXISTS]  $directory"
  }
}

# =========================================================
# WORKFLOW STATUS
# =========================================================

$workflowStatus = @'
// src/components/workflow/WorkflowStatus.tsx

interface WorkflowStatusProps {

  status: string;
}

export function WorkflowStatus({

  status
}: WorkflowStatusProps) {

  return (

    <div
      className="
        inline-flex
        items-center
        px-4
        py-2
        rounded-full
        bg-zinc-100
        text-sm
        font-medium
      "
    >
      {status}
    </div>
  );
}
'@

Set-Content `
  ".\src\components\workflow\WorkflowStatus.tsx" `
  $workflowStatus

Write-Host ""
Write-Host "[CREATED] WorkflowStatus.tsx"

# =========================================================
# TIMELINE
# =========================================================

$timeline = @'
// src/components/timeline/Timeline.tsx

interface TimelineEntry {

  id: string;

  label: string;

  date: string;
}

interface TimelineProps {

  entries:
    TimelineEntry[];
}

export function Timeline({

  entries
}: TimelineProps) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
      "
    >

      <h3
        className="
          text-xl
          font-semibold
          mb-6
        "
      >
        Timeline
      </h3>

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

            <div
              className="
                font-medium
              "
            >
              {entry.label}
            </div>

            <div
              className="
                text-sm
                text-zinc-500
              "
            >
              {entry.date}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
'@

Set-Content `
  ".\src\components\timeline\Timeline.tsx" `
  $timeline

Write-Host "[CREATED] Timeline.tsx"

# =========================================================
# UPDATE STOCK DETAILS
# =========================================================

$stockDetails = @'
// src/components/stock/details/StockDetails.tsx

"use client";

import {
  StockItem
}
from "@/domains/stock/store/StockStore";

import { WorkflowStatus }
from "@/components/workflow/WorkflowStatus";

import { Timeline }
from "@/components/timeline/Timeline";

interface StockDetailsProps {

  stock:
    StockItem;
}

export function StockDetails({

  stock
}: StockDetailsProps) {

  const timeline = [

    {

      id: "1",

      label:
        "Stock créé",

      date:
        new Date()
          .toLocaleString()
    },

    {

      id: "2",

      label:
        `Workflow ${stock.workflow}`,

      date:
        new Date()
          .toLocaleString()
    }
  ];

  return (

    <div
      className="
        flex
        flex-col
        gap-6
      "
    >

      <div
        className="
          bg-white
          rounded-2xl
          shadow-sm
          p-6
          flex
          flex-col
          gap-6
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-bold
                mb-2
              "
            >
              {stock.produit}
            </h2>

            <p
              className="
                text-zinc-500
              "
            >
              Détail du stock ERP
            </p>
          </div>

          <WorkflowStatus
            status={
              stock.workflow
            }
          />
        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-6
          "
        >

          <div>

            <div
              className="
                text-sm
                text-zinc-500
                mb-1
              "
            >
              Produit
            </div>

            <div
              className="
                font-medium
              "
            >
              {stock.produit}
            </div>
          </div>

          <div>

            <div
              className="
                text-sm
                text-zinc-500
                mb-1
              "
            >
              Quantité
            </div>

            <div
              className="
                font-medium
              "
            >
              {stock.quantite}
            </div>
          </div>

        </div>

      </div>

      <Timeline
        entries={timeline}
      />

    </div>
  );
}
'@

Set-Content `
  ".\src\components\stock\details\StockDetails.tsx" `
  $stockDetails

Write-Host "[UPDATED] StockDetails.tsx"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " STOCK WORKFLOW UI READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-stock-workflow-ui.ps1"
Write-Host "pnpm build"
Write-Host ""
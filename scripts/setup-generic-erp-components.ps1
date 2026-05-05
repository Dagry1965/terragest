# =========================================================
# TERRAGEST - GENERIC ERP COMPONENTS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " GENERIC ERP COMPONENTS"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\components\erp",

  ".\src\components\erp\datatable",

  ".\src\components\erp\forms",

  ".\src\components\erp\workflow",

  ".\src\components\erp\details",

  ".\src\components\erp\filters"
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
# DATA TABLE
# =========================================================

$dataTable = @'
// src/components/erp/datatable/ERPDataTable.tsx

interface ERPColumn {

  key: string;

  label: string;
}

interface ERPDataTableProps {

  columns:
    ERPColumn[];

  data:
    Record<string, unknown>[];
}

export function ERPDataTable({

  columns,

  data
}: ERPDataTableProps) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        overflow-hidden
      "
    >

      <table
        className="
          w-full
        "
      >

        <thead
          className="
            bg-zinc-100
          "
        >

          <tr>

            {columns.map(column => (

              <th

                key={column.key}

                className="
                  p-4
                  text-left
                "
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>

          {data.map((row, index) => (

            <tr

              key={index}

              className="
                border-t
              "
            >

              {columns.map(column => (

                <td

                  key={column.key}

                  className="
                    p-4
                  "
                >
                  {
                    String(
                      row[
                        column.key
                      ] ?? ""
                    )
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
'@

Set-Content `
  ".\src\components\erp\datatable\ERPDataTable.tsx" `
  $dataTable

Write-Host ""
Write-Host "[CREATED] ERPDataTable.tsx"

# =========================================================
# FORM SECTION
# =========================================================

$formSection = @'
// src/components/erp/forms/ERPFormSection.tsx

import {
  ReactNode
}
from "react";

interface ERPFormSectionProps {

  title: string;

  children:
    ReactNode;
}

export function ERPFormSection({

  title,

  children
}: ERPFormSectionProps) {

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
        {title}
      </h3>

      <div
        className="
          flex
          flex-col
          gap-4
        "
      >
        {children}
      </div>

    </div>
  );
}
'@

Set-Content `
  ".\src\components\erp\forms\ERPFormSection.tsx" `
  $formSection

Write-Host "[CREATED] ERPFormSection.tsx"

# =========================================================
# WORKFLOW ACTIONS
# =========================================================

$workflowActions = @'
// src/components/erp/workflow/WorkflowActions.tsx

interface WorkflowActionsProps {

  onValidate?: () => void;

  onApprove?: () => void;
}

export function WorkflowActions({

  onValidate,

  onApprove
}: WorkflowActionsProps) {

  return (

    <div
      className="
        flex
        gap-4
      "
    >

      <button

        onClick={
          onValidate
        }

        className="
          bg-zinc-800
          text-white
          px-4
          py-3
          rounded-xl
        "
      >
        Valider
      </button>

      <button

        onClick={
          onApprove
        }

        className="
          bg-black
          text-white
          px-4
          py-3
          rounded-xl
        "
      >
        Approuver
      </button>

    </div>
  );
}
'@

Set-Content `
  ".\src\components\erp\workflow\WorkflowActions.tsx" `
  $workflowActions

Write-Host "[CREATED] WorkflowActions.tsx"

# =========================================================
# ENTITY DETAILS
# =========================================================

$entityDetails = @'
// src/components/erp/details/EntityDetailsLayout.tsx

import {
  ReactNode
}
from "react";

interface EntityDetailsLayoutProps {

  title: string;

  subtitle?: string;

  children:
    ReactNode;
}

export function EntityDetailsLayout({

  title,

  subtitle,

  children
}: EntityDetailsLayoutProps) {

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
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-2
          "
        >
          {title}
        </h1>

        {subtitle && (

          <p
            className="
              text-zinc-500
            "
          >
            {subtitle}
          </p>
        )}
      </div>

      {children}

    </div>
  );
}
'@

Set-Content `
  ".\src\components\erp\details\EntityDetailsLayout.tsx" `
  $entityDetails

Write-Host "[CREATED] EntityDetailsLayout.tsx"

# =========================================================
# FILTER BAR
# =========================================================

$filterBar = @'
// src/components/erp/filters/ERPFilterBar.tsx

export function ERPFilterBar() {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-4
        flex
        gap-4
      "
    >

      <input

        placeholder="Recherche..."

        className="
          border
          rounded-xl
          px-4
          py-2
          flex-1
        "
      />

      <button
        className="
          bg-black
          text-white
          px-4
          rounded-xl
        "
      >
        Filtrer
      </button>

    </div>
  );
}
'@

Set-Content `
  ".\src\components\erp\filters\ERPFilterBar.tsx" `
  $filterBar

Write-Host "[CREATED] ERPFilterBar.tsx"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " GENERIC ERP COMPONENTS READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-generic-erp-components.ps1"
Write-Host "pnpm build"
Write-Host ""
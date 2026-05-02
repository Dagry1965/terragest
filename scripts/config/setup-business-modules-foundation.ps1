Write-Host "Generating Terragest Business Modules Foundation..." -ForegroundColor Cyan

# =====================================================
# ROOT PATH
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# BUSINESS MODULES
# =====================================================

$modules = @(
  "exploitations",
  "terrains",
  "products",
  "stocks",
  "interventions",
  "equipments"
)

foreach ($module in $modules) {

  mkdir "$ROOT\src\features\$module" -Force
  mkdir "$ROOT\src\features\$module\components" -Force
  mkdir "$ROOT\src\features\$module\services" -Force
  mkdir "$ROOT\src\features\$module\hooks" -Force
  mkdir "$ROOT\src\features\$module\pages" -Force
}

# =====================================================
# DYNAMIC TABLE COMPONENT
# =====================================================

$tableComponent = @'
interface DataTableProps {

  columns: string[];

  data: any[];
}

export const DataTable = ({
  columns,
  data,
}: DataTableProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      overflow-hidden
    ">

      <table className="
        w-full
      ">

        <thead className="
          bg-gray-100
        ">

          <tr>

            {columns.map(
              (column) => (

                <th
                  key={column}
                  className="
                    text-left
                    px-6
                    py-4
                  "
                >

                  {column}

                </th>

              )
            )}

          </tr>

        </thead>

        <tbody>

          {data.map(
            (
              row,
              index
            ) => (

              <tr
                key={index}
                className="
                  border-t
                "
              >

                {columns.map(
                  (column) => (

                    <td
                      key={column}
                      className="
                        px-6
                        py-4
                      "
                    >

                      {row[column]}

                    </td>

                  )
                )}

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}
'@

Set-Content `
"$ROOT\src\components\ui\DataTable.tsx" `
$tableComponent

# =====================================================
# ENTERPRISE FORM COMPONENT
# =====================================================

$formComponent = @'
"use client";

interface EnterpriseFormProps {

  title: string;

  children: React.ReactNode;

  onSubmit?: any;
}

export const EnterpriseForm = ({
  title,
  children,
  onSubmit,
}: EnterpriseFormProps) => {

  return (

    <form
      onSubmit={onSubmit}
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-8
        space-y-6
      "
    >

      <h1 className="
        text-4xl
        font-bold
      ">
        {title}
      </h1>

      {children}

      <button
        className="
          bg-black
          text-white
          px-6
          py-3
          rounded-xl
        "
      >

        Enregistrer

      </button>

    </form>
  );
}
'@

Set-Content `
"$ROOT\src\components\ui\EnterpriseForm.tsx" `
$formComponent

# =====================================================
# EXPLOITATIONS PAGE
# =====================================================

$exploitationsPage = @'
"use client";

import { AppLayout }
from "@/components/layout/AppLayout";

import { DataTable }
from "@/components/ui/DataTable";

const data = [

  {
    nom: "Exploitation Nord",

    type: "AGRICOLE",

    superficie: 120,
  },

  {
    nom: "Ferme Centrale",

    type: "MIXTE",

    superficie: 300,
  },
];

export default function ExploitationsPage() {

  return (

    <AppLayout>

      <div className="
        space-y-8
      ">

        <div className="
          flex
          items-center
          justify-between
        ">

          <h1 className="
            text-5xl
            font-bold
          ">
            Exploitations
          </h1>

        </div>

        <DataTable
          columns={[
            "nom",
            "type",
            "superficie",
          ]}
          data={data}
        />

      </div>

    </AppLayout>
  );
}
'@

mkdir `
"$ROOT\src\app\exploitations" `
-Force

Set-Content `
"$ROOT\src\app\exploitations\page.tsx" `
$exploitationsPage

# =====================================================
# PRODUCTS PAGE
# =====================================================

$productsPage = @'
"use client";

import { AppLayout }
from "@/components/layout/AppLayout";

import { DataTable }
from "@/components/ui/DataTable";

const data = [

  {
    nom: "Maïs",

    categorie: "AGRICOLE",

    stock: 1200,
  },

  {
    nom: "Engrais NPK",

    categorie: "CONSOMMABLE",

    stock: 250,
  },
];

export default function ProductsPage() {

  return (

    <AppLayout>

      <div className="
        space-y-8
      ">

        <h1 className="
          text-5xl
          font-bold
        ">
          Produits
        </h1>

        <DataTable
          columns={[
            "nom",
            "categorie",
            "stock",
          ]}
          data={data}
        />

      </div>

    </AppLayout>
  );
}
'@

mkdir `
"$ROOT\src\app\products" `
-Force

Set-Content `
"$ROOT\src\app\products\page.tsx" `
$productsPage

# =====================================================
# STOCKS PAGE
# =====================================================

$stocksPage = @'
"use client";

import { AppLayout }
from "@/components/layout/AppLayout";

import { DataTable }
from "@/components/ui/DataTable";

const data = [

  {
    produit: "Maïs",

    quantite: 1200,

    statut: "OK",
  },

  {
    produit: "Semences",

    quantite: 40,

    statut: "ALERTE",
  },
];

export default function StocksPage() {

  return (

    <AppLayout>

      <div className="
        space-y-8
      ">

        <h1 className="
          text-5xl
          font-bold
        ">
          Stocks
        </h1>

        <DataTable
          columns={[
            "produit",
            "quantite",
            "statut",
          ]}
          data={data}
        />

      </div>

    </AppLayout>
  );
}
'@

mkdir `
"$ROOT\src\app\stocks" `
-Force

Set-Content `
"$ROOT\src\app\stocks\page.tsx" `
$stocksPage

# =====================================================
# INTERVENTIONS PAGE
# =====================================================

$interventionsPage = @'
"use client";

import { AppLayout }
from "@/components/layout/AppLayout";

import { DataTable }
from "@/components/ui/DataTable";

const data = [

  {
    type: "Maintenance",

    statut: "EN_COURS",

    technicien: "Jean",
  },

  {
    type: "Inspection",

    statut: "PLANIFIEE",

    technicien: "Marie",
  },
];

export default function InterventionsPage() {

  return (

    <AppLayout>

      <div className="
        space-y-8
      ">

        <h1 className="
          text-5xl
          font-bold
        ">
          Interventions
        </h1>

        <DataTable
          columns={[
            "type",
            "statut",
            "technicien",
          ]}
          data={data}
        />

      </div>

    </AppLayout>
  );
}
'@

mkdir `
"$ROOT\src\app\interventions" `
-Force

Set-Content `
"$ROOT\src\app\interventions\page.tsx" `
$interventionsPage

# =====================================================
# EQUIPMENTS PAGE
# =====================================================

$equipmentsPage = @'
"use client";

import { AppLayout }
from "@/components/layout/AppLayout";

import { DataTable }
from "@/components/ui/DataTable";

const data = [

  {
    nom: "Tracteur A",

    statut: "ACTIF",

    localisation: "Zone Nord",
  },

  {
    nom: "Pompe B",

    statut: "MAINTENANCE",

    localisation: "Zone Sud",
  },
];

export default function EquipmentsPage() {

  return (

    <AppLayout>

      <div className="
        space-y-8
      ">

        <h1 className="
          text-5xl
          font-bold
        ">
          Equipments
        </h1>

        <DataTable
          columns={[
            "nom",
            "statut",
            "localisation",
          ]}
          data={data}
        />

      </div>

    </AppLayout>
  );
}
'@

mkdir `
"$ROOT\src\app\equipments" `
-Force

Set-Content `
"$ROOT\src\app\equipments\page.tsx" `
$equipmentsPage

# =====================================================
# BUSINESS DASHBOARD
# =====================================================

$businessDashboard = @'
"use client";

import { AppLayout }
from "@/components/layout/AppLayout";

import { Card }
from "@/components/ui/Card";

export default function BusinessDashboard() {

  return (

    <AppLayout>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      ">

        <Card title="Exploitations">

          24

        </Card>

        <Card title="Terrains">

          186

        </Card>

        <Card title="Stocks">

          98%

        </Card>

        <Card title="Interventions">

          42

        </Card>

      </div>

    </AppLayout>
  );
}
'@

mkdir `
"$ROOT\src\app\business-dashboard" `
-Force

Set-Content `
"$ROOT\src\app\business-dashboard\page.tsx" `
$businessDashboard

# =====================================================
# DOCUMENTATION
# =====================================================

$businessDoc = @'
# Terragest Business Modules

## Modules

- Exploitations
- Products
- Stocks
- Interventions
- Equipments

--------------------------------------------------

## Shared Components

- DataTable
- EnterpriseForm
- AppLayout

--------------------------------------------------

## Features

- Enterprise dashboards
- Dynamic tables
- Reusable forms
- Business workflows foundation
'@

Set-Content `
"$ROOT\docs\BUSINESS_MODULES.md" `
$businessDoc

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Business Modules Foundation generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Business dashboards"
Write-Host "- Enterprise tables"
Write-Host "- Reusable forms"
Write-Host "- Business pages"
Write-Host "- Operational ERP foundation"
Write-Host ""
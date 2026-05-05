# =========================================================
# TERRAGEST - MAINTENANCE UI ORCHESTRATION
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " MAINTENANCE UI ORCHESTRATION"
Write-Host "========================================="
Write-Host ""

# =========================================================
# MATERIAL DETAILS COMPONENT
# =========================================================

$materialDetails = @'
// src/components/materiels/details/MaterielDetails.tsx

"use client";

import { useRouter }
from "next/navigation";

import {
  MaterielItem
}
from "@/domains/materiels/store/MaterielsStore";

import { MaintenanceWorkflowService }
from "@/domains/maintenance/services/MaintenanceWorkflowService";

interface MaterielDetailsProps {

  materiel:
    MaterielItem;
}

export function MaterielDetails({

  materiel
}: MaterielDetailsProps) {

  const router =
    useRouter();

  function declarePanne() {

    MaintenanceWorkflowService
      .declarePanne(

        materiel.id,

        "Panne déclarée depuis UI"
      );

    router.refresh();
  }

  function resolvePanne() {

    MaintenanceWorkflowService
      .resolvePanne(
        materiel.id
      );

    router.refresh();
  }

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

        <div
          className="
            flex
            items-center
            justify-between
            mb-6
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
              {materiel.nom}
            </h1>

            <p
              className="
                text-zinc-500
              "
            >
              Gestion maintenance matériel
            </p>
          </div>

          <div
            className="
              px-4
              py-2
              rounded-full
              bg-zinc-100
            "
          >
            {materiel.statut}
          </div>

        </div>

        <div
          className="
            flex
            gap-4
          "
        >

          <button

            onClick={
              declarePanne
            }

            className="
              bg-red-600
              text-white
              px-4
              py-3
              rounded-xl
            "
          >
            Déclarer panne
          </button>

          <button

            onClick={
              resolvePanne
            }

            className="
              bg-green-600
              text-white
              px-4
              py-3
              rounded-xl
            "
          >
            Résoudre
          </button>

        </div>

      </div>

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
            text-xl
            font-semibold
            mb-4
          "
        >
          Historique
        </h2>

        <div
          className="
            flex
            flex-col
            gap-3
          "
        >

          {materiel.historique.map(

            (entry, index) => (

              <div

                key={index}

                className="
                  border-l-2
                  border-zinc-300
                  pl-4
                "
              >
                {entry}
              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}
'@

Set-Content `
  ".\src\components\materiels\details\MaterielDetails.tsx" `
  $materialDetails

Write-Host ""
Write-Host "[CREATED] MaterielDetails.tsx"

# =========================================================
# MATERIAL DETAILS PAGE
# =========================================================

$materialPage = @'
// src/app/(private)/materiels/[id]/page.tsx

import { ERPLayout }
from "@/components/layout/ERPLayout";

import { MaterielDetails }
from "@/components/materiels/details/MaterielDetails";

import { MaterielsStore }
from "@/domains/materiels/store/MaterielsStore";

interface MaterielPageProps {

  params: {

    id: string;
  };
}

export default function MaterielPage({

  params
}: MaterielPageProps) {

  const materiel =
    MaterielsStore.find(
      params.id
    );

  if (!materiel) {

    return (

      <ERPLayout>

        <div>
          Matériel introuvable
        </div>

      </ERPLayout>
    );
  }

  return (

    <ERPLayout>

      <div
        className="
          max-w-5xl
        "
      >

        <MaterielDetails
          materiel={materiel}
        />

      </div>

    </ERPLayout>
  );
}
'@

Set-Content `
  ".\src\app\(private)\materiels\[id]\page.tsx" `
  $materialPage

Write-Host "[CREATED] Materiel details page"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " MAINTENANCE UI READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-maintenance-ui-orchestration.ps1"
Write-Host "pnpm build"
Write-Host ""
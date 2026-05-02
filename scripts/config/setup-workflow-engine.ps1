Write-Host "Generating Terragest Workflow Engine..." -ForegroundColor Cyan

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\features\workflow" -Force
mkdir "src\features\workflow\types" -Force
mkdir "src\features\workflow\components" -Force

# =====================================================
# WORKFLOW STATUS TYPE
# =====================================================

$workflowType = @'
export enum WorkflowStatus {

  BROUILLON = "BROUILLON",

  VALIDE = "VALIDE",

  EN_COURS = "EN_COURS",

  TERMINE = "TERMINE",

  REJETE = "REJETE",

  ANNULE = "ANNULE",
}
'@

Set-Content `
"src\features\workflow\types\WorkflowStatus.ts" `
$workflowType

# =====================================================
# WORKFLOW BADGE COMPONENT
# =====================================================

$workflowBadge = @'
import { WorkflowStatus } from "@/features/workflow/types/WorkflowStatus";

interface WorkflowStatusBadgeProps {

  status: WorkflowStatus | string;
}

export const WorkflowStatusBadge = ({
  status,
}: WorkflowStatusBadgeProps) => {

  const getClassName = () => {

    switch (status) {

      case WorkflowStatus.BROUILLON:
        return "bg-gray-200 text-gray-800";

      case WorkflowStatus.VALIDE:
        return "bg-blue-100 text-blue-700";

      case WorkflowStatus.EN_COURS:
        return "bg-yellow-100 text-yellow-700";

      case WorkflowStatus.TERMINE:
        return "bg-green-100 text-green-700";

      case WorkflowStatus.REJETE:
        return "bg-red-100 text-red-700";

      case WorkflowStatus.ANNULE:
        return "bg-black text-white";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (

    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${getClassName()}
      `}
    >
      {status}
    </span>
  );
}
'@

Set-Content `
"src\features\workflow\components\WorkflowStatusBadge.tsx" `
$workflowBadge

# =====================================================
# WORKFLOW ACTIONS COMPONENT
# =====================================================

$workflowActions = @'
import { WorkflowStatus } from "@/features/workflow/types/WorkflowStatus";

interface WorkflowActionsProps {

  status: WorkflowStatus | string;

  onChangeStatus: (
    status: WorkflowStatus
  ) => void;
}

export const WorkflowActions = ({
  status,
  onChangeStatus,
}: WorkflowActionsProps) => {

  return (

    <div className="flex flex-wrap gap-3">

      {status ===
        WorkflowStatus.BROUILLON && (

        <button
          onClick={() =>
            onChangeStatus(
              WorkflowStatus.VALIDE
            )
          }
          className="
            px-4
            py-2
            rounded-xl
            bg-blue-600
            text-white
          "
        >
          Valider
        </button>

      )}

      {status ===
        WorkflowStatus.VALIDE && (

        <button
          onClick={() =>
            onChangeStatus(
              WorkflowStatus.EN_COURS
            )
          }
          className="
            px-4
            py-2
            rounded-xl
            bg-yellow-500
            text-white
          "
        >
          Démarrer
        </button>

      )}

      {status ===
        WorkflowStatus.EN_COURS && (

        <button
          onClick={() =>
            onChangeStatus(
              WorkflowStatus.TERMINE
            )
          }
          className="
            px-4
            py-2
            rounded-xl
            bg-green-600
            text-white
          "
        >
          Terminer
        </button>

      )}

      {status !==
        WorkflowStatus.REJETE &&

       status !==
        WorkflowStatus.TERMINE && (

        <button
          onClick={() =>
            onChangeStatus(
              WorkflowStatus.REJETE
            )
          }
          className="
            px-4
            py-2
            rounded-xl
            bg-red-600
            text-white
          "
        >
          Rejeter
        </button>

      )}

    </div>
  );
}
'@

Set-Content `
"src\features\workflow\components\WorkflowActions.tsx" `
$workflowActions

# =====================================================
# UPDATE INTERVENTION TYPE
# =====================================================

$interventionType = @'
import { WorkflowStatus } from "@/features/workflow/types/WorkflowStatus";

export interface Intervention {

  id: string;

  organisationId: string;

  nom: string;

  categorie: string;

  status: WorkflowStatus;

  createdAt: string;
}
'@

Set-Content `
"src\features\interventions\types\Intervention.ts" `
$interventionType

# =====================================================
# WORKFLOW HISTORY TYPE
# =====================================================

$workflowHistory = @'
export interface WorkflowHistory {

  id: string;

  module: string;

  cibleId: string;

  ancienStatus: string;

  nouveauStatus: string;

  utilisateurId: string;

  utilisateurNom: string;

  createdAt: string;
}
'@

Set-Content `
"src\features\workflow\types\WorkflowHistory.ts" `
$workflowHistory

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Workflow Engine generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- WorkflowStatus"
Write-Host "- WorkflowStatusBadge"
Write-Host "- WorkflowActions"
Write-Host "- WorkflowHistory"
Write-Host "- ERP workflow foundation"
Write-Host ""
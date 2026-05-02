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

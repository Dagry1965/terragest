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

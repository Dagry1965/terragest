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

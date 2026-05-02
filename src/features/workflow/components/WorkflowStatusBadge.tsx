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

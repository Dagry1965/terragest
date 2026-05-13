type ERPWorkflowStatusProps = {
  status: string;
};

const statusLabels: Record<string, string> = {
  DRAFT: "Brouillon",
  PENDING: "En attente",
  VALIDATED: "Validé",
  APPROVED: "Approuvé",
  REJECTED: "Rejeté",
};

export function ERPWorkflowStatus({
  status,
}: ERPWorkflowStatusProps) {
  return (
    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
      {statusLabels[status] ?? status}
    </span>
  );
}
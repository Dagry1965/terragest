import { statusColors }
from "@/ui/theme/status.colors";

interface Props {
  status: string;
}

export function ERPStatusBadge({
  status,
}: Props) {

  const color =
    statusColors[
      status as keyof typeof statusColors
    ] ||
    "bg-gray-100 text-gray-700";

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-medium
        ${color}
      `}
    >
      {status}
    </span>
  );
}

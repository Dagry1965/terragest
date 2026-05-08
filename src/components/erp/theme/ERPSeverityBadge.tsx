import { severityColors }
from "@/ui/theme/severity.colors";

interface Props {
  severity: string;
}

export function ERPSeverityBadge({
  severity,
}: Props) {

  const color =
    severityColors[
      severity as keyof typeof severityColors
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
      {severity}
    </span>
  );
}

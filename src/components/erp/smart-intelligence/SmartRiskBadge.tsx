import { ERPBadge } from "@/components/erp/ui";
import type { SmartRiskLevel } from "@/runtime/smart-intelligence";

interface SmartRiskBadgeProps {
  level: SmartRiskLevel;
}

export function SmartRiskBadge({ level }: SmartRiskBadgeProps) {
  const tone =
    level === "critical"
      ? "danger"
      : level === "high"
        ? "warning"
        : level === "medium"
          ? "info"
          : "success";

  return <ERPBadge tone={tone}>{level}</ERPBadge>;
}
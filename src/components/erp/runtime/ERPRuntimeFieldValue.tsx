import { ERPBadge } from "@/components/erp/ui";
import type { ERPModuleField } from "@/runtime/modules";

interface ERPRuntimeFieldValueProps {
  field: ERPModuleField;
  value: unknown;
}

export function ERPRuntimeFieldValue({
  field,
  value,
}: ERPRuntimeFieldValueProps) {
  if (value === null || value === undefined || value === "") {
    return <span className="text-slate-500">—</span>;
  }

  if (field.type === "status") {
    return <ERPBadge tone="info">{String(value)}</ERPBadge>;
  }

  if (field.type === "boolean") {
    return (
      <ERPBadge tone={value ? "success" : "danger"}>
        {value ? "Oui" : "Non"}
      </ERPBadge>
    );
  }

  if (field.type === "currency") {
    return <span>{Number(value).toLocaleString("fr-FR")} FCFA</span>;
  }

  if (field.type === "date" || field.type === "datetime") {
    return <span>{String(value)}</span>;
  }

  return <span>{String(value)}</span>;
}

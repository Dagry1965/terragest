import { ERPCard } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { ERPRuntimeFieldValue } from "./ERPRuntimeFieldValue";

interface ERPRuntimeDetailsProps {
  module: ERPModule;
  data?: Record<string, unknown>;
}

export function ERPRuntimeDetails({
  module,
  data = {},
}: ERPRuntimeDetailsProps) {
  const details = ERPModuleBuilder.buildDetails(module);

  return (
    <ERPCard
      title={`Détails ${module.metadata.label}`}
      description="Vue détail générée automatiquement par le Runtime ERP."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {details.fields.map((field) => (
          <div
            key={field.key}
            className="rounded-xl border border-slate-800 bg-slate-950 p-4"
          >
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {field.label}
            </p>

            <div className="mt-2 text-sm text-slate-100">
              <ERPRuntimeFieldValue
                field={field}
                value={data[field.key]}
              />
            </div>
          </div>
        ))}
      </div>
    </ERPCard>
  );
}

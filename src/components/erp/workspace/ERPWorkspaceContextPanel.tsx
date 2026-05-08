import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPSecurityContextPanel } from "@/components/erp/security-runtime";

interface ERPWorkspaceContextPanelProps {
  module: ERPModule;
}

export function ERPWorkspaceContextPanel({
  module,
}: ERPWorkspaceContextPanelProps) {
  const features = Object.entries(module.metadata.features ?? {})
    .filter(([, enabled]) => enabled)
    .map(([feature]) => feature);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">
          Contexte module
        </h2>

        <div className="mt-5 space-y-4 text-sm">
          <div>
            <p className="font-bold text-slate-500">Collection</p>
            <p className="mt-1 text-slate-950">{module.schema.collection}</p>
          </div>

          <div>
            <p className="font-bold text-slate-500">Champs</p>
            <p className="mt-1 text-slate-950">{module.schema.fields.length}</p>
          </div>

          <div>
            <p className="font-bold text-slate-500">Capacites</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {features.map((feature) => (
                <ERPBadge key={feature} tone="info">
                  {feature}
                </ERPBadge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ERPSecurityContextPanel />
    </div>
  );
}
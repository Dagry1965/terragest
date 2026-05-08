import { ERPBadge } from "@/components/erp/ui";
import { EnterpriseRuntimeLifecycle } from "@/runtime/enterprise-runtime";

export function EnterpriseRuntimeLifecyclePanel() {
  const steps = EnterpriseRuntimeLifecycle.steps();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">
        Lifecycle enterprise
      </h2>

      <div className="mt-5 space-y-3">
        {steps.map((step) => (
          <div
            key={step.key}
            className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
          >
            <span className="text-sm font-bold text-slate-700">
              {step.label}
            </span>

            <ERPBadge tone={step.completed ? "success" : "warning"}>
              {step.completed ? "OK" : "A finaliser"}
            </ERPBadge>
          </div>
        ))}
      </div>
    </section>
  );
}
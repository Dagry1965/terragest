import { EnterpriseRuntimePerformancePanel } from "./EnterpriseRuntimePerformancePanel";
import { EnterpriseRuntimeDiagnosticsPanel } from "./EnterpriseRuntimeDiagnosticsPanel";
import { EnterpriseRuntimeLifecyclePanel } from "./EnterpriseRuntimeLifecyclePanel";
import { EnterpriseRuntimeGovernancePanel } from "./EnterpriseRuntimeGovernancePanel";

export function EnterpriseRuntimeConsolidationPanel() {
  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-950">
          Enterprise Runtime Consolidation
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Diagnostic central de stabilisation, gouvernance et readiness production.
        </p>
      </div>

      <EnterpriseRuntimePerformancePanel />

      <section className="grid gap-6 xl:grid-cols-3">
        <EnterpriseRuntimeDiagnosticsPanel />
        <EnterpriseRuntimeLifecyclePanel />
        <EnterpriseRuntimeGovernancePanel />
      </section>
    </section>
  );
}
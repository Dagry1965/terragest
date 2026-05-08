import {
  ERPPageHeader,
  ERPSection,
} from "@/components/erp/ui";

import {
  seedERPRuntimeObservability,
} from "@/runtime/observability";

import {
  ERPEventsTimeline,
} from "./ERPEventsTimeline";

import {
  ERPTracesPanel,
} from "./ERPTracesPanel";

import {
  ERPAlertsPanel,
} from "./ERPAlertsPanel";

seedERPRuntimeObservability();

export function ERPRuntimeObservabilityDashboard() {

  return (
    <div className="space-y-8">

      <ERPPageHeader
        eyebrow="ERP Observability"
        title="Runtime Timeline"
        description="Timeline centralisee des events, traces et alertes runtime."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <ERPSection>

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-slate-950">
              Events
            </h2>

          </div>

          <ERPEventsTimeline />

        </ERPSection>

        <ERPSection>

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-slate-950">
              Traces
            </h2>

          </div>

          <ERPTracesPanel />

        </ERPSection>

        <ERPSection>

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-slate-950">
              Alerts
            </h2>

          </div>

          <ERPAlertsPanel />

        </ERPSection>

      </div>

    </div>
  );
}
import {
  ERPPageHeader,
  ERPSection,
} from "@/components/erp/ui";

import {
  seedERPRuntimeAutomation,
} from "@/runtime/automation";

import {
  ERPAutomationTimelinePanel,
} from "./ERPAutomationTimelinePanel";

import {
  ERPNotificationsPanel,
} from "./ERPNotificationsPanel";

seedERPRuntimeAutomation();

export function ERPRuntimeAutomationDashboard() {

  return (
    <div className="space-y-8">

      <ERPPageHeader
        eyebrow="ERP Automation"
        title="Automation Runtime Engine"
        description="Execution des automations, hooks runtime et notifications ERP."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <ERPSection>

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-slate-950">
              Automation timeline
            </h2>

          </div>

          <ERPAutomationTimelinePanel />

        </ERPSection>

        <ERPSection>

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-slate-950">
              Notifications
            </h2>

          </div>

          <ERPNotificationsPanel />

        </ERPSection>

      </div>

    </div>
  );
}
import type { ERPModule } from "@/runtime/modules";
import { ERPSmartInsightsPanel } from "./ERPSmartInsightsPanel";
import { ERPSmartPriorityPanel } from "./ERPSmartPriorityPanel";
import { ERPSmartRecommendationsPanel } from "./ERPSmartRecommendationsPanel";

interface ERPSmartRuntimePanelProps {
  module: ERPModule;
}

export function ERPSmartRuntimePanel({
  module,
}: ERPSmartRuntimePanelProps) {

  return (
    <div className="space-y-6">

      <ERPSmartInsightsPanel module={module} />

      <div className="grid gap-6 xl:grid-cols-2">

        <ERPSmartPriorityPanel module={module} />

        <ERPSmartRecommendationsPanel module={module} />

      </div>

    </div>
  );
}
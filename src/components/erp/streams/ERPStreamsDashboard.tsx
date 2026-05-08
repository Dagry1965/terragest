import {
  ERPPageHeader,
} from "@/components/erp/ui";

import {
  getERPStreamsSnapshot,
  seedERPStreamsRuntime,
} from "@/runtime/streams";

import {
  ERPStreamsMetricsGrid,
} from "./ERPStreamsMetricsGrid";

import {
  ERPStreamsChannelsPanel,
} from "./ERPStreamsChannelsPanel";

import {
  ERPStreamsTimelinePanel,
} from "./ERPStreamsTimelinePanel";

seedERPStreamsRuntime();

export function ERPStreamsDashboard() {

  const snapshot =
    getERPStreamsSnapshot();

  return (
    <div className="space-y-8">

      <ERPPageHeader
        eyebrow="ERP Live Runtime"
        title="Realtime Live Stream Platform"
        description="Live runtime streams, realtime events, workers feeds et observability timeline."
      />

      <ERPStreamsMetricsGrid
        snapshot={snapshot}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <ERPStreamsChannelsPanel
          snapshot={snapshot}
        />

        <ERPStreamsTimelinePanel
          snapshot={snapshot}
        />

      </div>

    </div>
  );
}
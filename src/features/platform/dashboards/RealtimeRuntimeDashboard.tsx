import RuntimeMetricsPanel
from "../components/runtime/RuntimeMetricsPanel";

import WorkflowStatusPanel
from "../components/runtime/WorkflowStatusPanel";

import RealtimeActivityPanel
from "../components/runtime/RealtimeActivityPanel";

import NotificationCenter
from "../components/notifications/NotificationCenter";

export default function
RealtimeRuntimeTableau de bord() {

  return (

    <div
      className="
        grid
        gap-6
      "
    >

      <NotificationCenter />

      <RuntimeMetricsPanel />

      <WorkflowStatusPanel />

      <RealtimeActivityPanel />

    </div>
  );
}

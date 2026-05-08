import RuntimeActivityFeed
from "../components/runtime/RuntimeActivityFeed";

import WorkflowStatusPanel
from "../components/runtime/WorkflowStatusPanel";

import RuntimeMetricsPanel
from "../components/runtime/RuntimeMetricsPanel";

import NotificationCenter
from "../components/notifications/NotificationCenter";

export default function
ConnectedRuntimeDashboard() {

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

      <RuntimeActivityFeed />

    </div>
  );
}

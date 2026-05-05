import LiveRuntimeDashboard
from "../../observability/dashboards/LiveRuntimeDashboard";

import NotificationCenter
from "../components/notifications/NotificationCenter";

export default function
EnterpriseSupervisionDashboard() {

  return (

    <div
      className="
        grid
        gap-6
      "
    >

      <NotificationCenter />

      <LiveRuntimeDashboard />

    </div>
  );
}

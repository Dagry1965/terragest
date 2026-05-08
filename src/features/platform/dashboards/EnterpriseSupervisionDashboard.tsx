import LiveRuntimeTableau de bord
from "../../observability/dashboards/LiveRuntimeTableau de bord";

import NotificationCenter
from "../components/notifications/NotificationCenter";

export default function
EnterpriseSupervisionTableau de bord() {

  return (

    <div
      className="
        grid
        gap-6
      "
    >

      <NotificationCenter />

      <LiveRuntimeTableau de bord />

    </div>
  );
}

import EnterpriseTopbar
from "../components/layout/EnterpriseTopbar";

import EnterpriseSidebar
from "../components/navigation/EnterpriseSidebar";

import ConnectedRuntimeDashboard
from "../dashboards/ConnectedRuntimeDashboard";

export default function
ConnectedEnterpriseWorkspace() {

  return (

    <div
      className="
        flex
        bg-slate-100
      "
    >

      <EnterpriseSidebar />

      <div
        className="
          flex-1
          flex
          flex-col
        "
      >

        <EnterpriseTopbar />

        <main
          className="
            p-8
          "
        >

          <ConnectedRuntimeDashboard />

        </main>

      </div>

    </div>
  );
}

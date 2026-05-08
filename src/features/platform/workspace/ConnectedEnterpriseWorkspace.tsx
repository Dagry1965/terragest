import EnterpriseTopbar
from "../components/layout/EnterpriseTopbar";

import EnterpriseSidebar
from "../components/navigation/EnterpriseSidebar";

import ConnectedRuntimeTableau de bord
from "../dashboards/ConnectedRuntimeTableau de bord";

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

          <ConnectedRuntimeTableau de bord />

        </main>

      </div>

    </div>
  );
}

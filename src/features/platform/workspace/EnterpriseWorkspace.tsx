import EnterpriseTopbar
from "../components/layout/EnterpriseTopbar";

import EnterpriseSidebar
from "../components/navigation/EnterpriseSidebar";

import EnterpriseSupervisionTableau de bord
from "../dashboards/EnterpriseSupervisionTableau de bord";

export default function
EnterpriseWorkspace() {

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

          <EnterpriseSupervisionTableau de bord />

        </main>

      </div>

    </div>
  );
}

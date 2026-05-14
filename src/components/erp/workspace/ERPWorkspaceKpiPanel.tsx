import type {
  ERPWorkspaceKpi,
} from "@/runtime/workspaces/ERPWorkspaceTypes";

interface ERPWorkspaceKpiPanelProps {
  kpis: ERPWorkspaceKpi[];
}

export function ERPWorkspaceKpiPanel({
  kpis,
}: ERPWorkspaceKpiPanelProps) {

  return (

    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      <h2
        className="
          text-sm
          font-semibold
          text-slate-950
        "
      >
        KPI runtime
      </h2>

      <div className="mt-4 space-y-3">

        {kpis.length > 0 ? (

          kpis.map((kpi) => (

            <div
              key={kpi.key}
              className="
                rounded-2xl
                border
                border-slate-100
                bg-slate-50
                p-4
              "
            >

              <p
                className="
                  text-sm
                  font-medium
                  text-slate-900
                "
              >
                {kpi.label}
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                "
              >
                {kpi.value ?? "Valeur runtime Ã  connecter"}
              </p>

            </div>

          ))

        ) : (

          <p className="text-sm text-slate-500">
            Aucun KPI configurÃ©.
          </p>

        )}

      </div>

    </div>

  );
}
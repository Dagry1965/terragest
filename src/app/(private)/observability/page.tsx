"use client";

const workflowExecutions = [
  {
    name: "CREATE_MATERIEL_WORKFLOW",
    status: "COMPLETED",
    step: "Notification",
  },
  {
    name: "CREATE_MAINTENANCE_WORKFLOW",
    status: "RUNNING",
    step: "Validation métier",
  },
  {
    name: "STOCK_ALERT_WORKFLOW",
    status: "PENDING",
    step: "Contrôle seuil",
  },
];

const auditRows = [
  {
    action: "Création matériel",
    entity: "Matériels",
    severity: "Info",
    date: "Aujourd’hui",
  },
  {
    action: "Workflow maintenance lancé",
    entity: "Maintenance",
    severity: "Warning",
    date: "Aujourd’hui",
  },
];

export default function ObservabilityPage() {
  return (
    <div className="p-10 space-y-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
          Terragest ERP Runtime
        </p>

        <h1 className="text-4xl font-bold text-slate-950">
          Observability Center
        </h1>

        <p className="text-slate-500 max-w-3xl">
          Supervision des événements runtime, workflows, audit trail,
          erreurs, exécutions et santé globale du moteur ERP.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {[
          ["Runtime Health", "Healthy", "text-emerald-600"],
          ["Workflows actifs", "3", "text-blue-600"],
          ["Événements traités", "128", "text-slate-900"],
          ["Erreurs critiques", "0", "text-emerald-600"],
        ].map(([label, value, color]) => (
          <div
            key={label}
            className="rounded-3xl border bg-white p-6 shadow-sm"
          >
            <div className="text-sm text-slate-500">{label}</div>
            <div className={`text-3xl font-bold mt-3 ${color}`}>
              {value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">
                Workflow Executions
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Suivi des processus métier exécutés par le runtime.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {workflowExecutions.map((workflow) => (
              <div
                key={workflow.name}
                className="rounded-2xl border p-5 bg-slate-50"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {workflow.name}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      Étape : {workflow.step}
                    </div>
                  </div>

                  <span className="rounded-full bg-slate-900 text-white px-3 py-1 text-xs font-medium">
                    {workflow.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Runtime Stream
          </h2>

          <p className="text-sm text-slate-500 mt-1 mb-6">
            Derniers événements ERP.
          </p>

          <div className="space-y-4">
            {[
              "MATERIEL_CREATED",
              "WORKFLOW_COMPLETED",
              "AUDIT_ENTRY_CREATED",
              "STOCK_THRESHOLD_CHECKED",
            ].map((event) => (
              <div
                key={event}
                className="border-l-4 border-slate-900 pl-4 py-2"
              >
                <div className="font-medium text-sm">{event}</div>
                <div className="text-xs text-slate-500">
                  Runtime event enregistré
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">
          Audit Trail
        </h2>

        <p className="text-sm text-slate-500 mt-1 mb-6">
          Historique des actions métier et techniques.
        </p>

        <div className="overflow-hidden rounded-2xl border">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left px-4 py-3">Action</th>
                <th className="text-left px-4 py-3">Entité</th>
                <th className="text-left px-4 py-3">Sévérité</th>
                <th className="text-left px-4 py-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {auditRows.map((row) => (
                <tr key={row.action} className="border-t">
                  <td className="px-4 py-3">{row.action}</td>
                  <td className="px-4 py-3">{row.entity}</td>
                  <td className="px-4 py-3">{row.severity}</td>
                  <td className="px-4 py-3">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

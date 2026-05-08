import {
  ERPPageHeader,
  ERPSection,
  ERPStatCard,
} from "@/components/erp/ui";

import {
  getERPPersistenceSnapshot,
  seedERPPersistenceRuntime,
} from "@/runtime/persistence";

export default async function ERPPersistenceDashboard() {
  await seedERPPersistenceRuntime();

  const snapshot =
    await getERPPersistenceSnapshot();

  const cards = [
    ["Events", snapshot.events.length],
    ["Traces", snapshot.traces.length],
    ["Alerts", snapshot.alerts.length],
    ["Workflows", snapshot.workflows.length],
    ["Queue Jobs", snapshot.queueJobs.length],
    ["Audit", snapshot.audit.length],
    ["Security Audit", snapshot.securityAudit.length],
    ["Total", snapshot.total],
  ] as const;

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="ERP Persistence"
        title="Persistence Runtime Enterprise"
        description="Repository runtime tenant-aware pour events, traces, alerts, workflows, queue jobs et audit."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {cards.map(([label, value]) => (
          <ERPStatCard
            key={label}
            label={label}
            value={value}
            helper="Persisted runtime"
          />
        ))}
      </div>

      <ERPSection>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-950">
            Collections runtime
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Couche de persistance generique prete pour Firestore ou autre backend.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">
                  Collection
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">
                  Records
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {cards.map(([label, value]) => (
                <tr key={label}>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {label}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ERPSection>
    </div>
  );
}
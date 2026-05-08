import { ERPSection } from "@/components/erp/ui";
import type { getERPCockpitSnapshot } from "@/runtime/cockpit";

type Snapshot = ReturnType<typeof getERPCockpitSnapshot>;

type ERPCockpitModuleMatrixProps = {
  snapshot: Snapshot;
};

export function ERPCockpitModuleMatrix({
  snapshot,
}: ERPCockpitModuleMatrixProps) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Matrice modules ERP
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Controle de couverture runtime par module.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Module</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Fields</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Actions</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Workflows</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Events</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Automation</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Permissions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {snapshot.modules.map((module) => (
              <tr key={module.key}>
                <td className="px-4 py-3 font-medium text-slate-900">{module.label}</td>
                <td className="px-4 py-3 text-slate-600">{module.schema.fields.length}</td>
                <td className="px-4 py-3 text-slate-600">{module.actions.length}</td>
                <td className="px-4 py-3 text-slate-600">{module.workflows.length}</td>
                <td className="px-4 py-3 text-slate-600">{module.events.length}</td>
                <td className="px-4 py-3 text-slate-600">{module.automation.length}</td>
                <td className="px-4 py-3 text-slate-600">{module.permissions.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ERPSection>
  );
}
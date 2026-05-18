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
        <h2 className="text-lg font-semibold text-white">
          Matrice modules ERP
        </h2>
        <p className="mt-1 text-sm text-slate-300">
          Controle de couverture runtime par module.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-[#020807]">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-300">Module</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-300">Fields</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-300">Actions</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-300">Workflows</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-300">Events</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-300">Automation</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-300">Permissions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-[#0B201D]">
            {snapshot.modules.map((module) => (
              <tr key={module.key}>
                <td className="px-4 py-3 font-medium text-white">{module.label}</td>
                <td className="px-4 py-3 text-slate-300">{module.schema.fields.length}</td>
                <td className="px-4 py-3 text-slate-300">{module.actions.length}</td>
                <td className="px-4 py-3 text-slate-300">{module.workflows.length}</td>
                <td className="px-4 py-3 text-slate-300">{module.events.length}</td>
                <td className="px-4 py-3 text-slate-300">{module.automation.length}</td>
                <td className="px-4 py-3 text-slate-300">{module.permissions.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ERPSection>
  );
}
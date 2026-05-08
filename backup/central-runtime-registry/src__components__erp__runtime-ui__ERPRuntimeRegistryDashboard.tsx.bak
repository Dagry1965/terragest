import {
  ERPPageHeader,
  ERPSection,
  ERPStatCard,
} from "@/components/erp/ui";

import {
  ERPRegistry,
} from "@/runtime/registry";

export function ERPRuntimeRegistryDashboard() {

  const modules =
    ERPRegistry.modules();

  const navigation =
    ERPRegistry.navigation();

  return (
    <div className="space-y-8">

      <ERPPageHeader
        eyebrow="ERP Runtime"
        title="Central Runtime Registry"
        description="Source unique de verite ERP pour modules, schemas, actions, workflows, permissions et automation."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">

        <ERPStatCard
          label="Modules"
          value={modules.length}
          helper="Modules enregistres"
        />

        <ERPStatCard
          label="Navigation"
          value={navigation.length}
          helper="Routes runtime"
        />

        <ERPStatCard
          label="Schemas"
          value={modules.length}
          helper="Schemas centralises"
        />

        <ERPStatCard
          label="Automation"
          value="Active"
          helper="Runtime ERP"
        />

      </div>

      <ERPSection>

        <div className="overflow-hidden rounded-2xl border border-slate-200">

          <table className="w-full text-sm">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-4 py-3 text-left font-semibold">
                  Module
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Fields
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Actions
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Workflows
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Events
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {modules.map((module) => (

                <tr key={module.key}>

                  <td className="px-4 py-3">
                    {module.label}
                  </td>

                  <td className="px-4 py-3">
                    {module.schema.fields.length}
                  </td>

                  <td className="px-4 py-3">
                    {module.actions.length}
                  </td>

                  <td className="px-4 py-3">
                    {module.workflows.length}
                  </td>

                  <td className="px-4 py-3">
                    {module.events.length}
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
"use client";

export function ERPExecutiveDashboard() {
  return (
    <div className="p-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          ERP Executive Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Vue exécutive globale de Terragest ERP.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="text-sm text-gray-500">Modules</div>
          <div className="text-3xl font-bold">8</div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="text-sm text-gray-500">Workflows</div>
          <div className="text-3xl font-bold">12</div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="text-sm text-gray-500">Automations</div>
          <div className="text-3xl font-bold">6</div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="text-sm text-gray-500">Santé runtime</div>
          <div className="text-green-600 font-semibold mt-2">Healthy</div>
        </div>
      </div>
    </div>
  );
}

export default ERPExecutiveDashboard;

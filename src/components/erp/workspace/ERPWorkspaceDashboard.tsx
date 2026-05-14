import type {
  ERPWorkspaceContext,
} from "@/runtime/workspaces/ERPWorkspaceContext";

import {
  ERPWorkspaceRuntimeWidgets,
} from "./ERPWorkspaceRuntimeWidgets";

import {
  ERPWorkspaceModulesPanel,
} from "./ERPWorkspaceModulesPanel";

import {
  ERPWorkspaceKpiPanel,
} from "./ERPWorkspaceKpiPanel";

import {
  ERPWorkspaceQuickActionsPanel,
} from "./ERPWorkspaceQuickActionsPanel";

interface ERPWorkspaceDashboardProps {
  context: ERPWorkspaceContext;
}

export function ERPWorkspaceDashboard({
  context,
}: ERPWorkspaceDashboardProps) {

  return (

    <main className="space-y-8">

      <section
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
        "
      >

        <p
          className="
            text-sm
            font-medium
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          Workspace ERP
        </p>

        <h1
          className="
            mt-2
            text-3xl
            font-semibold
            tracking-tight
            text-slate-950
          "
        >
          {context.workspace.label}
        </h1>

        <p
          className="
            mt-3
            max-w-3xl
            text-sm
            leading-6
            text-slate-600
          "
        >
          {context.workspace.description}
        </p>

      </section>

      <section
        className="
          grid
          gap-6
          lg:grid-cols-3
        "
      >

        <ERPWorkspaceKpiPanel
          kpis={context.kpis}
        />

        <ERPWorkspaceModulesPanel
          modules={context.modules}
        />

      </section>

      <ERPWorkspaceQuickActionsPanel
        quickActions={context.quickActions}
      />

      <ERPWorkspaceRuntimeWidgets
        widgets={context.widgets}
      />

    </main>

  );
}
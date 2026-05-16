import Link from "next/link";

import type {
  ERPWorkspaceQuickAction,
} from "@/runtime/workspaces/ERPWorkspaceTypes";

interface ERPWorkspaceQuickActionsPanelProps {
  quickActions: ERPWorkspaceQuickAction[];
}

export function ERPWorkspaceQuickActionsPanel({
  quickActions,
}: ERPWorkspaceQuickActionsPanelProps) {

  return (

    <section
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
        Actions rapides
      </h2>

      <div
        className="
          mt-4
          flex
          flex-wrap
          gap-3
        "
      >

        {quickActions.length > 0 ? (

          quickActions.map((action) => (

            <Link
              key={action.key}
              href={action.href}
              className="
                rounded-2xl
                border
                border-slate-200
                px-4
                py-2
                text-sm
                font-medium
                text-slate-700
                transition
                hover:border-slate-400
                hover:bg-slate-50
              "
            >
              {action.label}
            </Link>

          ))

        ) : (

          <p className="text-sm text-slate-500">
            Aucune action rapide configurÃ©e.
          </p>

        )}

      </div>

    </section>

  );
}
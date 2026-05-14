import Link from "next/link";

import type {
  ERPWorkspaceModule,
} from "@/runtime/workspaces/ERPWorkspaceTypes";

interface ERPWorkspaceModulesPanelProps {
  modules: ERPWorkspaceModule[];
}

export function ERPWorkspaceModulesPanel({
  modules,
}: ERPWorkspaceModulesPanelProps) {

  return (

    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        lg:col-span-2
      "
    >

      <h2
        className="
          text-sm
          font-semibold
          text-slate-950
        "
      >
        Modules du workspace
      </h2>

      <div
        className="
          mt-4
          grid
          gap-4
          md:grid-cols-2
        "
      >

        {modules.map((module) => (

          <Link
            key={module.key}
            href={`/${module.key}`}
            className="
              rounded-2xl
              border
              border-slate-100
              bg-slate-50
              p-4
              transition
              hover:border-slate-300
              hover:bg-white
            "
          >

            <p
              className="
                text-sm
                font-medium
                text-slate-900
              "
            >
              {module.label}
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              Ouvrir le module {module.label}
            </p>

          </Link>

        ))}

      </div>

    </div>

  );
}
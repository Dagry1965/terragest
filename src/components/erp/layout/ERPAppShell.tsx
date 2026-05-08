import type { ReactNode } from "react";
import { ERPBadge } from "@/components/erp/ui";
import { coreERPModules } from "@/runtime/modules";

interface ERPAppShellProps {
  children: ReactNode;
  activeModule?: string;
}

export function ERPAppShell({ children, activeModule }: ERPAppShellProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <div className="grid min-h-screen grid-cols-1 xl:grid-cols-[300px_1fr]">
        <aside className="hidden border-r border-slate-200 bg-slate-950 p-6 text-white xl:block">
          <div className="mb-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-black">
              TG
            </div>

            <h1 className="mt-5 text-2xl font-black">
              Terragest ERP
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Enterprise Runtime Platform
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <ERPBadge tone="success">ERP Core</ERPBadge>
            <ERPBadge tone="info">Runtime</ERPBadge>
          </div>

          <nav className="space-y-2">
            {coreERPModules.map((item) => {
              const active = activeModule === item.metadata.key;

              return (
                <a
                  key={item.metadata.key}
                  href={`/${item.metadata.key}`}
                  className={`block rounded-2xl px-4 py-3 text-sm transition ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="font-bold">{item.metadata.label}</div>
                  <div className="mt-1 text-xs opacity-70">
                    {item.metadata.category ?? "Module ERP"}
                  </div>
                </a>
              );
            })}
          </nav>
        </aside>

        <main className="p-6 md:p-8 xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
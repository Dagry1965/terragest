"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  useAuth,
} from "@/providers/AuthProvider";

import {
  getERPWorkspacesNavigation,
} from "@/runtime/navigation/ERPNavigationEngine";

import {
  ERPSessionRuntime,
} from "@/runtime/security/sessions/ERPSessionRuntime";

export function ErpSidebar() {
  const pathname = usePathname();

  const { loading, user } = useAuth();

  if (loading) {
    return (
      <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 text-white lg:block">
        <div className="p-6 text-sm text-slate-400">
          Chargement navigation...
        </div>
      </aside>
    );
  }

  const navigation = getERPWorkspacesNavigation();
  const session = ERPSessionRuntime.getSession();

  if (navigation.length === 0) {
    return (
      <aside className="hidden w-72 shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-950 p-4 text-white lg:block">
        <div className="mb-6 rounded-2xl bg-red-950/60 p-4">
          <p className="text-sm font-bold text-red-200">
            Navigation vide
          </p>

          <p className="mt-2 text-xs text-red-100">
            La session runtime ne donne accès à aucun workspace/module.
          </p>
        </div>

        <pre className="whitespace-pre-wrap break-words rounded-2xl bg-slate-900 p-3 text-[11px] text-slate-300">
          {JSON.stringify(
            {
              firebaseUser: user
                ? {
                    uid: user.uid,
                    email: user.email,
                  }
                : null,
              session,
              navigation,
            },
            null,
            2
          )}
        </pre>
      </aside>
    );
  }

  return (
    <aside className="hidden w-72 shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-950 text-white lg:block">
      <div className="flex h-20 items-center border-b border-slate-800 px-6">
        <div>
          <div className="text-2xl font-black tracking-tight">
            Terragest
          </div>
          <div className="text-xs font-bold uppercase tracking-wide text-blue-300">
            ERP Enterprise
          </div>
        </div>
      </div>

      <nav className="space-y-6 px-4 py-6">
        {navigation.map((workspace) => {
          const workspaceActive =
            pathname === workspace.href ||
            pathname.startsWith(`${workspace.href}/`);

          return (
            <div key={workspace.key}>
              <Link
                href={workspace.href}
                className={[
                  "flex rounded-2xl px-4 py-3 text-sm font-black transition",
                  workspaceActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-950/40"
                    : "text-white hover:bg-slate-800",
                ].join(" ")}
              >
                {workspace.label}
              </Link>

              <div className="mt-2 space-y-1 pl-3">
                {workspace.modules.map((module) => {
                  const active =
                    pathname === module.href ||
                    pathname.startsWith(`${module.href}/`);

                  return (
                    <Link
                      key={module.key}
                      href={module.href}
                      className={[
                        "flex rounded-2xl px-4 py-2 text-sm font-semibold transition",
                        active
                          ? "bg-slate-800 text-white"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white",
                      ].join(" ")}
                    >
                      {module.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
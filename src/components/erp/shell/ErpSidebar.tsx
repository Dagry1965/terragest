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

type SidebarModule = {
  key: string;
  label: string;
  href: string;
};

type SidebarWorkspace = {
  key: string;
  label: string;
  href: string;
  modules: SidebarModule[];
};

const amarkhysModules: SidebarModule[] = [
  {
    key: "dashboard-amarkhys",
    label: "Cockpit AMARKHYS",
    href: "/dashboard/amarkhys",
  },
  {
    key: "clientsauto",
    label: "Clients",
    href: "/clientsauto",
  },
  {
    key: "vehicules",
    label: "Véhicules",
    href: "/vehicules",
  },
  {
    key: "rendezvous",
    label: "Rendez-vous",
    href: "/rendezvous",
  },
  {
    key: "interventionsauto",
    label: "Interventions",
    href: "/interventionsauto",
  },
  {
    key: "facturesauto",
    label: "Factures",
    href: "/facturesauto",
  },
  {
    key: "rappelsauto",
    label: "Rappels",
    href: "/rappelsauto",
  },
  {
    key: "produitsauto",
    label: "Produits",
    href: "/produitsauto",
  },
  {
    key: "stocksauto",
    label: "Stocks",
    href: "/stocksauto",
  },
];

const amarkhysWorkspace: SidebarWorkspace = {
  key: "amarkhys",
  label: "AMARKHYS Garage",
  href: "/dashboard/amarkhys",
  modules: amarkhysModules,
};

function isAmarkhysPath(
  pathname: string
): boolean {
  return (
    pathname === "/dashboard/amarkhys" ||
    pathname.startsWith("/dashboard/amarkhys/") ||
    pathname === "/clientsauto" ||
    pathname.startsWith("/clientsauto/") ||
    pathname === "/vehicules" ||
    pathname.startsWith("/vehicules/") ||
    pathname === "/rendezvous" ||
    pathname.startsWith("/rendezvous/") ||
    pathname === "/interventionsauto" ||
    pathname.startsWith("/interventionsauto/") ||
    pathname === "/facturesauto" ||
    pathname.startsWith("/facturesauto/") ||
    pathname === "/rappelsauto" ||
    pathname.startsWith("/rappelsauto/") ||
    pathname === "/produitsauto" ||
    pathname.startsWith("/produitsauto/") ||
    pathname === "/stocksauto" ||
    pathname.startsWith("/stocksauto/")
  );
}

function getSidebarNavigation(
  pathname: string
): SidebarWorkspace[] {
  if (isAmarkhysPath(pathname)) {
    return [amarkhysWorkspace];
  }

  return getERPWorkspacesNavigation();
}

export function ErpSidebar() {
  const pathname = usePathname();

  const { loading, user } = useAuth();

  if (loading) {
    return (
      <aside className="hidden h-[calc(100vh-1.5rem)] w-72 shrink-0 overflow-hidden rounded-[34px] border border-white/45 bg-[rgba(248,250,252,0.42)] p-3 text-[#0F172A] shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl lg:sticky lg:top-3 lg:ml-3 lg:my-3 lg:block">
        <div className="p-6 text-sm text-[#64748B]">
          Chargement navigation...
        </div>
      </aside>
    );
  }

  const navigation = getSidebarNavigation(pathname);
  const session = ERPSessionRuntime.getSession();

  if (navigation.length === 0) {
    return (
      <aside className="hidden h-[calc(100vh-1.5rem)] w-72 shrink-0 overflow-hidden rounded-[34px] border border-white/45 bg-[rgba(248,250,252,0.42)] p-3 text-[#0F172A] shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl lg:sticky lg:top-3 lg:ml-3 lg:my-3 lg:block">
        <div className="mb-6 rounded-2xl bg-red-50 p-4">
          <p className="text-sm font-bold text-red-700">
            Navigation vide
          </p>

          <p className="mt-2 text-xs text-red-100">
            La session runtime ne donne accès à aucun workspace/module.
          </p>
        </div>

        <pre className="whitespace-pre-wrap break-words rounded-2xl bg-[rgba(255,255,255,0.72)] p-3 text-[11px] text-[#475569]">
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

  const isAmarkhys =
    isAmarkhysPath(pathname);

  return (
    <aside className="hidden h-[calc(100vh-1.5rem)] w-72 shrink-0 overflow-hidden rounded-[34px] border border-white/45 bg-[rgba(248,250,252,0.42)] p-3 text-[#0F172A] shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl lg:sticky lg:top-3 lg:ml-3 lg:my-3 lg:block">
      <div className="mb-4 flex h-20 items-center rounded-[30px] border border-white/55 bg-white/55 px-5 shadow-[0_14px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div>
          <div className="text-2xl font-black tracking-tight">
            {isAmarkhys ? "AMARKHYS" : "Terragest"}
          </div>
          <div className="text-xs font-black uppercase tracking-[0.22em] text-[#064E3B]">
            {isAmarkhys ? (
              <span className="text-[#064E3B]">Garage ERP</span>
            ) : (
              "ERP Enterprise"
            )}
          </div>
        </div>
      </div>

      <nav className="max-h-[calc(100vh-8.5rem)] space-y-5 overflow-y-auto rounded-[28px] px-2 py-2 pr-1">
        {navigation.map((workspace) => {
          const workspaceActive =
            pathname === workspace.href ||
            pathname.startsWith(`${workspace.href}/`) ||
            workspace.modules.some(
              (module) =>
                pathname === module.href ||
                pathname.startsWith(`${module.href}/`)
            );

          return (
            <div key={workspace.key}>
              <Link
                href={workspace.href}
                className={[
                  "flex rounded-2xl px-4 py-3 text-sm font-black transition",
                  workspaceActive
                    ? "rounded-[999px] border border-[#8EDFD4]/70 bg-[linear-gradient(135deg,#F8FFFC_0%,#DDF8F1_100%)] text-[#064E3B] shadow-[0_14px_32px_rgba(0,166,138,0.16),inset_0_1px_0_rgba(255,255,255,0.72)] scale-[1.025] -translate-y-0.5"
                    : "rounded-[999px] border border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(248,250,252,0.58))] text-[#475569] shadow-[0_8px_22px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.75)] hover:scale-[1.035] hover:-translate-y-0.5 hover:border-[#8EDFD4]/70 hover:bg-[linear-gradient(135deg,#F8FFFC_0%,#DDF8F1_100%)] hover:text-[#064E3B] hover:shadow-[0_14px_32px_rgba(0,166,138,0.16),inset_0_1px_0_rgba(255,255,255,0.72)]",
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
                          ? "rounded-[999px] border border-[#8EDFD4]/70 bg-[linear-gradient(135deg,#F8FFFC_0%,#DDF8F1_100%)] text-[#064E3B] shadow-[0_14px_32px_rgba(0,166,138,0.16),inset_0_1px_0_rgba(255,255,255,0.72)] scale-[1.025] -translate-y-0.5"
                          : "rounded-[999px] border border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(248,250,252,0.58))] text-[#475569] shadow-[0_8px_22px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.75)] hover:scale-[1.035] hover:-translate-y-0.5 hover:border-[#8EDFD4]/70 hover:bg-[linear-gradient(135deg,#F8FFFC_0%,#DDF8F1_100%)] hover:text-[#064E3B] hover:shadow-[0_14px_32px_rgba(0,166,138,0.16),inset_0_1px_0_rgba(255,255,255,0.72)]",
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

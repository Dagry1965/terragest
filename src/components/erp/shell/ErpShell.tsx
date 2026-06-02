"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ErpSidebar } from "./ErpSidebar";
import { ERPTopBar } from "@/components/erp/layout/ERPTopBar";

type Props = {
  children: ReactNode;
};

const OPERATIONAL_FULLSCREEN_ROUTES = [
  "/produitsauto/hub",
] as const;

function isOperationalFullscreenRoute(pathname: string | null): boolean {
  if (!pathname) {
    return false;
  }

  return OPERATIONAL_FULLSCREEN_ROUTES.some((route) => {
    return pathname === route || pathname.startsWith(route + "/");
  });
}

function OperationalSidebarHover() {
  return (
    <aside className="group/sidebar fixed inset-y-0 left-0 z-50 flex translate-x-[calc(-100%+18px)] transition duration-300 ease-out hover:translate-x-0">
      <div className="h-screen shadow-2xl shadow-slate-950/20">
        <ErpSidebar />
      </div>

      <div className="flex h-screen w-[34px] items-center justify-center">
        <div className="flex h-36 w-8 items-center justify-center rounded-r-2xl border border-l-0 border-emerald-200 bg-white/95 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-700 shadow-lg shadow-slate-900/10 backdrop-blur-xl [writing-mode:vertical-rl]">
          Menu
        </div>
      </div>
    </aside>
  );
}

export function ErpShell({ children }: Props) {
  const pathname = usePathname();
  const operationalFullscreen = isOperationalFullscreenRoute(pathname);

  if (operationalFullscreen) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <OperationalSidebarHover />

        <main className="min-h-screen w-full">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <ErpSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <ERPTopBar title="Terragest ERP" />

          <main className="flex-1 px-6 py-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
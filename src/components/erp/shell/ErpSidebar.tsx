"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildERPNavigation } from "@/core/navigation/navigation-builder";

const groups = ["Pilotage", "MÃ©tier", "OpÃ©rations", "Finance", "SystÃ¨me"];

export function ErpSidebar() {
  const pathname = usePathname();
  const navigation = buildERPNavigation();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-20 items-center border-b border-slate-200 px-6">
        <div>
          <div className="text-xl font-bold tracking-tight text-slate-950">
            Terragest
          </div>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            ERP Enterprise
          </div>
        </div>
      </div>

      <nav className="space-y-8 px-4 py-6">
        {groups.map((group) => {
          const items = navigation.filter((item) => item.group === group);

          if (items.length === 0) {
            return null;
          }

          return (
            <div key={group}>
              <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {group}
              </div>

              <div className="space-y-1">
                {items.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={[
                        "flex rounded-xl px-3 py-2.5 text-sm font-medium transition",
                        active
                          ? "bg-slate-900 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                      ].join(" ")}
                    >
                      {item.label}
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

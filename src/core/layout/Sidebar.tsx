"use client";

import Link from "next/link";

const items = [
  ["Dashboard", "/dashboard"],
  ["Exploitations", "/exploitations"],
  ["Terrains", "/terrains"],
  ["MatÃ©riels", "/materiels"],
  ["Maintenance", "/maintenance"],
  ["Interventions", "/interventions/workflow"],
  ["Stocks", "/stocks"],
  ["Produits", "/produits"],
  ["Notifications", "/notifications"],
  ["Observability", "/observability"],
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-200/40 backdrop-blur-xl">
      <div className="mb-8 rounded-3xl bg-slate-950 p-5 text-white shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
          ERP Suite
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          Terragest
        </h1>

        <p className="mt-1 text-sm text-slate-300">
          Enterprise Runtime
        </p>
      </div>

      <nav className="space-y-1">
        {items.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-950"
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

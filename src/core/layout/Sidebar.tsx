"use client";

import Link from "next/link";

const items = [
  ["Dashboard", "/dashboard"],
  ["Exploitations", "/exploitations"],
  ["Terrains", "/terrains"],
  ["Matériels", "/materiels"],
  ["Maintenance", "/maintenance"],
  ["Interventions", "/interventions"],
  ["Stocks", "/stocks"],
  ["Produits", "/produits"],
  ["Notifications", "/notifications"],
  ["Runtime Supervision", "/runtime-supervision"],
  ["Observability", "/observability"],
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white p-5">
      <h1 className="mb-6 text-xl font-bold">
        Terragest
      </h1>

      <nav className="space-y-1">
        {items.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

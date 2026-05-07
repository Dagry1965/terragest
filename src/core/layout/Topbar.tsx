"use client";

export function Topbar() {
  return (
    <header className="h-16 border-b bg-white px-8 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">
          ERP Terragest
        </p>
        <h2 className="font-semibold">
          Cockpit opérationnel
        </h2>
      </div>

      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
        Runtime actif
      </span>
    </header>
  );
}

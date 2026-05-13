export function ErpTopbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
      <div>
        <h1 className="text-xl font-black tracking-tight text-slate-950">
          Terragest ERP
        </h1>
        <p className="text-sm text-slate-500">
          Cockpit central de gestion des operations, ressources et activites.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
          Systeme operationnel
        </div>

        <div className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
          ERP Enterprise
        </div>
      </div>
    </header>
  );
}
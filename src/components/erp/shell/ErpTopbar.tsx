export function ErpTopbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
      <div>
        <h1 className="text-lg font-semibold text-slate-950">
          Pilotage ERP
        </h1>
        <p className="text-sm text-slate-500">
          Interface pilotÃ©e par le moteur ERP central Terragest_V2.
        </p>
      </div>

      <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
        ERP Core actif
      </div>
    </header>
  );
}

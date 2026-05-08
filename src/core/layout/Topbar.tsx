export function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h1 className="text-xl font-black text-slate-950">
          Terragest ERP
        </h1>
        <p className="text-sm text-slate-500">
          Gestion centralisee des modules, operations et indicateurs.
        </p>
      </div>

      <div className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
        Donnees synchronisees
      </div>
    </header>
  );
}
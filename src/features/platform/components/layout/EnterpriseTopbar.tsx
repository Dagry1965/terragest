export default function EnterpriseTopbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h1 className="text-xl font-black text-slate-950">
          Terragest ERP
        </h1>
        <p className="text-sm text-slate-500">
          Pilotage central des operations et activites metier.
        </p>
      </div>

      <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
        Systeme actif
      </div>
    </header>
  );
}

export { EnterpriseTopbar };
export function ERPRuntimeHealthPanel() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-950">
        Synthese operationnelle
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        Indicateurs de suivi metier, activite recente et priorites du module.
      </p>

      <div className="mt-6 space-y-4">
        {[
          ["Disponibilite", "94%"],
          ["Qualite des donnees", "98%"],
          ["Actions en attente", "6"],
        ].map(([label, value]) => (
          <div key={label}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-500">{label}</span>
              <span className="font-bold text-slate-950">{value}</span>
            </div>

            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-2 w-[88%] rounded-full bg-blue-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
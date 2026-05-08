import { getEnabledModules } from "@/core/modules/module-registry";

export function ErpTableau de bord() {
  const modules = getEnabledModules();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-slate-950 p-8 text-white shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-400">
          Terragest_V2
        </p>

        <h2 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight">
          ERP de pilotage agricole, patrimonial et opÃ©rationnel.
        </h2>

        <p className="mt-4 max-w-3xl text-slate-300">
          Cette Ã©bauche sâ€™appuie sur le ModuleRegistry, les modules mÃ©tier,
          les workflows, lâ€™audit, la supervision et le moteur ERP central.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Modules actifs
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-950">
            {modules.length}
          </div>
          <div className="mt-2 text-sm text-slate-500">
            PilotÃ©s par le registry central
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Workflows
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-950">
            Actifs
          </div>
          <div className="mt-2 text-sm text-slate-500">
            Orchestration mÃ©tier prÃ©vue
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Audit
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-950">
            TraÃ§able
          </div>
          <div className="mt-2 text-sm text-slate-500">
            Historique des actions ERP
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Supervision
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-950">
            CentralisÃ©e
          </div>
          <div className="mt-2 text-sm text-slate-500">
            Monitoring global du runtime
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-950">
          Modules ERP disponibles
        </h3>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => (
            <div
              key={module.key}
              className="rounded-xl border border-slate-100 bg-slate-50 p-5"
            >
              <div className="text-base font-semibold text-slate-950">
                {module.pluralLabel}
              </div>

              <p className="mt-2 text-sm text-slate-500">
                {module.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {module.features?.workflow && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
                    Workflow
                  </span>
                )}

                {module.features?.audit && (
                  <span className="rounded-full bg-violet-50 px-3 py-1 font-medium text-violet-700">
                    Audit
                  </span>
                )}

                {module.features?.supervision && (
                  <span className="rounded-full bg-amber-50 px-3 py-1 font-medium text-amber-700">
                    Supervision
                  </span>
                )}

                {module.features?.notifications && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
                    Notifications
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

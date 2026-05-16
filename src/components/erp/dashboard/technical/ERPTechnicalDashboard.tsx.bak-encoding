"use client";

const technicalBlocks = [
  "Runtime Engine",
  "Workflows",
  "Domain Events",
  "Queues",
  "Retries",
  "Dead Letter Queue",
  "Audit",
  "Observability",
  "Firestore Mutations",
  "Business Rules Engine",
];

export function ERPTechnicalDashboard() {
  return (
    <main className="space-y-8 p-8">
      <section className="rounded-3xl border bg-slate-950 p-8 text-white shadow-sm">
        <p className="text-sm font-medium text-cyan-300">
          Tableau de bord technique
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Supervision ERP Runtime
        </h1>

        <p className="mt-3 max-w-3xl text-slate-300">
          Suivi du moteur ERP : Ã©vÃ©nements, workflows, files dâ€™attente,
          rÃ¨gles mÃ©tier, audit, logs, mutations et santÃ© systÃ¨me.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {technicalBlocks.map((block) => (
          <div
            key={block}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">Module technique</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">
              {block}
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Zone rÃ©servÃ©e Ã  la supervision technique du moteur ERP.
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">
          SÃ©paration validÃ©e
        </h2>

        <p className="mt-3 text-sm text-slate-600">
          Ce dashboard ne doit pas contenir de KPI mÃ©tier comme les terrains,
          campagnes, stocks ou revenus. Il est rÃ©servÃ© au fonctionnement interne
          de la plateforme.
        </p>
      </section>
    </main>
  );
}
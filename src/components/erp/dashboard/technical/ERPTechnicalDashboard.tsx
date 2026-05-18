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
    <main className="space-y-5 sm:space-y-4 sm:space-y-5 lg:space-y-6 lg:space-y-8 p-4 sm:p-4 sm:p-4 sm:p-5 lg:p-6 lg:p-8">
      <section className="rounded-2xl sm:rounded-3xl border bg-[#020807] p-4 sm:p-4 sm:p-4 sm:p-5 lg:p-6 lg:p-8 text-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-medium text-cyan-300">
          Tableau de bord technique
        </p>

        <h1 className="mt-2 text-xl sm:text-2xl sm:text-3xl font-bold">
          Supervision ERP Runtime
        </h1>

        <p className="mt-3 max-w-3xl text-slate-300">
          Suivi du moteur ERP : événements, workflows, files d'attente,
          règles métier, audit, logs, mutations et santé système.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {technicalBlocks.map((block) => (
          <div
            key={block}
            className="rounded-2xl border bg-[#0B201D] p-4 sm:p-4 sm:p-5 lg:p-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
          >
            <p className="text-sm text-slate-300">Module technique</p>
            <h2 className="mt-2 text-lg font-semibold text-white">
              {block}
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Zone réservée à la supervision technique du moteur ERP.
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border bg-[#0B201D] p-4 sm:p-4 sm:p-5 lg:p-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
        <h2 className="text-lg font-semibold text-white">
          Séparation validée
        </h2>

        <p className="mt-3 text-sm text-slate-300">
          Ce dashboard ne doit pas contenir de KPI métier comme les terrains,
          campagnes, stocks ou revenus. Il est réservé au fonctionnement interne
          de la plateforme.
        </p>
      </section>
    </main>
  );
}
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";

interface ERPModuleActivityPanelProps {
  module: ERPModule;
}

export function ERPModuleActivityPanel({
  module,
}: ERPModuleActivityPanelProps) {
  const activities = [
    {
      title: "Nouvel enregistrement cree",
      description: `Une nouvelle entree a ete ajoutee au module ${module.metadata.label}.`,
      tone: "success" as const,
    },
    {
      title: "Verification metier effectuee",
      description: "Les regles de coherence du module ont ete appliquees.",
      tone: "info" as const,
    },
    {
      title: "Workflow disponible",
      description: "Une action metier peut etre lancee depuis ce module.",
      tone: "default" as const,
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950">
            Activite recente
          </h2>
          <p className="text-sm text-slate-500">
            Evenements metier recents du module.
          </p>
        </div>

        <ERPBadge tone="info">Live</ERPBadge>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-slate-900">
                {activity.title}
              </h3>

              <ERPBadge tone={activity.tone}>
                ERP
              </ERPBadge>
            </div>

            <p className="text-sm leading-6 text-slate-500">
              {activity.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
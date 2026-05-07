import { getSchema } from "@/core/schemas/schema-registry";
import { getModuleByKey } from "@/core/modules/module-registry";
import { getModuleTimeline } from "@/core/runtime/runtime-timeline";

type Props = {
  moduleKey: string;
  id: string;
};

const mockDetails: Record<string, any> = {
  exploitations: {
    nom: "Exploitation Nord",
    type: "Agricole",
    responsable: "Jean Dupont",
    surface: 120,
    status: "active",
  },

  terrains: {
    nom: "Terrain A1",
    localisation: "Bouaké",
    surface: 40,
    status: "disponible",
  },

  materiels: {
    nom: "Tracteur MF-240",
    categorie: "Tracteur",
    etat: "operationnel",
    cout: 15000000,
  },
};

function getStatusColor(color?: string) {
  switch (color) {
    case "green":
      return "bg-emerald-100 text-emerald-700";

    case "yellow":
      return "bg-amber-100 text-amber-700";

    case "red":
      return "bg-red-100 text-red-700";

    case "blue":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function GenericDetailPage({
  moduleKey,
  id,
}: Props) {
  const schema = getSchema(moduleKey);

  const module = getModuleByKey(moduleKey);

  if (!schema || !module) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        Module ERP introuvable : {moduleKey}
      </div>
    );
  }

  const data = mockDetails[moduleKey];

  const runtimeTimeline =
    getModuleTimeline(moduleKey);

  return (
    <div className="space-y-6">
      <section className="flex items-start justify-between">
        <div>
          <div className="text-sm font-medium uppercase tracking-wide text-slate-400">
            ERP DETAIL
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            {module.label} #{id}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Vue détail générée automatiquement depuis le schema ERP.
          </p>
        </div>

        <button
          className="
            rounded-xl
            bg-slate-900
            px-5
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-slate-700
          "
        >
          Modifier
        </button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Workflow
          </div>

          <div className="mt-2 text-2xl font-bold text-slate-950">
            {module.features?.workflow ? "Actif" : "Inactif"}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Audit
          </div>

          <div className="mt-2 text-2xl font-bold text-slate-950">
            {module.features?.audit ? "Activé" : "Désactivé"}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Supervision
          </div>

          <div className="mt-2 text-2xl font-bold text-slate-950">
            {module.features?.supervision ? "Active" : "Inactive"}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Runtime ERP
          </div>

          <div className="mt-2 text-2xl font-bold text-slate-950">
            Centralisé
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-950">
            Informations métier
          </h2>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {schema.fields.map((field) => {
            const value = data[field.key];

            if (field.type === "status") {
              const status =
                schema.statuses?.find(
                  (s) => s.value === value
                );

              return (
                <div
                  key={field.key}
                  className="space-y-2"
                >
                  <div className="text-sm font-medium text-slate-500">
                    {field.label}
                  </div>

                  <div>
                    <span
                      className={[
                        "rounded-full px-3 py-1 text-xs font-medium",
                        getStatusColor(status?.color),
                      ].join(" ")}
                    >
                      {status?.label || value}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={field.key}
                className="space-y-2"
              >
                <div className="text-sm font-medium text-slate-500">
                  {field.label}
                </div>

                <div className="text-base font-medium text-slate-950">
                  {value?.toString()}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Runtime Timeline
          </h2>

          <div className="mt-5 space-y-4">
            {runtimeTimeline.length === 0 && (
              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                Aucune activité runtime ERP.
              </div>
            )}

            {runtimeTimeline.map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {entry.type}
                  </div>

                  <div className="text-xs text-slate-400">
                    {entry.timestamp}
                  </div>
                </div>

                <div className="mt-2 text-sm font-medium text-slate-800">
                  {entry.message}
                </div>

                <div className="mt-2 flex gap-2">
                  <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-medium text-slate-700">
                    {entry.action}
                  </span>

                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                    {entry.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Capacités ERP
          </h2>

          <div className="mt-5 flex flex-wrap gap-2">
            {module.features?.workflow && (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                Workflow
              </span>
            )}

            {module.features?.audit && (
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                Audit
              </span>
            )}

            {module.features?.supervision && (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                Supervision
              </span>
            )}

            {module.features?.notifications && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Notifications
              </span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}


import Link from "next/link";
import { ERPSavedViews } from "@/runtime/os-enterprise";

export function ERPSavedViewsPanel() {
  const views = ERPSavedViews.views();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-black text-slate-950">
          Vues sauvegardees
        </h2>
        <p className="text-sm text-slate-500">
          Espaces de travail favoris.
        </p>
      </div>

      <div className="space-y-2">
        {views.map((view) => (
          <Link
            key={view.id}
            href={view.href}
            className="block rounded-2xl bg-slate-50 p-4 transition hover:bg-blue-50"
          >
            <p className="text-sm font-black text-slate-900">
              {view.label}
            </p>

            {view.description && (
              <p className="mt-1 text-xs text-slate-500">
                {view.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
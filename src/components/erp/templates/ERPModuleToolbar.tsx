import { ERPButton } from "@/components/erp/ui";

export function ERPModuleToolbar() {
  return (
    <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm xl:grid-cols-[1fr_auto] xl:items-center">
      <div className="grid gap-3 md:grid-cols-3">
        <input
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          placeholder="Rechercher..."
        />

        <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500">
          <option>Tous les statuts</option>
          <option>Actif</option>
          <option>En suivi</option>
          <option>A controler</option>
        </select>

        <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500">
          <option>Vue operationnelle</option>
          <option>Vue workflow</option>
          <option>Vue audit</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-3">
        <ERPButton type="button">
          Nouveau
        </ERPButton>

        <ERPButton variant="secondary" type="button">
          Exporter
        </ERPButton>

        <ERPButton variant="ghost" type="button">
          Importer
        </ERPButton>
      </div>
    </section>
  );
}
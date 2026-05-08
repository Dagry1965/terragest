import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";

interface ERPFormSummaryPanelProps {
  module: ERPModule;
}

export function ERPFormSummaryPanel({
  module,
}: ERPFormSummaryPanelProps) {
  const requiredFields = module.schema.fields.filter((field) => field.required);

  return (
    <aside className="space-y-5">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">
          Controle du formulaire
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Ce formulaire est genere depuis le schema central du module.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <ERPBadge tone="info">{module.schema.fields.length} champs</ERPBadge>
          <ERPBadge tone="warning">{requiredFields.length} obligatoires</ERPBadge>
          <ERPBadge tone="success">Schema valide</ERPBadge>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">
          Apres validation
        </h2>

        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <p>1. Enregistrement des donnees</p>
          <p>2. Verification des regles metier</p>
          <p>3. Mise a jour de l'audit</p>
          <p>4. Declenchement possible du workflow</p>
        </div>
      </section>
    </aside>
  );
}
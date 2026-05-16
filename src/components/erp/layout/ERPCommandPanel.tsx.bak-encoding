import { ERPBadge, ERPButton } from "@/components/erp/ui";

interface ERPCommandPanelProps {
  features?: string[];
}

export function ERPCommandPanel({ features = [] }: ERPCommandPanelProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
        <h3 className="text-lg font-black text-slate-950">CapacitÃ©s ERP</h3>
        <p className="mt-2 text-sm text-slate-500">
          Fonctions activÃ©es depuis la dÃ©finition runtime du module.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {features.length === 0 ? (
            <span className="text-sm text-slate-400">Aucune capacitÃ© dÃ©clarÃ©e.</span>
          ) : (
            features.map((feature) => (
              <ERPBadge key={feature} tone="info">
                {feature}
              </ERPBadge>
            ))
          )}
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
        <h3 className="text-lg font-black text-slate-950">Command Center</h3>
        <p className="mt-2 text-sm text-slate-500">
          Actions globales connectables aux workflows, rÃ¨gles et audit.
        </p>

        <div className="mt-5 grid gap-3">
          <ERPButton type="button">Lancer workflow</ERPButton>
          <ERPButton variant="secondary" type="button">Journal audit</ERPButton>
          <ERPButton variant="ghost" type="button">Relations</ERPButton>
          <ERPButton variant="ghost" type="button">Permissions</ERPButton>
        </div>
      </div>
    </div>
  );
}
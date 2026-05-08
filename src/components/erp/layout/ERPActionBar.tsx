import { ERPButton } from "@/components/erp/ui";

export function ERPActionBar() {
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-3">
        <ERPButton type="button">+ Nouveau</ERPButton>
        <ERPButton variant="secondary" type="button">Exporter</ERPButton>
        <ERPButton variant="ghost" type="button">Importer</ERPButton>
        <ERPButton variant="ghost" type="button">Filtrer</ERPButton>
      </div>

      <div className="flex flex-wrap gap-3">
        <ERPButton variant="ghost" type="button">Workflow</ERPButton>
        <ERPButton variant="ghost" type="button">Audit</ERPButton>
        <ERPButton variant="danger" type="button">Alerte</ERPButton>
      </div>
    </div>
  );
}
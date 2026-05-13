import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPActionToolbar } from "@/components/erp/actions";
import { ERPBreadcrumbs } from "@/components/erp/navigation/ERPBreadcrumbs";
import { ERPUIComposer } from "@/runtime/ui/ERPUIComposition";

interface ERPModuleHeaderProps {
  module: ERPModule;
}

export function ERPModuleHeader({ module }: ERPModuleHeaderProps) {
  const composition = ERPUIComposer.compose(module);

  return (
    <section className="space-y-4">
      <ERPBreadcrumbs module={module} />

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-8 py-8 text-white">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <ERPBadge tone="info">Module ERP</ERPBadge>
                <ERPBadge tone="success">Actif</ERPBadge>
                {composition.category && <ERPBadge>{composition.category}</ERPBadge>}
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight">
                {composition.title}
              </h1>

              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
                {composition.description}
              </p>
            </div>

            <ERPActionToolbar actions={composition.actions} />
          </div>
        </div>
      </div>
    </section>
  );
}
import Link from "next/link";
import { ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";

interface ERPFormActionsProps {
  module: ERPModule;
}

export function ERPFormActions({ module }: ERPFormActionsProps) {
  const backHref = module.metadata.routes?.list ?? `/${module.metadata.key}`;

  return (
    <div className="flex flex-wrap gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <ERPButton type="button">
        Enregistrer
      </ERPButton>

      <ERPButton variant="secondary" type="button">
        Enregistrer et continuer
      </ERPButton>

      <Link href={backHref}>
        <ERPButton variant="ghost" type="button">
          Annuler
        </ERPButton>
      </Link>
    </div>
  );
}
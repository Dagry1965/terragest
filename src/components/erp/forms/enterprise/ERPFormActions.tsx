import Link from "next/link";
import { ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";

interface ERPFormActionsProps {
  module: ERPModule;
}

export function ERPFormActions({ module }: ERPFormActionsProps) {
  const backHref = module.metadata.routes?.list ?? `/${module.metadata.key}`;

  return (
    <div className="flex flex-wrap gap-3 rounded-3xl border border-white/10 bg-[#F8FCFD] text-[#020617] shadow-[0_22px_70px_rgba(0,0,0,0.18)] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
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
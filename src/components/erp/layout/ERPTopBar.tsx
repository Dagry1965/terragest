import type { ReactNode } from "react";
import { ERPBadge, ERPButton } from "@/components/erp/ui";

interface ERPTopBarProps {
  eyebrow?: string;
  title?: string;
  actions?: ReactNode;
}

export function ERPTopBar({
  eyebrow = "Terragest ERP",
  title = "Pilotage operationnel",
  actions,
}: ERPTopBarProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-600">
          {eyebrow}
        </p>

        <h2 className="mt-2 text-2xl font-black text-slate-950">
          {title}
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <ERPBadge tone="success">Systeme actif</ERPBadge>
        <ERPBadge tone="info">Donnees synchronisees</ERPBadge>

        {actions ?? (
          <ERPButton variant="ghost" type="button">
            Centre d'aide
          </ERPButton>
        )}
      </div>
    </header>
  );
}
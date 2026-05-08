import type { ReactNode } from "react";
import { ERPBadge, ERPButton } from "@/components/erp/ui";

interface ERPPageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  category?: string;
  actions?: ReactNode;
  side?: ReactNode;
}

export function ERPPageHero({
  eyebrow = "Module mÃ©tier",
  title,
  description,
  category,
  actions,
  side,
}: ERPPageHeroProps) {
  return (
    <section className="mb-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-950 shadow-2xl">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
        <div>
          <div className="flex flex-wrap gap-2">
            <ERPBadge tone="info">{eyebrow}</ERPBadge>
            <ERPBadge tone="success">OpÃ©rationnel</ERPBadge>
            {category && <ERPBadge>{category}</ERPBadge>}
          </div>

          <h1 className="mt-6 text-5xl font-black tracking-tight">
            {title}
          </h1>

          {description && (
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {description}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {actions ?? (
              <>
                <ERPButton type="button">CrÃ©er un enregistrement</ERPButton>
                <ERPButton variant="secondary" type="button">
                  Exporter
                </ERPButton>
                <ERPButton variant="ghost" type="button">
                  Inspecter
                </ERPButton>
              </>
            )}
          </div>
        </div>

        {side}
      </div>
    </section>
  );
}
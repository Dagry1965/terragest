import type { ReactNode } from "react";

import {
  ERPPageHeader,
  ERPSection,
  ERPStatCard,
} from "@/components/erp/ui";

type ERPModulePageShellProps = {
  moduleLabel: string;
  moduleDescription?: string;
  children: ReactNode;
  stats?: {
    label: string;
    value: string | number;
    helper?: string;
  }[];
};

export function ERPModulePageShell({
  moduleLabel,
  moduleDescription,
  children,
  stats = [],
}: ERPModulePageShellProps) {
  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="Module ERP"
        title={moduleLabel}
        description={moduleDescription}
      />

      {stats.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {stats.map((stat) => (
            <ERPStatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              helper={stat.helper}
            />
          ))}
        </div>
      )}

      <ERPSection>
        {children}
      </ERPSection>
    </div>
  );
}
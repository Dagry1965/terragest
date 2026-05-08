import type { ReactNode } from "react";
import { ERPAppShell } from "./ERPAppShell";
import { ERPTopBar } from "./ERPTopBar";
import { ERPPageHero } from "./ERPPageHero";
import { ERPKpiGrid } from "./ERPKpiGrid";
import { ERPContentGrid } from "./ERPContentGrid";
import { ERPActionBar } from "./ERPActionBar";
import { ERPTabNavigation } from "./ERPTabNavigation";
import { ERPQuickFilters } from "./ERPQuickFilters";

interface ERPCockpitLayoutProps {
  activeModule?: string;
  topbarTitle?: string;
  heroTitle: string;
  heroDescription?: string;
  heroCategory?: string;
  heroSide?: ReactNode;
  kpis?: {
    label: string;
    value: string;
    tone?: "default" | "success" | "info";
  }[];
  main: ReactNode;
  side?: ReactNode;
}

export function ERPCockpitLayout({
  activeModule,
  topbarTitle = "Pilotage operationnel",
  heroTitle,
  heroDescription,
  heroCategory,
  heroSide,
  kpis = [],
  main,
  side,
}: ERPCockpitLayoutProps) {
  return (
    <ERPAppShell activeModule={activeModule}>
      <ERPTopBar title={topbarTitle} />

      <ERPPageHero
        title={heroTitle}
        description={heroDescription}
        category={heroCategory}
        side={heroSide}
      />

      <ERPActionBar />
      <ERPTabNavigation />

      {kpis.length > 0 && <ERPKpiGrid items={kpis} />}

      <ERPQuickFilters />

      <ERPContentGrid main={main} side={side} />
    </ERPAppShell>
  );
}
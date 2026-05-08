import type { ReactNode } from "react";
import { ERPCard } from "./ERPCard";

interface ERPChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ERPChartCard({
  title,
  description,
  children,
}: ERPChartCardProps) {
  return (
    <ERPCard title={title} description={description}>
      <div className="min-h-64">{children}</div>
    </ERPCard>
  );
}

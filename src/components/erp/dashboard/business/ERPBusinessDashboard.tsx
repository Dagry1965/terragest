"use client";

import { useEffect, useState } from "react";
import { ERPBusinessDashboardConfig } from "@/runtime/dashboard/generic/ERPBusinessDashboardConfig";
import { ERPDashboardWidgetEngine } from "@/runtime/dashboard/generic/ERPDashboardWidgetEngine";
import type { ERPDashboardWidgetResult } from "@/runtime/dashboard/generic/ERPDashboardTypes";
import { ERPDashboardRenderer } from "@/components/erp/dashboard/generic/ERPDashboardRenderer";

export function ERPBusinessDashboard() {
  const [widgets, setWidgets] = useState<ERPDashboardWidgetResult[] | null>(null);

  useEffect(() => {
    async function load() {
      const result =
        await ERPDashboardWidgetEngine.resolveDashboard(
          ERPBusinessDashboardConfig
        );

      setWidgets(result);
    }

    load();
  }, []);

  if (!widgets) {
    return <div className="p-10">Chargement dashboard ERP...</div>;
  }

  return (
    <ERPDashboardRenderer
      config={ERPBusinessDashboardConfig}
      widgets={widgets}
    />
  );
}
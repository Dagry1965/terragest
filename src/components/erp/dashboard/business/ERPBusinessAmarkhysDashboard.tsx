"use client";

import { useEffect, useState } from "react";
import { ERPBusinessAmarkhysDashboardConfig } from "@/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig";
import { ERPDashboardWidgetEngine } from "@/runtime/dashboard/generic/ERPDashboardWidgetEngine";
import type { ERPDashboardWidgetResult } from "@/runtime/dashboard/generic/ERPDashboardTypes";
import { ERPDashboardRenderer } from "@/components/erp/dashboard/generic/ERPDashboardRenderer";

export function ERPBusinessAmarkhysDashboard() {
  const [widgets, setWidgets] =
    useState<ERPDashboardWidgetResult[] | null>(null);

  useEffect(() => {
    async function load() {
      const result =
        await ERPDashboardWidgetEngine.resolveDashboard(
          ERPBusinessAmarkhysDashboardConfig
        );

      setWidgets(result);
    }

    load();
  }, []);

  if (!widgets) {
    return (
      <div className="p-10">
        Chargement cockpit AMARKHYS...
      </div>
    );
  }

  return (
    <ERPDashboardRenderer
      config={ERPBusinessAmarkhysDashboardConfig}
      widgets={widgets}
    />
  );
}
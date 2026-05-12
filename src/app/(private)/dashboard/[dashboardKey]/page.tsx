"use client";

import {
  useEffect,
  useState,
}
from "react";

import {
  useParams,
}
from "next/navigation";

import {
  ERPDashboardRegistry,
}
from "@/runtime/dashboard/generic/registry/ERPDashboardRegistry";

import {
  registerERPDashboards,
}
from "@/runtime/dashboard/generic/registerERPDashboards";

import {
  ERPDashboardWidgetEngine,
}
from "@/runtime/dashboard/generic/ERPDashboardWidgetEngine";

import type {
  ERPDashboardConfig,
  ERPDashboardWidgetResult,
}
from "@/runtime/dashboard/generic/ERPDashboardTypes";

import {
  ERPDashboardRenderer,
}
from "@/components/erp/dashboard/generic/ERPDashboardRenderer";

export const dynamic =
  "force-dynamic";

export default function DashboardRuntimePage() {

  const params =
    useParams();

  const dashboardKey =
    String(
      params.dashboardKey
    );

  const [
    config,
    setConfig,
  ] = useState<
    ERPDashboardConfig | null
  >(null);

  const [
    widgets,
    setWidgets,
  ] = useState<
    ERPDashboardWidgetResult[]
    | null
  >(null);

  useEffect(() => {

    async function load() {

      registerERPDashboards();

      const dashboard =
        ERPDashboardRegistry.get(
          dashboardKey
        );

      if (!dashboard) {

        console.error(
          "Dashboard introuvable:",
          dashboardKey
        );

        return;
      }

      const resolvedWidgets =
        await ERPDashboardWidgetEngine
          .resolveDashboard(
            dashboard
          );

      setConfig(
        dashboard
      );

      setWidgets(
        resolvedWidgets
      );
    }

    load();

  }, [dashboardKey]);

  if (
    !config ||
    !widgets
  ) {

    return (

      <div className="p-10">
        Chargement dashboard ERP...
      </div>
    );
  }

  return (

    <ERPDashboardRenderer
      config={config}
      widgets={widgets}
    />
  );
}
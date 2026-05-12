"use client";

import { useEffect, useState } from "react";

import { ERPRuntimePage } from "@/components/erp/runtime";
import { coreERPModules } from "@/runtime/modules";
import { RuntimeDataBinding } from "@/runtime/data-binding";

import type { ERPModule } from "@/runtime/modules";
import type { RuntimeRecord } from "@/runtime/data-binding";

interface GenericListPageProps {
  module?: ERPModule;
  moduleKey?: string;
}

export function GenericListPage({
  module,
  moduleKey,
}: GenericListPageProps) {
  const runtimeModule =
    module ??
    coreERPModules.find(
      (item) => item.metadata.key === moduleKey
    );

  const [data, setData] =
    useState<RuntimeRecord[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadData() {
      if (!runtimeModule) {
        setLoading(false);
        return;
      }

      try {
        const records =
          await RuntimeDataBinding.list(
            runtimeModule
          );

        

        setData(records);
      } catch (error) {
        console.error(
          "ERP LIST LOAD ERROR",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [runtimeModule]);

  return (
    <ERPRuntimePage
      module={runtimeModule}
      data={loading ? [] : data}
      type="list"
      description={
        loading
          ? "Chargement des données..."
          : undefined
      }
    />
  );
}
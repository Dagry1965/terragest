"use client";

import { useEffect, useState } from "react";
import { ERPRuntimePage } from "@/components/erp/runtime";
import { coreERPModules } from "@/runtime/modules";
import { RuntimeDataBinding } from "@/runtime/data-binding";
import type { ERPModule } from "@/runtime/modules";

interface GenericEditPageProps {
  module?: ERPModule;
  moduleKey?: string;
  id?: string;
  record?: Record<string, unknown> | null;
}

export function GenericEditPage({
  module,
  moduleKey,
  id,
  record,
}: GenericEditPageProps) {
  const runtimeModule =
    module ??
    coreERPModules.find((item) => item.metadata.key === moduleKey);

  const [runtimeRecord, setRuntimeRecord] =
    useState<Record<string, unknown> | null | undefined>(record);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecord() {
      if (!runtimeModule || !id) {
        setLoading(false);
        return;
      }

      try {
        const loadedRecord =
          await RuntimeDataBinding.detail(runtimeModule, id);

        setRuntimeRecord(loadedRecord ?? undefined);
      } catch (error) {
        console.error("ERP EDIT LOAD ERROR", error);
        setRuntimeRecord(undefined);
      } finally {
        setLoading(false);
      }
    }

    loadRecord();
  }, [runtimeModule, id]);

  return (
    <ERPRuntimePage
      module={runtimeModule}
      type="edit"
      record={loading ? undefined : runtimeRecord ?? undefined}
      description={loading ? "Chargement de la donnée..." : undefined}
    />
  );
}
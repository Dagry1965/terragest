"use client";

import { useEffect, useState } from "react";

import { allERPModules } from "@/runtime/modules/definitions/coreModules";
import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { ERPRuntimePage } from "@/components/erp/runtime/ERPRuntimePage";
import { ERPOperationalModulePage } from "@/components/erp/operational/ERPOperationalModulePage";

interface GenericListPageProps {
  moduleKey: string;
}

export function GenericListPage({ moduleKey }: GenericListPageProps) {
  const runtimeModule = allERPModules.find(
    (item) => item.metadata.key === moduleKey
  );

  const [operationalData, setOperationalData] = useState<Record<string, unknown>[]>([]);
  const [isLoadingOperationalData, setIsLoadingOperationalData] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadOperationalData() {
      if (!runtimeModule?.operational?.enabled) {
        setOperationalData([]);
        return;
      }

      setIsLoadingOperationalData(true);

      try {
        const records = await RuntimeDataBinding.list(runtimeModule);

        if (!cancelled) {
          setOperationalData(records as Record<string, unknown>[]);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingOperationalData(false);
        }
      }
    }

    void loadOperationalData();

    return () => {
      cancelled = true;
    };
  }, [runtimeModule]);

  if (!runtimeModule) {
    return <div className="p-6">Module introuvable.</div>;
  }

  if (runtimeModule.operational?.enabled) {
    if (isLoadingOperationalData) {
      return (
        <div className="p-6 text-sm font-semibold text-slate-500">
          Chargement de la vue opérationnelle...
        </div>
      );
    }

    return (
      <ERPOperationalModulePage
        module={runtimeModule}
        data={operationalData}
      />
    );
  }

  return <ERPRuntimePage module={runtimeModule} type="list" />;
}

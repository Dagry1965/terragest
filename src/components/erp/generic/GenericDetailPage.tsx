"use client";

import { useEffect, useState } from "react";
import type { ERPModule } from "@/runtime/modules";
import { allERPModules } from "@/runtime/modules/definitions/coreModules";
import { RuntimeDataBinding } from "@/runtime/data-binding";
import { ERPRuntimePage } from "@/components/erp/runtime/ERPRuntimePage";

interface GenericDetailPageProps {
  module?: ERPModule;
  moduleKey?: string;
  id?: string;
  record?: Record<string, unknown> | null;
}

export function GenericDetailPage({
  module,
  moduleKey,
  id,
  record,
}: GenericDetailPageProps) {
  const runtimeModule =
    module ??
    allERPModules.find((item) => item.metadata.key === moduleKey);

  const [runtimeRecord, setRuntimeRecord] =
    useState<Record<string, unknown> | null | undefined>(record);

  const [loading, setLoading] = useState(Boolean(id && runtimeModule && !record));

  useEffect(() => {
    if (!id || !runtimeModule || record) {
      return;
    }

    let mounted = true;

    RuntimeDataBinding.detail(runtimeModule, id)
      .then((data) => {
        if (mounted) {
          setRuntimeRecord(data);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [id, runtimeModule, record]);

  if (!runtimeModule) {
    return <div className="p-4 sm:p-5 lg:p-6">Module introuvable.</div>;
  }

  if (loading) {
    return <div className="p-4 sm:p-5 lg:p-6">Chargement...</div>;
  }

  return (
    <ERPRuntimePage
      module={runtimeModule}
      type="detail"
      record={runtimeRecord ?? undefined}
    />
  );
}
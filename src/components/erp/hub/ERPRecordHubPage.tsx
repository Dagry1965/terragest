"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";
import { RuntimeHubEngine } from "@/runtime/hub";
import { ERPRecordHubHeader } from "./ERPRecordHubHeader";
import { ERPRecordHubKpiStrip } from "./ERPRecordHubKpiStrip";
import { ERPRecordHubPrimaryCollection } from "./ERPRecordHubPrimaryCollection";
import { ERPRecordHubSelectedDetails } from "./ERPRecordHubSelectedDetails";

export type ERPRecordHubPageProps = {
  config: ERPRecordHubConfig;
  rootRecord?: ERPRecordHubRecord | null;
  primaryRecords?: ERPRecordHubRecord[];
  relatedRecordsBySection?: Record<string, ERPRecordHubRecord[]>;
};

export function ERPRecordHubPage({
  config,
  rootRecord = null,
  primaryRecords = [],
  relatedRecordsBySection = {},
}: ERPRecordHubPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectionQueryParam =
    config.primaryCollection.selectionQueryParam ?? "selectedRecordId";

  const initialSelectedId =
    searchParams.get(selectionQueryParam) ?? primaryRecords[0]?.id ?? null;

  const [selectedPrimaryRecordId, setSelectedPrimaryRecordId] = useState<string | null>(
    initialSelectedId
  );

  const selectedPrimaryRecord = useMemo(() => {
    return primaryRecords.find((record) => record.id === selectedPrimaryRecordId) ?? null;
  }, [primaryRecords, selectedPrimaryRecordId]);

  const resolved = useMemo(() => {
    return RuntimeHubEngine.resolve({
      config,
      rootRecord,
      selectedPrimaryRecord,
    });
  }, [config, rootRecord, selectedPrimaryRecord]);

  function handleSelectRecord(recordId: string | null) {
    setSelectedPrimaryRecordId(recordId);

    const params = new URLSearchParams(searchParams.toString());

    if (recordId) {
      params.set(selectionQueryParam, recordId);
    } else {
      params.delete(selectionQueryParam);
    }

    router.replace(params.toString() ? pathname + "?" + params.toString() : pathname);
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
        <ERPRecordHubHeader config={config} rootRecord={rootRecord} />
        <ERPRecordHubKpiStrip kpis={resolved.kpis} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
          <ERPRecordHubPrimaryCollection
            config={config.primaryCollection}
            displayMode={resolved.layout.primaryDisplayMode}
            records={primaryRecords}
            selectedRecordId={selectedPrimaryRecordId}
            onSelectRecord={handleSelectRecord}
          />

          <ERPRecordHubSelectedDetails
            sections={resolved.relations}
            selectedRecord={selectedPrimaryRecord}
            relatedRecordsBySection={relatedRecordsBySection}
          />
        </div>
      </div>
    </section>
  );
}

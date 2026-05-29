"use client";

import { useMemo, useState } from "react";
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
  const [selectedPrimaryRecordId, setSelectedPrimaryRecordId] = useState<string | null>(
    primaryRecords[0]?.id ?? null
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

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <ERPRecordHubHeader config={config} rootRecord={rootRecord} />
        <ERPRecordHubKpiStrip kpis={resolved.kpis} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
          <ERPRecordHubPrimaryCollection
            config={config.primaryCollection}
            displayMode={resolved.layout.primaryDisplayMode}
            records={primaryRecords}
            selectedRecordId={selectedPrimaryRecordId}
            onSelectRecord={setSelectedPrimaryRecordId}
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

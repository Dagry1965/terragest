"use client";

import { useEffect, useState } from "react";
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";
import { RuntimeClientOperationalHubLoader } from "@/runtime/hub/RuntimeClientOperationalHubLoader";
import { ERPClientOperationalSheet } from "@/components/erp/hub/ERPClientOperationalSheet";

type ClientOperationalSheetClientProps = {
  config: ERPRecordHubConfig;
  clientId: string;
  selectedVehicleId?: string | null;
};

type LoadState = {
  rootRecord: ERPRecordHubRecord | null;
  primaryRecords: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
};

export function ClientOperationalSheetClient({
  config,
  clientId,
  selectedVehicleId = null,
}: ClientOperationalSheetClientProps) {
  const [state, setState] = useState<LoadState | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setError(null);

        const result = await RuntimeClientOperationalHubLoader.load({
          config,
          clientId,
          selectedVehicleId,
        });

        if (!active) return;

        setState({
          rootRecord: result.rootRecord,
          primaryRecords: result.primaryRecords,
          relatedRecordsBySection: result.relatedRecordsBySection,
        });
      } catch (loadError) {
        console.error("[ClientOperationalSheetClient] load failed", loadError);

        if (!active) return;

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Impossible de charger la fiche client op\u00e9rationnelle."
        );
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [config, clientId, selectedVehicleId]);

  if (error) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl rounded-[2rem] border border-red-100 bg-white p-8 text-sm text-red-700 shadow-sm">
          {error}
        </section>
      </main>
    );
  }

  if (!state) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
          Chargement de la fiche client op\u00e9rationnelle...
        </section>
      </main>
    );
  }

  return (
    <ERPClientOperationalSheet
      config={config}
      rootRecord={state.rootRecord}
      vehicles={state.primaryRecords}
      relatedRecordsBySection={state.relatedRecordsBySection}
      selectedVehicleId={selectedVehicleId}
    />
  );
}

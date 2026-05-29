"use client";

import { useEffect, useState } from "react";
import { ERPRecordHubPage } from "@/components/erp/hub";
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";
import { RuntimeVehicleOperationalHubLoader } from "@/runtime/hub/RuntimeVehicleOperationalHubLoader";

type VehicleOperationalHubClientProps = {
  config: ERPRecordHubConfig;
  vehicleId: string;
  selectedInterventionId?: string | null;
};

type LoadState = {
  rootRecord: ERPRecordHubRecord | null;
  primaryRecords: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
};

export function VehicleOperationalHubClient({
  config,
  vehicleId,
  selectedInterventionId = null,
}: VehicleOperationalHubClientProps) {
  const [state, setState] = useState<LoadState | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setError(null);

        const result = await RuntimeVehicleOperationalHubLoader.load({
          config,
          vehicleId,
          selectedInterventionId,
        });

        if (!active) return;

        setState({
          rootRecord: result.rootRecord,
          primaryRecords: result.primaryRecords,
          relatedRecordsBySection: result.relatedRecordsBySection,
        });
      } catch (loadError) {
        console.error("[VehicleOperationalHubClient] load failed", loadError);

        if (!active) return;

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Impossible de charger le hub v\u00e9hicule."
        );
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [config, vehicleId, selectedInterventionId]);

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl rounded-3xl border border-red-100 bg-white p-8 text-sm text-red-700 shadow-sm">
          {error}
        </section>
      </main>
    );
  }

  if (!state) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
          Chargement du hub v\u00e9hicule...
        </section>
      </main>
    );
  }

  return (
    <ERPRecordHubPage
      config={config}
      rootRecord={state.rootRecord}
      primaryRecords={state.primaryRecords}
      relatedRecordsBySection={state.relatedRecordsBySection}
      selectedRecordId={selectedInterventionId}
    />
  );
}

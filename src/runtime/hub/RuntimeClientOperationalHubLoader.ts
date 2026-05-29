import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { clientsautoModule } from "@/runtime/modules/generated/clientsauto/clientsauto.module";
import { vehiculesModule } from "@/runtime/modules/generated/vehicules/vehicules.module";
import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto/interventionsauto.module";
import { facturesautoModule } from "@/runtime/modules/generated/facturesauto/facturesauto.module";
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "./RuntimeHubTypes";

export type RuntimeClientOperationalHubLoadResult = {
  config: ERPRecordHubConfig;
  rootRecord: ERPRecordHubRecord | null;
  primaryRecords: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
};

export type RuntimeClientOperationalHubLoaderInput = {
  config: ERPRecordHubConfig;
  clientId?: string | null;
  selectedVehicleId?: string | null;
};

function normalizeRecord(record: unknown): ERPRecordHubRecord | null {
  if (!record || typeof record !== "object") {
    return null;
  }

  return record as ERPRecordHubRecord;
}

function normalizeRecords(records: unknown): ERPRecordHubRecord[] {
  if (!Array.isArray(records)) {
    return [];
  }

  return records.filter((record): record is ERPRecordHubRecord => {
    return !!record && typeof record === "object";
  });
}

function filterByForeignKey(
  records: ERPRecordHubRecord[],
  foreignKey: string,
  expectedValue: string
): ERPRecordHubRecord[] {
  return records.filter((record) => String(record[foreignKey] ?? "") === expectedValue);
}

function findById(
  records: ERPRecordHubRecord[],
  id?: string | null
): ERPRecordHubRecord | null {
  if (!id) {
    return null;
  }

  return records.find((record) => String(record.id ?? "") === String(id)) ?? null;
}

export class RuntimeClientOperationalHubLoader {
  static async load(
    input: RuntimeClientOperationalHubLoaderInput
  ): Promise<RuntimeClientOperationalHubLoadResult> {
    let rootRecord: ERPRecordHubRecord | null = null;

    if (input.clientId) {
      rootRecord = normalizeRecord(
        await RuntimeDataBinding.detail(clientsautoModule, input.clientId)
      );
    }

    if (!rootRecord) {
      const clients = normalizeRecords(await RuntimeDataBinding.list(clientsautoModule));

      rootRecord = input.clientId
        ? clients.find((record) => String(record.id ?? "") === String(input.clientId)) ?? null
        : clients[0] ?? null;
    }

    const clientId = String(rootRecord?.id ?? input.clientId ?? "");

    let primaryRecords: ERPRecordHubRecord[] = [];

    if (clientId) {
      const vehicules = normalizeRecords(await RuntimeDataBinding.list(vehiculesModule));

      primaryRecords = filterByForeignKey(
        vehicules,
        input.config.primaryCollection.foreignKey,
        clientId
      );
    }

    const selectedVehicle =
      findById(primaryRecords, input.selectedVehicleId) ?? primaryRecords[0] ?? null;

    const selectedVehicleId = String(selectedVehicle?.id ?? input.selectedVehicleId ?? "");

    const relatedRecordsBySection: Record<string, ERPRecordHubRecord[]> = {};

    if (selectedVehicleId) {
      const interventions = normalizeRecords(
        await RuntimeDataBinding.list(interventionsautoModule)
      );

      const factures = normalizeRecords(
        await RuntimeDataBinding.list(facturesautoModule)
      );

      relatedRecordsBySection.interventions = filterByForeignKey(
        interventions,
        "vehiculeId",
        selectedVehicleId
      );

      relatedRecordsBySection.factures = filterByForeignKey(
        factures,
        "vehiculeId",
        selectedVehicleId
      );
    }

    return {
      config: input.config,
      rootRecord,
      primaryRecords,
      relatedRecordsBySection,
    };
  }
}

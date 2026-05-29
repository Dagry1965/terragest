import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { produitsautoModule } from "@/runtime/modules/generated/produitsauto/produitsauto.module";
import { stocksautoModule } from "@/runtime/modules/generated/stocksauto/stocksauto.module";
import { mouvementsstockautoModule } from "@/runtime/modules/generated/mouvementsstockauto/mouvementsstockauto.module";
import { commandesstockautoModule } from "@/runtime/modules/generated/commandesstockauto/commandesstockauto.module";
import { receptionsstockautoModule } from "@/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module";
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "./RuntimeHubTypes";

export type RuntimeProductStockOperationalHubLoadResult = {
  config: ERPRecordHubConfig;
  rootRecord: ERPRecordHubRecord | null;
  primaryRecords: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
};

export type RuntimeProductStockOperationalHubLoaderInput = {
  config: ERPRecordHubConfig;
  productId?: string | null;
  selectedStockId?: string | null;
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

function filterByAnyProductKey(
  records: ERPRecordHubRecord[],
  productId: string
): ERPRecordHubRecord[] {
  const possibleKeys = ["produitId", "productId", "articleId"];

  return records.filter((record) => {
    return possibleKeys.some((key) => String(record[key] ?? "") === productId);
  });
}

function filterByAnyStockKey(
  records: ERPRecordHubRecord[],
  stockId: string
): ERPRecordHubRecord[] {
  const possibleKeys = ["stockId", "stockSourceId", "stockDestinationId"];

  return records.filter((record) => {
    return possibleKeys.some((key) => String(record[key] ?? "") === stockId);
  });
}

export class RuntimeProductStockOperationalHubLoader {
  static async load(
    input: RuntimeProductStockOperationalHubLoaderInput
  ): Promise<RuntimeProductStockOperationalHubLoadResult> {
    let rootRecord: ERPRecordHubRecord | null = null;

    if (input.productId) {
      rootRecord = normalizeRecord(
        await RuntimeDataBinding.detail(produitsautoModule, input.productId)
      );
    }

    if (!rootRecord) {
      const produits = normalizeRecords(await RuntimeDataBinding.list(produitsautoModule));

      rootRecord = input.productId
        ? produits.find((record) => String(record.id ?? "") === String(input.productId)) ?? null
        : produits[0] ?? null;
    }

    const productId = String(rootRecord?.id ?? input.productId ?? "");

    let primaryRecords: ERPRecordHubRecord[] = [];

    if (productId) {
      const stocks = normalizeRecords(await RuntimeDataBinding.list(stocksautoModule));

      primaryRecords = filterByAnyProductKey(stocks, productId);
    }

    const selectedStock =
      findById(primaryRecords, input.selectedStockId) ?? primaryRecords[0] ?? null;

    const selectedStockId = String(selectedStock?.id ?? input.selectedStockId ?? "");

    const relatedRecordsBySection: Record<string, ERPRecordHubRecord[]> = {};

    if (productId) {
      const mouvements = normalizeRecords(
        await RuntimeDataBinding.list(mouvementsstockautoModule)
      );

      const commandes = normalizeRecords(
        await RuntimeDataBinding.list(commandesstockautoModule)
      );

      const receptions = normalizeRecords(
        await RuntimeDataBinding.list(receptionsstockautoModule)
      );

      relatedRecordsBySection.mouvements = selectedStockId
        ? filterByAnyStockKey(mouvements, selectedStockId)
        : filterByAnyProductKey(mouvements, productId);

      relatedRecordsBySection.commandes = filterByAnyProductKey(commandes, productId);

      relatedRecordsBySection.receptions = selectedStockId
        ? filterByAnyStockKey(receptions, selectedStockId)
        : filterByAnyProductKey(receptions, productId);
    }

    return {
      config: input.config,
      rootRecord,
      primaryRecords,
      relatedRecordsBySection,
    };
  }
}

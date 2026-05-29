import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
  ERPRecordHubResolvedKpi,
} from "./RuntimeHubTypes";

function normalizeKpiValue(value: unknown): string | number {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (typeof value === "boolean") {
    return value ? "Oui" : "Non";
  }

  return "\u2014";
}

export class RuntimeHubKpiResolver {
  static resolveStatic(
    config: ERPRecordHubConfig,
    rootRecord?: ERPRecordHubRecord | null
  ): ERPRecordHubResolvedKpi[] {
    const kpis = config.kpis ?? [];

    return kpis.map((kpi) => {
      const value =
        kpi.field && rootRecord
          ? normalizeKpiValue(rootRecord[kpi.field])
          : "\u2014";

      return {
        key: kpi.key,
        label: kpi.label,
        value,
        format: kpi.format,
      };
    });
  }
}

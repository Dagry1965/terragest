import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
  ERPRecordHubResolvedKpi,
} from "./RuntimeHubTypes";

export class RuntimeHubKpiResolver {
  static resolveStatic(
    config: ERPRecordHubConfig,
    rootRecord?: ERPRecordHubRecord | null
  ): ERPRecordHubResolvedKpi[] {
    const kpis = config.kpis ?? [];

    return kpis.map((kpi) => {
      if (kpi.source === "static" && kpi.field && rootRecord) {
        const value = rootRecord[kpi.field];

        return {
          key: kpi.key,
          label: kpi.label,
          value: typeof value === "string" || typeof value === "number" ? value : "—",
          format: kpi.format,
        };
      }

      return {
        key: kpi.key,
        label: kpi.label,
        value: "—",
        format: kpi.format,
      };
    });
  }
}

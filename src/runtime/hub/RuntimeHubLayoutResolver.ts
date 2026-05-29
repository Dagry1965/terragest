import type {
  ERPRecordHubConfig,
  ERPRecordHubDisplayMode,
  ERPRecordHubRecord,
  ERPRecordHubResolvedLayout,
} from "./RuntimeHubTypes";

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

export class RuntimeHubLayoutResolver {
  static resolvePrimaryDisplayMode(
    config: ERPRecordHubConfig,
    rootRecord?: ERPRecordHubRecord | null
  ): ERPRecordHubDisplayMode {
    const primary = config.primaryCollection;
    const fallback: ERPRecordHubDisplayMode = primary.defaultDisplayMode ?? "table";

    if (!primary.displayModes || !primary.displayModeSourceField || !rootRecord) {
      return fallback;
    }

    const sourceValue = asString(rootRecord[primary.displayModeSourceField]);

    if (!sourceValue) {
      return fallback;
    }

    return primary.displayModes[sourceValue] ?? fallback;
  }

  static resolve(
    config: ERPRecordHubConfig,
    rootRecord?: ERPRecordHubRecord | null
  ): ERPRecordHubResolvedLayout {
    const layout = config.layout ?? "wide";
    const primaryDisplayMode = this.resolvePrimaryDisplayMode(config, rootRecord);

    return {
      layout,
      primaryDisplayMode,
      selectedDetailsLayout: layout === "split" ? "side-panel" : "bottom-sections",
    };
  }
}

import type { ERPRecordHubConfig } from "./RuntimeHubTypes";

export type RuntimeHubConfigSource = {
  key?: string;
  label?: string;
  metadata?: {
    operationalHub?: ERPRecordHubConfig;
  };
  operationalHub?: ERPRecordHubConfig;
};

export class RuntimeHubConfigResolver {
  static resolve(source: RuntimeHubConfigSource | null | undefined): ERPRecordHubConfig | null {
    if (!source) {
      return null;
    }

    const config = source.operationalHub ?? source.metadata?.operationalHub ?? null;

    if (!config || config.enabled !== true) {
      return null;
    }

    return config;
  }

  static assertValid(config: ERPRecordHubConfig): void {
    if (!config.key) {
      throw new Error("RuntimeHubConfigResolver: hub config key is required.");
    }

    if (!config.rootModule) {
      throw new Error("RuntimeHubConfigResolver: rootModule is required.");
    }

    if (!config.header?.titleFields?.length) {
      throw new Error("RuntimeHubConfigResolver: header.titleFields is required.");
    }

    if (!config.primaryCollection?.moduleKey || !config.primaryCollection?.foreignKey) {
      throw new Error("RuntimeHubConfigResolver: primaryCollection.moduleKey and foreignKey are required.");
    }
  }
}

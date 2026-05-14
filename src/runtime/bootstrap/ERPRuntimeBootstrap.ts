import {
  ERPDiscoveryManifestData,
} from "@/runtime/discovery/ERPDiscoveryManifest";

import {
  ERPModuleDiscoveryRegistry,
} from "@/runtime/discovery/ERPModuleDiscoveryRegistry";

import {
  ERPDashboardDiscoveryRegistry,
} from "@/runtime/discovery/ERPDashboardDiscoveryRegistry";

import {
  ERPPluginDiscoveryRegistry,
} from "@/runtime/discovery/ERPPluginDiscoveryRegistry";

export class ERPRuntimeBootstrap {

  static bootstrap() {

    ERPDiscoveryManifestData.modules.forEach(
      (moduleKey) => {

        ERPModuleDiscoveryRegistry.register(
          moduleKey
        );
      }
    );

    ERPDiscoveryManifestData.dashboards.forEach(
      (dashboardKey) => {

        ERPDashboardDiscoveryRegistry.register(
          dashboardKey
        );
      }
    );

    ERPDiscoveryManifestData.plugins.forEach(
      (pluginKey) => {

        ERPPluginDiscoveryRegistry.register(
          pluginKey
        );
      }
    );
  }
}
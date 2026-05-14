export interface ERPDiscoveryManifest {

  modules: string[];

  dashboards: string[];

  plugins: string[];

  workspaces: string[];

  automations: string[];

  workflows: string[];
}

export const ERPDiscoveryManifestData:
  ERPDiscoveryManifest = {

  modules: [],

  dashboards: [],

  plugins: [],

  workspaces: [],

  automations: [],

  workflows: [],
};
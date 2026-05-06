export type FeatureCapability =
  | "crud"
  | "runtime"
  | "workflow"
  | "rules"
  | "automation"
  | "observability"
  | "realtime"
  | "offline"
  | "analytics"
  | "billing";

export type FeatureDefinition = {
  name: string;
  label: string;
  enabled: boolean;
  version: string;
  route?: string;
  capabilities: FeatureCapability[];
  dependencies?: string[];
};
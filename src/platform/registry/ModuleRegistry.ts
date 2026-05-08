import type {
  FeatureDefinition
}
from "./FeatureDefinition";

import {
  FeatureRegistry
}
from "./FeatureRegistry";

export type ERPModule =
  FeatureDefinition;

export const ModuleRegistry =
  FeatureRegistry;
import {
  FeatureRegistry
}
from "../registry/FeatureRegistry";

import type {
  FeatureCapability,
  FeatureDefinition,
} from "../registry/FeatureDefinition";

import {
  allERPModules,
} from "@/runtime/modules";

import {
  MaterielsFeature
}
from "@/features/materiels/materiels.feature";

import {
  StocksFeature
}
from "@/features/stocks/stocks.feature";

import {
  ProduitsFeature
}
from "@/features/produits/produits.feature";

import {
  ExploitationsFeature
}
from "@/features/exploitations/exploitations.feature";

import {
  TerrainsFeature
}
from "@/features/terrains/terrains.feature";

import {
  InterventionsFeature
}
from "@/features/interventions/interventions.feature";

import {
  ObservabilityFeature
}
from "@/features/observability/observability.feature";

function toFeatureCapabilities(
  module: (typeof allERPModules)[number]
): FeatureCapability[] {
  const capabilities:
    FeatureCapability[] = [
      "crud",
      "runtime",
    ];

  if (module.metadata.features?.workflows) {
    capabilities.push("workflow");
  }

  if (module.metadata.features?.automation) {
    capabilities.push("automation");
  }

  if (module.metadata.features?.observability) {
    capabilities.push("observability");
  }

  if (module.metadata.features?.realtime) {
    capabilities.push("realtime");
  }

  if (module.metadata.features?.analytics) {
    capabilities.push("analytics");
  }

  capabilities.push("rules");

  return Array.from(
    new Set(capabilities)
  );
}

function toRuntimeFeature(
  module: (typeof allERPModules)[number]
): FeatureDefinition {
  const key =
    module.metadata.key;

  return {
    name:
      key,

    label:
      module.metadata.label,

    enabled:
      module.metadata.enabled !== false,

    version:
      "1.0.0",

    route:
      module.metadata.routes?.list ??
      `/${key}`,

    capabilities:
      toFeatureCapabilities(module),

 dependencies:
  module.relations
    ?.map(
      (relation) =>
        relation.targetModule
    )
    .filter(
      (targetModule): targetModule is string =>
        Boolean(targetModule)
    ) ?? [],
  };
}

export async function
loadFeatures() {
  const staticFeatures = [
    MaterielsFeature,
    StocksFeature,
    ProduitsFeature,
    ExploitationsFeature,
    TerrainsFeature,
    InterventionsFeature,
    ObservabilityFeature,
  ];

  const runtimeFeatures =
    allERPModules.map(
      toRuntimeFeature
    );

  const features = [
    ...staticFeatures,
    ...runtimeFeatures,
  ];

  for (const feature of features) {
    FeatureRegistry.register(
      feature
    );
  }

  console.log(
    "[FEATURES LOADED]",
    features.length
  );
}
import {
  FeatureRegistry
}
from "../registry/FeatureRegistry";

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

export async function
loadFeatures() {

  const features = [

    MaterielsFeature,

    StocksFeature,

    ProduitsFeature,

    ExploitationsFeature,

    TerrainsFeature,

    InterventionsFeature,

    ObservabilityFeature,
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
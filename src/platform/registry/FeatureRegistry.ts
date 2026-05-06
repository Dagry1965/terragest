
import type {
  FeatureDefinition
}
from "./FeatureDefinition";

class FeatureRegistryManager {

  private features:
    FeatureDefinition[] = [];

  register(
    feature: FeatureDefinition
  ) {

    const exists =
      this.features.some(
        item =>
          item.name === feature.name
      );

    if (exists) {
      return;
    }

    console.log(
      "[FEATURE REGISTERED]",
      feature.name
    );

    this.features.push(
      feature
    );
  }

  getAll() {

    return this.features;
  }

  getEnabled() {

    return this.features.filter(
      feature => feature.enabled
    );
  }

getEnabledModules() {

  return this.getEnabled();
}

  findByName(
    name: string
  ) {

    return this.features.find(
      feature =>
        feature.name === name
    );
  }
}

export const FeatureRegistry =
  new FeatureRegistryManager();
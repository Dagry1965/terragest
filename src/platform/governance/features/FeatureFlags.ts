// src/platform/governance/features/FeatureFlags.ts

class FeatureFlagsManager {

  private flags:
    Record<string, boolean>
    = {};

  enable(
    feature: string
  ) {

    this.flags[
      feature
    ] = true;
  }

  disable(
    feature: string
  ) {

    this.flags[
      feature
    ] = false;
  }

  isEnabled(
    feature: string
  ) {

    return (
      this.flags[
        feature
      ] ?? false
    );
  }
}

export const FeatureFlags =
  new FeatureFlagsManager();

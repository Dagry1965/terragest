export const FeatureFlagService = {

  hasFeature(
    feature: string
  ) {

    const enabledFeatures = [

      "AI_ENGINE",

      "REALTIME",

      "MOBILE",

      "ANALYTICS",
    ];

    return enabledFeatures.includes(
      feature
    );
  },
};

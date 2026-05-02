export const HistoricalAnalyticsService = {

  analyzeTrend(
    values: number[]
  ) {

    if (
      values.length < 2
    ) {

      return {

        trend:
          "STABLE",
      };
    }

    const last =
      values[
        values.length - 1
      ];

    const previous =
      values[
        values.length - 2
      ];

    return {

      trend:
        last > previous
          ? "UP"
          : "DOWN",
    };
  },
};

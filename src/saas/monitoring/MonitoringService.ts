export const MonitoringService = {

  log(
    level: string,
    message: string
  ) {

    console.log(

      `[${level}]`,
      message
    );
  },

  trackMetric(
    metric: string,
    value: number
  ) {

    console.log(

      `[METRIC]`,
      metric,
      value
    );
  },
};

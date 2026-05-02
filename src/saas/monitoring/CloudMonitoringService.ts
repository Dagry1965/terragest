export const CloudMonitoringService = {

  log(
    level: string,
    message: string
  ) {

    console.log(

      `[${level}]`,
      message
    );
  },

  trackPerformance(
    metric: string,
    value: number
  ) {

    console.log(

      `[PERFORMANCE]`,
      metric,
      value
    );
  },
};

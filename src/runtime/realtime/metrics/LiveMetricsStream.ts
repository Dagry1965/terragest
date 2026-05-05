export class
LiveMetricsStream {

  publish(
    metric: string,
    value: number
  ) {

    console.log(
      "[Live Metric]",
      metric,
      value
    );
  }
}

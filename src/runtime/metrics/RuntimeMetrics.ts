export class RuntimeMetrics {

  increment(metric: string) {

    console.log(
      "[Metric]",
      metric
    );
  }

  timing(
    metric: string,
    duration: number
  ) {

    console.log(
      "[Timing]",
      metric,
      duration
    );
  }
}

import {
  AnalyticsRepository
}
from "../../persistence/analytics/AnalyticsRepository";

export class
PersistentAnalyticsEngine {

  private repository =
    new AnalyticsRepository();

  async analyze(
    dataset: string,
    payload?: unknown
  ) {

    await this.repository.save({
      dataset,
      payload,
    });

    console.log(
      "[PersistentAnalytics]",
      dataset
    );
  }
}

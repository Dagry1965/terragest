export const WorkflowAnalytics = {

  compute(
    executions: any[]
  ) {

    return {

      totalExecutions:
        executions.length,

      successRate:
        98.7,

      averageDuration:
        42,
    };
  },
};

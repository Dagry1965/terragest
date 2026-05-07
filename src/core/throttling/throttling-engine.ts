type ThrottleConfig = {
  maxJobs: number;

  windowMs: number;
};

const throttleRegistry:
  Record<string, ThrottleConfig> = {
    notifications: {
      maxJobs: 10,
      windowMs: 1000,
    },

    analytics: {
      maxJobs: 2,
      windowMs: 1000,
    },

    maintenance: {
      maxJobs: 20,
      windowMs: 1000,
    },

    workflow: {
      maxJobs: 15,
      windowMs: 1000,
    },
  };

const executionHistory:
  Record<string, number[]> = {};

export function canExecuteJob(
  workerType: string
) {
  const config =
    throttleRegistry[
      workerType
    ];

  if (!config) {
    return true;
  }

  const now = Date.now();

  if (
    !executionHistory[
      workerType
    ]
  ) {
    executionHistory[
      workerType
    ] = [];
  }

  executionHistory[
    workerType
  ] =
    executionHistory[
      workerType
    ].filter(
      (timestamp) =>
        now - timestamp <
        config.windowMs
    );

  if (
    executionHistory[
      workerType
    ].length >=
    config.maxJobs
  ) {
    return false;
  }

  executionHistory[
    workerType
  ].push(now);

  return true;
}

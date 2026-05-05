import {
  bootstrapEnterpriseRuntime
}
from "./bootstrapEnterpriseRuntime";

async function check() {

  const runtime =
    await bootstrapEnterpriseRuntime();

  console.log(
    "[HealthCheck]",
    {
      eventBus:
        !!runtime.eventBus,

      workflowRegistry:
        !!runtime.workflowRegistry,

      ruleRegistry:
        !!runtime.ruleRegistry,

      metrics:
        !!runtime.metrics,

      analytics:
        !!runtime.analytics,

      integrations:
        !!runtime.integrations,

      governance:
        !!runtime.governance,

      supervision:
        !!runtime.supervision,
    }
  );
}

check();

import { EventBus }
from "../events/EventBus";

import { WorkflowRegistry }
from "../registry/WorkflowRegistry";

import { RuleRegistry }
from "../rules/registry/RuleRegistry";

import { RuntimeMetrics }
from "../metrics/RuntimeMetrics";

import { AnalyticsEngine }
from "../data/analytics/AnalyticsEngine";

import { IntegrationBus }
from "../integrations/bridges/IntegrationBus";

import { GovernanceEngine }
from "../os/governance/GovernanceEngine";

import { WorkflowSupervisor }
from "../supervision/WorkflowSupervisor";

import { registerMaterielWorkflows }
from "./registerMaterielWorkflows";

import { registerDomainEvents }
from "./registerDomainEvents";

export async function
bootstrapEnterpriseRuntime() {

  console.log(
    "[EnterpriseRuntime] bootstrapping..."
  );

  const eventBus =
    new EventBus();

  const workflowRegistry =
    new WorkflowRegistry();

  const ruleRegistry =
    new RuleRegistry();

  const metrics =
    new RuntimeMetrics();

  const analytics =
    new AnalyticsEngine();

  const integrations =
    new IntegrationBus();

  const governance =
    new GovernanceEngine();

  const supervision =
    new WorkflowSupervisor();

  registerMaterielWorkflows(
    workflowRegistry
  );

  registerDomainEvents(
    eventBus
  );

  console.log(
    "[EnterpriseRuntime] initialized"
  );

  return {

    eventBus,

    workflowRegistry,

    ruleRegistry,

    metrics,

    analytics,

    integrations,

    governance,

    supervision,
  };
}

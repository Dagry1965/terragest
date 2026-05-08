import {
  PersistentRuntimePublisher
}
from "../monitoring/PersistentRuntimePublisher";

import {
  PersistentWorkflowExecutor
}
from "../execution/PersistentWorkflowExecutor";

import {
  PersistentProcessExecutor
}
from "../processes/PersistentProcessExecutor";

import {
  PersistentAnalyticsEngine
}
from "../data/analytics/PersistentAnalyticsEngine";

import {
  PersistentAuditStream
}
from "../os/audit/PersistentAuditStream";

export class
PersistentMaterielBreakdownFlow {

  private publisher =
    new PersistentRuntimePublisher();

  private workflow =
    new PersistentWorkflowExecutor();

  private process =
    new PersistentProcessExecutor();

  private analytics =
    new PersistentAnalyticsEngine();

  private audit =
    new PersistentAuditStream();

  async execute(
    payload?: unknown
  ) {

    await this.publisher.publish(
      "MATERIEL_BREAKDOWN_DECLARED",
      payload
    );

    await this.workflow.execute(
      "BreakdownInterventionWorkflow",
      payload
    );

    await this.process.execute(
      "MaterielMaintenanceProcess",
      payload
    );

    await this.analytics.analyze(
      "materiel-breakdowns",
      payload
    );

    await this.audit.log(
      "BREAKDOWN_FLOW_COMPLETED",
      payload
    );

    console.log(
      "[PersistentBreakdownFlow] completed"
    );
  }
}

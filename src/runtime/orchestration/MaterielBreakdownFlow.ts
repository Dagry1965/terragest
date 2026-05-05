import {
  MATERIEL_BREAKDOWN_DECLARED
}
from "../../features/materiels/events/MaterielEvents";

import {
  BreakdownInterventionWorkflow
}
from "../../features/interventions/workflows/BreakdownInterventionWorkflow";

import { RulePipeline }
from "../rules/pipelines/RulePipeline";

import { AuditStream }
from "../os/audit/AuditStream";

import { AnalyticsEngine }
from "../data/analytics/AnalyticsEngine";

import { WorkflowSupervisor }
from "../supervision/WorkflowSupervisor";

export class
MaterielBreakdownFlow {

  private workflow =
    new BreakdownInterventionWorkflow();

  private rules =
    new RulePipeline();

  private audit =
    new AuditStream();

  private analytics =
    new AnalyticsEngine();

  private supervision =
    new WorkflowSupervisor();

  async handle(
    payload?: unknown
  ) {

    console.log(
      "[Flow]",
      MATERIEL_BREAKDOWN_DECLARED
    );

    this.rules.execute(
      payload
    );

    const intervention =
      await this.workflow.execute(
        payload
      );

    this.audit.log(
      "BREAKDOWN_FLOW_EXECUTED",
      intervention
    );

    this.analytics.analyze(
      "materiel-breakdowns"
    );

    this.supervision.monitor(
      "MaterielBreakdownFlow"
    );

    return intervention;
  }
}

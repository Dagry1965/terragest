import {
  MATERIEL_CREATED
}
from "../events/MaterielEvents";

import {
  MaterielRealtimeGateway
}
from "../realtime/MaterielRealtimeGateway";

import {
  MaterielSupervisionService
}
from "../supervision/MaterielSupervisionService";

import {
  RuntimeModuleOrchestrator
}
from "@/runtime/orchestration/RuntimeModuleOrchestrator";

import {
  WorkflowExecutor
}
from "@/runtime/workflows/engine/WorkflowExecutor";

import {
  CreateMaterielWorkflow
}
from "../workflows/definitions/CreateMaterielWorkflow";

import {
  RuleRegistry
}
from "@/runtime/rules/registry/RuleRegistry";

import {
  RuleExecutor
}
from "@/runtime/rules/engine/RuleExecutor";

import {
  MaterielCriticalRule
}
from "@/runtime/rules/MaterielCriticalRule";

import {
  AutomationRunner
}
from "@/runtime/automation/runner/AutomationRunner";

import {
  AutomationScheduler
}
from "@/runtime/automation/scheduler/AutomationScheduler";

import {
  MaterielBreakdownRule
}
from "@/runtime/automation/rules/MaterielBreakdownRule";

import type {
  RuntimeEvent
}
from "@/runtime/core/types/RuntimeEvent";

export class EnterpriseMaterielFlow {

  private orchestrator =
    new RuntimeModuleOrchestrator();

  private workflowExecutor =
    new WorkflowExecutor();

  private realtime =
    new MaterielRealtimeGateway();

  private supervision =
    new MaterielSupervisionService();

  private ruleRegistry =
    new RuleRegistry();

  private ruleExecutor =
    new RuleExecutor();

  private automationRunner =
    new AutomationRunner();

  private automationScheduler =
    new AutomationScheduler();

  constructor() {

    this.ruleRegistry.register(
      MaterielCriticalRule
    );

    this.automationScheduler.register(
      MaterielBreakdownRule
    );
  }

  async create(
    payload?: unknown
  ) {

    await this.workflowExecutor.execute(
      CreateMaterielWorkflow,
      payload
    );

    await this.orchestrator.emit(
      "materiels",
      MATERIEL_CREATED,
      payload
    );

    const runtimeEvent: RuntimeEvent = {
      type:
        MATERIEL_CREATED,
      source:
        "materiels",
      module:
        "materiels",
      timestamp:
        Date.now(),
      payload,
    };

    await this.automationRunner.run(
      this.automationScheduler.getAll(),
      runtimeEvent
    );

    this.realtime.publish(
      MATERIEL_CREATED,
      payload
    );

    this.supervision.monitor(
      MATERIEL_CREATED
    );

    await this.ruleExecutor.execute(
      this.ruleRegistry.getAll(),
      {
        module:
          "materiels",
        event:
          MATERIEL_CREATED,
        payload,
      }
    );

    console.log(
      "[EnterpriseMaterielFlow]"
    );
  }
}
import {
  ERPEventBus,
} from "@/runtime/events/bus/ERPEventBus";

import {
  ERPTraceStore,
} from "@/runtime/observability";

import {
  ERPWorkflowRegistry,
} from "../registry/ERPWorkflowRegistry";

import {
  ERPWorkflowExecutionStore,
} from "../store/ERPWorkflowExecutionStore";

import {
  ERPWorkflowTimelineStore,
} from "../timeline/ERPWorkflowTimelineStore";

import type {
  ERPWorkflowDefinition,
  ERPWorkflowExecution,
} from "./ERPWorkflowTypes";

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export const ERPWorkflowEngine = {
  definitions() {
    return ERPWorkflowRegistry;
  },

  byModule(module: string) {
    return ERPWorkflowRegistry.filter(
      (workflow) => workflow.module === module
    );
  },

  start(
    workflowKey: string,
    metadata?: Record<string, unknown>
  ): ERPWorkflowExecution | undefined {
    const definition =
      ERPWorkflowRegistry.find(
        (workflow) => workflow.key === workflowKey
      );

    if (!definition) {
      return undefined;
    }

    const firstStep =
      definition.steps[0];

    const now =
      new Date().toISOString();

    const execution: ERPWorkflowExecution = {
      id: createId("wf_exec"),
      workflowKey: definition.key,
      module: definition.module,
      state: "running",
      currentStep: firstStep?.key,
      startedAt: now,
      updatedAt: now,
      metadata,
    };

    ERPWorkflowExecutionStore.add(execution);

    ERPWorkflowTimelineStore.add({
      id: createId("wf_timeline"),
      workflowKey: definition.key,
      module: definition.module,
      label: `${definition.label} demarre`,
      state: execution.state,
      timestamp: now,
    });

    ERPTraceStore.add({
      traceId: createId("trace_workflow"),
      module: definition.module,
      action: `WORKFLOW_STARTED:${definition.key}`,
      status: "success",
      duration: 0,
      timestamp: now,
    });

    ERPEventBus.emit({
      id: createId("evt_workflow"),
      type: "WORKFLOW_STARTED",
      module: definition.module,
      timestamp: now,
      actor: "workflow-engine",
      payload: {
        workflowKey: definition.key,
        executionId: execution.id,
      },
    });

    return execution;
  },

  complete(
    executionId: string
  ) {
    const execution =
      ERPWorkflowExecutionStore.all().find(
        (item) => item.id === executionId
      );

    if (!execution) {
      return;
    }

    const now =
      new Date().toISOString();

    ERPWorkflowExecutionStore.update(executionId, {
      state: "completed",
      completedAt: now,
    });

    ERPWorkflowTimelineStore.add({
      id: createId("wf_timeline"),
      workflowKey: execution.workflowKey,
      module: execution.module,
      label: "Workflow termine",
      state: "completed",
      timestamp: now,
    });

    ERPTraceStore.add({
      traceId: createId("trace_workflow"),
      module: execution.module,
      action: `WORKFLOW_COMPLETED:${execution.workflowKey}`,
      status: "success",
      duration: 0,
      timestamp: now,
    });

    ERPEventBus.emit({
      id: createId("evt_workflow"),
      type: "WORKFLOW_COMPLETED",
      module: execution.module,
      timestamp: now,
      actor: "workflow-engine",
      payload: {
        workflowKey: execution.workflowKey,
        executionId,
      },
    });
  },
};
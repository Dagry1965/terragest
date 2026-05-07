import { executeHooks } from "@/core/hooks/erp-hooks";
import "@/core/hooks/register-hooks";
import { pushRuntimeEntry } from "@/core/runtime/runtime-timeline";
import { executeRules } from "@/core/rules/rules-engine";
import "@/core/rules/register-rules";
import {
  publishEvent,
} from "@/core/event-bus/event-bus";

import "@/core/event-bus/register-event-subscribers";

export type ERPActionPayload = {
  module: string;
  action: string;
  data?: any;
};

export type ERPActionResult = {
  success: boolean;
  event?: string;
  workflow?: string;
  auditId?: string;
};

export async function executeERPAction(
  payload: ERPActionPayload
): Promise<ERPActionResult> {
  console.log("ERP ACTION EXECUTION", payload);

  pushRuntimeEntry({
    module: payload.module,
    action: payload.action,
    type: "action",
    status: "success",
    entityId: payload.data?.id,
    message:
      `ERP action ${payload.action} exécutée`,
  });

  const beforeHook =
    payload.action === "create"
      ? "beforeCreate"
      : payload.action === "update"
      ? "beforeUpdate"
      : "beforeDelete";

  await executeHooks(
    payload.module,
    beforeHook as any,
    {
      module: payload.module,
      action: payload.action,
      data: payload.data,
    }
  );

  const event =
    `${payload.module}.${payload.action}`;

  await publishEvent({
    name: event,
    module: payload.module,
    payload: payload.data,
    timestamp:
      new Date().toISOString(),
  });

  console.log("DOMAIN EVENT", event);

  pushRuntimeEntry({
    module: payload.module,
    action: payload.action,
    type: "event",
    status: "success",
    entityId: payload.data?.id,
    message:
      `Domain event ${event}`,
  });

  console.log("WORKFLOW EXECUTION", {
    workflow:
      `${payload.module}.${payload.action}.workflow`,
  });

  pushRuntimeEntry({
    module: payload.module,
    action: payload.action,
    type: "workflow",
    status: "success",
    entityId: payload.data?.id,
    message:
      `Workflow ${payload.module}.${payload.action}.workflow`,
  });

  console.log("AUDIT ENTRY CREATED");

  pushRuntimeEntry({
    module: payload.module,
    action: payload.action,
    type: "audit",
    status: "success",
    entityId: payload.data?.id,
    message:
      "Audit runtime enregistré",
  });

  console.log("SUPERVISION UPDATED");

  await executeRules(
    payload.module,
    payload.data
  );

  pushRuntimeEntry({
    module: payload.module,
    action: payload.action,
    type: "supervision",
    status: "success",
    entityId: payload.data?.id,
    message:
      "Supervision runtime mise à jour",
  });

  const afterHook =
    payload.action === "create"
      ? "afterCreate"
      : payload.action === "update"
      ? "afterUpdate"
      : "afterDelete";

  await executeHooks(
    payload.module,
    afterHook as any,
    {
      module: payload.module,
      action: payload.action,
      data: payload.data,
    }
  );

  return {
    success: true,
    event,
    workflow:
      `${payload.module}.${payload.action}.workflow`,
    auditId:
      `AUDIT-${Date.now()}`,
  };
}





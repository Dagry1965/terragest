Write-Host "=== TERRAGEST_V2 - SETUP ERP TRANSITION ENGINE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/transitions" | Out-Null

@'
import {
  canTransition,
} from "@/core/status/status-engine";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

export type ERPTransitionPayload = {
  module: string;

  from: string;

  to: string;

  entityId?: string;
};

export type ERPTransitionResult = {
  allowed: boolean;

  reason?: string;
};

export async function executeTransition(
  payload: ERPTransitionPayload
): Promise<ERPTransitionResult> {
  const allowed =
    canTransition(
      payload.module,
      payload.from,
      payload.to
    );

  if (!allowed) {
    pushRuntimeEntry({
      module: payload.module,
      action: "transition",
      type: "supervision",
      status: "failed",
      entityId: payload.entityId,
      message:
        `Transition interdite : ${payload.from} -> ${payload.to}`,
    });

    return {
      allowed: false,

      reason:
        `Transition interdite : ${payload.from} -> ${payload.to}`,
    };
  }

  pushRuntimeEntry({
    module: payload.module,
    action: "transition",
    type: "workflow",
    status: "success",
    entityId: payload.entityId,
    message:
      `Transition validée : ${payload.from} -> ${payload.to}`,
  });

  return {
    allowed: true,
  };
}
'@ | Set-Content "src/core/transitions/transition-engine.ts"

Write-Host "=== ERP TRANSITION ENGINE créé avec succès ===" -ForegroundColor Green
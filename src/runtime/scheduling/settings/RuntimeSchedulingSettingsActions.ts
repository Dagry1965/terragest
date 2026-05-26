"use server";

import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  RuntimeSchedulingSettingsService,
  type RuntimeSchedulingSettingsServiceContext,
} from "./RuntimeSchedulingSettingsService";

import type {
  RuntimeSchedulingSettings,
  RuntimeSchedulingSettingsStorageScope,
} from "./RuntimeSchedulingSettingsTypes";

export interface RuntimeSchedulingSettingsActionContext
  extends Omit<RuntimeSchedulingSettingsServiceContext, "module"> {
  module?: ERPModule;
}

export interface ReadRuntimeSchedulingSettingsActionInput {
  context: RuntimeSchedulingSettingsActionContext;
}

export interface SaveRuntimeSchedulingSettingsActionInput {
  context: RuntimeSchedulingSettingsActionContext;
  scope: RuntimeSchedulingSettingsStorageScope;
  settings: RuntimeSchedulingSettings;
}

function assertActionContext(
  context: RuntimeSchedulingSettingsActionContext
): void {
  const tenantId = context.tenantId?.trim();

  if (!tenantId) {
    throw new Error("tenantId est requis pour lire ou modifier les paramètres de planification.");
  }
}

export async function readRuntimeSchedulingSettingsAction(
  input: ReadRuntimeSchedulingSettingsActionInput
) {
  const { context } = input;

  assertActionContext(context);

  return RuntimeSchedulingSettingsService.read({
    context,
  });
}

export async function saveRuntimeSchedulingSettingsAction(
  input: SaveRuntimeSchedulingSettingsActionInput
) {
  const { context, scope, settings } = input;

  assertActionContext(context);

  return RuntimeSchedulingSettingsService.save({
    context,
    scope,
    settings,
  });
}

import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  RuntimeSchedulingSettingsRepository,
  type RuntimeSchedulingSettingsRepositoryContext,
} from "./RuntimeSchedulingSettingsRepository";

import { RuntimeSchedulingSettingsResolver } from "./RuntimeSchedulingSettingsResolver";
import { RuntimeSchedulingSettingsEngine } from "./RuntimeSchedulingSettingsEngine";

import type {
  RuntimeSchedulingEffectiveConfig,
  RuntimeSchedulingSettings,
  RuntimeSchedulingSettingsStorageScope,
  RuntimeSchedulingSettingsValidationResult,
} from "./RuntimeSchedulingSettingsTypes";

export interface RuntimeSchedulingSettingsServiceContext
  extends RuntimeSchedulingSettingsRepositoryContext {
  module?: ERPModule;
}

export interface RuntimeSchedulingSettingsServiceReadInput {
  context: RuntimeSchedulingSettingsServiceContext;
}

export interface RuntimeSchedulingSettingsServiceSaveInput {
  context: RuntimeSchedulingSettingsServiceContext;
  scope: RuntimeSchedulingSettingsStorageScope;
  settings: RuntimeSchedulingSettings;
}

export interface RuntimeSchedulingSettingsServiceReadResult {
  storedSettings: Awaited<
    ReturnType<typeof RuntimeSchedulingSettingsRepository.resolveStoredSettings>
  >;
  effectiveConfig?: RuntimeSchedulingEffectiveConfig;
}

export interface RuntimeSchedulingSettingsServiceSaveResult {
  validation: RuntimeSchedulingSettingsValidationResult;
  effectiveConfig?: RuntimeSchedulingEffectiveConfig;
}

function requireRuntimeContext(
  context: RuntimeSchedulingSettingsServiceContext
): void {
  const tenantId = context.tenantId?.trim();

  if (!tenantId) {
    throw new Error("tenantId est requis pour les paramètres de planification.");
  }
}

function assertScopeContext(
  scope: RuntimeSchedulingSettingsStorageScope,
  context: RuntimeSchedulingSettingsServiceContext
): void {
  requireRuntimeContext(context);

  if ((scope === "workspace" || scope === "module") && !context.workspaceId?.trim()) {
    throw new Error(
      "workspaceId est requis pour les paramètres de planification workspace/module."
    );
  }

  if (scope === "module" && !context.moduleKey?.trim()) {
    throw new Error(
      "moduleKey est requis pour les paramètres de planification module."
    );
  }
}

async function resolveEffectiveConfigIfPossible(
  context: RuntimeSchedulingSettingsServiceContext
): Promise<RuntimeSchedulingEffectiveConfig | undefined> {
  if (!context.module) {
    return undefined;
  }

  return RuntimeSchedulingSettingsResolver.resolveForRuntimeGuard({
    module: context.module,
    context: {
      tenantId: context.tenantId,
      workspaceId: context.workspaceId,
      moduleKey: context.moduleKey ?? context.module.metadata.key,
    },
  });
}

export class RuntimeSchedulingSettingsService {
  static async read(
    input: RuntimeSchedulingSettingsServiceReadInput
  ): Promise<RuntimeSchedulingSettingsServiceReadResult> {
    const { context } = input;

    requireRuntimeContext(context);

    const storedSettings =
      await RuntimeSchedulingSettingsRepository.resolveStoredSettings(context);

    const effectiveConfig =
      await resolveEffectiveConfigIfPossible(context);

    return {
      storedSettings,
      effectiveConfig,
    };
  }

  static validateEffectiveConfig(
    config: RuntimeSchedulingEffectiveConfig
  ): RuntimeSchedulingSettingsValidationResult {
    return RuntimeSchedulingSettingsEngine.validate(config);
  }

  static async save(
    input: RuntimeSchedulingSettingsServiceSaveInput
  ): Promise<RuntimeSchedulingSettingsServiceSaveResult> {
    const { context, scope, settings } = input;

    assertScopeContext(scope, context);

    if (scope === "tenant") {
      await RuntimeSchedulingSettingsRepository.saveTenantSettings(
        context,
        settings
      );
    }

    if (scope === "workspace") {
      await RuntimeSchedulingSettingsRepository.saveWorkspaceSettings(
        context,
        settings
      );
    }

    if (scope === "module") {
      await RuntimeSchedulingSettingsRepository.saveModuleSettings(
        context,
        settings
      );
    }

    const effectiveConfig =
      await resolveEffectiveConfigIfPossible(context);

    const validation = effectiveConfig
      ? RuntimeSchedulingSettingsEngine.validate(effectiveConfig)
      : {
          ok: true,
          issues: [],
        };

    return {
      validation,
      effectiveConfig,
    };
  }
}

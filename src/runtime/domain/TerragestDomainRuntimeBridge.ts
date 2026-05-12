import * as TerragestDomainModel from "./models/TerragestDomainModel";
import * as TerragestBusinessRules from "./rules/TerragestBusinessRules";
import * as TerragestInterModuleRules from "./rules/TerragestInterModuleRules";

import {
  ERPEventBus,
} from "@/runtime/events/bus/ERPEventBus";

import {
  erpBusinessRuleEngine,
} from "@/runtime/rules/ERPBusinessRuleEngine";

import {
  RuntimeNotificationEngine,
} from "@/runtime/notifications/RuntimeNotificationEngine";

import {
  RuntimeObservabilityEngine,
} from "@/runtime/observability/RuntimeObservabilityEngine";

import {
  TerragestBusinessRuleAdapter,
} from "@/runtime/domain/adapters/TerragestBusinessRuleAdapter";

type RuntimeBridgeTarget = {
  register?: (item: unknown) => void;
  add?: (item: unknown) => void;
  registerRule?: (item: any) => void;
  emit?: (event: any) => void;
  publish?: (event: any) => void;
  notify?: (notification: any) => Promise<void> | void;
  log?: (entry: any) => Promise<void> | void;
};

export type TerragestDomainRuntimeBridgeDependencies = {
  businessRuleEngine?: RuntimeBridgeTarget;
  ruleRegistry?: RuntimeBridgeTarget;
  notificationEngine?: RuntimeBridgeTarget;
  observabilityEngine?: RuntimeBridgeTarget;
  eventBus?: RuntimeBridgeTarget;
};

type TerragestRuntimeBinding = {
  source: string;
  name: string;
  item: unknown;
};

function collectRuntimeBindings(
  source: string,
  moduleExports: Record<string, unknown>
): TerragestRuntimeBinding[] {
  return Object.entries(moduleExports)
    .filter(([name]) => !name.startsWith("__"))
    .flatMap(([name, value]) => {
      if (Array.isArray(value)) {
        return value.map((item, index) => ({
          source,
          name: `${name}.${index}`,
          item,
        }));
      }

      if (value && typeof value === "object") {
        return [{ source, name, item: value }];
      }

      return [];
    });
}

function toBusinessRule(
  binding: TerragestRuntimeBinding
) {
  const item = binding.item as any;

  if (
    item &&
    typeof item === "object" &&
    typeof item.validate === "function"
  ) {
    return {
      id:
        String(
          item.id ??
            `TERRAGEST_${binding.source}_${binding.name}`
        ),
      module:
        String(
          item.module ??
            item.moduleKey ??
            item.entity ??
            "terragest"
        ),
      description:
        String(
          item.description ??
            binding.name
        ),
      validate:
        item.validate,
    };
  }

  return null;
}

function registerBinding(
  target: RuntimeBridgeTarget | undefined,
  binding: TerragestRuntimeBinding
) {
  if (!target) {
    return;
  }

  const rule =
    toBusinessRule(binding);

  if (
    rule &&
    typeof target.registerRule === "function"
  ) {
    target.registerRule(rule);
    return;
  }

  const payload = {
    domain: "terragest",
    source: binding.source,
    name: binding.name,
    item: binding.item,
  };

  if (typeof target.register === "function") {
    target.register(payload);
    return;
  }

  if (typeof target.add === "function") {
    target.add(payload);
  }
}

function emitBridgeEvent(
  target: RuntimeBridgeTarget | undefined,
  eventName: string,
  payload: unknown
) {
  if (!target) {
    return;
  }

  const event = {
    id: `terragest_${eventName}_${Date.now()}`,
    module: "terragest",
    type: eventName,
    payload,
    timestamp: new Date().toISOString(),
  };

  if (typeof target.emit === "function") {
    target.emit(event);
    return;
  }

  if (typeof target.publish === "function") {
    target.publish(event);
  }
}

export function createTerragestDomainRuntimeBridge(
  dependencies: TerragestDomainRuntimeBridgeDependencies = {}
) {
  const resolvedDependencies = {
    businessRuleEngine:
      dependencies.businessRuleEngine ??
      erpBusinessRuleEngine,
    ruleRegistry:
      dependencies.ruleRegistry,
    notificationEngine:
      dependencies.notificationEngine ??
      RuntimeNotificationEngine,
    observabilityEngine:
      dependencies.observabilityEngine ??
      RuntimeObservabilityEngine,
    eventBus:
      dependencies.eventBus ??
      ERPEventBus,
  };

  const modelBindings =
    collectRuntimeBindings(
      "TerragestDomainModel",
      TerragestDomainModel
    );

  const businessRuleBindings =
    collectRuntimeBindings(
      "TerragestBusinessRules",
      TerragestBusinessRules
    );

  const interModuleRuleBindings =
    collectRuntimeBindings(
      "TerragestInterModuleRules",
      TerragestInterModuleRules
    );

  const allBindings = [
    ...modelBindings,
    ...businessRuleBindings,
    ...interModuleRuleBindings,
  ];

  function registerDomainModel() {
    for (const binding of modelBindings) {
      registerBinding(
        resolvedDependencies.observabilityEngine,
        binding
      );
    }
  }

function registerBusinessRules() {
  const adaptedRules =
    TerragestBusinessRuleAdapter
      .adaptMany(
        TerragestBusinessRules.TerragestBusinessRules
      );

  for (
    const adaptedRule
    of adaptedRules
  ) {
    resolvedDependencies
      .businessRuleEngine
      ?.registerRule?.(
        adaptedRule
      );
  }

  for (
    const binding
    of businessRuleBindings
  ) {
    registerBinding(
      resolvedDependencies
        .ruleRegistry,
      binding
    );
  }
}

  function registerInterModuleRules() {
    for (const binding of interModuleRuleBindings) {
      registerBinding(
        resolvedDependencies.businessRuleEngine,
        binding
      );

      registerBinding(
        resolvedDependencies.ruleRegistry,
        binding
      );
    }
  }

  async function boot() {
    registerDomainModel();
    registerBusinessRules();
    registerInterModuleRules();

    const summary = {
      bindingsCount: allBindings.length,
      modelBindingsCount: modelBindings.length,
      businessRuleBindingsCount: businessRuleBindings.length,
      interModuleRuleBindingsCount: interModuleRuleBindings.length,
    };

    emitBridgeEvent(
      resolvedDependencies.eventBus,
      "TERRAGEST_DOMAIN_RUNTIME_BRIDGE_BOOTED",
      summary
    );

await resolvedDependencies.observabilityEngine?.log?.({
  type: "domain-runtime",
  module: "terragest",
  message: "Terragest domain connected to ERP runtime.",
  metadata: summary,
});

  await resolvedDependencies.notificationEngine?.notify?.({
  type: "runtime",
  module: "terragest",
  title: "Terragest runtime bridge",
  message: "Domaine Terragest connecté au runtime ERP.",
  severity: "info",
});

    return {
      domain: "terragest",
      status: "booted",
      bindings: allBindings,
      summary,
    };
  }

  return {
    domain: "terragest",
    bindings: allBindings,
    modelBindings,
    businessRuleBindings,
    interModuleRuleBindings,
    registerDomainModel,
    registerBusinessRules,
    registerInterModuleRules,
    boot,
  };
}

export const TerragestDomainRuntimeBridge =
  createTerragestDomainRuntimeBridge();
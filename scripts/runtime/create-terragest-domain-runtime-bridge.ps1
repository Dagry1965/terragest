$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"
$file = Join-Path $root "src\runtime\domain\TerragestDomainRuntimeBridge.ts"

$content = @'
import * as TerragestDomainModel from "./models/TerragestDomainModel";
import * as TerragestBusinessRules from "./rules/TerragestBusinessRules";
import * as TerragestInterModuleRules from "./rules/TerragestInterModuleRules";

type RuntimeBridgeTarget = {
  register?: (item: unknown) => void;
  add?: (item: unknown) => void;
  emit?: (event: unknown) => void;
  publish?: (event: unknown) => void;
  notify?: (notification: unknown) => void;
  audit?: (entry: unknown) => void;
  trace?: (entry: unknown) => void;
};

export type TerragestDomainRuntimeBridgeDependencies = {
  businessRulesEngine?: RuntimeBridgeTarget;
  erpBusinessRuleEngine?: RuntimeBridgeTarget;
  ruleRegistry?: RuntimeBridgeTarget;
  notificationEngine?: RuntimeBridgeTarget;
  alertStore?: RuntimeBridgeTarget;
  observabilityEngine?: RuntimeBridgeTarget;
  eventBus?: RuntimeBridgeTarget;
  workflowEngine?: RuntimeBridgeTarget;
  automationEngine?: RuntimeBridgeTarget;
  auditEngine?: RuntimeBridgeTarget;
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

function registerOnTarget(
  target: RuntimeBridgeTarget | undefined,
  binding: TerragestRuntimeBinding
) {
  if (!target) return;

  const payload = {
    domain: "terragest",
    source: binding.source,
    name: binding.name,
    item: binding.item,
  };

  if (typeof target.register === "function") target.register(payload);
  else if (typeof target.add === "function") target.add(payload);
}

function emitBridgeEvent(
  target: RuntimeBridgeTarget | undefined,
  eventName: string,
  payload: unknown
) {
  if (!target) return;

  const event = {
    domain: "terragest",
    name: eventName,
    payload,
    createdAt: new Date().toISOString(),
  };

  if (typeof target.emit === "function") target.emit(event);
  else if (typeof target.publish === "function") target.publish(event);
}

export function createTerragestDomainRuntimeBridge(
  dependencies: TerragestDomainRuntimeBridgeDependencies = {}
) {
  const modelBindings = collectRuntimeBindings(
    "TerragestDomainModel",
    TerragestDomainModel
  );

  const businessRuleBindings = collectRuntimeBindings(
    "TerragestBusinessRules",
    TerragestBusinessRules
  );

  const interModuleRuleBindings = collectRuntimeBindings(
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
      registerOnTarget(dependencies.observabilityEngine, binding);
      registerOnTarget(dependencies.auditEngine, binding);
    }
  }

  function registerBusinessRules() {
    for (const binding of businessRuleBindings) {
      registerOnTarget(dependencies.businessRulesEngine, binding);
      registerOnTarget(dependencies.erpBusinessRuleEngine, binding);
      registerOnTarget(dependencies.ruleRegistry, binding);
    }
  }

  function registerInterModuleRules() {
    for (const binding of interModuleRuleBindings) {
      registerOnTarget(dependencies.businessRulesEngine, binding);
      registerOnTarget(dependencies.erpBusinessRuleEngine, binding);
      registerOnTarget(dependencies.ruleRegistry, binding);
      registerOnTarget(dependencies.workflowEngine, binding);
      registerOnTarget(dependencies.automationEngine, binding);
    }
  }

  function boot() {
    registerDomainModel();
    registerBusinessRules();
    registerInterModuleRules();

    emitBridgeEvent(
      dependencies.eventBus,
      "TERRAGEST_DOMAIN_RUNTIME_BRIDGE_BOOTED",
      {
        bindingsCount: allBindings.length,
        modelBindingsCount: modelBindings.length,
        businessRuleBindingsCount: businessRuleBindings.length,
        interModuleRuleBindingsCount: interModuleRuleBindings.length,
      }
    );

    registerOnTarget(dependencies.alertStore, {
      source: "TerragestDomainRuntimeBridge",
      name: "bridge.booted",
      item: {
        level: "info",
        message: "Terragest domain connected to ERP runtime engines.",
      },
    });

    return {
      domain: "terragest",
      status: "booted",
      bindings: allBindings,
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
'@

[System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))

Write-Host "OK - Bridge créé :" $file
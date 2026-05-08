import { ERPRegistry } from "@/runtime/registry";

export function getERPCockpitSnapshot() {
  const modules = ERPRegistry.modules();

  return {
    modulesCount: modules.length,
    schemasCount: modules.length,
    actionsCount: modules.reduce((total, module) => total + module.actions.length, 0),
    workflowsCount: modules.reduce((total, module) => total + module.workflows.length, 0),
    eventsCount: modules.reduce((total, module) => total + module.events.length, 0),
    automationCount: modules.reduce((total, module) => total + module.automation.length, 0),
    permissionsCount: modules.reduce((total, module) => total + module.permissions.length, 0),
    navigationCount: ERPRegistry.navigation().length,
    modules,
  };
}
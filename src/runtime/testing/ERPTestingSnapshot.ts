import {
  ERPTestingEngine,
} from "./engine/ERPTestingEngine";

export function getERPTestingSnapshot() {

  return {

    tests:
      ERPTestingEngine.registry(),

    history:
      ERPTestingEngine.history(),

    report:
      ERPTestingEngine.report(),
  };
}
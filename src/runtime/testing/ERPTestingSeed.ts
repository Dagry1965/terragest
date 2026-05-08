import {
  ERPTestingEngine,
} from "./engine/ERPTestingEngine";

let seeded = false;

export function seedERPTestingPlatform() {

  if (seeded) {
    return;
  }

  seeded = true;

  ERPTestingEngine.runAll();
}
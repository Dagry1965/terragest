// src/platform/bootstrap/bootstrapERP.ts

import { erpOrchestrator }
from "@/platform/orchestration/ERPOrchestrator";

export function bootstrapERP() {

  erpOrchestrator.initialize();
}
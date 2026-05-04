// src/platform/orchestration/ERPOrchestrator.ts

import { initializeERPWorkflows }
from "@/platform/workflows/ERPWorkflow";

import { initializeERPNotifications }
from "@/platform/workflows/ERPNotifications";

import { initializeERPAudit }
from "@/platform/workflows/ERPAudit";

class ERPOrchestrator {

  initialize() {

    console.log(
      "[ERP] Initializing orchestration..."
    );

    initializeERPWorkflows();

    initializeERPNotifications();

    initializeERPAudit();

    console.log(
      "[ERP] Orchestration ready"
    );
  }
}

export const erpOrchestrator =
  new ERPOrchestrator();
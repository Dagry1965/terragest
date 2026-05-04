// src/platform/orchestration/ERPOrchestrator.ts

import { initializeERPWorkflows }
from "@/platform/workflows/ERPWorkflow";

import { initializeERPNotifications }
from "@/platform/workflows/ERPNotifications";

import { initializeERPAudit }
from "@/platform/workflows/ERPAudit";

import { DependencyValidator }
from "@/platform/dependencies/DependencyValidator";

class ERPOrchestrator {

  initialize() {

    console.log(
      "[ERP] Initializing orchestration..."
    );

    initializeERPWorkflows();

    initializeERPNotifications();

    initializeERPAudit();

    DependencyValidator.validate();

    console.log(
      "[ERP] Orchestration ready"
    );
  }
}

export const erpOrchestrator =
  new ERPOrchestrator();
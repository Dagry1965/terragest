import {
  ERPRuntimeRepository,
} from "../repositories/ERPRuntimeRepository";

import {
  ERPPersistenceCollections,
} from "./ERPPersistenceCollections";

export const ERPRuntimePersistenceService = {
  events:
    new ERPRuntimeRepository(
      ERPPersistenceCollections.events
    ),

  traces:
    new ERPRuntimeRepository(
      ERPPersistenceCollections.traces
    ),

  alerts:
    new ERPRuntimeRepository(
      ERPPersistenceCollections.alerts
    ),

  workflows:
    new ERPRuntimeRepository(
      ERPPersistenceCollections.workflows
    ),

  queueJobs:
    new ERPRuntimeRepository(
      ERPPersistenceCollections.queueJobs
    ),

  audit:
    new ERPRuntimeRepository(
      ERPPersistenceCollections.audit
    ),

  securityAudit:
    new ERPRuntimeRepository(
      ERPPersistenceCollections.securityAudit
    ),
};
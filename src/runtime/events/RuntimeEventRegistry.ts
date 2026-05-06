export const RuntimeEventRegistry = {

  // ======================
  // MATERIELS
  // ======================

  MATERIEL_CREATED:
    "MATERIEL_CREATED",

  MATERIEL_UPDATED:
    "MATERIEL_UPDATED",

  MATERIEL_DELETED:
    "MATERIEL_DELETED",

  MATERIEL_BREAKDOWN_DECLARED:
    "MATERIEL_BREAKDOWN_DECLARED",

  // ======================
  // PRODUITS
  // ======================

  PRODUCT_CREATED:
    "PRODUCT_CREATED",

  PRODUCT_UPDATED:
    "PRODUCT_UPDATED",

  PRODUCT_DELETED:
    "PRODUCT_DELETED",

  // ======================
  // STOCKS
  // ======================

  STOCK_MOVEMENT_CREATED:
    "STOCK_MOVEMENT_CREATED",

  STOCK_UPDATED:
    "STOCK_UPDATED",

  STOCK_ALERT_TRIGGERED:
    "STOCK_ALERT_TRIGGERED",

  // ======================
  // WORKFLOWS
  // ======================

  WORKFLOW_STARTED:
    "WORKFLOW_STARTED",

  WORKFLOW_COMPLETED:
    "WORKFLOW_COMPLETED",

  WORKFLOW_FAILED:
    "WORKFLOW_FAILED",

  // ======================
  // RUNTIME
  // ======================

  RUNTIME_ERROR:
    "RUNTIME_ERROR",

  RETRY_TRIGGERED:
    "RETRY_TRIGGERED",

  DLQ_EVENT_STORED:
    "DLQ_EVENT_STORED",

  // ======================
  // Fournisseurs
  // ======================

  FOURNISSEURS_CREATED:
    "FOURNISSEURS_CREATED",

  FOURNISSEURS_UPDATED:
    "FOURNISSEURS_UPDATED",

  FOURNISSEURS_DELETED:
    "FOURNISSEURS_DELETED",
} as const;

export type RuntimeEventType =
  typeof RuntimeEventRegistry[
    keyof typeof RuntimeEventRegistry
  ];
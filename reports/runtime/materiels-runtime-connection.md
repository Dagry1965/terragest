# MATERIELS RUNTIME CONNECTION

Generated : 05/05/2026 16:16:39

## CREATED

- registerMaterielWorkflows.ts
- registerDomainEvents.ts
- initializeRuntime.ts
- simulateBreakdown.ts

## OBJECTIVE

Connect materiels domain to runtime orchestration.

## EVENT FLOW

MATERIEL_BREAKDOWN_DECLARED
â†’ EventBus
â†’ Runtime
â†’ Workflow

## STATUS

Runtime integration initialized successfully.

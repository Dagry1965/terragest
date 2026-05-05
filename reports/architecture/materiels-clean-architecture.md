# MATERIELS CLEAN ARCHITECTURE MIGRATION

Generated : 05/05/2026 16:13:41

## FEATURE

features/materiels

## CREATED

- repositories/MaterielRepository.ts
- services/MaterielService.ts
- events/MaterielEvents.ts
- workflows/MaterielMaintenanceWorkflow.ts
- policies/MaterielPolicies.ts
- tests/MaterielService.test.ts

## INFRASTRUCTURE

- infrastructure/repositories/firestore/FirestoreMaterielRepository.ts

## OBJECTIVE

Move Firestore outside business layer.

## TARGET ARCHITECTURE

UI
â†’ Hook
â†’ Service
â†’ Repository Interface
â†’ Firestore Adapter

## STATUS

Migration initialized successfully.

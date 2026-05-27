# Q-CLIENT360-1C — Audit edit client record loading

[OK] src/components/erp/generic/GenericEditPage.tsx
[OK] src/components/erp/generic/GenericDetailPage.tsx
[OK] src/runtime/firestore/FirestoreRuntimeQuery.ts
[OK] src/runtime/firestore/FirestoreRuntimeRepository.ts
[OK] src/runtime/context/RuntimeContextEnforcer.ts
[OK] src/runtime/modules/generated/clientsauto/clientsauto.module.ts

## Checks
[OK] GenericEditPage appelle RuntimeDataBinding.detail
[OK] GenericEditPage rend ERPRuntimePage en mode edit
[OK] FirestoreRuntimeQuery.detail applique le guard contexte
[OK] FirestoreRuntimeRepository.findById lit Firestore par id
[OK] RuntimeContextEnforcer exige tenantId/workspace/moduleKey
[OK] clientsauto collection = clientsauto

## Diagnostic probable

Si /clientsauto/[id]/edit n'affiche rien, le record est probablement null.
Cause probable : ancien record Firestore sans tenantId/workspace/moduleKey, donc refusé par RuntimeContextEnforcer.

## Next

Ajouter un diagnostic temporaire dans GenericEditPage pour afficher si le record est trouvé ou refusé.

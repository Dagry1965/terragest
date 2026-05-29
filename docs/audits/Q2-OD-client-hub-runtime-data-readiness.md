# Q2-OD — Client Hub Runtime Data Readiness

- Date: 2026-05-29T01:27:19.159Z
- Root: `C:\Users\Admin\terragest`

## Objectif

Préparer le branchement du Client Operational Hub sur les vraies données runtime.

Règles :

- pas de requête Firestore locale dans l’UI
- privilégier les couches runtime existantes
- brancher d’abord client + véhicules
- interventions/factures seront renforcées dans une passe suivante

## Résumé

- OK: 15
- WARN: 2
- FAIL: 0
- HIGH FAIL: 0

## Checks

| Scope | Status | Severity | Message |
|---|---:|---:|---|
| foundation | OK | HIGH | Found src/runtime/hub/RuntimeClientOperationalHubLoader.ts |
| foundation | OK | HIGH | Found src/app/(private)/clientsauto/hub/page.tsx |
| foundation | OK | HIGH | Found src/components/erp/hub/ERPRecordHubPage.tsx |
| foundation | OK | HIGH | Found src/runtime/hub/RuntimeHubEngine.ts |
| runtime-data | OK | MEDIUM | RuntimeDataBinding detected in 21 runtime file(s) |
| runtime-data | OK | MEDIUM | FirestoreRuntimeQuery detected in 3 runtime file(s) |
| runtime-data | OK | MEDIUM | FirestoreRuntimeRepository detected in 8 runtime file(s) |
| runtime-data | OK | MEDIUM | RuntimeData detected in 24 runtime file(s) |
| runtime-data | OK | MEDIUM | findMany detected in 10 runtime file(s) |
| runtime-data | OK | MEDIUM | findById detected in 9 runtime file(s) |
| runtime-data | OK | MEDIUM | list( detected in 25 runtime file(s) |
| runtime-data | OK | MEDIUM | detail( detected in 11 runtime file(s) |
| loader | OK | HIGH | Loader does not contain local Firestore access |
| loader | WARN | MEDIUM | Loader still appears to contain preview fallback data |
| route | WARN | MEDIUM | Route does not appear to accept searchParams yet |
| route | OK | MEDIUM | Route passes clientId |
| cleanup | OK | HIGH | No Q2-OD backup detected |

## Décision

Q2-OD peut être branché prudemment : loader runtime réel minimal client + véhicules.
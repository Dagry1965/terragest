# Q2-OP-I16-C3 — Audit fichiers actions rendezvous / interventionsauto

Objectif : vérifier si les actions manquantes sont dans les fichiers `*.actions.ts` plutôt que dans les fichiers `*.module.ts`.

## Résumé

- OK : 18
- WARN : 0
- WARN HIGH : 0
- FAIL : 0
- FAIL HIGH : 0

## Checks

| Area | Status | Severity | File | Lines | Message |
|---|---:|---:|---|---|---|
| module-file | OK | HIGH | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous module file found |
| actions-file | OK | HIGH | `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` |  | rendezvous actions file found |
| module-actions-binding | OK | HIGH | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` | 230 | rendezvous module binding actions: rendezvousActions found |
| module-inline-actions | OK | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.module.ts` |  | rendezvous inline actions block in module absent |
| actions-file-expected-key | OK | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` | 7 | rendezvous action key reporter-rdv found in actions file |
| actions-file-expected-label | OK | LOW | `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` | 8 | rendezvous action label Reporter RDV found in actions file |
| actions-file-runtime-contract | OK | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` | 10 | rendezvous runtimeOnly marker found in actions file |
| actions-file-type-contract | OK | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` |  | rendezvous unsupported marker description: absent in actions file |
| actions-file-type-contract | OK | MEDIUM | `src/runtime/modules/generated/rendezvous/rendezvous.actions.ts` |  | rendezvous unsupported marker visibleWhen: absent in actions file |
| module-file | OK | HIGH | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto module file found |
| actions-file | OK | HIGH | `src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts` |  | interventionsauto actions file found |
| module-actions-binding | OK | HIGH | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` | 620 | interventionsauto module binding actions: interventionsautoActions found |
| module-inline-actions | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts` |  | interventionsauto inline actions block in module absent |
| actions-file-expected-key | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts` | 7 | interventionsauto action key demarrer-intervention found in actions file |
| actions-file-expected-label | OK | LOW | `src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts` | 8 | interventionsauto action label Demarrer intervention found in actions file |
| actions-file-runtime-contract | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts` | 10 | interventionsauto runtimeOnly marker found in actions file |
| actions-file-type-contract | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts` |  | interventionsauto unsupported marker description: absent in actions file |
| actions-file-type-contract | OK | MEDIUM | `src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts` |  | interventionsauto unsupported marker visibleWhen: absent in actions file |
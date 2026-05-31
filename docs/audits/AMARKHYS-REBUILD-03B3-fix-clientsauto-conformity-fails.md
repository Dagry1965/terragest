# AMARKHYS-REBUILD-03B3 — Correction ciblée conformité clientsauto

Date: 2026-05-31T15:20:35.409Z

## Corrections appliquées

- Retrait de l'action hardcodée Archiver client depuis ERPEnterpriseForm.
- Retrait des blocs related directs interventions-client, factures-client et encaissements-client depuis clientsauto.module.ts.
- Conservation du principe : les actions clients sont déclarées dans clientsauto.actions.ts.
- Conservation du hub opérationnel client pour la lecture composée du parcours.

## Related blocks retirés

- OK — interventions-client
- OK — factures-client
- OK — encaissements-client

## Checks

- OK — Bloc interventions-client supprimé du module client
- OK — Bloc factures-client supprimé du module client
- OK — Bloc encaissements-client supprimé du module client
- OK — client module ne référence plus interventionId
- OK — client module ne référence plus factureId
- OK — ERPEnterpriseForm ne contient plus l'action Archiver client
- OK — ERPEnterpriseForm conserve les autres actions métier non client
- OK — clientsauto actions dédiées non modifiées ici

## Synthèse

- OK: 8
- FAIL: 0

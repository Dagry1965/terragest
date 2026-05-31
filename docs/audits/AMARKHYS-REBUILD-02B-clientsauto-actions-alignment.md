# AMARKHYS-REBUILD-02B — Alignement actions clientsauto

Date: 2026-05-31T15:04:00.254Z

## Objectif

Remettre en conformité les actions du module clientsauto selon le recadrage AMARKHYS.

## Décision appliquée

- clientsauto.actions.ts n'est plus vide.
- clientsauto.module.ts référence clientsautoActions.
- Les anciennes actions inline du module ont été remplacées par une référence runtime.
- Aucun bouton/action n'a été ajouté dans ERPEnterpriseForm.

## Actions déclarées

- Activer client
- Désactiver client
- Réactiver client
- Archiver client
- Ajouter véhicule
- Ouvrir fiche opérationnelle

## Checks

- OK — clientsauto.actions.ts contains 6 actions
- OK — module imports clientsautoActions
- OK — module uses actions: clientsautoActions
- OK — module no longer contains old /client360-demo action
- OK — module no longer contains old /rendezvous/nouveau client action
- OK — ERPEnterpriseForm untouched by this pass

## Résultat

- OK: 6
- FAIL: 0

## Prochaine étape

Lancer pnpm build puis relancer l'audit de recadrage clientsauto.

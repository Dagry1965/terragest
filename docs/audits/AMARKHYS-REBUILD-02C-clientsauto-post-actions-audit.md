# AMARKHYS-REBUILD-02C — Audit post-correction clientsauto

Date: 2026-05-31T15:08:27.958Z

## Objectif

Vérifier que clientsauto est remis en conformité côté actions runtime après AMARKHYS-REBUILD-02B.

## Fichiers audités

- src/runtime/modules/generated/clientsauto/clientsauto.module.ts
- src/runtime/modules/generated/clientsauto/clientsauto.actions.ts
- src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx

## Checks

- OK — clientsauto.actions.ts existe et n'est pas vide
- OK — clientsauto.actions.ts déclare 6 actions
- OK — Action présente: Activer client
- OK — Action présente: Désactiver client
- OK — Action présente: Réactiver client
- OK — Action présente: Archiver client
- OK — Action présente: Ajouter véhicule
- OK — Action présente: Ouvrir fiche opérationnelle
- OK — Key présente: clientsauto.activer
- OK — Key présente: clientsauto.desactiver
- OK — Key présente: clientsauto.reactiver
- OK — Key présente: clientsauto.archiver
- OK — Key présente: clientsauto.ajouter-vehicule
- OK — Key présente: clientsauto.ouvrir-fiche-operationnelle
- OK — clientsauto.module.ts importe clientsautoActions
- OK — clientsauto.module.ts utilise actions: clientsautoActions
- OK — Ancienne action inline /client360-demo supprimée
- OK — Ancienne action inline /rendezvous/nouveau supprimée du module clientsauto
- OK — Aucune action clientsauto ajoutée dans ERPEnterpriseForm
- OK — Actions navigation parent/enfant déclarées
- OK — Actions statut pilotées runtimeOnly
- OK — Statuts recadrage clients respectés

## Synthèse

- OK: 22
- FAIL: 0

## Décision

La passe clientsauto actions runtime est conforme. On peut committer après contrôle git.

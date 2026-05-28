# Q2-L — Final Operational Runtime Lock

## Statut

Q2-L est validé fonctionnellement.

## Chaîne opérationnelle validée

Client → Véhicule → Rendez-vous → Intervention → Facture

## Modules validés

- clientsauto
- vehicules
- rendezvous
- interventionsauto
- facturesauto

## Contrôles validés

- GenericListPage route les modules `operational.enabled` vers `ERPOperationalModulePage`
- KPI opérationnels OK
- Recherche opérationnelle OK
- Colonnes pilotées par `operational.table.fields`
- Champs techniques masqués via `hiddenFields`
- Labels relationnels pilotés par `relationLabelFields`
- Expands enfants opérationnels OK
- Right panel opérationnel OK
- RuntimeOperationalChildrenResolver utilise `metadata.key`
- RuntimeOperationalDataResolver supporte les labels relationnels
- Build OK
- Git code clean avant rapport

## Dette technique non bloquante

Des fichiers `.bak-*` historiques existent encore dans `src`, notamment des backups d'encodage, anciennes routes, fichiers quarantainés et anciens essais UI.

Ils ne bloquent pas Q2-L car ils ne proviennent pas de la passe opérationnelle courante Q2-I/Q2-J/Q2-L.

Nettoyage recommandé plus tard dans une passe séparée :

`MODE ERP — Q2-M-CLEANUP-LEGACY-BACKUPS`

## Conclusion

Le socle opérationnel runtime-driven est verrouillé pour les modules cœur AMARKHYS.

Prochaine étape possible :

`MODE ERP — Q2-M` — polish UX final / panneaux / cockpit / consolidation visuelle.

# Q2-H-B — Test visuel manuel des pages opérationnelles

## Résultat

Q2-H-B est validé.

- /rendezvous : OK
- /interventionsauto : OK
- /facturesauto : OK

## /rendezvous

- Header opérationnel visible : OK
- Date du jour visible : OK
- Utilisateur connecté visible : OK
- KPI visibles : OK
- Filtres visibles : OK
  - Statut : OK
  - Type service : OK
  - Client : OK
- Table visible : OK
  - Client : OK
  - Véhicule : OK
  - Date rendez-vous : OK
  - Heure rendez-vous : OK
  - Type service : OK
  - Statut : OK
- Client affiché avec libellé lisible : OK
- Véhicule affiché avec libellé lisible : OK
- RightPanel visible avec métriques : OK
- Bouton expand fonctionne : OK
- Expand affiche les interventions liées si présentes : OK
- Boutons Ouvrir cohérents : OK
- Aucun crash console : OK

## Correction data test réalisée pendant le test

Le premier passage visuel /rendezvous ne permettait pas de valider les labels/expand car les données de test étaient hors contexte runtime.

Diagnostic :
- RDV et interventions répartis entre NO_TENANT / NO_WORKSPACE, ORG_ABC_001 / amarkhys et ORG_AMARKHYS_001 / amarkhys.
- La configuration runtime était correcte.
- Le blocage venait des données de test, pas de l’UI.

Correction contrôlée :
- Alignement des RDV et interventions de test sur :
  - tenantId: ORG_AMARKHYS_001
  - workspace: amarkhys
  - moduleKey: rendezvous / interventionsauto
  - contextPath cohérent

Résultat :
- 14 documents réalignés.
- Liens rendezVousId conservés.
- Aucun orphan détecté.
- Expand /rendezvous validé après rechargement.

## /interventionsauto

- Header opérationnel visible : OK
- KPI visibles : OK
- Filtres visibles : OK
  - Statut : OK
  - Type intervention : OK
  - Client : OK
- Table visible : OK
  - Client : OK
  - Véhicule : OK
  - Date intervention : OK
  - Type intervention : OK
  - Kilométrage : OK
  - Coût total : OK
  - Statut : OK
- Client lisible : OK
- Véhicule lisible : OK
- RightPanel visible : OK
  - Total : OK
  - Coût total : OK
- Bouton expand fonctionne : OK
- Expand affiche les lignes intervention : OK
- Expand affiche les factures liées : OK
- Boutons Ouvrir ligne / Ouvrir facture cohérents : OK
- Aucun crash console : OK

## /facturesauto

- Header opérationnel visible : OK
- KPI visibles : OK
- Filtres visibles : OK
  - Statut paiement : OK
  - Statut facture : OK
  - Client : OK
- Table visible : OK
  - Numéro facture : OK
  - Client : OK
  - Véhicule : OK
  - Date facture : OK
  - Montant TTC : OK
  - Montant payé : OK
  - Reste à payer : OK
  - Statut paiement : OK
- Client lisible : OK
- Véhicule lisible : OK
- RightPanel visible : OK
  - Total : OK
  - Montant TTC : OK
  - Reste à payer : OK
- Bouton expand fonctionne : OK
- Expand affiche les encaissements : OK
- Expand affiche les échéances : OK
- Boutons Ouvrir encaissement / Ouvrir échéance cohérents : OK
- Aucun crash console : OK

## Décision

Q2-H-B valide le test visuel manuel des pages opérationnelles.

Le socle Operational UX Runtime est prêt pour gel ou passe de polish ciblée.

# BILLING-MODEL-D-C — Audit flux lignes facture

## Objectif

Auditer statiquement le flux runtime `intervention terminée → facture entête → lignes facture` après build OK.

## Résultats

- OK — invoice header create: Facture entête créée via RuntimeDataBinding.create(facturesModule, ...).
- OK — created invoice id recovery: Récupération de l'id facture depuis le retour create.
- OK — fallback filtered invoice lookup: Fallback par liste filtrée sur numeroFacture ou interventionId.
- OK — strict line modules: Les modules lignes intervention et lignes facture sont recherchés dans coreERPModules.
- OK — strict intervention line filter: Les lignes intervention sont filtrées strictement par interventionId.
- OK — no line without invoice id: Aucune ligne facture créée sans factureId, modules et interventionId.
- OK — removed or cancelled lines ignored: Les lignes retirées, annulées ou retirées sont exclues.
- OK — invoice line create: Création de lignesfactureauto sourcées depuis lignesinterventionauto.

## Synthèse

- Audit statique OK.
- Le flux crée l'entête facture puis les lignes facture uniquement quand le contexte est complet.
- Aucun fallback global de lignes intervention n'est introduit.

## Prochaine étape

BILLING-MODEL-D-D : test fonctionnel contrôlé sur une intervention terminée avec lignes intervention validées.

# Q2-L-B2-B — Runtime action governance rules

## Statut

Patch runtime generique applique.
Build OK.

## Objectif

Appliquer les conditions de gouvernance declarative des actions dans RuntimeActionEngine.getAvailableActions, sans modifier les modules metier et sans patch local.

## Fichier modifie

- src/runtime/actions/RuntimeActionEngine.ts

## Changements

Ajout de helpers generiques :

- isEmptyActionValue
- normalizeActionValue
- matchesActionGovernanceRule
- matchesAllActionGovernanceRules
- matchesAnyActionGovernanceRule

## Gouvernance appliquee

RuntimeActionEngine.getAvailableActions applique maintenant :

- governance.hiddenWhen
- governance.visibleWhen
- governance.disabledWhen
- governance.disabledReason

## Comportement

- hiddenWhen qui matche : action masquee.
- visibleWhen defini mais non satisfait : action masquee.
- disabledWhen qui matche : action retournee avec disabled=true.
- disabledReason : injecte dans description pour affichage UI generique.

## Doctrine MODE ERP respectee

- Pas de patch local AMARKHYS.
- Pas de modification des modules generes.
- Pas de correction metier module par module.
- Pas de nouveau moteur.
- RuntimeActionEngine reste le point central.
- ERPRuntimePage / ERPRuntimeActionBar peuvent consommer disabled et description sans modification.

## Limites

Cette passe pose le moteur de gouvernance mais ne declare pas encore de regles metier dans les modules.

Les incoherences Q2-L-A restent a traiter par declaration progressive de governance dans les modules, ou par guards runtime dedies si la regle exige des donnees parent/enfant.

## Suite recommandee

Q2-L-B2-C — declarer une premiere regle governance simple et non risquee sur une action runtime existante, puis verifier affichage/masquage/desactivation.
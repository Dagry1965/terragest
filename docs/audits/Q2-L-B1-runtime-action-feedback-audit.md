# Q2-L-B1 — Runtime ActionResult + feedback utilisateur generique

## Statut

Patch runtime generique applique.
Build OK.

## Objectif

Brancher le resultat de RuntimeActionEngine.execute vers un feedback utilisateur generique sans modifier les regles metier et sans patch local module par module.

## Fichiers modifies

- src/runtime/actions/RuntimeActionEngine.ts
- src/components/erp/runtime/ERPRuntimePage.tsx

## Changements

### RuntimeActionEngine

Ajout de types generiques :

- RuntimeActionResultSeverity
- RuntimeActionResult

Le type RuntimeActionResult prepare la standardisation des retours action :

- success
- title
- message
- severity
- action
- record
- result
- errors
- effects
- nextActions

### ERPRuntimePage

Ajout d'un helper generique showRuntimeActionFeedback(actionResult).

Le resultat de RuntimeActionEngine.execute est maintenant transforme en feedback utilisateur via ERPToast et react-hot-toast.

## Doctrine MODE ERP respectee

- Pas de patch local AMARKHYS.
- Pas de regle metier ajoutee.
- Pas de modification des modules generes.
- Pas de duplication de moteur.
- RuntimeActionEngine reste le point central.
- UI generique consomme maintenant le resultat runtime.

## Limites

Cette passe ne resout pas encore la visibilite conditionnelle des actions.

Les incoherences Q2-L-A restent a traiter dans les passes suivantes :

- visibility metadata
- disabled reason
- guards declaratifs
- coherence processus general
- effets metier attendus

## Decision suite

Prochaine passe recommandee :

Q2-L-B2 — Action visibility metadata foundation
# AMARKHYS-HUB-PARCOURS-ACTIONS-RETURNTO-A

## Objectif

Contextualiser uniquement les ouvertures de lignes dans ERPOperationalTable.

## Correction

- Ajout usePathname.
- Ajout useSearchParams.
- Construction d'un returnTo depuis l'URL courante.
- Ajout de returnTo au router.push vers /module/id/edit.

## Validation attendue

- Parcours opérationnel → clic ligne intervention → page edit intervention.
- Bandeau retour visible.
- Retour vers fiche client opérationnelle.
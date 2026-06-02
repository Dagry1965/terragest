# RUNTIME-LIST-RETURN-BANNER-A

## Objectif

Afficher un bandeau retour générique sur les pages listes runtime quand l’URL contient returnTo.

## Correction

- Injection de ERPHubReturnBanner dans ERPRuntimePage.
- Activation uniquement en mode liste runtime.
- Aucun patch module par module.
- Aucun changement dans ERPRuntimeTable.
- Aucun changement dans les routes mouvementsstockauto / commandesstockauto / receptionsstockauto / lignesinterventionauto.

## Effet attendu

Les pages suivantes affichent le bandeau retour si returnTo est présent :

- /mouvementsstockauto?returnTo=...
- /commandesstockauto?returnTo=...
- /receptionsstockauto?returnTo=...
- /lignesinterventionauto?returnTo=...

## Validation attendue

- Depuis /produitsauto/hub, cliquer “Voir tous les mouvements” affiche un bandeau retour.
- Depuis /produitsauto/hub, cliquer “Voir toutes les commandes” affiche un bandeau retour.
- Depuis /produitsauto/hub, cliquer “Voir toutes les réceptions” affiche un bandeau retour.
- Depuis /produitsauto/hub, cliquer “Voir toutes les sorties” affiche un bandeau retour.
- Sans returnTo, les listes restent inchangées.
- Build OK.
# AMARKHYS-HUB-RETURN-BANNER

## Objectif

Afficher un bouton de retour vers la fiche client opérationnelle sur les pages ouvertes depuis le hub via returnTo.

## Composant ajouté

- `src\components\erp\runtime\ERPHubReturnBanner.tsx`

## Pages patchées

- `src\components\erp\generic\GenericDetailPage.tsx`
- `src\components\erp\generic\GenericEditPage.tsx`
- `src\components\erp\generic\GenericCreatePage.tsx`

## Pages introuvables

- Aucune

## Fonctionnement

- Le composant lit returnTo depuis l’URL.
- Il ignore les returnTo non relatifs pour éviter les redirections externes.
- Il affiche un lien vers la fiche client opérationnelle.
- Il conserve clientId, selectedVehicleId, selectedInterventionId et selectedFactureId déjà transportés dans returnTo.

## Checks

- OK — component written
- OK — generic detail patched or missing
- OK — generic edit patched or missing
- OK — generic create patched or missing

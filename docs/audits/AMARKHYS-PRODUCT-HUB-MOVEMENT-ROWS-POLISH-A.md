# AMARKHYS-PRODUCT-HUB-MOVEMENT-ROWS-POLISH-A

## Objectif

Corriger l’affichage des lignes mouvements stock dans la fiche produit opérationnelle.

## Problèmes corrigés

- Suppression de l’affichage brut des identifiants techniques sourceId.
- Remplacement par une information métier lisible :
  - date mouvement
  - origine métier
- Correction du libellé selon le sens du mouvement :
  - sortie + lignesinterventionauto -> Sortie intervention
  - entrée + lignesinterventionauto -> Réintégration intervention
  - entrée + receptionsstockauto -> Réception fournisseur

## Hors périmètre

- Aucun changement de moteur stock.
- Aucun changement de loader.
- Aucun changement du design validé.
- Aucun changement de layout.
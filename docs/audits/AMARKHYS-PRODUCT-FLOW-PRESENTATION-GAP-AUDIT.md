# AMARKHYS-PRODUCT-FLOW-PRESENTATION-GAP-AUDIT

## Objectif

Identifier uniquement les écarts qui empêchent le parcours produit / stock d’être présentable.

## Parcours cible

Produit
→ Stock
→ Mouvement stock
→ Ligne intervention / sortie stock
→ Commande fournisseur
→ Ligne commande
→ Réception stock
→ Mouvement stock entrant
→ Stock mis à jour
→ Hub produit / stock

## Points à qualifier après lecture terminal

### Produit / stock
- Produit lisible : OK / KO
- Stocks liés au produit : OK / KO
- Stock courant clair : OK / KO
- Seuil alerte visible : OK / KO
- Mouvements récents visibles : OK / KO

### Intervention / sortie stock
- Ligne intervention produit : OK / KO
- Brouillon sans sortie stock : OK / KO
- Validation ligne avec sortie stock : OK / KO
- Retrait ligne avec réintégration stock : OK / KO

### Commande / réception
- Commande fournisseur lisible : OK / KO
- Lignes commande lisibles : OK / KO
- Réception liée à commande + ligne : OK / KO
- Réception validée avec entrée stock : OK / KO
- Anti double réception : OK / KO

### Hub produit / stock
- Route /produitsauto/hub : OK / KO
- Sélection produit : OK / KO
- Sélection stock : OK / KO
- KPI produit / stock : OK / KO
- Commandes / réceptions rattachées : OK / KO

## Décision attendue

- Corriger uniquement les points KO bloquants pour présentation.
- Ne pas créer de logique locale si un moteur runtime existe.

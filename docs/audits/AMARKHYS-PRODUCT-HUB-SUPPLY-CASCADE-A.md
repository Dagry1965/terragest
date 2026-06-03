# AMARKHYS-PRODUCT-HUB-SUPPLY-CASCADE-A

## Objectif

Préparer la structure Commande fournisseur → Ligne commande → Ligne réception dans la fiche produit opérationnelle.

## Besoin métier

Voir la vie du produit dans le stock :

- commandes fournisseurs synthétiques
- lignes de commande du produit
- lignes de réception associées
- quantités commandées / livrées / restantes
- montants et statuts

## Résultat

- OK: 27
- KO: 0

## Checks

- OK — Loader charges lignescommandestockauto
- OK — Loader charges fournisseursauto
- OK — Loader computes productOrderLines
- OK — Loader computes productOrdersFromLines
- OK — Loader computes productReceptionsFromLines
- OK — Loader has productOrderLineIds
- OK — Loader has productOrderIds
- OK — Loader enriches orders with product line
- OK — Loader enriches receptions with product line
- OK — Loader does not yet expose supplyChainByOrder — Expected for audit A. This will be added in the next implementation pass.
- OK — Commande module has fournisseurId
- OK — Commande module has dateCommande
- OK — Commande module has montantTTC
- OK — Commande module has statut
- OK — Ligne commande module has commandeId
- OK — Ligne commande module has produitId
- OK — Ligne commande module has quantiteCommandee
- OK — Ligne commande module has montantTTC
- OK — Réception module has commandeId
- OK — Réception module has ligneCommandeId
- OK — Réception module has produitId
- OK — Réception module has quantiteRecue
- OK — Réception module has dateReception
- OK — Réception module has statut
- OK — Sheet currently renders Commandes fournisseurs panel
- OK — Sheet currently renders Réceptions stock panel
- OK — Sheet does not yet render expandable supply cascade — Expected for audit A. This will be added later.

## Conclusion

- Le loader dispose déjà des lignes de commande du produit.
- Le loader dispose déjà des réceptions liées aux lignes/commandes.
- La prochaine passe doit exposer une structure supplyChainByOrder ou équivalent.
- La fiche pourra ensuite afficher une cascade Commande → Ligne commande → Réception.
- Le bloc Approvisionnement en colonne droite doit rester synthétique.

## Décision

La passe suivante ne doit pas modifier les moteurs stock.
Elle doit seulement structurer les données déjà disponibles pour permettre une présentation expandable.

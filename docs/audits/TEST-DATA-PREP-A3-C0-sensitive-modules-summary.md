\# TEST-DATA-PREP-A3-C0 — Synthèse inspection modules sensibles



\## Objectif



Synthétiser les contraintes des modules sensibles avant écriture du script de seed Firestore déterministe.



Cette étape ne modifie pas Firestore.



\## Modules inspectés



\- produitsauto

\- stocksauto

\- fournisseursauto

\- commandesstockauto

\- lignescommandestockauto

\- receptionsstockauto

\- mouvementsstockauto

\- rappelsauto



\## Décisions confirmées



\### Produits



Le module `produitsauto` utilise notamment :



\- `reference`

\- `nom`

\- `marque`

\- `typeRecord`

\- `parentProductId`

\- `typeArticle`

\- `categorie`

\- `typeProduit`

\- `stockable`

\- `unite`

\- `prixAchat`

\- `prixVente`

\- `seuilMinimum`

\- `statut`



Valeurs importantes :



\- `typeRecord` : `simple`, `family`, `variant`

\- `typeArticle` : `piece`, `main\_oeuvre`, `service`, `remise`

\- `categorie` : `huile\_moteur`, `filtre`, `liquide`, `piece`, `consommable`, `service`

\- `typeProduit` : `stockable`, `non\_stockable`

\- `statut` : `actif`, `rupture`, `inactif`, `archive`



Décision seed :



\- Les pièces, huiles, liquides, filtres et consommables seront `stockable`.

\- Les services et main d’œuvre seront `non\_stockable`.

\- Les produits de démonstration seront majoritairement `typeRecord: "simple"`.



\## Stocks



Le module `stocksauto` est lié à un produit via `produitId`.



Champs importants :



\- `produitId`

\- `quantite`

\- `seuilAlerte`

\- `emplacement`

\- `typeStock`

\- `statut`

\- `observations`



Valeurs importantes :



\- `typeStock` : `atelier`, `magasin`, `depot`, `reserve`

\- `statut` : `disponible`, `stock\_faible`, `rupture`, `archive`



Décision seed :



\- Créer un document `stocksauto` par produit stockable.

\- Utiliser un seul emplacement principal : `Stock principal atelier`.

\- Utiliser `typeStock: "atelier"` pour les stocks réellement utilisés.

\- Les stocks secondaires pourront être représentés plus tard, mais le seed A3-C privilégie la lisibilité.



\## Fournisseurs



Le module `fournisseursauto` contient notamment :



\- `nom`

\- `codeFournisseur`

\- `telephone`

\- `email`

\- `adresse`



Décision seed :



\- Créer 3 fournisseurs réalistes :

&#x20; - GarageParts Distribution

&#x20; - BrakePro Services

&#x20; - EnergyAuto Batteries



\## Règles pour A3-C



Le script seed devra :



\- utiliser des IDs stables préfixés `demo-`

\- ne pas inventer de champs hors metadata

\- créer les produits avant les stocks

\- créer un stock par produit stockable

\- utiliser `demo-stock-main-\*` comme convention d’ID pour les stocks produits

\- utiliser les valeurs exactes d’options détectées

\- différencier produits stockables et services non stockables

\- générer ensuite commandes, lignes, réceptions et mouvements avec les relations correctes



\## Conclusion



A3-C0 valide que le seed peut démarrer, mais impose une correction de conception importante : le stock principal est un emplacement logique partagé, tandis que les documents `stocksauto` restent liés produit par produit.


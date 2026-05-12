# TERRAGEST BUSINESS MODEL V2

## Vision

Le terrain reprÃ©sente la ressource physique centrale.

Le contrat autorise lâ€™exploitation.

Lâ€™exploitation reprÃ©sente lâ€™activitÃ© Ã©conomique.

La campagne reprÃ©sente une pÃ©riode opÃ©rationnelle.

Les mouvements alimentent :
- les stocks
- la comptabilitÃ©
- la rentabilitÃ©

---

## Architecture mÃ©tier

Utilisateurs
    â†“
Terrains
    â†“
Contrats
    â†“
Exploitations
    â†“
Campagnes
    â†“
Ressources / Actifs / Produits
    â†“
Mouvements
    â†“
Stocks + ComptabilitÃ©
    â†“
RentabilitÃ©

---

## Modules

- utilisateurs
- terrains
- contrats
- exploitations
- campagnes
- ressources
- actifs
- produits
- stocks
- mouvements
- comptabilite
- biensImmobiliers
- documents

---

## Chronologie mÃ©tier

Aucune entitÃ© fille
ne peut dÃ©passer
la pÃ©riode de son parent.

Contrat
â†’ Exploitation
â†’ Campagne
â†’ Mouvement

---

## RÃ¨gles critiques

- exploitation nÃ©cessite contrat actif
- campagne doit Ãªtre comprise dans exploitation
- mouvement interdit hors campagne active
- stock interdit nÃ©gatif
- vente = revenu
- achat = dÃ©pense
- consommation diminue stock
- production augmente stock
- rentabilitÃ© = revenus - dÃ©penses
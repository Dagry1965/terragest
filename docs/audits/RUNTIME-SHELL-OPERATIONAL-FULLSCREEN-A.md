# RUNTIME-SHELL-OPERATIONAL-FULLSCREEN-A

## Objectif

Ajouter un mode plein écran opérationnel avec sidebar rétractable pour les hubs qui nécessitent tout l’écran.

## Correction

- Transformation de ErpShell en composant client.
- Lecture du pathname via usePathname.
- Ajout d’une liste centralisée OPERATIONAL_FULLSCREEN_ROUTES.
- Activation du mode plein écran pour /produitsauto/hub.
- Sidebar masquée par défaut et rappelable au survol du bord gauche.
- Suppression du topbar uniquement en mode opérationnel plein écran.
- Aucun changement dans la fiche produit / stock elle-même.

## Validation attendue

- /produitsauto/hub utilise toute la largeur écran.
- La sidebar est masquée par défaut.
- La languette “Menu” est visible à gauche.
- Au survol du bord gauche, la sidebar réapparaît.
- Les autres pages gardent le shell standard.
- Build OK.
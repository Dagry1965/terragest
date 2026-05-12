# CONTRATS BUSINESS RULES V2

## RÃ¨gles critiques

- un contrat doit Ãªtre liÃ© Ã  un terrain
- un contrat doit avoir un propriÃ©taire
- dateDebut < dateFin
- un contrat expirÃ© interdit nouvelles campagnes
- un contrat rÃ©siliÃ© bloque exploitation
- un terrain en litige interdit contrat actif

## Chronologie

contrat
â†’ exploitation
â†’ campagne
â†’ mouvements

Aucune entitÃ© fille
ne peut dÃ©passer
les dates du contrat.

## Gestion documentaire

Le document contrat
reprÃ©sente la rÃ©fÃ©rence juridique officielle.
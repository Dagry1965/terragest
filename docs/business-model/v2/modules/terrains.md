# TERRAINS BUSINESS RULES V2

## RÃ¨gles critiques

- un terrain doit avoir un propriÃ©taire
- surfaceTotale > 0
- surfaceDisponible >= 0
- surfaceExploitee <= surfaceTotale
- terrain en litige interdit nouvelles exploitations

## Calculs

surfaceDisponible =
surfaceTotale -
surfaceExploitee -
surfaceHabitation

## Relations

terrain
â†’ contrats
â†’ exploitations
â†’ campagnes
â†’ actifs
â†’ immobilier
# TERRAGEST_V2 - Runtime Repository Governance

## Architecture officielle

UI
â†’ RuntimeDataBinding
â†’ RuntimeRepository
â†’ FirestoreRuntimeRepository
â†’ Firestore

## Interdictions

- Nouveau repository mÃ©tier spÃ©cifique
- Nouveau FirestoreRepository parallÃ¨le
- Nouveau BaseRepository parallÃ¨le
- AccÃ¨s direct collection(...)
- AccÃ¨s direct doc(...)
- CRUD page par page
- Persistence hors runtime

## Obligatoire

- createBusinessModule(...)
- businessFields.ts
- RuntimeDataBinding
- RuntimeRepository
- metadata-driven
- runtime-driven

## StratÃ©gie

- centraliser
- mutualiser
- industrialiser
- rÃ©duire duplication
- converger vers le runtime central

## PrioritÃ©s

1. produits
2. stocks
3. mouvements
4. terrains
5. interventions
6. maintenance
# Q22E-9M-E-A — Guard slot policy usage audit

## Objectif

Identifier où `processRuntimeBeforeMutationGuards.ts` recalcule encore duration, buffer ou capacity au lieu de consommer `SchedulingSlotPolicyResolver`.

## Doctrine

Le guard protège les écritures. Il ne doit pas maintenir une policy parallèle. Il doit consommer la même policy que le scheduling engine.

## Résumé

- Findings : 27
- HIGH : 0
- REVIEW : 27

## Findings HIGH — calculs locaux suspects

_Aucun finding._


## Findings REVIEW — guard acceptable mais à brancher

| Sévérité | Cible | Ligne | Extrait | Décision |
|---|---|---:|---|---|
| REVIEW | durationMinutes | 345 | `durationMinutes:` | Le guard peut utiliser la durée, mais elle doit venir de SchedulingSlotPolicyResolver. |
| REVIEW | durationMinutes | 346 | `typeof mergedRecord.durationMinutes === "number"` | Le guard peut utiliser la durée, mais elle doit venir de SchedulingSlotPolicyResolver. |
| REVIEW | durationMinutes | 347 | `? mergedRecord.durationMinutes` | Le guard peut utiliser la durée, mais elle doit venir de SchedulingSlotPolicyResolver. |
| REVIEW | durationMinutes | 348 | `: Number(mergedRecord.durationMinutes ?? 0) \|\| undefined,` | Le guard peut utiliser la durée, mais elle doit venir de SchedulingSlotPolicyResolver. |
| REVIEW | durationMinutes | 360 | `durationMinutes:` | Le guard peut utiliser la durée, mais elle doit venir de SchedulingSlotPolicyResolver. |
| REVIEW | durationMinutes | 361 | `typeof mergedRecord.durationMinutes === "number"` | Le guard peut utiliser la durée, mais elle doit venir de SchedulingSlotPolicyResolver. |
| REVIEW | durationMinutes | 362 | `? mergedRecord.durationMinutes` | Le guard peut utiliser la durée, mais elle doit venir de SchedulingSlotPolicyResolver. |
| REVIEW | durationMinutes | 363 | `: Number(mergedRecord.durationMinutes ?? 0) \|\| undefined,` | Le guard peut utiliser la durée, mais elle doit venir de SchedulingSlotPolicyResolver. |
| REVIEW | durationMinutes | 467 | `durationMinutes: slotPolicy.visibleDurationMinutes,` | Le guard peut utiliser la durée, mais elle doit venir de SchedulingSlotPolicyResolver. |
| REVIEW | durationMinutes | 467 | `durationMinutes: slotPolicy.visibleDurationMinutes,` | Le guard peut utiliser la durée, mais elle doit venir de SchedulingSlotPolicyResolver. |
| REVIEW | durationMinutes | 495 | `durationMinutes:` | Le guard peut utiliser la durée, mais elle doit venir de SchedulingSlotPolicyResolver. |
| REVIEW | durationMinutes | 496 | `normalizedRecord.durationMinutes,` | Le guard peut utiliser la durée, mais elle doit venir de SchedulingSlotPolicyResolver. |
| REVIEW | bufferMinutes | 349 | `bufferMinutes: schedulingConfig?.bufferMinutes,` | Le buffer doit venir de SchedulingSlotPolicyResolver, pas d’un recalcul local. |
| REVIEW | bufferMinutes | 349 | `bufferMinutes: schedulingConfig?.bufferMinutes,` | Le buffer doit venir de SchedulingSlotPolicyResolver, pas d’un recalcul local. |
| REVIEW | bufferMinutes | 472 | `bufferMinutes: slotPolicy.bufferMinutes,` | Le buffer doit venir de SchedulingSlotPolicyResolver, pas d’un recalcul local. |
| REVIEW | bufferMinutes | 472 | `bufferMinutes: slotPolicy.bufferMinutes,` | Le buffer doit venir de SchedulingSlotPolicyResolver, pas d’un recalcul local. |
| REVIEW | capacity | 350 | `capacity: schedulingConfig?.capacity,` | Le guard protège la capacité, mais doit consommer une policy résolue. |
| REVIEW | capacity | 350 | `capacity: schedulingConfig?.capacity,` | Le guard protège la capacité, mais doit consommer une policy résolue. |
| REVIEW | capacity | 387 | `const capacity = slotPolicy.capacity;` | Le guard protège la capacité, mais doit consommer une policy résolue. |
| REVIEW | capacity | 387 | `const capacity = slotPolicy.capacity;` | Le guard protège la capacité, mais doit consommer une policy résolue. |
| REVIEW | capacity | 389 | `if (capacity <= 1) {` | Le guard protège la capacité, mais doit consommer une policy résolue. |
| REVIEW | capacity | 430 | `// Q22F3C_CAPACITY_GUARD` | Le guard protège la capacité, mais doit consommer une policy résolue. |
| REVIEW | capacity | 431 | `// Generic ERP scheduling guard: capacity is enforced before persistence.` | Le guard protège la capacité, mais doit consommer une policy résolue. |
| REVIEW | capacity | 475 | `capacity,` | Le guard protège la capacité, mais doit consommer une policy résolue. |
| REVIEW | RuntimeSchedulingEngine.assertWithinOpeningHours | 354 | `RuntimeSchedulingEngine.assertWithinOpeningHours({` | Acceptable provisoirement : guard d’intégrité horaire. Plus tard, brancher sur policy/settings effective. |
| REVIEW | RuntimeSchedulingEngine.assertNoAppointmentConflict | 391 | `RuntimeSchedulingEngine.assertNoAppointmentConflict(` | Acceptable si les paramètres transmis viennent de policy/settings. |
| REVIEW | schedulingConfig?.bufferMinutes | 349 | `bufferMinutes: schedulingConfig?.bufferMinutes,` | Acceptable si cette lecture est uniquement l'input transmis à SchedulingSlotPolicyResolver.resolve(...). |


## Décision attendue

- Ce qui doit être remplacé par `SchedulingSlotPolicyResolver.resolve(...)`.
- Ce qui reste dans le guard comme protection d’intégrité.
- Ce qui reste dans `RuntimeSchedulingEngine`.

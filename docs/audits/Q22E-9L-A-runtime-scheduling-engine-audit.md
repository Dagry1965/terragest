# Q22E-9L-A — Audit ciblé RuntimeSchedulingEngine

## 1. Objectif

Ce rapport inspecte uniquement `src/runtime/scheduling/RuntimeSchedulingEngine.ts`.

But : décider ce qui reste dans le scheduling générique et ce qui doit sortir vers metadata, settings, resolver, guard, business rules ou mapping.

## 2. Doctrine appliquée

```text
Est-ce vraiment UI ou est-ce une règle runtime ?
```

Réponse : le calcul planning est runtime. Le moteur peut calculer les slots, mais ne doit pas connaître AMARKHYS, rendezvous, vehiculeId, typeService ou intervention.

## 3. Classification cible

| Élément | Couche correcte | Décision |
|---|---|---|
| Génération de slots | Engine / SchedulingSlotPolicy | À garder si générique |
| Buffer | Settings + Resolver + SchedulingSlotPolicy | À garder seulement via config résolue |
| Capacity | Engine + Guard | Calcul moteur, protection guard |
| Resource | Metadata + Resolver | Via resourceField, jamais via vehiculeId direct |
| Rendezvous -> Intervention | BusinessRule / Workflow / Mapping | À sortir du scheduling engine |
| Champs AMARKHYS | Module metadata / Mapping | Interdits dans moteur générique |

## 4. Résumé

- Total findings : 79
- HIGH : 30
- REVIEW : 11
- INFO : 38

## 5. Findings HIGH — à sortir du moteur

| Sévérité | Ligne | Règle | Niveau | Cible ERP | Extrait | Décision |
|---|---:|---|---|---|---|---|
| HIGH | 26 | LOCAL_FIELD_DATE_RENDEZVOUS | Metadata violation | Module metadata scheduling.dateField | `dateField: "dateRendezVous",` | dateRendezVous doit venir de scheduling.dateField résolu, pas du moteur. |
| HIGH | 119 | LOCAL_FIELD_DATE_RENDEZVOUS | Metadata violation | Module metadata scheduling.dateField | `const dateRendezVous = asString(record.dateRendezVous);` | dateRendezVous doit venir de scheduling.dateField résolu, pas du moteur. |
| HIGH | 119 | LOCAL_FIELD_DATE_RENDEZVOUS | Metadata violation | Module metadata scheduling.dateField | `const dateRendezVous = asString(record.dateRendezVous);` | dateRendezVous doit venir de scheduling.dateField résolu, pas du moteur. |
| HIGH | 122 | LOCAL_FIELD_DATE_RENDEZVOUS | Metadata violation | Module metadata scheduling.dateField | `return Boolean(dateRendezVous && heureRendezVous);` | dateRendezVous doit venir de scheduling.dateField résolu, pas du moteur. |
| HIGH | 611 | LOCAL_FIELD_DATE_RENDEZVOUS | Metadata violation | Module metadata scheduling.dateField | `"Impossible de calculer le créneau : dateRendezVous et heureRendezVous sont obligatoires."` | dateRendezVous doit venir de scheduling.dateField résolu, pas du moteur. |
| HIGH | 729 | LOCAL_MODULE_RENDEZVOUS | Engine violation | BusinessRule / Metadata / Mapping | `rendezvous: RuntimeRecord` | Le moteur scheduling générique ne doit pas connaître rendezvous. À déplacer ou remplacer par metadata/config. |
| HIGH | 731 | LOCAL_MODULE_RENDEZVOUS | Engine violation | BusinessRule / Metadata / Mapping | `if (!rendezvous) {` | Le moteur scheduling générique ne doit pas connaître rendezvous. À déplacer ou remplacer par metadata/config. |
| HIGH | 738 | LOCAL_MODULE_RENDEZVOUS | Engine violation | BusinessRule / Metadata / Mapping | `if (isCancelledAppointment(rendezvous)) {` | Le moteur scheduling générique ne doit pas connaître rendezvous. À déplacer ou remplacer par metadata/config. |
| HIGH | 745 | LOCAL_MODULE_RENDEZVOUS | Engine violation | BusinessRule / Metadata / Mapping | `if (asString(rendezvous.consumedByInterventionId)) {` | Le moteur scheduling générique ne doit pas connaître rendezvous. À déplacer ou remplacer par metadata/config. |
| HIGH | 753 | LOCAL_MODULE_RENDEZVOUS | Engine violation | BusinessRule / Metadata / Mapping | `if (!asString(rendezvous.clientId)) {` | Le moteur scheduling générique ne doit pas connaître rendezvous. À déplacer ou remplacer par metadata/config. |
| HIGH | 753 | LOCAL_FIELD_CLIENT_ID | Mapping métier | BusinessRule / Mapping metadata | `if (!asString(rendezvous.clientId)) {` | clientId est un champ métier. Le scheduling engine ne doit pas le manipuler directement. |
| HIGH | 756 | LOCAL_FIELD_CLIENT_ID | Mapping métier | BusinessRule / Mapping metadata | `reason: "Impossible de créer une intervention : clientId manquant.",` | clientId est un champ métier. Le scheduling engine ne doit pas le manipuler directement. |
| HIGH | 760 | LOCAL_MODULE_RENDEZVOUS | Engine violation | BusinessRule / Metadata / Mapping | `if (!asString(rendezvous.vehiculeId)) {` | Le moteur scheduling générique ne doit pas connaître rendezvous. À déplacer ou remplacer par metadata/config. |
| HIGH | 760 | LOCAL_FIELD_VEHICULE_ID | Engine violation | Module metadata / Resolved resourceField | `if (!asString(rendezvous.vehiculeId)) {` | vehiculeId doit venir de scheduling.resourceField ou d'une config résolue, jamais être hardcodé dans le moteur. |
| HIGH | 763 | LOCAL_FIELD_VEHICULE_ID | Engine violation | Module metadata / Resolved resourceField | `reason: "Impossible de créer une intervention : vehiculeId manquant.",` | vehiculeId doit venir de scheduling.resourceField ou d'une config résolue, jamais être hardcodé dans le moteur. |
| HIGH | 767 | LOCAL_MODULE_RENDEZVOUS | Engine violation | BusinessRule / Metadata / Mapping | `if (!asString(rendezvous.id)) {` | Le moteur scheduling générique ne doit pas connaître rendezvous. À déplacer ou remplacer par metadata/config. |
| HIGH | 777 | LOCAL_MODULE_RENDEZVOUS | Engine violation | BusinessRule / Metadata / Mapping | `static buildInterventionFromRendezvous(rendezvous: RuntimeRecord): RuntimeRecord {` | Le moteur scheduling générique ne doit pas connaître rendezvous. À déplacer ou remplacer par metadata/config. |
| HIGH | 777 | BUILD_INTERVENTION_FROM_RENDEZVOUS | Business workflow violation | RuntimeBusinessRule / RuntimeWorkflowAction / Mapping engine | `static buildInterventionFromRendezvous(rendezvous: RuntimeRecord): RuntimeRecord {` | La création intervention depuis RDV est une règle métier/workflow, pas une responsabilité scheduling. |
| HIGH | 779 | LOCAL_MODULE_RENDEZVOUS | Engine violation | BusinessRule / Metadata / Mapping | `rendezvous` | Le moteur scheduling générique ne doit pas connaître rendezvous. À déplacer ou remplacer par metadata/config. |
| HIGH | 787 | LOCAL_MODULE_RENDEZVOUS | Engine violation | BusinessRule / Metadata / Mapping | `clientId: rendezvous.clientId,` | Le moteur scheduling générique ne doit pas connaître rendezvous. À déplacer ou remplacer par metadata/config. |
| HIGH | 787 | LOCAL_FIELD_CLIENT_ID | Mapping métier | BusinessRule / Mapping metadata | `clientId: rendezvous.clientId,` | clientId est un champ métier. Le scheduling engine ne doit pas le manipuler directement. |
| HIGH | 787 | LOCAL_FIELD_CLIENT_ID | Mapping métier | BusinessRule / Mapping metadata | `clientId: rendezvous.clientId,` | clientId est un champ métier. Le scheduling engine ne doit pas le manipuler directement. |
| HIGH | 788 | LOCAL_MODULE_RENDEZVOUS | Engine violation | BusinessRule / Metadata / Mapping | `vehiculeId: rendezvous.vehiculeId,` | Le moteur scheduling générique ne doit pas connaître rendezvous. À déplacer ou remplacer par metadata/config. |
| HIGH | 788 | LOCAL_FIELD_VEHICULE_ID | Engine violation | Module metadata / Resolved resourceField | `vehiculeId: rendezvous.vehiculeId,` | vehiculeId doit venir de scheduling.resourceField ou d'une config résolue, jamais être hardcodé dans le moteur. |
| HIGH | 788 | LOCAL_FIELD_VEHICULE_ID | Engine violation | Module metadata / Resolved resourceField | `vehiculeId: rendezvous.vehiculeId,` | vehiculeId doit venir de scheduling.resourceField ou d'une config résolue, jamais être hardcodé dans le moteur. |
| HIGH | 789 | LOCAL_MODULE_RENDEZVOUS | Engine violation | BusinessRule / Metadata / Mapping | `rendezVousId: rendezvous.id,` | Le moteur scheduling générique ne doit pas connaître rendezvous. À déplacer ou remplacer par metadata/config. |
| HIGH | 790 | LOCAL_MODULE_RENDEZVOUS | Engine violation | BusinessRule / Metadata / Mapping | `typeIntervention: rendezvous.typeService \|\| "autre",` | Le moteur scheduling générique ne doit pas connaître rendezvous. À déplacer ou remplacer par metadata/config. |
| HIGH | 790 | LOCAL_FIELD_TYPE_SERVICE | Mapping métier | BusinessRule / Mapping metadata | `typeIntervention: rendezvous.typeService \|\| "autre",` | typeService est métier AMARKHYS. À sortir du scheduling engine. |
| HIGH | 791 | LOCAL_MODULE_RENDEZVOUS | Engine violation | BusinessRule / Metadata / Mapping | `dateIntervention: rendezvous.dateRendezVous,` | Le moteur scheduling générique ne doit pas connaître rendezvous. À déplacer ou remplacer par metadata/config. |
| HIGH | 791 | LOCAL_FIELD_DATE_RENDEZVOUS | Metadata violation | Module metadata scheduling.dateField | `dateIntervention: rendezvous.dateRendezVous,` | dateRendezVous doit venir de scheduling.dateField résolu, pas du moteur. |


## 6. Findings REVIEW — à vérifier

| Sévérité | Ligne | Règle | Niveau | Cible ERP | Extrait | Décision |
|---|---:|---|---|---|---|---|
| REVIEW | 446 | BUFFER_MINUTES | Scheduling policy | SchedulingSlotPolicy / Settings / Resolver | `bufferMinutes?: number;` | Le buffer est légitime dans le moteur seulement s'il est appliqué depuis config résolue ou policy. |
| REVIEW | 448 | CAPACITY | Scheduling policy + Guard | SchedulingSlotPolicy / RuntimeSchedulingGuard | `capacity?: number;` | La capacité est légitime dans le moteur si elle calcule les slots, mais doit être protégée par guard à l'écriture. |
| REVIEW | 452 | BUFFER_MINUTES | Scheduling policy | SchedulingSlotPolicy / Settings / Resolver | `const bufferMinutes = Math.max(` | Le buffer est légitime dans le moteur seulement s'il est appliqué depuis config résolue ou policy. |
| REVIEW | 454 | BUFFER_MINUTES | Scheduling policy | SchedulingSlotPolicy / Settings / Resolver | `asNumber(params.bufferMinutes, 0)` | Le buffer est légitime dans le moteur seulement s'il est appliqué depuis config résolue ou policy. |
| REVIEW | 466 | BUFFER_MINUTES | Scheduling policy | SchedulingSlotPolicy / Settings / Resolver | `visibleDurationMinutes + bufferMinutes;` | Le buffer est légitime dans le moteur seulement s'il est appliqué depuis config résolue ou policy. |
| REVIEW | 475 | CAPACITY | Scheduling policy + Guard | SchedulingSlotPolicy / RuntimeSchedulingGuard | `const capacity = Math.max(` | La capacité est légitime dans le moteur si elle calcule les slots, mais doit être protégée par guard à l'écriture. |
| REVIEW | 477 | CAPACITY | Scheduling policy + Guard | SchedulingSlotPolicy / RuntimeSchedulingGuard | `asNumber(params.capacity, 1)` | La capacité est légitime dans le moteur si elle calcule les slots, mais doit être protégée par guard à l'écriture. |
| REVIEW | 520 | BUFFER_MINUTES | Scheduling policy | SchedulingSlotPolicy / Settings / Resolver | `bufferMinutes * 60 * 1000` | Le buffer est légitime dans le moteur seulement s'il est appliqué depuis config résolue ou policy. |
| REVIEW | 531 | BUFFER_MINUTES | Scheduling policy | SchedulingSlotPolicy / Settings / Resolver | `// The visible booking ends at endAt, but the blocked range may include bufferMinutes.` | Le buffer est légitime dans le moteur seulement s'il est appliqué depuis config résolue ou policy. |
| REVIEW | 542 | CAPACITY | Scheduling policy + Guard | SchedulingSlotPolicy / RuntimeSchedulingGuard | `Math.max(capacity - usedCapacity, 0);` | La capacité est légitime dans le moteur si elle calcule les slots, mais doit être protégée par guard à l'écriture. |
| REVIEW | 551 | CAPACITY | Scheduling policy + Guard | SchedulingSlotPolicy / RuntimeSchedulingGuard | `capacity,` | La capacité est légitime dans le moteur si elle calcule les slots, mais doit être protégée par guard à l'écriture. |


## 7. Findings INFO — probablement légitimes

| Sévérité | Ligne | Règle | Niveau | Cible ERP | Extrait | Décision |
|---|---:|---|---|---|---|---|
| INFO | 99 | DIRECT_DATE_MATH | Date policy | RuntimeSchedulingEngine / Date utility | `return new Date(` | La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable. |
| INFO | 146 | DIRECT_DATE_MATH | Date policy | RuntimeSchedulingEngine / Date utility | `const date = new Date(trimmed);` | La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable. |
| INFO | 202 | DIRECT_DATE_MATH | Date policy | RuntimeSchedulingEngine / Date utility | `const date = new Date(trimmed);` | La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable. |
| INFO | 206 | DIRECT_DATE_MATH | Date policy | RuntimeSchedulingEngine / Date utility | `String(date.getHours()).padStart(2, "0") +` | La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable. |
| INFO | 208 | DIRECT_DATE_MATH | Date policy | RuntimeSchedulingEngine / Date utility | `String(date.getMinutes()).padStart(2, "0")` | La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable. |
| INFO | 232 | DIRECT_DATE_MATH | Date policy | RuntimeSchedulingEngine / Date utility | `const date = new Date(` | La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable. |
| INFO | 282 | DIRECT_DATE_MATH | Date policy | RuntimeSchedulingEngine / Date utility | `: new Date(left.startAt).getTime();` | La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable. |
| INFO | 287 | DIRECT_DATE_MATH | Date policy | RuntimeSchedulingEngine / Date utility | `: new Date(left.endAt).getTime();` | La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable. |
| INFO | 292 | DIRECT_DATE_MATH | Date policy | RuntimeSchedulingEngine / Date utility | `: new Date(right.startAt).getTime();` | La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable. |
| INFO | 297 | DIRECT_DATE_MATH | Date policy | RuntimeSchedulingEngine / Date utility | `: new Date(right.endAt).getTime();` | La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable. |
| INFO | 362 | DIRECT_DATE_MATH | Date policy | RuntimeSchedulingEngine / Date utility | `const startDate = new Date(startAt);` | La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable. |
| INFO | 363 | DIRECT_DATE_MATH | Date policy | RuntimeSchedulingEngine / Date utility | `const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);` | La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable. |
| INFO | 390 | DIRECT_DATE_MATH | Date policy | RuntimeSchedulingEngine / Date utility | `const date = new Date(normalizedDate + "T00:00:00");` | La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable. |
| INFO | 413 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `const slots: RuntimeAvailabilitySlot[] = [];` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 427 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `slots.push({` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 431 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `available: true,` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 436 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `return slots;` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 451 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `// Generic ERP availability: opening-hours slots minus existing bookings.` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 468 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 483 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `return slots.map((slot) => {` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 483 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `return slots.map((slot) => {` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 486 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `time: slot.start,` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 512 | DIRECT_DATE_MATH | Date policy | RuntimeSchedulingEngine / Date utility | `new Date(asString(booking.startAt));` | La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable. |
| INFO | 515 | DIRECT_DATE_MATH | Date policy | RuntimeSchedulingEngine / Date utility | `new Date(asString(booking.endAt));` | La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable. |
| INFO | 518 | DIRECT_DATE_MATH | Date policy | RuntimeSchedulingEngine / Date utility | `new Date(` | La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable. |
| INFO | 544 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `const available =` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 549 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `...slot,` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 550 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `available,` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 554 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `reason: available` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 584 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 591 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `const allowed = slots.some((slot) => slot.start === normalizedTime);` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 591 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `const allowed = slots.some((slot) => slot.start === normalizedTime);` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 591 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `const allowed = slots.some((slot) => slot.start === normalizedTime);` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 635 | DIRECT_DATE_MATH | Date policy | RuntimeSchedulingEngine / Date utility | `const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);` | La manipulation de dates est acceptable dans le moteur, mais doit être centralisée et testable. |
| INFO | 655 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `const slot = RuntimeSchedulingEngine.computeAppointmentSlot(record, config);` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 659 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `durationMinutes: slot.durationMinutes,` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 660 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `startAt: slot.startAt,` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |
| INFO | 661 | SLOT_GENERATION | Core scheduling | RuntimeSchedulingEngine / SchedulingSlotPolicy | `endAt: slot.endAt,` | La génération et détection de conflits sont légitimes dans le moteur si elles restent génériques. |


## 8. Décision attendue après lecture

Classer chaque bloc de code du moteur en :

- KEEP_IN_ENGINE
- MOVE_TO_SLOT_POLICY
- MOVE_TO_SETTINGS_RESOLVER
- MOVE_TO_GUARD
- MOVE_TO_BUSINESS_RULE
- MOVE_TO_MAPPING_METADATA
- REMOVE_FROM_SCHEDULING

## 9. Prochaine passe

Après validation du rapport : préparer Q22E-9L-B pour extraire du scheduling engine la logique RDV -> intervention et les champs métier hardcodés.

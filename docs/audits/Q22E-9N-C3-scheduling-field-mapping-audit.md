# Q22E-9N-C3 — Scheduling field mapping audit

Date: 2026-05-26T15:35:36.783Z

## Objectif

Auditer si le runtime scheduling est réellement metadata-driven pour les champs métier.

Doctrine:

- Le moteur scheduling ne doit pas connaître dateRendezVous/heureRendezVous.
- Le moteur scheduling doit recevoir un mapping depuis metadata/settings/policy.
- Le module rendezvous peut déclarer son mapping.
- Les guards doivent protéger les modules schedulables, pas un module rendezvous hardcodé.

## Résumé

- Checks: 9
- OK: 9
- FAIL: 0
- FAIL_HIGH: 0
- FAIL_INFO: 0

## Fichiers inspectés

- `src/runtime/scheduling/RuntimeSchedulingEngine.ts`
- `src/runtime/scheduling/RuntimeSchedulingTypes.ts`
- `src/runtime/scheduling/SchedulingSlotPolicy.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts`
- `src/runtime/guards/processRuntimeBeforeMutationGuards.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.module.ts`

## Mentions dateRendezVous / heureRendezVous dans engine

Aucune.

## Mentions rendezvous dans guards

src/runtime/guards/processRuntimeBeforeMutationGuards.ts:371 — // This remains generic: rendezvous provides date/time/duration, the engine validates the slot.

## Mentions typeService dans guards

Aucune.

## Checks détaillés


### OK — Q22E-9N-C3-01

- Label: RuntimeSchedulingEngine existe
- Severity: HIGH
- Details:
src/runtime/scheduling/RuntimeSchedulingEngine.ts

### OK — Q22E-9N-C3-02

- Label: Le moteur expose ou consomme des champs configurables date/time
- Severity: HIGH
- Details:
dateField/timeField dans engine sans default rendezvous hardcodé

### OK — Q22E-9N-C3-03

- Label: Le moteur n'a pas de message d'erreur hardcodé dateRendezVous/heureRendezVous
- Severity: HIGH
- Details:
OK

### OK — Q22E-9N-C3-04

- Label: Types scheduling prévoient une configuration de mapping champs
- Severity: HIGH
- Details:
RuntimeSchedulingTypes.ts

### OK — Q22E-9N-C3-05

- Label: Policy scheduling transporte le mapping champs
- Severity: HIGH
- Details:
SchedulingSlotPolicy.ts

### OK — Q22E-9N-C3-06

- Label: Settings types peuvent porter mapping date/time/duration/resource/status
- Severity: INFO
- Details:
RuntimeSchedulingSettingsTypes.ts

### OK — Q22E-9N-C3-07

- Label: Metadata rendezvous déclare explicitement son mapping scheduling
- Severity: HIGH
- Details:
rendezvous.module.ts

### OK — Q22E-9N-C3-08

- Label: Guards ne doivent pas nommer rendezvous comme règle générique
- Severity: HIGH
- Details:
OK

### OK — Q22E-9N-C3-09

- Label: Guards ne doivent pas dépendre de typeService pour scheduling générique
- Severity: HIGH
- Details:
OK

## Décision recommandée

Le mapping scheduling semble metadata-driven.

Suite recommandée:
- Refaire Q22E-9N-C2.
- Puis reprendre Q22E-9N-C service/action readiness.

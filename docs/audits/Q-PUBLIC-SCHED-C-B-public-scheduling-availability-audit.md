# Q-PUBLIC-SCHED-C-B — Public scheduling availability audit

Date: 2026-05-26T20:50:11.531Z

## Objectif

Auditer la couche public scheduling availability créée pour exposer des créneaux publics issus du RuntimeSchedulingEngine.

Doctrine:
- La page publique ne calcule pas les slots.
- La couche availability appelle le runtime scheduling.
- Le DTO public n'expose aucun identifiant interne.
- Pas d'accès Firestore direct dans l'action/service.

## Résumé

- Checks: 12
- OK: 12
- FAIL: 0
- FAIL_HIGH: 0
- FAIL_INFO: 0

## Fichiers inspectés

- `src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityTypes.ts`
- `src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts`
- `src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityActions.ts`
- `src/runtime/scheduling/public/index.ts`
- `src/components/public/AmarkhysPublicAppointmentLanding.tsx`

## Checks détaillés


### OK — Q-PUBLIC-SCHED-C-B-01

- Label: Types public scheduling availability existent
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityTypes.ts

### OK — Q-PUBLIC-SCHED-C-B-02

- Label: Service public scheduling availability existe
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts

### OK — Q-PUBLIC-SCHED-C-B-03

- Label: Action server public availability existe
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityActions.ts

### OK — Q-PUBLIC-SCHED-C-B-04

- Label: Service utilise le resolver settings scheduling
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts

### OK — Q-PUBLIC-SCHED-C-B-05

- Label: Service utilise RuntimeSchedulingEngine.getAvailableSlotsWithBookings
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts

### OK — Q-PUBLIC-SCHED-C-B-06

- Label: Service retourne des DTO publics de slots
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts

### OK — Q-PUBLIC-SCHED-C-B-07

- Label: Service ne retourne pas d'identifiants internes publics
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityTypes.ts, src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts

### OK — Q-PUBLIC-SCHED-C-B-08

- Label: Service ne touche pas Firestore directement
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts

### OK — Q-PUBLIC-SCHED-C-B-09

- Label: Action ne touche pas Firestore et délègue au service
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityActions.ts

### OK — Q-PUBLIC-SCHED-C-B-10

- Label: Index exporte types/service/actions
- Severity: HIGH
- Details: src/runtime/scheduling/public/index.ts

### OK — Q-PUBLIC-SCHED-C-B-11

- Label: Page publique n'est pas encore connectée à l'action availability
- Severity: INFO
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-C-B-12

- Label: Jours/créneaux statiques restent à remplacer dans la page publique
- Severity: INFO
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

## Décision recommandée

Aucun échec HIGH. La couche public availability est prête.

Suite recommandée:
- Q-PUBLIC-SCHED-D — connecter AmarkhysPublicAppointmentLanding à getPublicSchedulingAvailabilityAction.
- Remplacer les jours statiques par les créneaux DTO publics.

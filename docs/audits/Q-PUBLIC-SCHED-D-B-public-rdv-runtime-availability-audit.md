# Q-PUBLIC-SCHED-D-B — Public RDV runtime availability audit

Date: 2026-05-26T21:08:47.069Z

## Objectif

Auditer le branchement de la page publique /rdv à la couche Runtime Public Scheduling Availability.

Doctrine:
- La page publique consomme l'action public availability.
- Elle ne calcule pas les slots.
- Elle ne lit pas Firestore.
- Elle n'expose aucun identifiant interne.
- Le créneau choisi alimente seulement dateSouhaitee / heureSouhaitee à ce stade.

## Résumé

- Checks: 12
- OK: 12
- FAIL: 0
- FAIL_HIGH: 0
- FAIL_INFO: 0

## Fichiers inspectés

- `src/components/public/AmarkhysPublicAppointmentLanding.tsx`
- `src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityActions.ts`
- `src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts`
- `src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityTypes.ts`
- `src/components/public/PublicAppointmentService.ts`

## Checks détaillés


### OK — Q-PUBLIC-SCHED-D-B-01

- Label: Landing importe getPublicSchedulingAvailabilityAction
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-B-02

- Label: Landing charge les disponibilités via useEffect
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-B-03

- Label: Landing stocke availabilityDays et selectedSlot
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-B-04

- Label: Landing affiche chargement/erreur/disponibilités runtime
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-B-05

- Label: Landing remplace les dots statiques par des boutons de créneaux
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-B-06

- Label: Landing alimente dateSouhaitee et heureSouhaitee depuis le slot sélectionné
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-B-07

- Label: Landing ne touche pas Firestore directement
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-B-08

- Label: Landing ne rend pas d'identifiants internes
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-B-09

- Label: Availability action existe
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityActions.ts

### OK — Q-PUBLIC-SCHED-D-B-10

- Label: Availability service utilise RuntimeSchedulingEngine
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts

### OK — Q-PUBLIC-SCHED-D-B-11

- Label: Appointment service retourne toujours un DTO public sécurisé
- Severity: HIGH
- Details: src/components/public/PublicAppointmentService.ts

### OK — Q-PUBLIC-SCHED-D-B-12

- Label: Le créneau choisi n'est pas encore envoyé à createPublicAppointment
- Severity: INFO
- Details: src/components/public/PublicAppointmentService.ts

## Décision recommandée

Aucun échec HIGH. La page publique consomme les disponibilités runtime.

Suite recommandée:
- Q-PUBLIC-SCHED-D-C — envoyer dateSouhaitee/heureSouhaitee/durée à createPublicAppointment.
- Puis valider que le rendez-vous créé utilise le créneau choisi.

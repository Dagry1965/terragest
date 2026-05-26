# Q-PUBLIC-SCHED-D-C — Selected runtime slot submit audit

Date: 2026-05-26T21:21:58.482Z

## Objectif

Auditer l'envoi du créneau runtime sélectionné depuis la page publique /rdv vers createPublicAppointment.

## Résumé

- Checks: 10
- OK: 10
- FAIL: 0
- FAIL_HIGH: 0
- FAIL_INFO: 0

## Fichiers inspectés

- `src/components/public/AmarkhysPublicAppointmentLanding.tsx`
- `src/components/public/PublicAppointmentService.ts`
- `src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts`

## Checks détaillés


### OK — Q-PUBLIC-SCHED-D-C-01

- Label: Landing exige un créneau choisi avant soumission
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-C-02

- Label: Landing envoie dateSouhaitee et heureSouhaitee à createPublicAppointment
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-C-03

- Label: Landing calcule durationMinutes depuis selectedSlot
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-C-04

- Label: PublicAppointmentInput accepte les champs de créneau public
- Severity: HIGH
- Details: src/components/public/PublicAppointmentService.ts

### OK — Q-PUBLIC-SCHED-D-C-05

- Label: PublicAppointmentService normalise date/heure/durée
- Severity: HIGH
- Details: src/components/public/PublicAppointmentService.ts

### OK — Q-PUBLIC-SCHED-D-C-06

- Label: Rendezvous public utilise le créneau choisi
- Severity: HIGH
- Details: src/components/public/PublicAppointmentService.ts

### OK — Q-PUBLIC-SCHED-D-C-07

- Label: PublicAppointmentService retourne toujours un DTO public sécurisé
- Severity: HIGH
- Details: src/components/public/PublicAppointmentService.ts

### OK — Q-PUBLIC-SCHED-D-C-08

- Label: Landing ne touche pas Firestore directement
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-C-09

- Label: Landing ne rend pas d'identifiants internes
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-C-10

- Label: Availability service reste source des créneaux publics
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts

## Décision recommandée

Aucun échec HIGH. La page publique peut créer un RDV avec le créneau runtime sélectionné.

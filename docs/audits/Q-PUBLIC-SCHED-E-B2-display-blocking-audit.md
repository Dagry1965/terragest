# Q-PUBLIC-SCHED-E-B2 — Display and blocking audit

Date: 2026-05-26T22:44:25.923Z

## Résumé

- Checks: 6
- OK: 6
- FAIL: 0
- FAIL_HIGH: 0
- FAIL_INFO: 0

## Checks détaillés


### OK — Q-PUBLIC-SCHED-E-B2-01

- Label: Bouton Voir les créneaux branché sans fonction manquante
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-E-B2-02

- Label: Affichage passe à six créneaux maximum
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-E-B2-03

- Label: Fallback booking date/heure/durée installé
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts

### OK — Q-PUBLIC-SCHED-E-B2-04

- Label: Bookings sont transmis au moteur de disponibilité
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts

### OK — Q-PUBLIC-SCHED-E-B2-05

- Label: La page publique ne lit pas Firestore directement
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-E-B2-06

- Label: Le service public availability ne retourne pas d'identifiants internes
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts

## Décision recommandée

Aucun échec HIGH. Les corrections affichage/bouton/blocage sont prêtes pour test réel.

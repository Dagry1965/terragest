# Q-PUBLIC-SCHED-D-A — Public RDV landing readiness audit

Date: 2026-05-26T20:56:22.149Z

## Objectif

Auditer AmarkhysPublicAppointmentLanding avant branchement à Runtime Public Scheduling Availability.

Doctrine:
- La page publique ne calcule pas les slots.
- La page publique appelle getPublicSchedulingAvailabilityAction.
- Les jours/créneaux statiques doivent être remplacés par des DTO publics.
- Aucun identifiant interne ne doit être affiché.

## Résumé

- Checks: 10
- OK: 10
- FAIL: 0
- FAIL_HIGH: 0
- FAIL_INFO: 0

## Fichiers inspectés

- `src/components/public/AmarkhysPublicAppointmentLanding.tsx`
- `src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityActions.ts`
- `src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts`
- `src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityTypes.ts`
- `src/components/public/PublicAppointmentService.ts`

## Lignes candidates landing

```txt
4: import { useState } from "react";
25: import { createPublicAppointment } from "@/components/public/PublicAppointmentService";
177: const [form, setForm] = useState<AppointmentForm>(initialForm);
178: const [saving, setSaving] = useState(false);
179: const [success, setSuccess] = useState(false);
180: const [error, setError] = useState("");
194: if (!form.nom.trim()) return "Indiquez votre nom.";
195: if (!form.telephone.trim()) return "Indiquez votre numéro de téléphone.";
196: if (!form.vehicule.trim()) return "Indiquez votre véhicule.";
197: if (!form.immatriculation.trim()) return "Indiquez l’immatriculation.";
201: async function handleSubmit() {
213: await createPublicAppointment({
214: nom: form.nom,
215: telephone: form.telephone,
216: vehicule: form.vehicule,
217: immatriculation: form.immatriculation,
232: const days = [
233: { label: "LUN", date: "27 MAI", active: false, dots: 2 },
234: { label: "MAR", date: "28 MAI", active: false, dots: 2 },
235: { label: "MER", date: "29 MAI", active: true, dots: 3 },
236: { label: "JEU", date: "30 MAI", active: false, dots: 2 },
237: { label: "VEN", date: "31 MAI", active: false, dots: 2 },
238: { label: "SAM", date: "01 JUIN", active: false, dots: 2, gold: true },
239: { label: "DIM", date: "02 JUIN", active: false, dots: 0 },
433: {success ? (
462: value={form.nom}
478: value={form.telephone}
496: value={form.vehicule}
512: value={form.immatriculation}
529: value={form.service}
546: value={form.dateSouhaitee}
562: value={form.heureSouhaitee}
579: value={form.message}
597: onClick={handleSubmit}
598: disabled={saving}
602: {saving ? "Envoi en cours..." : "Demander un rendez-vous"}
```

## Lignes candidates UI slots

```txt
33: dateSouhaitee: string;
34: heureSouhaitee: string;
44: dateSouhaitee: "",
45: heureSouhaitee: "",
57: active,
61: active?: boolean;
69: active
182: function updateField(key: keyof AppointmentForm, value: string) {
193: function validateForm() {
202: const validationError = validateForm();
233: { label: "LUN", date: "27 MAI", active: false, dots: 2 },
234: { label: "MAR", date: "28 MAI", active: false, dots: 2 },
235: { label: "MER", date: "29 MAI", active: true, dots: 3 },
236: { label: "JEU", date: "30 MAI", active: false, dots: 2 },
237: { label: "VEN", date: "31 MAI", active: false, dots: 2 },
238: { label: "SAM", date: "01 JUIN", active: false, dots: 2, gold: true },
239: { label: "DIM", date: "02 JUIN", active: false, dots: 0 },
265: Réservez votre créneau et profitez d’un service premium pour votre véhicule.
271: <TopPill active>KPI</TopPill>
321: Créneaux disponibles cette semaine
325: <button
326: type="button"
330: </button>
334: {days.map((day) => (
339: day.active
351: {day.date}
360: index < day.dots
385: title="Créneau confirmé"
417: Réserver un créneau
445: <button
446: type="button"
451: </button>
464: updateField("nom", event.target.value)
480: updateField("telephone", event.target.value)
498: updateField("vehicule", event.target.value)
514: updateField("immatriculation", event.target.value)
531: updateField("service", event.target.value)
546: value={form.dateSouhaitee}
548: updateField("dateSouhaitee", event.target.value)
558: Heure souhaitée
562: value={form.heureSouhaitee}
564: updateField("heureSouhaitee", event.target.value)
581: updateField("message", event.target.value)
595: <button
596: type="button"
604: </button>
```

## Checks détaillés


### OK — Q-PUBLIC-SCHED-D-A-01

- Label: Landing public RDV existe
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-A-02

- Label: Action public availability existe
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityActions.ts

### OK — Q-PUBLIC-SCHED-D-A-03

- Label: Types publics availability existent
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityTypes.ts

### OK — Q-PUBLIC-SCHED-D-A-04

- Label: Service public availability utilise le moteur runtime
- Severity: HIGH
- Details: src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts

### OK — Q-PUBLIC-SCHED-D-A-05

- Label: Landing utilise createPublicAppointment
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-A-06

- Label: Landing contient encore les jours/créneaux statiques à remplacer
- Severity: INFO
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-A-07

- Label: Landing n'est pas encore connectée à public availability
- Severity: INFO
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-A-08

- Label: Landing ne touche pas Firestore directement
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-D-A-09

- Label: PublicAppointmentService retourne un DTO public sécurisé
- Severity: HIGH
- Details: src/components/public/PublicAppointmentService.ts

### OK — Q-PUBLIC-SCHED-D-A-10

- Label: Landing ne rend pas explicitement codeClient
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

## Décision recommandée

Aucun échec HIGH. La page publique peut être connectée à l'action public availability.

Suite:
- Q-PUBLIC-SCHED-D-B — patch landing pour charger les disponibilités runtime.
- Q-PUBLIC-SCHED-D-C — envoyer le créneau choisi à createPublicAppointment.

# Q-PUBLIC-SCHED-C-A — Public scheduling availability API readiness audit

Date: 2026-05-26T20:33:43.490Z

## Objectif

Inspecter les APIs existantes avant de créer la couche Public Scheduling Availability.

Doctrine:
- Ne pas calculer les slots dans la page publique.
- Ne pas lire Firestore depuis la page publique.
- Ne pas inventer une API RuntimeSchedulingEngine.
- Réutiliser la chaîne runtime existante.

## Résumé

- Checks: 10
- OK: 10
- FAIL: 0
- FAIL_HIGH: 0
- FAIL_INFO: 0

## Fichiers inspectés

- `src/components/public/AmarkhysPublicAppointmentLanding.tsx`
- `src/components/public/PublicAppointmentService.ts`
- `src/runtime/scheduling/RuntimeSchedulingEngine.ts`
- `src/runtime/scheduling/RuntimeSchedulingTypes.ts`
- `src/runtime/scheduling/SchedulingSlotPolicy.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts`
- `src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts`
- `src/runtime/modules/generated/rendezvous/rendezvous.module.ts`
- `src/components/erp/scheduling/ERPSchedulingPlanningView.tsx`

## API candidates — RuntimeSchedulingEngine

```txt
7: RuntimeAvailabilitySlot,
14: import { SchedulingSlotPolicyResolver } from "./SchedulingSlotPolicy";
35: function resolveRuntimeSchedulingFieldConfig(
44: function getRuntimeSchedulingFieldValue(
52: function getRuntimeSchedulingFieldString(
59: function getRuntimeSchedulingFieldNumber(
67: export interface RuntimeAppointmentSlot {
83: function asString(value: unknown): string {
108: function asNumber(value: unknown, fallback: number): number {
119: function hasRealDateAndTime(
129: function normalizeDateOnly(value: string): string {
165: function normalizeTimeOnly(value: string): string {
219: function buildLocalDateTime(dateOnly: string, timeOnly: string): Date | null {
253: function isNonBlockingSchedulingRecord(record: RuntimeRecord): boolean {
254: const policy = SchedulingSlotPolicyResolver.resolve();
255: return SchedulingSlotPolicyResolver.isNonBlockingRecord(record, policy);
258: function sameVehicle(
272: function rangesOverlap(
317: function parseRuntimeTimeToMinutes(value: string): number {
329: function formatRuntimeMinutesToTime(value: number): string {
340: function buildRuntimeDateTimeIso(dateOnly: string, timeOnly: string): string {
341: const date = buildLocalDateTime(dateOnly, timeOnly);
353: static readonly defaultDurationMinutes = 60;
355: static buildDateTimeRange(params: {
366: const startAt = buildRuntimeDateTimeIso(params.date, params.time);
376: static getAvailableSlotsForDate(params: {
381: }): RuntimeAvailabilitySlot[] {
384: const slotPolicy = SchedulingSlotPolicyResolver.resolve({
386: defaultDurationMinutes: profile.defaultSlotDurationMinutes,
390: const durationMinutes = slotPolicy.slotDurationMinutes;
421: const slots: RuntimeAvailabilitySlot[] = [];
435: slots.push({
444: return slots;
448: static getAvailableSlotsWithBookings(params: {
457: }): RuntimeAvailabilitySlot[] {
458: // Q22D1_BOOKING_AWARE_AVAILABILITY
459: // Generic ERP availability: opening-hours slots minus existing bookings.
460: const slotPolicy = SchedulingSlotPolicyResolver.resolve({
467: const visibleDurationMinutes = slotPolicy.visibleDurationMinutes;
468: const bufferMinutes = slotPolicy.bufferMinutes;
469: const slotDurationMinutes = slotPolicy.slotDurationMinutes;
470: const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({
472: durationMinutes: slotDurationMinutes,
477: const capacity = slotPolicy.capacity;
482: return slots.map((slot) => {
483: const slotRange = RuntimeSchedulingEngine.buildDateTimeRange({
485: time: slot.start,
486: durationMinutes: slotDurationMinutes,
524: startAt: slotRange.startAt,
525: endAt: slotRange.endAt,
526: durationMinutes: slotDurationMinutes,
533: durationMinutes: slotDurationMinutes,
547: // Q22F3A_CAPACITY_AWARE_AVAILABILITY
548: ...slot,
560: static assertWithinOpeningHours(params: {
569: const slotPolicy = SchedulingSlotPolicyResolver.resolve({
571: defaultDurationMinutes: profile.defaultSlotDurationMinutes,
575: const durationMinutes = slotPolicy.slotDurationMinutes;
586: const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({
593: const allowed = slots.some((slot) => slot.start === normalizedTime);
606: static computeAppointmentSlot(
609: ): RuntimeAppointmentSlot {
617: const startDate = buildLocalDateTime(
646: static normalizeAppointmentForScheduling(record: RuntimeRecord,
660: const slot = RuntimeSchedulingEngine.computeAppointmentSlot(record, config);
664: [fieldConfig.durationField]: slot.durationMinutes,
665: [fieldConfig.startField]: slot.startAt,
666: [fieldConfig.endField]: slot.endAt,
670: static assertNoAppointmentConflict(
687: const currentSlot = RuntimeSchedulingEngine.computeAppointmentSlot(record);
708: const existingSlot =
718: : RuntimeSchedulingEngine.computeAppointmentSlot(existing);
720: return rangesOverlap(currentSlot, existingSlot);
```

## API candidates — SchedulingSlotPolicy

```txt
6: export interface SchedulingSlotPolicyInput {
9: slotDurationMinutes?: number;
10: bufferMinutes?: number;
11: capacity?: number;
13: fieldMapping?: Partial<RuntimeSchedulingFieldMapping>;
18: export interface SchedulingSlotPolicy {
20: bufferMinutes: number;
21: slotDurationMinutes: number;
22: capacity: number;
24: fieldMapping: RuntimeSchedulingFieldMapping;
29: export const DEFAULT_SCHEDULING_VISIBLE_DURATION_MINUTES = 60;
30: export const DEFAULT_SCHEDULING_BUFFER_MINUTES = 0;
31: export const DEFAULT_SCHEDULING_CAPACITY = 1;
32: export const DEFAULT_SCHEDULING_STATUS_FIELD = "statut";
34: export const DEFAULT_SCHEDULING_FIELD_MAPPING: RuntimeSchedulingFieldMapping = {
44: export const DEFAULT_NON_BLOCKING_SCHEDULING_STATUSES = [
73: export class SchedulingSlotPolicyResolver {
74: static resolve(input: SchedulingSlotPolicyInput = {}): SchedulingSlotPolicy {
78: input.slotDurationMinutes,
82: const bufferMinutes = asNonNegativeInteger(
83: input.bufferMinutes,
87: const slotDurationMinutes = asPositiveInteger(
88: input.slotDurationMinutes,
89: visibleDurationMinutes + bufferMinutes
92: const capacity = asPositiveInteger(
93: input.capacity,
99: const fieldMapping: RuntimeSchedulingFieldMapping = {
101: ...input.fieldMapping,
107: bufferMinutes,
108: slotDurationMinutes,
109: capacity,
111: fieldMapping,
```

## API candidates — RuntimeSchedulingSettingsResolver

```txt
14: export interface RuntimeSchedulingSettingsResolverInput {
22: export interface RuntimeSchedulingSettingsResolverLoadInput {
55: export class RuntimeSchedulingSettingsResolver {
56: static resolve(input: RuntimeSchedulingSettingsResolverInput) {
57: return RuntimeSchedulingSettingsEngine.resolve({
66: static async loadAndResolve(input: RuntimeSchedulingSettingsResolverLoadInput) {
68: await RuntimeSchedulingSettingsRepository.resolveStoredSettings(
72: return this.resolve({
81: static async resolveForRuntimeGuard(input: RuntimeSchedulingSettingsResolverLoadInput) {
88: return this.resolve({
97: return this.resolve({
```

## Usage planning privé existant

```txt
8: import { RuntimeSchedulingEngine } from "@/runtime/scheduling";
11: import { RuntimeSchedulingSettingsResolver } from "@/runtime/scheduling/settings";
67: slot: {
77: slot,
91: slot.start
97: `${dateOnly}T${slot.start}:00`
104: `${dateOnly}T${slot.end}:00`
397: RuntimeSchedulingSettingsResolver.resolve({
502: slots: [],
556: const slots =
557: RuntimeSchedulingEngine.getAvailableSlotsWithBookings({
571: for (const slot of slots) {
572: const slotStart =
573: buildPlanningDateTime(selectedDate, slot.start).getTime();
575: const slotEnd =
576: buildPlanningDateTime(selectedDate, slot.end).getTime();
591: slotStart,
592: slotEnd,
601: return timeValue === slot.start;
604: bookingsBySlot.set(slot.start, related);
608: slots,
614: planning.slots.length;
617: planning.slots.filter((slot) => slot.available).length;
782: ) : planning.slots.length === 0 ? (
788: {planning.slots.map((slot) => {
790: planning.bookingsBySlot.get(slot.start) ?? [];
792: const slotIsBlockedByBuffer =
793: !slot.available && bookings.length === 0;
795: const slotStatusLabel =
796: slot.available
797: ? slot.remainingCapacity !== undefined && slot.capacity && slot.capacity > 1
798: ? slot.remainingCapacity + " place(s) restante(s)"
800: : slotIsBlockedByBuffer
802: : slot.reason ?? "Créneau complet";
804: const slotActionLabel =
805: slot.available
807: : slotIsBlockedByBuffer
815: slot,
821: key={slot.start + "-" + slot.end}
824: slot.available
834: slot.available
842: {slot.label}
848: slot.available
853: {slotStatusLabel}
864: {slot.available ? (
877: {slotActionLabel}
```

## Checks détaillés


### OK — Q-PUBLIC-SCHED-C-A-01

- Label: RuntimeSchedulingEngine existe
- Severity: HIGH
- Details: src/runtime/scheduling/RuntimeSchedulingEngine.ts

### OK — Q-PUBLIC-SCHED-C-A-02

- Label: RuntimeSchedulingEngine expose des APIs candidates de slots/disponibilités
- Severity: HIGH
- Details: 7: RuntimeAvailabilitySlot,
14: import { SchedulingSlotPolicyResolver } from "./SchedulingSlotPolicy";
35: function resolveRuntimeSchedulingFieldConfig(
44: function getRuntimeSchedulingFieldValue(
52: function getRuntimeSchedulingFieldString(
59: function getRuntimeSchedulingFieldNumber(
67: export interface RuntimeAppointmentSlot {
83: function asString(value: unknown): string {
108: function asNumber(value: unknown, fallback: number): number {
119: function hasRealDateAndTime(
129: function normalizeDateOnly(value: string): string {
165: function normalizeTimeOnly(value: string): string {
219: function buildLocalDateTime(dateOnly: string, timeOnly: string): Date | null {
253: function isNonBlockingSchedulingRecord(record: RuntimeRecord): boolean {
254: const policy = SchedulingSlotPolicyResolver.resolve();
255: return SchedulingSlotPolicyResolver.isNonBlockingRecord(record, policy);
258: function sameVehicle(
272: function rangesOverlap(
317: function parseRuntimeTimeToMinutes(value: string): number {
329: function formatRuntimeMinutesToTime(value: number): string {
340: function buildRuntimeDateTimeIso(dateOnly: string, timeOnly: string): string {
341: const date = buildLocalDateTime(dateOnly, timeOnly);
353: static readonly defaultDurationMinutes = 60;
355: static buildDateTimeRange(params: {
366: const startAt = buildRuntimeDateTimeIso(params.date, params.time);
376: static getAvailableSlotsForDate(params: {
381: }): RuntimeAvailabilitySlot[] {
384: const slotPolicy = SchedulingSlotPolicyResolver.resolve({
386: defaultDurationMinutes: profile.defaultSlotDurationMinutes,
390: const durationMinutes = slotPolicy.slotDurationMinutes;
421: const slots: RuntimeAvailabilitySlot[] = [];
435: slots.push({
444: return slots;
448: static getAvailableSlotsWithBookings(params: {
457: }): RuntimeAvailabilitySlot[] {
458: // Q22D1_BOOKING_AWARE_AVAILABILITY
459: // Generic ERP availability: opening-hours slots minus existing bookings.
460: const slotPolicy = SchedulingSlotPolicyResolver.resolve({
467: const visibleDurationMinutes = slotPolicy.visibleDurationMinutes;
468: const bufferMinutes = slotPolicy.bufferMinutes;
469: const slotDurationMinutes = slotPolicy.slotDurationMinutes;
470: const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({
472: durationMinutes: slotDurationMinutes,
477: const capacity = slotPolicy.capacity;
482: return slots.map((slot) => {
483: const slotRange = RuntimeSchedulingEngine.buildDateTimeRange({
485: time: slot.start,
486: durationMinutes: slotDurationMinutes,
524: startAt: slotRange.startAt,
525: endAt: slotRange.endAt,
526: durationMinutes: slotDurationMinutes,
533: durationMinutes: slotDurationMinutes,
547: // Q22F3A_CAPACITY_AWARE_AVAILABILITY
548: ...slot,
560: static assertWithinOpeningHours(params: {
569: const slotPolicy = SchedulingSlotPolicyResolver.resolve({
571: defaultDurationMinutes: profile.defaultSlotDurationMinutes,
575: const durationMinutes = slotPolicy.slotDurationMinutes;
586: const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({
593: const allowed = slots.some((slot) => slot.start === normalizedTime);
606: static computeAppointmentSlot(
609: ): RuntimeAppointmentSlot {
617: const startDate = buildLocalDateTime(
646: static normalizeAppointmentForScheduling(record: RuntimeRecord,
660: const slot = RuntimeSchedulingEngine.computeAppointmentSlot(record, config);
664: [fieldConfig.durationField]: slot.durationMinutes,
665: [fieldConfig.startField]: slot.startAt,
666: [fieldConfig.endField]: slot.endAt,
670: static assertNoAppointmentConflict(
687: const currentSlot = RuntimeSchedulingEngine.computeAppointmentSlot(record);
708: const existingSlot =
718: : RuntimeSchedulingEngine.computeAppointmentSlot(existing);
720: return rangesOverlap(currentSlot, existingSlot);

### OK — Q-PUBLIC-SCHED-C-A-03

- Label: SchedulingSlotPolicy expose durée/buffer/capacité/mapping
- Severity: HIGH
- Details: src/runtime/scheduling/SchedulingSlotPolicy.ts

### OK — Q-PUBLIC-SCHED-C-A-04

- Label: RuntimeSchedulingSettingsResolver existe et expose resolve
- Severity: HIGH
- Details: src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts

### OK — Q-PUBLIC-SCHED-C-A-05

- Label: Planning privé consomme déjà la chaîne scheduling runtime
- Severity: INFO
- Details: src/components/erp/scheduling/ERPSchedulingPlanningView.tsx

### OK — Q-PUBLIC-SCHED-C-A-06

- Label: Page publique contient encore des jours/créneaux statiques à remplacer
- Severity: INFO
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-C-A-07

- Label: PublicAppointmentService retourne un DTO public sécurisé
- Severity: HIGH
- Details: src/components/public/PublicAppointmentService.ts

### OK — Q-PUBLIC-SCHED-C-A-08

- Label: Aucun accès Firestore direct dans la page publique
- Severity: HIGH
- Details: src/components/public/AmarkhysPublicAppointmentLanding.tsx

### OK — Q-PUBLIC-SCHED-C-A-09

- Label: Module rendezvous déclare un scheduling metadata-driven
- Severity: HIGH
- Details: src/runtime/modules/generated/rendezvous/rendezvous.module.ts

### OK — Q-PUBLIC-SCHED-C-A-10

- Label: Aucune couche public availability n'existe encore
- Severity: INFO
- Details: src/runtime/scheduling/public

## Décision recommandée

Aucun échec HIGH. Créer ensuite une couche public availability dans src/runtime/scheduling/public, en s'appuyant sur les APIs réellement disponibles.

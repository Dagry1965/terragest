const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function writeUtf8NoBom(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
  console.log("[WRITTEN] " + path.relative(ROOT, filePath));
}

function assertProjectRoot() {
  const packageJsonPath = path.join(ROOT, "package.json");
  const srcPath = path.join(ROOT, "src");

  if (!fs.existsSync(packageJsonPath) || !fs.existsSync(srcPath)) {
    throw new Error("Ce script doit être lancé depuis la racine du projet Terragest.");
  }
}

assertProjectRoot();

const targetPath = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "RuntimeSchedulingEngine.ts"
);

const content = String.raw`export type RuntimeRecord = Record<string, unknown>;

export interface RuntimeAppointmentSlot {
  startAt: string;
  endAt: string;
  durationMinutes: number;
}

export interface AppointmentConflictOptions {
  existingAppointments?: RuntimeRecord[];
  ignoreAppointmentId?: string;
}

export interface SchedulingValidationResult {
  ok: boolean;
  reason?: string;
}

function asString(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (value instanceof Date) return value.toISOString();
  return "";
}

function asNumber(value: unknown, fallback: number): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }

  return fallback;
}

function hasRealDateAndTime(record: RuntimeRecord): boolean {
  const dateRendezVous = asString(record.dateRendezVous);
  const heureRendezVous = asString(record.heureRendezVous);

  return Boolean(dateRendezVous && heureRendezVous);
}

function normalizeDateOnly(value: string): string {
  if (!value) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

function normalizeTimeOnly(value: string): string {
  if (!value) return "";

  const match = value.match(/^(\d{1,2}):(\d{2})/);

  if (!match) {
    return "";
  }

  const hour = String(Math.max(0, Math.min(23, Number(match[1])))).padStart(2, "0");
  const minute = String(Math.max(0, Math.min(59, Number(match[2])))).padStart(2, "0");

  return hour + ":" + minute;
}

function buildLocalDateTime(dateOnly: string, timeOnly: string): Date | null {
  const normalizedDate = normalizeDateOnly(dateOnly);
  const normalizedTime = normalizeTimeOnly(timeOnly);

  if (!normalizedDate || !normalizedTime) {
    return null;
  }

  const date = new Date(normalizedDate + "T" + normalizedTime + ":00");

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function isCancelledAppointment(record: RuntimeRecord): boolean {
  return asString(record.statut).toLowerCase() === "annule";
}

function sameVehicle(a: RuntimeRecord, b: RuntimeRecord): boolean {
  const vehicleA = asString(a.vehiculeId);
  const vehicleB = asString(b.vehiculeId);

  return Boolean(vehicleA && vehicleB && vehicleA === vehicleB);
}

function rangesOverlap(a: RuntimeAppointmentSlot, b: RuntimeAppointmentSlot): boolean {
  const startA = new Date(a.startAt).getTime();
  const endA = new Date(a.endAt).getTime();
  const startB = new Date(b.startAt).getTime();
  const endB = new Date(b.endAt).getTime();

  if (
    Number.isNaN(startA) ||
    Number.isNaN(endA) ||
    Number.isNaN(startB) ||
    Number.isNaN(endB)
  ) {
    return false;
  }

  return startA < endB && startB < endA;
}

export class RuntimeSchedulingEngine {
  static readonly defaultDurationMinutes = 60;

  static computeAppointmentSlot(record: RuntimeRecord): RuntimeAppointmentSlot {
    if (!hasRealDateAndTime(record)) {
      throw new Error(
        "Impossible de calculer le créneau : dateRendezVous et heureRendezVous sont obligatoires."
      );
    }

    const startDate = buildLocalDateTime(
      asString(record.dateRendezVous),
      asString(record.heureRendezVous)
    );

    if (!startDate) {
      throw new Error(
        "Impossible de calculer le créneau : dateRendezVous ou heureRendezVous invalide."
      );
    }

    const durationMinutes = Math.max(
      1,
      asNumber(record.durationMinutes, RuntimeSchedulingEngine.defaultDurationMinutes)
    );

    const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

    return {
      startAt: startDate.toISOString(),
      endAt: endDate.toISOString(),
      durationMinutes,
    };
  }

  static normalizeAppointmentForScheduling(record: RuntimeRecord): RuntimeRecord {
    if (!hasRealDateAndTime(record)) {
      return {
        ...record,
        durationMinutes: asNumber(
          record.durationMinutes,
          RuntimeSchedulingEngine.defaultDurationMinutes
        ),
      };
    }

    const slot = RuntimeSchedulingEngine.computeAppointmentSlot(record);

    return {
      ...record,
      durationMinutes: slot.durationMinutes,
      startAt: slot.startAt,
      endAt: slot.endAt,
    };
  }

  static assertNoAppointmentConflict(
    record: RuntimeRecord,
    options: AppointmentConflictOptions = {}
  ): SchedulingValidationResult {
    if (isCancelledAppointment(record)) {
      return { ok: true };
    }

    if (!hasRealDateAndTime(record)) {
      return {
        ok: false,
        reason:
          "Le rendez-vous doit avoir une date et une heure réelles avant vérification de conflit.",
      };
    }

    const currentSlot = RuntimeSchedulingEngine.computeAppointmentSlot(record);
    const currentId = asString(record.id);
    const ignoredId = options.ignoreAppointmentId || currentId;

    const conflictingAppointment = (options.existingAppointments || []).find((existing) => {
      if (!existing || isCancelledAppointment(existing)) return false;

      const existingId = asString(existing.id);

      if (ignoredId && existingId === ignoredId) {
        return false;
      }

      if (!sameVehicle(record, existing)) {
        return false;
      }

      if (!hasRealDateAndTime(existing) && (!existing.startAt || !existing.endAt)) {
        return false;
      }

      const existingSlot =
        existing.startAt && existing.endAt
          ? {
              startAt: asString(existing.startAt),
              endAt: asString(existing.endAt),
              durationMinutes: asNumber(
                existing.durationMinutes,
                RuntimeSchedulingEngine.defaultDurationMinutes
              ),
            }
          : RuntimeSchedulingEngine.computeAppointmentSlot(existing);

      return rangesOverlap(currentSlot, existingSlot);
    });

    if (conflictingAppointment) {
      return {
        ok: false,
        reason:
          "Conflit de planning : ce véhicule possède déjà un rendez-vous sur ce créneau.",
      };
    }

    return { ok: true };
  }

  static assertRendezvousCanCreateIntervention(
    rendezvous: RuntimeRecord
  ): SchedulingValidationResult {
    if (!rendezvous) {
      return {
        ok: false,
        reason: "Rendez-vous introuvable.",
      };
    }

    if (isCancelledAppointment(rendezvous)) {
      return {
        ok: false,
        reason: "Impossible de créer une intervention depuis un rendez-vous annulé.",
      };
    }

    if (asString(rendezvous.consumedByInterventionId)) {
      return {
        ok: false,
        reason:
          "Impossible de créer une intervention : ce rendez-vous a déjà été consommé.",
      };
    }

    if (!asString(rendezvous.clientId)) {
      return {
        ok: false,
        reason: "Impossible de créer une intervention : clientId manquant.",
      };
    }

    if (!asString(rendezvous.vehiculeId)) {
      return {
        ok: false,
        reason: "Impossible de créer une intervention : vehiculeId manquant.",
      };
    }

    if (!asString(rendezvous.id)) {
      return {
        ok: false,
        reason: "Impossible de créer une intervention : identifiant rendez-vous manquant.",
      };
    }

    return { ok: true };
  }

  static buildInterventionFromRendezvous(rendezvous: RuntimeRecord): RuntimeRecord {
    const validation = RuntimeSchedulingEngine.assertRendezvousCanCreateIntervention(
      rendezvous
    );

    if (!validation.ok) {
      throw new Error(validation.reason || "Rendez-vous invalide.");
    }

    return {
      clientId: rendezvous.clientId,
      vehiculeId: rendezvous.vehiculeId,
      rendezVousId: rendezvous.id,
      typeIntervention: rendezvous.typeService || "autre",
      dateIntervention: rendezvous.dateRendezVous,
      statut: "ouverte",
    };
  }
}
`;

writeUtf8NoBom(targetPath, content);

console.log("");
console.log("[OK] PASS 2N-Q13C RuntimeSchedulingEngine installé.");
console.log("");
console.log("Prochaines commandes :");
console.log("node .\\scripts\\runtime\\check-encoding.cjs");
console.log("pnpm build");
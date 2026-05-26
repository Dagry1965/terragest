const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  landing: "src/components/public/AmarkhysPublicAppointmentLanding.tsx",
  service: "src/components/public/PublicAppointmentService.ts",
};

function full(rel) {
  return path.join(ROOT, rel);
}

function read(rel) {
  const file = full(rel);
  if (!fs.existsSync(file)) {
    throw new Error(`Fichier introuvable: ${rel}`);
  }
  return fs.readFileSync(file, "utf8");
}

function write(rel, content) {
  fs.writeFileSync(full(rel), content, "utf8");
}

function backup(rel, suffix) {
  fs.copyFileSync(full(rel), `${full(rel)}.bak-${suffix}`);
}

function replaceOrThrow(content, pattern, replacement, label) {
  if (typeof pattern === "string") {
    if (!content.includes(pattern)) {
      throw new Error(`Bloc introuvable: ${label}`);
    }
    return content.replace(pattern, replacement);
  }

  if (!pattern.test(content)) {
    throw new Error(`Pattern introuvable: ${label}`);
  }

  return content.replace(pattern, replacement);
}

backup(files.service, "qpublic-sched-dc2-selected-runtime-slot");
backup(files.landing, "qpublic-sched-dc2-selected-runtime-slot");

let service = read(files.service);

if (!service.includes("dateSouhaitee?: string")) {
  service = replaceOrThrow(
    service,
    /type\s+PublicAppointmentInput\s*=\s*\{\s*nom:\s*string;\s*telephone:\s*string;\s*vehicule:\s*string;\s*immatriculation:\s*string;\s*\};/m,
    `type PublicAppointmentInput = {
  nom: string;
  telephone: string;
  vehicule: string;
  immatriculation: string;
  dateSouhaitee?: string;
  heureSouhaitee?: string;
  durationMinutes?: number;
};`,
    "PublicAppointmentInput"
  );
}

if (!service.includes("function normalizePublicAppointmentDate")) {
  service = replaceOrThrow(
    service,
    /(function\s+addDays\([\s\S]*?\n\})/,
    `$1

function normalizePublicAppointmentDate(value: unknown): string {
  if (typeof value !== "string") {
    return new Date().toISOString().slice(0, 10);
  }

  const trimmed = value.trim();

  return /^\\d{4}-\\d{2}-\\d{2}$/.test(trimmed)
    ? trimmed
    : new Date().toISOString().slice(0, 10);
}

function normalizePublicAppointmentTime(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  const trimmed = value.trim();

  return /^\\d{2}:\\d{2}$/.test(trimmed)
    ? trimmed
    : "";
}

function normalizePublicAppointmentDuration(value: unknown): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 60;
  }

  return Math.max(1, Math.min(Math.trunc(parsed), 480));
}`,
    "normalizers after addDays"
  );
}

if (!service.includes("const dateRendezVous =")) {
  service = replaceOrThrow(
    service,
    /(export\s+async\s+function\s+createPublicAppointment\([\s\S]*?\)\s*:\s*Promise<PublicAppointmentResult>\s*\{\s*const\s+now\s*=\s*new\s+Date\(\);?)/m,
    `$1

  const dateRendezVous =
    normalizePublicAppointmentDate(data.dateSouhaitee);

  const heureRendezVous =
    normalizePublicAppointmentTime(data.heureSouhaitee);

  const durationMinutes =
    normalizePublicAppointmentDuration(data.durationMinutes);`,
    "normalized selected slot values"
  );
}

service = replaceOrThrow(
  service,
  /dateRendezVous:\s*now,\s*heureRendezVous:\s*"",/m,
  `dateRendezVous,
        heureRendezVous,
        durationMinutes,`,
  "rendezvous slot fields"
);

if (service.includes("dateRendezVous: now") || service.includes('heureRendezVous: ""')) {
  throw new Error("PublicAppointmentService crée encore un rendez-vous aveugle.");
}

write(files.service, service);

let landing = read(files.landing);

if (!landing.includes("Choisissez un créneau disponible.")) {
  landing = replaceOrThrow(
    landing,
    /(\s*if\s*\(!form\.immatriculation\.trim\(\)\)\s*return\s+"[^"]*immatriculation[^"]*";\s*)return\s+"";/m,
    `$1if (!form.dateSouhaitee.trim() || !form.heureSouhaitee.trim()) {
      return "Choisissez un créneau disponible.";
    }
    return "";`,
    "validate selected slot"
  );
}

if (!landing.includes("dateSouhaitee: form.dateSouhaitee")) {
  landing = replaceOrThrow(
    landing,
    /(immatriculation:\s*form\.immatriculation,\s*)\}\);/m,
    `$1dateSouhaitee: form.dateSouhaitee,
        heureSouhaitee: form.heureSouhaitee,
        durationMinutes: selectedSlot
          ? Math.max(
              1,
              Math.round(
                (new Date(selectedSlot.date + "T" + selectedSlot.endTime + ":00").getTime() -
                  new Date(selectedSlot.date + "T" + selectedSlot.startTime + ":00").getTime()) /
                  60000
              )
            )
          : 60,
      });`,
    "submit selected slot"
  );
}

if (!landing.includes("dateSouhaitee: form.dateSouhaitee")) {
  throw new Error("Landing n'envoie toujours pas dateSouhaitee.");
}

if (!landing.includes("selectedSlot.endTime")) {
  throw new Error("Landing ne calcule toujours pas durationMinutes depuis selectedSlot.");
}

write(files.landing, landing);

console.log("");
console.log("[Q-PUBLIC-SCHED-D-C2] DONE");
console.log("[UPDATED]");
console.log(`- ${files.service}`);
console.log(`- ${files.landing}`);
console.log("");
console.log("Next:");
console.log("pnpm build");
console.log("node .\\scripts\\runtime\\audit-qpublic-sched-dc-selected-runtime-slot.cjs");
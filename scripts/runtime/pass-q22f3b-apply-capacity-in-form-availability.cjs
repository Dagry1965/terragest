const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22f3b-apply-capacity-in-form-availability";

const targetFile =
  "src/components/erp/forms/enterprise/ERPFormField.tsx";

const target = path.join(ROOT, targetFile);

if (!fs.existsSync(target)) {
  throw new Error(`[MISSING] ${targetFile}`);
}

const backup = `${target}.bak-${TAG}`;

if (!fs.existsSync(backup)) {
  fs.copyFileSync(target, backup);
  console.log(`[BACKUP] ${targetFile}.bak-${TAG}`);
}

let content = fs.readFileSync(target, "utf8");

if (content.includes("Q22F3B_PASS_CAPACITY_TO_SLOTS")) {
  console.log("[SKIP] Q22F-3B already installed.");
  process.exit(0);
}

const callMarker = `            calendarExceptions:
              schedulingConfig.calendarExceptions,
          });`;

const callReplacement = `            calendarExceptions:
              schedulingConfig.calendarExceptions,
            // Q22F3B_PASS_CAPACITY_TO_SLOTS
            // Generic ERP scheduling: capacity controls how many bookings can share a slot.
            capacity:
              schedulingConfig.capacity,
          });`;

if (!content.includes(callMarker)) {
  throw new Error("[MISSING] getAvailableSlotsWithBookings calendarExceptions marker");
}

content = content.replace(callMarker, callReplacement);

const optionMarker = `                {slot.available
                  ? slot.label + " · Disponible"
                  : slot.label + " · Déjà réservé"}`;

const optionReplacement = `                {slot.available
                  ? slot.remainingCapacity !== undefined &&
                    slot.capacity !== undefined &&
                    slot.capacity > 1
                    ? slot.label + " · " + slot.remainingCapacity + " place(s) restante(s)"
                    : slot.label + " · Disponible"
                  : slot.reason ?? "Créneau complet"}`;

if (!content.includes(optionMarker)) {
  throw new Error("[MISSING] slot option label marker");
}

content = content.replace(optionMarker, optionReplacement);

const countMarker = `              {availableSlotsCount} créneau(x) disponible(s)
              {unavailableSlotsCount > 0
                ? " · " + unavailableSlotsCount + " déjà réservé(s)"
                : ""}
              . Calcul ERP Scheduling Runtime.`;

const countReplacement = `              {availableSlotsCount} créneau(x) disponible(s)
              {unavailableSlotsCount > 0
                ? " · " + unavailableSlotsCount + " complet(s)"
                : ""}
              {schedulingConfig?.capacity && schedulingConfig.capacity > 1
                ? " · capacité " + schedulingConfig.capacity + " par créneau"
                : ""}
              . Calcul ERP Scheduling Runtime.`;

if (!content.includes(countMarker)) {
  throw new Error("[MISSING] scheduling summary marker");
}

content = content.replace(countMarker, countReplacement);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q22F3B_DONE] capacity passed to scheduling slots and UX updated.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  test /rendezvous/nouveau");
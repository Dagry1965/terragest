/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const planningPath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "scheduling",
  "ERPSchedulingPlanningView.tsx"
);

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

if (!fs.existsSync(planningPath)) {
  fail("ERPSchedulingPlanningView.tsx introuvable");
}

let content = fs.readFileSync(planningPath, "utf8");

if (!content.includes("planning.bookingsBySlot.get(slot.start) ?? []")) {
  fail("Déclaration bookings du slot introuvable");
}

/**
 * 1) Ajouter la distinction visuelle après const bookings.
 */
if (!content.includes("const slotIsBlockedByBuffer")) {
  const oldBookingsBlock = `              const bookings =
                planning.bookingsBySlot.get(slot.start) ?? [];`;

  const newBookingsBlock = `              const bookings =
                planning.bookingsBySlot.get(slot.start) ?? [];

              const slotIsBlockedByBuffer =
                !slot.available && bookings.length === 0;

              const slotStatusLabel =
                slot.available
                  ? slot.remainingCapacity !== undefined && slot.capacity && slot.capacity > 1
                    ? slot.remainingCapacity + " place(s) restante(s)"
                    : "Disponible"
                  : slotIsBlockedByBuffer
                    ? "Bloqué par buffer"
                    : slot.reason ?? "Créneau complet";

              const slotActionLabel =
                slot.available
                  ? "Planifier"
                  : slotIsBlockedByBuffer
                    ? "Buffer"
                    : "Complet";`;

  if (!content.includes(oldBookingsBlock)) {
    fail("Bloc bookings exact introuvable");
  }

  content = content.replace(oldBookingsBlock, newBookingsBlock);
  ok("slotIsBlockedByBuffer / slotStatusLabel / slotActionLabel ajoutés");
} else {
  ok("slotIsBlockedByBuffer déjà présent");
}

/**
 * 2) Remplacer le rendu du libellé statut.
 */
const oldStatusBlock = `                          {slot.available
                            ? slot.remainingCapacity !== undefined && slot.capacity && slot.capacity > 1
                              ? slot.remainingCapacity + " place(s) restante(s)"
                              : "Disponible"
                            : slot.reason ?? "CrÃ©neau complet"}`;

if (content.includes(oldStatusBlock)) {
  content = content.replace(oldStatusBlock, "                          {slotStatusLabel}");
  ok("Ancien libellé mojibake remplacé");
} else {
  const oldStatusBlockUtf8 = `                          {slot.available
                            ? slot.remainingCapacity !== undefined && slot.capacity && slot.capacity > 1
                              ? slot.remainingCapacity + " place(s) restante(s)"
                              : "Disponible"
                            : slot.reason ?? "Créneau complet"}`;

  if (content.includes(oldStatusBlockUtf8)) {
    content = content.replace(oldStatusBlockUtf8, "                          {slotStatusLabel}");
    ok("Ancien libellé UTF-8 remplacé");
  } else if (!content.includes("{slotStatusLabel}")) {
    fail("Bloc statut slot introuvable");
  }
}

/**
 * 3) Remplacer le bouton disabled.
 */
content = content.replace(
  /<button([\s\S]*?disabled[\s\S]*?)>\s*Complet\s*<\/button>/m,
  `<button$1>
                        {slotActionLabel}
                      </button>`
);

if (!content.includes("{slotActionLabel}")) {
  fail("slotActionLabel non branché dans le bouton disabled");
}

if (!content.includes("Bloqué par buffer")) {
  fail("Libellé Bloqué par buffer absent");
}

fs.writeFileSync(planningPath, content, "utf8");

ok("Planning distingue maintenant complet réel et blocage buffer");
console.log("");
console.log("[Q22E9K_C_PLANNING_BUFFER_LABEL_DONE]");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm dev");
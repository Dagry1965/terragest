const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22f1b-pass-buffer-to-scheduling-slots";

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

if (content.includes("Q22F1B_PASS_BUFFER_TO_SLOTS")) {
  console.log("[SKIP] Q22F-1B already installed.");
  process.exit(0);
}

const marker = `        const slots =
          RuntimeSchedulingEngine.getAvailableSlotsWithBookings({
            date: String(schedulingDateValue),
            durationMinutes,
            bookings,
          });`;

const replacement = `        const slots =
          RuntimeSchedulingEngine.getAvailableSlotsWithBookings({
            // Q22F1B_PASS_BUFFER_TO_SLOTS
            // Generic ERP scheduling: form passes metadata buffer to the runtime availability engine.
            date: String(schedulingDateValue),
            durationMinutes,
            bookings,
            bufferMinutes:
              schedulingConfig.bufferMinutes,
          });`;

if (!content.includes(marker)) {
  throw new Error("[MISSING] getAvailableSlotsWithBookings call marker");
}

content = content.replace(marker, replacement);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q22F1B_DONE] bufferMinutes passed to scheduling slots.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
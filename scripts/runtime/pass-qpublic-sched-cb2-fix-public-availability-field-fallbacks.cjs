const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const TARGET =
  "src/runtime/scheduling/public/RuntimePublicSchedulingAvailabilityService.ts";

const targetPath = path.join(ROOT, TARGET);

if (!fs.existsSync(targetPath)) {
  throw new Error(`Fichier introuvable: ${TARGET}`);
}

const backupPath = `${targetPath}.bak-qpublic-sched-cb2-field-fallbacks`;
fs.copyFileSync(targetPath, backupPath);

let content = fs.readFileSync(targetPath, "utf8");

const oldBlock = `      const bookings = buildBookingsForDate(
        records,
        date,
        {
          dateField: schedulingConfig.dateField,
          startField: schedulingConfig.startField,
          endField: schedulingConfig.endField,
          statusField: schedulingConfig.statusField,
          blockingStatuses: schedulingConfig.blockingStatuses,
        }
      );`;

const newBlock = `      const bookings = buildBookingsForDate(
        records,
        date,
        {
          dateField: schedulingConfig.dateField ?? "dateRendezVous",
          startField: schedulingConfig.startField ?? "startAt",
          endField: schedulingConfig.endField ?? "endAt",
          statusField: schedulingConfig.statusField,
          blockingStatuses: schedulingConfig.blockingStatuses,
        }
      );`;

if (!content.includes(oldBlock)) {
  throw new Error("Bloc buildBookingsForDate attendu introuvable.");
}

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(targetPath, content, "utf8");

console.log("");
console.log("[Q-PUBLIC-SCHED-C-B2] DONE");
console.log(`[BACKUP] ${path.relative(ROOT, backupPath).replace(/\\\\/g, "/")}`);
console.log(`[UPDATED] ${TARGET}`);
console.log("");
console.log("Next:");
console.log("pnpm build");
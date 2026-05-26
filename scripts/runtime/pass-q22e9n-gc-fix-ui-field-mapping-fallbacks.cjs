const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const TARGET =
  "src/components/erp/scheduling/settings/ERPSchedulingSettingsPanel.tsx";

const targetPath = path.join(ROOT, TARGET);

if (!fs.existsSync(targetPath)) {
  throw new Error(`Fichier introuvable: ${TARGET}`);
}

const backupPath = `${targetPath}.bak-q22e9n-gc-field-mapping-fallbacks`;
fs.copyFileSync(targetPath, backupPath);

let content = fs.readFileSync(targetPath, "utf8");

const oldBlock = `          setForm({
            enabled: effective.enabled,
            defaultDurationMinutes: effective.defaultDurationMinutes,
            bufferMinutes: effective.bufferMinutes,
            capacity: effective.capacity,
            resourceField: effective.resourceField ?? "",
            dateField: effective.dateField,
            timeField: effective.timeField,
            durationField: effective.durationField,
            startField: effective.startField,
            endField: effective.endField,
          });`;

const newBlock = `          setForm({
            enabled: effective.enabled,
            defaultDurationMinutes: effective.defaultDurationMinutes,
            bufferMinutes: effective.bufferMinutes,
            capacity: effective.capacity,
            resourceField: effective.resourceField ?? "",
            dateField: effective.dateField ?? "date",
            timeField: effective.timeField ?? "time",
            durationField: effective.durationField ?? "durationMinutes",
            startField: effective.startField ?? "startAt",
            endField: effective.endField ?? "endAt",
          });`;

if (!content.includes(oldBlock)) {
  throw new Error("Bloc setForm effective attendu introuvable.");
}

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(targetPath, content, "utf8");

console.log("");
console.log("[Q22E-9N-G-C] DONE");
console.log(`[BACKUP] ${path.relative(ROOT, backupPath).replace(/\\\\/g, "/")}`);
console.log(`[UPDATED] ${TARGET}`);
console.log("");
console.log("Next:");
console.log("pnpm build");
const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targetPath = path.join(
  root,
  "src",
  "runtime",
  "scheduling",
  "settings",
  "RuntimeSchedulingSettingsEngine.ts"
);

const backupPath = `${targetPath}.bak-q22e9c-opening-hours-profile-key-label`;

function fail(message) {
  console.error(`\n[ERROR] ${message}`);
  process.exit(1);
}

if (!fs.existsSync(targetPath)) {
  fail(`File not found: ${targetPath}`);
}

if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(targetPath, backupPath);
  console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
} else {
  console.log(`[BACKUP_EXISTS] ${path.relative(root, backupPath)}`);
}

let content = fs.readFileSync(targetPath, "utf8");
const original = content;

const oldBlock = `  return {
    timezone:
      settings.timezone ??
      DEFAULT_WORKSPACE_OPENING_HOURS.timezone,
    defaultSlotDurationMinutes:
      settings.defaultSlotDurationMinutes ??
      DEFAULT_WORKSPACE_OPENING_HOURS.defaultSlotDurationMinutes,
    days: settings.days.map((day) => ({
      day: day.day,
      isOpen: day.isOpen,
      periods: day.periods.map((period) => ({
        start: period.start,
        end: period.end,
      })),
    })),
  };`;

const newBlock = `  return {
    key:
      DEFAULT_WORKSPACE_OPENING_HOURS.key,
    label:
      DEFAULT_WORKSPACE_OPENING_HOURS.label,
    timezone:
      settings.timezone ??
      DEFAULT_WORKSPACE_OPENING_HOURS.timezone,
    defaultSlotDurationMinutes:
      settings.defaultSlotDurationMinutes ??
      DEFAULT_WORKSPACE_OPENING_HOURS.defaultSlotDurationMinutes,
    days: settings.days.map((day) => ({
      day: day.day,
      isOpen: day.isOpen,
      periods: day.periods.map((period) => ({
        start: period.start,
        end: period.end,
      })),
    })),
  };`;

if (!content.includes(oldBlock)) {
  fail("Bloc toOpeningHoursProfile attendu introuvable.");
}

content = content.replace(oldBlock, newBlock);

if (content === original) {
  fail("No changes applied.");
}

fs.writeFileSync(targetPath, content, "utf8");

console.log(`
[Q22E9C_FIX_DONE] RuntimeOpeningHoursProfile corrigé.

Correction:
  - key repris depuis DEFAULT_WORKSPACE_OPENING_HOURS
  - label repris depuis DEFAULT_WORKSPACE_OPENING_HOURS
  - timezone/defaultSlotDurationMinutes/days conservés

Next:
  pnpm build
`);
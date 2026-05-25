const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targetPath = path.join(
  root,
  "src",
  "components",
  "erp",
  "scheduling",
  "ERPSchedulingPlanningView.tsx"
);

const backupPath = `${targetPath}.bak-q22e8a-visible-duration-buffer`;

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

if (
  content.includes("Q22E8A_VISIBLE_DURATION_SEPARATE_FROM_BUFFER") &&
  content.includes("getVisibleSchedulingDurationMinutes")
) {
  console.log("\n[SKIP] Q22E-8A semble déjà appliqué.");
  process.exit(0);
}

const helperAnchor = `function formatReadableDate(dateOnly: string)`;

const helperBlock = `function getVisibleSchedulingDurationMinutes(
  schedulingConfig: NonNullable<ERPModule["scheduling"]>
) {
  // Q22E8A_VISIBLE_DURATION_SEPARATE_FROM_BUFFER
  // The visible appointment duration must stay independent from bufferMinutes.
  // bufferMinutes protects availability but must not stretch labels like 08:00-09:15.
  const configWithDuration =
    schedulingConfig as {
      defaultDurationMinutes?: number;
      slotDurationMinutes?: number;
      durationMinutes?: number;
    };

  const candidates = [
    configWithDuration.defaultDurationMinutes,
    configWithDuration.slotDurationMinutes,
    configWithDuration.durationMinutes,
    RuntimeSchedulingEngine.defaultDurationMinutes,
  ];

  for (const candidate of candidates) {
    const value = Number(candidate);

    if (Number.isFinite(value) && value > 0) {
      return value;
    }
  }

  return 60;
}

`;

if (!content.includes(helperAnchor)) {
  fail("Anchor formatReadableDate not found.");
}

content = content.replace(
  helperAnchor,
  helperBlock + helperAnchor
);

const oldDurationBlock = `    const durationField =
      schedulingConfig.durationField;

    const fallbackDuration =
      durationField
        ? Number(records[0]?.[durationField] ?? 0) || undefined
        : undefined;

    const slots =
      RuntimeSchedulingEngine.getAvailableSlotsWithBookings({
        date: selectedDate,
        durationMinutes: fallbackDuration,
        bookings,
        bufferMinutes: schedulingConfig.bufferMinutes,
        calendarExceptions: schedulingConfig.calendarExceptions,
        capacity: schedulingConfig.capacity,
      });`;

const newDurationBlock = `    const visibleDurationMinutes =
      getVisibleSchedulingDurationMinutes(schedulingConfig);

    const slots =
      RuntimeSchedulingEngine.getAvailableSlotsWithBookings({
        date: selectedDate,
        durationMinutes: visibleDurationMinutes,
        bookings,
        bufferMinutes: schedulingConfig.bufferMinutes,
        calendarExceptions: schedulingConfig.calendarExceptions,
        capacity: schedulingConfig.capacity,
      });`;

if (!content.includes(oldDurationBlock)) {
  fail("Duration block not found. The planning file may have changed.");
}

content = content.replace(oldDurationBlock, newDurationBlock);

const oldCreateHrefBlock = `  if (schedulingConfig.endField) {
    searchParams.set(
      schedulingConfig.endField,
      \`\${dateOnly}T\${slot.end}:00\`
    );
  }

  return \`\${getCreateHref(module)}?\${searchParams.toString()}\`;`;

const newCreateHrefBlock = `  if (schedulingConfig.endField) {
    searchParams.set(
      schedulingConfig.endField,
      \`\${dateOnly}T\${slot.end}:00\`
    );
  }

  if (schedulingConfig.durationField) {
    const durationMinutes =
      getVisibleSchedulingDurationMinutes(schedulingConfig);

    searchParams.set(
      schedulingConfig.durationField,
      String(durationMinutes)
    );
  }

  return \`\${getCreateHref(module)}?\${searchParams.toString()}\`;`;

if (!content.includes(oldCreateHrefBlock)) {
  fail("Create href duration injection anchor not found.");
}

content = content.replace(oldCreateHrefBlock, newCreateHrefBlock);

if (content === original) {
  fail("No changes applied.");
}

fs.writeFileSync(targetPath, content, "utf8");

console.log(`
[Q22E8A_DONE] Durée visible séparée du buffer dans le planning.

Résultat attendu:
  - RDV visible: 08:00 - 09:00 si durationMinutes = 60
  - Buffer 15 min: bloque 09:00 - 09:15 en arrière-plan
  - Le bouton Planifier transmet durationMinutes=60
  - Aucun hardcode rendezvous / garage / AMARKHYS

Next:
  pnpm build
  tester /rendezvous/planning
`);
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET = "src/runtime/guards/processRuntimeBeforeMutationGuards.ts";
const targetPath = path.join(ROOT, TARGET);

if (!fs.existsSync(targetPath)) {
  throw new Error(`Fichier introuvable: ${TARGET}`);
}

const backupPath = `${targetPath}.bak-q22e9n-c5b2-generic-schedulable-guard`;
fs.copyFileSync(targetPath, backupPath);

let content = fs.readFileSync(targetPath, "utf8");

function replaceOrThrow(label, pattern, replacement) {
  if (!pattern.test(content)) {
    throw new Error(`Pattern introuvable: ${label}`);
  }
  content = content.replace(pattern, replacement);
}

replaceOrThrow(
  "isRendezvousModule",
  /function\s+isRendezvousModule\s*\(\s*module:\s*ERPModule\s*\):\s*boolean\s*\{[\s\S]*?\n\}/m,
  `function isSchedulableModule(module: ERPModule): boolean {
  const scheduling = module.metadata.scheduling as
    | { enabled?: boolean }
    | undefined;

  return scheduling?.enabled === true;
}`
);

replaceOrThrow(
  "hasRealAppointmentDateAndTime",
  /function\s+hasRealAppointmentDateAndTime\s*\(\s*record:\s*RuntimeRecord\s*\):\s*boolean\s*\{[\s\S]*?\n\}/m,
  `function hasRealSchedulingDateAndTime(
  record: RuntimeRecord,
  fieldConfig: {
    dateField: string;
    timeField: string;
  }
): boolean {
  return Boolean(
    asString(record[fieldConfig.dateField]) &&
    asString(record[fieldConfig.timeField])
  );
}`
);

replaceOrThrow(
  "assertRendezvousServiceType",
  /function\s+assertRendezvousServiceType\s*\(\s*record:\s*RuntimeRecord\s*\):\s*void\s*\{[\s\S]*?\n\}\s*\n/m,
  ``
);

content = content.replaceAll(
  "loadExistingRendezvousForConflictCheck",
  "loadExistingSchedulableRecordsForConflictCheck"
);

content = content.replaceAll(
  "guardRendezvousMutation",
  "guardSchedulableMutation"
);

replaceOrThrow(
  "begin guardSchedulableMutation scheduling config",
  /  if\s*\(\s*\n\s*!hasRealAppointmentDateAndTime\(mergedRecord\)\s*&&\s*\n\s*isPublicAppointmentRequest\(mergedRecord\)\s*\n\s*\)\s*\{[\s\S]*?assertRendezvousServiceType\(mergedRecord\);\s*\n\s*const schedulingConfig\s*=\s*\n\s*await getSchedulingConfig\(module,\s*context\);/m,
  `  const schedulingConfig =
    await getSchedulingConfig(module, context);

  if (!schedulingConfig) {
    return data;
  }

  const dateField = schedulingConfig.dateField ?? "date";
  const timeField = schedulingConfig.timeField ?? "time";
  const durationField = schedulingConfig.durationField ?? "durationMinutes";
  const startField = schedulingConfig.startField ?? "startAt";
  const endField = schedulingConfig.endField ?? "endAt";

  const schedulingFieldConfig = {
    dateField,
    timeField,
  };

  if (
    !hasRealSchedulingDateAndTime(mergedRecord, schedulingFieldConfig) &&
    isPublicAppointmentRequest(mergedRecord)
  ) {
    return data;
  }

  if (!hasRealSchedulingDateAndTime(mergedRecord, schedulingFieldConfig)) {
    throw new Error(
      "Le module planifiable doit avoir une date et une heure reelles avant sauvegarde."
    );
  }`
);

content = content.replaceAll(
  /typeof\s+mergedRecord\.durationMinutes\s*===\s*"number"\s*\?\s*mergedRecord\.durationMinutes\s*:\s*Number\(mergedRecord\.durationMinutes\s*\?\?\s*0\)\s*\|\|\s*undefined/g,
  `typeof mergedRecord[durationField] === "number"
        ? (mergedRecord[durationField] as number)
        : Number(mergedRecord[durationField] ?? 0) || undefined`
);

content = content.replaceAll(
  "asString(mergedRecord.dateRendezVous)",
  "asString(mergedRecord[dateField])"
);

content = content.replaceAll(
  "asString(mergedRecord.heureRendezVous)",
  "asString(mergedRecord[timeField])"
);

content = content.replace(
  /    const startField\s*=\s*\n\s*schedulingConfig\?\.startField\s*\?\?\s*"startAt";\s*\n\s*const endField\s*=\s*\n\s*schedulingConfig\?\.endField\s*\?\?\s*"endAt";\s*\n/m,
  ""
);

content = content.replace(
  /      durationMinutes:\s*\n\s*normalizedRecord\.durationMinutes,\s*\n\s*startAt:\s*\n\s*normalizedRecord\.startAt,\s*\n\s*endAt:\s*\n\s*normalizedRecord\.endAt,/m,
  `      [durationField]:
        normalizedRecord[durationField],
      [startField]:
        normalizedRecord[startField],
      [endField]:
        normalizedRecord[endField],`
);

replaceOrThrow(
  "processRuntimeBeforeMutationGuards schedulable dispatch",
  /  if\s*\(\s*isRendezvousModule\(module\)\s*\)\s*\{[\s\S]*?await guardSchedulableMutation\(\s*module,\s*guardedData,\s*context\s*\);\s*\n\s*\}/m,
  `  if (isSchedulableModule(module)) {
    guardedData =
      await guardSchedulableMutation(
        module,
        guardedData,
        context
      );
  }`
);

const forbidden = [
  "isRendezvousModule",
  "guardRendezvousMutation",
  "loadExistingRendezvousForConflictCheck",
  "assertRendezvousServiceType",
  "typeService",
  "dateRendezVous",
  "heureRendezVous",
];

const remaining = forbidden.filter((marker) => content.includes(marker));

if (remaining.length > 0) {
  const details = remaining
    .map((marker) => {
      const lines = content
        .split(/\r?\n/)
        .map((line, index) => ({ line, index: index + 1 }))
        .filter(({ line }) => line.includes(marker))
        .map(({ line, index }) => `${index}: ${line.trim()}`)
        .join("\n");
      return `\n${marker}\n${lines}`;
    })
    .join("\n");

  throw new Error(`Marqueurs interdits encore présents:${details}`);
}

fs.writeFileSync(targetPath, content, "utf8");

console.log("");
console.log("[Q22E-9N-C5-B2] DONE");
console.log(`[BACKUP] ${path.relative(ROOT, backupPath).replace(/\\/g, "/")}`);
console.log(`[UPDATED] ${TARGET}`);
console.log("");
console.log("Next:");
console.log("pnpm build");
console.log("node .\\scripts\\runtime\\audit-q22e9n-c3-scheduling-field-mapping.cjs");
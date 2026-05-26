const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const TARGET = "src/runtime/scheduling/RuntimeSchedulingEngine.ts";
const targetPath = path.join(ROOT, TARGET);

if (!fs.existsSync(targetPath)) {
  throw new Error(`Fichier introuvable: ${TARGET}`);
}

const backupPath = `${targetPath}.bak-q22e9n-c4-generic-field-config`;
fs.copyFileSync(targetPath, backupPath);

let content = fs.readFileSync(targetPath, "utf8");

const requiredBefore = [
  'dateField: "dateRendezVous"',
  'timeField: "heureRendezVous"',
  "function hasRealDateAndTime(record: RuntimeRecord): boolean",
  "if (!hasRealDateAndTime(record))",
  "Impossible de calculer le créneau : dateRendezVous et heureRendezVous sont obligatoires.",
];

for (const marker of requiredBefore) {
  if (!content.includes(marker)) {
    throw new Error(`Marqueur introuvable avant patch: ${marker}`);
  }
}

content = content.replace(
  `const DEFAULT_RUNTIME_SCHEDULING_FIELD_CONFIG: RuntimeSchedulingFieldConfig = {
  dateField: "dateRendezVous",
  timeField: "heureRendezVous",
  durationField: "durationMinutes",
  startField: "startAt",
  endField: "endAt",
  resourceField: "resourceId",
};`,
  `const DEFAULT_RUNTIME_SCHEDULING_FIELD_CONFIG: RuntimeSchedulingFieldConfig = {
  dateField: "date",
  timeField: "time",
  durationField: "durationMinutes",
  startField: "startAt",
  endField: "endAt",
  resourceField: "resourceId",
};`
);

content = content.replace(
  `function hasRealDateAndTime(record: RuntimeRecord): boolean {
  const dateRendezVous = asString(record.dateRendezVous);
  const heureRendezVous = asString(record.heureRendezVous);

  return Boolean(dateRendezVous && heureRendezVous);
}`,
  `function hasRealDateAndTime(
  record: RuntimeRecord,
  fieldConfig: RuntimeSchedulingFieldConfig = resolveRuntimeSchedulingFieldConfig()
): boolean {
  const dateValue = getRuntimeSchedulingFieldString(record, fieldConfig.dateField);
  const timeValue = getRuntimeSchedulingFieldString(record, fieldConfig.timeField);

  return Boolean(dateValue && timeValue);
}`
);

content = content.replaceAll(
  `if (!hasRealDateAndTime(record)) {`,
  `if (!hasRealDateAndTime(record, fieldConfig)) {`
);

content = content.replace(
  `"Impossible de calculer le créneau : dateRendezVous et heureRendezVous sont obligatoires."`,
  `"Impossible de calculer le créneau : les champs date et heure configurés sont obligatoires."`
);

content = content.replace(
  `    if (!hasRealDateAndTime(record, fieldConfig)) {
      return {
        ...record,
        durationMinutes: asNumber(
          record.durationMinutes,
          RuntimeSchedulingEngine.defaultDurationMinutes
        ),
      };
    }`,
  `    const fieldConfig = resolveRuntimeSchedulingFieldConfig(config);

    if (!hasRealDateAndTime(record, fieldConfig)) {
      return {
        ...record,
        [fieldConfig.durationField]: asNumber(
          record[fieldConfig.durationField],
          RuntimeSchedulingEngine.defaultDurationMinutes
        ),
      };
    }`
);

content = content.replace(
  `      durationMinutes: slot.durationMinutes,
      startAt: slot.startAt,
      endAt: slot.endAt,`,
  `      [fieldConfig.durationField]: slot.durationMinutes,
      [fieldConfig.startField]: slot.startAt,
      [fieldConfig.endField]: slot.endAt,`
);

const forbiddenAfter = [
  "dateRendezVous",
  "heureRendezVous",
];

for (const marker of forbiddenAfter) {
  if (content.includes(marker)) {
    const lines = content
      .split(/\r?\n/)
      .map((line, index) => ({ line, index: index + 1 }))
      .filter(({ line }) => line.includes(marker))
      .map(({ line, index }) => `${index}: ${line.trim()}`)
      .join("\n");

    throw new Error(
      `Le moteur contient encore ${marker} après patch:\n${lines}`
    );
  }
}

fs.writeFileSync(targetPath, content, "utf8");

console.log("");
console.log("[Q22E-9N-C4] DONE");
console.log(`[BACKUP] ${path.relative(ROOT, backupPath).replace(/\\/g, "/")}`);
console.log(`[UPDATED] ${TARGET}`);
console.log("");
console.log("Next:");
console.log("pnpm build");
console.log("node .\\scripts\\runtime\\audit-q22e9n-c3-scheduling-field-mapping.cjs");
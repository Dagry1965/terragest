/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const PASS_ID = "Q22E-9L-B1";
const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "RuntimeSchedulingEngine.ts"
);

const BACKUP = `${TARGET}.bak-q22e9l-b1-genericize-scheduling-fields`;

function normalizePath(filePath) {
  return filePath.split(path.sep).join("/");
}

function read(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`Fichier introuvable: ${normalizePath(path.relative(ROOT, file))}`);
  }

  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file) {
  if (!fs.existsSync(BACKUP)) {
    fs.copyFileSync(file, BACKUP);
    console.log(`[BACKUP] ${normalizePath(path.relative(ROOT, BACKUP))}`);
  } else {
    console.log(`[BACKUP_EXISTS] ${normalizePath(path.relative(ROOT, BACKUP))}`);
  }
}

function assertContains(content, needle, label) {
  if (!content.includes(needle)) {
    throw new Error(`[${PASS_ID}] Motif introuvable: ${label}`);
  }
}

function replaceOnce(content, search, replacement, label) {
  if (!content.includes(search)) {
    throw new Error(`[${PASS_ID}] Remplacement impossible, motif absent: ${label}`);
  }

  return content.replace(search, replacement);
}

function main() {
  console.log(`[${PASS_ID}] Généricisation des champs scheduling dans RuntimeSchedulingEngine...`);

  let content = read(TARGET);
  backup(TARGET);

  /**
   * 1. Ajouter un type de config générique local au moteur si absent.
   * On reste volontairement minimal pour ne pas casser les types existants.
   */
  if (!content.includes("interface RuntimeSchedulingFieldConfig")) {
    const marker = "type RuntimeRecord = Record<string, unknown>;";
    assertContains(content, marker, "type RuntimeRecord");

    content = replaceOnce(
      content,
      marker,
      `${marker}

interface RuntimeSchedulingFieldConfig {
  dateField: string;
  timeField: string;
  durationField: string;
  startField: string;
  endField: string;
  resourceField?: string;
}

const DEFAULT_RUNTIME_SCHEDULING_FIELD_CONFIG: RuntimeSchedulingFieldConfig = {
  dateField: "dateRendezVous",
  timeField: "heureRendezVous",
  durationField: "durationMinutes",
  startField: "startAt",
  endField: "endAt",
  resourceField: "resourceId",
};

function resolveRuntimeSchedulingFieldConfig(
  config?: Partial<RuntimeSchedulingFieldConfig>
): RuntimeSchedulingFieldConfig {
  return {
    ...DEFAULT_RUNTIME_SCHEDULING_FIELD_CONFIG,
    ...(config || {}),
  };
}

function getRuntimeSchedulingFieldValue(
  record: RuntimeRecord,
  fieldName?: string
): unknown {
  if (!fieldName) return undefined;
  return record[fieldName];
}

function getRuntimeSchedulingFieldString(
  record: RuntimeRecord,
  fieldName?: string
): string {
  return asString(getRuntimeSchedulingFieldValue(record, fieldName));
}

function getRuntimeSchedulingFieldNumber(
  record: RuntimeRecord,
  fieldName?: string,
  fallback = 0
): number {
  return asNumber(getRuntimeSchedulingFieldValue(record, fieldName), fallback);
}`,
      "injection RuntimeSchedulingFieldConfig"
    );
  }

  /**
   * 2. Génériciser hasSchedulingDateTime(record)
   * Ancien attendu :
   * const dateRendezVous = asString(record.dateRendezVous);
   * const heureRendezVous = asString(record.heureRendezVous);
   */
  const oldHasSchedulingDateTime = `static hasSchedulingDateTime(record: RuntimeRecord): boolean {
    const dateRendezVous = asString(record.dateRendezVous);
    const heureRendezVous = asString(record.heureRendezVous);

    return Boolean(dateRendezVous && heureRendezVous);
  }`;

  const newHasSchedulingDateTime = `static hasSchedulingDateTime(
    record: RuntimeRecord,
    config?: Partial<RuntimeSchedulingFieldConfig>
  ): boolean {
    const fieldConfig = resolveRuntimeSchedulingFieldConfig(config);
    const dateValue = getRuntimeSchedulingFieldString(record, fieldConfig.dateField);
    const timeValue = getRuntimeSchedulingFieldString(record, fieldConfig.timeField);

    return Boolean(dateValue && timeValue);
  }`;

  if (content.includes(oldHasSchedulingDateTime)) {
    content = replaceOnce(
      content,
      oldHasSchedulingDateTime,
      newHasSchedulingDateTime,
      "hasSchedulingDateTime"
    );
  } else {
    console.log("[SKIP] hasSchedulingDateTime exact pattern absent, déjà modifié ou différent.");
  }

  /**
   * 3. Remplacer les accès directs a.vehiculeId / b.vehiculeId dans la logique de conflit.
   * On transforme la méthode pour accepter resourceField si possible.
   */
  content = content.replace(
    /const vehicleA = asString\(a\.vehiculeId\);\s*const vehicleB = asString\(b\.vehiculeId\);/g,
    `const resourceField = "resourceField" in params && typeof params.resourceField === "string"
      ? params.resourceField
      : resolveRuntimeSchedulingFieldConfig().resourceField;
    const vehicleA = getRuntimeSchedulingFieldString(a, resourceField);
    const vehicleB = getRuntimeSchedulingFieldString(b, resourceField);`
  );

  /**
   * 4. Génériciser computeAppointmentSlot si les motifs existent.
   * On remplace dateRendezVous/heureRendezVous/durationMinutes/startAt/endAt par config.
   */
  content = content.replace(
    /static computeAppointmentSlot\(record: RuntimeRecord\): RuntimeRecord \{/g,
    `static computeAppointmentSlot(
    record: RuntimeRecord,
    config?: Partial<RuntimeSchedulingFieldConfig>
  ): RuntimeRecord {
    const fieldConfig = resolveRuntimeSchedulingFieldConfig(config);`
  );

  content = content.replace(
    /if \(!RuntimeSchedulingEngine\.hasSchedulingDateTime\(record\)\) \{\s*return \{\s*success: false,\s*reason: "Impossible de calculer le créneau : dateRendezVous et heureRendezVous sont obligatoires\.",\s*\};\s*\}/g,
    `if (!RuntimeSchedulingEngine.hasSchedulingDateTime(record, fieldConfig)) {
      return {
        success: false,
        reason: "Impossible de calculer le créneau : date et heure de planification obligatoires.",
      };
    }`
  );

  content = content.replace(
    /asString\(record\.dateRendezVous\),\s*asString\(record\.heureRendezVous\)/g,
    `getRuntimeSchedulingFieldString(record, fieldConfig.dateField),
      getRuntimeSchedulingFieldString(record, fieldConfig.timeField)`
  );

  content = content.replace(
    /asNumber\(record\.durationMinutes,\s*RuntimeSchedulingEngine\.defaultDurationMinutes\)/g,
    `getRuntimeSchedulingFieldNumber(
      record,
      fieldConfig.durationField,
      RuntimeSchedulingEngine.defaultDurationMinutes
    )`
  );

  content = content.replace(
    /startAt: slot\.startAt,\s*endAt: slot\.endAt,\s*durationMinutes: slot\.durationMinutes,/g,
    `[fieldConfig.startField]: slot.startAt,
      [fieldConfig.endField]: slot.endAt,
      [fieldConfig.durationField]: slot.durationMinutes,`
  );

  /**
   * 5. Remplacer le message invalide trop spécifique.
   */
  content = content.replace(
    /"Impossible de calculer le créneau : dateRendezVous ou heureRendezVous invalide\."/g,
    `"Impossible de calculer le créneau : date ou heure de planification invalide."`
  );

  /**
   * 6. Génériciser applyAppointmentSlot si présent.
   */
  content = content.replace(
    /static applyAppointmentSlot\(record: RuntimeRecord\): RuntimeRecord \{/g,
    `static applyAppointmentSlot(
    record: RuntimeRecord,
    config?: Partial<RuntimeSchedulingFieldConfig>
  ): RuntimeRecord {`
  );

  content = content.replace(
    /const slot = RuntimeSchedulingEngine\.computeAppointmentSlot\(record\);/g,
    `const slot = RuntimeSchedulingEngine.computeAppointmentSlot(record, config);`
  );

  content = content.replace(
    /durationMinutes: slot\.durationMinutes,\s*startAt: slot\.startAt,\s*endAt: slot\.endAt,/g,
    `durationMinutes: slot.durationMinutes,
      startAt: slot.startAt,
      endAt: slot.endAt,`
  );

  /**
   * 7. Ajouter un export de type si nécessaire.
   * On ne force pas export si le fichier n'en utilise pas.
   */

  write(TARGET, content);

  console.log(`[WRITTEN] ${normalizePath(path.relative(ROOT, TARGET))}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  node .\\\\scripts\\\\runtime\\\\audit-q22e9l-a-runtime-scheduling-engine.cjs");
  console.log("  git diff -- src/runtime/scheduling/RuntimeSchedulingEngine.ts");
}

main();
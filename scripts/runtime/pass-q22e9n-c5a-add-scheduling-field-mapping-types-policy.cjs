const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  types: "src/runtime/scheduling/RuntimeSchedulingTypes.ts",
  policy: "src/runtime/scheduling/SchedulingSlotPolicy.ts",
};

function full(rel) {
  return path.join(ROOT, rel);
}

function read(rel) {
  return fs.readFileSync(full(rel), "utf8");
}

function write(rel, content) {
  fs.writeFileSync(full(rel), content, "utf8");
}

function backup(rel, suffix) {
  const source = full(rel);
  const target = `${source}.${suffix}`;
  fs.copyFileSync(source, target);
  return path.relative(ROOT, target).replace(/\\/g, "/");
}

for (const rel of Object.values(files)) {
  if (!fs.existsSync(full(rel))) {
    throw new Error(`Fichier introuvable: ${rel}`);
  }
}

const backups = [];

let types = read(files.types);
backups.push(backup(files.types, "bak-q22e9n-c5a-field-mapping"));

if (!types.includes("export interface RuntimeSchedulingFieldMapping")) {
  const insertAfter = `export interface RuntimeSchedulingContext {
  tenantId?: string;
  workspaceId?: string;
  moduleKey?: string;
  resourceType?: string;
  resourceId?: string;
  resourceField?: string;
}
`;

  if (!types.includes(insertAfter)) {
    throw new Error("Bloc RuntimeSchedulingContext introuvable dans RuntimeSchedulingTypes.ts");
  }

  types = types.replace(
    insertAfter,
    `${insertAfter}

export interface RuntimeSchedulingFieldMapping {
  dateField: string;
  timeField: string;
  durationField: string;
  startField: string;
  endField: string;
  resourceField?: string;
  statusField?: string;
}
`
  );
}

write(files.types, types);

let policy = read(files.policy);
backups.push(backup(files.policy, "bak-q22e9n-c5a-field-mapping"));

if (!policy.includes("RuntimeSchedulingFieldMapping")) {
  policy = policy.replace(
    `import type { RuntimeOpeningHoursProfile } from "./RuntimeSchedulingTypes";`,
    `import type {
  RuntimeOpeningHoursProfile,
  RuntimeSchedulingFieldMapping,
} from "./RuntimeSchedulingTypes";`
  );
}

if (!policy.includes("fieldMapping?: Partial<RuntimeSchedulingFieldMapping>;")) {
  policy = policy.replace(
    `  statusField?: string;
  nonBlockingStatuses?: string[];`,
    `  statusField?: string;
  fieldMapping?: Partial<RuntimeSchedulingFieldMapping>;
  nonBlockingStatuses?: string[];`
  );
}

if (!policy.includes("fieldMapping: RuntimeSchedulingFieldMapping;")) {
  policy = policy.replace(
    `  statusField: string;
  nonBlockingStatuses: string[];`,
    `  statusField: string;
  fieldMapping: RuntimeSchedulingFieldMapping;
  nonBlockingStatuses: string[];`
  );
}

if (!policy.includes("DEFAULT_SCHEDULING_FIELD_MAPPING")) {
  policy = policy.replace(
    `export const DEFAULT_SCHEDULING_STATUS_FIELD = "statut";`,
    `export const DEFAULT_SCHEDULING_STATUS_FIELD = "statut";

export const DEFAULT_SCHEDULING_FIELD_MAPPING: RuntimeSchedulingFieldMapping = {
  dateField: "date",
  timeField: "time",
  durationField: "durationMinutes",
  startField: "startAt",
  endField: "endAt",
  resourceField: "resourceId",
  statusField: DEFAULT_SCHEDULING_STATUS_FIELD,
};`
  );
}

if (!policy.includes("const fieldMapping: RuntimeSchedulingFieldMapping = {")) {
  policy = policy.replace(
    `    const capacity = asPositiveInteger(
      input.capacity,
      DEFAULT_SCHEDULING_CAPACITY
    );

    return {`,
    `    const capacity = asPositiveInteger(
      input.capacity,
      DEFAULT_SCHEDULING_CAPACITY
    );

    const statusField = input.statusField || DEFAULT_SCHEDULING_STATUS_FIELD;

    const fieldMapping: RuntimeSchedulingFieldMapping = {
      ...DEFAULT_SCHEDULING_FIELD_MAPPING,
      ...input.fieldMapping,
      statusField,
    };

    return {`
  );
}

policy = policy.replace(
  `      capacity,
      statusField: input.statusField || DEFAULT_SCHEDULING_STATUS_FIELD,
      nonBlockingStatuses:`,
  `      capacity,
      statusField,
      fieldMapping,
      nonBlockingStatuses:`
);

write(files.policy, policy);

console.log("");
console.log("[Q22E-9N-C5-A] DONE");
console.log("[BACKUPS]");
for (const item of backups) {
  console.log(`- ${item}`);
}
console.log("[UPDATED]");
console.log(`- ${files.types}`);
console.log(`- ${files.policy}`);
console.log("");
console.log("Next:");
console.log("pnpm build");
console.log("node .\\scripts\\runtime\\audit-q22e9n-c3-scheduling-field-mapping.cjs");
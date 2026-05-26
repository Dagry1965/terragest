/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9M-B";

const POLICY_FILE = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "SchedulingSlotPolicy.ts"
);

const INDEX_FILE = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "index.ts"
);

const INDEX_BACKUP = `${INDEX_FILE}.bak-q22e9m-b-scheduling-slot-policy`;

function rel(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function read(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`[${PASS_ID}] Fichier introuvable: ${rel(file)}`);
  }
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

function backup(file, backupPath) {
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(file, backupPath);
    console.log(`[BACKUP] ${rel(backupPath)}`);
  } else {
    console.log(`[BACKUP_EXISTS] ${rel(backupPath)}`);
  }
}

function ensurePolicyFile() {
  const content = `import type { RuntimeOpeningHoursProfile } from "./RuntimeSchedulingTypes";

export interface SchedulingSlotPolicyInput {
  durationMinutes?: number;
  defaultDurationMinutes?: number;
  slotDurationMinutes?: number;
  bufferMinutes?: number;
  capacity?: number;
  statusField?: string;
  nonBlockingStatuses?: string[];
  openingHoursProfile?: RuntimeOpeningHoursProfile;
}

export interface SchedulingSlotPolicy {
  visibleDurationMinutes: number;
  bufferMinutes: number;
  slotDurationMinutes: number;
  capacity: number;
  statusField: string;
  nonBlockingStatuses: string[];
  openingHoursProfile?: RuntimeOpeningHoursProfile;
}

export const DEFAULT_SCHEDULING_VISIBLE_DURATION_MINUTES = 60;
export const DEFAULT_SCHEDULING_BUFFER_MINUTES = 0;
export const DEFAULT_SCHEDULING_CAPACITY = 1;
export const DEFAULT_SCHEDULING_STATUS_FIELD = "statut";

export const DEFAULT_NON_BLOCKING_SCHEDULING_STATUSES = [
  "annule",
  "annulee",
  "annulé",
  "annulée",
  "cancelled",
  "canceled",
];

function asPositiveInteger(value: unknown, fallback: number): number {
  const parsed = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.floor(parsed);
}

function asNonNegativeInteger(value: unknown, fallback: number): number {
  const parsed = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return fallback;
  }

  return Math.floor(parsed);
}

export class SchedulingSlotPolicyResolver {
  static resolve(input: SchedulingSlotPolicyInput = {}): SchedulingSlotPolicy {
    const visibleDurationMinutes = asPositiveInteger(
      input.durationMinutes ??
        input.defaultDurationMinutes ??
        input.slotDurationMinutes,
      DEFAULT_SCHEDULING_VISIBLE_DURATION_MINUTES
    );

    const bufferMinutes = asNonNegativeInteger(
      input.bufferMinutes,
      DEFAULT_SCHEDULING_BUFFER_MINUTES
    );

    const slotDurationMinutes = asPositiveInteger(
      input.slotDurationMinutes,
      visibleDurationMinutes + bufferMinutes
    );

    const capacity = asPositiveInteger(
      input.capacity,
      DEFAULT_SCHEDULING_CAPACITY
    );

    return {
      visibleDurationMinutes,
      bufferMinutes,
      slotDurationMinutes,
      capacity,
      statusField: input.statusField || DEFAULT_SCHEDULING_STATUS_FIELD,
      nonBlockingStatuses:
        input.nonBlockingStatuses && input.nonBlockingStatuses.length > 0
          ? input.nonBlockingStatuses
          : DEFAULT_NON_BLOCKING_SCHEDULING_STATUSES,
      openingHoursProfile: input.openingHoursProfile,
    };
  }

  static isNonBlockingRecord(
    record: Record<string, unknown>,
    policy: SchedulingSlotPolicy
  ): boolean {
    const rawStatus = record[policy.statusField];

    if (rawStatus === undefined || rawStatus === null) {
      return false;
    }

    const status = String(rawStatus).trim().toLowerCase();

    return policy.nonBlockingStatuses
      .map((item) => String(item).trim().toLowerCase())
      .includes(status);
  }
}
`;

  write(POLICY_FILE, content);
  console.log(`[WRITTEN] ${rel(POLICY_FILE)}`);
}

function patchIndex() {
  let content = read(INDEX_FILE);
  backup(INDEX_FILE, INDEX_BACKUP);

  if (!content.includes('export * from "./SchedulingSlotPolicy";')) {
    content = content.trimEnd() + `\nexport * from "./SchedulingSlotPolicy";\n`;
    write(INDEX_FILE, content);
    console.log(`[PATCHED] ${rel(INDEX_FILE)}`);
  } else {
    console.log("[SKIP] SchedulingSlotPolicy déjà exportée");
  }
}

function main() {
  console.log(`[${PASS_ID}] Création SchedulingSlotPolicy générique...`);

  ensurePolicyFile();
  patchIndex();

  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  git diff -- src/runtime/scheduling/SchedulingSlotPolicy.ts src/runtime/scheduling/index.ts");
}

main();
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22f2b-pass-calendar-exceptions-to-runtime";

const formFieldFile =
  "src/components/erp/forms/enterprise/ERPFormField.tsx";

const guardFile =
  "src/runtime/guards/processRuntimeBeforeMutationGuards.ts";

function full(p) {
  return path.join(ROOT, p);
}

function backup(p) {
  const target = full(p);
  const backupPath = `${target}.bak-${TAG}`;

  if (!fs.existsSync(target)) {
    throw new Error(`[MISSING] ${p}`);
  }

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(target, backupPath);
    console.log(`[BACKUP] ${p}.bak-${TAG}`);
  }
}

function write(p, content) {
  fs.writeFileSync(full(p), content, "utf8");
  console.log(`[WRITTEN] ${p}`);
}

backup(formFieldFile);
backup(guardFile);

let formField = fs.readFileSync(full(formFieldFile), "utf8");

if (!formField.includes("Q22F2B_PASS_CALENDAR_EXCEPTIONS_TO_SLOTS")) {
  const marker = `            bufferMinutes:
              schedulingConfig.bufferMinutes,
          });`;

  const replacement = `            bufferMinutes:
              schedulingConfig.bufferMinutes,
            // Q22F2B_PASS_CALENDAR_EXCEPTIONS_TO_SLOTS
            // Generic ERP scheduling: calendar exceptions can close or override a specific date.
            calendarExceptions:
              schedulingConfig.calendarExceptions,
          });`;

  if (!formField.includes(marker)) {
    throw new Error("[MISSING] scheduling slots buffer marker");
  }

  formField = formField.replace(marker, replacement);
}

write(formFieldFile, formField);

let guard = fs.readFileSync(full(guardFile), "utf8");

if (!guard.includes("getSchedulingConfig")) {
  const marker = `function isRendezvousModule(module: ERPModule): boolean {
  return module.metadata.key === "rendezvous";
}`;

  const replacement = `function isRendezvousModule(module: ERPModule): boolean {
  return module.metadata.key === "rendezvous";
}

function getSchedulingConfig(module: ERPModule) {
  return module.scheduling?.enabled
    ? module.scheduling
    : null;
}`;

  if (!guard.includes(marker)) {
    throw new Error("[MISSING] isRendezvousModule marker");
  }

  guard = guard.replace(marker, replacement);
}

if (!guard.includes("Q22F2B_PASS_CALENDAR_EXCEPTIONS_TO_GUARD")) {
  const marker = `      durationMinutes:
        typeof mergedRecord.durationMinutes === "number"
          ? mergedRecord.durationMinutes
          : Number(mergedRecord.durationMinutes ?? 0) || undefined,
    });`;

  const replacement = `      durationMinutes:
        typeof mergedRecord.durationMinutes === "number"
          ? mergedRecord.durationMinutes
          : Number(mergedRecord.durationMinutes ?? 0) || undefined,
      // Q22F2B_PASS_CALENDAR_EXCEPTIONS_TO_GUARD
      // Generic ERP scheduling: persistence guard also applies calendar exceptions.
      calendarExceptions:
        getSchedulingConfig(module)?.calendarExceptions,
    });`;

  if (!guard.includes(marker)) {
    throw new Error("[MISSING] assertWithinOpeningHours duration marker");
  }

  guard = guard.replace(marker, replacement);
}

write(guardFile, guard);

console.log("");
console.log("[Q22F2B_DONE] calendarExceptions passed to UI and runtime guard.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
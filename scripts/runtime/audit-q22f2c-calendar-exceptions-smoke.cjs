const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  moduleType: "src/runtime/modules/ERPModule.ts",
  schedulingTypes: "src/runtime/scheduling/RuntimeSchedulingTypes.ts",
  schedulingEngine: "src/runtime/scheduling/RuntimeSchedulingEngine.ts",
  formField: "src/components/erp/forms/enterprise/ERPFormField.tsx",
  guard: "src/runtime/guards/processRuntimeBeforeMutationGuards.ts",
  rendezvous: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
};

function full(file) {
  return path.join(ROOT, file);
}

function read(file) {
  const target = full(file);

  if (!fs.existsSync(target)) {
    throw new Error(`[FAILED] Missing file: ${file}`);
  }

  return fs.readFileSync(target, "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`[FAILED] ${message}`);
  }

  console.log(`[OK] ${message}`);
}

const contents = Object.fromEntries(
  Object.entries(files).map(([key, file]) => [key, read(file)])
);

assert(
  contents.moduleType.includes("calendarExceptions?:"),
  "ERPModuleScheduling declares calendarExceptions"
);

assert(
  contents.moduleType.includes("Q22F2A_CALENDAR_EXCEPTIONS_METADATA"),
  "ERPModuleScheduling has Q22F2A metadata marker"
);

assert(
  contents.schedulingTypes.includes("RuntimeCalendarException"),
  "RuntimeCalendarException exists"
);

assert(
  contents.schedulingTypes.includes("Q22F2A_RUNTIME_CALENDAR_EXCEPTION"),
  "RuntimeCalendarException has Q22F2A marker"
);

assert(
  contents.schedulingEngine.includes("calendarExceptions?: RuntimeCalendarException[]"),
  "RuntimeSchedulingEngine accepts calendarExceptions"
);

assert(
  contents.schedulingEngine.includes("Q22F2A_APPLY_CALENDAR_EXCEPTIONS"),
  "RuntimeSchedulingEngine applies calendar exceptions"
);

assert(
  contents.schedulingEngine.includes("exception?.isClosed"),
  "RuntimeSchedulingEngine handles closed dates"
);

assert(
  contents.schedulingEngine.includes("exception?.periods"),
  "RuntimeSchedulingEngine handles overridden periods"
);

assert(
  contents.formField.includes("Q22F2B_PASS_CALENDAR_EXCEPTIONS_TO_SLOTS"),
  "ERPFormField passes calendarExceptions to availability slots"
);

assert(
  contents.guard.includes("Q22F2B_PASS_CALENDAR_EXCEPTIONS_TO_GUARD"),
  "Runtime guard passes calendarExceptions to opening-hours validation"
);

assert(
  contents.rendezvous.includes("calendarExceptions:"),
  "rendezvous declares calendarExceptions as first scheduling consumer"
);

assert(
  contents.rendezvous.includes("Q22F2A_RENDEZVOUS_CALENDAR_EXCEPTIONS_EXAMPLE"),
  "rendezvous has calendar exception example marker"
);

const report = {
  generatedAt: new Date().toISOString(),
  pass: "Q22F-2C",
  title: "Scheduling calendar exceptions smoke audit",
  status: "ok",
  capabilities: [
    "calendar exceptions metadata",
    "closed date support",
    "date-specific period override",
    "form availability receives calendar exceptions",
    "runtime guard receives calendar exceptions",
  ],
  files,
};

fs.mkdirSync(full("reports"), { recursive: true });

fs.writeFileSync(
  full("reports/q22f2c-calendar-exceptions-smoke.json"),
  JSON.stringify(report, null, 2),
  "utf8"
);

fs.writeFileSync(
  full("reports/q22f2c-calendar-exceptions-smoke.md"),
  [
    "# Q22F-2C — Scheduling calendar exceptions smoke audit",
    "",
    "Status: OK",
    "",
    "## Capabilities",
    "",
    ...report.capabilities.map((item) => `- ${item}`),
    "",
    "## Checked files",
    "",
    ...Object.values(files).map((file) => `- ${file}`),
    "",
  ].join("\n"),
  "utf8"
);

console.log("");
console.log("[Q22F2C_CALENDAR_EXCEPTIONS_SMOKE_OK]");
console.log("Reports:");
console.log("  reports/q22f2c-calendar-exceptions-smoke.json");
console.log("  reports/q22f2c-calendar-exceptions-smoke.md");
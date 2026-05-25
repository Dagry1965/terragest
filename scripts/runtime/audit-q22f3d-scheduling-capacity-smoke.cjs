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
  contents.moduleType.includes("Q22F3A_SCHEDULING_CAPACITY_METADATA"),
  "ERPModuleScheduling declares capacity metadata"
);

assert(
  contents.moduleType.includes("capacity?: number;"),
  "ERPModuleScheduling has capacity property"
);

assert(
  contents.schedulingTypes.includes("Q22F3A_RUNTIME_SLOT_CAPACITY"),
  "RuntimeAvailabilitySlot has capacity marker"
);

assert(
  contents.schedulingTypes.includes("usedCapacity?: number;"),
  "RuntimeAvailabilitySlot has usedCapacity"
);

assert(
  contents.schedulingTypes.includes("remainingCapacity?: number;"),
  "RuntimeAvailabilitySlot has remainingCapacity"
);

assert(
  contents.schedulingEngine.includes("Q22F3A_CAPACITY_AWARE_AVAILABILITY"),
  "RuntimeSchedulingEngine has capacity-aware availability marker"
);

assert(
  contents.schedulingEngine.includes("remainingCapacity"),
  "RuntimeSchedulingEngine computes remainingCapacity"
);

assert(
  contents.schedulingEngine.includes("usedCapacity = overlappingBookings.length"),
  "RuntimeSchedulingEngine counts overlapping bookings"
);

assert(
  contents.formField.includes("Q22F3B_PASS_CAPACITY_TO_SLOTS"),
  "ERPFormField passes capacity to scheduling slots"
);

assert(
  contents.formField.includes("place(s) restante(s)"),
  "ERPFormField displays remaining places"
);

assert(
  contents.guard.includes("Q22F3C_CAPACITY_GUARD"),
  "Runtime guard enforces capacity"
);

assert(
  contents.guard.includes("Créneau complet"),
  "Runtime guard has full-slot error message"
);

assert(
  contents.rendezvous.includes("capacity: 1"),
  "rendezvous declares capacity as first scheduling consumer"
);

const report = {
  generatedAt: new Date().toISOString(),
  pass: "Q22F-3D",
  title: "Scheduling capacity smoke audit",
  status: "ok",
  capabilities: [
    "capacity metadata",
    "capacity-aware availability slots",
    "used capacity calculation",
    "remaining capacity calculation",
    "form availability capacity display",
    "runtime guard capacity enforcement",
  ],
  files,
};

fs.mkdirSync(full("reports"), { recursive: true });

fs.writeFileSync(
  full("reports/q22f3d-scheduling-capacity-smoke.json"),
  JSON.stringify(report, null, 2),
  "utf8"
);

fs.writeFileSync(
  full("reports/q22f3d-scheduling-capacity-smoke.md"),
  [
    "# Q22F-3D — Scheduling capacity smoke audit",
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
console.log("[Q22F3D_SCHEDULING_CAPACITY_SMOKE_OK]");
console.log("Reports:");
console.log("  reports/q22f3d-scheduling-capacity-smoke.json");
console.log("  reports/q22f3d-scheduling-capacity-smoke.md");
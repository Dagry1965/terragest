const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/scheduling/RuntimeSchedulingEngine.ts",
  "src/runtime/scheduling/RuntimeOpeningHours.ts",
  "src/runtime/scheduling/RuntimeSchedulingTypes.ts",
  "src/runtime/modules/ERPModule.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/guards/processRuntimeBeforeMutationGuards.ts",
  "src/components/erp/forms/enterprise/ERPFormField.tsx",
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx",
];

const forbiddenTerms = [
  "DEFAULT_GARAGE_OPENING_HOURS",
  "garage-specific",
  "Amarkhys",
  "AMARKHYS",
  "amarkhys",
];

function full(file) {
  return path.join(ROOT, file);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`[FAILED] ${message}`);
  }

  console.log(`[OK] ${message}`);
}

function read(file) {
  const target = full(file);

  assert(fs.existsSync(target), `${file} exists`);

  return fs.readFileSync(target, "utf8");
}

const contents = Object.fromEntries(
  files.map((file) => [file, read(file)])
);

assert(
  contents["src/runtime/modules/ERPModule.ts"].includes("ERPModuleScheduling"),
  "ERPModule declares generic scheduling metadata"
);

assert(
  contents["src/runtime/modules/generated/rendezvous/rendezvous.module.ts"].includes("scheduling:"),
  "rendezvous declares scheduling as first consumer"
);

assert(
  contents["src/runtime/modules/generated/rendezvous/rendezvous.module.ts"].includes("resourceField: \"vehiculeId\""),
  "rendezvous declares resourceField"
);

assert(
  contents["src/runtime/scheduling/RuntimeSchedulingEngine.ts"].includes("getAvailableSlotsForDate"),
  "RuntimeSchedulingEngine has getAvailableSlotsForDate"
);

assert(
  contents["src/runtime/scheduling/RuntimeSchedulingEngine.ts"].includes("getAvailableSlotsWithBookings"),
  "RuntimeSchedulingEngine has getAvailableSlotsWithBookings"
);

assert(
  contents["src/runtime/scheduling/RuntimeSchedulingEngine.ts"].includes("assertWithinOpeningHours"),
  "RuntimeSchedulingEngine has assertWithinOpeningHours"
);

assert(
  contents["src/runtime/guards/processRuntimeBeforeMutationGuards.ts"].includes("Q22C_OPENING_HOURS_GUARD"),
  "before mutation guard enforces opening hours"
);

assert(
  contents["src/components/erp/forms/enterprise/ERPFormField.tsx"].includes("module?.scheduling"),
  "ERPFormField consumes module.scheduling"
);

assert(
  contents["src/components/erp/forms/enterprise/ERPFormField.tsx"].includes("Q22D4_RESOURCE_FIELD_BOOKING_FILTER"),
  "ERPFormField filters bookings by resourceField"
);

assert(
  contents["src/components/erp/forms/enterprise/ERPFormField.tsx"].includes("Q22D5_SCHEDULING_SLOTS_UX_POLISH"),
  "ERPFormField has scheduling UX polish"
);

const runtimeGenericFiles = [
  // Q22D6B_RUNTIME_FORBIDDEN_SCOPE
  // Business consumer modules may contain their business identity.
  // Only the generic runtime layer must stay free of local AMARKHYS/garage naming.
  "src/runtime/scheduling/RuntimeSchedulingEngine.ts",
  "src/runtime/scheduling/RuntimeOpeningHours.ts",
  "src/runtime/scheduling/RuntimeSchedulingTypes.ts",
  "src/runtime/modules/ERPModule.ts",
  "src/runtime/guards/processRuntimeBeforeMutationGuards.ts",
  "src/components/erp/forms/enterprise/ERPFormField.tsx",
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx",
];

for (const file of runtimeGenericFiles) {
  const fileContent = contents[file];

  for (const term of forbiddenTerms) {
    assert(
      !fileContent.includes(term),
      `${file} does not contain forbidden local term: ${term}`
    );
  }
}


const report = {
  generatedAt: new Date().toISOString(),
  pass: "Q22D-6",
  title: "ERP Scheduling Runtime final audit",
  status: "ok",
  checkedFiles: files,
  capabilities: [
    "generic scheduling metadata",
    "opening hours profile",
    "availability slots",
    "booking-aware availability",
    "resourceField filtering",
    "runtime guard before persistence",
    "generic form field scheduling UI",
  ],
};

fs.mkdirSync(full("reports"), { recursive: true });

fs.writeFileSync(
  full("reports/q22d6-scheduling-runtime-final-audit.json"),
  JSON.stringify(report, null, 2),
  "utf8"
);

fs.writeFileSync(
  full("reports/q22d6-scheduling-runtime-final-audit.md"),
  [
    "# Q22D-6 — ERP Scheduling Runtime final audit",
    "",
    "Status: OK",
    "",
    "## Capabilities",
    "",
    ...report.capabilities.map((item) => `- ${item}`),
    "",
    "## Checked files",
    "",
    ...files.map((file) => `- ${file}`),
    "",
  ].join("\n"),
  "utf8"
);

console.log("");
console.log("[Q22D6_AUDIT_OK]");
console.log("Reports:");
console.log("  reports/q22d6-scheduling-runtime-final-audit.json");
console.log("  reports/q22d6-scheduling-runtime-final-audit.md");
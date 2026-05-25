const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  planningView: "src/components/erp/scheduling/ERPSchedulingPlanningView.tsx",
  schedulingIndex: "src/components/erp/scheduling/index.ts",
  rendezvousPlanningPage: "src/app/(private)/rendezvous/planning/page.tsx",
  rendezvousModule: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
};

const forbiddenRuntimeTerms = [
  "Amarkhys",
  "AMARKHYS",
  "amarkhys",
  "garage",
  "Garage",
  "GARAGE",
];

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
  contents.planningView.includes("ERPSchedulingPlanningView"),
  "Generic planning view exists"
);

assert(
  contents.planningView.includes("module.scheduling"),
  "Planning view consumes module.scheduling"
);

assert(
  contents.planningView.includes("RuntimeDataBinding.list"),
  "Planning view loads records through RuntimeDataBinding"
);

assert(
  contents.planningView.includes("RuntimeSchedulingEngine.getAvailableSlotsWithBookings"),
  "Planning view uses RuntimeSchedulingEngine availability"
);

assert(
  contents.planningView.includes("calendarExceptions"),
  "Planning view passes calendar exceptions"
);

assert(
  contents.planningView.includes("bufferMinutes"),
  "Planning view passes bufferMinutes"
);

assert(
  contents.planningView.includes("capacity"),
  "Planning view passes capacity"
);

assert(
  contents.planningView.includes("remainingCapacity"),
  "Planning view displays remaining capacity"
);

assert(
  contents.schedulingIndex.includes('export * from "./ERPSchedulingPlanningView"'),
  "Scheduling component index exports planning view"
);

assert(
  contents.rendezvousPlanningPage.includes("ERPSchedulingPlanningView"),
  "Rendezvous planning page consumes generic planning view"
);

assert(
  contents.rendezvousPlanningPage.includes("rendezvousModule"),
  "Rendezvous planning page passes rendezvousModule"
);

assert(
  contents.rendezvousModule.includes("scheduling:"),
  "rendezvous module declares scheduling metadata"
);

for (const term of forbiddenRuntimeTerms) {
  assert(
    !contents.planningView.includes(term),
    `Generic planning view does not contain local term: ${term}`
  );
}

const report = {
  generatedAt: new Date().toISOString(),
  pass: "Q22E-6",
  title: "Scheduling planning runtime audit",
  status: "ok",
  capabilities: [
    "generic scheduling planning view",
    "module.scheduling driven rendering",
    "RuntimeDataBinding records loading",
    "RuntimeSchedulingEngine availability calculation",
    "bufferMinutes support",
    "calendarExceptions support",
    "capacity and remainingCapacity support",
    "rendezvous as first consumer only",
  ],
  files,
};

fs.mkdirSync(full("reports"), { recursive: true });

fs.writeFileSync(
  full("reports/q22e6-scheduling-planning-runtime-audit.json"),
  JSON.stringify(report, null, 2),
  "utf8"
);

fs.writeFileSync(
  full("reports/q22e6-scheduling-planning-runtime-audit.md"),
  [
    "# Q22E-6 — Scheduling planning runtime audit",
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
console.log("[Q22E6_SCHEDULING_PLANNING_RUNTIME_AUDIT_OK]");
console.log("Reports:");
console.log("  reports/q22e6-scheduling-planning-runtime-audit.json");
console.log("  reports/q22e6-scheduling-planning-runtime-audit.md");
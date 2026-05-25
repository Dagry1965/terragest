const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const enginePath =
  "src/runtime/scheduling/RuntimeSchedulingEngine.ts";

const openingPath =
  "src/runtime/scheduling/RuntimeOpeningHours.ts";

function exists(file) {
  return fs.existsSync(path.join(ROOT, file));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`[FAILED] ${message}`);
  }

  console.log(`[OK] ${message}`);
}

assert(exists(enginePath), "RuntimeSchedulingEngine.ts exists");
assert(exists(openingPath), "RuntimeOpeningHours.ts exists");

const engine = fs.readFileSync(path.join(ROOT, enginePath), "utf8");
const opening = fs.readFileSync(path.join(ROOT, openingPath), "utf8");

assert(
  engine.includes("static getAvailableSlotsForDate"),
  "getAvailableSlotsForDate is installed"
);

assert(
  engine.includes("static assertWithinOpeningHours"),
  "assertWithinOpeningHours is installed"
);

assert(
  engine.includes("static buildDateTimeRange"),
  "buildDateTimeRange is installed"
);

assert(
  opening.includes("DEFAULT_WORKSPACE_OPENING_HOURS"),
  "DEFAULT_WORKSPACE_OPENING_HOURS is installed"
);

assert(
  !engine.includes("DEFAULT_GARAGE_OPENING_HOURS"),
  "No garage-specific opening hours constant in engine"
);

assert(
  !opening.includes("DEFAULT_GARAGE_OPENING_HOURS"),
  "No garage-specific opening hours constant in opening hours"
);

assert(
  !engine.includes("Amarkhys"),
  "No AMARKHYS-specific naming in scheduling engine"
);

assert(
  !engine.includes("amarkhys"),
  "No amarkhys-specific naming in scheduling engine"
);

console.log("");
console.log("[Q22B3_SMOKE_OK] Generic scheduling runtime foundation looks clean.");
console.log("");
console.log("Manual runtime expectations:");
console.log("- Monday should generate slots");
console.log("- Sunday should return no slots");
console.log("- 08:00 should be valid on open days");
console.log("- 13:00 should be invalid if outside configured periods");
console.log("- 18:00 should be invalid when period ends at 18:00");
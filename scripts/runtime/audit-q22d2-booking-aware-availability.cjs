const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const enginePath = "src/runtime/scheduling/RuntimeSchedulingEngine.ts";

function full(p) {
  return path.join(ROOT, p);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`[FAILED] ${message}`);
  }

  console.log(`[OK] ${message}`);
}

assert(
  fs.existsSync(full(enginePath)),
  "RuntimeSchedulingEngine.ts exists"
);

const engine = fs.readFileSync(full(enginePath), "utf8");

assert(
  engine.includes("static getAvailableSlotsWithBookings"),
  "getAvailableSlotsWithBookings is installed"
);

assert(
  engine.includes("Q22D1_BOOKING_AWARE_AVAILABILITY"),
  "Q22D1 marker is present"
);

assert(
  engine.includes("bookings?: RuntimeBooking[]"),
  "bookings parameter is supported"
);

assert(
  engine.includes("ignoreBookingId?: string"),
  "ignoreBookingId parameter is supported"
);

assert(
  engine.includes("available: !occupied"),
  "slots are marked available or unavailable"
);

assert(
  engine.includes("rangesOverlap("),
  "booking overlap detection uses generic range overlap"
);

assert(
  !engine.includes("garage"),
  "no lowercase garage hardcoding in scheduling engine"
);

assert(
  !engine.includes("GARAGE"),
  "no uppercase GARAGE hardcoding in scheduling engine"
);

assert(
  !engine.includes("Amarkhys"),
  "no Amarkhys hardcoding in scheduling engine"
);

assert(
  !engine.includes("amarkhys"),
  "no amarkhys hardcoding in scheduling engine"
);

console.log("");
console.log("[Q22D2_BOOKING_AWARE_SMOKE_OK]");
console.log("");
console.log("Expected runtime behavior:");
console.log("- opening slot without booking => available true");
console.log("- opening slot overlapping booking => available false");
console.log("- ignored booking id => slot remains available for the edited booking");
console.log("- engine remains ERP generic");
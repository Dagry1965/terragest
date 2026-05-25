const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22d3a2-fix-rendezvous-scheduling-metadata";

const rendezvousFile =
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts";

function full(p) {
  return path.join(ROOT, p);
}

const target = full(rendezvousFile);

if (!fs.existsSync(target)) {
  throw new Error(`[MISSING] ${rendezvousFile}`);
}

const backup = `${target}.bak-${TAG}`;

if (!fs.existsSync(backup)) {
  fs.copyFileSync(target, backup);
  console.log(`[BACKUP] ${rendezvousFile}.bak-${TAG}`);
}

let content = fs.readFileSync(target, "utf8");

if (content.includes("Q22D3A_RENDEZVOUS_SCHEDULING_METADATA")) {
  console.log("[SKIP] rendezvous scheduling metadata already installed.");
  process.exit(0);
}

const marker = `  actions: rendezvousActions,`;

const schedulingBlock = `  actions: rendezvousActions,

  scheduling: {
    // Q22D3A_RENDEZVOUS_SCHEDULING_METADATA
    // First consumer of the generic ERP Scheduling Runtime.
    enabled: true,
    dateField: "dateRendezVous",
    timeField: "heureRendezVous",
    durationField: "durationMinutes",
    startField: "startAt",
    endField: "endAt",
    statusField: "statut",
    resourceField: "vehiculeId",
    blockingStatuses: ["planifie", "confirme", "en_cours"],
  },`;

if (!content.includes(marker)) {
  throw new Error("[MISSING] actions: rendezvousActions marker");
}

content = content.replace(marker, schedulingBlock);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${rendezvousFile}`);
console.log("[Q22D3A2_DONE] rendezvous scheduling metadata installed.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
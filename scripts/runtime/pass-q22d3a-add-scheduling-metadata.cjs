const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22d3a-add-scheduling-metadata";

const moduleTypeFile = "src/runtime/modules/ERPModule.ts";
const rendezvousFile = "src/runtime/modules/generated/rendezvous/rendezvous.module.ts";

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

backup(moduleTypeFile);
backup(rendezvousFile);

let moduleType = fs.readFileSync(full(moduleTypeFile), "utf8");

if (!moduleType.includes("export interface ERPModuleScheduling")) {
  const insertAfter = `export interface ERPModulePermissions {
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
  import?: boolean;
  export?: boolean;
}
`;

  const schedulingType = `
export interface ERPModuleScheduling {
  /**
   * Q22D3A_GENERIC_SCHEDULING_METADATA
   * Generic ERP scheduling declaration.
   * Modules describe how their date/time/duration fields map to the Scheduling Runtime.
   */
  enabled: boolean;
  dateField: string;
  timeField: string;
  durationField?: string;
  startField?: string;
  endField?: string;
  statusField?: string;
  resourceField?: string;
  blockingStatuses?: string[];
}

`;

  if (!moduleType.includes(insertAfter)) {
    throw new Error("[MISSING] ERPModulePermissions block");
  }

  moduleType = moduleType.replace(insertAfter, insertAfter + schedulingType);
}

if (!moduleType.includes("scheduling?: ERPModuleScheduling;")) {
  const marker = `  form?: ERPModuleFormConfig;

  actions?: ERPModuleAction[];`;

  const replacement = `  form?: ERPModuleFormConfig;

  scheduling?: ERPModuleScheduling;

  actions?: ERPModuleAction[];`;

  if (!moduleType.includes(marker)) {
    throw new Error("[MISSING] ERPModule form/actions marker");
  }

  moduleType = moduleType.replace(marker, replacement);
}

write(moduleTypeFile, moduleType);

let rendezvous = fs.readFileSync(full(rendezvousFile), "utf8");

if (!rendezvous.includes("Q22D3A_RENDEZVOUS_SCHEDULING_METADATA")) {
  const marker = `  actions: rendezvousActions,
  composition: {`;

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
  },

  composition: {`;

  if (!rendezvous.includes(marker)) {
    throw new Error("[MISSING] rendezvous actions/composition marker");
  }

  rendezvous = rendezvous.replace(marker, schedulingBlock);
}

write(rendezvousFile, rendezvous);

console.log("");
console.log("[Q22D3A_DONE] Generic scheduling metadata added.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
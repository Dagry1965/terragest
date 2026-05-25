const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22f3a1-fix-scheduling-capacity-type";

const targetFile = "src/runtime/modules/ERPModule.ts";
const target = path.join(ROOT, targetFile);

if (!fs.existsSync(target)) {
  throw new Error(`[MISSING] ${targetFile}`);
}

const backup = `${target}.bak-${TAG}`;

if (!fs.existsSync(backup)) {
  fs.copyFileSync(target, backup);
  console.log(`[BACKUP] ${targetFile}.bak-${TAG}`);
}

let content = fs.readFileSync(target, "utf8");

if (content.includes("Q22F3A_SCHEDULING_CAPACITY_METADATA")) {
  console.log("[SKIP] capacity already declared in ERPModuleScheduling.");
  process.exit(0);
}

const marker = `  bufferMinutes?: number;`;

const replacement = `  bufferMinutes?: number;

  /**
   * Q22F3A_SCHEDULING_CAPACITY_METADATA
   * Nombre maximal de bookings acceptés sur un même créneau.
   */
  capacity?: number;`;

if (!content.includes(marker)) {
  throw new Error("[MISSING] bufferMinutes marker in ERPModuleScheduling");
}

content = content.replace(marker, replacement);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q22F3A1_DONE] ERPModuleScheduling capacity type fixed.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
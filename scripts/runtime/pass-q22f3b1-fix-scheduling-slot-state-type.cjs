const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22f3b1-fix-scheduling-slot-state-type";

const targetFile =
  "src/components/erp/forms/enterprise/ERPFormField.tsx";

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

if (content.includes("remainingCapacity?: number;")) {
  console.log("[SKIP] scheduling slot state already supports capacity.");
  process.exit(0);
}

const marker = `  const [schedulingSlots, setSchedulingSlots] = useState<
    Array<{
      start: string;
      end: string;
      label: string;
      available: boolean;
    }>
  >([]);`;

const replacement = `  const [schedulingSlots, setSchedulingSlots] = useState<
    Array<{
      start: string;
      end: string;
      label: string;
      available: boolean;
      capacity?: number;
      usedCapacity?: number;
      remainingCapacity?: number;
      reason?: string;
    }>
  >([]);`;

if (!content.includes(marker)) {
  throw new Error("[MISSING] schedulingSlots state marker");
}

content = content.replace(marker, replacement);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q22F3B1_DONE] scheduling slot state type supports capacity.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
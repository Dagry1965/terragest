const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/relations/RuntimeRelationLabelEngine.ts";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21x-c3c-depth-type`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21x-c3c-depth-type`);
}

let content = fs.readFileSync(file, "utf8");

if (content.includes("depth?: number;")) {
  console.log("[SKIP] depth already exists in RuntimeRelationLabelContext.");
  process.exit(0);
}

const marker = `  modules: ERPModule[];`;

if (!content.includes(marker)) {
  console.error("[ERROR] Cannot locate modules field in RuntimeRelationLabelContext.");
  process.exit(1);
}

content = content.replace(
  marker,
  `${marker}

  /**
   * Maximum nested relation label resolution depth.
   * 0 = no nested resolution, 1 = resolve direct relation fields only.
   */
  depth?: number;

  /**
   * Optional resolver injected by the caller.
   * Keeps this engine generic and avoids importing the data loader here.
   */
  resolveRelationLabel?: (
    moduleKey: string,
    id: string,
    depth: number
  ) => Promise<string>;`
);

fs.writeFileSync(file, content, "utf8");

console.log("[Q21X_C3C_TYPE_DONE] RuntimeRelationLabelContext now supports depth and resolveRelationLabel.");
console.log("Next: pnpm build");
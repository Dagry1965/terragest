const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/app/(private)/produitsauto/hub/page.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  console.error("[ROOT]", root);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2ok-d3-align-stocks-count-kpi-field`;

if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let content = fs.readFileSync(fullPath, "utf8");

function patchKpiField(source, key, field) {
  const keyIndex = source.indexOf(`key: "${key}"`);

  if (keyIndex === -1) {
    console.error("[KPI_NOT_FOUND]", key);
    return { source, applied: false };
  }

  const blockStart = source.lastIndexOf("{", keyIndex);
  const blockEnd = source.indexOf("}", keyIndex);

  if (blockStart === -1 || blockEnd === -1) {
    console.error("[KPI_BLOCK_NOT_FOUND]", key);
    return { source, applied: false };
  }

  const block = source.slice(blockStart, blockEnd + 1);
  let patchedBlock = block;

  if (patchedBlock.includes("field:")) {
    patchedBlock = patchedBlock.replace(/field:\s*"[^"]*"/, `field: "${field}"`);
  } else {
    patchedBlock = patchedBlock.replace(
      /source:\s*"computed",/,
      `source: "computed",\n      field: "${field}",`
    );
  }

  if (patchedBlock === block) {
    console.error("[PATCH_FAILED_BLOCK]", key);
    console.error(block);
    return { source, applied: false };
  }

  return {
    source: source.slice(0, blockStart) + patchedBlock + source.slice(blockEnd + 1),
    applied: true,
  };
}

const patches = [
  ["stockTotal", "stockTotal"],
  ["stocksCount", "stockCount"],
  ["openOrdersCount", "openOrders"],
  ["recentMovementsCount", "recentMovements"],
];

let applied = 0;

for (const [key, field] of patches) {
  const result = patchKpiField(content, key, field);
  content = result.source;

  if (result.applied) {
    applied++;
    console.log("[PATCHED]", key, "=>", field);
  }
}

if (applied !== patches.length) {
  console.error("[PATCH_FAILED] Expected", patches.length, "KPI patches, applied:", applied);
  process.exit(1);
}

fs.writeFileSync(fullPath, content, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[APPLIED]", applied);
console.log("[Q2-OK-D3] Product / Stock Hub KPI fields aligned.");
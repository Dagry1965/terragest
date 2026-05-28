const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const filePath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "operational",
  "ERPOperationalRightPanel.tsx"
);

function fail(message) {
  console.log("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  fail("ERPOperationalRightPanel.tsx not found");
}

let content = fs.readFileSync(filePath, "utf8");

const backupPath = filePath + ".bak-q2m-f-apply-operational-tokens-right-panel";
fs.writeFileSync(backupPath, content, "utf8");

console.log("[BACKUP]", path.relative(ROOT, backupPath));

if (!content.includes('import type { ERPModule } from "@/runtime/modules/ERPModule";')) {
  fail("Expected import anchor not found");
}

if (!content.includes('import { operationalUiTokens } from "./operationalUiTokens";')) {
  content = content.replace(
    'import type { ERPModule } from "@/runtime/modules/ERPModule";',
    'import type { ERPModule } from "@/runtime/modules/ERPModule";\nimport { operationalUiTokens } from "./operationalUiTokens";'
  );
}

function replaceOne(label, from, to) {
  if (!content.includes(from)) {
    fail("Missing expected pattern: " + label);
  }

  content = content.replace(from, to);
  console.log("[REPLACED]", label);
}

function replaceAll(label, from, to) {
  if (!content.includes(from)) {
    fail("Missing expected pattern: " + label);
  }

  content = content.split(from).join(to);
  console.log("[REPLACED]", label);
}

replaceOne(
  "right panel wrapper",
  '<aside className="rounded-[1.7rem] border border-amber-100 bg-[#FFF9EA] p-5 shadow-[0_18px_55px_rgba(146,99,12,0.10)]">',
  '<aside className={operationalUiTokens.cards.warm + " p-5"}>'
);

replaceOne(
  "right panel title",
  '<h2 className="text-lg font-black text-[#10251C]">',
  '<h2 className={"text-lg " + operationalUiTokens.colors.pageText + " font-black"}>'
);

replaceAll(
  "right panel metric labels",
  'className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-700"',
  'className={operationalUiTokens.typography.eyebrow + " text-amber-700"}'
);

replaceAll(
  "right panel metric values",
  'className="mt-1 text-2xl font-black text-[#10251C]"',
  'className={"mt-1 text-2xl font-black " + operationalUiTokens.colors.pageText}'
);

fs.writeFileSync(filePath, content, "utf8");

const updated = fs.readFileSync(filePath, "utf8");

const checks = [
  {
    label: "imports operationalUiTokens",
    ok: updated.includes('import { operationalUiTokens } from "./operationalUiTokens";'),
  },
  {
    label: "wrapper uses warm card token",
    ok: updated.includes("operationalUiTokens.cards.warm"),
  },
  {
    label: "title uses page text token",
    ok: updated.includes("operationalUiTokens.colors.pageText"),
  },
  {
    label: "labels use typography token",
    ok: updated.includes("operationalUiTokens.typography.eyebrow"),
  },
  {
    label: "metrics behavior preserved",
    ok:
      updated.includes("computeMetric") &&
      updated.includes("metrics.map") &&
      updated.includes("formatMetricValue"),
  },
  {
    label: "rightPanel config preserved",
    ok:
      updated.includes("module.operational?.rightPanel") &&
      updated.includes("config?.metrics"),
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-M-F] Apply operational UI tokens to right panel");
console.log("");

for (const check of checks) {
  console.log(`${check.ok ? "[OK]" : "[FAIL]"} ${check.label}`);
}

console.log("");
console.log(`[SUMMARY] OK: ${checks.length - failed.length} FAIL: ${failed.length}`);

if (failed.length > 0) {
  process.exit(1);
}

console.log("");
console.log("[DONE] ERPOperationalRightPanel now uses operational UI tokens.");
console.log("");
console.log("Next:");
console.log("  pnpm build");

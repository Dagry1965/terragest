const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const filePath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "operational",
  "ERPOperationalFilters.tsx"
);

function fail(message) {
  console.log("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  fail("ERPOperationalFilters.tsx not found");
}

let content = fs.readFileSync(filePath, "utf8");

const backupPath = filePath + ".bak-q2m-d-apply-operational-tokens-filters";
fs.writeFileSync(backupPath, content, "utf8");

console.log("[BACKUP]", path.relative(ROOT, backupPath));

if (!content.includes('import { operationalUiTokens } from "./operationalUiTokens";')) {
  content = content.replace(
    'import type {\n  ERPOperationalFilterConfig,\n} from "@/runtime/modules/ERPModule";',
    'import type {\n  ERPOperationalFilterConfig,\n} from "@/runtime/modules/ERPModule";\nimport { operationalUiTokens } from "./operationalUiTokens";'
  );
}

const replacements = [
  {
    from: '<div className="rounded-[1.7rem] border border-[var(--erp-border)] bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,0.05)]">',
    to: '<div className={operationalUiTokens.cards.soft + " p-4"}>',
  },
  {
    from: '<label className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">',
    to: '<label className={operationalUiTokens.typography.label}>',
    multiple: true,
  },
  {
    from: 'className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-[#10251C] outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"',
    to: 'className={"mt-2 " + operationalUiTokens.controls.input}',
  },
  {
    from: 'className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-[#10251C] outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"',
    to: 'className={"mt-2 " + operationalUiTokens.controls.input + " font-bold"}',
    multiple: true,
  },
  {
    from: 'className="h-11 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-700 transition hover:bg-slate-50"',
    to: 'className={operationalUiTokens.controls.secondaryButton}',
  },
];

for (const replacement of replacements) {
  if (!content.includes(replacement.from)) {
    fail("Missing expected pattern: " + replacement.from);
  }

  if (replacement.multiple) {
    content = content.split(replacement.from).join(replacement.to);
  } else {
    content = content.replace(replacement.from, replacement.to);
  }
}

fs.writeFileSync(filePath, content, "utf8");

const updated = fs.readFileSync(filePath, "utf8");

const checks = [
  {
    label: "imports operationalUiTokens",
    ok: updated.includes('import { operationalUiTokens } from "./operationalUiTokens";'),
  },
  {
    label: "card uses token",
    ok: updated.includes("operationalUiTokens.cards.soft"),
  },
  {
    label: "labels use token",
    ok: updated.includes("operationalUiTokens.typography.label"),
  },
  {
    label: "inputs use token",
    ok: updated.includes("operationalUiTokens.controls.input"),
  },
  {
    label: "reset button uses token",
    ok: updated.includes("operationalUiTokens.controls.secondaryButton"),
  },
  {
    label: "search behavior preserved",
    ok:
      updated.includes("search: string") &&
      updated.includes("onSearchChange") &&
      updated.includes("onSearchChange(event.target.value)") &&
      updated.includes('onSearchChange("")'),
  },
  {
    label: "filters behavior preserved",
    ok:
      updated.includes("filters.slice(0, 3).map") &&
      updated.includes("updateFilter") &&
      updated.includes("values[filter.key]"),
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-M-D] Apply operational UI tokens to filters");
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
console.log("[DONE] ERPOperationalFilters now uses operational UI tokens.");
console.log("");
console.log("Next:");
console.log("  pnpm build");

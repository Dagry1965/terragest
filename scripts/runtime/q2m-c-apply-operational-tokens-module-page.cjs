const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const filePath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "operational",
  "ERPOperationalModulePage.tsx"
);

function fail(message) {
  console.log("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  fail("ERPOperationalModulePage.tsx not found");
}

let content = fs.readFileSync(filePath, "utf8");

const backupPath = filePath + ".bak-q2m-c-apply-operational-tokens";
fs.writeFileSync(backupPath, content, "utf8");

console.log("[BACKUP]", path.relative(ROOT, backupPath));

if (!content.includes('import { ERPOperationalRightPanel } from "./ERPOperationalRightPanel";')) {
  fail("Expected import anchor not found");
}

if (!content.includes('operationalUiTokens')) {
  content = content.replace(
    'import { ERPOperationalRightPanel } from "./ERPOperationalRightPanel";',
    'import { ERPOperationalRightPanel } from "./ERPOperationalRightPanel";\nimport { operationalUiTokens } from "./operationalUiTokens";'
  );
}

const replacements = [
  {
    from: '<div className="-mt-36 space-y-3">',
    to: '<div className={operationalUiTokens.shell.pageSpacing}>',
  },
  {
    from: '<section className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-[#F8FBF8] shadow-[0_24px_80px_rgba(15,23,42,0.08)]">',
    to: '<section className={operationalUiTokens.shell.hero}>',
  },
  {
    from: '<h1 className="text-2xl font-black tracking-tight text-[#10251C] lg:text-[2.25rem]">',
    to: '<h1 className={operationalUiTokens.typography.title}>',
  },
  {
    from: '<p className="max-w-3xl text-sm font-semibold leading-6 text-slate-600">',
    to: '<p className={"max-w-3xl " + operationalUiTokens.typography.body}>',
  },
  {
    from: 'className="rounded-2xl bg-[#0F8A5F] px-5 py-3 text-sm font-black text-white shadow-[0_14px_34px_rgba(15,138,95,0.28)] transition hover:-translate-y-0.5 hover:bg-[#0B6F4C]"',
    to: 'className={operationalUiTokens.controls.primaryButton}',
  },
  {
    from: '<div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_380px]">',
    to: '<div className={operationalUiTokens.shell.contentGrid}>',
  },
];

for (const replacement of replacements) {
  if (!content.includes(replacement.from)) {
    fail("Missing expected pattern: " + replacement.from);
  }

  content = content.replace(replacement.from, replacement.to);
}

fs.writeFileSync(filePath, content, "utf8");

const updated = fs.readFileSync(filePath, "utf8");

const checks = [
  {
    label: "imports operationalUiTokens",
    ok: updated.includes('import { operationalUiTokens } from "./operationalUiTokens";'),
  },
  {
    label: "page spacing uses token",
    ok: updated.includes("operationalUiTokens.shell.pageSpacing"),
  },
  {
    label: "hero uses token",
    ok: updated.includes("operationalUiTokens.shell.hero"),
  },
  {
    label: "title uses token",
    ok: updated.includes("operationalUiTokens.typography.title"),
  },
  {
    label: "body uses token",
    ok: updated.includes("operationalUiTokens.typography.body"),
  },
  {
    label: "primary button uses token",
    ok: updated.includes("operationalUiTokens.controls.primaryButton"),
  },
  {
    label: "content grid uses token",
    ok: updated.includes("operationalUiTokens.shell.contentGrid"),
  },
  {
    label: "operational components still rendered",
    ok:
      updated.includes("ERPOperationalKpiStrip") &&
      updated.includes("ERPOperationalFilters") &&
      updated.includes("ERPOperationalTable") &&
      updated.includes("ERPOperationalRightPanel"),
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-M-C] Apply operational UI tokens to module page");
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
console.log("[DONE] ERPOperationalModulePage now uses operational UI tokens.");
console.log("");
console.log("Next:");
console.log("  pnpm build");

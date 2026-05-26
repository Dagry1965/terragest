/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const guardPath = path.join(
  ROOT,
  "src",
  "runtime",
  "guards",
  "processRuntimeBeforeMutationGuards.ts"
);

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

if (!fs.existsSync(guardPath)) {
  fail("processRuntimeBeforeMutationGuards.ts introuvable");
}

let content = fs.readFileSync(guardPath, "utf8");

if (!content.includes("resolveForRuntimeGuard")) {
  fail("resolveForRuntimeGuard introuvable dans le guard");
}

content = content.replace(
  /tenantId:\s*context\.tenantId,/g,
  'tenantId: context.tenantId ?? "runtime",'
);

fs.writeFileSync(guardPath, content, "utf8");

ok('tenantId optionnel corrigé avec fallback "runtime"');
console.log("");
console.log("[Q22E9I_E2_FIX_DONE] Guard-safe context corrigé.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");
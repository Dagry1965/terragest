/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const resolverPath = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "settings",
  "RuntimeSchedulingSettingsResolver.ts"
);

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

if (!fs.existsSync(resolverPath)) {
  fail("RuntimeSchedulingSettingsResolver.ts introuvable");
}

let content = fs.readFileSync(resolverPath, "utf8");

if (!content.includes("RuntimeSchedulingSettingsEngine.resolve")) {
  fail("RuntimeSchedulingSettingsEngine.resolve introuvable dans le resolver");
}

content = content.replace(
  /RuntimeSchedulingSettingsEngine\.resolve\(\{\s*module:\s*input\.module,\s*/s,
  "RuntimeSchedulingSettingsEngine.resolve({\n      moduleScheduling: input.module.scheduling,\n      "
);

content = content.replace(
  /RuntimeSchedulingSettingsEngine\.resolve\(\{\s*moduleScheduling:\s*input\.module\.scheduling,\s*tenantSettings:/s,
  "RuntimeSchedulingSettingsEngine.resolve({\n      moduleScheduling: input.module.scheduling,\n      tenantSettings:"
);

fs.writeFileSync(resolverPath, content, "utf8");

ok("RuntimeSchedulingSettingsResolver.ts passe maintenant moduleScheduling à l’engine");

console.log("");
console.log("[Q22E9E_FIX_DONE] Resolver aligné sur moduleScheduling.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");
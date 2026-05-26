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

if (content.includes("moduleKey: input.module.key")) {
  ok("moduleKey est déjà transmis à l’engine");
} else {
  content = content.replace(
    /RuntimeSchedulingSettingsEngine\.resolve\(\{\s*moduleScheduling:/s,
    "RuntimeSchedulingSettingsEngine.resolve({\n      moduleKey: input.module.key,\n      moduleScheduling:"
  );

  fs.writeFileSync(resolverPath, content, "utf8");
  ok("moduleKey ajouté dans RuntimeSchedulingSettingsEngine.resolve()");
}

console.log("");
console.log("[Q22E9E_MODULE_KEY_FIX_DONE] Resolver aligné avec moduleKey + moduleScheduling.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");
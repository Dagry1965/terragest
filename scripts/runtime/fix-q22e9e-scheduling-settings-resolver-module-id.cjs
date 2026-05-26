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

/**
 * ERPModule n'expose pas `key`.
 * On reste générique : moduleKey vient du context si disponible,
 * sinon de l'id module existant.
 */
content = content.replace(
  /moduleKey:\s*input\.module\.key,/g,
  "moduleKey: input.context.moduleKey ?? input.module.id,"
);

if (!content.includes("moduleKey: input.context.moduleKey ?? input.module.id")) {
  content = content.replace(
    /RuntimeSchedulingSettingsEngine\.resolve\(\{\s*moduleScheduling:/s,
    "RuntimeSchedulingSettingsEngine.resolve({\n      moduleKey: input.context.moduleKey ?? input.module.id,\n      moduleScheduling:"
  );
}

fs.writeFileSync(resolverPath, content, "utf8");

ok("RuntimeSchedulingSettingsResolver.ts utilise maintenant context.moduleKey ?? module.id");

console.log("");
console.log("[Q22E9E_MODULE_ID_FIX_DONE] Resolver aligné avec ERPModule.id.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");
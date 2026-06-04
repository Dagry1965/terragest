const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated",
  "facturesauto",
  "facturesauto.module.ts"
);

const passName = "billing-model-b3-remove-unsupported-readonly";

function fail(message) {
  console.error(`[${passName}] FAIL: ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[${passName}] OK: ${message}`);
}

if (!fs.existsSync(target)) {
  fail(`Target file not found: ${target}`);
}

let source = fs.readFileSync(target, "utf8");

const backup = `${target}.bak-${passName}`;
if (!fs.existsSync(backup)) {
  fs.writeFileSync(backup, source, "utf8");
  ok(`Backup created: ${backup}`);
}

const before = source;

source = source.replace(/\n\s*readOnly:\s*true,/g, "");

if (source === before) {
  ok("No unsupported readOnly property found. Nothing changed.");
} else {
  fs.writeFileSync(target, source, "utf8");
  ok("Removed unsupported readOnly property from source fields.");
}

ok("Locking remains centralized through readOnlyFields.");
ok("Next: run npm run build.");

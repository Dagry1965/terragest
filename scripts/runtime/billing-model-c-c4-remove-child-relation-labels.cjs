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

const passName = "BILLING-MODEL-C-C4";

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

const backup = `${target}.bak-billing-model-c-c4-remove-child-relation-labels`;
if (!fs.existsSync(backup)) {
  fs.writeFileSync(backup, source, "utf8");
  ok(`Backup created: ${backup}`);
}

const before = source;

source = source.replace(
  /,\s*\n\s*relationLabels:\s*{\s*[\s\S]*?\n\s*},\s*\n\s*},/m,
  `
      },`
);

if (source === before) {
  ok("No relationLabels block found. Nothing changed.");
} else {
  fs.writeFileSync(target, source, "utf8");
  ok("Removed unsupported relationLabels from invoice lines child panel.");
}

ok("Strict child filtering remains through moduleKey + foreignKey.");
ok("Next: run npm run build.");

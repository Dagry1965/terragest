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

const passName = "BILLING-MODEL-C-C5";

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

const backup = `${target}.bak-billing-model-c-c5-fix-extra-child-brace`;
if (!fs.existsSync(backup)) {
  fs.writeFileSync(backup, source, "utf8");
  ok(`Backup created: ${backup}`);
}

const before = source;

source = source.replace(
  /lockFields:\s*\["factureId",\s*"clientId",\s*"vehiculeId",\s*"interventionId"\]\s*\n\s*},\s*\n\s*},\s*\n\s*{/m,
  `lockFields: ["factureId", "clientId", "vehiculeId", "interventionId"],
      },
      {`
);

if (source === before) {
  ok("Exact duplicated child brace pattern not found. Trying safer fallback.");

  source = source.replace(
    /(\s*lockFields:\s*\["factureId",\s*"clientId",\s*"vehiculeId",\s*"interventionId"\])\s*\n\s*},\s*\n\s*},/m,
    `$1,
      },`
  );
}

if (source === before) {
  fail("Could not fix duplicated child brace. Inspect around lignes-facture child manually.");
}

fs.writeFileSync(target, source, "utf8");

ok("Fixed duplicated child closing brace after Lignes facture panel.");
ok("Next: run npm run build.");

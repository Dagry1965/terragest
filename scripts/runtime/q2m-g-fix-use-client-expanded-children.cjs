const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src",
  "components",
  "erp",
  "operational",
  "ERPOperationalExpandedChildren.tsx"
);

const backup = `${target}.bak-q2m-g-fix-use-client`;

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

if (!fs.existsSync(target)) {
  fail(`Target not found: ${target}`);
}

const original = fs.readFileSync(target, "utf8");

if (!fs.existsSync(backup)) {
  fs.writeFileSync(backup, original, "utf8");
  ok(`Backup created: ${path.relative(root, backup)}`);
}

let next = original;

// Remove all duplicated/misplaced "use client" directives.
next = next.replace(/^\s*"use client";\s*\r?\n+/gm, "");

// Put it back once, at the absolute top.
next = `"use client";\n\n${next.trimStart()}`;

fs.writeFileSync(target, next, "utf8");

ok(`Fixed use client directive in: ${path.relative(root, target)}`);
ok("Next: pnpm build");
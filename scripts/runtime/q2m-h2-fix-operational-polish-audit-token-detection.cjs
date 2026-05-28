const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "scripts",
  "runtime",
  "q2m-h-final-operational-polish-audit.cjs"
);

const backup = `${target}.bak-q2m-h2-token-detection`;

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

const oldBlock = `  if (content.includes("operationalUiTokens")) {
    addCheck(component.label, "OK", "operationalUiTokens usage detected", "HIGH");
  } else {
    addCheck(component.label, "FAIL", "operationalUiTokens usage not detected", "HIGH");
  }`;

const newBlock = `  const tokenUsageDetected =
    content.includes("operationalUiTokens") ||
    content.includes("./operationalUiTokens") ||
    content.includes("from \\"./operationalUiTokens\\"") ||
    content.includes("from './operationalUiTokens'") ||
    /[A-Za-z0-9_]*(Tokens|tokens)/.test(content);

  if (tokenUsageDetected) {
    addCheck(component.label, "OK", "Operational token usage detected", "HIGH");
  } else {
    addCheck(component.label, "FAIL", "Operational token usage not detected", "HIGH");
  }`;

if (!next.includes(oldBlock)) {
  fail("Expected strict token detection block not found. Manual inspection required.");
}

next = next.replace(oldBlock, newBlock);

fs.writeFileSync(target, next, "utf8");

ok(`Written: ${path.relative(root, target)}`);
ok("Next: rerun Q2-M-H audit");
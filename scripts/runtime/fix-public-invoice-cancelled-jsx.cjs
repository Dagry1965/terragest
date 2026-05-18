const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "app",
  "facture",
  "[token]",
  "page.tsx"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");
const before = content;

/**
 * Corrige le JSX cassé :
 * ) : (
 *   {summary.isCancelledInvoice ? (
 *
 * devient :
 * ) : (
 */
content = content.replace(
  /\)\s*:\s*\(\s*\{summary\.isCancelledInvoice\s*\?\s*\(/g,
  `) : (`
);

/**
 * Corrige les doubles fermetures éventuelles générées par le nested ternary.
 */
content = content.replace(
  /\)\s*\}\s*\)\s*\}/g,
  `)}`
);

if (content === before) {
  console.log("NO CHANGE");
  console.log("Inspect around broken area:");
  console.log(
    'Get-Content -LiteralPath ".\\\\src\\\\app\\\\facture\\\\[token]\\\\page.tsx" | Select-Object -Skip 510 -First 70'
  );
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED public invoice cancelled JSX");
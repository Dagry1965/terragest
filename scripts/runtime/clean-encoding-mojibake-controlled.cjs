const fs = require("fs");
const path = require("path");

const root = process.cwd();

const WRITE = process.argv.includes("--write");

const TARGET_DIRS = [
  "src",
  "scripts",
  "docs",
];

const EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".cjs",
  ".mjs",
  ".json",
  ".md",
  ".txt",
]);

const EXCLUDED_PARTS = [
  ".git",
  ".next",
  "node_modules",
  "dist",
  "build",
  "coverage",
  "_quarantine",
];

const replacements = [
  ["é", "é"],
  ["è", "è"],
  ["ê", "ê"],
  ["ë", "ë"],
  ["à", "à"],
  ["â", "â"],
  ["ç", "ç"],
  ["ô", "ô"],
  ["ù", "ù"],
  ["û", "û"],
  ["É", "É"],

  ["é", "é"],
  ["è", "è"],
  ["ê", "ê"],
  ["ë", "ë"],
  ["à", "à"],
  ["â", "â"],
  ["ç", "ç"],
  ["ô", "ô"],
  ["ù", "ù"],
  ["û", "û"],
  ["É", "É"],

  ["é", "é"],
  ["è", "è"],
  ["ê", "ê"],
  ["ë", "ë"],
  ["à", "à"],
  ["â", "â"],
  ["ç", "ç"],
  ["ô", "ô"],
  ["ù", "ù"],
  ["û", "û"],
  ["É", "É"],
  ["À", "À"],
  ["Ç", "Ç"],

  ["·", "·"],
  ["Ãƒ"š·", "·"],
  ["·", "·"],
  ["°", "°"],
  ["²", "²"],
  ["³", "³"],
  ["«", "«"],
  ["»", "»"],
  [" ", " "],

  ["'", "'"],
  ["'", "'"],
  [""", '"'],
  [""", '"'],
  [""“", "–"],
  [""”", "—"],
  [""¦", "…"],
  ["€", "€"],

  ["ââ"šÂ¬"Â", "—"],
  ["ââ"šÂ¬â"žÂ¢", "'"],
];

function shouldSkip(filePath) {
  return EXCLUDED_PARTS.some((part) => filePath.includes(path.sep + part + path.sep));
}

function hasMojibake(text) {
  return /Ã|Â|"|�/.test(text);
}

function score(text) {
  const matches = text.match(/Ã|Â|"|Ãƒ|Ã‚|�/g);
  return matches ? matches.length : 0;
}

function fixText(text) {
  let current = text;

  for (let pass = 0; pass < 4; pass++) {
    for (const [from, to] of replacements) {
      current = current.split(from).join(to);
    }
  }

  return current;
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (shouldSkip(fullPath)) {
      continue;
    }

    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    const ext = path.extname(entry.name);

    if (EXTENSIONS.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

function main() {
  console.log("[CLEAN-ENC-A] Controlled mojibake cleanup");
  console.log("[MODE]", WRITE ? "WRITE" : "DRY-RUN");

  const targetFiles = TARGET_DIRS.flatMap((dir) => walk(path.join(root, dir)));

  const changed = [];

  for (const file of targetFiles) {
    const before = fs.readFileSync(file, "utf8");

    if (!hasMojibake(before)) {
      continue;
    }

    const after = fixText(before);

    if (after !== before && score(after) <= score(before)) {
      const relative = path.relative(root, file);
      changed.push(relative);

      if (WRITE) {
        fs.writeFileSync(file, after, "utf8");
      }

      console.log(WRITE ? "[FIXED]" : "[WOULD FIX]", relative);
    }
  }

  console.log("");
  console.log("[SUMMARY]");
  console.log("Files scanned:", targetFiles.length);
  console.log("Files changed:", changed.length);

  if (!WRITE) {
    console.log("");
    console.log("[NEXT]");
    console.log("Run with --write to apply fixes.");
  }
}

main();
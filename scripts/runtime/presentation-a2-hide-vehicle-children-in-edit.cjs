const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const target = path.join(
  ROOT,
  "src/runtime/modules/generated/vehicules/vehicules.module.ts"
);

if (!fs.existsSync(target)) {
  throw new Error("Target file not found: " + target);
}

let source = fs.readFileSync(target, "utf8");

const replacements = [
  {
    key: 'key: "rendezvous"',
    label: "Rendez-vous du véhicule",
  },
  {
    key: 'key: "interventions"',
    label: "Interventions du véhicule",
  },
  {
    key: 'key: "factures-vehicule"',
    label: "Factures du véhicule",
  },
];

let changed = 0;

for (const item of replacements) {
  const keyIndex = source.indexOf(item.key);

  if (keyIndex === -1) {
    throw new Error("Child key not found: " + item.key);
  }

  const afterKey = source.slice(keyIndex, keyIndex + 1800);

  const multilinePattern =
    /displayIn:\s*\[\s*[\r\n]+\s*"detail"\s*,\s*[\r\n]+\s*"edit"\s*,?\s*[\r\n]+\s*\]/;

  const inlinePattern =
    /displayIn:\s*\[\s*"detail"\s*,\s*"edit"\s*\]/;

  let match = afterKey.match(multilinePattern);
  let patternType = "multiline";

  if (!match || match.index === undefined) {
    match = afterKey.match(inlinePattern);
    patternType = "inline";
  }

  if (!match || match.index === undefined) {
    if (/displayIn:\s*\[\s*"detail"\s*\]/.test(afterKey)) {
      console.log("[OK] Already detail-only:", item.label);
      continue;
    }

    throw new Error(
      'displayIn ["detail", "edit"] not found for ' + item.label
    );
  }

  const absoluteIndex = keyIndex + match.index;

  const replacement =
    patternType === "multiline"
      ? `displayIn: [
          "detail",
        ]`
      : `displayIn: ["detail"]`;

  source =
    source.slice(0, absoluteIndex) +
    replacement +
    source.slice(absoluteIndex + match[0].length);

  changed += 1;
  console.log("[UPDATED]", item.label);
}

fs.writeFileSync(target, source, "utf8");

console.log("[OK] Vehicle related panels hidden from edit mode.");
console.log("[CHANGED]", changed);
console.log("Updated:", path.relative(ROOT, target));
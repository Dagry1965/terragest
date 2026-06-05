const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/operational/RuntimeOperationalTreeResolver.ts";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");
fs.writeFileSync(file + ".bak-q2i-b1-fix-subtitle-fields-contract", original, "utf8");

let next = original;

next = next.replace(
`function buildSubtitle(module: ERPModule, record: Record<string, unknown>): string | undefined {
  const compositionSubtitle = getFieldValues(
    record,
    module.composition?.subtitleFields
  );

  if (compositionSubtitle.length > 0) {
    return compositionSubtitle.join(" · ");
  }

  const fallbackFields = [`,
`function buildSubtitle(module: ERPModule, record: Record<string, unknown>): string | undefined {
  const moduleWithOptionalSubtitle = module as ERPModule & {
    composition?: {
      subtitleFields?: string[];
    };
  };

  const compositionSubtitle = getFieldValues(
    record,
    moduleWithOptionalSubtitle.composition?.subtitleFields
  );

  if (compositionSubtitle.length > 0) {
    return compositionSubtitle.join(" · ");
  }

  const fallbackFields = [`
);

if (next === original) {
  throw new Error("Pattern not replaced in " + rel);
}

fs.writeFileSync(file, next, "utf8");

console.log("[DONE] Q2-I-B1 subtitleFields optional contract fixed.");
console.log("[WRITTEN]", rel);
console.log("");
console.log("Next:");
console.log("pnpm run build");

const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "lifecycle",
  "ERPRelationDataLoader.ts"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");

content = content.replace(
  `    return records.map((record) => ({
      id: String(record.id),
      label: ERPRelationDataLoader.getLabel(
        record as Record<string, unknown>
      ),
    }));`,
  `    return records.map((record) => ({
      id: String(record.id),
      label: ERPRelationDataLoader.getLabel(
        record as Record<string, unknown>
      ),
      record: record as Record<string, unknown>,
    }));`
);

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED src/runtime/modules/lifecycle/ERPRelationDataLoader.ts");
console.log("DONE patch relation loader return record");
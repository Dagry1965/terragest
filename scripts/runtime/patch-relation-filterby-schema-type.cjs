const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "schemas",
  "ERPModuleSchema.ts"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");
const before = content;

if (!content.includes("filterBy?:")) {
  content = content.replace(
    `      labelField?: string;`,
    `      labelField?: string;

      filterBy?: {
        sourceField: string;
        targetField: string;
        includeEmptyTarget?: boolean;
      };`
  );
}

if (content === before) {
  console.log("NO CHANGE");
  console.log("Inspect relation type:");
  console.log('Get-Content ".\\\\src\\\\runtime\\\\modules\\\\schemas\\\\ERPModuleSchema.ts" | Select-Object -Skip 110 -First 40');
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED src/runtime/modules/schemas/ERPModuleSchema.ts");
console.log("DONE patch relation filterBy schema type");
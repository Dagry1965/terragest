const fs = require("fs");
const path = require("path");

const root = process.cwd();

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) {
    return results;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, results);
    } else if (entry.isFile() && fullPath.endsWith(".ts")) {
      results.push(fullPath);
    }
  }

  return results;
}

const files = walk(path.join(root, "src", "runtime", "modules"));

let patched = 0;

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  const before = content;

  if (
    content.includes("labelField?: string") &&
    content.includes("create?:") &&
    !content.includes("filterBy?:")
  ) {
    content = content.replace(
      /labelField\?: string;\s*/g,
      `labelField?: string;
        filterBy?: {
          sourceField: string;
          targetField: string;
          includeEmptyTarget?: boolean;
        };
        `
    );
  }

  if (content !== before) {
    fs.writeFileSync(file, content, { encoding: "utf8" });
    console.log(`UPDATED ${path.relative(root, file)}`);
    patched++;
  }
}

if (patched === 0) {
  console.log("NO TYPE PATCH APPLIED");
  console.log("Run this to locate the relation type:");
  console.log('Get-ChildItem ".\\src\\runtime\\modules" -Recurse -File | Select-String "labelField\\?: string|create\\?:"');
  process.exit(0);
}

console.log("DONE patch relation filterBy type");
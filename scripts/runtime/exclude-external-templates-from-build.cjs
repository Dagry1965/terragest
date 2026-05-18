const fs = require("fs");
const path = require("path");

const root = process.cwd();

function read(filePath) {
  return fs.readFileSync(path.join(root, filePath), "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(path.join(root, filePath), content, "utf8");
  console.log("UPDATED", filePath);
}

const tsconfigPath = "tsconfig.json";
const gitignorePath = ".gitignore";

const tsconfig = JSON.parse(read(tsconfigPath));

const excludes = new Set(tsconfig.exclude ?? []);

[
  "node_modules",
  ".next",
  "out",
  "dist",
  "build",
  "coverage",
  "external-templates",
  "external-templates/**",
].forEach((item) => excludes.add(item));

tsconfig.exclude = Array.from(excludes);

write(
  tsconfigPath,
  JSON.stringify(tsconfig, null, 2) + "\n"
);

let gitignore = fs.existsSync(path.join(root, gitignorePath))
  ? read(gitignorePath)
  : "";

if (!gitignore.includes("external-templates/")) {
  gitignore += "\n# External UI references, not part of the app build\nexternal-templates/\n";
}

write(gitignorePath, gitignore);

console.log("OK: external-templates excluded from TypeScript/build and Git.");
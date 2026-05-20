const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function assertProjectRoot() {
  if (
    !fs.existsSync(path.join(ROOT, "package.json")) ||
    !fs.existsSync(path.join(ROOT, "src"))
  ) {
    throw new Error("Ce script doit être lancé depuis la racine du projet Terragest.");
  }
}

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
  console.log("[WRITTEN] " + path.relative(ROOT, filePath));
}

function replaceOnce(content, search, replacement, label) {
  if (!content.includes(search)) {
    throw new Error("Bloc introuvable : " + label);
  }

  return content.replace(search, replacement);
}

assertProjectRoot();

const targetPath = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "ERPModule.ts"
);

let content = readFile(targetPath);

if (!content.includes("allowOverride?: boolean;")) {
  content = replaceOnce(
    content,
    `  lockDerivedFields?: boolean;
}`,
    `  lockDerivedFields?: boolean;
  allowOverride?: boolean;
}`,
    "ERPCompositionRelation allowOverride"
  );
}

if (!content.includes("readOnlyFields?: string[];")) {
  content = replaceOnce(
    content,
    `  relations?: ERPCompositionRelation[];
  lockedFields?: string[];
  children?: ERPCompositionChild[];
}`,
    `  relations?: ERPCompositionRelation[];
  lockedFields?: string[];
  readOnlyFields?: string[];
  allowOverride?: string[];
  children?: ERPCompositionChild[];
}`,
    "ERPModuleComposition readOnlyFields allowOverride"
  );
}

writeFile(targetPath, content);

console.log("");
console.log("[OK] ERPModuleComposition enrichi avec readOnlyFields / allowOverride.");
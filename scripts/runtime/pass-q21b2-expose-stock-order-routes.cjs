const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const sourceModule = "stocksauto";
const targetModules = [
  "fournisseursauto",
  "commandesstockauto",
  "lignescommandestockauto",
  "receptionsstockauto",
];

const appPrivateRoot = path.join(ROOT, "src/app/(private)");
const sourceDir = path.join(appPrivateRoot, sourceModule);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return walk(full);
    }

    return [full];
  });
}

function copyModuleRoutes(targetModule) {
  const targetDir = path.join(appPrivateRoot, targetModule);

  if (!fs.existsSync(sourceDir)) {
    console.error(`[ERROR] Source route directory missing: ${sourceDir}`);
    process.exit(1);
  }

  if (fs.existsSync(targetDir)) {
    console.log(`[SKIP] Route already exists: src/app/(private)/${targetModule}`);
    return;
  }

  ensureDir(targetDir);

  const files = walk(sourceDir);

  for (const sourceFile of files) {
    const relative = path.relative(sourceDir, sourceFile);
    const targetFile = path.join(targetDir, relative);

    ensureDir(path.dirname(targetFile));

    let content = fs.readFileSync(sourceFile, "utf8");

    content = content
      .split(sourceModule)
      .join(targetModule)
      .split("Stocks")
      .join(targetModule)
      .split("stocks")
      .join(targetModule);

    fs.writeFileSync(targetFile, content, "utf8");

    console.log(
      `[WRITTEN] ${path.relative(ROOT, targetFile).replace(/\\/g, "/")}`
    );
  }
}

for (const targetModule of targetModules) {
  copyModuleRoutes(targetModule);
}

console.log("");
console.log("[Q21B2_DONE] Stock order routes exposed.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  Test:");
console.log("    /fournisseursauto");
console.log("    /commandesstockauto");
console.log("    /lignescommandestockauto");
console.log("    /receptionsstockauto");
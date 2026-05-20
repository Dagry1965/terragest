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
  return fs.readFileSync(filePath, "utf8");
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
  console.log("[WRITTEN] " + path.relative(ROOT, filePath));
}

assertProjectRoot();

const targetPath = path.join(
  ROOT,
  "src",
  "runtime",
  "business-rules",
  "runtimeBusinessRules.ts"
);

let content = readFile(targetPath);

const oldBlock = `      const createdInterventionId =
        typeof createdIntervention === "object" &&
        createdIntervention !== null
          ? String(
              createdIntervention.id ??
              createdIntervention._id ??
              ""
            )
          : "";`;

const newBlock = `      const createdInterventionId =
        typeof createdIntervention === "object" &&
        createdIntervention !== null
          ? String(
              createdIntervention.id ?? ""
            )
          : "";`;

if (!content.includes(oldBlock)) {
  throw new Error("Bloc createdInterventionId avec _id introuvable.");
}

content = content.replace(oldBlock, newBlock);

writeFile(targetPath, content);

console.log("");
console.log("[OK] TypeScript fix appliqué : suppression de createdIntervention._id.");
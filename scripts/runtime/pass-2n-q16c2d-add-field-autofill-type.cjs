/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, results);
      continue;
    }

    if (entry.isFile() && fullPath.endsWith(".ts")) {
      results.push(fullPath);
    }
  }

  return results;
}

function backup(file, suffix) {
  const target = `${file}.bak-${suffix}`;

  if (!fs.existsSync(target)) {
    fs.copyFileSync(file, target);
    console.log(`[BACKUP] ${path.relative(root, target)}`);
  }
}

function findERPModuleFieldFile() {
  const files = walk(path.join(root, "src", "runtime", "modules"));

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");

    if (
      content.includes("interface ERPModuleField") ||
      content.includes("export interface ERPModuleField")
    ) {
      return file;
    }
  }

  throw new Error("Interface ERPModuleField introuvable dans src/runtime/modules");
}

function patchFile(file) {
  backup(file, "q16c2d-field-autofill-type");

  let content = fs.readFileSync(file, "utf8");

  if (!content.includes("RuntimeRelationAutoFillConfig")) {
    const interfaceIndex =
      content.indexOf("export interface ERPModuleField") >= 0
        ? content.indexOf("export interface ERPModuleField")
        : content.indexOf("interface ERPModuleField");

    if (interfaceIndex < 0) {
      throw new Error("ERPModuleField trouvé mais position interface introuvable");
    }

    const typeBlock = `export interface RuntimeRelationAutoFillConfig {
  map?: Record<string, string | string[]>;
  recalculate?: boolean;
}

`;

    content =
      content.slice(0, interfaceIndex) +
      typeBlock +
      content.slice(interfaceIndex);
  }

  if (!content.includes("autoFill?: RuntimeRelationAutoFillConfig")) {
    const match =
      content.match(/(export\s+)?interface\s+ERPModuleField\s*\{/);

    if (!match || match.index === undefined) {
      throw new Error("Début interface ERPModuleField introuvable");
    }

    const insertAt =
      match.index + match[0].length;

    content =
      content.slice(0, insertAt) +
      `\n  autoFill?: RuntimeRelationAutoFillConfig;` +
      content.slice(insertAt);
  }

  fs.writeFileSync(file, content, "utf8");

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function main() {
  console.log("");
  console.log("[PASS] 2N-Q16C2D - Add autoFill type to ERPModuleField");

  const file = findERPModuleFieldFile();

  console.log(`[FOUND] ${path.relative(root, file)}`);

  patchFile(file);

  console.log("");
  console.log("[Q16C2D_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
}

main();
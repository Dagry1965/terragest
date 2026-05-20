function ensureImport(content) {
  if (content.includes("@/runtime/scheduling/RuntimeSchedulingEngine")) {
    return content;
  }

  const importRegex =
    /import\s*\{\s*coreERPModules\s*\}\s*from\s*["']@\/runtime\/modules\/definitions\/coreModules["'];/m;

  const match = content.match(importRegex);

  if (!match) {
    throw new Error("Import coreERPModules introuvable.");
  }

  const schedulingImport = [
    "",
    "import {",
    "  RuntimeSchedulingEngine,",
    "}",
    "from \"@/runtime/scheduling/RuntimeSchedulingEngine\";",
  ].join("\n");

  return content.replace(
    match[0],
    match[0] + schedulingImport
  );
}
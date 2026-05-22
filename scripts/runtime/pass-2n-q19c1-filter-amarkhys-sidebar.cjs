const fs = require("fs");
const path = require("path");

const root = process.cwd();

function file(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(file(relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(file(relativePath), content, {
    encoding: "utf8",
  });

  console.log(`[WRITTEN] ${relativePath}`);
}

function backup(relativePath, suffix) {
  const source = file(relativePath);
  const target = file(`${relativePath}.bak-${suffix}`);

  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log(`[BACKUP] ${relativePath}.bak-${suffix}`);
  } else {
    console.log(`[BACKUP_EXISTS] ${relativePath}.bak-${suffix}`);
  }
}

function replaceRegexRequired(content, regex, replacement, label) {
  if (!regex.test(content)) {
    throw new Error(`Pattern not found: ${label}`);
  }

  return content.replace(regex, replacement);
}

const target = "src/components/erp/shell/ErpSidebar.tsx";
const suffix = "q19c1-filter-amarkhys-sidebar";

backup(target, suffix);

let content = read(target);

content = content
  .replaceAll("VÃ©hicules", "Véhicules")
  .replaceAll("accÃ¨s Ã ", "accès à")
  .replaceAll("accÃ¨s Ã ", "accès à")
  .replaceAll("accÃ¨s", "accès");

content = replaceRegexRequired(
  content,
  /function\s+getSidebarNavigation\s*\(\s*pathname:\s*string\s*\):\s*SidebarWorkspace\[\]\s*\{[\s\S]*?return\s+getERPWorkspacesNavigation\(\);\s*\}/m,
  `function getSidebarNavigation(
  pathname: string
): SidebarWorkspace[] {
  if (isAmarkhysPath(pathname)) {
    if (
      !ERPSessionRuntime.canAccessWorkspace(
        "amarkhys"
      )
    ) {
      return [];
    }

    return [
      {
        ...amarkhysWorkspace,
        modules:
          amarkhysWorkspace.modules.filter(
            (module) =>
              ERPSessionRuntime.canAccessModule(
                module.key
              )
          ),
      },
    ];
  }

  return getERPWorkspacesNavigation();
}`,
  "getSidebarNavigation"
);

write(target, content);

console.log("");
console.log("[Q19C1_DONE] AMARKHYS sidebar now respects runtime session access.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  Tester demo@amarkhys.com sidebar");
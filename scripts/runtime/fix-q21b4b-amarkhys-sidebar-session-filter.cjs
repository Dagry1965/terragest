const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/shell/ErpSidebar.tsx";
const file = path.join(ROOT, rel);
const backup = path.join(
  ROOT,
  `${rel}.bak-q21b4b-amarkhys-sidebar-session-filter`
);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21b4b-amarkhys-sidebar-session-filter`);
}

let content = fs.readFileSync(file, "utf8");

const oldBlock = `    return [
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
    ];`;

const newBlock = `    return [
      {
        ...amarkhysWorkspace,
        // Q21B4B_AMARKHYS_NAVIGATION_VISIBILITY
        // AMARKHYS has its own hardcoded garage navigation for now.
        // Module activation / deactivation will be centralized later.
        // Here, workspace access is enough to show the garage menu.
        modules: amarkhysWorkspace.modules,
      },
    ];`;

if (!content.includes(oldBlock)) {
  console.error("[ERROR] Could not locate AMARKHYS module filter block.");
  console.error("Inspect:");
  console.error('Select-String -Path ".\\\\src\\\\components\\\\erp\\\\shell\\\\ErpSidebar.tsx" -Pattern "amarkhysWorkspace.modules.filter|canAccessModule" -Context 4,10');
  process.exit(1);
}

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] AMARKHYS sidebar no longer hides declared garage modules.");
console.log("Next: pnpm build, restart pnpm dev.");
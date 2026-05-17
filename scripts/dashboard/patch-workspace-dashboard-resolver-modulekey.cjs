
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const target = path.join(
  ROOT,
  "src/runtime/workspaces/ERPWorkspaceDashboardResolver.ts"
);

if (!fs.existsSync(target)) {
  throw new Error(`File not found: ${target}`);
}

const content = fs.readFileSync(target, "utf8");
const lines = content.split(/\r?\n/);

const index = lines.findIndex((line, i) =>
  line.includes("workspaceModuleKeys.includes") &&
  lines[i + 1]?.includes("widget.moduleKey")
);

if (index === -1) {
  console.log("Occurrences trouvées :");
  lines.forEach((line, i) => {
    if (
      line.includes("workspaceModuleKeys.includes") ||
      line.includes("widget.moduleKey") ||
      line.includes("filter")
    ) {
      console.log(`${String(i + 1).padStart(4)}: ${line}`);
    }
  });

  throw new Error("Bloc workspaceModuleKeys.includes(widget.moduleKey) introuvable.");
}

// Insère la garde avant workspaceModuleKeys.includes(...)
const previousLine = lines[index - 1] ?? "";

if (!previousLine.includes("!widget.moduleKey")) {
  lines.splice(
    index,
    0,
    "        !widget.moduleKey ||"
  );
}

const nextContent = lines.join("\n");

fs.writeFileSync(target, nextContent, "utf8");

console.log("OK ERPWorkspaceDashboardResolver corrigé.");
console.log("");

const updatedLines = nextContent.split(/\r?\n/);
for (let i = 20; i <= 34; i++) {
  console.log(`${String(i).padStart(4)}: ${updatedLines[i - 1] ?? ""}`);
}
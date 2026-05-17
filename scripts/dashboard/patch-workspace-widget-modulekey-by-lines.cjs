const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const target = path.join(
  ROOT,
  "src/runtime/workspaces/ERPWorkspaceContextResolver.ts"
);

if (!fs.existsSync(target)) {
  throw new Error(`File not found: ${target}`);
}

const content = fs.readFileSync(target, "utf8");
const lines = content.split(/\r?\n/);

const index = lines.findIndex((line, i) =>
  line.includes("ERPSessionRuntime.canAccessModule") &&
  lines[i + 1]?.includes("widget.moduleKey")
);

if (index === -1) {
  console.log("Occurrences trouvées :");
  lines.forEach((line, i) => {
    if (
      line.includes("canAccessModule") ||
      line.includes("widget.moduleKey") ||
      line.includes("].filter")
    ) {
      console.log(`${String(i + 1).padStart(4)}: ${line}`);
    }
  });

  throw new Error("Bloc canAccessModule(widget.moduleKey) introuvable.");
}

// On insère la garde juste avant ERPSessionRuntime.canAccessModule(...)
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

console.log("OK ERPWorkspaceContextResolver corrigé.");
console.log("");

const updatedLines = nextContent.split(/\r?\n/);
for (let i = 60; i <= 72; i++) {
  console.log(`${String(i).padStart(4)}: ${updatedLines[i - 1] ?? ""}`);
}
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

let content = fs.readFileSync(target, "utf8");
const original = content;

const oldBlock = `    ].filter(
      (widget) =>
        ERPSessionRuntime.canAccessModule(
          widget.moduleKey
        )
    );`;

const newBlock = `    ].filter(
      (widget) =>
        !widget.moduleKey ||
        ERPSessionRuntime.canAccessModule(
          widget.moduleKey
        )
    );`;

if (!content.includes(oldBlock)) {
  throw new Error("Bloc exact non trouvé dans ERPWorkspaceContextResolver.ts");
}

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(target, content, "utf8");

console.log("OK ERPWorkspaceContextResolver corrigé.");S
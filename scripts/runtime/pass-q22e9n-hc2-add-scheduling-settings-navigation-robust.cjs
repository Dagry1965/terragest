const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const TARGET = "src/runtime/navigation/ERPNavigationEngine.ts";
const targetPath = path.join(ROOT, TARGET);

if (!fs.existsSync(targetPath)) {
  throw new Error(`Fichier introuvable: ${TARGET}`);
}

const backupPath = `${targetPath}.bak-q22e9n-hc2-scheduling-settings-navigation`;
fs.copyFileSync(targetPath, backupPath);

let content = fs.readFileSync(targetPath, "utf8");

if (content.includes('key: "settings-scheduling"')) {
  throw new Error("La navigation settings scheduling existe déjà.");
}

const functionPattern =
  /export function getERPWorkspacesNavigation\(\) \{[\s\S]*?\n\}/m;

if (!functionPattern.test(content)) {
  throw new Error("Fonction getERPWorkspacesNavigation introuvable.");
}

const replacement = `export function getERPWorkspacesNavigation() {
  const workspaceNavigation = ERPWorkspaceRegistry
    .filter((workspace) =>
      ERPSessionRuntime.canAccessWorkspace(
        workspace.key
      )
    )
    .map((workspace) => ({
      key: workspace.key,
      label: workspace.label,
      href: \`/workspaces/\${workspace.key}\`,
      defaultHref: workspace.defaultHref,
      modules: workspace.modules
        .filter((module) =>
          ERPSessionRuntime.canAccessModule(
            module.key
          )
        )
        .map((module) => ({
          key: module.key,
          label: module.label,
          href: \`/\${module.key}\`,
        })),
      quickActions: workspace.quickActions,
    }));

  return [
    ...workspaceNavigation,
    {
      key: "settings",
      label: "Paramètres ERP",
      href: "/settings",
      defaultHref: "/settings/scheduling",
      modules: [
        {
          key: "settings-scheduling",
          label: "Planning",
          href: "/settings/scheduling",
        },
      ],
      quickActions: [],
    },
  ];
}`;

content = content.replace(functionPattern, replacement);

if (!content.includes('href: "/settings/scheduling"')) {
  throw new Error("Le lien /settings/scheduling n'a pas été inséré.");
}

fs.writeFileSync(targetPath, content, "utf8");

console.log("");
console.log("[Q22E-9N-H-C2] DONE");
console.log(`[BACKUP] ${path.relative(ROOT, backupPath).replace(/\\/g, "/")}`);
console.log(`[UPDATED] ${TARGET}`);
console.log("");
console.log("Next:");
console.log("pnpm build");
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function writeFile(filePath, content) {
  const absolutePath = path.join(root, filePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, content, "utf8");
  console.log("WRITTEN", filePath);
}

writeFile(
  "src/components/erp/theme/ERPWorkspaceThemeSurface.tsx",
`import type {
  PropsWithChildren,
} from "react";

import {
  getWorkspaceThemeStyle,
} from "@/runtime/theme";

interface ERPWorkspaceThemeSurfaceProps extends PropsWithChildren {
  themeKey?: string | null;
  className?: string;
}

export function ERPWorkspaceThemeSurface({
  themeKey,
  className = "",
  children,
}: ERPWorkspaceThemeSurfaceProps) {
  return (
    <div
      style={getWorkspaceThemeStyle(themeKey)}
      className={className}
      data-erp-workspace-theme={themeKey ?? "default-enterprise"}
    >
      {children}
    </div>
  );
}
`
);

writeFile(
  "src/components/erp/theme/index.ts",
`export * from "./ERPWorkspaceThemeSurface";
`
);

console.log("PASS 2N-O2 base OK: theme surface component created.");
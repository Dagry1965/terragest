import type {
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

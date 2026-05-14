"use client";

import type { PropsWithChildren } from "react";
import Link from "next/link";
import { ERPTheme } from "../ui";
import { getERPWorkspacesNavigation } from "@/runtime/navigation/ERPNavigationEngine";

interface ERPAppShellProps extends PropsWithChildren {
  activeModule?: string;
}

export function ERPAppShell({
  children,
  activeModule,
}: ERPAppShellProps) {

  // 🔥 Navigation dynamique basée sur les workspaces + modules
  const navigation = getERPWorkspacesNavigation();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        minHeight: "100vh",
        background: ERPTheme.colors.background,
      }}
    >
      <aside
        style={{
          background: ERPTheme.colors.surface,
          padding: ERPTheme.spacing.lg,
          borderRight: `1px solid ${ERPTheme.colors.card}`,
        }}
      >
        <div
          style={{
            marginBottom: ERPTheme.spacing.xl,
          }}
        >
          <h1
            style={{
              color: ERPTheme.colors.text,
              fontSize: "22px",
              fontWeight: 800,
            }}
          >
            Terragest ERP
          </h1>
        </div>

        {/* 🔥 Nouveau menu dynamique */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ERPTheme.spacing.sm,
          }}
        >
          {navigation.map((workspace) => (
            <div key={workspace.key}>
              {/* Workspace */}
              <Link
                href={workspace.href}
                style={{
                  display: "block",
                  color: ERPTheme.colors.text,
                  textDecoration: "none",
                  padding: ERPTheme.spacing.sm,
                  borderRadius: ERPTheme.radius.md,
                  fontWeight: 800,
                  background:
                    activeModule === workspace.key
                      ? ERPTheme.colors.card
                      : "transparent",
                }}
              >
                {workspace.label}
              </Link>

              {/* Modules du workspace */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ERPTheme.spacing.sm,
                  marginLeft: ERPTheme.spacing.md,
                  marginTop: ERPTheme.spacing.sm,
                  marginBottom: ERPTheme.spacing.md,
                }}
              >
                {workspace.modules.map((module) => {
                  const isActive = activeModule === module.key;

                  return (
                    <Link
                      key={module.key}
                      href={module.href}
                      style={{
                        color: ERPTheme.colors.text,
                        textDecoration: "none",
                        padding: ERPTheme.spacing.sm,
                        borderRadius: ERPTheme.radius.md,
                        background: isActive
                          ? ERPTheme.colors.card
                          : "transparent",
                        opacity: 0.85,
                      }}
                    >
                      {module.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <main
        style={{
          padding: ERPTheme.spacing.xl,
        }}
      >
        {children}
      </main>
    </div>
  );
}

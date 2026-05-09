"use client";

import type { PropsWithChildren } from "react";
import Link from "next/link";
import { ERPTheme } from "../ui";

const navigation = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Terrains", href: "/terrains" },
  { label: "Exploitations", href: "/exploitations" },
  { label: "Stocks", href: "/stocks" },
  { label: "Matériels", href: "/materiels" },
  { label: "Maintenance", href: "/maintenance" },
  { label: "Paiements", href: "/paiements" },
  { label: "Supervision", href: "/supervision" },
];

interface ERPAppShellProps extends PropsWithChildren {
  activeModule?: string;
}

export function ERPAppShell({
  children,
  activeModule,
}: ERPAppShellProps) {
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

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ERPTheme.spacing.sm,
          }}
        >
          {navigation.map((item) => {
            const isActive =
              activeModule &&
              item.href.includes(activeModule);

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: ERPTheme.colors.text,
                  textDecoration: "none",
                  padding: ERPTheme.spacing.sm,
                  borderRadius: ERPTheme.radius.md,
                  background: isActive
                    ? ERPTheme.colors.card
                    : "transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
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

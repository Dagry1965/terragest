"use client";

import type {
  PropsWithChildren,
  ReactNode,
} from "react";

import {
  ERPAppShell,
} from "./ERPAppShell";

import {
  ERPTopBar,
} from "./ERPTopBar";

import {
  ERPPageHero,
} from "./ERPPageHero";

import {
  ERPContentArea,
} from "./ERPContentArea";

interface ERPDashboardLayoutProps
  extends PropsWithChildren {

  title: string;

  description?: string;

  activeModule?: string;

  actions?: ReactNode;
}

export function ERPDashboardLayout({
  title,
  description,
  activeModule,
  actions,
  children,
}: ERPDashboardLayoutProps) {

  return (

    <ERPAppShell
      activeModule={activeModule}
    >

      <ERPTopBar
        title={title}
      />

      <ERPPageHero
        title={title}
        description={description}
        side={actions}
      />

      <ERPContentArea>
        {children}
      </ERPContentArea>

    </ERPAppShell>
  );
}
"use client";

import type {
  PropsWithChildren,
  ReactNode,
} from "react";

import {
  ERPPanel,
} from "../ui";

interface ERPDashboardPanelProps
  extends PropsWithChildren {

  title: string;

  description?: string;

  actions?: ReactNode;
}

export function ERPDashboardPanel({
  title,
  description,
  actions,
  children,
}: ERPDashboardPanelProps) {

  return (

    <ERPPanel
      title={title}
      description={description}
      actions={actions}
    >
      {children}
    </ERPPanel>
  );
}
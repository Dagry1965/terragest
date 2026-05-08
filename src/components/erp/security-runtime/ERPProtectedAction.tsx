"use client";

import type { ReactNode } from "react";
import type { ERPAction } from "@/runtime/actions";
import { RuntimeActionGuard } from "@/runtime/security-runtime";

interface ERPProtectedActionProps {
  action: ERPAction;
  children: ReactNode;
}

export function ERPProtectedAction({
  action,
  children,
}: ERPProtectedActionProps) {
  if (!RuntimeActionGuard.canExecute(action)) {
    return null;
  }

  return <>{children}</>;
}
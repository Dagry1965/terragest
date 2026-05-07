"use client";

import {
  RuntimePermissionsEngine,
}
from "@/runtime/permissions/RuntimePermissionsEngine";

interface Props {

  role: string;

  module: string;

  action: string;

  children:
    React.ReactNode;
}

export function ERPProtectedAction({

  role,

  module,

  action,

  children,

}: Props) {

  const allowed =
    RuntimePermissionsEngine.can(

      role,

      module,

      action,
    );

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}

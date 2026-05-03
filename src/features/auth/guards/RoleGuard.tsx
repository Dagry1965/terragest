"use client";

import { ReactNode }
from "react";

import { UserRole }
from "@/features/auth/types/UserRole";

import { usePermissions }
from "@/features/auth/hooks/usePermissions";

type Props = {
  role?: UserRole;

  permission:
    keyof ReturnType<
      typeof usePermissions
    >;

  children: ReactNode;
};

export const RoleGuard = ({
  role = "admin",
  permission,
  children,
}: Props) => {

  const permissions =
    usePermissions(role);

  if (!permissions[permission]) {

    return null;
  }

  return <>{children}</>;
};
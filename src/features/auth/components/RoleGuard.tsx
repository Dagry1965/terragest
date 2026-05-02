import { ReactNode } from "react";

import { usePermission } from "@/features/auth/hooks/usePermission";

interface RoleGuardProps {

  role: string | undefined;

  permission: any;

  children: ReactNode;
}

export const RoleGuard = ({
  role,
  permission,
  children,
}: RoleGuardProps) => {

  const allowed =
    usePermission(
      role,
      permission
    );

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}

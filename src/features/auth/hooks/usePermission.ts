import { Permissions } from "@/features/auth/types/Permissions";

export const usePermission = (
  role: string | undefined,
  permission: keyof typeof Permissions
) => {

  if (!role) {
    return false;
  }

  return Permissions[
    permission
  ].includes(role as any);
}

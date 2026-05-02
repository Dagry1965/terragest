Write-Host "Generating Terragest Roles & Permissions..." -ForegroundColor Cyan

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\features\auth" -Force
mkdir "src\features\auth\types" -Force
mkdir "src\features\auth\hooks" -Force
mkdir "src\features\auth\components" -Force

# =====================================================
# ROLE ENUM
# =====================================================

$roleEnum = @'
export enum UserRole {

  ADMIN = "ADMIN",

  SUPERVISEUR = "SUPERVISEUR",

  GESTIONNAIRE = "GESTIONNAIRE",

  OPERATEUR = "OPERATEUR",

  LECTURE = "LECTURE",
}
'@

Set-Content `
"src\features\auth\types\UserRole.ts" `
$roleEnum

# =====================================================
# PERMISSION MATRIX
# =====================================================

$permissionMatrix = @'
import { UserRole } from "@/features/auth/types/UserRole";

export const Permissions = {

  CAN_CREATE: [
    UserRole.ADMIN,
    UserRole.SUPERVISEUR,
    UserRole.GESTIONNAIRE,
    UserRole.OPERATEUR,
  ],

  CAN_UPDATE: [
    UserRole.ADMIN,
    UserRole.SUPERVISEUR,
    UserRole.GESTIONNAIRE,
    UserRole.OPERATEUR,
  ],

  CAN_DELETE: [
    UserRole.ADMIN,
    UserRole.SUPERVISEUR,
  ],

  CAN_VALIDATE: [
    UserRole.ADMIN,
    UserRole.SUPERVISEUR,
  ],

  CAN_REJECT: [
    UserRole.ADMIN,
    UserRole.SUPERVISEUR,
  ],

  CAN_VIEW: [
    UserRole.ADMIN,
    UserRole.SUPERVISEUR,
    UserRole.GESTIONNAIRE,
    UserRole.OPERATEUR,
    UserRole.LECTURE,
  ],
};
'@

Set-Content `
"src\features\auth\types\Permissions.ts" `
$permissionMatrix

# =====================================================
# USE PERMISSION HOOK
# =====================================================

$usePermission = @'
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
'@

Set-Content `
"src\features\auth\hooks\usePermission.ts" `
$usePermission

# =====================================================
# ROLE BADGE COMPONENT
# =====================================================

$roleBadge = @'
import { UserRole } from "@/features/auth/types/UserRole";

interface RoleBadgeProps {

  role: string;
}

export const RoleBadge = ({
  role,
}: RoleBadgeProps) => {

  const getClassName = () => {

    switch (role) {

      case UserRole.ADMIN:
        return "bg-red-100 text-red-700";

      case UserRole.SUPERVISEUR:
        return "bg-blue-100 text-blue-700";

      case UserRole.GESTIONNAIRE:
        return "bg-green-100 text-green-700";

      case UserRole.OPERATEUR:
        return "bg-yellow-100 text-yellow-700";

      case UserRole.LECTURE:
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (

    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${getClassName()}
      `}
    >
      {role}
    </span>
  );
}
'@

Set-Content `
"src\features\auth\components\RoleBadge.tsx" `
$roleBadge

# =====================================================
# ROLE GUARD COMPONENT
# =====================================================

$roleGuard = @'
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
'@

Set-Content `
"src\features\auth\components\RoleGuard.tsx" `
$roleGuard

# =====================================================
# UPDATE USER TYPE
# =====================================================

$userType = @'
import { UserRole } from "@/features/auth/types/UserRole";

export interface Utilisateur {

  id: string;

  organisationId: string;

  nom: string;

  email: string;

  role: UserRole;

  createdAt: string;
}
'@

Set-Content `
"src\types\Utilisateur.ts" `
$userType

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Roles & Permissions generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- UserRole"
Write-Host "- Permissions matrix"
Write-Host "- usePermission"
Write-Host "- RoleGuard"
Write-Host "- RoleBadge"
Write-Host "- ERP governance foundation"
Write-Host ""
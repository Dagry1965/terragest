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

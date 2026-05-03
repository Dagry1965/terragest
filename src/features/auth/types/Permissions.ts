import { UserRole }
from "@/features/auth/types/UserRole";

export const Permissions = {

  CAN_CREATE: [
    "admin",
    "manager",
    "agent",
  ] satisfies UserRole[],

  CAN_UPDATE: [
    "admin",
    "manager",
    "agent",
  ] satisfies UserRole[],

  CAN_DELETE: [
    "admin",
    "manager",
  ] satisfies UserRole[],

  CAN_VALIDATE: [
    "admin",
    "manager",
  ] satisfies UserRole[],

  CAN_REJECT: [
    "admin",
    "manager",
  ] satisfies UserRole[],

  CAN_VIEW: [
    "admin",
    "manager",
    "agent",
    "viewer",
  ] satisfies UserRole[],
};
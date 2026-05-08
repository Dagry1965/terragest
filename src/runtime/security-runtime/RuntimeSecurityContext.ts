import type { RuntimeUser } from "./RuntimeRole";

export class RuntimeSecurityContext {
  static currentUser(): RuntimeUser {
    return {
      id: "user-admin",
      name: "Administrateur ERP",
      role: "admin",
    };
  }
}
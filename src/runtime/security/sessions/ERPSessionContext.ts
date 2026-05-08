import type { ERPSecuritySession } from "./ERPSecuritySession";

let currentSession: ERPSecuritySession = {
  userId: "admin",
  displayName: "Admin ERP",
  role: "super_admin",
  tenantId: "default",
};

export const ERPSessionContext = {
  current() {
    return currentSession;
  },

  set(session: ERPSecuritySession) {
    currentSession = session;
  },
};
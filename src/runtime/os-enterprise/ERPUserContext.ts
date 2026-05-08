export interface ERPUserContext {
  userName: string;
  role: string;
  workspaceMode: "operations" | "direction" | "audit";
}

export class ERPUserContextProvider {
  static current(): ERPUserContext {
    return {
      userName: "Utilisateur ERP",
      role: "Administrateur",
      workspaceMode: "operations",
    };
  }
}
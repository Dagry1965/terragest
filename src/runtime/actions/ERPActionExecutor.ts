"use client";

import { toast } from "react-hot-toast";
import type { ERPAction } from "./ERPAction";

export class ERPActionExecutor {
  static execute(action: ERPAction) {
    switch (action.key) {
      case "export":
        toast.success("Export ERP lancÃ©");
        break;

      case "import":
        toast.success("Import ERP initialisÃ©");
        break;

      case "workflow":
        toast.success("Ouverture du workflow");
        break;

      case "audit":
        toast.success("Consultation audit");
        break;

      case "relations":
        toast.success("Chargement des relations");
        break;

      case "permissions":
        toast.success("Chargement des permissions");
        break;

      default:
        toast(action.label);
        break;
    }
  }
}
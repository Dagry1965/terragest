import type { ERPAction } from "@/runtime/actions";
import type { RuntimePermission } from "./RuntimePermission";

export class RuntimeActionPermissionMapper {
  static permissionFor(action: ERPAction): RuntimePermission | undefined {
    switch (action.key) {
      case "create":
        return "module.create";

      case "edit":
        return "module.update";

      case "delete":
        return "module.delete";

      case "export":
        return "module.export";

      case "import":
        return "module.import";

      case "workflow":
        return "workflow.start";

      case "audit":
        return "audit.read";

      case "relations":
        return "relations.read";

      case "details":
        return "module.read";

      default:
        return undefined;
    }
  }
}
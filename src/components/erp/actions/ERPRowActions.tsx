import type { ERPModule } from "@/runtime/modules";
import { ERPActionRegistry } from "@/runtime/actions";
import { RuntimeActionGuard } from "@/runtime/security-runtime";
import { ERPActionButton } from "./ERPActionButton";

interface ERPRowActionsProps {
  module: ERPModule;
  id?: string;
}

export function ERPRowActions({
  module,
  id,
}: ERPRowActionsProps) {
  const actions =
    RuntimeActionGuard.filter(
      ERPActionRegistry.forRow(module, id)
    );

  return (
    <div className="flex justify-end gap-2">
      {actions.map((action) => (
        <ERPActionButton
          key={action.key}
          action={action}
        />
      ))}
    </div>
  );
}
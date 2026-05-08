import type { ERPAction } from "@/runtime/actions";
import { RuntimeActionGuard } from "@/runtime/security-runtime";
import { ERPActionButton } from "./ERPActionButton";

interface ERPActionToolbarProps {
  actions: ERPAction[];
}

export function ERPActionToolbar({
  actions,
}: ERPActionToolbarProps) {
  const allowedActions = RuntimeActionGuard.filter(actions);

  return (
    <div className="flex flex-wrap gap-3">
      {allowedActions.map((action) => (
        <ERPActionButton
          key={action.key}
          action={action}
        />
      ))}
    </div>
  );
}
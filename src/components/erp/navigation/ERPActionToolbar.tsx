import type { ERPAction } from "@/runtime/actions";
import { ERPActionButton } from "./ERPActionButton";

interface ERPActionToolbarProps {
  actions: ERPAction[];
}

export function ERPActionToolbar({ actions }: ERPActionToolbarProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <ERPActionButton key={action.key} action={action} />
      ))}
    </div>
  );
}
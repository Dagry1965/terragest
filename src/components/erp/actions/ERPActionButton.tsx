"use client";

import Link from "next/link";
import { ERPButton } from "@/components/erp/ui";
import type { ERPAction } from "@/runtime/actions";
import { ERPActionExecutor } from "@/runtime/actions/ERPActionExecutor";

interface ERPActionButtonProps {
  action: ERPAction;
}

export function ERPActionButton({
  action,
}: ERPActionButtonProps) {

  if (action.href) {
    return (
      <Link href={action.href}>
        <ERPButton
          variant={action.variant}
          type="button"
        >
          {action.label}
        </ERPButton>
      </Link>
    );
  }

  return (
    <ERPButton
      variant={action.variant}
      type="button"
      disabled={action.disabled}
      onClick={() => ERPActionExecutor.execute(action)}
    >
      {action.label}
    </ERPButton>
  );
}
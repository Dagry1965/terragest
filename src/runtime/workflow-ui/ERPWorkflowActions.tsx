"use client";

import {
  WorkflowRuntimeEngine,
}
from "@/runtime/workflow-ui/WorkflowRuntimeEngine";

interface Props {

  module: string;

  state: string;

  role?: string;

  onAction?: (
    action: string,
    targetState: string
  ) => void;
}

export function ERPWorkflowActions({

  module,

  state,

  role,

  onAction,

}: Props) {

  const actions =
    WorkflowRuntimeEngine
      .getAvailableActions(

        module,

        state,

        role,
      );

  if (
    actions.length === 0
  ) {

    return null;
  }

  return (

    <div
      className="
        flex
        flex-wrap
        gap-3
      "
    >

      {actions.map(
        (action) => (

        <button
          key={
            action.action
          }

          onClick={() =>
            onAction?.(
              action.action,
              action.to
            )
          }

          className="
            rounded-xl
            bg-blue-600
            px-4
            py-2
            text-white
          "
        >
          {action.action}
        </button>
      ))}

    </div>
  );
}

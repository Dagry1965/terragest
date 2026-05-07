"use client";

import {
  RuntimeStateEngine,
}
from "@/runtime/state/RuntimeStateEngine";

interface Props {

  module: string;

  state: string;
}

export function ERPStateBadge({

  module,

  state,

}: Props) {

  const stateDefinition =
    RuntimeStateEngine
      .getState(
        module,
        state
      );

  if (!stateDefinition) {

    return (
      <span>
        {state}
      </span>
    );
  }

  return (

    <span
      className="
        rounded-full
        bg-slate-100
        px-3
        py-1
        text-xs
      "
    >
      {
        stateDefinition.label
      }
    </span>
  );
}

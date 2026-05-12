"use client";

import { useMemo, useState }
from "react";

import {
  RuntimeTableEngine,
}
from "../engine/RuntimeTableEngine";

import {
  defaultRuntimeTableState,
}
from "../state/RuntimeTableState";

export function useRuntimeTable<
  T extends Record<string, any>
>(
  rows: T[]
) {

  const [state, setState] =
    useState(defaultRuntimeTableState);

  const result = useMemo(() => {

    return RuntimeTableEngine.process(
      rows,
      state
    );

  }, [rows, state]);

  return {
    state,
    setState,
    rows: result.rows,
    total: result.total,
  };
}
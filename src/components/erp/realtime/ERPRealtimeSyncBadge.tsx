"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ERPBadge,
} from "@/components/erp/ui";

import type {
  ERPModule,
} from "@/runtime/modules";

import {
  FirestoreRuntimeRealtime,
} from "@/runtime/firestore";

interface ERPRealtimeSyncBadgeProps {
  module: ERPModule;
}

export function ERPRealtimeSyncBadge({
  module,
}: ERPRealtimeSyncBadgeProps) {

  const [count, setCount] =
    useState<number>(0);

  useEffect(() => {

    const unsubscribe =
      FirestoreRuntimeRealtime.subscribe(
        module,
        (value) => {
          setCount(value);
        }
      );

    return () => {
      unsubscribe();
    };

  }, [module]);

  return (
    <ERPBadge tone="success">
      Live {count}
    </ERPBadge>
  );
}
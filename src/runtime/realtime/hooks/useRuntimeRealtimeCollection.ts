"use client";

import { useEffect, useState } from "react";

import type { ERPModule } from "@/runtime/modules";
import {
  RuntimeRealtimeEngine,
  type RuntimeRealtimePayload,
} from "@/runtime/realtime/engine/RuntimeRealtimeEngine";

export function useRuntimeRealtimeCollection(
  module?: ERPModule
) {
  const [payload, setPayload] =
    useState<RuntimeRealtimePayload>({
      count: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!module) {
      setPayload({
        count: 0,
      });
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe =
      RuntimeRealtimeEngine.subscribe(
        module,
        (nextPayload) => {
          setPayload(nextPayload);
          setLoading(false);
        }
      );

    return () => {
      unsubscribe();
    };
  }, [module]);

  return {
    payload,
    count: payload.count,
    loading,
  };
}
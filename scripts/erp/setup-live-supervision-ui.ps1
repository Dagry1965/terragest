Write-Host "=== TERRAGEST_V2 - SETUP ERP LIVE SUPERVISION UI ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/hooks/runtime" | Out-Null

@'
"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  subscribeRuntimeChannel,
} from "@/core/realtime/runtime-realtime-channel";

export function useRuntimeChannel(
  channel: string
) {
  const [events, setEvents] =
    useState<any[]>([]);

  useEffect(() => {
    const unsubscribe =
      subscribeRuntimeChannel(
        channel,
        (payload) => {
          setEvents(
            (previous) => [
              payload,
              ...previous,
            ]
          );
        }
      );

    return () => {
      unsubscribe();
    };
  }, [channel]);

  return events;
}
'@ | Set-Content "src/hooks/runtime/useRuntimeChannel.ts"

Write-Host "=== ERP LIVE SUPERVISION UI créée avec succès ===" -ForegroundColor Green
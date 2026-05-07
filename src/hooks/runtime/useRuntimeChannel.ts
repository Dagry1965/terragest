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

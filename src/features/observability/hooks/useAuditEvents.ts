"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  AuditEvent,
} from "@/features/observability/types/AuditEvent";

import { AuditService }
from "@/features/observability/services/AuditService";

export function useAuditEvents() {

  const [
    events,
    setEvents,
  ] = useState<
    AuditEvent[]
  >([]);

  useEffect(() => {

    async function load() {

      const data =
        await AuditService
          .getEvents();

      setEvents(data);
    }

    load();

  }, []);

  return {
    events,
  };
}
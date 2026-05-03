"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Notification,
} from "@/features/notifications/types/Notification";

import { NotificationService }
from "@/features/notifications/services/NotificationService";

export function useNotifications() {

  const [
    notifications,
    setNotifications,
  ] = useState<
    Notification[]
  >([]);

  useEffect(() => {

    async function load() {

      const data =
        await NotificationService
          .getNotifications();

      setNotifications(data);
    }

    load();

  }, []);

  return {
    notifications,
  };
}
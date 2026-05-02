"use client";

import { useEffect } from "react";

import toast from "react-hot-toast";

import { NotificationCenter } from "@/features/notifications/components/NotificationCenter";

import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";

interface Props {

  organisationId: string;
}

export const RealtimeNotifications = ({
  organisationId,
}: Props) => {

  const {
    data: notifications,
  } = useRealtimeCollection({

    collectionName:
      "notifications",

    organisationId,
  });

  useEffect(() => {

    const unread =
      notifications.filter(
        (item: any) => !item.lu
      );

    if (unread.length > 0) {

      const latest =
        unread[0];

      toast(
        latest.titre
      );
    }

  }, [notifications]);

  return (

    <NotificationCenter
      notifications={notifications}
    />

  );
}

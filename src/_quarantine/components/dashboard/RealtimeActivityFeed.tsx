"use client";

import { ActivityFeed } from "@/components/dashboard/ActivityFeed";

import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";

interface Props {

  organisationId: string;
}

export const RealtimeActivityFeed = ({
  organisationId,
}: Props) => {

  const {
    data: activities,
  } = useRealtimeCollection({

    collectionName:
      "audit_logs",

    organisationId,
  });

  return (

    <ActivityFeed
      items={activities}
    />

  );
}

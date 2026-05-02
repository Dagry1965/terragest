Write-Host "Generating Terragest Firestore Realtime Engine..." -ForegroundColor Cyan

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\hooks" -Force

# =====================================================
# REALTIME COLLECTION HOOK
# =====================================================

$realtimeHook = @'
"use client";

import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import {
  useEffect,
  useState,
} from "react";

import { db } from "@/lib/firebase/firebase";

interface RealtimeOptions {

  collectionName: string;

  organisationId?: string;
}

export const useRealtimeCollection = ({
  collectionName,
  organisationId,
}: RealtimeOptions) => {

  const [data, setData] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    let q;

    if (organisationId) {

      q = query(
        collection(
          db,
          collectionName
        ),

        where(
          "organisationId",
          "==",
          organisationId
        )
      );

    } else {

      q = collection(
        db,
        collectionName
      );
    }

    const unsubscribe =
      onSnapshot(
        q,
        (snapshot) => {

          const results =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setData(results);

          setLoading(false);
        },

        (error) => {

          console.error(error);

          setLoading(false);
        }
      );

    return () => unsubscribe();

  }, [
    collectionName,
    organisationId,
  ]);

  return {
    data,
    loading,
  };
}
'@

Set-Content `
"src\hooks\useRealtimeCollection.ts" `
$realtimeHook

# =====================================================
# REALTIME NOTIFICATIONS WIDGET
# =====================================================

$realtimeNotifications = @'
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
'@

Set-Content `
"src\features\notifications\components\RealtimeNotifications.tsx" `
$realtimeNotifications

# =====================================================
# REALTIME ACTIVITY FEED
# =====================================================

$realtimeActivity = @'
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
'@

Set-Content `
"src\components\dashboard\RealtimeActivityFeed.tsx" `
$realtimeActivity

# =====================================================
# REALTIME KPI HELPER
# =====================================================

$realtimeKpi = @'
"use client";

import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";

interface Props {

  organisationId: string;

  collectionName: string;

  label: string;
}

export const RealtimeKpiCard = ({
  organisationId,
  collectionName,
  label,
}: Props) => {

  const {
    data,
  } = useRealtimeCollection({

    collectionName,

    organisationId,
  });

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <p className="text-gray-500">
        {label}
      </p>

      <h2 className="
        text-4xl
        font-bold
        mt-4
      ">
        {data.length}
      </h2>

    </div>
  );
}
'@

Set-Content `
"src\components\dashboard\RealtimeKpiCard.tsx" `
$realtimeKpi

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Firestore Realtime Engine generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- useRealtimeCollection"
Write-Host "- Realtime notifications"
Write-Host "- Realtime activity feed"
Write-Host "- Realtime KPI cards"
Write-Host "- Live ERP synchronization"
Write-Host ""
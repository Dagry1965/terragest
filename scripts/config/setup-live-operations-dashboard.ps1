Write-Host "Generating Terragest Live Operations Dashboard..." -ForegroundColor Cyan

# =====================================================
# GO TO WEB ERP
# =====================================================

Set-Location "..\..\"

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\features\realtime" -Force
mkdir "src\features\realtime\services" -Force
mkdir "src\features\realtime\hooks" -Force
mkdir "src\features\realtime\components" -Force

# =====================================================
# REALTIME SERVICE
# =====================================================

$realtimeService = @'
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

export const RealtimeService = {

  subscribeToCollection(
    collectionName: string,
    organisationId: string,
    callback: (
      data: any[]
    ) => void
  ) {

    const q =
      query(
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

    return onSnapshot(
      q,
      (snapshot) => {

        const data =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        callback(data);
      }
    );
  },
};
'@

Set-Content `
"src\features\realtime\services\RealtimeService.ts" `
$realtimeService

# =====================================================
# REALTIME HOOK
# =====================================================

$realtimeHook = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import { RealtimeService } from "@/features/realtime/services/RealtimeService";

export const useRealtimeCollection =
  (
    collectionName: string,
    organisationId: string
  ) => {

    const [data,
      setData] =
      useState<any[]>([]);

    useEffect(() => {

      if (!organisationId) {
        return;
      }

      const unsubscribe =
        RealtimeService.subscribeToCollection(

          collectionName,

          organisationId,

          setData
        );

      return () =>
        unsubscribe();

    }, [
      collectionName,
      organisationId,
    ]);

    return data;
  };
'@

Set-Content `
"src\features\realtime\hooks\useRealtimeCollection.ts" `
$realtimeHook

# =====================================================
# LIVE ACTIVITY FEED
# =====================================================

$activityFeed = @'
"use client";

interface LiveActivityFeedProps {

  items: any[];
}

export const LiveActivityFeed = ({
  items,
}: LiveActivityFeedProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        <h2 className="
          text-2xl
          font-bold
        ">
          Activité Live
        </h2>

        <div className="
          flex
          items-center
          gap-2
        ">

          <div className="
            w-3
            h-3
            rounded-full
            bg-green-500
            animate-pulse
          " />

          <span className="
            text-sm
            text-green-600
            font-medium
          ">
            LIVE
          </span>

        </div>

      </div>

      <div className="
        mt-6
        space-y-4
      ">

        {items.map(
          (
            item,
            index
          ) => (

            <div
              key={index}
              className="
                border-b
                pb-3
              "
            >

              <p className="
                font-medium
              ">
                {item.nom ||
                 item.libelle ||
                 "Activité"}
              </p>

              <p className="
                text-sm
                text-gray-500
                mt-1
              ">
                {item.createdAt ||
                 "Temps réel"}
              </p>

            </div>

          )
        )}

      </div>

    </div>
  );
}
'@

Set-Content `
"src\features\realtime\components\LiveActivityFeed.tsx" `
$activityFeed

# =====================================================
# REALTIME KPI CARD
# =====================================================

$realtimeCard = @'
interface RealtimeKpiCardProps {

  title: string;

  value: number;

  live?: boolean;
}

export const RealtimeKpiCard = ({
  title,
  value,
  live,
}: RealtimeKpiCardProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        <p className="
          text-gray-500
        ">
          {title}
        </p>

        {live && (

          <div className="
            flex
            items-center
            gap-2
          ">

            <div className="
              w-2
              h-2
              rounded-full
              bg-green-500
              animate-pulse
            " />

            <span className="
              text-xs
              text-green-600
            ">
              LIVE
            </span>

          </div>

        )}

      </div>

      <h2 className="
        text-4xl
        font-bold
        mt-4
      ">
        {value}
      </h2>

    </div>
  );
}
'@

Set-Content `
"src\features\realtime\components\RealtimeKpiCard.tsx" `
$realtimeCard

# =====================================================
# DASHBOARD INTEGRATION FILE
# =====================================================

$dashboardRealtime = @'
AJOUTER IMPORT :

import { useRealtimeCollection } from "@/features/realtime/hooks/useRealtimeCollection";

import { LiveActivityFeed } from "@/features/realtime/components/LiveActivityFeed";

---------------------------------------------------

AJOUTER :

const realtimeMouvements =
  useRealtimeCollection(
    "mouvements",
    organisationId
  );

---------------------------------------------------

AJOUTER DANS LE DASHBOARD :

<LiveActivityFeed
  items={realtimeMouvements}
/>
'@

Set-Content `
"dashboard-realtime-integration.txt" `
$dashboardRealtime

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Live Operations Dashboard generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Firestore realtime listeners"
Write-Host "- Live activity feed"
Write-Host "- Realtime KPI cards"
Write-Host "- Operational monitoring"
Write-Host "- Live ERP operations foundation"
Write-Host ""
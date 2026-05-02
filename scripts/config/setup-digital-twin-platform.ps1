Write-Host "Generating Terragest Digital Twin Platform..." -ForegroundColor Cyan

# =====================================================
# GO TO WEB ERP
# =====================================================

Set-Location "..\..\"

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\features\digital-twin" -Force
mkdir "src\features\digital-twin\types" -Force
mkdir "src\features\digital-twin\services" -Force
mkdir "src\features\digital-twin\components" -Force
mkdir "src\features\digital-twin\hooks" -Force

# =====================================================
# DIGITAL TWIN TYPE
# =====================================================

$twinType = @'
export interface DigitalTwin {

  id: string;

  organisationId: string;

  nom: string;

  type: string;

  statut: string;

  localisation?: string;

  temperature?: number;

  humidite?: number;

  energie?: number;

  stock?: number;

  alertes?: string[];

  updatedAt: string;
}
'@

Set-Content `
"src\features\digital-twin\types\DigitalTwin.ts" `
$twinType

# =====================================================
# DIGITAL TWIN SERVICE
# =====================================================

$twinService = @'
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

export const DigitalTwinService = {

  async getAllByOrganisation(
    organisationId: string
  ) {

    const q =
      query(
        collection(
          db,
          "digital_twins"
        ),

        where(
          "organisationId",
          "==",
          organisationId
        )
      );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  },
};
'@

Set-Content `
"src\features\digital-twin\services\DigitalTwinService.ts" `
$twinService

# =====================================================
# LIVE DIGITAL TWIN HOOK
# =====================================================

$twinHook = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

export const useDigitalTwins =
  (
    organisationId: string
  ) => {

    const [twins,
      setTwins] =
      useState<any[]>([]);

    useEffect(() => {

      if (!organisationId) {
        return;
      }

      const q =
        query(
          collection(
            db,
            "digital_twins"
          ),

          where(
            "organisationId",
            "==",
            organisationId
          )
        );

      const unsubscribe =
        onSnapshot(
          q,
          (snapshot) => {

            const data =
              snapshot.docs.map(
                (doc) => ({
                  id: doc.id,
                  ...doc.data(),
                })
              );

            setTwins(data);
          }
        );

      return () =>
        unsubscribe();

    }, [organisationId]);

    return twins;
  };
'@

Set-Content `
"src\features\digital-twin\hooks\useDigitalTwins.ts" `
$twinHook

# =====================================================
# DIGITAL TWIN CARD
# =====================================================

$twinCard = @'
interface DigitalTwinCardProps {

  twin: any;
}

export const DigitalTwinCard = ({
  twin,
}: DigitalTwinCardProps) => {

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

        <div>

          <p className="
            text-gray-500
          ">
            {twin.type}
          </p>

          <h2 className="
            text-2xl
            font-bold
            mt-2
          ">
            {twin.nom}
          </h2>

        </div>

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
          ">
            LIVE
          </span>

        </div>

      </div>

      <div className="
        mt-6
        grid
        grid-cols-2
        gap-4
      ">

        <div>

          <p className="
            text-gray-500
            text-sm
          ">
            Température
          </p>

          <p className="
            text-2xl
            font-bold
          ">
            {twin.temperature || 0}°
          </p>

        </div>

        <div>

          <p className="
            text-gray-500
            text-sm
          ">
            Humidité
          </p>

          <p className="
            text-2xl
            font-bold
          ">
            {twin.humidite || 0}%
          </p>

        </div>

        <div>

          <p className="
            text-gray-500
            text-sm
          ">
            Énergie
          </p>

          <p className="
            text-2xl
            font-bold
          ">
            {twin.energie || 0}
          </p>

        </div>

        <div>

          <p className="
            text-gray-500
            text-sm
          ">
            Stock
          </p>

          <p className="
            text-2xl
            font-bold
          ">
            {twin.stock || 0}
          </p>

        </div>

      </div>

    </div>
  );
}
'@

Set-Content `
"src\features\digital-twin\components\DigitalTwinCard.tsx" `
$twinCard

# =====================================================
# DIGITAL TWIN DASHBOARD
# =====================================================

$twinDashboard = @'
"use client";

import { useDigitalTwins } from "@/features/digital-twin/hooks/useDigitalTwins";

import { DigitalTwinCard } from "@/features/digital-twin/components/DigitalTwinCard";

interface DigitalTwinDashboardProps {

  organisationId: string;
}

export const DigitalTwinDashboard = ({
  organisationId,
}: DigitalTwinDashboardProps) => {

  const twins =
    useDigitalTwins(
      organisationId
    );

  return (

    <div className="
      space-y-6
    ">

      <div>

        <h2 className="
          text-3xl
          font-bold
        ">
          Digital Twin
        </h2>

        <p className="
          text-gray-500
          mt-2
        ">
          Supervision intelligente temps réel
        </p>

      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">

        {twins.map(
          (twin) => (

            <DigitalTwinCard
              key={twin.id}
              twin={twin}
            />

          )
        )}

      </div>

    </div>
  );
}
'@

Set-Content `
"src\features\digital-twin\components\DigitalTwinDashboard.tsx" `
$twinDashboard

# =====================================================
# SMART STATUS ENGINE
# =====================================================

$statusEngine = @'
export const SmartStatusEngine = {

  computeStatus(
    twin: any
  ) {

    if (
      twin.temperature > 40
    ) {

      return "CRITIQUE";
    }

    if (
      twin.humidite < 20
    ) {

      return "RISQUE";
    }

    return "NORMAL";
  },
};
'@

Set-Content `
"src\features\digital-twin\services\SmartStatusEngine.ts" `
$statusEngine

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Digital Twin Platform generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Digital twin engine"
Write-Host "- Live operational supervision"
Write-Host "- Smart status engine"
Write-Host "- Realtime twin dashboard"
Write-Host "- Intelligent operational mirror foundation"
Write-Host ""
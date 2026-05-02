Write-Host "Generating Terragest IoT Monitoring Platform..." -ForegroundColor Cyan

# =====================================================
# GO TO WEB ERP
# =====================================================

Set-Location "..\..\"

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\features\iot" -Force
mkdir "src\features\iot\types" -Force
mkdir "src\features\iot\services" -Force
mkdir "src\features\iot\components" -Force
mkdir "src\features\iot\hooks" -Force

# =====================================================
# SENSOR TYPE
# =====================================================

$sensorType = @'
export interface Sensor {

  id: string;

  organisationId: string;

  nom: string;

  type: string;

  unite: string;

  valeur: number;

  seuilMin?: number;

  seuilMax?: number;

  localisation?: string;

  actif: boolean;

  createdAt: string;
}
'@

Set-Content `
"src\features\iot\types\Sensor.ts" `
$sensorType

# =====================================================
# SENSOR SERVICE
# =====================================================

$sensorService = @'
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";

export const SensorService = {

  async create(
    data: any
  ) {

    return addDoc(
      collection(
        db,
        "sensors"
      ),
      data
    );
  },

  async getAllByOrganisation(
    organisationId: string
  ) {

    const q =
      query(
        collection(
          db,
          "sensors"
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
"src\features\iot\services\SensorService.ts" `
$sensorService

# =====================================================
# SENSOR ALERT ENGINE
# =====================================================

$alertEngine = @'
export const SensorAlertEngine = {

  analyze(
    sensor: any
  ) {

    const alerts: any[] = [];

    if (
      sensor.seuilMin !== undefined &&
      sensor.valeur <
      sensor.seuilMin
    ) {

      alerts.push({

        type:
          "MIN_THRESHOLD",

        message:
          `${sensor.nom} sous le seuil minimal`,
      });
    }

    if (
      sensor.seuilMax !== undefined &&
      sensor.valeur >
      sensor.seuilMax
    ) {

      alerts.push({

        type:
          "MAX_THRESHOLD",

        message:
          `${sensor.nom} dépasse le seuil maximal`,
      });
    }

    return alerts;
  },
};
'@

Set-Content `
"src\features\iot\services\SensorAlertEngine.ts" `
$alertEngine

# =====================================================
# REALTIME SENSOR HOOK
# =====================================================

$realtimeSensor = @'
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

export const useRealtimeSensors =
  (
    organisationId: string
  ) => {

    const [sensors,
      setSensors] =
      useState<any[]>([]);

    useEffect(() => {

      if (!organisationId) {
        return;
      }

      const q =
        query(
          collection(
            db,
            "sensors"
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

            setSensors(data);
          }
        );

      return () =>
        unsubscribe();

    }, [organisationId]);

    return sensors;
  };
'@

Set-Content `
"src\features\iot\hooks\useRealtimeSensors.ts" `
$realtimeSensor

# =====================================================
# SENSOR CARD
# =====================================================

$sensorCard = @'
interface SensorCardProps {

  sensor: any;
}

export const SensorCard = ({
  sensor,
}: SensorCardProps) => {

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
            {sensor.type}
          </p>

          <h2 className="
            text-2xl
            font-bold
            mt-2
          ">
            {sensor.nom}
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
      ">

        <p className="
          text-5xl
          font-bold
        ">
          {sensor.valeur}
        </p>

        <p className="
          text-gray-500
          mt-2
        ">
          {sensor.unite}
        </p>

      </div>

    </div>
  );
}
'@

Set-Content `
"src\features\iot\components\SensorCard.tsx" `
$sensorCard

# =====================================================
# SENSOR DASHBOARD
# =====================================================

$sensorDashboard = @'
"use client";

import { useRealtimeSensors } from "@/features/iot/hooks/useRealtimeSensors";

import { SensorCard } from "@/features/iot/components/SensorCard";

interface SensorDashboardProps {

  organisationId: string;
}

export const SensorDashboard = ({
  organisationId,
}: SensorDashboardProps) => {

  const sensors =
    useRealtimeSensors(
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
          IoT Monitoring
        </h2>

        <p className="
          text-gray-500
          mt-2
        ">
          Supervision capteurs temps réel
        </p>

      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      ">

        {sensors.map(
          (sensor) => (

            <SensorCard
              key={sensor.id}
              sensor={sensor}
            />

          )
        )}

      </div>

    </div>
  );
}
'@

Set-Content `
"src\features\iot\components\SensorDashboard.tsx" `
$sensorDashboard

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest IoT Monitoring Platform generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- IoT sensors"
Write-Host "- Realtime monitoring"
Write-Host "- Threshold alerts"
Write-Host "- Sensor dashboard"
Write-Host "- Smart field monitoring foundation"
Write-Host ""
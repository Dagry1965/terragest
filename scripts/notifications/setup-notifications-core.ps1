$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " NOTIFICATIONS CORE SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\features\notifications\types",
  "$ProjectRoot\src\features\notifications\services",
  "$ProjectRoot\src\features\notifications\hooks",
  "$ProjectRoot\src\features\notifications\components"
)

foreach ($dir in $dirs) {

  if (!(Test-Path $dir)) {

    New-Item `
      -ItemType Directory `
      -Path $dir `
      -Force | Out-Null

    Write-Host "Created: $dir"
  }
}

# -------------------------------------------------
# NOTIFICATION TYPES
# -------------------------------------------------

$types = @'
export type NotificationSeverity =
  | "info"
  | "success"
  | "warning"
  | "error";

export type Notification = {

  id?: string;

  title: string;

  message: string;

  severity:
    NotificationSeverity;

  read: boolean;

  createdAt: string;
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\notifications\types\Notification.ts",
  $types
)

Write-Host "Created: Notification.ts"

# -------------------------------------------------
# NOTIFICATION SERVICE
# -------------------------------------------------

$service = @'
import {
  Notification,
} from "@/features/notifications/types/Notification";

export const NotificationService = {

  async getNotifications():
  Promise<Notification[]> {

    return [
      {
        id: "1",

        title:
          "Stock faible",

        message:
          "Le stock engrais est faible.",

        severity:
          "warning",

        read: false,

        createdAt:
          new Date().toISOString(),
      },

      {
        id: "2",

        title:
          "Synchronisation réussie",

        message:
          "Les données offline sont synchronisées.",

        severity:
          "success",

        read: false,

        createdAt:
          new Date().toISOString(),
      },
    ];
  },
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\notifications\services\NotificationService.ts",
  $service
)

Write-Host "Created: NotificationService.ts"

# -------------------------------------------------
# USE NOTIFICATIONS
# -------------------------------------------------

$hook = @'
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
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\notifications\hooks\useNotifications.ts",
  $hook
)

Write-Host "Created: useNotifications.ts"

# -------------------------------------------------
# NOTIFICATION CENTER
# -------------------------------------------------

$center = @'
"use client";

import { useNotifications }
from "@/features/notifications/hooks/useNotifications";

export const NotificationCenter =
() => {

  const {
    notifications,
  } = useNotifications();

  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        overflow-hidden
      "
    >
      <div
        className="
          p-6
          border-b
        "
      >
        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Notifications
        </h2>
      </div>

      <div
        className="
          divide-y
        "
      >
        {notifications.map(
          (notification) => (

          <div
            key={notification.id}
            className="
              p-4
            "
          >
            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >
              <div>

                <h3
                  className="
                    font-medium
                  "
                >
                  {
                    notification.title
                  }
                </h3>

                <p
                  className="
                    text-sm
                    text-gray-600
                    mt-1
                  "
                >
                  {
                    notification.message
                  }
                </p>
              </div>

              <span
                className={`
                  text-xs
                  px-2
                  py-1
                  rounded-full
                  ${
                    notification.severity ===
                    "success"
                      ? "bg-green-100 text-green-700"
                    : notification.severity ===
                      "warning"
                      ? "bg-yellow-100 text-yellow-700"
                    : notification.severity ===
                      "error"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }
                `}
              >
                {
                  notification.severity
                }
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\notifications\components\NotificationCenter.tsx",
  $center
)

Write-Host "Created: NotificationCenter.tsx"

# -------------------------------------------------
# NOTIFICATIONS PAGE
# -------------------------------------------------

$pageDir =
"$ProjectRoot\src\app\(private)\notifications"

if (!(Test-Path $pageDir)) {

  New-Item `
    -ItemType Directory `
    -Path $pageDir `
    -Force | Out-Null

  Write-Host "Created: notifications page dir"
}

$page = @'
import { NotificationCenter }
from "@/features/notifications/components/NotificationCenter";

export default function
NotificationsPage() {

  return (
    <div
      className="
        p-6
        space-y-6
      "
    >
      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Notifications
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Centre de notifications
        </p>
      </div>

      <NotificationCenter />
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\(private)\notifications\page.tsx",
  $page
)

Write-Host "Created: notifications page"

Write-Host ""
Write-Host "======================================="
Write-Host " NOTIFICATIONS COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""
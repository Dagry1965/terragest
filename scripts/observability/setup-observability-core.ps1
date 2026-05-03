$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " OBSERVABILITY CORE SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\features\observability\audit",
  "$ProjectRoot\src\features\observability\logs",
  "$ProjectRoot\src\features\observability\monitoring",
  "$ProjectRoot\src\features\observability\analytics",
  "$ProjectRoot\src\features\observability\services",
  "$ProjectRoot\src\features\observability\hooks",
  "$ProjectRoot\src\features\observability\components",
  "$ProjectRoot\src\features\observability\types"
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
# AUDIT TYPES
# -------------------------------------------------

$types = @'
export type AuditSeverity =
  | "info"
  | "warning"
  | "critical";

export type AuditEvent = {

  id?: string;

  action: string;

  entity: string;

  entityId?: string;

  userId?: string;

  organizationId?: string;

  severity:
    AuditSeverity;

  metadata?: Record<
    string,
    any
  >;

  createdAt: string;
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\observability\types\AuditEvent.ts",
  $types
)

Write-Host "Created: AuditEvent.ts"

# -------------------------------------------------
# AUDIT SERVICE
# -------------------------------------------------

$service = @'
import {
  AuditEvent,
} from "@/features/observability/types/AuditEvent";

const events:
AuditEvent[] = [];

export const AuditService = {

  async log(
    event: AuditEvent
  ) {

    events.unshift({
      ...event,

      id:
        crypto.randomUUID(),

      createdAt:
        new Date().toISOString(),
    });

    console.log(
      "[AUDIT]",
      event
    );

    return true;
  },

  async getEvents():
  Promise<AuditEvent[]> {

    return events;
  },
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\observability\services\AuditService.ts",
  $service
)

Write-Host "Created: AuditService.ts"

# -------------------------------------------------
# AUDIT HOOK
# -------------------------------------------------

$hook = @'
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
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\observability\hooks\useAuditEvents.ts",
  $hook
)

Write-Host "Created: useAuditEvents.ts"

# -------------------------------------------------
# AUDIT TABLE
# -------------------------------------------------

$table = @'
"use client";

import { useAuditEvents }
from "@/features/observability/hooks/useAuditEvents";

export const AuditTable =
() => {

  const { events } =
    useAuditEvents();

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
          Audit Trail
        </h2>
      </div>

      <table className="w-full">

        <thead
          className="
            bg-gray-50
          "
        >
          <tr>

            <th className="p-4 text-left">
              Action
            </th>

            <th className="p-4 text-left">
              Entité
            </th>

            <th className="p-4 text-left">
              Sévérité
            </th>

            <th className="p-4 text-left">
              Date
            </th>

          </tr>
        </thead>

        <tbody>

          {events.map(
            (event) => (

            <tr
              key={event.id}
              className="
                border-t
              "
            >
              <td className="p-4">
                {event.action}
              </td>

              <td className="p-4">
                {event.entity}
              </td>

              <td className="p-4">

                <span
                  className={`
                    px-2
                    py-1
                    rounded-full
                    text-xs
                    ${
                      event.severity ===
                      "critical"
                        ? "bg-red-100 text-red-700"
                      : event.severity ===
                        "warning"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }
                  `}
                >
                  {event.severity}
                </span>

              </td>

              <td className="p-4">
                {
                  new Date(
                    event.createdAt
                  ).toLocaleString()
                }
              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\observability\components\AuditTable.tsx",
  $table
)

Write-Host "Created: AuditTable.tsx"

# -------------------------------------------------
# OBSERVABILITY PAGE
# -------------------------------------------------

$pageDir =
"$ProjectRoot\src\app\(private)\observability"

if (!(Test-Path $pageDir)) {

  New-Item `
    -ItemType Directory `
    -Path $pageDir `
    -Force | Out-Null

  Write-Host "Created: observability page dir"
}

$page = @'
import { AuditTable }
from "@/features/observability/components/AuditTable";

export default function
ObservabilityPage() {

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
          Observability
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Audit et monitoring
        </p>
      </div>

      <AuditTable />
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\(private)\observability\page.tsx",
  $page
)

Write-Host "Created: observability page"

Write-Host ""
Write-Host "======================================="
Write-Host " OBSERVABILITY COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""
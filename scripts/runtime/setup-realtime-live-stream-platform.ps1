$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

function Ensure-Dir($Path) {
  if (!(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-Utf8($Path, $Content) {

  $FullPath =
    Join-Path $ProjectRoot $Path

  $Dir =
    Split-Path $FullPath -Parent

  Ensure-Dir $Dir

  if (Test-Path -LiteralPath $FullPath) {

    $BackupDir =
      Join-Path `
        $ProjectRoot `
        "backup\realtime-live-stream"

    Ensure-Dir $BackupDir

    $SafeName = $Path
    $SafeName = $SafeName.Replace("\", "__")
    $SafeName = $SafeName.Replace("/", "__")
    $SafeName = $SafeName.Replace(":", "")

    Copy-Item `
      -LiteralPath $FullPath `
      -Destination (
        Join-Path `
          $BackupDir `
          "$SafeName.bak"
      ) `
      -Force
  }

  [System.IO.File]::WriteAllText(
    $FullPath,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host `
    "WRITTEN: $Path" `
    -ForegroundColor Green
}

Write-Host ""
Write-Host `
  "REALTIME LIVE STREAM PLATFORM" `
  -ForegroundColor Cyan

Write-Host ""

Ensure-Dir "src\runtime\streams"
Ensure-Dir "src\runtime\streams\gateway"
Ensure-Dir "src\runtime\streams\channels"
Ensure-Dir "src\runtime\streams\events"
Ensure-Dir "src\runtime\streams\metrics"
Ensure-Dir "src\runtime\streams\history"
Ensure-Dir "src\components\erp\streams"

Write-Utf8 `
"src\runtime\streams\events\ERPStreamEvent.ts" `
@'
export type ERPStreamLevel =
  | "info"
  | "warning"
  | "critical";

export type ERPStreamEvent = {
  id: string;
  tenantId?: string;
  module: string;
  type: string;
  message: string;
  level: ERPStreamLevel;
  timestamp: string;
};
'@

Write-Utf8 `
"src\runtime\streams\channels\ERPStreamChannel.ts" `
@'
export type ERPStreamChannel = {
  id: string;
  key: string;
  label: string;
  active: boolean;
};
'@

Write-Utf8 `
"src\runtime\streams\channels\ERPStreamRegistry.ts" `
@'
import type {
  ERPStreamChannel,
} from "./ERPStreamChannel";

export const ERPStreamRegistry:
  ERPStreamChannel[] = [

  {
    id: "stream_runtime",
    key: "runtime",
    label: "Runtime Stream",
    active: true,
  },

  {
    id: "stream_workers",
    key: "workers",
    label: "Workers Stream",
    active: true,
  },

  {
    id: "stream_security",
    key: "security",
    label: "Security Stream",
    active: true,
  },

  {
    id: "stream_monitoring",
    key: "monitoring",
    label: "Monitoring Stream",
    active: true,
  },

  {
    id: "stream_tenants",
    key: "tenants",
    label: "Tenant Stream",
    active: true,
  },
];
'@

Write-Utf8 `
"src\runtime\streams\history\ERPStreamHistoryStore.ts" `
@'
import type {
  ERPStreamEvent,
} from "../events/ERPStreamEvent";

class ERPStreamHistoryStoreClass {

  private events:
    ERPStreamEvent[] = [];

  publish(
    event: ERPStreamEvent
  ) {

    this.events.unshift(event);

    this.events =
      this.events.slice(0, 500);
  }

  all() {

    return this.events;
  }

  byModule(
    module: string
  ) {

    return this.events.filter(
      (event) =>
        event.module === module
    );
  }

  critical() {

    return this.events.filter(
      (event) =>
        event.level === "critical"
    );
  }
}

export const ERPStreamHistoryStore =
  new ERPStreamHistoryStoreClass();
'@

Write-Utf8 `
"src\runtime\streams\metrics\ERPStreamMetricsStore.ts" `
@'
export type ERPStreamMetrics = {
  totalStreams: number;
  totalEvents: number;
  criticalEvents: number;
  activeChannels: number;
};

let metrics: ERPStreamMetrics = {
  totalStreams: 0,
  totalEvents: 0,
  criticalEvents: 0,
  activeChannels: 0,
};

export const ERPStreamMetricsStore = {

  set(
    next: ERPStreamMetrics
  ) {

    metrics = next;
  },

  get() {

    return metrics;
  },
};
'@

Write-Utf8 `
"src\runtime\streams\gateway\ERPRealtimeGateway.ts" `
@'
import {
  ERPStreamRegistry,
} from "../channels/ERPStreamRegistry";

import {
  ERPStreamHistoryStore,
} from "../history/ERPStreamHistoryStore";

import {
  ERPStreamMetricsStore,
} from "../metrics/ERPStreamMetricsStore";

import type {
  ERPStreamEvent,
} from "../events/ERPStreamEvent";

function createId(
  prefix: string
) {

  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export const ERPRealtimeGateway = {

  channels() {

    return ERPStreamRegistry;
  },

  publish(
    event: Omit<
      ERPStreamEvent,
      "id" | "timestamp"
    >
  ) {

    const payload:
      ERPStreamEvent = {

      id:
        createId("stream"),

      timestamp:
        new Date().toISOString(),

      ...event,
    };

    ERPStreamHistoryStore.publish(
      payload
    );

    this.refreshMetrics();

    return payload;
  },

  refreshMetrics() {

    const events =
      ERPStreamHistoryStore.all();

    ERPStreamMetricsStore.set({

      totalStreams:
        ERPStreamRegistry.length,

      totalEvents:
        events.length,

      criticalEvents:
        ERPStreamHistoryStore.critical().length,

      activeChannels:
        ERPStreamRegistry.filter(
          (channel) =>
            channel.active
        ).length,
    });
  },
};
'@

Write-Utf8 `
"src\runtime\streams\ERPStreamsSeed.ts" `
@'
import {
  ERPRealtimeGateway,
} from "./gateway/ERPRealtimeGateway";

let seeded = false;

export function seedERPStreamsRuntime() {

  if (seeded) {
    return;
  }

  seeded = true;

  ERPRealtimeGateway.publish({
    module: "runtime",
    type: "BOOT",
    message: "Runtime ERP initialise",
    level: "info",
  });

  ERPRealtimeGateway.publish({
    module: "workers",
    type: "JOB_COMPLETED",
    message: "Worker execution terminee",
    level: "info",
  });

  ERPRealtimeGateway.publish({
    module: "security",
    type: "ACCESS_DENIED",
    message: "Tentative d'acces refusee",
    level: "warning",
  });

  ERPRealtimeGateway.publish({
    module: "monitoring",
    type: "HEALTH_CRITICAL",
    message: "Health check critique",
    level: "critical",
  });

  ERPRealtimeGateway.refreshMetrics();
}
'@

Write-Utf8 `
"src\runtime\streams\ERPStreamsSnapshot.ts" `
@'
import {
  ERPRealtimeGateway,
} from "./gateway/ERPRealtimeGateway";

import {
  ERPStreamHistoryStore,
} from "./history/ERPStreamHistoryStore";

import {
  ERPStreamMetricsStore,
} from "./metrics/ERPStreamMetricsStore";

export function getERPStreamsSnapshot() {

  return {

    channels:
      ERPRealtimeGateway.channels(),

    events:
      ERPStreamHistoryStore.all(),

    metrics:
      ERPStreamMetricsStore.get(),
  };
}
'@

Write-Utf8 `
"src\runtime\streams\index.ts" `
@'
export * from "./events/ERPStreamEvent";

export * from "./channels/ERPStreamChannel";
export * from "./channels/ERPStreamRegistry";

export * from "./history/ERPStreamHistoryStore";

export * from "./metrics/ERPStreamMetricsStore";

export * from "./gateway/ERPRealtimeGateway";

export * from "./ERPStreamsSeed";
export * from "./ERPStreamsSnapshot";
'@

Write-Utf8 `
"src\components\erp\streams\ERPStreamsMetricsGrid.tsx" `
@'
import {
  ERPStatCard,
} from "@/components/erp/ui";

import type {
  getERPStreamsSnapshot,
} from "@/runtime/streams";

type Snapshot =
  ReturnType<
    typeof getERPStreamsSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPStreamsMetricsGrid({
  snapshot,
}: Props) {

  const metrics =
    snapshot.metrics;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">

      <ERPStatCard
        label="Streams"
        value={metrics.totalStreams}
        helper="Realtime channels"
      />

      <ERPStatCard
        label="Events"
        value={metrics.totalEvents}
        helper="Live events"
      />

      <ERPStatCard
        label="Critical"
        value={metrics.criticalEvents}
        helper="Critical alerts"
      />

      <ERPStatCard
        label="Active"
        value={metrics.activeChannels}
        helper="Active channels"
      />

    </div>
  );
}
'@

Write-Utf8 `
"src\components\erp\streams\ERPStreamsChannelsPanel.tsx" `
@'
import {
  ERPSection,
} from "@/components/erp/ui";

import type {
  getERPStreamsSnapshot,
} from "@/runtime/streams";

type Snapshot =
  ReturnType<
    typeof getERPStreamsSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPStreamsChannelsPanel({
  snapshot,
}: Props) {

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Live Channels
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Canaux realtime runtime.
        </p>

      </div>

      <div className="space-y-4">

        {snapshot.channels.map((channel) => (

          <div
            key={channel.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="font-semibold text-slate-900">
                  {channel.label}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {channel.key}
                </p>

              </div>

              <span
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  channel.active
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-700",
                ].join(" ")}
              >
                {channel.active
                  ? "active"
                  : "inactive"}
              </span>

            </div>

          </div>

        ))}

      </div>

    </ERPSection>
  );
}
'@

Write-Utf8 `
"src\components\erp\streams\ERPStreamsTimelinePanel.tsx" `
@'
import {
  ERPSection,
} from "@/components/erp/ui";

import type {
  getERPStreamsSnapshot,
} from "@/runtime/streams";

type Snapshot =
  ReturnType<
    typeof getERPStreamsSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPStreamsTimelinePanel({
  snapshot,
}: Props) {

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Live Timeline
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Flux temps reel du runtime ERP.
        </p>

      </div>

      <div className="space-y-4">

        {snapshot.events.map((event) => (

          <div
            key={event.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="font-semibold text-slate-900">
                  {event.type}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {event.message}
                </p>

              </div>

              <span
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  event.level === "critical"
                    ? "bg-red-50 text-red-700"
                    : event.level === "warning"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-emerald-50 text-emerald-700",
                ].join(" ")}
              >
                {event.level}
              </span>

            </div>

          </div>

        ))}

      </div>

    </ERPSection>
  );
}
'@

Write-Utf8 `
"src\components\erp\streams\ERPStreamsDashboard.tsx" `
@'
import {
  ERPPageHeader,
} from "@/components/erp/ui";

import {
  getERPStreamsSnapshot,
  seedERPStreamsRuntime,
} from "@/runtime/streams";

import {
  ERPStreamsMetricsGrid,
} from "./ERPStreamsMetricsGrid";

import {
  ERPStreamsChannelsPanel,
} from "./ERPStreamsChannelsPanel";

import {
  ERPStreamsTimelinePanel,
} from "./ERPStreamsTimelinePanel";

seedERPStreamsRuntime();

export function ERPStreamsDashboard() {

  const snapshot =
    getERPStreamsSnapshot();

  return (
    <div className="space-y-8">

      <ERPPageHeader
        eyebrow="ERP Live Runtime"
        title="Realtime Live Stream Platform"
        description="Live runtime streams, realtime events, workers feeds et observability timeline."
      />

      <ERPStreamsMetricsGrid
        snapshot={snapshot}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <ERPStreamsChannelsPanel
          snapshot={snapshot}
        />

        <ERPStreamsTimelinePanel
          snapshot={snapshot}
        />

      </div>

    </div>
  );
}
'@

Write-Utf8 `
"src\components\erp\streams\index.ts" `
@'
export * from "./ERPStreamsMetricsGrid";
export * from "./ERPStreamsChannelsPanel";
export * from "./ERPStreamsTimelinePanel";
export * from "./ERPStreamsDashboard";
'@

Write-Utf8 `
"src\app\(private)\streams\page.tsx" `
@'
import {
  ERPStreamsDashboard,
} from "@/components/erp/streams";

export default function Page() {

  return (
    <ERPStreamsDashboard />
  );
}
'@

Write-Host ""
Write-Host `
  "REALTIME LIVE STREAM PLATFORM INSTALLE" `
  -ForegroundColor Green

Write-Host ""
Write-Host `
  "Executer : pnpm build" `
  -ForegroundColor Yellow
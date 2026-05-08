$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

function Ensure-Dir($Path) {
  if (!(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-Utf8($Path, $Content) {
  $FullPath = Join-Path $ProjectRoot $Path
  $Dir = Split-Path $FullPath -Parent
  Ensure-Dir $Dir

  if (Test-Path -LiteralPath $FullPath) {
    $BackupDir = Join-Path $ProjectRoot "backup\realtime-runtime-core"
    Ensure-Dir $BackupDir

    $SafeName = $Path
    $SafeName = $SafeName.Replace("\", "__")
    $SafeName = $SafeName.Replace("/", "__")
    $SafeName = $SafeName.Replace(":", "")

    Copy-Item -LiteralPath $FullPath -Destination (Join-Path $BackupDir "$SafeName.bak") -Force
  }

  [System.IO.File]::WriteAllText(
    $FullPath,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN: $Path" -ForegroundColor Green
}

Write-Host ""
Write-Host "REALTIME RUNTIME CORE" -ForegroundColor Cyan
Write-Host ""

Ensure-Dir "src\runtime\realtime"
Ensure-Dir "src\runtime\realtime\bus"
Ensure-Dir "src\runtime\realtime\channels"
Ensure-Dir "src\runtime\realtime\presence"
Ensure-Dir "src\runtime\realtime\snapshots"
Ensure-Dir "src\components\erp\realtime"

Write-Utf8 "src\runtime\realtime\channels\ERPRealtimeChannel.ts" @'
export type ERPRealtimeChannelType =
  | "events"
  | "workflows"
  | "automation"
  | "queue"
  | "alerts"
  | "system"
  | "tenant";

export type ERPRealtimeMessage = {
  id: string;
  channel: ERPRealtimeChannelType;
  module?: string;
  title: string;
  description?: string;
  timestamp: string;
  payload?: Record<string, unknown>;
};
'@

Write-Utf8 "src\runtime\realtime\bus\ERPRealtimeBus.ts" @'
import type {
  ERPRealtimeMessage,
  ERPRealtimeChannelType,
} from "../channels/ERPRealtimeChannel";

type ERPRealtimeSubscriber = (
  message: ERPRealtimeMessage
) => void;

class ERPRealtimeBusClass {
  private messages: ERPRealtimeMessage[] = [];
  private subscribers: ERPRealtimeSubscriber[] = [];

  publish(message: ERPRealtimeMessage) {
    this.messages.unshift(message);
    this.messages = this.messages.slice(0, 300);

    for (const subscriber of this.subscribers) {
      subscriber(message);
    }
  }

  subscribe(subscriber: ERPRealtimeSubscriber) {
    this.subscribers.push(subscriber);

    return () => {
      this.subscribers =
        this.subscribers.filter((item) => item !== subscriber);
    };
  }

  all() {
    return this.messages;
  }

  byChannel(channel: ERPRealtimeChannelType) {
    return this.messages.filter(
      (message) => message.channel === channel
    );
  }
}

export const ERPRealtimeBus =
  new ERPRealtimeBusClass();
'@

Write-Utf8 "src\runtime\realtime\presence\ERPRealtimePresence.ts" @'
export type ERPRealtimePresence = {
  id: string;
  name: string;
  role: string;
  status: "online" | "idle" | "offline";
  module?: string;
  updatedAt: string;
};

class ERPRealtimePresenceStoreClass {
  private users: ERPRealtimePresence[] = [];

  upsert(user: ERPRealtimePresence) {
    const existing =
      this.users.some((item) => item.id === user.id);

    if (existing) {
      this.users = this.users.map((item) =>
        item.id === user.id ? user : item
      );
    } else {
      this.users.unshift(user);
    }

    this.users = this.users.slice(0, 100);
  }

  all() {
    return this.users;
  }
}

export const ERPRealtimePresenceStore =
  new ERPRealtimePresenceStoreClass();
'@

Write-Utf8 "src\runtime\realtime\snapshots\ERPRealtimeSnapshot.ts" @'
import {
  ERPRealtimeBus,
} from "../bus/ERPRealtimeBus";

import {
  ERPRealtimePresenceStore,
} from "../presence/ERPRealtimePresence";

export function getERPRealtimeSnapshot() {
  const messages = ERPRealtimeBus.all();
  const presence = ERPRealtimePresenceStore.all();

  return {
    messages,
    presence,
    totalMessages: messages.length,
    onlineUsers: presence.filter((user) => user.status === "online").length,
    events: ERPRealtimeBus.byChannel("events").length,
    workflows: ERPRealtimeBus.byChannel("workflows").length,
    automation: ERPRealtimeBus.byChannel("automation").length,
    queue: ERPRealtimeBus.byChannel("queue").length,
    alerts: ERPRealtimeBus.byChannel("alerts").length,
    system: ERPRealtimeBus.byChannel("system").length,
  };
}
'@

Write-Utf8 "src\runtime\realtime\ERPRealtimeSeed.ts" @'
import {
  ERPRealtimeBus,
} from "./bus/ERPRealtimeBus";

import {
  ERPRealtimePresenceStore,
} from "./presence/ERPRealtimePresence";

let seeded = false;

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function seedERPRealtimeRuntime() {
  if (seeded) {
    return;
  }

  seeded = true;

  const now = new Date().toISOString();

  ERPRealtimePresenceStore.upsert({
    id: "user_admin",
    name: "Admin ERP",
    role: "Superviseur",
    status: "online",
    module: "cockpit",
    updatedAt: now,
  });

  ERPRealtimePresenceStore.upsert({
    id: "user_ops",
    name: "Equipe operations",
    role: "Operations",
    status: "idle",
    module: "maintenance",
    updatedAt: now,
  });

  ERPRealtimeBus.publish({
    id: createId("rt"),
    channel: "events",
    module: "materiels",
    title: "Event runtime recu",
    description: "Materiel cree dans le bus ERP.",
    timestamp: now,
  });

  ERPRealtimeBus.publish({
    id: createId("rt"),
    channel: "workflows",
    module: "maintenance",
    title: "Workflow en cours",
    description: "Maintenance critique en traitement.",
    timestamp: now,
  });

  ERPRealtimeBus.publish({
    id: createId("rt"),
    channel: "automation",
    module: "stocks",
    title: "Automation declenchee",
    description: "Alerte stock faible traitee.",
    timestamp: now,
  });

  ERPRealtimeBus.publish({
    id: createId("rt"),
    channel: "queue",
    module: "paiements",
    title: "Job queue traite",
    description: "Retry paiement execute.",
    timestamp: now,
  });

  ERPRealtimeBus.publish({
    id: createId("rt"),
    channel: "alerts",
    module: "maintenance",
    title: "Alerte critique",
    description: "Intervention urgente detectee.",
    timestamp: now,
  });

  ERPRealtimeBus.publish({
    id: createId("rt"),
    channel: "system",
    title: "Runtime realtime actif",
    description: "Bus interne realtime initialise.",
    timestamp: now,
  });
}
'@

Write-Utf8 "src\runtime\realtime\index.ts" @'
export * from "./channels/ERPRealtimeChannel";
export * from "./bus/ERPRealtimeBus";
export * from "./presence/ERPRealtimePresence";
export * from "./snapshots/ERPRealtimeSnapshot";
export * from "./ERPRealtimeSeed";
'@

Write-Utf8 "src\components\erp\realtime\ERPRealtimeMetrics.tsx" @'
import { ERPStatCard } from "@/components/erp/ui";
import type { getERPRealtimeSnapshot } from "@/runtime/realtime";

type Snapshot = ReturnType<typeof getERPRealtimeSnapshot>;

type ERPRealtimeMetricsProps = {
  snapshot: Snapshot;
};

export function ERPRealtimeMetrics({
  snapshot,
}: ERPRealtimeMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      <ERPStatCard label="Messages" value={snapshot.totalMessages} helper="Flux realtime" />
      <ERPStatCard label="Online" value={snapshot.onlineUsers} helper="Presence active" />
      <ERPStatCard label="Events" value={snapshot.events} helper="Domain events" />
      <ERPStatCard label="Workflows" value={snapshot.workflows} helper="Processus live" />
      <ERPStatCard label="Automation" value={snapshot.automation} helper="Triggers live" />
      <ERPStatCard label="Queue" value={snapshot.queue} helper="Jobs live" />
      <ERPStatCard label="Alerts" value={snapshot.alerts} helper="Alertes live" />
      <ERPStatCard label="System" value={snapshot.system} helper="Runtime" />
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\realtime\ERPRealtimeFeed.tsx" @'
import { ERPSection } from "@/components/erp/ui";
import type { getERPRealtimeSnapshot } from "@/runtime/realtime";

type Snapshot = ReturnType<typeof getERPRealtimeSnapshot>;

type ERPRealtimeFeedProps = {
  snapshot: Snapshot;
};

export function ERPRealtimeFeed({
  snapshot,
}: ERPRealtimeFeedProps) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Realtime feed
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Flux des messages runtime en temps reel.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.messages.map((message) => (
          <div
            key={message.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">
                  {message.title}
                </p>

                {message.description && (
                  <p className="mt-1 text-sm text-slate-500">
                    {message.description}
                  </p>
                )}

                <p className="mt-2 text-xs text-slate-400">
                  {message.module ?? "system"}
                </p>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {message.channel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\realtime\ERPRealtimePresencePanel.tsx" @'
import { ERPSection } from "@/components/erp/ui";
import type { getERPRealtimeSnapshot } from "@/runtime/realtime";

type Snapshot = ReturnType<typeof getERPRealtimeSnapshot>;

type ERPRealtimePresencePanelProps = {
  snapshot: Snapshot;
};

export function ERPRealtimePresencePanel({
  snapshot,
}: ERPRealtimePresencePanelProps) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Presence runtime
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Utilisateurs et services connectes au runtime.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.presence.map((user) => (
          <div
            key={user.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  {user.name}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {user.role} - {user.module ?? "global"}
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {user.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx" @'
import { ERPPageHeader } from "@/components/erp/ui";
import {
  getERPRealtimeSnapshot,
  seedERPRealtimeRuntime,
} from "@/runtime/realtime";

import { ERPRealtimeMetrics } from "./ERPRealtimeMetrics";
import { ERPRealtimeFeed } from "./ERPRealtimeFeed";
import { ERPRealtimePresencePanel } from "./ERPRealtimePresencePanel";

seedERPRealtimeRuntime();

export function ERPRuntimeRealtimeDashboard() {
  const snapshot = getERPRealtimeSnapshot();

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="ERP Realtime Runtime"
        title="Realtime Mission Control"
        description="Supervision des messages live, channels, subscriptions et presence runtime."
      />

      <ERPRealtimeMetrics snapshot={snapshot} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ERPRealtimeFeed snapshot={snapshot} />
        <ERPRealtimePresencePanel snapshot={snapshot} />
      </div>
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\realtime\index.ts" @'
export * from "./ERPRealtimeMetrics";
export * from "./ERPRealtimeFeed";
export * from "./ERPRealtimePresencePanel";
export * from "./ERPRuntimeRealtimeDashboard";
'@

Write-Utf8 "src\app\(private)\realtime\page.tsx" @'
import { ERPRuntimeRealtimeDashboard } from "@/components/erp/realtime";

export default function Page() {
  return <ERPRuntimeRealtimeDashboard />;
}
'@

Write-Host ""
Write-Host "REALTIME RUNTIME CORE INSTALLE" -ForegroundColor Green
Write-Host "Executer : pnpm build" -ForegroundColor Yellow
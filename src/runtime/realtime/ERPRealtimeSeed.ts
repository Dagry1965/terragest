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
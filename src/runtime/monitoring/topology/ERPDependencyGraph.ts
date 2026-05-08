export type ERPDependencyNode = {
  id: string;
  label: string;
  group: string;
};

export type ERPDependencyEdge = {
  from: string;
  to: string;
  label?: string;
};

export type ERPDependencyGraph = {
  nodes: ERPDependencyNode[];
  edges: ERPDependencyEdge[];
};

export function getERPDependencyGraph(): ERPDependencyGraph {
  return {
    nodes: [
      { id: "registry", label: "Runtime Registry", group: "core" },
      { id: "ui", label: "Runtime UI", group: "ui" },
      { id: "events", label: "Event Bus", group: "runtime" },
      { id: "observability", label: "Observability", group: "runtime" },
      { id: "automation", label: "Automation", group: "runtime" },
      { id: "workflows", label: "Workflows", group: "runtime" },
      { id: "queue", label: "Queue / DLQ", group: "runtime" },
      { id: "realtime", label: "Realtime", group: "runtime" },
      { id: "security", label: "Security RBAC", group: "security" },
      { id: "tenant", label: "Multi-Tenant", group: "saas" },
      { id: "persistence", label: "Persistence", group: "data" },
      { id: "workers", label: "Workers", group: "runtime" },
      { id: "monitoring", label: "Monitoring", group: "ops" },
    ],
    edges: [
      { from: "registry", to: "ui", label: "schemas" },
      { from: "events", to: "observability", label: "timeline" },
      { from: "events", to: "automation", label: "triggers" },
      { from: "automation", to: "workflows", label: "orchestrates" },
      { from: "workflows", to: "queue", label: "async jobs" },
      { from: "queue", to: "workers", label: "execution" },
      { from: "events", to: "realtime", label: "streams" },
      { from: "security", to: "tenant", label: "access context" },
      { from: "tenant", to: "persistence", label: "isolation" },
      { from: "workers", to: "monitoring", label: "metrics" },
      { from: "persistence", to: "monitoring", label: "records" },
    ],
  };
}
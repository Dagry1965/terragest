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
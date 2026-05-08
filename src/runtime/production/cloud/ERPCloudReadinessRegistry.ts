import type { ERPCloudReadinessCheck } from "./ERPCloudReadinessCheck";

export const ERPCloudReadinessRegistry: ERPCloudReadinessCheck[] = [
  {
    key: "env-config",
    label: "Environment Config",
    status: "partial",
    description: "Les variables env existent mais doivent etre auditees.",
  },
  {
    key: "firestore",
    label: "Firestore Backend",
    status: "partial",
    description: "Firestore est present mais la persistance runtime doit etre branchee.",
  },
  {
    key: "build",
    label: "Production Build",
    status: "ready",
    description: "Le build Next.js est stable.",
  },
  {
    key: "monitoring",
    label: "Monitoring",
    status: "ready",
    description: "Le monitoring center est en place.",
  },
  {
    key: "backup",
    label: "Backup",
    status: "partial",
    description: "Les plans existent, la cible cloud reste a connecter.",
  },
];
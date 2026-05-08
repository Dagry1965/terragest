import type { ERPProductionPolicy } from "./ERPProductionPolicy";

export const ERPProductionPolicyRegistry: ERPProductionPolicy[] = [
  {
    key: "runtime-registry",
    label: "Runtime Registry",
    level: "required",
    status: "ok",
    description: "Le registre central ERP est disponible.",
  },
  {
    key: "security-rbac",
    label: "Security RBAC",
    level: "required",
    status: "ok",
    description: "La couche roles, permissions et policies existe.",
  },
  {
    key: "tenant-isolation",
    label: "Tenant Isolation",
    level: "required",
    status: "ok",
    description: "Le contexte tenant et l'isolation module sont presents.",
  },
  {
    key: "persistence-driver",
    label: "Persistence Driver",
    level: "required",
    status: "warning",
    description: "Le driver in-memory existe, mais le driver cloud reste a brancher.",
  },
  {
    key: "backup-runtime",
    label: "Backup Runtime",
    level: "recommended",
    status: "warning",
    description: "La strategie backup doit etre connectee a un stockage durable.",
  },
  {
    key: "rate-limits",
    label: "Rate Limits",
    level: "recommended",
    status: "warning",
    description: "Les limites runtime doivent etre appliquees par tenant.",
  },
  {
    key: "monitoring",
    label: "Monitoring Center",
    level: "required",
    status: "ok",
    description: "Le monitoring center est disponible.",
  },
  {
    key: "testing-platform",
    label: "Testing Platform",
    level: "recommended",
    status: "ok",
    description: "La plateforme de validation runtime est disponible.",
  },
];
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(...parts) {
  return path.join(root, ...parts);
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, filePath)}`);
}

function backup(filePath, suffix) {
  if (!fs.existsSync(filePath)) return;

  const backupPath = `${filePath}.bak-${suffix}`;

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
  }
}

const statusDir = path.join(root, "src", "runtime", "status");

const typesPath = path.join(statusDir, "RuntimeStatusGovernanceTypes.ts");
const enginePath = path.join(statusDir, "RuntimeStatusGovernanceEngine.ts");
const indexPath = path.join(statusDir, "index.ts");

backup(typesPath, "q20h4a-status-governance");
backup(enginePath, "q20h4a-status-governance");
backup(indexPath, "q20h4a-status-governance");

write(
  typesPath,
`export type RuntimeStatusVisibility =
  | "visible"
  | "technical"
  | "hidden";

export type RuntimeStatusEditMode =
  | "manual"
  | "readonly"
  | "action_only";

export interface RuntimeStatusDefinition {
  key: string;
  label: string;
  description?: string;
  visibility: RuntimeStatusVisibility;
  tone?: "default" | "success" | "warning" | "danger" | "info";
}

export interface RuntimeStatusActionDefinition {
  key: string;
  label: string;
  from: string[];
  to?: string;
  description?: string;
  requiresConfirmation?: boolean;
  recommended?: boolean;
}

export interface RuntimeStatusGuidanceDefinition {
  status: string;
  title: string;
  message: string;
  tone?: "default" | "success" | "warning" | "danger" | "info";
}

export interface RuntimeStatusGovernancePolicy {
  moduleKey: string;
  statusField?: string;
  editMode: RuntimeStatusEditMode;
  statuses: RuntimeStatusDefinition[];
  actions?: RuntimeStatusActionDefinition[];
  guidance?: RuntimeStatusGuidanceDefinition[];
  technicalFields?: string[];
}

export interface RuntimeStatusGovernanceContext {
  moduleKey: string;
  record?: Record<string, unknown> | null;
}

export interface RuntimeStatusGovernanceResult {
  moduleKey: string;
  statusField: string;
  editMode: RuntimeStatusEditMode;
  visibleStatuses: RuntimeStatusDefinition[];
  technicalStatuses: RuntimeStatusDefinition[];
  hiddenStatuses: RuntimeStatusDefinition[];
  actions: RuntimeStatusActionDefinition[];
  guidance: RuntimeStatusGuidanceDefinition[];
  technicalFields: string[];
}
`
);

write(
  enginePath,
`import type {
  RuntimeStatusActionDefinition,
  RuntimeStatusDefinition,
  RuntimeStatusGovernanceContext,
  RuntimeStatusGovernancePolicy,
  RuntimeStatusGovernanceResult,
  RuntimeStatusGuidanceDefinition,
} from "./RuntimeStatusGovernanceTypes";

const runtimeStatusPolicies: RuntimeStatusGovernancePolicy[] = [
  {
    moduleKey: "lignesinterventionauto",
    statusField: "statut",
    editMode: "action_only",
    statuses: [
      {
        key: "brouillon",
        label: "Brouillon",
        description:
          "La ligne est en préparation. Elle n'est pas encore comptabilisée et ne déclenche pas de sortie stock.",
        visibility: "visible",
        tone: "default",
      },
      {
        key: "validee",
        label: "Validée",
        description:
          "La ligne est confirmée. Elle est comptabilisée et peut déclencher une sortie stock si elle concerne une pièce.",
        visibility: "visible",
        tone: "success",
      },
      {
        key: "facturee",
        label: "Facturée",
        description:
          "État technique remplacé par une relation facture/document. Non exposé comme statut utilisateur.",
        visibility: "technical",
        tone: "info",
      },
      {
        key: "annulee",
        label: "Annulée",
        description:
          "État technique remplacé par une action métier de retrait contrôlé.",
        visibility: "technical",
        tone: "danger",
      },
    ],
    actions: [
      {
        key: "valider-ligne",
        label: "Valider",
        from: ["brouillon"],
        to: "validee",
        description:
          "Confirme la ligne et laisse le runtime appliquer les contrôles métier, dont le stock si nécessaire.",
        recommended: true,
      },
      {
        key: "retirer-ligne",
        label: "Retirer la ligne",
        from: ["brouillon", "validee"],
        description:
          "Action future : retirer la ligne proprement, avec correction stock si nécessaire.",
        requiresConfirmation: true,
      },
    ],
    guidance: [
      {
        status: "brouillon",
        title: "Ligne en préparation",
        message:
          "Cette ligne n'est pas encore comptabilisée. Elle ne sortira pas du stock tant qu'elle n'est pas validée.",
        tone: "default",
      },
      {
        status: "validee",
        title: "Ligne confirmée",
        message:
          "Cette ligne est prise en compte dans l'intervention. Si c'est une pièce, le stock est traité par le runtime.",
        tone: "success",
      },
    ],
    technicalFields: [
      "stockMovementId",
      "stockProcessedAt",
      "stockProcessedQuantity",
      "factureId",
      "removedAt",
      "removedBy",
      "removedReason",
    ],
  },
];

function getPolicy(moduleKey: string): RuntimeStatusGovernancePolicy | undefined {
  return runtimeStatusPolicies.find(
    (policy) => policy.moduleKey === moduleKey
  );
}

function getCurrentStatus(
  policy: RuntimeStatusGovernancePolicy,
  record?: Record<string, unknown> | null
): string {
  const statusField = policy.statusField ?? "statut";

  return String(record?.[statusField] ?? "");
}

function filterActions(
  actions: RuntimeStatusActionDefinition[] | undefined,
  currentStatus: string
): RuntimeStatusActionDefinition[] {
  if (!actions || !currentStatus) return actions ?? [];

  return actions.filter((action) => action.from.includes(currentStatus));
}

function filterGuidance(
  guidance: RuntimeStatusGuidanceDefinition[] | undefined,
  currentStatus: string
): RuntimeStatusGuidanceDefinition[] {
  if (!guidance || !currentStatus) return guidance ?? [];

  return guidance.filter((item) => item.status === currentStatus);
}

function byVisibility(
  statuses: RuntimeStatusDefinition[],
  visibility: RuntimeStatusDefinition["visibility"]
): RuntimeStatusDefinition[] {
  return statuses.filter((status) => status.visibility === visibility);
}

export const RuntimeStatusGovernanceEngine = {
  getPolicy,

  listPolicies(): RuntimeStatusGovernancePolicy[] {
    return [...runtimeStatusPolicies];
  },

  resolve(
    context: RuntimeStatusGovernanceContext
  ): RuntimeStatusGovernanceResult | null {
    const policy = getPolicy(context.moduleKey);

    if (!policy) {
      return null;
    }

    const currentStatus = getCurrentStatus(policy, context.record);

    return {
      moduleKey: policy.moduleKey,
      statusField: policy.statusField ?? "statut",
      editMode: policy.editMode,
      visibleStatuses: byVisibility(policy.statuses, "visible"),
      technicalStatuses: byVisibility(policy.statuses, "technical"),
      hiddenStatuses: byVisibility(policy.statuses, "hidden"),
      actions: filterActions(policy.actions, currentStatus),
      guidance: filterGuidance(policy.guidance, currentStatus),
      technicalFields: policy.technicalFields ?? [],
    };
  },

  getVisibleStatusKeys(moduleKey: string): string[] {
    const policy = getPolicy(moduleKey);

    if (!policy) return [];

    return byVisibility(policy.statuses, "visible").map(
      (status) => status.key
    );
  },

  isStatusManuallyEditable(moduleKey: string): boolean {
    const policy = getPolicy(moduleKey);

    if (!policy) return true;

    return policy.editMode === "manual";
  },

  isTechnicalField(moduleKey: string, fieldKey: string): boolean {
    const policy = getPolicy(moduleKey);

    if (!policy) return false;

    return (policy.technicalFields ?? []).includes(fieldKey);
  },
};
`
);

write(
  indexPath,
`export type {
  RuntimeStatusActionDefinition,
  RuntimeStatusDefinition,
  RuntimeStatusEditMode,
  RuntimeStatusGovernanceContext,
  RuntimeStatusGovernancePolicy,
  RuntimeStatusGovernanceResult,
  RuntimeStatusGuidanceDefinition,
  RuntimeStatusVisibility,
} from "./RuntimeStatusGovernanceTypes";

export { RuntimeStatusGovernanceEngine } from "./RuntimeStatusGovernanceEngine";
`
);

console.log("");
console.log("[Q20H4A_DONE] RuntimeStatusGovernanceEngine foundation installée.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("");
console.log("Note:");
console.log("  Aucun branchement UI pour l'instant. Fondation seulement.");
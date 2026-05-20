const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
  console.log("[WRITTEN] " + path.relative(ROOT, filePath));
}

function assertProjectRoot() {
  if (!fs.existsSync(path.join(ROOT, "package.json")) || !fs.existsSync(path.join(ROOT, "src"))) {
    throw new Error("Ce script doit être lancé depuis la racine du projet Terragest.");
  }
}

function replaceOnce(content, search, replacement, label) {
  if (!content.includes(search)) {
    throw new Error("Bloc introuvable pour remplacement : " + label);
  }

  return content.replace(search, replacement);
}

assertProjectRoot();

const guardPath = path.join(
  ROOT,
  "src",
  "runtime",
  "guards",
  "processRuntimeBeforeMutationGuards.ts"
);

const mutationPath = path.join(
  ROOT,
  "src",
  "runtime",
  "firestore",
  "FirestoreRuntimeMutation.ts"
);

const guardContent = `import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  FirestoreRuntimeRepository,
} from "@/runtime/firestore/FirestoreRuntimeRepository";

import {
  RuntimeSchedulingEngine,
  type RuntimeRecord,
} from "@/runtime/scheduling/RuntimeSchedulingEngine";

export interface RuntimeBeforeMutationGuardContext {
  operation: "create" | "update";
  id?: string;
}

function asString(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return "";
}

function isRendezvousModule(module: ERPModule): boolean {
  return module.metadata.key === "rendezvous";
}

function hasRealAppointmentDateAndTime(record: RuntimeRecord): boolean {
  return Boolean(
    asString(record.dateRendezVous) &&
    asString(record.heureRendezVous)
  );
}

function isPublicAppointmentRequest(record: RuntimeRecord): boolean {
  const motif =
    asString(record.motif).toLowerCase();

  const commentaire =
    asString(record.commentaire).toLowerCase();

  const source =
    asString(record.source).toLowerCase();

  return (
    motif.includes("demande de rendez-vous depuis le site public") ||
    commentaire.includes("demande de rendez-vous depuis le site public") ||
    source === "public" ||
    source === "site_public"
  );
}

function sameRuntimeScope(
  candidate: RuntimeRecord,
  reference: RuntimeRecord
): boolean {
  const tenantCandidate =
    asString(candidate.tenantId);

  const tenantReference =
    asString(reference.tenantId);

  const workspaceCandidate =
    asString(candidate.workspace);

  const workspaceReference =
    asString(reference.workspace);

  if (
    tenantCandidate &&
    tenantReference &&
    tenantCandidate !== tenantReference
  ) {
    return false;
  }

  if (
    workspaceCandidate &&
    workspaceReference &&
    workspaceCandidate !== workspaceReference
  ) {
    return false;
  }

  return true;
}

async function loadExistingRendezvousForConflictCheck(
  module: ERPModule,
  reference: RuntimeRecord
): Promise<RuntimeRecord[]> {
  const records =
    await FirestoreRuntimeRepository.findMany(module);

  return records.filter((record) =>
    sameRuntimeScope(record, reference)
  );
}

async function loadCurrentRecordForUpdate(
  module: ERPModule,
  id: string | undefined
): Promise<RuntimeRecord> {
  if (!id) {
    return {};
  }

  const currentRecord =
    await FirestoreRuntimeRepository.findById(
      module,
      id
    );

  if (!currentRecord) {
    return {};
  }

  return currentRecord;
}

async function guardRendezvousMutation(
  module: ERPModule,
  data: RuntimeRecord,
  context: RuntimeBeforeMutationGuardContext
): Promise<RuntimeRecord> {
  const currentRecord =
    context.operation === "update"
      ? await loadCurrentRecordForUpdate(
          module,
          context.id
        )
      : {};

  const mergedRecord = {
    ...currentRecord,
    ...data,
    id:
      context.id ??
      data.id ??
      currentRecord.id,
  };

  if (
    !hasRealAppointmentDateAndTime(mergedRecord) &&
    isPublicAppointmentRequest(mergedRecord)
  ) {
    return data;
  }

  if (!hasRealAppointmentDateAndTime(mergedRecord)) {
    throw new Error(
      "Le rendez-vous doit avoir une date et une heure réelles avant sauvegarde."
    );
  }

  const normalizedRecord =
    RuntimeSchedulingEngine.normalizeAppointmentForScheduling(
      mergedRecord
    );

  const existingAppointments =
    await loadExistingRendezvousForConflictCheck(
      module,
      normalizedRecord
    );

  const conflict =
    RuntimeSchedulingEngine.assertNoAppointmentConflict(
      normalizedRecord,
      {
        existingAppointments,
        ignoreAppointmentId:
          context.id ??
          asString(normalizedRecord.id),
      }
    );

  if (!conflict.ok) {
    throw new Error(
      conflict.reason ??
      "Conflit de planning détecté."
    );
  }

  if (context.operation === "update") {
    return {
      ...data,
      durationMinutes:
        normalizedRecord.durationMinutes,
      startAt:
        normalizedRecord.startAt,
      endAt:
        normalizedRecord.endAt,
    };
  }

  return normalizedRecord;
}

export async function processRuntimeBeforeMutationGuards(
  module: ERPModule,
  data: Record<string, unknown>,
  context: RuntimeBeforeMutationGuardContext
): Promise<Record<string, unknown>> {
  if (!isRendezvousModule(module)) {
    return data;
  }

  if (
    context.operation !== "create" &&
    context.operation !== "update"
  ) {
    return data;
  }

  return guardRendezvousMutation(
    module,
    data,
    context
  );
}
`;

writeFile(guardPath, guardContent);

let mutationContent = readFile(mutationPath);

if (!mutationContent.includes("@/runtime/guards/processRuntimeBeforeMutationGuards")) {
  mutationContent = replaceOnce(
    mutationContent,
    `import {
  ERPSessionContext,
} from "@/runtime/security/sessions/ERPSessionContext";
`,
    `import {
  ERPSessionContext,
} from "@/runtime/security/sessions/ERPSessionContext";

import {
  processRuntimeBeforeMutationGuards,
} from "@/runtime/guards/processRuntimeBeforeMutationGuards";
`,
    "import processRuntimeBeforeMutationGuards"
  );
}

mutationContent = replaceOnce(
  mutationContent,
  `    const safeData =
      sanitizeFirestoreData(
        computedData
      );

    const result =
      await FirestoreRuntimeRepository.create(
        module,
        safeData
      );
`,
  `    const guardedData =
      await processRuntimeBeforeMutationGuards(
        module,
        computedData,
        {
          operation: "create",
        }
      );

    const safeData =
      sanitizeFirestoreData(
        guardedData
      );

    const result =
      await FirestoreRuntimeRepository.create(
        module,
        safeData
      );
`,
  "create before mutation guard"
);

mutationContent = replaceOnce(
  mutationContent,
  `    const safeData =
      sanitizeFirestoreData(
        computedData
      );

    const result =
      await FirestoreRuntimeRepository.update(
        module,
        id,
        safeData
      );
`,
  `    const guardedData =
      await processRuntimeBeforeMutationGuards(
        module,
        computedData,
        {
          operation: "update",
          id,
        }
      );

    const safeData =
      sanitizeFirestoreData(
        guardedData
      );

    const result =
      await FirestoreRuntimeRepository.update(
        module,
        id,
        safeData
      );
`,
  "update before mutation guard"
);

writeFile(mutationPath, mutationContent);

console.log("");
console.log("[OK] PASS 2N-Q13D installé.");
console.log("");
console.log("Prochaines commandes :");
console.log("node .\\scripts\\runtime\\check-encoding.cjs");
console.log("pnpm build");
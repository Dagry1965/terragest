/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(...parts) {
  return path.join(root, ...parts);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file, suffix) {
  if (!fs.existsSync(file)) {
    return;
  }

  const target = `${file}.bak-${suffix}`;

  if (!fs.existsSync(target)) {
    fs.copyFileSync(file, target);
    console.log(`[BACKUP] ${path.relative(root, target)}`);
  }
}

function replaceOnce(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error(`[${label}] pattern introuvable`);
  }

  return content.replace(from, to);
}

function createChronologyGuard() {
  const file = p("src", "runtime", "guards", "RuntimeChronologyGuard.ts");

  const content = `import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  FirestoreRuntimeRepository,
} from "@/runtime/firestore/FirestoreRuntimeRepository";

import {
  allERPModules,
} from "@/runtime/modules/definitions/coreModules";

type RuntimeRecord = Record<string, unknown>;

export interface RuntimeChronologyGuardContext {
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

function asDateOnly(value: unknown): string {
  const text = asString(value);

  if (!text) {
    return "";
  }

  return text.includes("T")
    ? text.split("T")[0] ?? ""
    : text;
}

function compareDateOnly(
  left: unknown,
  right: unknown
): number {
  const leftDate = asDateOnly(left);
  const rightDate = asDateOnly(right);

  if (!leftDate || !rightDate) {
    return 0;
  }

  return leftDate.localeCompare(rightDate);
}

function getModuleByKey(
  moduleKey: string
): ERPModule | null {
  return (
    allERPModules.find(
      (item) => item.metadata.key === moduleKey
    ) ?? null
  );
}

async function loadCurrentRecord(
  module: ERPModule,
  id?: string
): Promise<RuntimeRecord> {
  if (!id) {
    return {};
  }

  return (
    await FirestoreRuntimeRepository.findById(
      module,
      id
    )
  ) ?? {};
}

async function loadRelatedRecord(
  moduleKey: string,
  id: unknown
): Promise<RuntimeRecord | null> {
  const recordId =
    asString(id);

  if (!recordId) {
    return null;
  }

  const module =
    getModuleByKey(moduleKey);

  if (!module) {
    return null;
  }

  return FirestoreRuntimeRepository.findById(
    module,
    recordId
  );
}

async function guardInterventionChronology(
  record: RuntimeRecord
): Promise<void> {
  const rendezVousId =
    asString(record.rendezVousId);

  if (!rendezVousId) {
    return;
  }

  const rendezvous =
    await loadRelatedRecord(
      "rendezvous",
      rendezVousId
    );

  if (!rendezvous) {
    return;
  }

  const dateIntervention =
    asDateOnly(record.dateIntervention);

  const dateRendezVous =
    asDateOnly(rendezvous.dateRendezVous);

  if (
    dateIntervention &&
    dateRendezVous &&
    compareDateOnly(dateIntervention, dateRendezVous) < 0
  ) {
    throw new Error(
      "Chronologie incohérente : la date d'intervention ne peut pas être antérieure à la date du rendez-vous."
    );
  }
}

async function guardFactureChronology(
  record: RuntimeRecord
): Promise<void> {
  const interventionId =
    asString(record.interventionId);

  if (!interventionId) {
    return;
  }

  const intervention =
    await loadRelatedRecord(
      "interventionsauto",
      interventionId
    );

  if (!intervention) {
    return;
  }

  const dateFacture =
    asDateOnly(record.dateFacture);

  const dateIntervention =
    asDateOnly(intervention.dateIntervention);

  if (
    dateFacture &&
    dateIntervention &&
    compareDateOnly(dateFacture, dateIntervention) < 0
  ) {
    throw new Error(
      "Chronologie incohérente : la date de facture ne peut pas être antérieure à la date d'intervention."
    );
  }
}

async function guardEncaissementChronology(
  record: RuntimeRecord
): Promise<void> {
  const factureId =
    asString(record.factureId);

  if (!factureId) {
    return;
  }

  const facture =
    await loadRelatedRecord(
      "facturesauto",
      factureId
    );

  if (!facture) {
    return;
  }

  const datePaiement =
    asDateOnly(record.datePaiement);

  const dateFacture =
    asDateOnly(facture.dateFacture);

  if (
    datePaiement &&
    dateFacture &&
    compareDateOnly(datePaiement, dateFacture) < 0
  ) {
    throw new Error(
      "Chronologie incohérente : la date de paiement ne peut pas être antérieure à la date de facture."
    );
  }
}

export async function guardRuntimeChronologyMutation(
  module: ERPModule,
  data: RuntimeRecord,
  context: RuntimeChronologyGuardContext
): Promise<RuntimeRecord> {
  if (
    context.operation !== "create" &&
    context.operation !== "update"
  ) {
    return data;
  }

  const currentRecord =
    context.operation === "update"
      ? await loadCurrentRecord(
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

  if (module.metadata.key === "interventionsauto") {
    await guardInterventionChronology(mergedRecord);
  }

  if (module.metadata.key === "facturesauto") {
    await guardFactureChronology(mergedRecord);
  }

  if (module.metadata.key === "encaissementsauto") {
    await guardEncaissementChronology(mergedRecord);
  }

  return data;
}
`;

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function patchProcessGuards() {
  const file = p("src", "runtime", "guards", "processRuntimeBeforeMutationGuards.ts");

  backup(file, "q18f2-chronology-pipeline");

  let content = read(file);

  if (!content.includes("guardRuntimeChronologyMutation")) {
    content = replaceOnce(
      content,
      `import {
  RuntimeSchedulingEngine,
  type RuntimeRecord,
} from "@/runtime/scheduling/RuntimeSchedulingEngine";`,
      `import {
  RuntimeSchedulingEngine,
  type RuntimeRecord,
} from "@/runtime/scheduling/RuntimeSchedulingEngine";

import {
  guardRuntimeChronologyMutation,
} from "./RuntimeChronologyGuard";`,
      "add chronology import"
    );
  }

  const oldFunction = `export async function processRuntimeBeforeMutationGuards(
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
}`;

  const newFunction = `export async function processRuntimeBeforeMutationGuards(
  module: ERPModule,
  data: Record<string, unknown>,
  context: RuntimeBeforeMutationGuardContext
): Promise<Record<string, unknown>> {
  if (
    context.operation !== "create" &&
    context.operation !== "update"
  ) {
    return data;
  }

  let guardedData =
    await guardParentChildContextMutation(
      module,
      data as RuntimeRecord
    );

  if (isRendezvousModule(module)) {
    guardedData =
      await guardRendezvousMutation(
        module,
        guardedData,
        context
      );
  }

  guardedData =
    await guardRuntimeChronologyMutation(
      module,
      guardedData,
      context
    );

  return guardedData;
}`;

  content = replaceOnce(
    content,
    oldFunction,
    newFunction,
    "replace processRuntimeBeforeMutationGuards pipeline"
  );

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function main() {
  console.log("");
  console.log("[PASS] 2N-Q18F2 - Install runtime chronology guard");

  createChronologyGuard();
  patchProcessGuards();

  console.log("");
  console.log("[Q18F2_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester paiement avant date facture");
}

main();
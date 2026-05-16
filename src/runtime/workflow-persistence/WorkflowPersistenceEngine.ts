import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import {
  db,
} from "@/infrastructure/firebase/firebase";

export interface WorkflowHistoryEntry {
  module: string;
  entityId: string;
  fromState: string;
  toState: string;
  action: string;
  user?: unknown;
  comment?: unknown;
  createdAt?: unknown;
}

function sanitizeFirestoreObject(
  data: Record<string, unknown>
): Record<string, unknown> {
  const safe: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) {
      continue;
    }

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      !(value instanceof Date)
    ) {
      safe[key] = sanitizeFirestoreObject(
        value as Record<string, unknown>
      );

      continue;
    }

    if (Array.isArray(value)) {
      safe[key] = value.filter(
        (item) => item !== undefined
      );

      continue;
    }

    safe[key] = value;
  }

  return safe;
}

function sanitizeWorkflowHistoryEntry(
  entry: WorkflowHistoryEntry
): Record<string, unknown> {
  return sanitizeFirestoreObject({
    module: entry.module,
    entityId: entry.entityId,
    fromState: entry.fromState,
    toState: entry.toState,
    action: entry.action,
    user: entry.user ?? "system",
    comment: entry.comment ?? null,
  });
}

export class WorkflowPersistenceEngine {
  static async persistTransition(
    entry: WorkflowHistoryEntry
  ) {
    const safeEntry =
      sanitizeWorkflowHistoryEntry(entry);

    await addDoc(
      collection(
        db,
        "workflow_history"
      ),
      {
        ...safeEntry,
        createdAt: serverTimestamp(),
      }
    );

    return {
      success: true,
      entry: safeEntry,
    };
  }
}
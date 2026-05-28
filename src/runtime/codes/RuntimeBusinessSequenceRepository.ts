import {
  doc,
  runTransaction,
} from "firebase/firestore";

import { runtimeFirestore } from "@/runtime/firebase/runtime-firestore";

export type RuntimeBusinessSequenceInput = {
  tenantId: string;
  workspaceId: string;
  moduleKey: string;
  year: number;
};

function sanitizeSegment(value: string): string {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "") || "default";
}

export class RuntimeBusinessSequenceRepository {
  static collectionName = "runtimeBusinessSequences";

  static buildSequenceId(input: RuntimeBusinessSequenceInput): string {
    return [
      sanitizeSegment(input.tenantId),
      sanitizeSegment(input.workspaceId),
      sanitizeSegment(input.moduleKey),
      String(input.year),
    ].join("__");
  }

  static async next(input: RuntimeBusinessSequenceInput): Promise<number> {
    const sequenceId = this.buildSequenceId(input);
    const ref = doc(runtimeFirestore, this.collectionName, sequenceId);

    return runTransaction(runtimeFirestore, async (transaction) => {
      const snapshot = await transaction.get(ref);
      const current = snapshot.exists()
        ? Number(snapshot.data().current ?? 0)
        : 0;

      const nextValue = current + 1;
      const now = Date.now();

      transaction.set(
        ref,
        {
          tenantId: input.tenantId,
          workspaceId: input.workspaceId,
          moduleKey: input.moduleKey,
          year: input.year,
          current: nextValue,
          updatedAt: now,
          createdAt: snapshot.exists()
            ? snapshot.data().createdAt ?? now
            : now,
        },
        { merge: true }
      );

      return nextValue;
    });
  }
}

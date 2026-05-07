Write-Host "=== TERRAGEST_V2 - SETUP FIRESTORE PERSISTENCE PROVIDER ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/persistence/providers" | Out-Null

@'
import {
  PersistenceProvider,
  RuntimeEvent,
  RuntimeJob,
  RuntimeMetric,
  RuntimeTimelineEntry,
  RuntimeTransaction,
} from "@/core/persistence/persistence-provider";

import {
  db,
} from "@/lib/firebase";

import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

export class FirestorePersistenceProvider
  implements PersistenceProvider
{
  async saveJob(
    job: RuntimeJob
  ) {
    await addDoc(
      collection(
        db,
        "erp_runtime_jobs"
      ),
      job
    );
  }

  async loadJobs() {
    const snapshot =
      await getDocs(
        collection(
          db,
          "erp_runtime_jobs"
        )
      );

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  }

  async saveEvent(
    event: RuntimeEvent
  ) {
    await addDoc(
      collection(
        db,
        "erp_runtime_events"
      ),
      event
    );
  }

  async loadEvents() {
    const snapshot =
      await getDocs(
        collection(
          db,
          "erp_runtime_events"
        )
      );

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  }

  async saveMetric(
    metric: RuntimeMetric
  ) {
    await addDoc(
      collection(
        db,
        "erp_runtime_metrics"
      ),
      metric
    );
  }

  async loadMetrics() {
    const snapshot =
      await getDocs(
        collection(
          db,
          "erp_runtime_metrics"
        )
      );

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  }

  async saveTimelineEntry(
    entry: RuntimeTimelineEntry
  ) {
    await addDoc(
      collection(
        db,
        "erp_runtime_timeline"
      ),
      entry
    );
  }

  async loadTimeline() {
    const snapshot =
      await getDocs(
        collection(
          db,
          "erp_runtime_timeline"
        )
      );

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  }

  async saveTransaction(
    transaction: RuntimeTransaction
  ) {
    await addDoc(
      collection(
        db,
        "erp_runtime_transactions"
      ),
      transaction
    );
  }

  async loadTransactions() {
    const snapshot =
      await getDocs(
        collection(
          db,
          "erp_runtime_transactions"
        )
      );

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );
  }
}
'@ | Set-Content "src/core/persistence/providers/firestore-persistence-provider.ts"

Write-Host "=== FIRESTORE PERSISTENCE PROVIDER créé avec succès ===" -ForegroundColor Green
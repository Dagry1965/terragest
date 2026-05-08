import { ERPStatCard } from "@/components/erp/ui";
import {
  ERPQueueStore,
  ERPDeadLetterStore,
  ERPCircuitBreaker,
} from "@/runtime/resilience";

export function ERPResilienceMetrics() {
  const jobs = ERPQueueStore.all();
  const completed = ERPQueueStore.byStatus("completed");
  const pending = ERPQueueStore.byStatus("pending");
  const running = ERPQueueStore.byStatus("running");
  const dlq = ERPDeadLetterStore.all();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      <ERPStatCard label="Jobs" value={jobs.length} helper="Total queue" />
      <ERPStatCard label="Pending" value={pending.length} helper="En attente" />
      <ERPStatCard label="Running" value={running.length} helper="En cours" />
      <ERPStatCard label="Completed" value={completed.length} helper="Termines" />
      <ERPStatCard label="DLQ" value={dlq.length} helper="Echecs isoles" />
      <ERPStatCard label="Circuit" value={ERPCircuitBreaker.currentState()} helper="Etat resilience" />
      <ERPStatCard label="Retries" value={jobs.reduce((total, job) => total + job.attempts, 0)} helper="Tentatives" />
      <ERPStatCard label="Runtime" value="Actif" helper="Worker simulation" />
    </div>
  );
}
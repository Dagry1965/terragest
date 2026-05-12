# Terragest_V2 - Runtime Duplications Audit

Generated: 2026-05-12 07:20:08

Files scanned: 2110

## Queue Engines

### Pattern: QueueStore

Matches: 20

- ${relative}:2 import { ERPQueueStore } from "@/runtime/resilience";
- ${relative}:5 const jobs = ERPQueueStore.all();
- ${relative}:3 ERPQueueStore,
- ${relative}:9 const jobs = ERPQueueStore.all();
- ${relative}:10 const completed = ERPQueueStore.byStatus("completed");
- ${relative}:11 const pending = ERPQueueStore.byStatus("pending");
- ${relative}:12 const running = ERPQueueStore.byStatus("running");
- ${relative}:5 import { ERPQueueStore } from "@/runtime/resilience";
- ${relative}:23 queueJobs: ERPQueueStore.all().length,
- ${relative}:3 class ERPQueueStoreClass {
- ${relative}:36 export const ERPQueueStore = new ERPQueueStoreClass();
- ${relative}:11 ERPQueueStore,
- ${relative}:12 } from "../queue/ERPQueueStore";
- ${relative}:52 ERPQueueStore.add(job);
- ${relative}:83 const job = ERPQueueStore.pending()[0];
- ${relative}:91 ERPQueueStore.update(job.id, {
- ${relative}:103 ERPQueueStore.update(job.id, {
- ${relative}:132 ERPQueueStore.update(job.id, failedJob);
- ${relative}:145 ERPQueueStore.update(job.id, {
- ${relative}:2 export * from "./queue/ERPQueueStore";

### Pattern: WorkflowQueue

Matches: 12

- ${relative}:3 import { WorkflowQueue }
- ${relative}:4 from "@/platform/execution/queue/WorkflowQueue";
- ${relative}:43 WorkflowQueue.dequeue();
- ${relative}:1 // src/platform/execution/queue/WorkflowQueue.ts
- ${relative}:14 class WorkflowQueueManager {
- ${relative}:48 export const WorkflowQueue =
- ${relative}:49 new WorkflowQueueManager();
- ${relative}:3 import { WorkflowQueue }
- ${relative}:4 from "@/platform/execution/queue/WorkflowQueue";
- ${relative}:18 WorkflowQueue.getJobs()
- ${relative}:6 from "@/platform/execution/queue/WorkflowQueue";
- ${relative}:6 from "@/platform/execution/queue/WorkflowQueue";

### Pattern: AutomationRuntimeQueue

Matches: 17

- ${relative}:8 AutomationRuntimeQueue,
- ${relative}:23 useState<AutomationRuntimeJob[]>(AutomationRuntimeQueue.all());
- ${relative}:32 setJobs([...AutomationRuntimeQueue.all()]);
- ${relative}:37 setJobs([...AutomationRuntimeQueue.all()]);
- ${relative}:3 import { AutomationRuntimeQueue } from "./AutomationRuntimeQueue";
- ${relative}:17 .map((rule) => AutomationRuntimeQueue.enqueue(rule));
- ${relative}:23 const jobs = AutomationRuntimeQueue.pending();
- ${relative}:29 return AutomationRuntimeQueue.all();
- ${relative}:39 const job = AutomationRuntimeQueue.enqueue(rule);
- ${relative}:5 import { AutomationRuntimeQueue } from "./AutomationRuntimeQueue";
- ${relative}:24 AutomationRuntimeQueue.update(job);
- ${relative}:34 return AutomationRuntimeQueue.update(job);
- ${relative}:40 return AutomationRuntimeQueue.moveToDeadLetter(job);
- ${relative}:45 return AutomationRuntimeQueue.update(job);
- ${relative}:9 export class AutomationRuntimeQueue {
- ${relative}:56 AutomationRuntimeQueue.update(job);
- ${relative}:13 export { AutomationRuntimeQueue } from "./AutomationRuntimeQueue";

### Pattern: RuntimeQueueRegistry

Matches: 9

- ${relative}:29 runtimeQueueRegistry,
- ${relative}:30 } from "./RuntimeQueueRegistry";
- ${relative}:118 return runtimeQueueRegistry.getJobs();
- ${relative}:10 runtimeQueueRegistry,
- ${relative}:11 } from "./RuntimeQueueRegistry";
- ${relative}:61 runtimeQueueRegistry.enqueue({
- ${relative}:18 export class RuntimeQueueRegistry {
- ${relative}:62 export const runtimeQueueRegistry =
- ${relative}:63 new RuntimeQueueRegistry();

### Pattern: ERPQueueStore

Matches: 20

- ${relative}:2 import { ERPQueueStore } from "@/runtime/resilience";
- ${relative}:5 const jobs = ERPQueueStore.all();
- ${relative}:3 ERPQueueStore,
- ${relative}:9 const jobs = ERPQueueStore.all();
- ${relative}:10 const completed = ERPQueueStore.byStatus("completed");
- ${relative}:11 const pending = ERPQueueStore.byStatus("pending");
- ${relative}:12 const running = ERPQueueStore.byStatus("running");
- ${relative}:5 import { ERPQueueStore } from "@/runtime/resilience";
- ${relative}:23 queueJobs: ERPQueueStore.all().length,
- ${relative}:3 class ERPQueueStoreClass {
- ${relative}:36 export const ERPQueueStore = new ERPQueueStoreClass();
- ${relative}:11 ERPQueueStore,
- ${relative}:12 } from "../queue/ERPQueueStore";
- ${relative}:52 ERPQueueStore.add(job);
- ${relative}:83 const job = ERPQueueStore.pending()[0];
- ${relative}:91 ERPQueueStore.update(job.id, {
- ${relative}:103 ERPQueueStore.update(job.id, {
- ${relative}:132 ERPQueueStore.update(job.id, failedJob);
- ${relative}:145 ERPQueueStore.update(job.id, {
- ${relative}:2 export * from "./queue/ERPQueueStore";

### Pattern: enqueueJob

Matches: 8

- ${relative}:2 enqueueJob,
- ${relative}:24 enqueueJob({
- ${relative}:37 enqueueJob({
- ${relative}:50 enqueueJob({
- ${relative}:89 enqueueJob({
- ${relative}:126 enqueueJob({
- ${relative}:31 export function enqueueJob(
- ${relative}:56 enqueueJob(

### Pattern: jobQueue

Matches: 7

- ${relative}:21 getJobQueue,
- ${relative}:29 getJobQueue();
- ${relative}:28 const jobQueue:
- ${relative}:55 jobQueue.push(runtimeJob);
- ${relative}:65 export function getJobQueue() {
- ${relative}:66 return jobQueue;
- ${relative}:70 return jobQueue.filter(

## Retry Engines

### Pattern: RetryEngine

Matches: 6

- ${relative}:6 export class RetryEngine {
- ${relative}:22 RetryEngine
- ${relative}:24 from "@/runtime/resilience/retry/RetryEngine";
- ${relative}:39 private retryEngine =
- ${relative}:40 new RetryEngine();
- ${relative}:101 await this.retryEngine.execute(

### Pattern: RetryPolicy

Matches: 11

- ${relative}:9 import { RetryPolicy }
- ${relative}:10 from "@/platform/resilience/RetryPolicy";
- ${relative}:90 await RetryPolicy.execute(
- ${relative}:1 // src/platform/resilience/RetryPolicy.ts
- ${relative}:3 export class RetryPolicy {
- ${relative}:1 export type ERPRetryPolicy = {
- ${relative}:7 export const DefaultERPRetryPolicy: ERPRetryPolicy = {
- ${relative}:15 policy: ERPRetryPolicy = DefaultERPRetryPolicy
- ${relative}:3 export * from "./retry/ERPRetryPolicy";
- ${relative}:1 export class RetryPolicy {
- ${relative}:23 "[RetryPolicy]",

### Pattern: runtimeRetryRegistry

Matches: 9

- ${relative}:33 runtimeRetryRegistry,
- ${relative}:34 } from "./RuntimeRetryRegistry";
- ${relative}:122 return runtimeRetryRegistry.getRetries();
- ${relative}:14 runtimeRetryRegistry,
- ${relative}:15 } from "./RuntimeRetryRegistry";
- ${relative}:75 runtimeRetryRegistry.registerRetry({
- ${relative}:16 export class RuntimeRetryRegistry {
- ${relative}:50 export const runtimeRetryRegistry =
- ${relative}:51 new RuntimeRetryRegistry();

### Pattern: retryJob

Matches: 7

- ${relative}:15 export async function retryJob(
- ${relative}:19 retryJob,
- ${relative}:62 await retryJob(job);
- ${relative}:71 retryJob(
- ${relative}:1 export interface RuntimeRetryJob {
- ${relative}:19 RuntimeRetryJob[] = [];
- ${relative}:22 job: RuntimeRetryJob

### Pattern: computeRetryDelay

Matches: 1

- ${relative}:13 export function computeRetryDelay(

## Dead Letter Queues

### Pattern: DeadLetterQueue

Matches: 31

- ${relative}:9 const deadLetterQueue:
- ${relative}:15 deadLetterQueue.unshift(job);
- ${relative}:37 return deadLetterQueue;
- ${relative}:44 deadLetterQueue.find(
- ${relative}:12 import { DeadLetterQueue }
- ${relative}:13 from "@/platform/resilience/DeadLetterQueue";
- ${relative}:101 DeadLetterQueue.add({
- ${relative}:3 import { DeadLetterQueue }
- ${relative}:4 from "@/platform/resilience/DeadLetterQueue";
- ${relative}:11 DeadLetterQueue
- ${relative}:1 // src/platform/resilience/DeadLetterQueue.ts
- ${relative}:12 class DeadLetterQueueManager {
- ${relative}:40 export const DeadLetterQueue =
- ${relative}:41 new DeadLetterQueueManager();
- ${relative}:37 runtimeDeadLetterQueue,
- ${relative}:38 } from "./RuntimeDeadLetterQueue";
- ${relative}:126 return runtimeDeadLetterQueue.getEvents();
- ${relative}:14 export class RuntimeDeadLetterQueue {
- ${relative}:47 export const runtimeDeadLetterQueue =
- ${relative}:48 new RuntimeDeadLetterQueue();
- ${relative}:18 runtimeDeadLetterQueue,
- ${relative}:19 } from "./RuntimeDeadLetterQueue";
- ${relative}:90 runtimeDeadLetterQueue.push({
- ${relative}:1 export class DeadLetterQueue {
- ${relative}:10 "[DeadLetterQueue]",
- ${relative}:18 export class DeadLetterQueue {
- ${relative}:27 DeadLetterQueue
- ${relative}:29 from "@/runtime/resilience/dlq/DeadLetterQueue";
- ${relative}:42 private deadLetterQueue =
- ${relative}:43 new DeadLetterQueue();
- ${relative}:171 await this.deadLetterQueue.store({

### Pattern: RuntimeDeadLetterQueue

Matches: 9

- ${relative}:37 runtimeDeadLetterQueue,
- ${relative}:38 } from "./RuntimeDeadLetterQueue";
- ${relative}:126 return runtimeDeadLetterQueue.getEvents();
- ${relative}:14 export class RuntimeDeadLetterQueue {
- ${relative}:47 export const runtimeDeadLetterQueue =
- ${relative}:48 new RuntimeDeadLetterQueue();
- ${relative}:18 runtimeDeadLetterQueue,
- ${relative}:19 } from "./RuntimeDeadLetterQueue";
- ${relative}:90 runtimeDeadLetterQueue.push({

### Pattern: ERPDeadLetterStore

Matches: 12

- ${relative}:2 import { ERPDeadLetterStore } from "@/runtime/resilience";
- ${relative}:5 const jobs = ERPDeadLetterStore.all();
- ${relative}:4 ERPDeadLetterStore,
- ${relative}:13 const dlq = ERPDeadLetterStore.all();
- ${relative}:2 import { ERPDeadLetterStore } from "@/runtime/resilience";
- ${relative}:8 const dlq = ERPDeadLetterStore.all();
- ${relative}:3 class ERPDeadLetterStoreClass {
- ${relative}:21 export const ERPDeadLetterStore = new ERPDeadLetterStoreClass();
- ${relative}:15 ERPDeadLetterStore,
- ${relative}:16 } from "../dlq/ERPDeadLetterStore";
- ${relative}:133 ERPDeadLetterStore.add(failedJob);
- ${relative}:4 export * from "./dlq/ERPDeadLetterStore";

### Pattern: deadLetter

Matches: 77

- ${relative}:2 import { ERPDeadLetterStore } from "@/runtime/resilience";
- ${relative}:5 const jobs = ERPDeadLetterStore.all();
- ${relative}:4 ERPDeadLetterStore,
- ${relative}:13 const dlq = ERPDeadLetterStore.all();
- ${relative}:9 interface ERPRuntimeDeadLetter {
- ${relative}:18 interface ERPRuntimeDeadLetterPanelProps {
- ${relative}:20 deadLetters:
- ${relative}:21 ERPRuntimeDeadLetter[];
- ${relative}:24 export function ERPRuntimeDeadLetterPanel({
- ${relative}:25 deadLetters,
- ${relative}:26 }: ERPRuntimeDeadLetterPanelProps) {
- ${relative}:59 deadLetters.map(
- ${relative}:18 ERPRuntimeDeadLetterPanel,
- ${relative}:119 <ERPRuntimeDeadLetterPanel
- ${relative}:120 deadLetters={[
- ${relative}:9 export * from "./ERPRuntimeDeadLetterPanel";
- ${relative}:9 const deadLetterQueue:
- ${relative}:15 deadLetterQueue.unshift(job);
- ${relative}:37 return deadLetterQueue;
- ${relative}:44 deadLetterQueue.find(
- ${relative}:7 import DeadLetterPanel
- ${relative}:8 from "../widgets/DeadLetterPanel";
- ${relative}:29 <DeadLetterPanel />
- ${relative}:14 deadLetters: 0,
- ${relative}:11 deadLetters: number;
- ${relative}:2 DeadLetterFeed() {
- ${relative}:2 DeadLetterPanel() {
- ${relative}:12 import { DeadLetterQueue }
- ${relative}:13 from "@/platform/resilience/DeadLetterQueue";
- ${relative}:101 DeadLetterQueue.add({
- ${relative}:3 import { DeadLetterQueue }
- ${relative}:4 from "@/platform/resilience/DeadLetterQueue";
- ${relative}:11 DeadLetterQueue
- ${relative}:1 // src/platform/resilience/DeadLetterQueue.ts
- ${relative}:12 class DeadLetterQueueManager {
- ${relative}:40 export const DeadLetterQueue =
- ${relative}:41 new DeadLetterQueueManager();
- ${relative}:40 return AutomationRuntimeQueue.moveToDeadLetter(job);
- ${relative}:7 const deadLetters: AutomationRuntimeJob[] = [];
- ${relative}:50 static moveToDeadLetter(job: AutomationRuntimeJob): AutomationRuntimeJob {
- ${relative}:54 deadLetters.unshift(job);
- ${relative}:61 static deadLetters(): AutomationRuntimeJob[] {
- ${relative}:62 return deadLetters;
- ${relative}:37 runtimeDeadLetterQueue,
- ${relative}:38 } from "./RuntimeDeadLetterQueue";
- ${relative}:125 getRuntimeDeadLetters() {
- ${relative}:126 return runtimeDeadLetterQueue.getEvents();
- ${relative}:1 export interface DeadLetterEvent {
- ${relative}:14 export class RuntimeDeadLetterQueue {
- ${relative}:17 DeadLetterEvent[] = [];
- ${relative}:20 event: DeadLetterEvent
- ${relative}:47 export const runtimeDeadLetterQueue =
- ${relative}:48 new RuntimeDeadLetterQueue();
- ${relative}:18 runtimeDeadLetterQueue,
- ${relative}:19 } from "./RuntimeDeadLetterQueue";
- ${relative}:84 pushDeadLetter(
- ${relative}:90 runtimeDeadLetterQueue.push({
- ${relative}:56 deadLetters:
- ${relative}:58 .getRuntimeDeadLetters(),
- ${relative}:1 export class DeadLetterQueue {
- ${relative}:10 "[DeadLetterQueue]",
- ${relative}:2 import { ERPDeadLetterStore } from "@/runtime/resilience";
- ${relative}:8 const dlq = ERPDeadLetterStore.all();
- ${relative}:10 export type DeadLetterEvent = {
- ${relative}:18 export class DeadLetterQueue {
- ${relative}:21 event: Omit<DeadLetterEvent, "createdAt">
- ${relative}:3 class ERPDeadLetterStoreClass {
- ${relative}:21 export const ERPDeadLetterStore = new ERPDeadLetterStoreClass();
- ${relative}:15 ERPDeadLetterStore,
- ${relative}:16 } from "../dlq/ERPDeadLetterStore";
- ${relative}:133 ERPDeadLetterStore.add(failedJob);
- ${relative}:4 export * from "./dlq/ERPDeadLetterStore";
- ${relative}:27 DeadLetterQueue
- ${relative}:29 from "@/runtime/resilience/dlq/DeadLetterQueue";
- ${relative}:42 private deadLetterQueue =
- ${relative}:43 new DeadLetterQueue();
- ${relative}:171 await this.deadLetterQueue.store({

### Pattern: DLQ

Matches: 20

- ${relative}:4 export function ERPDLQPanel() {
- ${relative}:20 title="Aucune DLQ"
- ${relative}:13 const dlq = ERPDeadLetterStore.all();
- ${relative}:21 <ERPStatCard label="DLQ" value={dlq.length} helper="Echecs isoles" />
- ${relative}:6 import { ERPDLQPanel } from "./ERPDLQPanel";
- ${relative}:15 title="Queue, Retry & DLQ Runtime"
- ${relative}:23 <ERPDLQPanel />
- ${relative}:3 export * from "./ERPDLQPanel";
- ${relative}:21 "[DLQ]",
- ${relative}:68 DLQ_EVENT_STORED:
- ${relative}:69 "DLQ_EVENT_STORED",
- ${relative}:8 const dlq = ERPDeadLetterStore.all();
- ${relative}:14 dlq,
- ${relative}:19 dlq.length +
- ${relative}:27 { id: "queue", label: "Queue / DLQ", group: "runtime" },
- ${relative}:16 } from "../dlq/ERPDeadLetterStore";
- ${relative}:137 id: createId("alert_dlq"),
- ${relative}:139 title: "Job envoye en DLQ",
- ${relative}:4 export * from "./dlq/ERPDeadLetterStore";
- ${relative}:29 from "@/runtime/resilience/dlq/DeadLetterQueue";

## Policy Engines

### Pattern: PolicyEngine

Matches: 25

- ${relative}:7 export class PolicyEngine {
- ${relative}:2 ArchitecturePolicyEngine {
- ${relative}:2 ArchitecturePolicyEngine
- ${relative}:4 from "./policies/ArchitecturePolicyEngine";
- ${relative}:35 new ArchitecturePolicyEngine();
- ${relative}:14 export class ERPPolicyEngine {
- ${relative}:67 export const erpPolicyEngine =
- ${relative}:68 new ERPPolicyEngine();
- ${relative}:2 erpPolicyEngine,
- ${relative}:3 } from "./ERPPolicyEngine";
- ${relative}:14 return erpPolicyEngine
- ${relative}:1 export * from "./ERPPolicyEngine";
- ${relative}:7 export class PolicyEngine {
- ${relative}:2 PolicyEngine
- ${relative}:4 from "@/platform/policies/engine/PolicyEngine";
- ${relative}:30 new PolicyEngine();
- ${relative}:6 export { RuntimePolicyEngine } from "./RuntimePolicyEngine";
- ${relative}:3 import { RuntimePolicyEngine } from "./RuntimePolicyEngine";
- ${relative}:15 return RuntimePolicyEngine.can(user, permission);
- ${relative}:5 export class RuntimePolicyEngine {
- ${relative}:22 return RuntimePolicyEngine.can(user, item.permission);
- ${relative}:2 import { RuntimePolicyEngine } from "./RuntimePolicyEngine";
- ${relative}:8 return RuntimePolicyEngine.can(user, "workflow.start");
- ${relative}:14 return RuntimePolicyEngine.can(user, "workflow.transition");
- ${relative}:20 return RuntimePolicyEngine.can(user, "workflow.validate");

### Pattern: RuntimePolicyEngine

Matches: 9

- ${relative}:6 export { RuntimePolicyEngine } from "./RuntimePolicyEngine";
- ${relative}:3 import { RuntimePolicyEngine } from "./RuntimePolicyEngine";
- ${relative}:15 return RuntimePolicyEngine.can(user, permission);
- ${relative}:5 export class RuntimePolicyEngine {
- ${relative}:22 return RuntimePolicyEngine.can(user, item.permission);
- ${relative}:2 import { RuntimePolicyEngine } from "./RuntimePolicyEngine";
- ${relative}:8 return RuntimePolicyEngine.can(user, "workflow.start");
- ${relative}:14 return RuntimePolicyEngine.can(user, "workflow.transition");
- ${relative}:20 return RuntimePolicyEngine.can(user, "workflow.validate");

### Pattern: ERPPolicyEngine

Matches: 7

- ${relative}:14 export class ERPPolicyEngine {
- ${relative}:67 export const erpPolicyEngine =
- ${relative}:68 new ERPPolicyEngine();
- ${relative}:2 erpPolicyEngine,
- ${relative}:3 } from "./ERPPolicyEngine";
- ${relative}:14 return erpPolicyEngine
- ${relative}:1 export * from "./ERPPolicyEngine";

### Pattern: PolicyRegistry

Matches: 28

- ${relative}:8 import { PolicyRegistry }
- ${relative}:9 from "@/platform/governance/policies/registry/PolicyRegistry";
- ${relative}:18 PolicyRegistry
- ${relative}:1 // src/platform/governance/policies/registry/PolicyRegistry.ts
- ${relative}:8 class PolicyRegistryManager {
- ${relative}:39 export const PolicyRegistry =
- ${relative}:40 new PolicyRegistryManager();
- ${relative}:3 import { PolicyRegistry }
- ${relative}:4 from "@/platform/governance/policies/registry/PolicyRegistry";
- ${relative}:11 PolicyRegistry.register(
- ${relative}:53 runtimePolicyRegistry,
- ${relative}:54 } from "./RuntimePolicyRegistry";
- ${relative}:142 return runtimePolicyRegistry.getPolicies();
- ${relative}:14 export class RuntimePolicyRegistry {
- ${relative}:50 export const runtimePolicyRegistry =
- ${relative}:51 new RuntimePolicyRegistry();
- ${relative}:3 export const ERPProductionPolicyRegistry: ERPProductionPolicy[] = [
- ${relative}:1 import { ERPProductionPolicyRegistry } from "../governance/ERPProductionPolicyRegistry";
- ${relative}:8 const policies = ERPProductionPolicyRegistry;
- ${relative}:4 import { ERPPolicyRegistry } from "../policies/ERPPolicyRegistry";
- ${relative}:19 ERPPolicyRegistry.find(
- ${relative}:38 export const ERPPolicyRegistry: ERPPolicy[] =
- ${relative}:3 import { ERPPolicyRegistry } from "./policies/ERPPolicyRegistry";
- ${relative}:14 policies: ERPPolicyRegistry,
- ${relative}:19 policiesCount: ERPPolicyRegistry.length,
- ${relative}:6 export * from "./policies/ERPPolicyRegistry";
- ${relative}:5 export { runtimeRolePermissions } from "./RuntimePolicyRegistry";
- ${relative}:3 import { runtimeRolePermissions } from "./RuntimePolicyRegistry";

### Pattern: ExecutionPolicy

Matches: 5

- ${relative}:18 import { ExecutionPolicy }
- ${relative}:19 from "@/platform/security/ExecutionPolicy";
- ${relative}:60 ExecutionPolicy.canExecute({
- ${relative}:1 // src/platform/security/ExecutionPolicy.ts
- ${relative}:12 export class ExecutionPolicy {

### Pattern: SecurityPolicy

Matches: 7

- ${relative}:22 import { RuleSecurityPolicy }
- ${relative}:23 from "@/platform/rules/security/RuleSecurityPolicy";
- ${relative}:75 RuleSecurityPolicy
- ${relative}:1 // src/platform/rules/security/RuleSecurityPolicy.ts
- ${relative}:8 export class RuleSecurityPolicy {
- ${relative}:1 export const SecurityPolicy = {
- ${relative}:6 "[SecurityPolicy]"

## Tenant Engines

### Pattern: TenantRegistry

Matches: 28

- ${relative}:15 ERPTenantRegistryPanel,
- ${relative}:16 } from "./ERPTenantRegistryPanel";
- ${relative}:44 <ERPTenantRegistryPanel
- ${relative}:18 export function ERPTenantRegistryPanel({
- ${relative}:2 export * from "./ERPTenantRegistryPanel";
- ${relative}:14 const tenantRegistry:
- ${relative}:21 tenantRegistry.find(
- ${relative}:31 tenantRegistry.push(
- ${relative}:58 return tenantRegistry;
- ${relative}:1 // src/platform/governance/tenants/TenantRegistry.ts
- ${relative}:3 class TenantRegistryManager {
- ${relative}:34 export const TenantRegistry =
- ${relative}:35 new TenantRegistryManager();
- ${relative}:3 import { ERPTenantRegistry } from "@/runtime/tenant";
- ${relative}:10 const tenants = ERPTenantRegistry;
- ${relative}:2 import { ERPTenantRegistry } from "@/runtime/tenant";
- ${relative}:20 tenants: ERPTenantRegistry.length,
- ${relative}:4 ERPTenantRegistry,
- ${relative}:5 } from "../registry/ERPTenantRegistry";
- ${relative}:8 ERPTenantRegistry[0];
- ${relative}:22 ERPTenantRegistry.find(
- ${relative}:3 export const ERPTenantRegistry: ERPTenant[] = [
- ${relative}:2 ERPTenantRegistry,
- ${relative}:3 } from "./registry/ERPTenantRegistry";
- ${relative}:23 ERPTenantRegistry,
- ${relative}:34 ERPTenantRegistry.length,
- ${relative}:37 ERPTenantRegistry.filter(
- ${relative}:2 export * from "./registry/ERPTenantRegistry";

### Pattern: ERPTenantRegistry

Matches: 20

- ${relative}:15 ERPTenantRegistryPanel,
- ${relative}:16 } from "./ERPTenantRegistryPanel";
- ${relative}:44 <ERPTenantRegistryPanel
- ${relative}:18 export function ERPTenantRegistryPanel({
- ${relative}:2 export * from "./ERPTenantRegistryPanel";
- ${relative}:3 import { ERPTenantRegistry } from "@/runtime/tenant";
- ${relative}:10 const tenants = ERPTenantRegistry;
- ${relative}:2 import { ERPTenantRegistry } from "@/runtime/tenant";
- ${relative}:20 tenants: ERPTenantRegistry.length,
- ${relative}:4 ERPTenantRegistry,
- ${relative}:5 } from "../registry/ERPTenantRegistry";
- ${relative}:8 ERPTenantRegistry[0];
- ${relative}:22 ERPTenantRegistry.find(
- ${relative}:3 export const ERPTenantRegistry: ERPTenant[] = [
- ${relative}:2 ERPTenantRegistry,
- ${relative}:3 } from "./registry/ERPTenantRegistry";
- ${relative}:23 ERPTenantRegistry,
- ${relative}:34 ERPTenantRegistry.length,
- ${relative}:37 ERPTenantRegistry.filter(
- ${relative}:2 export * from "./registry/ERPTenantRegistry";

### Pattern: TenantContext

Matches: 32

- ${relative}:13 TenantContextType,
- ${relative}:35 const TenantContext =
- ${relative}:77 <TenantContext.Provider
- ${relative}:81 </TenantContext.Provider>
- ${relative}:85 export const useTenantContext =
- ${relative}:89 TenantContext
- ${relative}:4 useTenantContext,
- ${relative}:9 return useTenantContext();
- ${relative}:7 export type TenantContextType = {
- ${relative}:30 ): TenantContextType {
- ${relative}:9 const TenantContext =
- ${relative}:29 <TenantContext.Provider
- ${relative}:38 </TenantContext.Provider>
- ${relative}:43 () => useContext(TenantContext);
- ${relative}:2 ERPTenantContext,
- ${relative}:29 ERPTenantContext.current();
- ${relative}:53 ERPTenantContext.current();
- ${relative}:63 ERPTenantContext.current();
- ${relative}:10 export const ERPTenantContext = {
- ${relative}:2 ERPTenantContext,
- ${relative}:3 } from "../context/ERPTenantContext";
- ${relative}:12 ERPTenantContext.current();
- ${relative}:6 ERPTenantContext,
- ${relative}:7 } from "./context/ERPTenantContext";
- ${relative}:16 ERPTenantContext.current();
- ${relative}:4 export * from "./context/ERPTenantContext";
- ${relative}:8 interface TenantContextValue {
- ${relative}:15 const TenantContext =
- ${relative}:17 TenantContextValue | null
- ${relative}:28 <TenantContext.Provider
- ${relative}:41 </TenantContext.Provider>
- ${relative}:50 TenantContext

### Pattern: ERPTenantContext

Matches: 12

- ${relative}:2 ERPTenantContext,
- ${relative}:29 ERPTenantContext.current();
- ${relative}:53 ERPTenantContext.current();
- ${relative}:63 ERPTenantContext.current();
- ${relative}:10 export const ERPTenantContext = {
- ${relative}:2 ERPTenantContext,
- ${relative}:3 } from "../context/ERPTenantContext";
- ${relative}:12 ERPTenantContext.current();
- ${relative}:6 ERPTenantContext,
- ${relative}:7 } from "./context/ERPTenantContext";
- ${relative}:16 ERPTenantContext.current();
- ${relative}:4 export * from "./context/ERPTenantContext";

### Pattern: TenantManager

Matches: 1

- ${relative}:1 export class TenantManager {

### Pattern: TenantService

Matches: 8

- ${relative}:12 TenantService,
- ${relative}:14 } from "@/features/tenancy/services/TenantService";
- ${relative}:63 ...TenantService.buildContext(
- ${relative}:25 export const TenantService = {
- ${relative}:2 TenantService,
- ${relative}:3 } from "@/saas/tenants/TenantService";
- ${relative}:20 TenantService.resolveTenant(
- ${relative}:1 export const TenantService = {

### Pattern: tenantId

Matches: 81

- ${relative}:25 key={quota.tenantId}
- ${relative}:29 {quota.tenantId}
- ${relative}:21 <ERPStatCard label="Tenant" value={snapshot.session.tenantId ?? "default"} helper="Isolation preparee" />
- ${relative}:10 tenantId?: string;
- ${relative}:65 tenantId: string
- ${relative}:69 entry.tenantId ===
- ${relative}:70 tenantId
- ${relative}:22 tenantId: string;
- ${relative}:64 tenantId:
- ${relative}:65 exploitation.tenantId,
- ${relative}:49 tenantId:
- ${relative}:21 tenantId: string
- ${relative}:43 "tenantId",
- ${relative}:45 tenantId
- ${relative}:81 }, [tenantId]);
- ${relative}:26 tenantId: string
- ${relative}:63 "tenantId",
- ${relative}:65 tenantId
- ${relative}:131 "tenantId",
- ${relative}:133 tenantId
- ${relative}:192 }, [tenantId]);
- ${relative}:88 tenantId: string,
- ${relative}:95 "tenantId",
- ${relative}:97 tenantId
- ${relative}:7 tenantId:
- ${relative}:5 tenantId: string;
- ${relative}:29 tenantId: "tenant-demo",
- ${relative}:90 tenantId:
- ${relative}:91 invitation.tenantId,
- ${relative}:22 tenantId: string;
- ${relative}:16 tenantId: string;
- ${relative}:18 tenantId: string;
- ${relative}:19 tenantId: "tenant-demo",
- ${relative}:27 tenantId: "tenant-farm",
- ${relative}:15 tenantId:
- ${relative}:38 tenantId:
- ${relative}:39 organization?.tenantId || null,
- ${relative}:4 tenantId?: string;
- ${relative}:2 tenantId?: string;
- ${relative}:4 tenantId: string
- ${relative}:9 tenantId
- ${relative}:7 tenantId: string
- ${relative}:11 tenantId;
- ${relative}:15 tenantId
- ${relative}:20 item.tenantId === record.tenantId &&
- ${relative}:28 item.tenantId === record.tenantId &&
- ${relative}:47 tenantId: string
- ${relative}:52 record.tenantId === tenantId
- ${relative}:58 tenantId: string,
- ${relative}:64 record.tenantId === tenantId &&
- ${relative}:3 tenantId: string;
- ${relative}:18 tenantId: string
- ${relative}:23 tenantId: string,
- ${relative}:36 tenantId: tenant.id,
- ${relative}:2 tenantId: string;
- ${relative}:5 tenantId: "tenant_demo",
- ${relative}:13 tenantId: "tenant_agricorp",
- ${relative}:21 tenantId: "tenant_farmgroup",
- ${relative}:7 tenantId?: string;
- ${relative}:7 tenantId: "default",
- ${relative}:8 tenantId?: string;
- ${relative}:18 tenantId: string
- ${relative}:24 item.id === tenantId
- ${relative}:2 tenantId: string;
- ${relative}:17 item.tenantId === metrics.tenantId
- ${relative}:25 item.tenantId === metrics.tenantId
- ${relative}:42 tenantId: string
- ${relative}:47 item.tenantId === tenantId
- ${relative}:16 tenantId: "tenant_demo",
- ${relative}:26 tenantId: "tenant_agricorp",
- ${relative}:36 tenantId: "tenant_farmgroup",
- ${relative}:113 tenantId: "tenant_demo",
- ${relative}:16 tenantId: string
- ${relative}:21 tenantId
- ${relative}:26 tenantId
- ${relative}:4 tenantId: string
- ${relative}:9 tenantId,
- ${relative}:4 tenantId: string
- ${relative}:9 id: tenantId,
- ${relative}:10 tenantId: string;
- ${relative}:31 tenantId:

## Governance Engines

### Pattern: GovernanceRuntime

Matches: 7

- ${relative}:1 // src/platform/governance/GovernanceRuntime.ts
- ${relative}:17 export class GovernanceRuntime {
- ${relative}:26 import { GovernanceRuntime }
- ${relative}:27 from "@/platform/governance/GovernanceRuntime";
- ${relative}:35 GovernanceRuntime.validate({
- ${relative}:150 GovernanceRuntime.validate({
- ${relative}:226 GovernanceRuntime.validate({

### Pattern: EnterpriseRuntimeGovernance

Matches: 9

- ${relative}:4 import { EnterpriseRuntimeGovernancePanel } from "./EnterpriseRuntimeGovernancePanel";
- ${relative}:23 <EnterpriseRuntimeGovernancePanel />
- ${relative}:2 import { EnterpriseRuntimeGovernance } from "@/runtime/enterprise-runtime";
- ${relative}:4 export function EnterpriseRuntimeGovernancePanel() {
- ${relative}:5 const checks = EnterpriseRuntimeGovernance.checks();
- ${relative}:3 export { EnterpriseRuntimeGovernancePanel } from "./EnterpriseRuntimeGovernancePanel";
- ${relative}:7 export class EnterpriseRuntimeGovernance {
- ${relative}:8 export { EnterpriseRuntimeGovernance } from "./EnterpriseRuntimeGovernance";
- ${relative}:9 export type { EnterpriseGovernanceCheck } from "./EnterpriseRuntimeGovernance";

### Pattern: GovernanceEngine

Matches: 8

- ${relative}:19 import { GovernanceEngine }
- ${relative}:20 from "../os/governance/GovernanceEngine";
- ${relative}:57 new GovernanceEngine();
- ${relative}:32 EnterpriseGovernanceEngine {
- ${relative}:2 EnterpriseGovernanceEngine
- ${relative}:4 from "./EnterpriseGovernanceEngine";
- ${relative}:7 new EnterpriseGovernanceEngine();
- ${relative}:1 export class GovernanceEngine {

### Pattern: EnterpriseGovernanceEngine

Matches: 4

- ${relative}:32 EnterpriseGovernanceEngine {
- ${relative}:2 EnterpriseGovernanceEngine
- ${relative}:4 from "./EnterpriseGovernanceEngine";
- ${relative}:7 new EnterpriseGovernanceEngine();

### Pattern: RuntimePoliciesEngine

Matches: 5

- ${relative}:1 // src/platform/governance/policies/engine/RuntimePoliciesEngine.ts
- ${relative}:11 export class RuntimePoliciesEngine {
- ${relative}:14 import { RuntimePoliciesEngine }
- ${relative}:15 from "@/platform/governance/policies/engine/RuntimePoliciesEngine";
- ${relative}:48 RuntimePoliciesEngine.validate(


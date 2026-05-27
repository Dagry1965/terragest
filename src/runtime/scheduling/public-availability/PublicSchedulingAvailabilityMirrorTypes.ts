export type PublicSchedulingAvailabilitySourceRecord =
  Record<string, unknown>;

export type PublicSchedulingAvailabilityMirrorOperation =
  | "create"
  | "update"
  | "delete"
  | "sync";

export type PublicSchedulingAvailabilityLock = {
  tenantId: string;
  workspace: string;
  moduleKey: string;

  date: string;
  startTime: string;
  endTime: string;

  status?: string;
  blocking: boolean;
  capacityUsed: number;

  sourceModule: string;
  sourceRecordId: string;

  createdAt?: number;
  updatedAt?: number;
};

export type PublicSchedulingAvailabilityMirrorInput = {
  moduleKey: string;
  operation: PublicSchedulingAvailabilityMirrorOperation;
  record: PublicSchedulingAvailabilitySourceRecord;
};

export interface RuntimePublicSchedulingAvailabilityInput {
  tenantId?: string;
  workspaceId?: string;
  moduleKey?: string;
  startDate?: string;
  days?: number;
}

export interface RuntimePublicSchedulingSlot {
  date: string;
  startTime: string;
  endTime: string;
  label: string;
  available: boolean;
  remainingCapacity?: number;
  reason?: string;
}

export interface RuntimePublicSchedulingDay {
  date: string;
  label: string;
  slots: RuntimePublicSchedulingSlot[];
}

export interface RuntimePublicSchedulingAvailabilityResult {
  ok: true;
  days: RuntimePublicSchedulingDay[];
}

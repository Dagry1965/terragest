"use server";

import {
  RuntimePublicSchedulingAvailabilityService,
} from "./RuntimePublicSchedulingAvailabilityService";

import type {
  RuntimePublicSchedulingAvailabilityInput,
} from "./RuntimePublicSchedulingAvailabilityTypes";

export async function getPublicSchedulingAvailabilityAction(
  input: RuntimePublicSchedulingAvailabilityInput = {}
) {
  return RuntimePublicSchedulingAvailabilityService.getAvailability(input);
}

import {
  ERPEventBus,
} from "@/runtime/events/bus/ERPEventBus";

import {
  ERPTraceStore,
} from "../traces/ERPTraceStore";

import {
  ERPAlertStore,
} from "../alerts/ERPAlertStore";

export const ERPObservabilityTimeline = {

  events() {

    return ERPEventBus.getEvents();
  },

  traces() {

    return ERPTraceStore.all();
  },

  alerts() {

    return ERPAlertStore.all();
  },
};
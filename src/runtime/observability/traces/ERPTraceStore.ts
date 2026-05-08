import type {
  ERPTrace,
} from "./ERPTrace";

class ERPTraceStoreClass {

  private traces:
    ERPTrace[] = [];

  add(
    trace: ERPTrace
  ) {

    this.traces.unshift(trace);

    this.traces =
      this.traces.slice(0, 200);
  }

  all() {

    return this.traces;
  }
}

export const ERPTraceStore =
  new ERPTraceStoreClass();
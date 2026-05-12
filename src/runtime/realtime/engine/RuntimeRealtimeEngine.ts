import type { ERPModule } from "@/runtime/modules";
import { FirestoreRuntimeRealtime } from "@/runtime/firestore";

export type RuntimeRealtimePayload = {
  count: number;
};

export type RuntimeRealtimeCallback = (
  payload: RuntimeRealtimePayload
) => void;

export class RuntimeRealtimeEngine {
  static subscribe(
    module: ERPModule,
    callback: RuntimeRealtimeCallback
  ) {
    return FirestoreRuntimeRealtime.subscribe(
      module,
      (count) => {
        callback({
          count,
        });
      }
    );
  }
}
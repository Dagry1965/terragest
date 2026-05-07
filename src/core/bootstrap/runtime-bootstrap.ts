import {
  startWorkerLoop,
} from "@/core/worker-loop/worker-loop";

let runtimeStarted =
  false;

export async function bootstrapERP() {
  if (runtimeStarted) {
    return;
  }

  runtimeStarted = true;

  console.log(
    "ERP RUNTIME BOOTSTRAP STARTED"
  );

  await startWorkerLoop();

  console.log(
    "ERP RUNTIME ACTIVE"
  );
}

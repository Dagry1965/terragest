export type RuntimeLifecycleStatus =
  | "booting"
  | "running"
  | "paused"
  | "stopped"
  | "error";

export class RuntimeLifecycle {

  private status:
    RuntimeLifecycleStatus =
      "booting";

  private startedAt:
    string | null = null;

  start() {

    this.status = "running";

    this.startedAt =
      new Date().toISOString();
  }

  pause() {

    this.status = "paused";
  }

  stop() {

    this.status = "stopped";
  }

  fail() {

    this.status = "error";
  }

  getStatus() {

    return this.status;
  }

  getStartedAt() {

    return this.startedAt;
  }
}

export const runtimeLifecycle =
  new RuntimeLifecycle();
export type RuntimeActivity = {

  type: string;

  timestamp: number;

  payload?: unknown;
};

class RuntimeActivityStore {

  private activities:
    RuntimeActivity[] = [];

  push(
    activity: RuntimeActivity
  ) {

    this.activities.unshift(
      activity
    );
  }

  getAll() {

    return this.activities;
  }
}

export const runtimeActivityStore =
  new RuntimeActivityStore();

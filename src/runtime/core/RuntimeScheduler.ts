export interface RuntimeScheduledTask {

  id: string;

  name: string;

  cron: string;

  active: boolean;

  lastRunAt?: string;
}

export class RuntimeScheduler {

  private tasks:
    RuntimeScheduledTask[] = [];

  registerTask(
    task: RuntimeScheduledTask
  ) {

    this.tasks.push(task);
  }

  getTasks() {

    return this.tasks;
  }

  getActiveTasks() {

    return this.tasks.filter(
      task =>
        task.active
    );
  }

  markExecuted(
    taskId: string
  ) {

    const task =
      this.tasks.find(
        task =>
          task.id === taskId
      );

    if (task) {

      task.lastRunAt =
        new Date().toISOString();
    }
  }
}

export const runtimeScheduler =
  new RuntimeScheduler();
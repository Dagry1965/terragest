import {
  ProcessRepository
}
from "../persistence/processes/ProcessRepository";

export class
PersistentProcessExecutor {

  private repository =
    new ProcessRepository();

  async execute(
    process: string,
    payload?: unknown
  ) {

    await this.repository.save({
      process,
      payload,
    });

    console.log(
      "[PersistentProcess]",
      process
    );
  }
}

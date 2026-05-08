import type { RuntimeHealth }
from "../types/RuntimeHealth";

export class RuntimeObservabilityService {

  async getRuntimeHealth():
  Promise<RuntimeHealth> {

    return {
      status: "HEALTHY",
      uptime: 0,
      workflows: 0,
      retries: 0,
      deadLetters: 0,
    };
  }
}

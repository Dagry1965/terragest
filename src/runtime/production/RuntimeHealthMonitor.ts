import { ProductionLogger } from "./ProductionLogger";

export class RuntimeHealthMonitor {
  static check() {
    const logs = ProductionLogger.all();

    const errors = logs.filter(
      (log) => log.level === "error"
    );

    return {
      status: errors.length > 0 ? "warning" : "healthy",
      logs: logs.length,
      errors: errors.length,
      checkedAt: new Date().toISOString(),
    };
  }
}
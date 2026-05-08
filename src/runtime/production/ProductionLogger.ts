export type ProductionLogLevel =
  | "info"
  | "warning"
  | "error"
  | "critical";

export interface ProductionLogEntry {
  id: string;
  level: ProductionLogLevel;
  scope: string;
  message: string;
  payload?: Record<string, unknown>;
  createdAt: string;
}

const logs: ProductionLogEntry[] = [];

export class ProductionLogger {
  static log(
    level: ProductionLogLevel,
    scope: string,
    message: string,
    payload?: Record<string, unknown>
  ) {
    const entry: ProductionLogEntry = {
      id: `${scope}-${Date.now()}`,
      level,
      scope,
      message,
      payload,
      createdAt: new Date().toISOString(),
    };

    logs.unshift(entry);

    if (level === "error" || level === "critical") {
      console.error("[ERP]", entry);
    } else {
      console.log("[ERP]", entry);
    }

    return entry;
  }

  static info(scope: string, message: string, payload?: Record<string, unknown>) {
    return ProductionLogger.log("info", scope, message, payload);
  }

  static warning(scope: string, message: string, payload?: Record<string, unknown>) {
    return ProductionLogger.log("warning", scope, message, payload);
  }

  static error(scope: string, message: string, payload?: Record<string, unknown>) {
    return ProductionLogger.log("error", scope, message, payload);
  }

  static all() {
    return logs;
  }
}
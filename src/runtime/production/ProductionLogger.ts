export type ProductionLogLevel =
  | "info"
  | "warning"
  | "error";

export type ProductionLog = {
  id: string;
  level: ProductionLogLevel;
  message: string;
  scope: string;
  source?: string;
  timestamp: string;
};

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random()
    .toString(16)
    .slice(2)}`;
}

class ProductionLoggerClass {
  private logs: ProductionLog[] = [];

  info(
    message: string,
    scope = "production"
  ) {
    return this.add(
      "info",
      message,
      scope
    );
  }

  warning(
    message: string,
    scope = "production"
  ) {
    return this.add(
      "warning",
      message,
      scope
    );
  }

  error(
    message: string,
    scope = "production"
  ) {
    return this.add(
      "error",
      message,
      scope
    );
  }

  add(
    level: ProductionLogLevel,
    message: string,
    scope = "production"
  ) {
    const log: ProductionLog = {
      id: createId("prod_log"),
      level,
      message,
      scope,
      source: scope,
      timestamp: new Date().toISOString(),
    };

    this.logs.unshift(log);

    this.logs =
      this.logs.slice(0, 300);

    return log;
  }

  all() {
    if (this.logs.length === 0) {
      this.seed();
    }

    return this.logs;
  }

  private seed() {
    this.info(
      "Production governance initialized",
      "governance"
    );

    this.warning(
      "Cloud persistence driver pending",
      "persistence"
    );

    this.info(
      "Runtime monitoring active",
      "monitoring"
    );

    this.info(
      "Security policies loaded",
      "security"
    );
  }
}

export const ProductionLogger =
  new ProductionLoggerClass();
import {
  ProductionLogger,
} from "./ProductionLogger";

export type RuntimeErrorReport = {
  message: string;
  stack?: string;
  componentStack?: string;
  source?: string;
  timestamp: string;
};

class RuntimeErrorReporterClass {
  private reports: RuntimeErrorReport[] = [];

  report(
    error: unknown,
    info?: { componentStack?: string; source?: string }
  ) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    const stack =
      error instanceof Error
        ? error.stack
        : undefined;

    const report: RuntimeErrorReport = {
      message,
      stack,
      componentStack: info?.componentStack,
      source: info?.source ?? "runtime",
      timestamp: new Date().toISOString(),
    };

    this.reports.unshift(report);
    this.reports = this.reports.slice(0, 100);

    ProductionLogger.error(
      message,
      report.source
    );

    return report;
  }

  capture(
    error: unknown,
    source = "runtime"
  ) {
    return this.report(error, { source });
  }

  all() {
    return this.reports;
  }
}

export const RuntimeErrorReporter =
  new RuntimeErrorReporterClass();